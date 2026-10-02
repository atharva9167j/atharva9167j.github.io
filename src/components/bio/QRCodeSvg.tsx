import React, { useMemo } from "react";
import { generateQRCode } from "@/lib/qrCode";

interface QRCodeSvgProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  className?: string;
  title?: string;
}

export const QRCodeSvg: React.FC<QRCodeSvgProps> = ({
  value,
  size = 220,
  fgColor = "#d5c4a1", // champagne gold
  bgColor = "#121212", // card dark
  className = "",
  title = "UPI Payment QR Code",
}) => {
  const qr = useMemo(() => {
    try {
      return generateQRCode(value);
    } catch (e) {
      console.error("QR Code Generation error:", e);
      // Fallback fallback version 4 blank-safe matrix
      return { modules: [[true]], size: 1 };
    }
  }, [value]);

  const moduleSize = size / qr.size;

  return (
    <div
      className={`relative inline-flex items-center justify-center p-3 rounded-xl border border-primary/20 bg-[#121212] shadow-2xl transition-transform duration-300 hover:scale-[1.02] ${className}`}
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${qr.size} ${qr.size}`}
        className="w-full h-full block rounded-lg overflow-hidden"
        shapeRendering="crispEdges"
        aria-label={title}
        role="img"
      >
        <rect width={qr.size} height={qr.size} fill={bgColor} />
        {qr.modules.map((row, r) =>
          row.map((isDark, c) => {
            if (!isDark) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width={1}
                height={1}
                fill={fgColor}
              />
            );
          })
        )}
      </svg>

      {/* Center UPI / Pay luxury seal */}
      <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-background border border-primary/40 flex items-center justify-center shadow-lg pointer-events-none">
        <span className="text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
          UPI
        </span>
      </div>
    </div>
  );
};
export default QRCodeSvg;
