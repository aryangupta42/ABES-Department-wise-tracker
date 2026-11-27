import React from 'react';
import { Heart, Code2, Users, Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-200/80 bg-white/70 py-6 px-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-[#0f172a]/70 rounded-2xl shadow-subtle">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
        {/* Left Side: Branding & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-600 text-[10px] font-black text-white">
              ABES
            </span>
            <span className="font-extrabold text-slate-800 dark:text-slate-200">
              ABESEC Ghaziabad
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span>© 2026 ABESEC Ghaziabad. All Rights Reserved.</span>
        </div>

        {/* Center: Full Stack Development Team */}
        <div className="flex items-center gap-1.5 rounded-full border border-brand-200/80 bg-brand-50/60 px-3 py-1 font-semibold text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-300 text-[11px]">
          <Code2 className="h-3.5 w-3.5" />
          <span>Full Stack Development Team</span>
        </div>

        {/* Right Side: Team Members & Branch Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-right">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Developed & Maintained By:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              Aryan Gupta
            </span>
            <span className="text-slate-400">&</span>
            <span className="font-bold text-slate-900 dark:text-white">
              Arsh Mittal
            </span>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Branch: CSE • Section: CSE 15
          </span>
        </div>
      </div>
    </footer>
  );
};
