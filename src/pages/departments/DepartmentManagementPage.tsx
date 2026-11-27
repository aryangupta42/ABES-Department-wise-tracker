import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  HeartPulse,
  Plus,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Department } from '../../types';
import { Modal } from '../../components/common/Modal';
import { calculateDepartmentHealth } from '../../data/mockData';

export const DepartmentManagementPage: React.FC = () => {
  const { departments, addDepartment } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [hodName, setHodName] = useState('');
  const [hodEmail, setHodEmail] = useState('');
  const [facultyCount, setFacultyCount] = useState(30);
  const [studentCount, setStudentCount] = useState(400);
  const [description, setDescription] = useState('');

  const filteredDepts = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.hodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    addDepartment({
      name,
      code: code.toUpperCase(),
      hodName,
      hodEmail,
      facultyCount: Number(facultyCount),
      studentCount: Number(studentCount),
      sectionsCount: Math.ceil(Number(studentCount) / 60),
      averageAttendance: 82.5,
      healthScore: 88,
      placementPercentage: 89.0,
      establishedYear: 2024,
      description: description || 'Specialized engineering department fostering innovation and research.',
      achievementsCount: 5,
      labsCount: 6,
      accreditedUntil: '2028 (Tier 1)'
    });

    setShowAddModal(false);
    setName('');
    setCode('');
    setHodName('');
    setHodEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Department Management & Health Index
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Overview of all academic departments, accredited labs, and NBA health scores
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Department</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-[#111928]">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by department name, code (CSE, IT) or HOD..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          Showing <strong>{filteredDepts.length}</strong> departments
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDepts.map((dept) => {
          const health = calculateDepartmentHealth(dept);
          return (
            <div
              key={dept.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card hover:shadow-lg hover:border-brand-300 transition-all dark:border-slate-800 dark:bg-[#111928] dark:hover:border-brand-800"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 font-extrabold text-sm dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
                    {dept.code}
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <HeartPulse className="h-3 w-3" />
                      Score {dept.healthScore}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Grade {health.healthGrade}</span>
                  </div>
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400 transition-colors">
                  {dept.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                {/* HOD Info */}
                <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/40">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Head of Department
                  </span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{dept.hodName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{dept.hodEmail}</p>
                </div>

                {/* Stats Breakdown */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div>
                    <span className="block text-[10px] text-slate-400">Students</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{dept.studentCount}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Faculty</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{dept.facultyCount}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Placement</span>
                    <span className="font-extrabold text-emerald-600">{dept.placementPercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => navigate(`/departments/${dept.id}`)}
                  className="flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-brand-600 hover:text-white dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-brand-600 transition-all"
                >
                  <span>Open Department Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Department Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Register New Academic Department"
        description="Configure department credentials, assigned HOD, and initial student intake capacity."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Department Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Electrical Engineering"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Department Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. EE"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white uppercase"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                HOD Full Name
              </label>
              <input
                type="text"
                value={hodName}
                onChange={(e) => setHodName(e.target.value)}
                placeholder="e.g. Dr. Rajesh Gupta"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                HOD Email
              </label>
              <input
                type="email"
                value={hodEmail}
                onChange={(e) => setHodEmail(e.target.value)}
                placeholder="e.g. hod.ee@abes.ac.in"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Faculty Members Count
              </label>
              <input
                type="number"
                value={facultyCount}
                onChange={(e) => setFacultyCount(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                min={5}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Student Intake Capacity
              </label>
              <input
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                min={60}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Department Description & Thrust Areas
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide a brief overview of research labs and focus areas..."
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
              Register Department
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
