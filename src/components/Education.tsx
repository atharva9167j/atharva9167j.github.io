import { useState, useRef, useEffect } from 'react';

export const Education = () => {
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

  const education = [
    {
      institution: "Fr. Conceicao Rodrigues College of Engineering",
      degree: "B.Tech in Computer Science & Engineering",
      period: "August 2022 - Present",
      description: "Focus on advanced algorithms, software engineering principles, and scalable system design."
    },
    {
      institution: "Vidyavardhini's Bhausaheb Vartak Polytechnic",
      degree: "Diploma in Computer Engineering",
      period: "July 2022 - April 2025",
      description: "Graduated with 93.4%. Specialized in core computing and development."
    }
  ];

  const certifications = [
    "GitHub Foundations",
    "Prompt Design in Vertex AI",
    "JPMorgan Chase & Co - Tech Simulation"
  ];

  const achievements = [
    {
      title: "1st Place \u2013 State Level Tech Presentation",
      description: "Research paper on Multimodal AI & Prompt Engineering for Automation."
    },
    {
      title: "Consolation \u2013 State Level Project Competition",
      description: "Developed 'Elliot' \u2013 an AI-Powered Development Suite."
    },
    {
      title: "Research Publication",
      description: "'Windows Login Bypass Techniques - A Red Teamer's Perspective', Conference ISTE - International Conference of Technical Education. Published in Journal IJTE - Indian Journal of Technical Education."
    }
  ];

  const hackathons = [
    {
      title: "DevHacks 24-Hour Hackathon | Domain Winner",
      subtitle: "Best Project in Web Development \u2013 Feb 2026",
      points: [
        "Developed Empire Protocol, a 3D browser-based strategy game with AI-driven dynamic events.",
        "Designed the web architecture and gameplay mechanics for real-time interaction and strategic decision-making."
      ]
    },
    {
      title: "State Level Hackathon - Code-A-thon",
      subtitle: "Top 10 out of 670+ teams \u2013 Feb 2026",
      points: [
        "SocialSense centralizes X, Instagram, FB, and YouTube management, streamlining ad campaigns and collaborator oversight.",
        "Fourteen AI agents automate workflows, including viral prediction, competitor tracking, and financial reporting."
      ]
    }
  ];

  return (
    <section id="education" ref={sectionRef} className="py-32 px-6 lg:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left column (Header) */}
        <div className="md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">
          <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs mb-4">
            03. Credentials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
            Education<br/>& Honors.
          </h2>
          <div className="w-12 h-[1px] bg-primary mt-8"></div>
          <p className="mt-8 text-foreground/60 font-sans font-light leading-relaxed max-w-xs transition-all duration-1000 delay-300">
            A background rooted in strong academic foundations, competitive problem-solving, and continuous learning.
          </p>
        </div>

        {/* Right column (Content) */}
        <div className={`md:w-2/3 flex flex-col gap-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
          
          {/* Education block */}
          <div>
            <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 mb-12">Academic History</h3>
            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 text-foreground/50 text-sm font-sans tracking-wider pt-1">{edu.period}</div>
                  <div className="md:col-span-3">
                    <h4 className="text-xl font-serif text-foreground mb-2">{edu.degree}</h4>
                    <p className="text-primary/80 font-sans text-sm tracking-wider uppercase mb-4">{edu.institution}</p>
                    <p className="text-foreground/70 font-sans font-light leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Separation */}
          <div className="h-[1px] w-full bg-border/40"></div>

          {/* Achievements & Certs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 mb-12">Licenses & Certifications</h3>
              <ul className="space-y-6">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-4 group cursor-pointer">
                    <span className="text-primary mt-1 opacity-50 group-hover:opacity-100 transition-opacity">◆</span>
                    <span className="text-foreground/80 font-sans font-light tracking-wide group-hover:text-foreground transition-colors">{cert}</span>
                  </li>
                ))}
              </ul>
              <div 
                className="mt-8 pt-4 border-t border-border/20 inline-block text-xs font-sans uppercase tracking-widest text-primary cursor-pointer hover:text-foreground transition-colors"
                onClick={() => window.open('https://www.linkedin.com/in/jagtap-atharva/details/certifications')}
              >
                View all Licenses →
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 mb-12">Honors & Awards</h3>
              <div className="space-y-10">
                {achievements.map((achievement, index) => (
                  <div key={index} className="group">
                    <h4 className="text-lg font-serif text-foreground mb-3">{achievement.title}</h4>
                    <p className="text-sm text-foreground/60 font-sans font-light leading-relaxed group-hover:text-foreground/80 transition-colors">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hackathons Section */}
          <div className="pt-16 border-t border-border/40">
            <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 mb-12">Recent Hackathons</h3>
            <div className="space-y-16">
              {hackathons.map((hackathon, index) => (
                <div key={index}>
                  <h4 className="text-xl md:text-2xl font-serif text-foreground mb-2">{hackathon.title}</h4>
                  <p className="text-primary/80 font-sans text-sm tracking-wider uppercase mb-6">{hackathon.subtitle}</p>
                  <ul className="space-y-3">
                    {hackathon.points.map((point, ptIdx) => (
                      <li key={ptIdx} className="flex gap-4 items-start group">
                        <span className="text-primary opacity-50 group-hover:opacity-100 transition-opacity text-border text-sm mt-1">▶</span>
                        <p className="text-foreground/70 font-sans font-light text-base leading-relaxed group-hover:text-foreground transition-colors">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
