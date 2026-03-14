import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqData = [
    {
      question: "Who is Atharva9167j?",
      answer: "Atharva9167j is the primary online alias of software developer Atharva Jagtap. He uses this handle on GitHub, LinkedIn, and other dev platforms."
    },
    {
      question: "Who is Atharva Jagtap?",
      answer: "Atharva Jagtap is a Full Stack Developer, Agentic AI Developer, and Freelancer, known across the internet as Atharva9167j."
    },
    {
      question: "Which college did Atharva Jagtap attend?",
      answer: "Atharva Jagtap is an alumni of Vartak Polytechnic and pursues engineering at Fr. Conceicao Rodrigues College of Engineering (Fr. CRCE / Father Agnel)."
    },
    {
      question: "What does Atharva Jagtap specialize in?",
      answer: "He specializes in Full Stack web development (React.js, Node.js), Agentic AI development, and is an active open-source contributor."
    }
  ];

  // Generate FAQ Schema dynamically
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans opacity-100 animate-in fade-in duration-1000">
      <Helmet>
        <title>FAQ - Atharva Jagtap (Atharva9167j)</title>
        <meta
          name="description"
          content="Frequently asked questions about Atharva Jagtap, Atharva9167j, his college (Vartak, Fr. CRCE), and his work as a developer."
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto min-h-[70vh]">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      <Contact />
    </div>
  );
};

export default FAQ;
