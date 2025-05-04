import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  github?: string;
  liveUrl?: string;
}

interface ProjectGalleryDialogProps {
  projects: Project[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectGalleryDialog = ({
  projects,
  open,
  onOpenChange,
}: ProjectGalleryDialogProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [initialRender, setInitialRender] = useState(true);

  // Reset to initial state when dialog opens
  useEffect(() => {
    if (open) {
      setInitialRender(true);
    } else {
      // Reset state when dialog closes
      setActiveIndex(0);
    }
  }, [open]);

  // After initial render, set initialRender to false
  useEffect(() => {
    if (open && initialRender) {
      const timer = setTimeout(() => {
        setInitialRender(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [open, initialRender]);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, projects.length]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, projects.length]);

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handlePrevious, handleNext, onOpenChange]);

  const currentProject = projects[activeIndex];

  if (!currentProject) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full max-h-screen p-0 bg-black/95 border-white/10 overflow-hidden">
        <div className="relative flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <DialogTitle className="text-xl font-display font-medium">
              Project Gallery
            </DialogTitle>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-hidden flex items-center justify-center relative">
            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-4 z-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm h-10 w-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 z-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm h-10 w-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image display */}
            <div
              className={cn(
                "transition-all duration-500 w-full h-full flex items-center justify-center",
                isAnimating && "opacity-0 scale-90"
              )}
            >
              <div
                className={cn(
                  "max-w-4xl w-full",
                  initialRender && "gallery-zoom-in" // Only apply zoom animation on initial render
                )}
              >
                {currentProject.imageUrl ? (
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-muted/20 overflow-hidden"
                  >
                    <img
                      src={currentProject.imageUrl}
                      alt={currentProject.title}
                      className={cn(
                        "w-full h-full object-contain transition-all duration-700",
                        isAnimating
                          ? "scale-90 opacity-0"
                          : "scale-100 opacity-100"
                      )}
                    />
                  </AspectRatio>
                ) : (
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center"
                  >
                    <span className="text-6xl font-display font-medium text-gradient">
                      {currentProject.title.charAt(0)}
                    </span>
                  </AspectRatio>
                )}
              </div>
            </div>
          </div>

          {/* Footer with project info */}
          <div className="p-6 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-display font-medium mb-2">
                {currentProject.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {currentProject.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {activeIndex + 1} of {projects.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectGalleryDialog;
