import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { useData } from '../../context/DataContext';

export const ReportsAnalyticsPage: React.FC = () => {
  const { departments } = useData();
  const [reportType, setReportType] = useState('attendance');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const reportData = departments.map((d) => ({
    name: d.code,
    attendance: d.averageAttendance,
    placement: d.placementPercentage,
    health: d.healthScore,
    facultyRatio: Number((d.studentCount / d.facultyCount).toFixed(1))
  }));

  const handleExport = (format: string) => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Institutional Reports & NBA Compliance Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generate and export official college performance matrices, NAAC audits, and AICTE compliance files
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 shadow-xs"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-brand-700 shadow"
          >
            <Download className="h-4 w-4" />
            <span>Generate Executive PDF</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Report successfully compiled and dispatched to browser download stream!</span>
        </div>
      )}

      {/* Main Chart */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Department Performance Matrix (Session 2025-26)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparative benchmark of Attendance, Placements, and Health Indices
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-600">NBA Tier-1 Criteria</span>
        </div>

        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reportData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" name="Attendance %" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="placement" name="Placement Rate %" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="health" name="Health Score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Standard Pre-configured Reports Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Standard Institutional Audit Files
        </h3>

        <div className="mt-4 space-y-3">
          {[
            { title: 'AKTU Odd/Even Semester Examination Form Clearance Audit', size: '2.4 MB', date: 'Generated 2 days ago' },
            { title: '75% Attendance Defaulter Roster for Sessional Examinations', size: '1.1 MB', date: 'Generated Today' },
            { title: 'AICTE Faculty-to-Student Ratio (FSR) & Workload Compliance', size: '3.8 MB', date: 'Generated 1 week ago' },
            { title: 'Campus Placement Statistics & Recruiter Compensation Tiers', size: '4.2 MB', date: 'Generated 3 days ago' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40 text-xs"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-5 w-5 text-brand-600" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <span className="text-[11px] text-slate-400">{item.size} • {item.date}</span>
                </div>
              </div>

              <button
                onClick={() => handleExport(item.title)}
                className="font-bold text-brand-600 hover:underline flex items-center gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
