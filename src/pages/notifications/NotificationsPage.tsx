import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Calendar,
  Award,
  Trash2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const NotificationsPage: React.FC = () => {
  const { approvals } = useData();
  const [cleared, setCleared] = useState(false);

  const list = cleared ? [] : [
    { id: 1, title: 'Defaulter Warning Issued: 75% Attendance Check', desc: 'AKTU attendance audit finalized by Dean Academics. 64 students flagged.', time: '10 mins ago', type: 'warning' },
    { id: 2, title: 'New Leave Request Submitted for Approval', desc: 'Dr. Meenakshi Sharma applied for duty leave for IEEE conference at IIT Roorkee.', time: '45 mins ago', type: 'info' },
    { id: 3, title: 'Placement Drive Scheduled: Amazon AWS SDE-1', desc: 'Eligible 3rd & 4th year candidates with CGPA >= 8.0 must verify registration.', time: '2 hours ago', type: 'success' },
    { id: 4, title: 'Assignment Due Date Reminder: Web Technology REST API', desc: 'Submission deadline closes on 28th Nov 2026. 58 / 65 students submitted.', time: '4 hours ago', type: 'default' },
    { id: 5, title: 'Annual AI Lab Budget Approved by Director', desc: '₹12.5 Lakhs allocated for 4x NVIDIA RTX 4090 GPU hardware expansion.', time: 'Yesterday', type: 'success' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Notifications & Institutional Broadcast Centre
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            System logs, approval updates, urgent alerts, and deadline reminders
          </p>
        </div>

        <button
          onClick={() => setCleared(true)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear All Notifications</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="space-y-3">
          {list.length > 0 ? (
            list.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50/70 transition-colors dark:border-slate-800 dark:hover:bg-slate-800/40"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${
                    item.type === 'warning' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' : item.type === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                  }`}>
                    {item.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 ml-4">{item.time}</span>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              You are all caught up! No unread notifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
