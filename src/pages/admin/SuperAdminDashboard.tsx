import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  CalendarCheck2,
  HeartPulse,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileCheck,
  ChevronRight,
  Sparkles,
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { calculateDepartmentHealth } from '../../data/mockData';

export const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    departments,
    students,
    faculty,
    approvals,
    events,
    notices,
    timeline,
    updateApprovalStatus
  } = useData();
  const navigate = useNavigate();

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');

  // Aggregated Metrics
  const totalStudentsCount = departments.reduce((acc, d) => acc + d.studentCount, 0);
  const totalFacultyCount = departments.reduce((acc, d) => acc + d.facultyCount, 0);
  const totalHodsCount = departments.length;
  const avgCollegeAttendance = (
    departments.reduce((acc, d) => acc + d.averageAttendance, 0) / (departments.length || 1)
  ).toFixed(1);

  // Department comparison data for Recharts
  const deptChartData = departments.map((d) => ({
    name: d.code,
    fullName: d.name,
    attendance: d.averageAttendance,
    placement: d.placementPercentage,
    health: d.healthScore,
    students: d.studentCount,
    faculty: d.facultyCount
  }));

  // Radar metrics for comprehensive quality audit
  const radarData = [
    { metric: 'Attendance', CSE: 85, IT: 82, ECE: 79, AIML: 87 },
    { metric: 'Placement', CSE: 94, IT: 91, ECE: 86, AIML: 96 },
    { metric: 'Research/Patents', CSE: 90, IT: 84, ECE: 82, AIML: 88 },
    { metric: 'Syllabus Pace', CSE: 88, IT: 86, ECE: 80, AIML: 91 },
    { metric: 'Lab Infrastructure', CSE: 95, IT: 88, ECE: 85, AIML: 94 }
  ];

  const pendingApprovals = approvals.filter((a) => a.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-brand-950 p-6 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-500/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-300">
                Super Admin Console
              </span>
              <span className="text-xs text-slate-300">• ABES Engineering College</span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back, {user?.name}
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
              Campus performance index is operating at <strong>91% Health Score</strong>. All 6 engineering departments have completed Sessional-I audits.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate('/reports')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Executive Report</span>
            </button>
            <button
              onClick={() => navigate('/departments')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-brand-600/30 hover:bg-brand-700 transition-all"
            >
              <span>Manage Departments</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Departments"
          value={departments.length}
          subtitle="6 NBA Tier-1 accredited"
          icon={Building2}
          color="brand"
          change="+1 New Dept"
          isPositive={true}
          onClick={() => navigate('/departments')}
        />
        <StatsCard
          title="Total Enrolled Students"
          value={totalStudentsCount.toLocaleString()}
          subtitle="Across B.Tech Years 1-4"
          icon={GraduationCap}
          color="emerald"
          change="+4.2% YoY"
          isPositive={true}
          onClick={() => navigate('/students')}
        />
        <StatsCard
          title="Faculty Strength"
          value={totalFacultyCount}
          subtitle={`Ratio: 1 : ${(totalStudentsCount / (totalFacultyCount || 1)).toFixed(0)} (AICTE Compliant)`}
          icon={Users}
          color="indigo"
          change="52 Ph.D holders"
          isPositive={true}
          onClick={() => navigate('/faculty')}
        />
        <StatsCard
          title="Overall Attendance"
          value={`${avgCollegeAttendance}%`}
          subtitle="64 Defaulters flagged"
          icon={CalendarCheck2}
          color="amber"
          change="+1.8% vs last month"
          isPositive={true}
          onClick={() => navigate('/attendance')}
        />
      </div>

      {/* Analytics Row: Department Comparison & Radar Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Comparison Bar Chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Department Performance Comparison
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Attendance rate vs Placement percentage across departments
              </p>
            </div>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
              Session 2025-26
            </span>
          </div>

          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="attendance" name="Avg Attendance %" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placement" name="Placement %" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="health" name="Health Score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Dimensional Radar Health */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Department Health Radar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Holistic NBA criterion benchmark
            </p>
          </div>

          <div className="mt-3 h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#cbd5e1" opacity={0.6} />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[60, 100]} tick={{ fontSize: 9 }} />
                <Radar name="CSE" dataKey="CSE" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                <Radar name="AIML" dataKey="AIML" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Department Health Cards & Digital Approval Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Health Score List */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-rose-500" />
                <span>Department Health Scores (Live Audit)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Algorithmic score factoring attendance, faculty ratio & placements
              </p>
            </div>
            <button
              onClick={() => navigate('/departments')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              View Full Breakdown →
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {departments.map((dept) => {
              const health = calculateDepartmentHealth(dept);
              return (
                <div
                  key={dept.id}
                  onClick={() => navigate(`/departments/${dept.id}`)}
                  className="group cursor-pointer rounded-xl border border-slate-200/80 p-3.5 hover:border-brand-300 hover:bg-slate-50/70 transition-all dark:border-slate-800 dark:hover:border-brand-700 dark:hover:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                          {dept.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">HOD: {dept.hodName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">
                        {dept.healthScore}
                      </span>
                      <span className="text-[10px] text-slate-400"> / 100</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Health Index</span>
                      <span className="font-semibold text-brand-600 dark:text-brand-400">
                        Grade {health.healthGrade}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${
                          dept.healthScore >= 90
                            ? 'bg-emerald-500'
                            : dept.healthScore >= 80
                            ? 'bg-brand-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${dept.healthScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 dark:border-slate-800/60">
                    <span>Attendance: <strong className="text-slate-700 dark:text-slate-300">{dept.averageAttendance}%</strong></span>
                    <span>Placement: <strong className="text-slate-700 dark:text-slate-300">{dept.placementPercentage}%</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Digital Approval Workflow Queue */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pending Approvals
              </h3>
            </div>
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              {pendingApprovals.length} Action Needed
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {pendingApprovals.length > 0 ? (
              pendingApprovals.slice(0, 3).map((appr) => (
                <div
                  key={appr.id}
                  className="rounded-xl border border-slate-200/70 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {appr.type}
                    </span>
                    <span className="text-[10px] text-slate-400">{appr.appliedOn}</span>
                  </div>

                  <h4 className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                    {appr.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {appr.reason}
                  </p>

                  <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                    Applicant: {appr.applicantName} ({appr.department})
                  </div>

                  {/* Interactive Approve / Reject buttons */}
                  <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-200/60 pt-2 dark:border-slate-800">
                    <button
                      onClick={() => updateApprovalStatus(appr.id, 'Rejected', 'Insufficient justification')}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:bg-slate-800 dark:text-rose-400 transition-colors"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => updateApprovalStatus(appr.id, 'Approved', 'Approved by Super Admin')}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                All requests have been addressed!
              </div>
            )}

            <button
              onClick={() => navigate('/leaves')}
              className="w-full text-center py-2 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
            >
              Open Full Digital Approval Workflow →
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Live Activity Timeline & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Campus Activity Timeline
            </h3>
            <span className="text-xs text-slate-400">Real-time audit log</span>
          </div>

          <div className="mt-4 space-y-3">
            {timeline.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-3 text-xs">
                <div className="mt-1 h-2 w-2 rounded-full bg-brand-500 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.user}
                  </span>{' '}
                  <span className="text-slate-500 dark:text-slate-400">{item.action}</span>{' '}
                  <strong className="text-brand-600 dark:text-brand-400 font-medium">
                    ({item.target})
                  </strong>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming College Events */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Upcoming Events & Fests
            </h3>
            <button
              onClick={() => navigate('/events')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              All Events →
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {events.slice(0, 2).map((ev) => (
              <div
                key={ev.id}
                onClick={() => navigate('/events')}
                className="group cursor-pointer rounded-xl border border-slate-200/70 p-3 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
              >
                <div className="flex items-center justify-between text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                  <span>{ev.category}</span>
                  <span>{ev.date}</span>
                </div>
                <h4 className="mt-1 text-xs font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {ev.title}
                </h4>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-1 dark:text-slate-400">
                  {ev.venue} • {ev.registeredCount} Registered
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
