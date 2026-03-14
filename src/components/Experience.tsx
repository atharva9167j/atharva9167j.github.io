export const Experience = () => {
  const experiences = [
    {
      title: "Freelance Project Developer",
      company: "Freelance",
      period: "September 2024 - Present (10 months)",
      location: "Remote",
      description: "Specialized in developing responsive websites, scalable web applications, and android applications using Expo. Assisted with project development and provided tailored digital solutions from concept to deployment with a focus on high-quality architecture.",
      current: true
    },
    {
      title: "Full Stack Web Development Intern",
      company: "Edba Academy",
      period: "April 2024 - June 2025 (3 months)",
      location: "Virar West",
      description: "Optimized UI/UX enhancing interactivity by 20%. Built fast, responsive front-ends and improved load times by 15%. Developed scalable back-ends and designed RESTful APIs. Integrated Gemini APIs to enhance AI features.",
      current: false
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 lg:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left column (Header) */}
        <div className="md:w-1/3 flex flex-col items-start">
          <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs mb-4">
            02. Career
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
            Experience.
          </h2>
          <div className="w-12 h-[1px] bg-primary mt-8"></div>
        </div>

        {/* Right column (Content) */}
        <div className="md:w-2/3">
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col lg:flex-row lg:items-baseline gap-2 lg:gap-8 mb-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-foreground">{exp.title}</h3>
                  <span className="text-primary/70 font-sans tracking-wider text-sm">{exp.period}</span>
                </div>
                
                <h4 className="text-lg font-sans text-foreground/80 mb-6 uppercase tracking-widest text-sm">
                  {exp.company} <span className="opacity-50 mx-2">—</span> {exp.location}
                  {exp.current && <span className="ml-4 text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-none border border-primary/20">CURRENT</span>}
                </h4>
                
                <p className="text-foreground/70 font-sans font-light text-lg leading-relaxed max-w-3xl">
                  {exp.description}
                </p>
                
                {/* Decorative border bottom */}
                <div className="w-full h-[1px] bg-border/30 mt-16 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
