import React, { useState } from 'react';
import {
  FileCheck,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Filter,
  UserCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/common/Modal';

export const LeaveApprovalPage: React.FC = () => {
  const { approvals, addApprovalRequest, updateApprovalStatus } = useData();
  const { user, role } = useAuth();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Form states
  const [type, setType] = useState<'Student Leave' | 'Faculty Leave' | 'Budget Approval' | 'Event Permission' | 'OD / Duty Leave'>('Student Leave');
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [dates, setDates] = useState('');

  const filteredApprovals = approvals.filter(
    (a) => selectedStatusFilter === 'All' || a.status === selectedStatusFilter
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reason) return;

    addApprovalRequest({
      type,
      applicantName: user?.name || 'Applicant',
      applicantRole: role,
      department: user?.department || 'Computer Science & Engineering',
      title,
      reason,
      dates: dates || 'Next 2 Days',
      remarks: 'Submitted for mentor / HOD review'
    });

    setShowApplyModal(false);
    setTitle('');
    setReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Digital Workflow & Approval Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit leave applications, event permissions, budget sanctions, and review pending approval queues
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          <span>Submit Approval Request</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatusFilter(status)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              selectedStatusFilter === status
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Approvals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredApprovals.map((req) => (
          <div
            key={req.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="rounded bg-brand-50 border border-brand-200 px-2.5 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300">
                  {req.type}
                </span>

                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : req.status === 'Rejected' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {req.status}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                {req.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {req.reason}
              </p>

              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/50 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Applicant:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{req.applicantName} ({req.applicantRole})</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Department:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{req.department}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Duration / Schedule:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{req.dates}</span>
                </div>
                {req.approvedBy && (
                  <div className="flex justify-between text-slate-500">
                    <span>Authorized Reviewer:</span>
                    <span className="font-bold text-emerald-600">{req.approvedBy}</span>
                  </div>
                )}
                {req.remarks && (
                  <div className="text-[11px] text-slate-500 pt-1 italic">
                    Note: "{req.remarks}"
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Action Buttons if Pending */}
            {req.status === 'Pending' && (
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 dark:border-slate-800">
                <button
                  onClick={() => updateApprovalStatus(req.id, 'Rejected', 'Reason deemed insufficient', user?.name)}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:bg-slate-800"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => updateApprovalStatus(req.id, 'Approved', 'Cleared and verified', user?.name)}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Authorize & Approve</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Apply Leave / Request Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Submit Digital Approval Request"
        description="Choose request type and provide supporting justification."
      >
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Request Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="Student Leave">Student Medical / Casual Leave</option>
              <option value="Faculty Leave">Faculty Earned / Duty Leave (OD)</option>
              <option value="Event Permission">Club / Hackathon Event Permission</option>
              <option value="Budget Approval">Department Infrastructure / Lab Budget</option>
              <option value="OD / Duty Leave">Official Duty (OD) Conference Attendance</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Application Subject</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Leave for National Hackathon Participation"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Dates / Duration</label>
            <input
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="e.g. 28 Nov 2026 - 30 Nov 2026 (3 Days)"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Reason & Justification</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Explain the background and attached documentation..."
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowApplyModal(false)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white hover:bg-brand-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
