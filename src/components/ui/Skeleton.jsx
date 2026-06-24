import { cn } from '../../utils/formatters';

const SkeletonCard = ({ className = '' }) => (
  <div className={cn('glass-card p-6 space-y-4', className)}>
    <div className="flex items-start justify-between">
      <div className="space-y-3 flex-1">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-8 w-36" />
      </div>
      <div className="skeleton h-12 w-12 rounded-xl" />
    </div>
  </div>
);

const SkeletonChart = ({ className = '' }) => (
  <div className={cn('glass-card p-6 space-y-4', className)}>
    <div className="skeleton h-5 w-40" />
    <div className="skeleton h-[250px] w-full rounded-xl" />
  </div>
);

const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-4 py-4 border-b border-border/30">
    <div className="skeleton h-4 w-32" />
    <div className="skeleton h-4 w-20 ml-auto" />
    <div className="skeleton h-6 w-16 rounded-full" />
    <div className="skeleton h-4 w-24" />
    <div className="skeleton h-4 w-20" />
  </div>
);

const SkeletonTable = ({ rows = 5 }) => (
  <div className="glass-card overflow-hidden">
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border bg-card-hover/50">
      <div className="skeleton h-3 w-28" />
      <div className="skeleton h-3 w-16 ml-auto" />
      <div className="skeleton h-3 w-20" />
      <div className="skeleton h-3 w-24" />
      <div className="skeleton h-3 w-16" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </div>
);

const Skeleton = {
  Card: SkeletonCard,
  Chart: SkeletonChart,
  Row: SkeletonRow,
  Table: SkeletonTable,
};

export default Skeleton;
