export interface SocialLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  iconName: string;
  category: "primary" | "social" | "contact" | "support";
  highlight?: boolean;
  badge?: string;
  isExternal?: boolean;
}

export interface PaymentConfig {
  upiId: string;
  payeeName: string;
  currency: string;
  note: string;
  customUpiUrl?: string; // Optional manual override
  buyMeACoffeeUrl: string;
}

export interface BioConfig {
  name: string;
  handle: string;
  tagline: string;
  bio: string;
  location: string;
  avatarUrl: string;
  bannerTitle: string;
  bannerSubtitle: string;
  statusBadge: {
    active: boolean;
    text: string;
  };
  stats: Array<{
    label: string;
    value: string;
  }>;
  payment: PaymentConfig;
  links: SocialLink[];
}

export const bioConfig: BioConfig = {
  name: "Atharva Jagtap",
  handle: "@atharva9167j",
  tagline: "Full-Stack Developer & Agentic AI Engineer",
  bio: "Engineering high-performance digital experiences, scalable web architectures, and autonomous AI systems. Alum of Vartak Polytechnic & Fr. CRCE, Mumbai.",
  location: "Mumbai, India",
  avatarUrl: "/profile.png",
  bannerTitle: "ATHARVA JAGTAP",
  bannerSubtitle: "DEVELOPER • CREATOR • AI ENGINEER",
  statusBadge: {
    active: true,
    text: "Open for Opportunities & Collaborations",
  },
  stats: [
    { label: "Experience", value: "3+ Years" },
    { label: "Projects", value: "15+" },
    { label: "Location", value: "Mumbai" },
  ],
  payment: {
    // Configurable UPI credentials
    upiId: "atharvaj365@oksbi",
    payeeName: "Atharva Jagtap",
    currency: "INR",
    note: "Support Atharva Jagtap",
    buyMeACoffeeUrl: "https://buymeacoffee.com/atharva9167j",
  },
  links: [
    {
      id: "portfolio",
      title: "Main Portfolio",
      subtitle: "Explore featured projects, skills & tech stack",
      url: "/",
      iconName: "Globe",
      category: "primary",
      highlight: true,
      badge: "Featured",
      isExternal: false,
    },
    {
      id: "resume",
      title: "Download Resume",
      subtitle: "Curriculum Vitae & technical background (PDF)",
      url: "/Atharva_Dharmendra_Jagtap_Resume.pdf",
      iconName: "FileText",
      category: "primary",
      isExternal: true,
    },
    {
      id: "whatsapp",
      title: "Chat on WhatsApp",
      subtitle: "Quick message or project inquiry",
      url: "https://wa.me/917066935597?text=Hi%20Atharva,%20I%20found%20your%20Link-in-Bio%20and%20would%20like%20to%20connect!",
      iconName: "MessageCircle",
      category: "contact",
      highlight: true,
      badge: "Fast Reply",
      isExternal: true,
    },
    {
      id: "phone",
      title: "Direct Phone Call",
      subtitle: "+91 7066935597",
      url: "tel:+917066935597",
      iconName: "Phone",
      category: "contact",
      isExternal: true,
    },
    {
      id: "email",
      title: "Send an Email",
      subtitle: "atharvaj365@gmail.com",
      url: "mailto:atharvaj365@gmail.com",
      iconName: "Mail",
      category: "contact",
      isExternal: true,
    },
    {
      id: "linkedin",
      title: "Connect on LinkedIn",
      subtitle: "Professional network & career updates",
      url: "https://www.linkedin.com/in/jagtap-atharva",
      iconName: "Linkedin",
      category: "social",
      isExternal: true,
    },
    {
      id: "github",
      title: "GitHub Profile",
      subtitle: "Open source contributions & repositories",
      url: "https://github.com/atharva9167j",
      iconName: "Github",
      category: "social",
      isExternal: true,
    },
    {
      id: "instagram",
      title: "Follow on Instagram",
      subtitle: "Behind the scenes, tech & life",
      url: "https://instagram.com/atharva9167j",
      iconName: "Instagram",
      category: "social",
      isExternal: true,
    },
    {
      id: "buymeacoffee",
      title: "Buy Me a Coffee",
      subtitle: "Fuel code, late nights & open source tools",
      url: "https://buymeacoffee.com/atharva9167j",
      iconName: "Coffee",
      category: "support",
      highlight: true,
      badge: "Support",
      isExternal: true,
    },
  ],
};

/**
 * Builds standard UPI deep-link URL conforming to NPCI specification:
 * upi://pay?pa=<UPI_ID>&pn=<NAME>&am=<AMOUNT>&cu=<CURRENCY>&tn=<NOTE>
 * Note: 'pa' must contain literal '@', spaces must be %20 (not +)
 */
export function buildUpiPayUrl(payment: PaymentConfig, amount?: number): string {
  if (payment.customUpiUrl) return payment.customUpiUrl;
  const cleanUpiId = payment.upiId.trim();
  const payeeName = encodeURIComponent(payment.payeeName.trim());
  const note = encodeURIComponent((payment.note || "Support").trim());
  const currency = payment.currency || "INR";

  let url = `upi://pay?pa=${cleanUpiId}&pn=${payeeName}&cu=${currency}&tn=${note}`;
  if (amount && amount > 0) {
    url += `&am=${amount.toFixed(2)}`;
  }
  return url;
}
