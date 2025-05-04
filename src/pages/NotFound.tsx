
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="text-center glass-card p-10 rounded-xl max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <path d="M13 2v7h7"></path>
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">404</h1>
        <p className="text-xl text-foreground/80 mb-8">Oops! Page not found</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:brightness-110 hover-lift"
        >
          Return to Home
          <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l4-4m0 0l4 4m-4-4V4" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
