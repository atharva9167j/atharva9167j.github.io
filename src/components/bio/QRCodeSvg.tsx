import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeSvgProps {
  value: string;
  size?: number;
  className?: string;
  title?: string;
}

export const QRCodeSvg: React.FC<QRCodeSvgProps> = ({
  value,
  size = 200,
  className = "",
  title = "UPI Payment QR Code",
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    let isCancelled = false;

    // Generate high-resolution, standard-compliant QR code with dark modules on white background
    // Standard black-on-white with Error Correction Level 'M' or 'H' guarantees instant scanning on all banking apps
    QRCode.toDataURL(value, {
      width: Math.max(size * 2, 400),
      margin: 2,
      errorCorrectionLevel: "H",
      color: {
        dark: "#0a0a0a", // Deep high-contrast black
        light: "#ffffff", // Pure white background for scanner binarization
      },
    })
      .then((url) => {
        if (!isCancelled) {
          setQrDataUrl(url);
        }
      })
      .catch((err) => {
        console.error("QRCode generation failed:", err);
      });

    return () => {
      isCancelled = true;
    };
  }, [value, size]);

  return (
    <div
      className={`relative inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.4)] border-2 border-primary/40 transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      {qrDataUrl ? (
        <img
          src={qrDataUrl}
          alt={title}
          width={size}
          height={size}
          className="block rounded-lg select-none"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ) : (
        <div
          className="flex items-center justify-center bg-white rounded-lg animate-pulse"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <span className="text-xs font-sans text-neutral-400">Loading QR...</span>
        </div>
      )}
    </div>
  );
};

export default QRCodeSvg;
