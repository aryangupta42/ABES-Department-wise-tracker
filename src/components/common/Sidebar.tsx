import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  CalendarCheck2,
  BookOpen,
  ClipboardList,
  FileCheck2,
  Calendar,
  Briefcase,
  PartyPopper,
  Bell,
  HelpCircle,
  Clock,
  BarChart3,
  Trophy,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Layers,
  Sparkles,
  HeartPulse
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { role, getDashboardRoute } = useAuth();
  const location = useLocation();

  // Navigation Items with role-based accessibility
  const navSections = [
    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          path: getDashboardRoute(role),
          icon: LayoutDashboard,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'College Overview',
          path: '/college-overview',
          icon: Building2,
          roles: ['super_admin', 'hod']
        }
      ]
    },
    {
      title: 'Academic Core',
      items: [
        {
          label: 'Departments',
          path: '/departments',
          icon: Layers,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Student Directory',
          path: '/students',
          icon: GraduationCap,
          roles: ['super_admin', 'hod', 'faculty']
        },
        {
          label: 'Faculty Directory',
          path: '/faculty',
          icon: Users,
          roles: ['super_admin', 'hod']
        },
        {
          label: 'Attendance Monitor',
          path: '/attendance',
          icon: CalendarCheck2,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Academic Management',
          path: '/academics',
          icon: BookOpen,
          roles: ['super_admin', 'hod']
        },
        {
          label: 'Syllabus & Subjects',
          path: '/subjects',
          icon: BookOpen,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Assignments',
          path: '/assignments',
          icon: ClipboardList,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Exams & Results',
          path: '/examinations',
          icon: FileCheck2,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Timetable',
          path: '/timetable',
          icon: Calendar,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        }
      ]
    },
    {
      title: 'Campus & Career',
      items: [
        {
          label: 'Placements & Internships',
          path: '/placements',
          icon: Briefcase,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Events & Tech Clubs',
          path: '/events',
          icon: PartyPopper,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Student Leaderboard',
          path: '/leaderboard',
          icon: Trophy,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Achievements & Awards',
          path: '/achievements',
          icon: Award,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        }
      ]
    },
    {
      title: 'Operations',
      items: [
        {
          label: 'Notices & Circulars',
          path: '/notices',
          icon: Bell,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Leave & Approvals',
          path: '/leaves',
          icon: Clock,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Helpdesk & Grievance',
          path: '/complaints',
          icon: HelpCircle,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        },
        {
          label: 'Reports & Analytics',
          path: '/reports',
          icon: BarChart3,
          roles: ['super_admin', 'hod']
        },
        {
          label: 'Settings',
          path: '/settings',
          icon: Settings,
          roles: ['super_admin', 'hod', 'faculty', 'student']
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200/80 bg-white transition-all duration-300 dark:border-slate-800/80 dark:bg-[#0f172a] lg:static',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Sidebar Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200/80 px-4 dark:border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-navy-900 text-white font-bold text-xs shadow-md shadow-brand-600/20">
              ABES
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                  ABES <span className="text-brand-600 dark:text-brand-400">Portal</span>
                </span>
                <span className="block text-[10px] font-medium text-slate-400">
                  v2.4 Enterprise
                </span>
              </div>
            )}
          </div>

          {/* Collapse Toggle for Desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {navSections.map((sec, idx) => {
            const filteredItems = sec.items.filter((item) => item.roles.includes(role));
            if (filteredItems.length === 0) return null;

            return (
              <div key={idx}>
                {!isCollapsed && (
                  <h4 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {sec.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path) && item.path !== getDashboardRoute(role));

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onCloseMobile}
                        title={isCollapsed ? item.label : undefined}
                        className={({ isActive: exactActive }) =>
                          cn(
                            'group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150',
                            exactActive
                              ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs dark:bg-brand-950/70 dark:text-brand-300'
                              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200',
                            isCollapsed && 'justify-center px-2'
                          )
                        }
                      >
                        <Icon className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-105')} />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Health Score & Info Box */}
        {!isCollapsed && (
          <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-3 dark:border-brand-900/50 dark:bg-brand-950/30">
              <div className="flex items-center justify-between text-xs font-bold text-brand-900 dark:text-brand-200">
                <div className="flex items-center gap-1.5">
                  <HeartPulse className="h-4 w-4 text-brand-600 animate-pulse" />
                  <span>College Health</span>
                </div>
                <span className="rounded bg-brand-600 px-1.5 py-0.5 text-[10px] text-white font-semibold">
                  91 / 100
                </span>
              </div>
              <p className="mt-1 text-[11px] text-brand-700/80 dark:text-brand-300/70">
                Tier-1 NBA Standards Met across departments.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
