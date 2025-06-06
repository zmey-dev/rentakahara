import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <span className="flex items-center mb-4 block gap-2 font-display text-white text-xl">
              Ken Sato
            </span>
            <p className="text-foreground/70 mb-6 max-w-md">
              Experienced Full Stack Developer with 8+ years of expertise in
              building web applications and AI-powered solutions. Skilled in
              creating scalable architectures leveraging cloud technologies and
              implementing custom AI solutions using modern frameworks and
              tools.
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
              Back to top
            </button>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Projects", "Solutions", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:lavendarsolution@outlook.com"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} | Ken Sato, Tokyu, Japan
          </p>

          <div className="flex gap-6">
            <a
              href="mailto:lavendarsolution@outlook.com"
              className="text-foreground/60 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
