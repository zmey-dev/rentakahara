
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink, Github, Maximize } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  github?: string;
  liveUrl?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  imageUrl,
  github,
  liveUrl,
  className,
  style,
}: ProjectCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div 
        className={cn(
          "glass-card group overflow-hidden rounded-xl transition-all duration-500",
          "backdrop-blur-xl bg-white/5 border border-white/10",
          "hover:border-primary/30 hover:shadow-[0_0_30px_rgba(96,165,250,0.2)] hover:shadow-primary/20",
          className
        )}
        style={style}
      >
        <div className="relative aspect-video overflow-hidden cursor-pointer group" onClick={() => setIsDialogOpen(true)}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <span className="text-2xl font-display font-medium text-gradient">{title.charAt(0)}</span>
            </div>
          )}
          <div className="absolute top-0 inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="bg-black/60 p-2 rounded-full backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsDialogOpen(true);
              }}
            >
              <Maximize className="text-white h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-display font-medium mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 pt-2">
            {github && (
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-400 transition-colors"
                aria-label={`View ${title} GitHub repository`}
              >
                <Github size={18} />
              </a>
            )}
            {liveUrl && (
              <a 
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-400 transition-colors"
                aria-label={`Visit ${title} live site`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto bg-black/90 border-white/10">
          {imageUrl ? (
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <span className="text-6xl font-display font-medium text-gradient">{title.charAt(0)}</span>
            </div>
          )}
          <h2 className="text-xl font-display font-medium mt-2">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
