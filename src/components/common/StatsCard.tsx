import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info';
  color?: 'brand' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple';
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  isPositive = true,
  subtitle,
  badge,
  color = 'brand',
  onClick
}) => {
  const colorMap = {
    brand: 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 border-brand-100 dark:border-brand-900/50',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/50',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/50',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900/50',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-100 dark:border-indigo-900/50',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-100 dark:border-purple-900/50'
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative rounded-xl border border-slate-200/80 bg-white p-5 shadow-card transition-all duration-200 hover:shadow-md dark:border-slate-800/80 dark:bg-[#111928] dark:shadow-card-dark',
        onClick && 'cursor-pointer hover:border-brand-300 dark:hover:border-brand-800'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </span>
            {badge && (
              <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                {badge}
              </span>
            )}
          </div>
        </div>

        <div className={cn('rounded-xl border p-2.5 transition-transform duration-200 group-hover:scale-105', colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs dark:border-slate-800/60">
          {change && (
            <span
              className={cn(
                'inline-flex items-center font-semibold',
                isPositive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              )}
            >
              {isPositive ? (
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="mr-1 h-3.5 w-3.5" />
              )}
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
