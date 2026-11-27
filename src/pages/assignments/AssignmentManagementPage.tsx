import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/common/Modal';

export const AssignmentManagementPage: React.FC = () => {
  const { assignments, subjects, addAssignment } = useData();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState('KCS-602');
  const [subjectName, setSubjectName] = useState('Web Technology');
  const [dueDate, setDueDate] = useState('2026-12-05');
  const [totalMarks, setTotalMarks] = useState(25);
  const [description, setDescription] = useState('');
  const [section, setSection] = useState('CSE-3B');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addAssignment({
      title,
      subjectCode,
      subjectName,
      department: 'Computer Science & Engineering',
      semester: 6,
      section,
      facultyName: 'Dr. Meenakshi Sharma',
      dueDate,
      totalMarks: Number(totalMarks),
      status: 'Active',
      description
    });

    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Assignments & Practical Submissions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish academic assignments, track submission counts, and record continuous evaluation marks
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assignments.map((asg) => (
          <div
            key={asg.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card hover:shadow-md transition-all dark:border-slate-800 dark:bg-[#111928]"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="rounded-md bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300">
                  {asg.subjectCode} • {asg.section}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  asg.status === 'Active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {asg.status}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                {asg.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {asg.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3 dark:border-slate-800">
                <span>Faculty: <strong className="text-slate-700 dark:text-slate-300">{asg.facultyName}</strong></span>
                <span>Max Marks: <strong className="text-slate-700 dark:text-slate-300">{asg.totalMarks}</strong></span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-rose-600 font-semibold">Due Date: {asg.dueDate}</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {asg.totalSubmissions} Submissions
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs dark:border-slate-800">
              <span className="text-emerald-600 font-semibold">
                {asg.evaluatedSubmissions} / {asg.totalSubmissions} Evaluated
              </span>
              <button className="font-bold text-brand-600 hover:underline">
                Review Submissions →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Create Assignment */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create Course Assignment"
        description="Specify assignment title, instructions, maximum marks, and submission deadline."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Assignment Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Assignment 4: Binary Search Tree Implementation"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
              <select
                value={subjectCode}
                onChange={(e) => {
                  setSubjectCode(e.target.value);
                  const s = subjects.find((sub) => sub.code === e.target.value);
                  if (s) setSubjectName(s.name);
                }}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.code}>{sub.code}: {sub.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Target Section</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="CSE-3B"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Total Marks</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                min={10}
                max={100}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Instructions & Problem Statement</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Outline task details, grading rubric, and expected file formats..."
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700"
            >
              Publish Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
