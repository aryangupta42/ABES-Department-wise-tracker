import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const SubjectTrackingPage: React.FC = () => {
  const { subjects, departments } = useData();
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = subjects.filter((s) => {
    const matchesDept = selectedDept === 'All' || s.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Subject Curriculum & Syllabus Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unit-wise lecture progress, syllabus completion percentage, and faculty teaching pace
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-[#111928]">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subject code (e.g. KCS-601) or name..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <option value="All">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.code}>{d.name}</option>
          ))}
        </select>
      </div>

      {/* Subjects Detailed Cards */}
      <div className="space-y-4">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300">
                    {sub.code}
                  </span>
                  <span className="text-xs text-slate-500">{sub.department} • Sem {sub.semester}</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                  {sub.name}
                </h3>
                <p className="text-xs text-slate-400">Faculty In-Charge: <strong className="text-slate-700 dark:text-slate-300">{sub.facultyName}</strong></p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                  {sub.completionPercentage}%
                </span>
                <span className="block text-[11px] text-slate-400">
                  {sub.deliveredLectures} / {sub.totalLectures} Lectures Delivered
                </span>
              </div>
            </div>

            {/* Units Progress Grid */}
            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Syllabus Unit Progression
              </span>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-5 gap-3">
                {sub.syllabusUnits.map((u) => (
                  <div
                    key={u.unit}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-left dark:border-slate-800 dark:bg-slate-900/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">Unit {u.unit}</span>
                      <span className="text-[10px] text-slate-500">{u.hours} hrs</span>
                    </div>
                    <h4 className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2" title={u.title}>
                      {u.title}
                    </h4>
                    <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      u.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : u.status === 'In Progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
