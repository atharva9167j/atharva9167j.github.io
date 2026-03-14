
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = () => {
  const location = useLocation();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const isLoaded = loadingProgress >= 100;

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return; // Wait until loading screen is finished

    if (location.pathname === '/') {
      // Scroll to top for home page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const id = location.pathname.substring(1); // Remove leading slash
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure layout shifts are done
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location, isLoaded]);
  return (
    <>
      {!isLoaded && <LoadingScreen progress={loadingProgress} />}
      <div className={`min-h-screen bg-background text-foreground transition-colors duration-500 font-sans ${isLoaded ? 'opacity-100 animate-in fade-in duration-1000' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Navigation />
        <Hero onProgress={(p) => setLoadingProgress(p)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
    </>
  );
};

export default Index;
