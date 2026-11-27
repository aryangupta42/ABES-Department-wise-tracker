import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Code,
  GraduationCap,
  Sparkles,
  Flame,
  Search
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StudentLeaderboardPage: React.FC = () => {
  const { students } = useData();
  const [selectedCategory, setSelectedCategory] = useState<'cgpa' | 'coding' | 'attendance'>('cgpa');

  const sortedStudents = [...students].sort((a, b) => {
    if (selectedCategory === 'coding') {
      return (b.codingRating || 0) - (a.codingRating || 0);
    }
    if (selectedCategory === 'attendance') {
      return b.attendance - a.attendance;
    }
    return b.cgpa - a.cgpa;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Student Leaderboard & Honor Roll
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Recognizing top collegiate performers across competitive programming, academic CGPA, and exemplary attendance
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[
            { key: 'cgpa', label: 'Academic CGPA' },
            { key: 'coding', label: 'Competitive Coding' },
            { key: 'attendance', label: 'Attendance Champion' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key as any)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat.key
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {sortedStudents.slice(0, 3).map((stu, rank) => {
          const rankColors = [
            'border-amber-400 bg-amber-50/50 text-amber-900 dark:bg-amber-950/30 dark:border-amber-700 dark:text-amber-200',
            'border-slate-300 bg-slate-50/50 text-slate-900 dark:bg-slate-900/40 dark:border-slate-700 dark:text-slate-200',
            'border-amber-600 bg-amber-50/20 text-amber-900 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-200'
          ];
          return (
            <div
              key={stu.id}
              className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center shadow-card ${rankColors[rank]}`}
            >
              <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/10 font-black text-xs">
                #{rank + 1}
              </div>

              <img
                src={stu.avatar}
                alt={stu.name}
                className="h-20 w-20 rounded-full object-cover ring-4 ring-white shadow-md dark:ring-slate-800"
              />

              <h3 className="mt-3 text-sm font-black">{stu.name}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{stu.department.split(' ')[0]} • {stu.section}</p>

              <div className="mt-3 rounded-xl bg-white/70 px-4 py-2 shadow-xs dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {selectedCategory === 'coding' ? 'Contest Rating' : selectedCategory === 'attendance' ? 'Attendance %' : 'University CGPA'}
                </span>
                <span className="text-xl font-black text-brand-600 dark:text-brand-400">
                  {selectedCategory === 'coding' ? stu.codingRating : selectedCategory === 'attendance' ? `${stu.attendance}%` : stu.cgpa}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Ranking Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 dark:bg-slate-900 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Student Candidate</th>
              <th className="py-3 px-4">Roll Number</th>
              <th className="py-3 px-4">Department & Class</th>
              <th className="py-3 px-4">Academic CGPA</th>
              <th className="py-3 px-4">Coding Score</th>
              <th className="py-3 px-4">Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {sortedStudents.map((stu, idx) => (
              <tr key={stu.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-4 font-black text-slate-500">#{idx + 1}</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <img src={stu.avatar} alt={stu.name} className="h-6 w-6 rounded-full object-cover" />
                  <span>{stu.name}</span>
                </td>
                <td className="py-3 px-4 font-mono">{stu.rollNo}</td>
                <td className="py-3 px-4">{stu.department.split(' ')[0]} • {stu.section}</td>
                <td className="py-3 px-4 font-black text-brand-600">{stu.cgpa}</td>
                <td className="py-3 px-4 font-bold text-purple-600">{stu.codingRating || '—'}</td>
                <td className="py-3 px-4 font-bold text-emerald-600">{stu.attendance}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
