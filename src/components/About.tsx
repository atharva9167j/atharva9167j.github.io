import { useEffect, useState, useRef } from 'react';
import { useCounterAnimation } from '@/hooks/use-counter-animation';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Call hooks unconditionally at the top level
  const experienceCounter = useCounterAnimation({ end: 3, suffix: '+', decimals: 0, start: isVisible });
  const projectsCounter = useCounterAnimation({ end: 35, suffix: '+', decimals: 0, delay: 200, start: isVisible });
  const academicCounter = useCounterAnimation({ end: 93.4, suffix: '%', decimals: 1, delay: 400, start: isVisible });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6 lg:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left column (Header F-scan start) */}
        <div className="md:w-1/3 flex flex-col items-start">
          <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs mb-4">
            01. Background
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
            About Me.
          </h2>
          <div className="w-12 h-[1px] bg-primary mt-8 mb-12"></div>
          
          <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden filter transition-all duration-700 ease-out hidden md:block">
            <img src="/profile.png" alt="Atharva Jagtap" className="w-full h-full object-cover" />
            
          </div>
        </div>

        {/* Right column (Content) */}
        <div className="md:w-2/3">
          {/* Mobile Profile Pic */}
          <div className="md:hidden relative w-full aspect-square max-w-sm mx-auto mb-12 overflow-hidden filter transition-all duration-700 border border-border/50">
            <img src="/profile.png" alt="Atharva Jagtap" className="w-full h-full object-cover object-top" />
          </div>
          <div className={`space-y-8 text-foreground/80 font-sans font-light text-lg leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl text-foreground font-serif leading-snug">
              Full-Stack Developer, Agentic AI Developer & Freelancer, <br/> known online as Atharva9167j.
            </p>
            <p>
              As an alumni of Vartak Polytechnic and a student of Fr. Conceicao Rodrigues College of Engineering (Fr. CRCE / Father Agnel), I bring strong academic foundations and technical depth to every project. <br/><br/> I specialize in end-to-end development — from crafting efficient back-end APIs and integrating advanced Agentic AI models to building seamless, high-performance front-end interfaces.
            </p>
            <p>
              My expertise includes Prompt Engineering, intelligent system design, and deep debugging, ensuring robust and optimized code delivery across all stages of development. With a passion for clean architecture and continuous improvement, I aim to deliver intelligent, secure, and user-centric solutions that drive measurable impact.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 border-t border-border/50 pt-16">
            <div className={`flex flex-col transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-5xl font-serif text-primary mb-2">
                {experienceCounter}
              </div>
              <div className="text-xs font-sans uppercase tracking-widest text-foreground/60">Years Experience</div>
            </div>
            <div className={`flex flex-col transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-5xl font-serif text-primary mb-2">
                {projectsCounter}
              </div>
              <div className="text-xs font-sans uppercase tracking-widest text-foreground/60">Projects Completed</div>
            </div>
            <div className={`flex flex-col transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-5xl font-serif text-primary mb-2">
                {academicCounter}
              </div>
              <div className="text-xs font-sans uppercase tracking-widest text-foreground/60">Academic Score</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
