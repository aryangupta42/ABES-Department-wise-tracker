import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Moon,
  Sun,
  Bell,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Settings,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Layers,
  Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenNotifications
}) => {
  const { user, role, switchRole, logout, getDashboardRoute } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { approvals } = useData();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'Pending').length;

  const roleConfigs: Record<
    UserRole,
    { label: string; icon: React.ComponentType<any>; color: string; badgeClass: string }
  > = {
    super_admin: {
      label: 'Super Admin',
      icon: ShieldCheck,
      color: 'text-rose-600',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
    },
    hod: {
      label: 'HOD',
      icon: Layers,
      color: 'text-brand-600',
      badgeClass: 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950/60 dark:text-brand-300'
    },
    faculty: {
      label: 'Faculty',
      icon: Briefcase,
      color: 'text-indigo-600',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300'
    },
    student: {
      label: 'Student',
      icon: GraduationCap,
      color: 'text-emerald-600',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole);
    setShowRoleMenu(false);
    navigate(getDashboardRoute(newRole));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0f172a]/90 sm:px-6">
      {/* Left: Mobile hamburger & College Branding */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          {/* ABES Crest / Shield */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-navy-950 text-white shadow-md shadow-brand-500/20 border border-brand-400/30">
            <span className="font-black text-xs tracking-tight">ABES</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                ABESEC Ghaziabad
              </span>
              <span className="hidden sm:inline rounded bg-brand-50 border border-brand-200 px-1.5 py-0.2 text-[10px] font-bold text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300">
                Department Tracker
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              AKTU Code 032 • 19th KM Stone, NH-09
            </p>
          </div>
        </div>
      </div>

      {/* Middle: Global Search Trigger */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={onOpenSearch}
          className="group flex w-full items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50/70 px-3.5 py-2 text-xs text-slate-500 shadow-sm hover:border-brand-400 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-slate-700 transition-all"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-500 transition-colors" />
            <span>Search departments, students, faculty, circulars...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800">
            <span>Ctrl</span> K
          </kbd>
        </button>
      </div>

      {/* Right Toolbar Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon */}
        <button
          onClick={onOpenSearch}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Quick Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition-all',
              roleConfigs[role].badgeClass
            )}
            title="Click to quickly switch demo roles"
          >
            {React.createElement(roleConfigs[role].icon, { className: 'h-3.5 w-3.5' })}
            <span className="hidden sm:inline">{roleConfigs[role].label}</span>
            <ChevronDown className="h-3 w-3 opacity-70" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-[#111928] z-50">
              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Demo Perspective
              </div>
              {(['super_admin', 'hod', 'faculty', 'student'] as UserRole[]).map((r) => {
                const conf = roleConfigs[r];
                const Icon = conf.icon;
                const isActive = role === r;
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={cn('h-4 w-4', conf.color)} />
                      <span>{conf.label}</span>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
        >
          <Bell className="h-4 w-4" />
          {pendingApprovalsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-sm">
              {pendingApprovalsCount}
            </span>
          )}
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-xl p-1 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
              alt={user?.name || 'User'}
              className="h-8 w-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <div className="hidden xl:block">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {user?.name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {user?.collegeId}
              </div>
            </div>
            <ChevronDown className="hidden xl:block h-3 w-3 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-[#111928] z-50">
              <div className="border-b border-slate-100 px-3 py-2 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                <span className="mt-1.5 inline-block rounded bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  {user?.department || 'Administration'}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60"
                >
                  <Settings className="h-3.5 w-3.5 text-slate-400" />
                  <span>Profile & College Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out (Switch to Login)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
