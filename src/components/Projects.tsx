import { useState, useRef, useEffect } from 'react';
import { ImageLightbox } from './ImageLightbox';
import { ZoomIn } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
  modalImages?: string[];
  featured?: boolean;
}

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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

  const projects: Project[] = [
    {
      title: "Preso - AI Presentations Builder",
      description: "An advanced AI-powered platform for rapidly building, designing, and collaborating on professional presentations. It uses large language models to transform simple text prompts into fully structured, visually stunning slides, streamlining the presentation creation process for users.",
      technologies: ["React", "TypeScript", "Vite", "Google AI SDK", "AI Integration", "Tailwind CSS"],
      link: "https://preso-ai.vercel.app",
      image: "/images/preso/preso_ss1.jpeg",
      modalImages: [
        "/images/preso/preso_ss1.jpeg",
        "/images/preso/preso_ss2.jpeg",
        "/images/preso/preso_ss3.jpeg",
        "/images/preso/preso_ss4.jpeg",
        "/images/preso/preso_ss5.jpeg",
        "/images/preso/preso_ss6.jpeg",
        "/images/preso/preso_ss7.jpeg",
        "/images/preso/preso_ss8.jpeg"
      ],
      featured: true
    },
    {
      title: "Glyphify - Android and IOS Application",
      description: "Glyphify is a cutting-edge mobile application designed to revolutionize the way teachers and students handle information. By leveraging intelligent AI, Glyphify effortlessly extracts text from documents, converting handwritten notes and printed materials into editable digital text. This powerful tool streamlines workflows, saves valuable time, and bridges the gap between the physical and digital worlds for both educators and learners.",
      technologies: ["React-native", "CSS", "JavaScript", "Google Generative AI"],
      link: "https://atharva9167j.github.io/Glyphify",
      image: "/images/glyphify/glyphify_ss1.png",
      modalImages: ["/images/glyphify/glyphify_ss1.png", "/images/glyphify/glyphify_ss2.png"],
      featured: true
    },
    {
      title: "Designo – AI-Powered Figma Plugin",
      description: "Created a GenAI-based Figma plugin that streamlines the creation workflow by generating intelligent design proposals and mockups from textual input. Integrated advanced language models with the canvas for smart element placement and prompt-to-interface transformation, improving UI/UX creation efficiency by 25%.",
      technologies: ["Tailwind CSS", "Google Generative AI", "Google Dev Kit", "Python Flask API", "Firebase"],
      link: "https://github.com/atharva9167j/Designo",
      image: "/images/designo/designo_ss1.png",
      modalImages: ["/images/designo/designo_ss1.png", "/images/designo/designo_ss2.png", "/images/designo/designo_ss3.png"],
      featured: true
    },
    {
      title: "Elliot – AI-Powered Software Suite",
      description: "Spearheaded development of an innovative AI-powered suite capable of generating full-stack web and Android applications from natural language prompts. Implemented advanced AI agents for intelligent task handling, tool invocation, and rapid concept-to-code transformation, significantly reducing development time by an estimated 40%.",
      technologies: ["React.js", "Tailwind HTML", "OpenAI API", "Python Flask", "SQLite"],
      link: "#",
      image: "/images/elliot/elliot_ss3.png",
      modalImages: ["/images/elliot/elliot_ss1.png", "/images/elliot/elliot_ss2.png", "/images/elliot/elliot_ss3.png"],
      featured: true
    },
    {
      title: "SkillsElevate – Learning Platform",
      description: "Built an AI-driven learning platform enhancing quantitative, verbal, logical reasoning, and data interpretation through interactive practice, assessments, real-time feedback, gamification, and performance analytics.",
      technologies: ["React.js", "Node.js", "Firebase", "Generative AI"],
      link: "https://github.com/atharva9167j/SkilsElevate_Aptitude_Assessment_Tool",
      image: "/images/skillselevate/skillselevate_ss1.png",
      modalImages: ["/images/skillselevate/skillselevate_ss1.png", "/images/skillselevate/skillselevate_ss2.png", "/images/skillselevate/skillselevate_ss3.png"],
    },
    {
      title: "Sign Language Translator",
      description: "Engineered a real-time American Sign Language (ASL) recognition system leveraging MediaPipe and React, effectively bridging communication gaps for hearing-impaired individuals.",
      technologies: ["TypeScript", "React.js", "Node.js", "Jupyter", "Google Cloud", "MediaPipe"],
      link: "https://github.com/atharva9167j/Sign-Language-Translator",
      image: "/images/signlangtrans/signlangtrans_ss1.png",
      modalImages: ["/images/signlangtrans/signlangtrans_ss1.png"],
    },
    {
      title: "Health Consultant Platform",
      description: "Implemented a full-stack telehealth platform facilitating remote healthcare consultations, secure management of medical records, and streamlined digital appointment scheduling, improving patient access and administrative efficiency.",
      technologies: ["JavaScript", "React.js", "Node.js", "SQLite"],
      link: "https://github.com/atharva9167j/Heath-Consultant-System",
      image: "/images/healthconsystem/healthconsystem_ss1.png",
      modalImages: ["/images/healthconsystem/healthconsystem_ss1.png", "/images/healthconsystem/healthconsystem_ss2.png", "/images/healthconsystem/healthconsystem_ss3.png", "/images/healthconsystem/healthconsystem_ss4.png", "/images/healthconsystem/healthconsystem_ss5.png"],
    }
  ];

  const openSourceContributions: Project[] = [
    {
      title: "dom-to-pptx \u2013 NPM Library",
      description: "Engineered a high-performance library to convert DOM nodes to editable PPTX, achieving 99% visual fidelity across gradients, shadows, and complex layouts. Handled complex CSS mapping for 50+ style properties, providing a lightweight alternative to server-side exports and reducing server costs by 100%.",
      technologies: ["TypeScript", "CSS", "Geometry NPM"],
      link: "https://www.npmjs.com/package/dom-to-pptx",
      image: "https://media.licdn.com/dms/image/v2/D5622AQHCchb6N2qgzQ/feedshare-shrink_2048_1536/B56ZruwYpxH8Aw-/0/1764942254378?e=1775088000&v=beta&t=oqU5F5DnBMGD4bRg3q2Xbj9NTvzXQW75_-B1O-5U80I", // Placeholder image
      modalImages: [],
      featured: true
    },
    {
      title: "Bolt.dev - AI-Powered Web Development",
      description: "Maintained an independent fork of the Bolt project, an AI-powered full-stack browser development environment. Integrated 19+ AI providers (OpenAI, Anthropic, Gemini, etc.), added a dedicated Product Manager AI prompt, improved WebContainer reliability, and implemented advanced context handling for agentic flows.",
      technologies: ["TypeScript", "React", "AI SDK", "Node.js", "WebContainer"],
      link: "https://github.com/atharva9167j/bolt.diy",
      image: "https://github.com/atharva9167j/bolt.dev/raw/main/public/social_preview_index.jpg", // Placeholder image
      modalImages: [],
      featured: true
    },
  ];

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const trimDescription = (description: string, maxLength = 140) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  const handleNextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % (selectedProject.modalImages || [selectedProject.image]).length);
  };

  const handlePrevImage = () => {
    if (!selectedProject) return;
    const len = (selectedProject.modalImages || [selectedProject.image]).length;
    setCurrentImageIndex((prev) => (prev - 1 + len) % len);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 lg:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left column (Header F-scan start) */}
        <div className="md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">
          <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs mb-4">
            05. Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
            Selected<br />Projects.
          </h2>
          <div className="w-12 h-[1px] bg-primary mt-8"></div>
          <p className="mt-8 text-foreground/60 font-sans font-light leading-relaxed max-w-xs transition-all duration-1000 delay-300">
            Showcasing technical precision, architectural understanding, and creative problem-solving across various intelligent solutions.
          </p>
        </div>

        {/* Right column (Content) */}
        <div className="md:w-2/3">
          <div className="flex flex-col gap-24">
            {projects.slice(0, isExpanded ? projects.length : 3).map((project, index) => (
              <div key={index} className={`group cursor-pointer flex flex-col gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`} style={{ transitionDelay: `${index * 150}ms` }} onClick={() => openModal(project)}>
                <div className="w-full aspect-[16/9] bg-border/20 overflow-hidden relative group/img">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter md:grayscale md:opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <button
                    className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-md text-foreground opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedImage(project.image);
                    }}
                    title="Zoom Image"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="opacity-0 md:translate-x-4 md:group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs font-sans uppercase tracking-[0.2em] border-b border-primary/50 text-foreground hover:text-primary pb-1">Live ↗</span>
                      </a>
                    )}
                  </div>
                  <p className="text-foreground/70 font-sans font-light leading-relaxed mb-6">{trimDescription(project.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs font-sans text-foreground/50 uppercase tracking-widest leading-none flex items-center">{tech}{i < Math.min(project.technologies.length, 4) - 1 ? <span className="mx-2 text-border">—</span> : ''}</span>
                    ))}
                    {project.technologies.length > 4 && <span className="text-xs font-sans text-foreground/50 uppercase tracking-widest px-2">+ {project.technologies.length - 4} MORE</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {projects.length > 3 && (
            <div className={`mt-16 flex justify-center w-full transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative px-8 py-4 bg-transparent border border-border/50 text-foreground hover:border-primary overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-primary/10 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                <span className="relative text-xs font-sans uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                  {isExpanded ? 'View Less' : 'View All Projects'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Open Source Contributions Section */}
      <div className="max-w-7xl mx-auto mt-48 flex flex-col md:flex-row gap-16 md:gap-24 border-t border-border/40 pt-32">
        {/* Left column */}
        <div className="md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">
          <p className="text-primary font-sans uppercase tracking-[0.3em] text-xs mb-4">
            06. Community
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-[1.1]">
            Open Source<br />Contributions.
          </h2>
          <div className="w-12 h-[1px] bg-primary mt-8"></div>
          <p className="mt-8 text-foreground/60 font-sans font-light leading-relaxed max-w-xs transition-all duration-1000 delay-300">
            Giving back to the developer community through high-performance libraries and independent forks of cutting-edge AI tools.
          </p>
        </div>

        {/* Right column */}
        <div className="md:w-2/3">
          <div className="flex flex-col gap-24">
            {openSourceContributions.map((project, index) => (
              <div key={index} className={`group cursor-pointer flex flex-col gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`} style={{ transitionDelay: `${index * 150}ms` }} onClick={() => openModal(project)}>
                <div className="w-full aspect-[16/9] bg-border/20 overflow-hidden relative group/img">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter md:grayscale md:opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <button
                    className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-md text-foreground opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedImage(project.image);
                    }}
                    title="Zoom Image"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="opacity-0 md:translate-x-4 md:group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs font-sans uppercase tracking-[0.2em] border-b border-primary/50 text-foreground hover:text-primary pb-1">View ↗</span>
                      </a>
                    )}
                  </div>
                  <p className="text-foreground/70 font-sans font-light leading-relaxed mb-6">{trimDescription(project.description)}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs font-sans text-foreground/50 uppercase tracking-widest leading-none flex items-center">{tech}{i < Math.min(project.technologies.length, 4) - 1 ? <span className="mx-2 text-border">—</span> : ''}</span>
                    ))}
                    {project.technologies.length > 4 && <span className="text-xs font-sans text-foreground/50 uppercase tracking-widest px-2">+ {project.technologies.length - 4} MORE</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
          <div className="bg-background border border-border/50 max-w-6xl w-full h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col relative shadow-2xl overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border/30 sticky top-0 bg-background/80 backdrop-blur-md z-10">
              <p className="text-primary font-sans uppercase tracking-[0.2em] text-xs">Project Details</p>
              <button className="text-foreground/50 hover:text-foreground transition-colors uppercase text-xs font-sans tracking-widest" onClick={closeModal}>
                Close ✕
              </button>
            </div>

            <div className="p-6 md:p-12 flex flex-col-reverse md:flex-row gap-8 lg:gap-16">
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="border border-border/40 text-foreground/70 text-[10px] px-3 py-1 font-sans uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-foreground/80 font-sans font-light leading-relaxed mb-10 text-lg">
                  {selectedProject.description}
                </p>
                {selectedProject.link !== "#" ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start bg-primary text-primary-foreground font-sans px-8 py-4 uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors"
                  >
                    View Project
                  </a>
                ) : (
                  <p className="self-start border border-border/40 text-foreground/50 font-sans px-8 py-4 uppercase tracking-widest text-xs">
                    Private Repository
                  </p>
                )}
              </div>

              <div className="md:w-1/2 flex flex-col relative group select-none">
                <div className="aspect-[4/3] w-full bg-border/10 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={(selectedProject.modalImages && selectedProject.modalImages.length > 0) ? selectedProject.modalImages[currentImageIndex] : selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain cursor-zoom-in"
                    onClick={() => setZoomedImage((selectedProject.modalImages && selectedProject.modalImages.length > 0) ? selectedProject.modalImages[currentImageIndex] : selectedProject.image)}
                  />
                  {(selectedProject.modalImages && selectedProject.modalImages.length > 1) && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-between p-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
                        <button className="bg-background/80 text-foreground p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors pointer-events-auto" onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}>
                          ←
                        </button>
                        <button className="bg-background/80 text-foreground p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors pointer-events-auto" onClick={(e) => { e.stopPropagation(); handleNextImage(); }}>
                          →
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {(selectedProject.modalImages || [selectedProject.image]).map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-12 h-1 transition-colors cursor-pointer ${currentImageIndex === idx ? 'bg-primary' : 'bg-border/40'}`}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {zoomedImage && (
        <ImageLightbox
          src={zoomedImage}
          alt={selectedProject?.title || "Project Image"}
          onClose={() => setZoomedImage(null)}
        />
      )}
    </section>
  );
};