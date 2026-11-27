import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  CalendarCheck2,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ArrowRight,
  ExternalLink,
  Code,
  Briefcase,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { assignments, events, notices, addComplaint, addApprovalRequest } = useData();
  const navigate = useNavigate();

  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [submissionFile, setSubmissionFile] = useState<string>('');
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  // Subject-wise attendance data for student Varun Gupta
  const subjectAttendance = [
    { code: 'KCS-601', name: 'Software Engineering', attended: 34, total: 38, percent: 89.4, status: 'Safe' },
    { code: 'KCS-602', name: 'Web Technology & Cloud', attended: 32, total: 36, percent: 88.8, status: 'Safe' },
    { code: 'KCS-603', name: 'Computer Networks', attended: 27, total: 33, percent: 81.8, status: 'Safe' },
    { code: 'KCS-652', name: 'Web Technology Lab', attended: 14, total: 16, percent: 87.5, status: 'Safe' },
    { code: 'KOE-068', name: 'Open Elective (Cyber Law)', attended: 19, total: 21, percent: 90.4, status: 'Safe' }
  ];

  // Today's classes for student
  const todaySchedule = [
    { time: '09:00 - 10:00 AM', subject: 'KCS-601: Software Engineering', room: 'B-Block 302', faculty: 'Dr. Meenakshi Sharma' },
    { time: '10:00 - 11:00 AM', subject: 'KCS-602: Web Technology', room: 'B-Block 302', faculty: 'Dr. Meenakshi Sharma' },
    { time: '11:15 - 01:15 PM', subject: 'KCS-652: Web Tech Practical Lab', room: 'Lab 405 (HP Center)', faculty: 'Dr. Meenakshi Sharma' },
    { time: '02:00 - 04:00 PM', subject: 'KCS-659: Project Lab Session', room: 'Incubation Hub', faculty: 'Prof. Rajesh Tiwari' }
  ];

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionFile) return;

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setSelectedAssignment(null);
      setSubmissionFile('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Student Profile Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-brand-950 to-navy-900 p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=140'}
              alt={user?.name}
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-brand-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-brand-500/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-300">
                  Student Portal • Year 3 (6th Sem)
                </span>
                <span className="text-xs text-slate-300">Roll: {user?.collegeId}</span>
              </div>
              <h1 className="mt-1 text-2xl font-black tracking-tight">{user?.name}</h1>
              <p className="text-xs text-slate-300">
                B.Tech in Computer Science & Engineering • Section {user?.section || 'CSE-3B'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/attendance')}
              className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20"
            >
              Detailed Attendance
            </button>
            <button
              onClick={() => navigate('/examinations')}
              className="rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
            >
              View Grade Card
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Overall Attendance"
          value="87.5%"
          subtitle="Safe (+12.5% over 75% limit)"
          icon={CalendarCheck2}
          color="emerald"
          change="Eligible for Sessional-II"
          isPositive={true}
          onClick={() => navigate('/attendance')}
        />
        <StatsCard
          title="Cumulative CGPA"
          value="8.92"
          subtitle="Rank #4 in CSE-3B"
          icon={GraduationCap}
          color="brand"
          change="SGPA 8.92 (Sem 5)"
          isPositive={true}
          onClick={() => navigate('/examinations')}
        />
        <StatsCard
          title="Coding Contest Rating"
          value="1,845"
          subtitle="Knight on LeetCode / Codeforces"
          icon={Code}
          color="indigo"
          change="Top 3% at ABES"
          isPositive={true}
          onClick={() => navigate('/leaderboard')}
        />
        <StatsCard
          title="Pending Assignments"
          value={assignments.filter((a) => a.status === 'Active').length}
          subtitle="1 Due within 48 hours"
          icon={BookOpen}
          color="amber"
          change="Web Tech REST API"
          isPositive={false}
          onClick={() => navigate('/assignments')}
        />
      </div>

      {/* Main Grid: Subject Attendance & Today's Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject-Wise Attendance Breakdown */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Subject-Wise Attendance Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Minimum 75% mandatory for AKTU university exam permit
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              All Subjects Safe
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {subjectAttendance.map((sub) => (
              <div key={sub.code} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {sub.code}: {sub.name}
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {sub.attended} / {sub.total} Classes ({sub.percent}%)
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      sub.percent >= 85 ? 'bg-emerald-500' : sub.percent >= 75 ? 'bg-brand-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${sub.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50/60 p-3 dark:border-brand-900/50 dark:bg-brand-950/20 text-xs text-brand-900 dark:text-brand-200 flex items-center justify-between">
            <span>
              💡 <strong>Attendance Buffer:</strong> You can safely miss up to <strong>7 more lectures</strong> without dropping below the 75% minimum threshold.
            </span>
          </div>
        </div>

        {/* Today's Schedule for Student */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Today's Class Timetable
            </h3>
            <span className="text-xs font-semibold text-brand-600">Monday</span>
          </div>

          <div className="mt-3 space-y-2.5">
            {todaySchedule.map((slot, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 transition-colors dark:border-slate-800 dark:bg-slate-900/40"
              >
                <div className="flex justify-between text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                  <span>{slot.time}</span>
                  <span>{slot.room}</span>
                </div>
                <h4 className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                  {slot.subject}
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  Faculty: {slot.faculty}
                </p>
              </div>
            ))}

            <button
              onClick={() => navigate('/timetable')}
              className="w-full text-center py-2 text-xs font-semibold text-brand-600 hover:underline"
            >
              View Full Week Schedule →
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Active Assignments with Submission Modal & Placement Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Assignments */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Active Assignments & Project Submissions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload your lab solutions before the deadline
              </p>
            </div>
            <button
              onClick={() => navigate('/assignments')}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              All Assignments →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-brand-300 dark:border-slate-800 dark:hover:border-brand-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {asg.title}
                    </span>
                    <span className="rounded bg-brand-50 text-brand-700 text-[10px] font-semibold px-2 py-0.5 dark:bg-brand-950 dark:text-brand-300">
                      {asg.subjectCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 dark:text-slate-400">
                    {asg.description}
                  </p>
                  <div className="text-[11px] text-slate-400">
                    Faculty: {asg.facultyName} • Due: <strong className="text-rose-600">{asg.dueDate}</strong>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0 flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setSelectedAssignment(asg)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-700 shadow-xs"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Submit Work</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Preparation & Drives */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Placement Preparation
            </h3>
            <span className="text-xs font-semibold text-emerald-600">Eligible (CGPA &gt;= 8.0)</span>
          </div>

          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Amazon AWS Drive</span>
                <span className="font-bold text-emerald-600">₹28.5 LPA</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Drive Date: 10 Dec 2026 • Round 1: Online Coding Assessment
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[11px]">
                <span className="text-slate-400">Your CGPA (8.92) satisfies criteria</span>
                <button
                  onClick={() => navigate('/placements')}
                  className="font-bold text-brand-600 hover:underline"
                >
                  Register →
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Adobe Systems (MTS)</span>
                <span className="font-bold text-emerald-600">₹34.0 LPA</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Drive Date: 30 Nov 2026 • Product Engineering Team
              </p>
              <div className="mt-2 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[11px]">
                <span className="text-slate-400">Shortlisting underway</span>
                <button
                  onClick={() => navigate('/placements')}
                  className="font-bold text-brand-600 hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate('/placements')}
              className="w-full text-center py-2 text-xs font-semibold text-brand-600 hover:underline"
            >
              Open Placement & Internship Hub →
            </button>
          </div>
        </div>
      </div>

      {/* Assignment Submission Modal */}
      <Modal
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        title={selectedAssignment ? `Submit Work: ${selectedAssignment.title}` : ''}
        description="Attach your project report, GitHub repository link, or zip archive for faculty evaluation."
      >
        {submittedSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-center text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
            <p className="font-bold">Assignment Submitted Successfully!</p>
            <p className="mt-1">Timestamp recorded. Faculty will be notified for grading.</p>
          </div>
        ) : (
          <form onSubmit={handleAssignmentSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                GitHub Repository URL / Project Link
              </label>
              <input
                type="text"
                placeholder="https://github.com/varun-gupta/web-tech-microservice"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Upload Report or Code Archive (PDF / ZIP)
              </label>
              <div className="mt-1.5 flex justify-center rounded-xl border border-dashed border-slate-300 p-6 dark:border-slate-700">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-slate-400" />
                  <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                    <label className="cursor-pointer font-bold text-brand-600 hover:text-brand-500">
                      <span>Browse file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => setSubmissionFile(e.target.files?.[0]?.name || 'assignment_submission.zip')}
                      />
                    </label>
                    <span className="pl-1">or drag and drop</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">PDF, ZIP up to 25MB</p>
                  {submissionFile && (
                    <p className="mt-2 text-xs font-bold text-emerald-600">Selected: {submissionFile}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!submissionFile}
                className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700 disabled:opacity-50"
              >
                Confirm Submission
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
