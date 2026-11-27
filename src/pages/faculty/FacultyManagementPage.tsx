import React, { useState } from 'react';
import {
  Users,
  Plus,
  BookOpen,
  Award,
  Clock,
  Mail,
  Phone,
  Search,
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Faculty } from '../../types';
import { Modal } from '../../components/common/Modal';

export const FacultyManagementPage: React.FC = () => {
  const { faculty, departments, addFaculty } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [designation, setDesignation] = useState<'Professor' | 'Associate Professor' | 'Assistant Professor'>('Associate Professor');
  const [qualification, setQualification] = useState('Ph.D, M.Tech');
  const [workload, setWorkload] = useState(16);

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.employeeCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDeptFilter === 'All' || f.department.toLowerCase().includes(selectedDeptFilter.toLowerCase());
    return matchesSearch && matchesDept;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !employeeCode) return;

    addFaculty({
      name,
      employeeCode,
      email: email || `${employeeCode.toLowerCase()}@abes.ac.in`,
      phone: '+91 98111 22334',
      department,
      designation,
      qualification,
      experienceYears: 10,
      assignedSubjects: ['CS501: Database Systems'],
      workloadHoursPerWeek: Number(workload),
      menteeCount: 20,
      researchPapersCount: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
      status: 'Active'
    });

    setShowAddModal(false);
    setName('');
    setEmployeeCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Faculty Directory & Workload Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Teaching assignments, research credentials, and AICTE weekly workload hours
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          <span>Appoint Faculty</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-[#111928]">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search faculty by name or employee code..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.code}>{d.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((f) => (
          <div
            key={f.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card hover:shadow-md transition-all dark:border-slate-800 dark:bg-[#111928]"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={f.avatar} alt={f.name} className="h-12 w-12 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{f.name}</h3>
                    <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">{f.designation}</p>
                    <span className="text-[10px] text-slate-400">{f.employeeCode}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Department:</span> {f.department}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Qualification:</span> {f.qualification}
              </div>

              {/* Teaching workload & Assigned Subjects */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/50 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Weekly Workload:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{f.workloadHoursPerWeek} Hours / Week</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Research Publications:</span>
                  <span className="font-bold text-emerald-600">{f.researchPapersCount} Scopus/IEEE</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Assigned Mentees:</span>
                  <span className="font-bold text-brand-600">{f.menteeCount} Students</span>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Subjects</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {f.assignedSubjects.map((sub, idx) => (
                    <span key={idx} className="rounded bg-brand-50 border border-brand-200 px-2 py-0.5 text-[10px] font-semibold text-brand-700 dark:bg-brand-950 dark:border-brand-900 dark:text-brand-300">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs dark:border-slate-800">
              <span className="text-slate-400">{f.email}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {f.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Faculty Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Appoint New Faculty Member"
        description="Add credentials and weekly lecture allocation."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Faculty Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. S. K. Roy"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Employee Code</label>
              <input
                type="text"
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                placeholder="ABES-FAC-120"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Designation</label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Highest Qualification</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="Ph.D (IIT), M.Tech"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Weekly Teaching Hours</label>
              <input
                type="number"
                value={workload}
                onChange={(e) => setWorkload(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                min={8}
                max={24}
              />
            </div>
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
              Confirm Appointment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
