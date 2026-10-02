import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SocialLink } from "@/data/bioConfig";
import { getBioIcon } from "./BioIcons";

interface BioLinkCardProps {
  link: SocialLink;
  index: number;
}

export const BioLinkCard: React.FC<BioLinkCardProps> = ({ link, index }) => {
  const isExternal = link.isExternal !== false;
  const isHighlight = Boolean(link.highlight);

  const cardContent = (
    <div
      className={`group relative w-full flex items-center justify-between p-4 sm:p-4.5 rounded-xl border transition-all duration-300 backdrop-blur-md active:scale-[0.985] select-none ${
        isHighlight
          ? "bg-gradient-to-r from-card via-card/90 to-primary/10 border-primary/40 shadow-[0_4px_20px_rgba(213,196,161,0.08)] hover:border-primary/80 hover:shadow-[0_8px_28px_rgba(213,196,161,0.18)]"
          : "bg-card/75 border-border/80 hover:border-primary/40 hover:bg-card/95 hover:shadow-lg"
      }`}
    >
      {/* Subtle hover shimmer beam */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Left section: Icon + text info */}
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
        <div
          className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isHighlight
              ? "bg-primary/20 text-primary border border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105"
              : "bg-secondary text-foreground/80 border border-border group-hover:text-primary group-hover:border-primary/30 group-hover:scale-105"
          }`}
        >
          {getBioIcon(link.iconName, "w-5 h-5")}
        </div>

        <div className="flex flex-col text-left min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-sans font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {link.title}
            </span>
            {link.badge && (
              <span className="flex-shrink-0 text-[10px] uppercase tracking-wider font-sans font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                {link.badge}
              </span>
            )}
          </div>
          {link.subtitle && (
            <p className="text-xs text-foreground/50 font-sans truncate mt-0.5 group-hover:text-foreground/70 transition-colors">
              {link.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right arrow indicator */}
      <div className="flex-shrink-0 ml-2 w-8 h-8 rounded-full flex items-center justify-center text-foreground/40 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRight className="w-4 h-4 stroke-[2]" />
      </div>
    </div>
  );

  return (
    <div
      className="w-full opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 60 + 100}ms`,
        animationFillMode: "forwards",
      }}
    >
      {isExternal ? (
        <a
          href={link.url}
          target={link.url.startsWith("tel:") || link.url.startsWith("mailto:") ? "_self" : "_blank"}
          rel={link.url.startsWith("tel:") || link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 rounded-xl"
          aria-label={link.title}
        >
          {cardContent}
        </a>
      ) : (
        <Link
          to={link.url}
          className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 rounded-xl"
          aria-label={link.title}
        >
          {cardContent}
        </Link>
      )}
    </div>
  );
};
