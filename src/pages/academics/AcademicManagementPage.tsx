import React from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  GraduationCap
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AcademicManagementPage: React.FC = () => {
  const { subjects, departments } = useData();

  const academicMilestones = [
    { title: 'Commencement of Even Semester Classes', date: '15 Jan 2026', status: 'Completed', type: 'Academic' },
    { title: 'First Sessional Examinations (30 Marks)', date: '18 Feb - 22 Feb 2026', status: 'Completed', type: 'Exam' },
    { title: 'Display of Sessional-I Results & Defaulter List', date: '28 Feb 2026', status: 'Completed', type: 'Audit' },
    { title: 'Second Sessional Examinations (30 Marks)', date: '08 Apr - 13 Apr 2026', status: 'Upcoming', type: 'Exam' },
    { title: 'Pre-University Test (PUT - Full Syllabus)', date: '02 May - 09 May 2026', status: 'Upcoming', type: 'Exam' },
    { title: 'AKTU Practical & Project Viva Voce', date: '15 May - 20 May 2026', status: 'Upcoming', type: 'Viva' },
    { title: 'University Theory End-Semester Examinations', date: '25 May - 15 Jun 2026', status: 'Upcoming', type: 'Final' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Academic Management & Calendar 2025-26
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Official AKTU-aligned academic schedule, course credit framework, and examination milestones
        </p>
      </div>

      {/* Academic Milestones Timeline */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Official Academic Milestones (Session 2025-26 Even Sem)
        </h3>

        <div className="mt-4 space-y-3">
          {academicMilestones.map((m, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl font-black text-xs ${
                  m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{m.title}</h4>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>{m.date}</span>
                    <span>• {m.type}</span>
                  </div>
                </div>
              </div>

              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                m.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Scheme Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111928]">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total B.Tech Credits</span>
          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">160 Credits</div>
          <p className="mt-1 text-xs text-slate-500">AICTE Model Curriculum compliance across 8 semesters.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111928]">
          <span className="text-[10px] uppercase font-bold text-slate-400">Continuous Assessment Weight</span>
          <div className="mt-1 text-2xl font-black text-brand-600">30% Internal</div>
          <p className="mt-1 text-xs text-slate-500">Calculated from Sessional I, II, assignments, and class attendance.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111928]">
          <span className="text-[10px] uppercase font-bold text-slate-400">University Theory Weight</span>
          <div className="mt-1 text-2xl font-black text-emerald-600">70% External</div>
          <p className="mt-1 text-xs text-slate-500">End-semester AKTU examinations with external evaluation center.</p>
        </div>
      </div>
    </div>
  );
};
