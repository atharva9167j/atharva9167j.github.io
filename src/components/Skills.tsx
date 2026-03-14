import { useState, useRef, useEffect } from 'react';

export const Skills = () => {
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

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React.js", "Next.js", "React Native", "JavaScript", "TypeScript", "HTML5", "CSS", "Tailwind CSS"],
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Python", "PHP", "API Dev", "Database Design", "RESTful APIs", "Express.js"],
    },
    {
      title: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "PHP"],
    },
    {
      title: "Tools & Technologies",
      skills: ["Agentic AI", "Git", "GitHub", "Postman", "Vite", "Expo", "Gemini APIs", "Firebase", "GCP"],
    },
    {
      title: "Product & Project Management",
      skills: ["Product Strategy", "Agile Methodologies", "Cross-functional Leadership", "Sprint Planning", "Market Research", "Project Management"],
    }
  ];

  const topSkills = ["React.js", "Agentic AI Development", "API Development", "Product Management"];

  return (
    <section id="skills" ref={sectionRef} className="py-32 px-6 lg:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left column (Header F-scan start - Sticky) */}
        <div className="md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">
          <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs mb-4">
            04. Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
            Skills.
          </h2>
          <div className="w-12 h-[1px] bg-primary mt-8"></div>
          <p className="mt-8 text-foreground/60 font-sans font-light leading-relaxed max-w-xs transition-all duration-1000 delay-300">
            A comprehensive overview of my technical capabilities, highlighting the tools and technologies I use to build scalable solutions.
          </p>
        </div>

        {/* Right column (Content) */}
        <div className={`md:w-2/3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
          
          <div className="mb-20">
            <h3 className="text-xs font-sans uppercase tracking-widest text-primary/70 mb-8">Core Competencies</h3>
            <div className="flex flex-wrap gap-4">
              {topSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-primary/5 text-foreground px-6 py-4 border border-primary/20 font-sans tracking-wide text-sm hover:bg-primary/10 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 border-t border-border/50 pt-16">
            {skillCategories.map((category, index) => (
              <div key={index} className="group cursor-default">
                <h3 className="text-xl font-serif text-foreground mb-6 group-hover:text-primary transition-colors">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-foreground/70 text-sm font-sans font-light bg-foreground/5 px-3 py-1.5 rounded-sm hover:bg-foreground/10 hover:text-foreground transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
