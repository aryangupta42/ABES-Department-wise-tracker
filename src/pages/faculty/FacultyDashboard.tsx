import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  BookOpen,
  Calendar,
  ClipboardList,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CalendarCheck2
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const { subjects, assignments, students, approvals, addApprovalRequest } = useData();
  const navigate = useNavigate();

  // Find subjects taught by Dr. Meenakshi Sharma
  const mySubjects = subjects.filter((s) => s.facultyName.includes('Meenakshi') || s.facultyName.includes('Sharma'));
  const myAssignments = assignments.filter((a) => a.facultyName.includes('Meenakshi') || a.facultyName.includes('Sharma'));
  const myMentees = students.filter((s) => s.mentorName.includes('Meenakshi') || s.mentorName.includes('Sharma'));

  // Today's classes schedule
  const todayClasses = [
    { time: '09:00 - 10:00 AM', code: 'KCS-601', name: 'Software Engineering', room: 'B-Block 302', section: 'CSE-3B', type: 'Theory', status: 'Completed' },
    { time: '10:00 - 11:00 AM', code: 'KCS-602', name: 'Web Technology', room: 'B-Block 302', section: 'CSE-3B', type: 'Theory', status: 'Next Class' },
    { time: '11:15 - 01:15 PM', code: 'KCS-652', name: 'Web Technology Lab', room: 'Lab 405 (HP Center)', section: 'CSE-3B', type: 'Lab', status: 'Upcoming' },
    { time: '02:00 - 03:00 PM', code: 'KCS-MNT', name: 'Student Mentoring Hour', room: 'Cabin 304', section: 'Mentees', type: 'Mentorship', status: 'Upcoming' }
  ];

  return (
    <div className="space-y-6">
      {/* Faculty Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-indigo-950 p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-500/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                Faculty Academic Workspace
              </span>
              <span className="text-xs text-slate-300">• ABES-FAC-089</span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Good Morning, {user?.name}
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-xl">
              Associate Professor • Computer Science & Engineering. You have <strong>3 sessions scheduled today</strong> and <strong>16 assignments pending evaluation</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/attendance')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-brand-700 transition-all"
            >
              <CalendarCheck2 className="h-4 w-4" />
              <span>Mark Class Attendance</span>
            </button>
            <button
              onClick={() => navigate('/assignments')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20"
            >
              <span>Create Assignment</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Assigned Subjects"
          value={mySubjects.length}
          subtitle="4 Courses & Labs"
          icon={BookOpen}
          color="brand"
          change="85% avg syllabus pace"
          isPositive={true}
          onClick={() => navigate('/subjects')}
        />
        <StatsCard
          title="Weekly Workload"
          value="18 hrs"
          subtitle="Compliant with AICTE"
          icon={Clock}
          color="indigo"
          change="4 hours today"
          isPositive={true}
        />
        <StatsCard
          title="Assigned Mentees"
          value={myMentees.length}
          subtitle="Avg CGPA: 8.84"
          icon={Users}
          color="emerald"
          change="All progressing well"
          isPositive={true}
          onClick={() => navigate('/students')}
        />
        <StatsCard
          title="Submissions to Grade"
          value={myAssignments.reduce((acc, a) => acc + (a.totalSubmissions - a.evaluatedSubmissions), 0)}
          subtitle="Across Web Tech & SE"
          icon={ClipboardList}
          color="amber"
          change="Due next week"
          isPositive={false}
          onClick={() => navigate('/assignments')}
        />
      </div>

      {/* Main Grid: Today's Schedule & Assigned Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Timetable Widget */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Today's Teaching Schedule (Monday)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct access to attendance logging and lecture resources
              </p>
            </div>
            <button
              onClick={() => navigate('/timetable')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Full Timetable →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {todayClasses.map((cls, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition-all ${
                  cls.status === 'Next Class'
                    ? 'border-brand-500 bg-brand-50/50 ring-1 ring-brand-500 dark:bg-brand-950/30'
                    : 'border-slate-200 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="rounded-lg bg-white p-2 text-center shadow-xs border border-slate-200 dark:bg-slate-800 dark:border-slate-700 min-w-16">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Room</span>
                    <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">{cls.room.split(' ')[0]}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {cls.code}: {cls.name}
                      </span>
                      <span className="rounded bg-slate-200 px-1.5 py-0.2 text-[10px] text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                        {cls.section}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{cls.time}</span>
                      <span>• {cls.room}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 sm:mt-0 flex items-center gap-2 justify-end">
                  {cls.status === 'Completed' ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Logged
                    </Badge>
                  ) : cls.status === 'Next Class' ? (
                    <button
                      onClick={() => navigate('/attendance')}
                      className="rounded-lg bg-brand-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-brand-700"
                    >
                      Take Attendance
                    </button>
                  ) : (
                    <Badge variant="default" size="sm">
                      {cls.status}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Group Quick Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Assigned Mentee Roster
            </h3>
            <span className="text-xs font-semibold text-brand-600">
              {myMentees.length} Students
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {myMentees.map((mentee) => (
              <div
                key={mentee.id}
                onClick={() => navigate(`/students?search=${mentee.rollNo}`)}
                className="group cursor-pointer flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={mentee.avatar}
                    alt={mentee.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                      {mentee.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{mentee.section} • Roll: {mentee.rollNo.slice(-4)}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    CGPA {mentee.cgpa}
                  </span>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    {mentee.attendance}% Attn
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate('/students')}
              className="w-full text-center py-2 text-xs font-semibold text-brand-600 hover:underline"
            >
              Schedule Mentoring Meeting →
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Active Assignments Management */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Course Assignments & Submissions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review and grade student lab code and theoretical reports
            </p>
          </div>
          <button
            onClick={() => navigate('/assignments')}
            className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-700"
          >
            + Create New Assignment
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {myAssignments.map((asg) => (
            <div
              key={asg.id}
              className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div className="flex justify-between items-start">
                <span className="rounded bg-brand-100 text-brand-800 text-[10px] font-bold px-2 py-0.5 dark:bg-brand-950 dark:text-brand-300">
                  {asg.subjectCode} • {asg.section}
                </span>
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                  Due: {asg.dueDate}
                </span>
              </div>

              <h4 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">
                {asg.title}
              </h4>
              <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 dark:text-slate-400">
                {asg.description}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-slate-800 text-xs">
                <span className="text-slate-500">
                  Submissions: <strong className="text-slate-800 dark:text-slate-200">{asg.totalSubmissions}</strong>
                </span>
                <span className="text-slate-500">
                  Graded: <strong className="text-emerald-600">{asg.evaluatedSubmissions}</strong> / {asg.totalSubmissions}
                </span>
                <button
                  onClick={() => navigate('/assignments')}
                  className="font-bold text-brand-600 hover:underline"
                >
                  Grade →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
