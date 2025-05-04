import { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import CosmicBackground from "./CosmicBackground";
import ProjectGalleryDialog from "./ProjectGalleryDialog";

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Online Fashion Store",
      description:
        "The online shop specialized in the production of jackets, coats, trousers, clothes and sportswear for men, born from the creative inspiration of Luciano Acquaviva.",
      technologies: ["Laravel", "React", "Inertia.js", "Tailwind CSS", "MySQL"],
      github: "#",
      liveUrl: "#",
      imageUrl: "/1/moda.png",
    },
    {
      title: "Social Media Platform",
      description:
        "MultiMuse is a state of the art social media platform built for aspiring creators, established creators, and devoted supporters. The first free social media platform where users can make and share the progress of their projects. The platform allows to easily create, track, and manage projects.",
      technologies: [
        "react",
        "Tailwind CSS",
        "Django",
        "postgreSql",
        "GraphQL",
      ],
      github: "#",
      liveUrl: "#",
      imageUrl: "/2/mm.png",
    },
    {
      title: "MadPaws Blog",
      description:
        "Mad Paws allows you to find the perfect Minder in your neighborhood for your pet. You just simply have to type in your suburb, address or postcode and instantly you will have loving Minders popping up in your area.",
      technologies: [
        "WordPress",
        "CMS",
      ],
      github: "#",
      liveUrl: "#",
      imageUrl:
        "/3/madpaws-blog.png",
    },
    {
      title: "e-Commerce Store (WordPress)",
      description:
        "Akin Home is a travel-inspired e-Commerce store offering home decoration goods. The appearance of the website depends on the collection of goods chosen by the user.",
      technologies: ["Python", "React", "FastAPI", "AWS IoT", "PostgreSQL", "WordPress"],
      github: "#",
      imageUrl:
        "/4/Akin 1-min-min.png",
    },
    {
      title: "Real Estate Marketplace",
      description:
        "Beycome connects sellers & owners directly to buyers & renters. The platform not only provides a place for this connection but is also legally finalizes the transaction from the beginning to the end.",
      technologies: ["express", "DialogFlow", "MongoDB", "Stripe API"],
      github: "#",
      imageUrl:
        "/5/screencapture-beycome-1492162129755.png",
    },
    {
      title: "Recipe Hub & Meal Planner & Shopping List Creator",
      description:
        "ThermoHub is the ultimate Thermomix (and thermal cooker) resource for meals plans, shopping lists and the best recipes Features: - 3 Membership Types - Interactive Meal Planner - add your own Custom Recipes - Shopping List Creator - save Shopping List as PDF for offline access",
      technologies: ["Vue.js", "D3.js", "laravel", "GraphQL", "PostgreSQL"],
      github: "#",
      liveUrl: "#",
      imageUrl:
        "/6/screencapture-thermohub-1491375537145.png",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 px-6 relative overflow-hidden bg-black"
    >
      {/* Cosmic background */}
      <CosmicBackground />

      {/* Adding cosmic elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-500/5 via-purple-500/5 to-transparent opacity-50 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-indigo-500/10 via-indigo-500/5 to-transparent opacity-40 blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
            Portfolio
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured Projects
          </h3>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            A collection of my most impactful full-stack and AI-powered
            solutions, showcasing web applications, machine learning
            implementations, and innovative digital experiences.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              className={`opacity-0 animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="inline-flex items-center px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-foreground font-medium transition-all hover:bg-white/10 hover-lift"
          >
            View All Projects
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Project Gallery Dialog */}
      <ProjectGalleryDialog
        projects={projects}
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
      />
    </section>
  );
};

export default ProjectsSection;
