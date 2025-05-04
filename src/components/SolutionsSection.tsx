import { useRef, useEffect, useState } from "react";
import SolutionCard from "./SolutionCard";
import {
  Bitcoin,
  Layers,
  Lock,
  BarChart4,
  Database,
  Scale,
} from "lucide-react";

const SolutionsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const solutions = [
    {
      title: "Smart Contract Development",
      description:
        "Custom smart contracts tailored to your specific business needs.",
      features: [
        "Secure contract architecture",
        "ERC standard implementations",
        "Automated testing and verification",
        "Gas optimization",
        "Upgrade strategies",
      ],
      icon: <Layers size={36} />,
    },
    {
      title: "Security Audits & Optimization",
      description:
        "Comprehensive security reviews and gas optimization for your blockchain projects.",
      features: [
        "Static and dynamic analysis",
        "Formal verification",
        "Gas optimization techniques",
        "Security best practices",
        "Bug bounty program setup",
      ],
      icon: <Lock size={36} />,
    },
    {
      title: "DeFi Protocol Development",
      description:
        "End-to-end development of decentralized finance protocols and applications.",
      features: [
        "Lending and borrowing platforms",
        "Automated market makers",
        "Yield farming strategies",
        "Staking mechanisms",
        "Cross-chain solutions",
      ],
      icon: <Bitcoin size={36} />,
    },
    {
      title: "Blockchain Data Analytics",
      description:
        "Extract insights from on-chain data to drive strategic decisions.",
      features: [
        "Custom analytics dashboards",
        "Real-time monitoring",
        "Historical trend analysis",
        "Smart contract event tracking",
        "Integration with business intelligence tools",
      ],
      icon: <BarChart4 size={36} />,
    },
    {
      title: "Enterprise Blockchain Solutions",
      description:
        "Private and consortium blockchain implementations for enterprise use cases.",
      features: [
        "Supply chain tracking",
        "Asset tokenization",
        "Digital identity solutions",
        "Document verification",
        "Cross-organizational workflows",
      ],
      icon: <Database size={36} />,
    },
    {
      title: "Regulatory Compliance",
      description:
        "Ensure your blockchain projects comply with relevant regulations.",
      features: [
        "KYC/AML integration",
        "Legal framework consultation",
        "Privacy-preserving solutions",
        "Regulatory documentation",
        "Compliance monitoring",
      ],
      icon: <Scale size={36} />,
    },
  ];

  return (
    <section id="solutions" className="py-24 px-6 relative overflow-hidden">
      {/* Stars background */}
      <div className="stars-bg"></div>

      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-primary/10 via-primary/5 to-transparent opacity-50 blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
            Services
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Blockchain Solutions
          </h3>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Comprehensive blockchain development services to help businesses
            leverage the power of distributed ledger technology for innovation
            and growth.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              {...solution}
              className={`opacity-0 animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
