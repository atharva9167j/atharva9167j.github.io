import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from 'react';

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7066935597",
      href: "tel:+917066935597",
    },
    {
      icon: Mail,
      label: "Email",
      value: "atharvaj365@gmail.com",
      href: "mailto:atharvaj365@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "jagtap-atharva",
      href: "https://www.linkedin.com/in/jagtap-atharva",
    }
  ];

  const languages = [
    { name: "English", level: "Professional" },
    { name: "Hindi", level: "Native" },
    { name: "Marathi", level: "Native" }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 lg:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left column (Header) */}
        <div className="md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">
          <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs mb-4">
            06. Contact
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
            Let's<br />Connect.
          </h2>
          <div className="w-12 h-[1px] bg-primary mt-8"></div>
          <p className="mt-8 text-foreground/60 font-sans font-light leading-relaxed max-w-xs transition-all duration-1000 delay-300">
            Ready to bring your ideas to life? From concept to deployment, I'll help you create exceptional digital experiences.
          </p>
        </div>

        {/* Right column (Content) */}
        <div className={`md:w-2/3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Contact Details */}
            <div className="flex flex-col gap-8">
              <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 border-b border-border/50 pb-4">Contact Details</h3>
              <div className="flex flex-col gap-6">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.label === "LinkedIn" ? "_blank" : "_self"}
                    rel={contact.label === "LinkedIn" ? "noopener noreferrer" : ""}
                    className="group flex flex-col gap-2"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-foreground/50">{contact.label}</span>
                    <span className="text-lg font-serif text-foreground group-hover:text-primary transition-colors flex items-center gap-3">
                      <contact.icon className="w-4 h-4 opacity-50 stroke-[1.5]" />
                      {contact.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Languages */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 border-b border-border/50 pb-4">Location</h3>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-serif text-foreground flex items-center gap-3">
                    <MapPin className="w-4 h-4 opacity-50 stroke-[1.5]" />
                    Mumbai, India
                  </span>
                  <p className="text-sm font-sans font-light text-foreground/50">Available for remote work worldwide</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                 <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 border-b border-border/50 pb-4">Languages</h3>
                 <div className="flex flex-col gap-3">
                   {languages.map((lang, index) => (
                     <div key={index} className="flex justify-between items-center group">
                       <span className="text-base font-serif text-foreground">{lang.name}</span>
                       <span className="text-[10px] font-sans uppercase tracking-widest text-foreground/50 border border-border/40 px-2 py-1 group-hover:border-primary/40 transition-colors">
                         {lang.level}
                       </span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-16 border-t border-border/50">
            <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-8">Ready to Start Your Project?</h3>
            <a
              href="mailto:atharvaj365@gmail.com"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-sans px-10 py-5 uppercase tracking-[0.2em] text-xs hover:bg-primary/90 transition-colors"
            >
              Start Your Project Today ↗
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
