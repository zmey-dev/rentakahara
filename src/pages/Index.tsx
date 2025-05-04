
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SolutionsSection from '@/components/SolutionsSection';
import ContactSection from '@/components/ContactSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  // Handle scroll animations for elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Initialize scroll behavior for project cards and other animated elements
  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.animate-slide-up');
    
    const handleScroll = () => {
      fadeInElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('opacity-100');
          element.classList.remove('opacity-0');
        }
      });
    };
    
    // Trigger once on load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SolutionsSection />
        {/* <ContactSection /> */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
