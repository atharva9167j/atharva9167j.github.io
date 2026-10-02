import React from "react";
import { toast } from "sonner";
import { Share2, MapPin, CheckCircle2, Sparkles, Globe } from "lucide-react";
import { BioConfig } from "@/data/bioConfig";

interface BioHeaderProps {
  config: BioConfig;
}

export const BioHeader: React.FC<BioHeaderProps> = ({ config }) => {
  const handleShare = async () => {
    const shareData = {
      title: `${config.name} | Link in Bio`,
      text: `${config.name} (${config.handle}) - ${config.tagline}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed silently
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="w-full relative flex flex-col items-center text-center">
      {/* Visual Top Banner */}
      <div className="w-full h-36 sm:h-44 rounded-2xl relative overflow-hidden border border-border/80 bg-gradient-to-br from-[#1c1813] via-[#0f0f0f] to-[#14120e] shadow-xl">
        {/* Subtle geometric grid / noise pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(213, 196, 161, 0.4) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Ambient gold radial glow flares */}
        <div className="absolute -top-12 left-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar controls: Home link + Share */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <a
            href="/"
            className="flex items-center gap-1.5 p-2 rounded-full bg-background/60 backdrop-blur-md border border-border/70 text-foreground/80 hover:text-primary hover:border-primary/40 text-[11px] font-sans uppercase tracking-widest transition-all"
            title="Return to Main Portfolio"
          >
            <Globe className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-background/60 backdrop-blur-md border border-border/70 text-foreground/80 hover:text-primary hover:border-primary/40 flex items-center justify-center transition-all active:scale-90"
            aria-label="Share Link in Bio"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Banner Decorative Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none px-4">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.4em] text-primary/70 mb-1">
            {config.bannerSubtitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground/90 tracking-widest mb-6">
            {config.bannerTitle}
          </h2>
        </div>
      </div>

      {/* Profile Avatar overlapping banner */}
      <div className="relative -mt-12 sm:-mt-14 mb-4 z-10">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-b from-primary via-primary/40 to-border shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-background border-2 border-background">
            <img
              src={config.avatarUrl}
              alt={config.name}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Active online pulse dot */}
          {config.statusBadge.active && (
            <span
              className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#10b981] border-2 border-background flex items-center justify-center shadow-md"
              title="Online / Available"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping opacity-75" />
            </span>
          )}
        </div>
      </div>

      {/* Name and Verified Badge */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground tracking-tight">
          {config.name}
        </h1>
        <CheckCircle2
          className="w-5 h-5 text-primary fill-primary/20 stroke-[2.2]"
          aria-label="Verified Profile"
        />
      </div>

      {/* Username / Handle */}
      <p className="text-xs sm:text-sm font-mono text-primary/90 font-medium tracking-wide mb-2">
        {config.handle}
      </p>

      {/* Headline / Tagline */}
      <p className="text-sm sm:text-base font-sans font-medium text-foreground/90 max-w-sm mb-3">
        {config.tagline}
      </p>

      {/* Bio text */}
      <p className="text-xs sm:text-sm font-sans font-light text-foreground/70 max-w-md leading-relaxed mb-4 px-2">
        {config.bio}
      </p>

      {/* Location badge & Status Pill */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/80 border border-border/80 text-[11px] font-sans text-foreground/70">
          <MapPin className="w-3 h-3 text-primary" />
          <span>{config.location}</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-[11px] font-sans text-primary font-medium">
          <Sparkles className="w-3 h-3" />
          <span>{config.statusBadge.text}</span>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="w-full grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-secondary/40 border border-border/60 mb-6 backdrop-blur-sm">
        {config.stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-sm sm:text-base font-serif font-bold text-primary">
              {stat.value}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-sans text-foreground/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
