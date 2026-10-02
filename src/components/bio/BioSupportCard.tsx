import React, { useState } from "react";
import { toast } from "sonner";
import {
  Copy,
  Check,
  QrCode,
  Smartphone,
  Heart,
  ChevronDown,
  ChevronUp,
  Download,
  Coffee,
  Info,
} from "lucide-react";
import { PaymentConfig, buildUpiPayUrl } from "@/data/bioConfig";
import { QRCodeSvg } from "./QRCodeSvg";
import { BuyMeACoffeeIcon } from "./BioIcons";

interface BioSupportCardProps {
  payment: PaymentConfig;
}

const PRESET_AMOUNTS = [50, 100, 250, 500];

export const BioSupportCard: React.FC<BioSupportCardProps> = ({ payment }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState<number | undefined>(undefined);
  const [customAmount, setCustomAmount] = useState<string>("");

  const currentAmount = selectedAmount || (customAmount ? Number(customAmount) : undefined);
  const upiPayUrl = buildUpiPayUrl(payment, currentAmount);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(payment.upiId);
      setCopied(true);
      toast.success("UPI ID copied to clipboard!", {
        description: payment.upiId,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy. Please copy manually.");
    }
  };

  const handleDownloadQr = () => {
    // Generate simple SVG to PNG download or open in new window
    const svgElement = document.querySelector("#bio-upi-qr svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);
    
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#121212";
        context.fillRect(0, 0, 400, 400);
        context.drawImage(image, 0, 0, 400, 400);
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `Atharva-Jagtap-UPI-QR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        toast.success("QR Code downloaded as PNG!");
      }
    };
    image.src = blobURL;
  };

  return (
    <div className="w-full mt-6 rounded-2xl border border-primary/30 bg-gradient-to-b from-card via-card/90 to-background/90 p-5 sm:p-6 shadow-xl backdrop-blur-xl relative overflow-hidden transition-all duration-300">
      {/* Decorative top accent hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
            <Heart className="w-4 h-4 fill-primary/30 text-primary" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-foreground flex items-center gap-2">
              Support & Donate
            </h3>
            <p className="text-xs text-foreground/60 font-sans">
              Fuel ongoing open-source & creative work
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowQr(!showQr)}
          className="text-xs font-sans text-foreground/60 hover:text-primary transition-colors flex items-center gap-1 border border-border/70 hover:border-primary/40 px-2.5 py-1.5 rounded-lg bg-secondary/40"
          aria-label={showQr ? "Hide QR code" : "Show QR code"}
        >
          <QrCode className="w-3.5 h-3.5 text-primary" />
          <span>{showQr ? "Hide QR" : "Show QR"}</span>
          {showQr ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* UPI ID Copy Field */}
      <div className="mb-4">
        <label className="text-[10px] uppercase tracking-widest text-foreground/50 font-sans font-medium mb-1.5 block">
          Direct UPI ID
        </label>
        <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-secondary/60 border border-border/80 hover:border-primary/40 transition-colors">
          <span className="font-mono text-sm sm:text-base font-semibold text-primary tracking-wide select-all truncate pl-1">
            {payment.upiId}
          </span>
          <button
            onClick={handleCopyUpi}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-sm"
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Amount Selector */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-foreground/50 font-sans font-medium">
            Select Amount (Optional)
          </span>
          {currentAmount && (
            <button
              onClick={() => {
                setSelectedAmount(undefined);
                setCustomAmount("");
              }}
              className="text-[10px] text-primary/80 hover:text-primary transition-colors underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((amt) => {
            const isSelected = selectedAmount === amt;
            return (
              <button
                key={amt}
                onClick={() => {
                  setSelectedAmount(isSelected ? undefined : amt);
                  setCustomAmount("");
                }}
                className={`py-2 rounded-lg text-xs font-sans font-semibold transition-all border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary/40 text-foreground/80 border-border/70 hover:border-primary/40 hover:text-primary"
                }`}
              >
                ₹{amt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons: Direct UPI App + Buy Me A Coffee */}
      <div className="flex flex-col sm:flex-row gap-2.5 mb-5">
        <a
          href={upiPayUrl}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-sans font-semibold text-xs uppercase tracking-wider hover:bg-primary/90 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(213,196,161,0.2)]"
          aria-label="Pay via UPI App"
        >
          <Smartphone className="w-4 h-4" />
          <span>Pay with UPI App</span>
          {currentAmount && <span className="text-primary-foreground/90">(₹{currentAmount})</span>}
        </a>

        <a
          href={payment.buyMeACoffeeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary border border-border/80 text-foreground font-sans font-semibold text-xs uppercase tracking-wider hover:border-primary/50 hover:text-primary active:scale-[0.98] transition-all"
          aria-label="Buy Me a Coffee"
        >
          <BuyMeACoffeeIcon className="w-4 h-4 text-primary" />
          <span>Buy Coffee</span>
        </a>
      </div>

      {/* Expandable QR Code Section */}
      {showQr && (
        <div className="pt-4 border-t border-border/50 flex flex-col items-center text-center animate-fade-in">
          <div id="bio-upi-qr" className="mb-3">
            <QRCodeSvg value={upiPayUrl} size={190} />
          </div>

          <p className="text-xs font-sans text-foreground/70 font-medium">
            Scan with any UPI App
          </p>
          <p className="text-[11px] text-foreground/40 font-sans mt-0.5">
            Google Pay • PhonePe • Paytm • CRED • BHIM
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={handleDownloadQr}
              className="inline-flex items-center gap-1.5 text-[11px] font-sans text-primary hover:text-primary/80 transition-colors border border-primary/30 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/15"
              aria-label="Download QR image"
            >
              <Download className="w-3 h-3" />
              <span>Save QR Image</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer helper */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-foreground/40 font-sans">
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3" /> Verified Indian UPI & International Support
        </span>
        <span className="text-foreground/30">Secure & Direct</span>
      </div>
    </div>
  );
};
