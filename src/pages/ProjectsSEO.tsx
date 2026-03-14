import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

const ProjectsSEO = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans opacity-100 animate-in fade-in duration-1000">
      <Helmet>
        <title>Projects by Atharva9167j (Atharva Jagtap)</title>
        <meta
          name="description"
          content="Explore the development portfolio and open source projects built by Atharva Jagtap, known online as Atharva9167j. Full Stack Developer and Agentic AI expert."
        />
        <meta
          name="keywords"
          content="projects by atharva9167j, atharva jagtap portfolio, atharva jagtap developer projects, atharva jagtap agentic ai developer"
        />
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-16">
        <div className="px-4 md:px-8 max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Projects Built By Atharva Jagtap (Atharva9167j)
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive list of projects developed by Atharva Jagtap, including full stack applications, Agentic AI tools, and freelance work.
            As an open-source contributor, Atharva9167j regularly publishes code that helps the developer community.
          </p>
        </div>
        
        {/* Reusing existing Projects component */}
        <section id="projects-list">
          <Projects />
        </section>
      </main>

      <Contact />
    </div>
  );
};

export default ProjectsSEO;
