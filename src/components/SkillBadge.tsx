
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  className?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const SkillBadge = ({ name, className, level = 'intermediate' }: SkillBadgeProps) => {
  const levelClasses = {
    beginner: 'bg-blue-950/30 text-blue-200 border-blue-800/30',
    intermediate: 'bg-indigo-950/30 text-indigo-200 border-indigo-800/30',
    advanced: 'bg-violet-950/30 text-violet-200 border-violet-800/30',
    expert: 'bg-fuchsia-950/30 text-fuchsia-200 border-fuchsia-800/30',
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border",
        "transition-all duration-300 ease-in-out hover-lift",
        levelClasses[level],
        className
      )}
    >
      {name}
    </div>
  );
};

export default SkillBadge;
