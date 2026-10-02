import React from "react";
import {
  Globe,
  FileText,
  Phone,
  Mail,
  Linkedin,
  Github,
  Instagram,
  ArrowUpRight,
  QrCode,
  Smartphone,
} from "lucide-react";

export const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.667 30.667" fill="currentColor" className={className}>
    <path d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017   c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382   c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076   c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427   c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437   c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536   c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609   c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611   c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787   c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739   C23.307,19.268,23.307,18.533,23.214,18.38z" />
  </svg>
);

export const BuyMeACoffeeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className} viewBox="0 0 32 32">
    <path d="M9.197 0l-1.619 3.735h-2.407v3.359h0.921l0.943 5.975h-1.473l1.948 10.973 1.249-0.015 1.256 7.973h11.891l0.083-0.531 1.172-7.443 1.188 0.015 1.943-10.973h-1.407l0.937-5.975h1.011v-3.359h-2.557l-1.625-3.735zM9.901 1.073h12.057l1.025 2.375h-14.115zM6.235 4.803h19.525v1.228h-19.525zM6.839 14.136h18.183l-1.568 8.823-7.536-0.079-7.511 0.079z" />
  </svg>
);

export const getBioIcon = (name: string, className = "w-5 h-5") => {
  switch (name.toLowerCase()) {
    case "whatsapp":
    case "messagecircle":
      return <WhatsAppIcon className={className} />;
    case "buymeacoffee":
    case "coffee":
      return <BuyMeACoffeeIcon className={className} />;
    case "globe":
      return <Globe className={className} />;
    case "filetext":
      return <FileText className={className} />;
    case "phone":
      return <Phone className={className} />;
    case "mail":
      return <Mail className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "github":
      return <Github className={className} />;
    case "instagram":
      return <Instagram className={className} />;
    case "qrcode":
      return <QrCode className={className} />;
    case "creditcard":
      return <Smartphone className={className} />;
    default:
      return <ArrowUpRight className={className} />;
  }
};
