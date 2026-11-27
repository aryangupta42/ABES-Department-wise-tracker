import React, { useState } from 'react';
import {
  Briefcase,
  Award,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { INITIAL_PLACEMENTS } from '../../data/mockData';
import { PlacementDrive } from '../../types';

export const PlacementTrackerPage: React.FC = () => {
  const [drives, setDrives] = useState<PlacementDrive[]>(INITIAL_PLACEMENTS);
  const [registeredDrives, setRegisteredDrives] = useState<Record<string, boolean>>({});

  const handleRegister = (driveId: string) => {
    setRegisteredDrives((prev) => ({ ...prev, [driveId]: true }));
    setDrives((prev) =>
      prev.map((d) => (d.id === driveId ? { ...d, registeredCount: d.registeredCount + 1 } : d))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Training & Placement (T&P) Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Active campus recruitment drives, company eligibility criteria, and corporate salary statistics
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Placement Rate"
          value="94.2%"
          subtitle="Session 2025-26 ongoing"
          icon={Award}
          color="emerald"
        />
        <StatsCard
          title="Highest CTC Package"
          value="₹34.0 LPA"
          subtitle="Offered by Adobe Systems"
          icon={TrendingUp}
          color="brand"
        />
        <StatsCard
          title="Average Salary"
          value="₹8.45 LPA"
          subtitle="+14% increase vs 2024"
          icon={Briefcase}
          color="indigo"
        />
        <StatsCard
          title="Companies Visited"
          value="182"
          subtitle="Including 38 Dream Tier offers"
          icon={Users}
          color="amber"
        />
      </div>

      {/* Drives Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Active & Upcoming Campus Recruitment Drives
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {drives.map((drive) => {
            const isReg = registeredDrives[drive.id];
            return (
              <div
                key={drive.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={drive.logo} alt={drive.companyName} className="h-12 w-12 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {drive.companyName}
                        </h4>
                        <span className="text-xs font-bold text-emerald-600">
                          ₹{drive.packageLPA} LPA CTC
                        </span>
                      </div>
                    </div>

                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      drive.status === 'Ongoing' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : drive.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                    }`}>
                      {drive.status}
                    </span>
                  </div>

                  <div className="mt-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Role: {drive.role}
                  </div>

                  <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Drive Date:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{drive.driveDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Eligible Minimum CGPA:</span>
                      <span className="font-semibold text-brand-600">{drive.minCgpa} / 10.0</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Eligible Branches:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{drive.eligibleBranches.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Location:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{drive.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs dark:border-slate-800">
                  <span className="text-slate-400">
                    {drive.registeredCount} Candidates Registered
                  </span>

                  {isReg ? (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Registration Confirmed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRegister(drive.id)}
                      className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-brand-700 shadow-xs"
                    >
                      Apply for Drive
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
