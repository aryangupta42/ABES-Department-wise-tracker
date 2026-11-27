import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Pin,
  Calendar,
  Download,
  AlertTriangle,
  FileText,
  Search
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Modal } from '../../components/common/Modal';

export const NoticesAnnouncementsPage: React.FC = () => {
  const { notices, addNotice } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Urgent' | 'Academic' | 'Examination' | 'Placement' | 'General'>('Academic');
  const [targetAudience, setTargetAudience] = useState<'All' | 'Students' | 'Faculty' | 'HODs'>('All');
  const [publishedBy, setPublishedBy] = useState('Office of the Dean Academics');
  const [content, setContent] = useState('');

  const filteredNotices = notices.filter((n) => {
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addNotice({
      title,
      category,
      targetAudience,
      publishedBy,
      content,
      isPinned: category === 'Urgent'
    });

    setShowAddModal(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Institutional Notices & Official Circulars
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authoritative notifications from Director, Registrar, and Dean Academic Offices
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          <span>Publish Official Notice</span>
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
            placeholder="Search notices by keyword or reference..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Urgent', 'Academic', 'Examination', 'Placement'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            className={`rounded-2xl border p-5 shadow-card transition-all ${
              n.category === 'Urgent'
                ? 'border-rose-300 bg-rose-50/30 dark:border-rose-900/50 dark:bg-rose-950/20'
                : 'border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#111928]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                {n.isPinned && (
                  <span className="flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    <Pin className="h-3 w-3" /> PINNED
                  </span>
                )}
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  n.category === 'Urgent' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                }`}>
                  {n.category}
                </span>
                <span className="text-xs text-slate-400">Audience: <strong>{n.targetAudience}</strong></span>
              </div>

              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{n.date}</span>
              </span>
            </div>

            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
              {n.title}
            </h3>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {n.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs dark:border-slate-800">
              <span className="text-slate-400 font-medium">Issued By: {n.publishedBy}</span>

              {n.attachmentName && (
                <button
                  onClick={() => alert(`Downloading ${n.attachmentName}`)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 font-semibold text-[11px]"
                >
                  <Download className="h-3 w-3" />
                  <span>{n.attachmentName}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Publish Notice Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Publish Official College Circular"
        description="Notify departments, faculty members, or students of institutional policies."
      >
        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Circular Subject / Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule for AKTU Practical Lab Assessments"
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
                <option value="Urgent">Urgent Warning</option>
                <option value="Academic">Academic Notice</option>
                <option value="Examination">Examination Schedule</option>
                <option value="Placement">Placement Notice</option>
                <option value="General">General Announcement</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="All">All Campus</option>
                <option value="Students">Students Only</option>
                <option value="Faculty">Faculty Members</option>
                <option value="HODs">HODs & Leadership</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Full Circular Text</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="State the directive, deadlines, and contact offices..."
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
              Broadcast Circular
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
