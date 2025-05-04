
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  description: string;
  features: string[];
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SolutionCard = ({
  title,
  description,
  features,
  icon,
  className,
  style,
}: SolutionCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        "backdrop-blur-xl bg-white/5 border border-white/10",
        "hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 hover-lift",
        className
      )}
      style={style}
    >
      {icon && (
        <div className="mb-4 text-primary/90">{icon}</div>
      )}
      
      <h3 className="text-xl font-display font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="text-primary/80 mt-1 h-4 w-4 shrink-0" />
            <span className="text-sm text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolutionCard;
