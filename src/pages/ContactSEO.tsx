import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";

const ContactSEO = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans opacity-100 animate-in fade-in duration-1000">
      <Helmet>
        <title>Contact Atharva Jagtap | reach Atharva9167j</title>
        <meta
          name="description"
          content="Get in touch with Atharva Jagtap (Atharva9167j), a freelance full stack developer and Agentic AI developer. Connect for projects or collaborations."
        />
        <meta
          name="keywords"
          content="contact atharva jagtap, hire atharva9167j, atharva jagtap freelancer"
        />
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-16">
        <div className="px-4 md:px-8 max-w-7xl mx-auto mb-2">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4 text-center">
            Connect with Atharva Jagtap (Atharva9167j)
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            Looking for a skilled <strong>Full Stack Developer</strong> or <strong>Agentic AI Developer</strong>? 
            Reach out to Atharva Jagtap. As an active <strong>freelancer</strong> and open-source contributor, 
            he is always open to discussing new engineering challenges.
          </p>
        </div>
        
        <Contact />
      </main>
    </div>
  );
};

export default ContactSEO;
