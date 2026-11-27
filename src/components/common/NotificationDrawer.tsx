import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  X,
  AlertTriangle,
  FileCheck,
  Calendar,
  Award,
  CheckCheck,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { cn } from '../../utils/cn';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { notices, approvals, assignments } = useData();

  if (!isOpen) return null;

  const handleAction = (path: string) => {
    navigate(path);
    onClose();
  };

  const notificationItems = [
    {
      id: 'notif-1',
      title: '75% Attendance Defaulter Warning',
      desc: 'Dean Academics circular released. 64 students flagged below threshold.',
      time: '10m ago',
      type: 'warning',
      icon: AlertTriangle,
      link: '/attendance'
    },
    {
      id: 'notif-2',
      title: 'New Pending Leave & Duty Approvals',
      desc: `${approvals.filter((a) => a.status === 'Pending').length} requests pending your review in digital approval queue.`,
      time: '45m ago',
      type: 'info',
      icon: FileCheck,
      link: '/leaves'
    },
    {
      id: 'notif-3',
      title: 'Assignment Due Date in 48 Hours',
      desc: 'Web Technology REST API microservice submission closes on 28th Nov.',
      time: '2h ago',
      type: 'default',
      icon: Calendar,
      link: '/assignments'
    },
    {
      id: 'notif-4',
      title: 'Campus Placement Drive: Adobe & Amazon',
      desc: 'Shortlisting registrations initiated for eligible 3rd & 4th year candidates.',
      time: '5h ago',
      type: 'success',
      icon: Award,
      link: '/placements'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl dark:bg-[#111928] dark:border-l dark:border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Notifications & Alerts
            </h3>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600 dark:bg-brand-950 dark:text-brand-400">
              {notificationItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notificationItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleAction(item.link)}
                className="group flex cursor-pointer gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50 transition-colors dark:border-slate-800/80 dark:hover:bg-slate-800/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 leading-relaxed dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
          <button
            onClick={() => handleAction('/notifications')}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <span>View All Notifications</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
