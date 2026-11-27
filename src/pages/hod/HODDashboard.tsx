import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Users,
  GraduationCap,
  CalendarCheck2,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  XCircle,
  FileCheck,
  TrendingUp,
  Clock,
  Award,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const HODDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    departments,
    students,
    faculty,
    subjects,
    approvals,
    updateApprovalStatus
  } = useData();
  const navigate = useNavigate();

  // Find department managed by this HOD (CSE by default)
  const currentDept = departments.find((d) => d.code === 'CSE') || departments[0];

  // Filter department-specific records
  const deptStudents = students.filter((s) => s.department.includes('Computer Science') || s.department.includes('CSE'));
  const deptFaculty = faculty.filter((f) => f.department.includes('Computer Science') || f.department.includes('CSE'));
  const deptSubjects = subjects.filter((s) => s.department.includes('Computer Science'));

  // Defaulters (< 75% attendance)
  const defaulterStudents = deptStudents.filter((s) => s.attendance < 75);

  // Faculty workload chart data
  const workloadData = deptFaculty.map((f) => ({
    name: f.name.replace('Prof. ', '').replace('Dr. ', ''),
    workload: f.workloadHoursPerWeek,
    mentees: f.menteeCount
  }));

  // Attendance distribution data
  const attendanceDistribution = [
    { name: '>= 85% (Safe)', value: 68, color: '#10b981' },
    { name: '75% - 85% (Acceptable)', value: 24, color: '#3b82f6' },
    { name: '< 75% (Defaulter Warning)', value: 8, color: '#ef4444' }
  ];

  const pendingApprovals = approvals.filter(
    (a) => a.department.includes('Computer Science') && a.status === 'Pending'
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-brand-900 p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-500/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-200">
                Department HOD Console
              </span>
              <span className="text-xs text-slate-300">• {currentDept.name}</span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              {currentDept.name} ({currentDept.code})
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-xl">
              HOD: <strong>{user?.name}</strong> • Tier-1 NBA Accredited until {currentDept.accreditedUntil}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/attendance')}
              className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20"
            >
              Verify Attendance
            </button>
            <button
              onClick={() => navigate('/departments/' + currentDept.id)}
              className="rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
            >
              Department Profile
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="CSE Students Enrolled"
          value={currentDept.studentCount}
          subtitle="Across 12 class sections"
          icon={GraduationCap}
          color="brand"
          change="+18 lateral entries"
          isPositive={true}
          onClick={() => navigate('/students')}
        />
        <StatsCard
          title="Department Faculty"
          value={currentDept.facultyCount}
          subtitle="Average 16.5 hrs/week workload"
          icon={Users}
          color="indigo"
          change="92% Ph.D completed"
          isPositive={true}
          onClick={() => navigate('/faculty')}
        />
        <StatsCard
          title="Average Attendance"
          value={`${currentDept.averageAttendance}%`}
          subtitle={`${defaulterStudents.length} Students below 75%`}
          icon={CalendarCheck2}
          color="emerald"
          change="+2.4% vs last cycle"
          isPositive={true}
          onClick={() => navigate('/attendance')}
        />
        <StatsCard
          title="Placement Conversion"
          value={`${currentDept.placementPercentage}%`}
          subtitle="Highest: ₹34.0 LPA (Adobe)"
          icon={Award}
          color="amber"
          change="312 / 330 placed"
          isPositive={true}
          onClick={() => navigate('/placements')}
        />
      </div>

      {/* Defaulter Alert Banner if any student below 75% */}
      {defaulterStudents.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  Critical Attendance Alert: {defaulterStudents.length} Students Flagged Below 75%
                </h4>
                <p className="mt-0.5 text-xs text-amber-700 dark:text-amber-300">
                  AKTU mandatory exam threshold violation. Parents have been notified via SMS. Mentors assigned for counseling.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {defaulterStudents.map((s) => (
                    <span
                      key={s.id}
                      onClick={() => navigate(`/students?search=${s.rollNo}`)}
                      className="cursor-pointer rounded-md bg-white border border-amber-300 px-2 py-0.5 text-[11px] font-semibold text-amber-800 hover:bg-amber-100 dark:bg-slate-900 dark:border-amber-700 dark:text-amber-300"
                    >
                      {s.name} ({s.rollNo.slice(-4)}) - {s.attendance}%
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/attendance')}
              className="text-xs font-bold text-amber-800 underline dark:text-amber-300"
            >
              Action Plan →
            </button>
          </div>
        </div>
      )}

      {/* Analytics: Faculty Workload & Attendance Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workload Bar Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Faculty Teaching Workload (Hours/Week)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AICTE standard recommendation: 14-18 hours per faculty
              </p>
            </div>
            <span className="text-xs font-semibold text-brand-600">Weekly Audit</span>
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 24]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="workload" name="Teaching Hours/Wk" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mentees" name="Assigned Mentees" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Breakdown Pie */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Student Attendance Spread
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Threshold breakdown across CSE sections
            </p>
          </div>

          <div className="mt-2 h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {attendanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 space-y-1.5 text-xs">
            {attendanceDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Subject Completion Track & Department Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject & Syllabus Completion */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Syllabus Pace & Subject Completion
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active 6th Semester courses progress vs AKTU timeline
              </p>
            </div>
            <button
              onClick={() => navigate('/subjects')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Full Syllabus Tracker →
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {deptSubjects.map((sub) => (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {sub.code}: {sub.name}
                    </span>
                    <span className="ml-2 text-slate-400">({sub.facultyName})</span>
                  </div>
                  <span className="font-bold text-brand-600 dark:text-brand-400">
                    {sub.deliveredLectures} / {sub.totalLectures} Lectures ({sub.completionPercentage}%)
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      sub.completionPercentage >= 80 ? 'bg-emerald-500' : 'bg-brand-500'
                    }`}
                    style={{ width: `${sub.completionPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOD Pending Digital Approvals */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              HOD Digital Approvals
            </h3>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              {pendingApprovals.length} Pending
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {pendingApprovals.length > 0 ? (
              pendingApprovals.map((req) => (
                <div
                  key={req.id}
                  className="rounded-xl border border-slate-200 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50"
                >
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span className="font-bold uppercase text-brand-600">{req.type}</span>
                    <span>{req.appliedOn}</span>
                  </div>
                  <h4 className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                    {req.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 dark:text-slate-400">
                    {req.reason}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    Applicant: {req.applicantName}
                  </p>

                  <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-2 dark:border-slate-800">
                    <button
                      onClick={() => updateApprovalStatus(req.id, 'Rejected', 'Rejected by HOD')}
                      className="rounded-lg border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-900"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateApprovalStatus(req.id, 'Approved', 'Approved by HOD')}
                      className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No pending approval requests in queue.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
