import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_TIMETABLE } from '../../data/mockData';
import { TimetableSlot } from '../../types';

export const TimetableManagementPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedSection, setSelectedSection] = useState<string>('CSE-3B');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const slotsForDay = INITIAL_TIMETABLE.filter(
    (t) => t.day === selectedDay && (selectedSection === 'All' || t.section === selectedSection)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Class Timetable & Lecture Hall Schedules
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive weekly timetable mapping sections, lecture theaters, and lab allocations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="CSE-3B">Section: CSE-3B (3rd Year)</option>
            <option value="CSE-3A">Section: CSE-3A (3rd Year)</option>
            <option value="IT-4A">Section: IT-4A (Final Year)</option>
          </select>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 scrollbar-none">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              selectedDay === d
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Slots for Selected Day */}
      <div className="space-y-3">
        {slotsForDay.length > 0 ? (
          slotsForDay.map((slot) => (
            <div
              key={slot.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-[#111928] gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="flex h-12 w-28 flex-col items-center justify-center rounded-xl bg-brand-50 border border-brand-100 p-1 text-center dark:bg-brand-950 dark:border-brand-900">
                  <Clock className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                  <span className="text-[11px] font-black text-brand-900 dark:text-brand-200 mt-0.5">
                    {slot.time}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {slot.subjectCode}
                    </span>
                    <span className={`rounded-full px-2 py-0.2 text-[9px] font-black ${
                      slot.type === 'Lab' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {slot.type.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                    {slot.subjectName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Faculty: <strong>{slot.facultyName}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end text-xs">
                <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-brand-600" />
                  <span>{slot.room}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-400 dark:border-slate-800 dark:bg-[#111928]">
            No formal theory lectures scheduled for {selectedDay}. Dedicated for project lab tutorials and industrial club workshops.
          </div>
        )}
      </div>
    </div>
  );
};
