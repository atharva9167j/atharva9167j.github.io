// Minimal, zero-dependency QR Code generator in TypeScript (Byte Mode, ECC Level M/L)
// Based on ISO/IEC 18004 specification

export interface QRCodeData {
  modules: boolean[][];
  size: number;
}

// Reed-Solomon GF(256) Log / Antilog tables
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);

(function initGaloisField() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    EXP_TABLE[i + 255] = x;
    LOG_TABLE[x] = i;
    x = (x << 1) ^ (x & 0x80 ? 0x11d : 0);
  }
  LOG_TABLE[0] = 0;
})();

function gMult(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

// Pre-computed generator polynomial for error correction
function rsGenPoly(degree: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const factor = new Uint8Array([1, EXP_TABLE[i]]);
    const next = new Uint8Array(poly.length + 1);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gMult(poly[j], factor[0]);
      next[j + 1] ^= gMult(poly[j], factor[1]);
    }
    poly = next;
  }
  return poly;
}

function rsComputeRemainder(data: Uint8Array, eccLen: number): Uint8Array {
  const gen = rsGenPoly(eccLen);
  const rem = new Uint8Array(eccLen);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ rem[0];
    for (let j = 0; j < eccLen - 1; j++) {
      rem[j] = rem[j + 1] ^ gMult(gen[j + 1], factor);
    }
    rem[eccLen - 1] = gMult(gen[eccLen], factor);
  }
  return rem;
}

// Version table constants for Byte mode (Version 4 to 8 are typical for upi links ~80-120 chars)
// Version 5 (37x37): 108 data codewords, 48 EC codewords (ECC Medium: 2 blocks of 43 data, 24 EC + 2 of 44, 24)
// For simplicity and high compatibility, we support automatic version scaling up to version 10.
interface QRVersionSpec {
  version: number;
  size: number;
  totalCodewords: number;
  ecCodewordsPerBlock: number;
  numBlocksG1: number;
  dataCodewordsPerBlockG1: number;
  numBlocksG2: number;
  dataCodewordsPerBlockG2: number;
  alignmentPositions: number[];
}

const QR_VERSIONS: QRVersionSpec[] = [
  // Version 4: 33x33, ECC M: 64 data, 36 EC
  { version: 4, size: 33, totalCodewords: 100, ecCodewordsPerBlock: 18, numBlocksG1: 2, dataCodewordsPerBlockG1: 32, numBlocksG2: 0, dataCodewordsPerBlockG2: 0, alignmentPositions: [6, 26] },
  // Version 5: 37x37, ECC M: 86 data, 48 EC
  { version: 5, size: 37, totalCodewords: 134, ecCodewordsPerBlock: 24, numBlocksG1: 2, dataCodewordsPerBlockG1: 43, numBlocksG2: 0, dataCodewordsPerBlockG2: 0, alignmentPositions: [6, 30] },
  // Version 6: 41x41, ECC M: 108 data, 64 EC
  { version: 6, size: 41, totalCodewords: 172, ecCodewordsPerBlock: 16, numBlocksG1: 4, dataCodewordsPerBlockG1: 27, numBlocksG2: 0, dataCodewordsPerBlockG2: 0, alignmentPositions: [6, 34] },
  // Version 7: 45x45, ECC M: 124 data, 72 EC
  { version: 7, size: 45, totalCodewords: 196, ecCodewordsPerBlock: 18, numBlocksG1: 4, dataCodewordsPerBlockG1: 31, numBlocksG2: 0, dataCodewordsPerBlockG2: 0, alignmentPositions: [6, 22, 38] },
  // Version 8: 49x49, ECC M: 154 data, 88 EC
  { version: 8, size: 49, totalCodewords: 242, ecCodewordsPerBlock: 22, numBlocksG1: 2, dataCodewordsPerBlockG1: 38, numBlocksG2: 2, dataCodewordsPerBlockG2: 39, alignmentPositions: [6, 24, 42] },
];

