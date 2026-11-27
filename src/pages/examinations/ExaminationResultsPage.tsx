import React, { useState } from 'react';
import {
  FileCheck2,
  GraduationCap,
  Award,
  Download,
  Calendar,
  CheckCircle2,
  Calculator
} from 'lucide-react';
import { INITIAL_EXAMS } from '../../data/mockData';
import { ExamResult } from '../../types';

export const ExaminationResultsPage: React.FC = () => {
  const [exams, setExams] = useState<ExamResult[]>(INITIAL_EXAMS);
  const [selectedExam, setSelectedExam] = useState<ExamResult>(INITIAL_EXAMS[0]);

  // CGPA Calculator simulation state
  const [calcCredits, setCalcCredits] = useState<number[]>([4, 4, 4, 3, 3]);
  const [calcGrades, setCalcGrades] = useState<number[]>([9, 10, 9, 8, 8]);

  const simulatedSGPA = (
    calcCredits.reduce((acc, c, idx) => acc + c * (calcGrades[idx] || 0), 0) /
    (calcCredits.reduce((acc, c) => acc + c, 0) || 1)
  ).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Examination Portal & Result Transcripts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official AKTU & Sessional result cards, SGPA transcript sheets, and grade distribution
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <Download className="h-4 w-4" />
          <span>Print Grade Sheet</span>
        </button>
      </div>

      {/* Main Grade Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-brand-50 border border-brand-200 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300">
                {selectedExam.examType}
              </span>
              <span className="text-xs text-slate-400">{selectedExam.academicYear}</span>
            </div>
            <h2 className="mt-1 text-lg font-black text-slate-900 dark:text-white">
              Candidate: {selectedExam.studentName}
            </h2>
            <p className="text-xs text-slate-500">
              Roll No: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{selectedExam.studentRollNo}</span> • {selectedExam.department} (Sem {selectedExam.semester})
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 dark:bg-slate-900/60 dark:border-slate-800">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Semester SGPA</span>
              <div className="text-2xl font-black text-brand-600 dark:text-brand-400">{selectedExam.sgpa}</div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Score</span>
              <div className="text-2xl font-black text-emerald-600">{selectedExam.percentage}%</div>
            </div>
          </div>
        </div>

        {/* Subjects Score Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 dark:bg-slate-900 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4">Max Marks</th>
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {selectedExam.subjects.map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-brand-600">{sub.code}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{sub.name}</td>
                  <td className="py-3 px-4">{sub.maxMarks}</td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">{sub.obtainedMarks}</td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-brand-50 border border-brand-200 px-2 py-0.5 text-xs font-black text-brand-700 dark:bg-brand-950 dark:border-brand-800 dark:text-brand-300">
                      {sub.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600">PASSED</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive SGPA / CGPA Target Calculator */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Calculator className="h-4 w-4 text-brand-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Interactive AKTU SGPA Calculator & Goal Simulator
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Simulate expected letter grade points (O=10, A+=9, A=8, B+=7) to project your target 6th semester SGPA
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-3">
          {calcGrades.map((g, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Course {idx + 1} ({calcCredits[idx]} Credits)</span>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-semibold">Grade Point:</span>
                <select
                  value={g}
                  onChange={(e) => {
                    const newGrades = [...calcGrades];
                    newGrades[idx] = Number(e.target.value);
                    setCalcGrades(newGrades);
                  }}
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value={10}>10 (O - Outstanding)</option>
                  <option value={9}>9 (A+ - Excellent)</option>
                  <option value={8}>8 (A - Very Good)</option>
                  <option value={7}>7 (B+ - Good)</option>
                  <option value={6}>6 (B - Above Avg)</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <span className="text-xs text-slate-500">
            Total Credits Count: <strong>{calcCredits.reduce((a, b) => a + b, 0)} Credits</strong>
          </span>
          <div className="text-right">
            <span className="text-xs text-slate-400">Simulated Target SGPA: </span>
            <span className="text-lg font-black text-brand-600 dark:text-brand-400">{simulatedSGPA}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
