import React, { useState } from 'react';
import {
  CalendarCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
  Send,
  Users,
  Search,
  Download
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export const AttendanceManagementPage: React.FC = () => {
  const { students, departments, subjects } = useData();

  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('KCS-602');
  const [markedRecords, setMarkedRecords] = useState<Record<string, boolean>>({
    'stu-1': true,
    'stu-2': true,
    'stu-3': false,
    'stu-4': true,
    'stu-5': true,
    'stu-6': false
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [smsNoticeSent, setSmsNoticeSent] = useState(false);

  // Defaulters list (< 75%)
  const defaulters = students.filter((s) => s.attendance < 75);

  const toggleStudentAttendance = (studentId: string) => {
    setMarkedRecords((prev) => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleSaveAttendance = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSendDefaulterAlerts = () => {
    setSmsNoticeSent(true);
    setTimeout(() => setSmsNoticeSent(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Attendance Monitoring & Defaulter Registry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time biometric & lecture attendance with AKTU 75% early warning ordinance
          </p>
        </div>

        <button
          onClick={handleSendDefaulterAlerts}
          className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-rose-700"
        >
          <Send className="h-3.5 w-3.5" />
          <span>Dispatch Defaulter Warnings (SMS)</span>
        </button>
      </div>

      {smsNoticeSent && (
        <div className="rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Automated SMS and email notices dispatched to parents of all {defaulters.length} flagged defaulters.</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Overall Attendance"
          value="82.4%"
          subtitle="Above institution threshold"
          icon={CalendarCheck2}
          color="emerald"
        />
        <StatsCard
          title="Total Defaulters"
          value={defaulters.length}
          subtitle="Below 75% minimum"
          icon={AlertTriangle}
          color="rose"
        />
        <StatsCard
          title="Safe Students"
          value={students.length - defaulters.length}
          subtitle="Eligible for Sessional Exams"
          icon={CheckCircle2}
          color="brand"
        />
        <StatsCard
          title="Lectures Delivered"
          value="148"
          subtitle="Current semester cycle"
          icon={Users}
          color="indigo"
        />
      </div>

      {/* Defaulter Alert Table */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 shadow-card dark:border-rose-900/40 dark:bg-rose-950/20">
        <div className="flex items-center justify-between pb-3 border-b border-rose-200/60 dark:border-rose-900/60">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <div>
              <h3 className="text-sm font-bold text-rose-950 dark:text-rose-200">
                Critical Defaulter Roster (&lt; 75% Attendance)
              </h3>
              <p className="text-[11px] text-rose-700 dark:text-rose-300">
                Mandatory condonation application or parent meeting required before Monday
              </p>
            </div>
          </div>
          <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-bold text-white">
            {defaulters.length} Students Flagged
          </span>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase font-bold text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-900">
              <tr>
                <th className="py-2 px-3">Student Name</th>
                <th className="py-2 px-3">Roll No</th>
                <th className="py-2 px-3">Department & Section</th>
                <th className="py-2 px-3">Current %</th>
                <th className="py-2 px-3">Shortfall Margin</th>
                <th className="py-2 px-3">Assigned Mentor</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-200/50 dark:divide-rose-900/40">
              {defaulters.map((s) => {
                const shortfall = (75 - s.attendance).toFixed(1);
                return (
                  <tr key={s.id} className="hover:bg-rose-100/50 dark:hover:bg-rose-900/20">
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <img src={s.avatar} alt={s.name} className="h-6 w-6 rounded-full object-cover" />
                      <span>{s.name}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono">{s.rollNo}</td>
                    <td className="py-2.5 px-3">{s.department.split(' ')[0]} • {s.section}</td>
                    <td className="py-2.5 px-3 font-black text-rose-600">{s.attendance}%</td>
                    <td className="py-2.5 px-3 font-semibold text-rose-800 dark:text-rose-300">-{shortfall}% shortfall</td>
                    <td className="py-2.5 px-3">{s.mentorName}</td>
                    <td className="py-2.5 px-3">
                      <span className="rounded bg-rose-200 text-rose-900 px-2 py-0.5 text-[10px] font-extrabold dark:bg-rose-900 dark:text-rose-200">
                        Exam Barred
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Class Attendance Logger */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Live Lecture Attendance Logger
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quickly mark Present (P) or Absent (A) for active class
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 font-semibold"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.code}>{s.code}: {s.name}</option>
              ))}
            </select>

            <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-semibold">
              Today: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>

            <button
              onClick={handleSaveAttendance}
              className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-brand-700 shadow-xs"
            >
              Submit & Sync Roster
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mt-3 rounded-lg bg-emerald-50 p-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>Attendance successfully committed to central ABES ERP registry!</span>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {students.slice(0, 8).map((stu) => {
            const isPresent = markedRecords[stu.id] ?? true;
            return (
              <div
                key={stu.id}
                onClick={() => toggleStudentAttendance(stu.id)}
                className={`cursor-pointer rounded-xl border p-3 flex items-center justify-between transition-all ${
                  isPresent
                    ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                    : 'border-rose-300 bg-rose-50/40 hover:bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <img src={stu.avatar} alt={stu.name} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{stu.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Roll: {stu.rollNo.slice(-4)}</span>
                  </div>
                </div>

                <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
                  isPresent ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}>
                  {isPresent ? 'P' : 'A'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
