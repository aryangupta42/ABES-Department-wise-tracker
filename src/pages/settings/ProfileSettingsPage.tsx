import React, { useState } from 'react';
import {
  Settings,
  User,
  Moon,
  Sun,
  Bell,
  Shield,
  RotateCcw,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

export const ProfileSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme, setTheme } = useTheme();
  const { resetDemoData } = useData();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Notification toggles
  const [notifyAttendance, setNotifyAttendance] = useState(true);
  const [notifyExams, setNotifyExams] = useState(true);
  const [notifyPlacements, setNotifyPlacements] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo state to fresh default dataset?')) {
      resetDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Profile & System Preferences
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Personal credentials, theme appearance, alert subscriptions, and demo state management
        </p>
      </div>

      {savedSuccess && (
        <div className="rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="h-4 w-4" />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {resetSuccess && (
        <div className="rounded-xl bg-brand-50 p-3 text-xs font-bold text-brand-800 dark:bg-brand-950 dark:text-brand-300 flex items-center gap-2 border border-brand-200">
          <CheckCircle2 className="h-4 w-4" />
          <span>Demo datasets refreshed to pristine factory state!</span>
        </div>
      )}

      {/* User Profile Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Personal & Academic Credentials
        </h3>

        <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
              alt={user?.name}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-brand-500 shadow-md"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official College ID: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{user?.collegeId}</span>
              </p>
              <span className="mt-1 inline-block rounded bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-950 dark:border-brand-900 dark:text-brand-300 capitalize">
                Role: {user?.role.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Registered College Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Contact Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Department</label>
              <input
                type="text"
                disabled
                value={user?.department || 'Computer Science & Engineering'}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700 shadow"
            >
              Update Credentials
            </button>
          </div>
        </form>
      </div>

      {/* Appearance Theme Switcher */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Interface Theme & Display Preferences
        </h3>

        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 rounded-2xl border-2 p-4 text-left transition-all ${
              theme === 'light'
                ? 'border-brand-600 bg-brand-50/40 ring-1 ring-brand-500 dark:bg-slate-800'
                : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <Sun className="h-5 w-5 text-amber-500" />
              {theme === 'light' && <CheckCircle2 className="h-4 w-4 text-brand-600" />}
            </div>
            <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">Light Mode</h4>
            <p className="mt-0.5 text-[11px] text-slate-500">Crisp high-contrast enterprise theme</p>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 rounded-2xl border-2 p-4 text-left transition-all ${
              theme === 'dark'
                ? 'border-brand-500 bg-brand-950/40 ring-1 ring-brand-500 dark:bg-brand-950/40'
                : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <Moon className="h-5 w-5 text-brand-400" />
              {theme === 'dark' && <CheckCircle2 className="h-4 w-4 text-brand-400" />}
            </div>
            <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">Dark Mode</h4>
            <p className="mt-0.5 text-[11px] text-slate-500">Navy midnight developer palette</p>
          </button>
        </div>
      </div>

      {/* Notifications Preference */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Smart Alert Subscriptions
        </h3>

        <div className="mt-4 space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">75% Attendance Defaulter Alerts</span>
              <span className="text-[11px] text-slate-400">Instant SMS alert if attendance drops near threshold</span>
            </div>
            <input
              type="checkbox"
              checked={notifyAttendance}
              onChange={(e) => setNotifyAttendance(e.target.checked)}
              className="h-4 w-4 text-brand-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Examination & Sessional Notices</span>
              <span className="text-[11px] text-slate-400">Controller of Examinations circulars & admit card alerts</span>
            </div>
            <input
              type="checkbox"
              checked={notifyExams}
              onChange={(e) => setNotifyExams(e.target.checked)}
              className="h-4 w-4 text-brand-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Corporate Placement Drives</span>
              <span className="text-[11px] text-slate-400">Shortlisting and eligibility alerts for Tier-1 companies</span>
            </div>
            <input
              type="checkbox"
              checked={notifyPlacements}
              onChange={(e) => setNotifyPlacements(e.target.checked)}
              className="h-4 w-4 text-brand-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* Demo State Control */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 shadow-card dark:border-rose-900/40 dark:bg-rose-950/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-rose-950 dark:text-rose-200">
              Reset Demo Storage
            </h3>
            <p className="mt-0.5 text-xs text-rose-700 dark:text-rose-300">
              Clear browser localStorage and reload initial sample departments, students, faculty, and approvals.
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:bg-slate-900 dark:border-rose-800 dark:text-rose-300"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
