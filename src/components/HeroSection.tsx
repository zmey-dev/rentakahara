import { useEffect, useRef, useState } from "react";
import AnimatedText from "./AnimatedText";
import { ArrowDown, ExternalLink, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-radial from-primary/10 via-primary/5 to-transparent opacity-90 blur-3xl" />

      <div
        className={`container max-w-5xl mx-auto text-center relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-sm font-medium text-primary">
            Full Stack Developer & AI Solutions Expert
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <AnimatedText
            text="Crafting innovative"
            className="block mb-2 text-balance leading-[1.25]"
            delay={200}
            typingEffect={true}
          />
          <span className="block text-gradient floating leading-[1.25]">
            digital experiences with AI
          </span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 text-balance">
          I build scalable cloud architectures and enterprise solutions that
          drive technological transformation and business growth.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:brightness-110 hover-lift pulse"
          >
            Connect with me
          </a>

          <a
            href="#projects"
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-foreground font-medium transition-all hover:bg-white/10 hover-lift"
          >
            Explore projects
          </a>
        </div>

        <div className="flex justify-center gap-6 mb-24">
          <a
            href="mailto:lavendarsolution@outlook.com"
            className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover-lift"
            aria-label="Contact me"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a
          href="#about"
          className="w-12 h-12 flex items-center justify-center animate-bounce"
          aria-label="Scroll to About section"
        >
          <ArrowDown
            size={28}
            strokeWidth={1.5}
            className="text-primary filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"
          />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
