import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Layers,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Modal } from '../../components/common/Modal';
import { ABES_REAL_ASSETS } from '../../data/mockData';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('director@abes.ac.in');
  const [password, setPassword] = useState('abes@demo2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const { login, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  const demoAccounts = [
    {
      role: 'super_admin' as UserRole,
      title: 'Director / Super Admin',
      email: 'director@abes.ac.in',
      desc: 'Prof. (Dr.) Sanjay Kumar Singh',
      icon: ShieldCheck,
      color: 'border-rose-300 bg-rose-50/50 hover:bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/20'
    },
    {
      role: 'hod' as UserRole,
      title: 'Head of Dept (CSE)',
      email: 'hod.cse@abes.ac.in',
      desc: 'Dr. Amit Sinha (HOD)',
      icon: Layers,
      color: 'border-brand-300 bg-brand-50/50 hover:bg-brand-50 text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/20'
    },
    {
      role: 'faculty' as UserRole,
      title: 'Faculty Member',
      email: 'faculty.sharma@abes.ac.in',
      desc: 'Dr. Meenakshi Sharma',
      icon: Briefcase,
      color: 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/20'
    },
    {
      role: 'student' as UserRole,
      title: 'Student Portal',
      email: 'student.varun@abes.ac.in',
      desc: 'Varun Gupta (2200320100145)',
      icon: GraduationCap,
      color: 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/20'
    }
  ];

  const handleSelectDemo = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword('abes@demo2026');
    setSelectedRole(acc.role);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide both College ID / Email and Password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, selectedRole);
      navigate(getDashboardRoute(selectedRole));
    } catch (err) {
      setError('Invalid college credentials. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setShowForgotModal(false);
        setForgotEmail('');
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b1120]">
      {/* Left Banner: Real ABES Photo & Institutional Showcase */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Real ABES Main Building Photo as Background */}
        <img
          src={ABES_REAL_ASSETS.mainBuilding}
          alt="ABES Engineering College Campus"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.32] contrast-[1.15]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent" />

        {/* Header Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 font-black text-sm tracking-tighter shadow-lg shadow-brand-500/40">
            ABES
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight drop-shadow">ABESEC Ghaziabad</h2>
            <p className="text-xs text-slate-200">AKTU College Code: 032 • NAAC 'A' Grade • NBA Accredited</p>
          </div>
        </div>

        {/* Main Pitch */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-brand-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Official Campus Academic & Department Portal</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight leading-tight drop-shadow-md">
            Centralized Department & Academic Monitoring Platform
          </h1>

          <p className="text-xs text-slate-200 leading-relaxed drop-shadow">
            Connecting Students, Faculty, HODs, and Central Directorate across our 15.7-acre campus on NH-09 Ghaziabad. Real-time AKTU 75% attendance audits, digital leave approvals, and placement analytics.
          </p>

          <div className="space-y-3 pt-2">
            {[
              'AKTU 75% Mandatory Attendance Defaulter Warning System',
              'Multi-Department Health Scores (CSE, IT, ECE, ME, CE, CS-AIML)',
              'Kalpana Chawla Block & HP Center of Excellence Sync',
              'Campus Recruitment Drives (Adobe ₹34 LPA, Amazon AWS, TCS Prime)'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-400" />
            <span>NH-09, Ghaziabad, UP 201009</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            ABES Portal Operational
          </span>
        </div>
      </div>

      {/* Right Column: Authentication Card & Demo Switchers */}
      <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md space-y-6">
          {/* Mobile ABES Branding */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-extrabold text-xs">
              ABES
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">ABESEC Ghaziabad</h2>
              <p className="text-[10px] text-slate-500">Autonomous Campus Portal • AKTU Code 032</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign In to Your Account
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Select one of the 4 demo profiles below or enter your college credentials.
            </p>
          </div>

          {/* Quick Demo Credentials Selector */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-[#111928]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Instant Demo Access (Click to Fill)
              </span>
              <span className="text-[10px] rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.5 font-semibold dark:bg-emerald-950 dark:text-emerald-300">
                4 Roles Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                const isSelected = selectedRole === acc.role;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectDemo(acc)}
                    className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/60 ring-1 ring-brand-500 dark:bg-brand-950/40'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 w-full">
                      <Icon className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {acc.title}
                      </span>
                    </div>
                    <span className="mt-1 text-[10px] text-slate-400 truncate w-full">
                      {acc.email}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                College ID / Official Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@abes.ac.in or 2200320100145"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter college portal password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Remember this device
                </span>
              </label>

              <span className="text-[11px] text-slate-400">
                Role: <strong className="text-slate-700 dark:text-slate-200 capitalize">{selectedRole.replace('_', ' ')}</strong>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-xs font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-700 active:scale-[0.99] disabled:opacity-50 transition-all"
            >
              {loading ? (
                <span>Authenticating demo session...</span>
              ) : (
                <>
                  <span>Launch {selectedRole.replace('_', ' ').toUpperCase()} Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Prototype Notice */}
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-3 text-center text-[11px] text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
            🔒 <strong>Frontend Simulation:</strong> Pre-authenticated mock users stored in local browser storage. No external network request required.
          </div>

          {/* Project Submission Team Footer */}
          <div className="border-t border-slate-200/80 pt-4 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Developed & Maintained By: Team Member 1: Aryan Gupta | Team Member 2: Arsh Mittal | Branch: CSE, Section: CSE 15
            </p>
            <p className="font-semibold text-brand-600 dark:text-brand-400">
              Full Stack Development Team
            </p>
            <p>© 2026 ABESEC Ghaziabad. All Rights Reserved.</p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Reset College Portal Password"
        description="Enter your registered ABES email address to receive password recovery instructions."
      >
        {forgotSent ? (
          <div className="rounded-xl bg-emerald-50 p-4 text-center text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
            <p className="font-bold">Password Reset Link Dispatched!</p>
            <p className="mt-1">
              Instructions have been sent to <strong>{forgotEmail}</strong>. Please check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Official College Email
              </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. yourname@abes.ac.in"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
