import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit2
} from 'lucide-react';
import { DataTable, Column } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useData } from '../../context/DataContext';
import { Student } from '../../types';

export const StudentManagementPage: React.FC = () => {
  const { students, departments, addStudent, updateStudent, deleteStudent } = useData();

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Add form fields
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState(3);
  const [section, setSection] = useState('CSE-3B');
  const [cgpa, setCgpa] = useState(8.5);
  const [attendance, setAttendance] = useState(85.0);

  const filteredStudents = students.filter((s) => {
    const matchesDept = selectedDeptFilter === 'All' || s.department.toLowerCase().includes(selectedDeptFilter.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'All' || s.status === selectedStatusFilter;
    return matchesDept && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rollNo) return;

    addStudent({
      name,
      rollNo,
      admissionNo: `2022-${section.split('-')[0]}-${rollNo.slice(-4)}`,
      email: email || `${rollNo}@abes.ac.in`,
      phone: '+91 98123 45678',
      department,
      year: Number(year),
      semester: Number(year) * 2,
      section,
      cgpa: Number(cgpa),
      attendance: Number(attendance),
      mentorName: 'Dr. Meenakshi Sharma',
      status: Number(attendance) < 75 ? 'Defaulter' : 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'
    });

    setShowAddModal(false);
    setName('');
    setRollNo('');
    setEmail('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStudent(editingStudent.id, {
      name: editingStudent.name,
      cgpa: Number(editingStudent.cgpa),
      attendance: Number(editingStudent.attendance),
      status: Number(editingStudent.attendance) < 75 ? 'Defaulter' : 'Active'
    });
    setEditingStudent(null);
  };

  const columns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Student Name',
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-2.5">
          <img src={s.avatar} alt={s.name} className="h-7 w-7 rounded-full object-cover" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">{s.name}</span>
            <span className="text-[10px] text-slate-400">{s.email}</span>
          </div>
        </div>
      )
    },
    {
      key: 'rollNo',
      header: 'Roll Number',
      sortable: true,
      render: (s) => <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{s.rollNo}</span>
    },
    {
      key: 'department',
      header: 'Department & Sec',
      sortable: true,
      render: (s) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">{s.department.split(' ')[0]}</span>
          <span className="text-[10px] text-slate-400">Year {s.year} • {s.section}</span>
        </div>
      )
    },
    {
      key: 'attendance',
      header: 'Attendance %',
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-1.5 rounded-full bg-slate-200 overflow-hidden dark:bg-slate-700">
            <div
              className={`h-full ${s.attendance >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${s.attendance}%` }}
            />
          </div>
          <span className={`font-bold text-xs ${s.attendance >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {s.attendance}%
          </span>
        </div>
      )
    },
    {
      key: 'cgpa',
      header: 'CGPA',
      sortable: true,
      render: (s) => <span className="font-bold text-slate-800 dark:text-slate-200">{s.cgpa}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (s) => (
        <Badge variant={s.status === 'Active' ? 'success' : s.status === 'Defaulter' ? 'danger' : 'info'} size="sm">
          {s.status}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      render: (s) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setEditingStudent(s)}
            className="p-1 rounded text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => deleteStudent(s.id)}
            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Student Information & Registry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage student records, sections, attendance alerts, and academic progress
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          <span>Register New Student</span>
        </button>
      </div>

      {/* Table with filtering */}
      <DataTable
        data={filteredStudents}
        columns={columns}
        searchPlaceholder="Search students by name, roll number, or email..."
        searchFields={['name', 'rollNo', 'email', 'section']}
        exportFileName="abes_students_registry"
        filterSlot={
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

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Defaulter">Defaulter (&lt;75%)</option>
            </select>
          </div>
        }
      />

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Student Record"
        description="Fill in candidate details to enroll in department section roster."
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Student Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">University Roll No</label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="2200320100..."
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
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Section</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="CSE-3B"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Initial Attendance %</label>
              <input
                type="number"
                value={attendance}
                onChange={(e) => setAttendance(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                max={100}
                min={0}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Current CGPA</label>
              <input
                type="number"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                max={10}
                min={0}
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
              Save Student
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      {editingStudent && (
        <Modal
          isOpen={true}
          onClose={() => setEditingStudent(null)}
          title={`Edit Student: ${editingStudent.name}`}
          description={`Roll No: ${editingStudent.rollNo} • ${editingStudent.section}`}
        >
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Student Name</label>
              <input
                type="text"
                value={editingStudent.name}
                onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Attendance %</label>
                <input
                  type="number"
                  value={editingStudent.attendance}
                  onChange={(e) => setEditingStudent({ ...editingStudent, attendance: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  max={100}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingStudent.cgpa}
                  onChange={(e) => setEditingStudent({ ...editingStudent, cgpa: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  max={10}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700"
              >
                Update Record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
