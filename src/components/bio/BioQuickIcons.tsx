import React from "react";
import { Phone, Mail, Linkedin, Instagram, Github } from "lucide-react";
import { WhatsAppIcon } from "./BioIcons";

export interface QuickIconItem {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

const quickIcons: QuickIconItem[] = [
  {
    id: "call",
    name: "Call",
    url: "tel:+917066935597",
    icon: <Phone className="w-4 h-4 stroke-[2]" />,
  },
  {
    id: "mail",
    name: "Email",
    url: "mailto:atharvaj365@gmail.com",
    icon: <Mail className="w-4 h-4 stroke-[2]" />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jagtap-atharva",
    icon: <Linkedin className="w-4 h-4 stroke-[2]" />,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/atharva9167j",
    icon: <Instagram className="w-4 h-4 stroke-[2]" />,
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/atharva9167j",
    icon: <Github className="w-4 h-4 stroke-[2]" />,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://wa.me/917066935597?text=Hi%20Atharva!",
    icon: <WhatsAppIcon className="w-4 h-4" />,
  },
];

export const BioQuickIcons: React.FC = () => {
  return (
    <div className="w-full mb-10 flex items-center justify-center">
      <div className="flex items-center justify-between w-full">
        {quickIcons.map((item) => {
          const isDirect = item.url.startsWith("tel:") || item.url.startsWith("mailto:");
          return (
            <a
              key={item.id}
              href={item.url}
              target={isDirect ? "_self" : "_blank"}
              rel={isDirect ? undefined : "noopener noreferrer"}
              aria-label={item.name}
              title={item.name}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-foreground/80 bg-secondary/80 border border-border/70 hover:border-primary/60 hover:text-primary hover:bg-primary/10 hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm group"
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BioQuickIcons;
