import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/common/Modal';
import { ComplaintTicket } from '../../types';

export const ComplaintsHelpdeskPage: React.FC = () => {
  const { complaints, addComplaint, updateComplaintStatus } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Infrastructure' | 'Lab Equipment' | 'Hostel' | 'Academic' | 'Library'>('Infrastructure');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [description, setDescription] = useState('');

  const filteredTickets = complaints.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesCat && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addComplaint({
      category,
      title,
      description,
      submittedBy: 'Varun Gupta',
      submittedRole: 'student',
      department: 'Computer Science & Engineering',
      priority
    });

    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  const advanceStatus = (ticket: ComplaintTicket) => {
    if (ticket.status === 'Open') {
      updateComplaintStatus(ticket.id, 'In Progress', 'Assigned technician for on-site inspection.');
    } else if (ticket.status === 'In Progress') {
      updateComplaintStatus(ticket.id, 'Resolved', 'Issue resolved and verified by department coordinator.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Campus Helpdesk & Grievance Resolution
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit infrastructure, lab equipment, and academic maintenance service requests
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          <span>Lodge Service Ticket</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-[#111928]">
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="All">All Categories</option>
            <option value="Infrastructure">Infrastructure & Classroom</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Hostel">Hostel & Campus Wi-Fi</option>
            <option value="Academic">Academic Grievance</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing <strong>{filteredTickets.length}</strong> service tickets
        </span>
      </div>

      {/* Tickets Grid */}
      <div className="space-y-3">
        {filteredTickets.map((t) => (
          <div
            key={t.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-[#111928] gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-brand-600">{t.ticketNo}</span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {t.category}
                </span>
                <span className={`rounded-full px-2 py-0.2 text-[9px] font-bold ${
                  t.priority === 'High' || t.priority === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  Priority: {t.priority}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {t.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {t.description}
              </p>

              {t.resolutionNotes && (
                <div className="mt-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
                  Resolution: {t.resolutionNotes}
                </div>
              )}

              <div className="text-[10px] text-slate-400 pt-1">
                Raised by: {t.submittedBy} ({t.department}) • Date: {t.date}
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : t.status === 'In Progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                {t.status}
              </span>

              {t.status !== 'Resolved' && (
                <button
                  onClick={() => advanceStatus(t)}
                  className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-700 shadow-xs"
                >
                  {t.status === 'Open' ? 'Mark In Progress' : 'Resolve Ticket'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lodge Ticket Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Lodge Campus Helpdesk Ticket"
        description="Detail equipment failure, maintenance request, or hostel grievance."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Issue Subject</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken bench in Room B-302"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Lab Equipment">Lab Equipment</option>
                <option value="Hostel">Hostel & Wi-Fi</option>
                <option value="Academic">Academic</option>
                <option value="Library">Library</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical (Immediate Hazard)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Detailed Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Specify room number, system ID, and exact symptom..."
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
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
              Submit Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
