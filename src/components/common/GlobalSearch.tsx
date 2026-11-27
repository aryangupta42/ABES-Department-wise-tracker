import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Bell,
  Calendar,
  Award,
  HelpCircle,
  FileText,
  CornerDownLeft,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { departments, students, faculty, notices } = useData();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Handled by parent or toggled
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingDepts = q ? departments.filter((d) => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q)) : [];
  const matchingStudents = q ? students.filter((s) => s.name.toLowerCase().includes(q) || s.rollNo.includes(q)) : [];
  const matchingFaculty = q ? faculty.filter((f) => f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q)) : [];
  const matchingNotices = q ? notices.filter((n) => n.title.toLowerCase().includes(q)) : [];

  const quickPages = [
    { title: 'Departments Directory', path: '/departments', icon: Building2 },
    { title: 'Student Management', path: '/students', icon: GraduationCap },
    { title: 'Faculty Directory', path: '/faculty', icon: Users },
    { title: 'Attendance Tracker', path: '/attendance', icon: Calendar },
    { title: 'Academic Syllabus', path: '/subjects', icon: BookOpen },
    { title: 'Placement Analytics', path: '/placements', icon: Award },
    { title: 'Campus Helpdesk & Grievance', path: '/complaints', icon: HelpCircle },
    { title: 'Notices & Circulars', path: '/notices', icon: Bell }
  ].filter((p) => !q || p.title.toLowerCase().includes(q));

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-10 dark:border-slate-800 dark:bg-[#111928] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search departments, students, faculty, circulars, or jump to page..."
            className="w-full bg-transparent px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Pages */}
          <div>
            <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Quick Navigation
            </div>
            <div className="mt-1 space-y-0.5">
              {quickPages.slice(0, 5).map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.path}
                    onClick={() => handleSelect(page.path)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                      <span>{page.title}</span>
                    </div>
                    <CornerDownLeft className="h-3 w-3 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Departments */}
          {matchingDepts.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Departments
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingDepts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/departments/${d.id}`)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium">{d.name}</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {d.code}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">Score: {d.healthScore}%</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Students */}
          {matchingStudents.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Students
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(`/students?search=${s.rollNo}`)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-brand-500" />
                      <span className="font-medium">{s.name}</span>
                      <span className="text-slate-400">({s.rollNo})</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{s.section} • CGPA {s.cgpa}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Faculty */}
          {matchingFaculty.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Faculty Members
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingFaculty.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelect('/faculty')}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{f.name}</span>
                      <span className="text-[11px] text-slate-400">({f.designation})</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{f.department.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notices */}
          {matchingNotices.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Notices
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingNotices.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleSelect('/notices')}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 text-amber-500 shrink-0" />
                      <span className="font-medium truncate">{n.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0">{n.date}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span><kbd className="rounded bg-slate-200 px-1 dark:bg-slate-800">ESC</kbd> to close</span>
            <span><kbd className="rounded bg-slate-200 px-1 dark:bg-slate-800">↵</kbd> to select</span>
          </div>
          <span>ABES Department Tracker</span>
        </div>
      </div>
    </div>
  );
};