export function generateQRCode(text: string): QRCodeData {
  // Convert text to UTF-8 bytes
  const encoder = new TextEncoder();
  const textBytes = encoder.encode(text);
  const dataLen = textBytes.length;

  // Find minimum version that fits data (Byte mode header: 4 bits mode + 8 bits length + 8 * dataLen bits)
  const requiredDataCodewords = dataLen + 2; // ~12 bits overhead => +2 bytes safe
  const spec = QR_VERSIONS.find(v => {
    const totalData = v.numBlocksG1 * v.dataCodewordsPerBlockG1 + v.numBlocksG2 * v.dataCodewordsPerBlockG2;
    return totalData >= requiredDataCodewords;
  }) || QR_VERSIONS[QR_VERSIONS.length - 1];

  const totalDataCodewords = spec.numBlocksG1 * spec.dataCodewordsPerBlockG1 + spec.numBlocksG2 * spec.dataCodewordsPerBlockG2;

  // Create BitBuffer
  const bitBuffer: number[] = [];
  function putBits(num: number, length: number) {
    for (let i = length - 1; i >= 0; i--) {
      bitBuffer.push((num >>> i) & 1);
    }
  }

  // 1. Mode Indicator: 0100 (Byte mode)
  putBits(0b0100, 4);

  // 2. Character Count Indicator (8 bits for V1-V9 in byte mode)
  putBits(dataLen, 8);

  // 3. Data bits
  for (let i = 0; i < dataLen; i++) {
    putBits(textBytes[i], 8);
  }

  // 4. Terminator (up to 4 zeroes)
  const remainingBits = totalDataCodewords * 8 - bitBuffer.length;
  const termLen = Math.min(4, Math.max(0, remainingBits));
  putBits(0, termLen);

  // 5. Pad to multiple of 8
  while (bitBuffer.length % 8 !== 0) {
    bitBuffer.push(0);
  }

  // 6. Pad with alternating codewords 0xEC and 0x11
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (bitBuffer.length < totalDataCodewords * 8) {
    putBits(padBytes[padIdx % 2], 8);
    padIdx++;
  }

  // Convert bitBuffer to byte codewords
  const dataCodewords = new Uint8Array(totalDataCodewords);
  for (let i = 0; i < totalDataCodewords; i++) {
    let byteVal = 0;
    for (let b = 0; b < 8; b++) {
      byteVal = (byteVal << 1) | bitBuffer[i * 8 + b];
    }
    dataCodewords[i] = byteVal;
  }

  // Split into blocks and compute error correction
  const blocks: { data: Uint8Array; ec: Uint8Array }[] = [];
  let offset = 0;

  for (let i = 0; i < spec.numBlocksG1; i++) {
    const d = dataCodewords.slice(offset, offset + spec.dataCodewordsPerBlockG1);
    offset += spec.dataCodewordsPerBlockG1;
    const ec = rsComputeRemainder(d, spec.ecCodewordsPerBlock);
    blocks.push({ data: d, ec });
  }

  for (let i = 0; i < spec.numBlocksG2; i++) {
    const d = dataCodewords.slice(offset, offset + spec.dataCodewordsPerBlockG2);
    offset += spec.dataCodewordsPerBlockG2;
    const ec = rsComputeRemainder(d, spec.ecCodewordsPerBlock);
    blocks.push({ data: d, ec });
  }

  // Interleave data codewords
  const finalSequence: number[] = [];
  const maxDataBlockLen = Math.max(spec.dataCodewordsPerBlockG1, spec.dataCodewordsPerBlockG2 || 0);
  for (let i = 0; i < maxDataBlockLen; i++) {
    for (const b of blocks) {
      if (i < b.data.length) finalSequence.push(b.data[i]);
    }
  }

  // Interleave EC codewords
  for (let i = 0; i < spec.ecCodewordsPerBlock; i++) {
    for (const b of blocks) {
      if (i < b.ec.length) finalSequence.push(b.ec[i]);
    }
  }

  // Build Matrix
  const size = spec.size;
  const modules: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const isFunction: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  function setFunctionModule(r: number, c: number, val: boolean) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      modules[r][c] = val;
      isFunction[r][c] = true;
    }
  }

  // 1. Finder patterns (7x7 with separator)
  function drawFinderPattern(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
        if (
          (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          setFunctionModule(nr, nc, true);
        } else {
          setFunctionModule(nr, nc, false);
        }
      }
    }
  }

  drawFinderPattern(0, 0);
  drawFinderPattern(0, size - 7);
  drawFinderPattern(size - 7, 0);

  // 2. Alignment patterns
  const positions = spec.alignmentPositions;
  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions.length; j++) {
      const r = positions[i];
      const c = positions[j];
      // Skip if overlapping with finder patterns
      if ((i === 0 && j === 0) || (i === 0 && j === positions.length - 1) || (i === positions.length - 1 && j === 0)) {
        continue;
      }
      for (let ar = -2; ar <= 2; ar++) {
        for (let ac = -2; ac <= 2; ac++) {
          const val = Math.max(Math.abs(ar), Math.abs(ac)) !== 1;
          setFunctionModule(r + ar, c + ac, val);
        }
      }
    }
  }

  // 3. Timing patterns
  for (let i = 8; i < size - 8; i++) {
    const val = i % 2 === 0;
    setFunctionModule(6, i, val);
    setFunctionModule(i, 6, val);
  }

  // 4. Dark module
  setFunctionModule(size - 8, 8, true);

  // Reserve Format Information areas
  for (let i = 0; i < 9; i++) {
    if (!isFunction[8][i]) isFunction[8][i] = true;
    if (!isFunction[i][8]) isFunction[i][8] = true;
  }
  for (let i = size - 8; i < size; i++) {
    if (!isFunction[8][i]) isFunction[8][i] = true;
    if (!isFunction[i][8]) isFunction[i][8] = true;
  }

  // Mask pattern 0: (row + col) % 2 === 0
  const maskFn = (r: number, c: number) => (r + c) % 2 === 0;

  // Place data bits in zigzag order
  let seqBitIdx = 0;
  const totalBits = finalSequence.length * 8;

  let right = size - 1;
  while (right > 0) {
    if (right === 6) right--; // Skip vertical timing column
    const colList = [right, right - 1];
    const goingUp = ((size - 1 - right) >> 1) % 2 === 0;

    const rowStart = goingUp ? size - 1 : 0;
    const rowEnd = goingUp ? -1 : size;
    const rowStep = goingUp ? -1 : 1;

    for (let r = rowStart; r !== rowEnd; r += rowStep) {
      for (const c of colList) {
        if (!isFunction[r][c]) {
          let bit = 0;
          if (seqBitIdx < totalBits) {
            const byteVal = finalSequence[Math.floor(seqBitIdx / 8)];
            bit = (byteVal >>> (7 - (seqBitIdx % 8))) & 1;
            seqBitIdx++;
          }
          // Apply mask
          if (maskFn(r, c)) {
            bit ^= 1;
          }
          modules[r][c] = bit === 1;
        }
      }
    }
    right -= 2;
  }

  // Write Format Information (ECC Medium = 00, Mask 0 = 000 => format bits: 101010000010010)
  // Format bit string for ECC=M, Mask=000 with BCH(15,5) and XOR mask 0x5412: 101010000010010 ^ 101010000010010 = 0b10101...
  // Constant precomputed format bits for EC Medium + Mask 0:
  // Data: 00 000 => 00000 -> BCH remainder 0000000000 -> xor 101010000010010 = 0x5412
  const formatBits = 0x5412;
  for (let i = 0; i < 15; i++) {
    const bit = ((formatBits >>> i) & 1) === 1;
    // Top-left finder border
    if (i <= 5) modules[8][i] = bit;
    else if (i === 6) modules[8][7] = bit;
    else if (i === 7) modules[8][8] = bit;
    else if (i === 8) modules[7][8] = bit;
    else modules[14 - i][8] = bit;

    // Bottom-left and top-right borders
    if (i < 8) modules[size - 1 - i][8] = bit;
    else modules[8][size - 15 + i] = bit;
  }

  return { modules, size };
}
