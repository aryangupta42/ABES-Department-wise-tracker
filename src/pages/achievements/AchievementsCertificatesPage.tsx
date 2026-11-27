import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { INITIAL_ACHIEVEMENTS } from '../../data/mockData';
import { Modal } from '../../components/common/Modal';

export const AchievementsCertificatesPage: React.FC = () => {
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Achievements & Institutional Accolades
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Patents granted, international conference presentations, national hackathon podiums, and NBA accolades
          </p>
        </div>
      </div>

      {/* Accolades Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card hover:shadow-md transition-all dark:border-slate-800 dark:bg-[#111928]"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:border-amber-900 dark:text-amber-300">
                  {ach.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{ach.year}</span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                {ach.title}
              </h3>

              <div className="mt-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                Awarded To: {ach.recipientName}
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {ach.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs dark:border-slate-800">
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified by Research Cell</span>
              </span>

              <button
                onClick={() => setSelectedCert(ach)}
                className="font-bold text-brand-600 hover:underline flex items-center gap-1"
              >
                <span>View Certificate</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCert(null)}
          title="Official Certificate of Achievement"
          description={`ABES Institutional Recognition • Ref #${selectedCert.id}`}
        >
          <div className="rounded-2xl border-4 border-double border-amber-400 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 p-8 text-center text-slate-900 dark:bg-slate-900 dark:text-white dark:border-amber-600">
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white font-extrabold text-lg shadow-md">
                ABES
              </div>
            </div>
            <h2 className="mt-4 font-serif text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              ABES Engineering College
            </h2>
            <p className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Office of Academic Excellence & Research Affairs
            </p>

            <div className="mt-6 border-t border-b border-amber-300 py-4 dark:border-amber-700">
              <p className="text-xs italic text-slate-600 dark:text-slate-300">This certificate is proudly conferred upon</p>
              <h3 className="mt-2 text-lg font-black text-brand-700 dark:text-brand-300">
                {selectedCert.recipientName}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                In recognition of outstanding performance in <strong>"{selectedCert.title}"</strong>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="text-left">
                <span className="block font-bold text-slate-800 dark:text-slate-200">Prof. (Dr.) Sanjay Kumar</span>
                <span className="text-[10px]">Head of Department</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-amber-500 font-bold text-[9px] uppercase text-amber-700">
                SEAL
              </div>
              <div className="text-right">
                <span className="block font-bold text-slate-800 dark:text-slate-200">Dr. V. K. Aggarwal</span>
                <span className="text-[10px]">Director & Dean</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
