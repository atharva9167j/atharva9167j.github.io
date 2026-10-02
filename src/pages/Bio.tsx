import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowUp, Share2, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { bioConfig } from "@/data/bioConfig";
import { BioHeader } from "@/components/bio/BioHeader";
import { BioQuickIcons } from "@/components/bio/BioQuickIcons";
import { BioLinkCard } from "@/components/bio/BioLinkCard";
import { BioSupportCard } from "@/components/bio/BioSupportCard";

export const Bio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "contact" | "social" | "support">("all");

  const filteredLinks = bioConfig.links.filter((link) => {
    if (activeTab === "all") return true;
    if (activeTab === "contact") return link.category === "contact" || link.category === "primary";
    if (activeTab === "social") return link.category === "social";
    if (activeTab === "support") return link.category === "support";
    return true;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShareBio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${bioConfig.name} | Link in Bio`,
          text: `Check out ${bioConfig.name}'s official links and contact channels.`,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Page link copied to clipboard!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary selection:text-primary-foreground font-sans">
      <Helmet>
        <title>{bioConfig.name} (@{bioConfig.handle.replace("@", "")}) | Link in Bio</title>
        <meta
          name="description"
          content={`Connect with ${bioConfig.name} (${bioConfig.handle}). Access portfolio, GitHub, LinkedIn, WhatsApp, contact numbers, and support options.`}
        />
        <meta name="keywords" content="atharva jagtap linktree, atharva9167j bio, atharva links, contact atharva" />
        <meta property="og:title" content={`${bioConfig.name} | Official Link in Bio`} />
        <meta property="og:description" content={bioConfig.tagline} />
        <meta property="og:image" content="/profile.png" />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${bioConfig.name} | Link in Bio`} />
        <meta name="twitter:description" content={bioConfig.tagline} />
      </Helmet>

      {/* Atmospheric ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Mobile-optimized central container */}
      <main className="w-full max-w-md mx-auto px-4 py-4 sm:py-8 flex flex-col items-center min-h-screen">
        {/* Profile and Banner Header */}
        <BioHeader config={bioConfig} />

        {/* Quick Icon Dock (Call, Mail, LinkedIn, Insta, GitHub, WhatsApp) */}
        <BioQuickIcons />

        {/* Filter Pills for quick mobile navigation */}
        <div className="w-full flex items-center justify-between gap-1.5 p-1 rounded-xl bg-secondary/50 border border-border/80 mb-5 text-xs font-sans">
          {(
            [
              { key: "all", label: "All Links" },
              { key: "contact", label: "Direct Contact" },
              { key: "social", label: "Socials" },
              { key: "support", label: "Support" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Links List */}
        <div className="w-full flex flex-col gap-3">
          {filteredLinks.map((link, idx) => (
            <BioLinkCard key={link.id} link={link} index={idx} />
          ))}
        </div>

        {/* Support & UPI Section */}
        {(activeTab === "all" || activeTab === "support") && (
          <BioSupportCard payment={bioConfig.payment} />
        )}

        {/* Bottom Navigation & Share Bar */}
        <div className="w-full mt-10 pt-6 border-t border-border/50 flex flex-col items-center text-center gap-4 pb-12">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors border border-border/70 hover:border-primary/40 px-4 py-2 rounded-xl bg-card/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Full Portfolio</span>
            </Link>

            <button
              onClick={handleShareBio}
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors border border-border/70 hover:border-primary/40 px-4 py-2 rounded-xl bg-card/60"
            >
              <Share2 className="w-3.5 h-3.5 text-primary" />
              <span>Share</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl border border-border/70 hover:border-primary/40 bg-card/60 text-foreground/70 hover:text-primary transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] font-sans text-foreground/40 tracking-wider">
            © {new Date().getFullYear()} {bioConfig.name} • All rights reserved
          </p>
          <p className="text-[10px] font-sans text-foreground/30 -mt-2">
            Designed with precision • Fast & Mobile-Optimized
          </p>
        </div>
      </main>
    </div>
  );
};

export default Bio;
