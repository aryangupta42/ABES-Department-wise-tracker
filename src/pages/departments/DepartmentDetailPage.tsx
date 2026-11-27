import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Users,
  GraduationCap,
  Award,
  HeartPulse,
  Mail,
  Calendar,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles
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
import { useData } from '../../context/DataContext';
import { calculateDepartmentHealth, INITIAL_ACHIEVEMENTS } from '../../data/mockData';

export const DepartmentDetailPage: React.FC = () => {
  const { deptId } = useParams<{ deptId: string }>();
  const navigate = useNavigate();
  const { departments, students, faculty, subjects } = useData();
  const achievements = INITIAL_ACHIEVEMENTS;

  const [activeTab, setActiveTab] = useState<'overview' | 'faculty' | 'students' | 'syllabus' | 'labs'>('overview');

  const dept = departments.find((d) => d.id === deptId || d.code.toLowerCase() === deptId?.toLowerCase()) || departments[0];
  const health = calculateDepartmentHealth(dept);

  // Department specific datasets
  const deptFaculty = faculty.filter(
    (f) => f.department.toLowerCase().includes(dept.code.toLowerCase()) || f.department === dept.name
  );
  const deptStudents = students.filter(
    (s) => s.department.toLowerCase().includes(dept.code.toLowerCase()) || s.department === dept.name
  );
  const deptSubjects = subjects.filter(
    (s) => s.department.toLowerCase().includes(dept.code.toLowerCase()) || s.department === dept.name
  );
  const deptAchievements = achievements.filter(
    (a) => a.department.toLowerCase().includes(dept.code.toLowerCase()) || a.department === dept.name
  );

  const semesterPerformance = [
    { sem: 'Sem 1', passRate: 91, avgSgpa: 8.1 },
    { sem: 'Sem 2', passRate: 88, avgSgpa: 7.9 },
    { sem: 'Sem 3', passRate: 86, avgSgpa: 7.8 },
    { sem: 'Sem 4', passRate: 93, avgSgpa: 8.3 },
    { sem: 'Sem 5', passRate: 94, avgSgpa: 8.4 },
    { sem: 'Sem 6', passRate: 92, avgSgpa: 8.2 }
  ];

  return (
    <div className="space-y-6">
      {/* Back button & Page Breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/departments')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Departments</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-brand-950 p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white font-extrabold text-xl shadow-lg">
              {dept.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  Tier-1 NBA Accredited
                </span>
                <span className="text-xs text-slate-300">• Estd. {dept.establishedYear}</span>
              </div>
              <h1 className="mt-1 text-2xl font-black tracking-tight">{dept.name}</h1>
              <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
                {dept.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end justify-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
              Department Health Index
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white">{dept.healthScore}</span>
              <span className="text-xs text-slate-300">/ 100</span>
              <span className="ml-2 rounded bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                Grade {health.healthGrade}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Attendance {dept.averageAttendance}% • Placement {dept.placementPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { key: 'overview', label: 'Overview & Analytics' },
          { key: 'faculty', label: `Faculty Roster (${deptFaculty.length})` },
          { key: 'students', label: `Students Directory (${deptStudents.length})` },
          { key: 'syllabus', label: `Syllabus & Labs (${deptSubjects.length})` }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111928]">
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Students</span>
              <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{dept.studentCount}</div>
              <span className="text-[11px] text-slate-500">{dept.sectionsCount} Active Sections</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111928]">
              <span className="text-xs text-slate-400 font-semibold uppercase">Faculty Strength</span>
              <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{dept.facultyCount}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Ratio 1:{(dept.studentCount / dept.facultyCount).toFixed(0)}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111928]">
              <span className="text-xs text-slate-400 font-semibold uppercase">Average Attendance</span>
              <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{dept.averageAttendance}%</div>
              <span className="text-[11px] text-brand-600 font-semibold">Above AKTU 75% cutoff</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111928]">
              <span className="text-xs text-slate-400 font-semibold uppercase">Placement Conversion</span>
              <div className="mt-1 text-2xl font-black text-emerald-600">{dept.placementPercentage}%</div>
              <span className="text-[11px] text-slate-500">Highest: ₹34.0 LPA</span>
            </div>
          </div>

          {/* Academic Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Semester Academic Pass Rate Trend
                </h3>
                <span className="text-xs text-brand-600 font-semibold">AKTU Sessional Audits</span>
              </div>
              <div className="mt-4 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={semesterPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                    <XAxis dataKey="sem" tick={{ fontSize: 11 }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="passRate" name="Pass Rate %" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* HOD Profile Details */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Head of Department
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 font-bold dark:bg-brand-950">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{dept.hodName}</h4>
                    <p className="text-xs text-slate-400">Professor & Head of Department</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{dept.hodEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Office Cabin:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">B-Block, Room 301</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Accreditation:</span>
                    <span className="font-semibold text-emerald-600">{dept.accreditedUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Specialized Labs:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{dept.labsCount} Laboratories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Faculty Roster */}
      {activeTab === 'faculty' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deptFaculty.map((f) => (
            <div
              key={f.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#111928]"
            >
              <div className="flex items-center gap-3">
                <img src={f.avatar} alt={f.name} className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{f.name}</h4>
                  <p className="text-[11px] text-slate-400">{f.designation}</p>
                  <p className="text-[10px] text-brand-600 dark:text-brand-400">{f.qualification}</p>
                </div>
              </div>
              <div className="mt-3 border-t border-slate-100 pt-2 text-xs space-y-1 dark:border-slate-800">
                <div className="flex justify-between text-slate-500">
                  <span>Workload:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{f.workloadHoursPerWeek} hrs/week</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Research Papers:</span>
                  <span className="font-bold text-emerald-600">{f.researchPapersCount} Published</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Students Directory */}
      {activeTab === 'students' && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 border-b border-slate-100 font-bold uppercase text-[10px] text-slate-400 dark:bg-slate-900 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Roll No</th>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">CGPA</th>
                <th className="px-4 py-3">Attendance</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {deptStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <img src={s.avatar} alt={s.name} className="h-6 w-6 rounded-full object-cover" />
                    <span>{s.name}</span>
                  </td>
                  <td className="px-4 py-3">{s.rollNo}</td>
                  <td className="px-4 py-3">{s.section}</td>
                  <td className="px-4 py-3 font-bold">{s.cgpa}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">{s.attendance}%</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Syllabus */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4">
          {deptSubjects.map((sub) => (
            <div
              key={sub.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-[#111928]"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {sub.code}: {sub.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">Faculty: {sub.facultyName}</p>
                </div>
                <span className="text-xs font-extrabold text-brand-600">
                  {sub.completionPercentage}% Syllabus Completed
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-2">
                {sub.syllabusUnits.map((u) => (
                  <div
                    key={u.unit}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-2 text-center dark:border-slate-800 dark:bg-slate-900/50"
                  >
                    <span className="block text-[10px] font-bold text-slate-400">Unit {u.unit}</span>
                    <span className="mt-0.5 block text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={u.title}>
                      {u.title}
                    </span>
                    <span className={`mt-1 inline-block rounded px-1.5 py-0.2 text-[9px] font-bold ${
                      u.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : u.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
