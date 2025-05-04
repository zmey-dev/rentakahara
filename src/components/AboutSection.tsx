import { useRef } from "react";
import SkillBadge from "./SkillBadge";
import {
  Code,
  Database,
  Cpu,
  Shield,
  Globe,
  BookOpen,
  Building2,
} from "lucide-react";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-primary/10 via-primary/5 to-transparent opacity-50 blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Left column - Profile */}
          <div className="md:w-2/5 space-y-8">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                About Me
              </h2>
              <h3 className="text-3xl font-display font-bold mb-6">
                Full Stack Developer & AI Solutions Expert
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                With 8+ years of experience in software development, I
                specialize in building robust web applications and AI-powered
                solutions. My focus is on creating scalable architectures that
                leverage cloud technologies and modern frameworks to solve
                complex business challenges.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <Globe className="text-primary h-5 w-5" />
                <span>Based in Pridniprianske, Poltavska Oblast, Ukraine</span>
              </div>
              <div className="flex gap-3 items-center">
                <BookOpen className="text-primary h-5 w-5" />
                <span>
                  Master's in Computer Engineering, Poltava Polytechnic
                  University
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Building2 className="text-primary h-5 w-5" />
                <span>Currently Freelancing on Upwork</span>
              </div>
            </div>
          </div>

          {/* Right column - Experience */}
          <div className="md:w-3/5 space-y-10" ref={containerRef}>
            {/* Employment History */}
            <div className="space-y-6">
              <h4 className="text-lg font-display font-medium mb-4">
                Employment History
              </h4>

              {/* Current Position */}
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <h5 className="font-medium">Freelance Developer at Upwork</h5>
                <p className="text-sm text-foreground/70">Jun 2024 - Present</p>
                <ul className="list-disc list-inside text-sm text-foreground/70 mt-2 space-y-1">
                  <li>
                    {/* Successfully delivered Rivertown Solar project, a
                    comprehensive renewable energy management system */}
                    Created MultiMuse, a social platform for sharing and tracking creative projects.
                  </li>
                  <li>
                    Built with Laravel backend, React.js frontend, Inertia.js
                    for seamless SPA experience, and Tailwind CSS for UI
                  </li>
                  <li>
                    Implemented features for solar panel monitoring, energy
                    production tracking, and customer billing automation
                  </li>
                  <li>
                    Optimized database architecture for handling large volumes
                    of time-series energy production data
                  </li>
                </ul>
              </div>

              {/* Previous Position */}
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <h5 className="font-medium">Senior Developer at DataSoft</h5>
                <p className="text-sm text-foreground/70">
                  Jan 2023 - May 2024
                </p>
              </div>

              {/* Previous position */}
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <h5 className="font-medium">
                  Full Stack Engineer at SoftServe
                </h5>
                <p className="text-sm text-foreground/70">
                  Mar 2020 - Dec 2022 · 2 years 10 months
                </p>
                <p className="text-sm text-foreground/70">Tokyo, Japan</p>
                <ul className="list-disc list-inside text-sm text-foreground/70 mt-2 space-y-1">
                  <li>
                    Led development of enterprise SaaS solutions using React,
                    Node.js, and AWS
                  </li>
                  <li>
                    Implemented machine learning models with TensorFlow and
                    PyTorch
                  </li>
                  <li>
                    Designed microservice architectures with Docker and
                    Kubernetes
                  </li>
                </ul>
              </div>

              {/* Previous positions summarized */}
              <div className="border-l-2 border-primary/30 pl-4 space-y-1">
                <h5 className="font-medium">Previous Roles</h5>
                <p className="text-sm text-foreground/70">
                  Software Developer at GlobalLogic (2018-2020)
                </p>
                <p className="text-sm text-foreground/70">
                  Junior Developer at Intellias (2016-2018)
                </p>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-display font-medium mb-4 flex items-center">
                  <Code className="mr-2 text-primary" size={20} />
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="JavaScript" level="expert" />
                  <SkillBadge name="TypeScript" level="expert" />
                  <SkillBadge name="React" level="expert" />
                  <SkillBadge name="WordPress" level="expert" />
                  <SkillBadge name="Django" level="expert" />
                  <SkillBadge name="Laravel" level="expert" />
                  <SkillBadge name="Node.js" level="expert" />
                  <SkillBadge name="Python" level="advanced" />
                  <SkillBadge name="Next.js" level="advanced" />
                  <SkillBadge name="Inertia.js" level="expert" />
                  <SkillBadge name="GraphQL" level="advanced" />
                  <SkillBadge name="Tailwind CSS" level="expert" />
                  <SkillBadge name="postgreSql" level="expert" />
                  <SkillBadge name="MongoDB" level="advanced" />
                </div>
              </div>
            </div>

            {/* AI & Machine Learning */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-display font-medium mb-4 flex items-center">
                  <Cpu className="mr-2 text-primary" size={20} />
                  AI & Machine Learning
                </h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="OpenAI" level="expert" />
                  <SkillBadge name="LangChain" level="advanced" />
                  <SkillBadge name="TensorFlow" level="intermediate" />
                  <SkillBadge name="PyTorch" level="intermediate" />
                  <SkillBadge name="NLP" level="advanced" />
                  <SkillBadge name="Chatbots" level="expert" />
                  <SkillBadge name="Vector Databases" level="advanced" />
                  <SkillBadge name="RAG" level="advanced" />
                </div>
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-display font-medium mb-4 flex items-center">
                  <Database className="mr-2 text-primary" size={20} />
                  Cloud & DevOps
                </h4>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge name="AWS" level="advanced" />
                  <SkillBadge name="Azure" level="intermediate" />
                  <SkillBadge name="GCP" level="intermediate" />
                  <SkillBadge name="CI/CD" level="advanced" />
                  <SkillBadge name="Terraform" level="intermediate" />
                  <SkillBadge name="GitHub Actions" level="advanced" />
                  <SkillBadge name="Docker" level="advanced" />
                  <SkillBadge name="Kubernetes" level="intermediate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
