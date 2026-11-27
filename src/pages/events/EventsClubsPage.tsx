import React, { useState } from 'react';
import {
  PartyPopper,
  Calendar,
  MapPin,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Filter,
  Flame,
  Code,
  Palette,
  Mic,
  Cpu,
  Drama
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const EventsClubsPage: React.FC = () => {
  const { events, registerForEvent } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [registeredIds, setRegisteredIds] = useState<Record<string, boolean>>({});

  const realClubs = [
    {
      name: 'Club Minerva',
      category: 'Coding & Algorithms',
      icon: Code,
      color: 'text-brand-600 bg-brand-50 dark:bg-brand-950/60 dark:text-brand-300',
      desc: 'Official technical coding club organizing weekly LeetCode/Codeforces sprints, web hackathons, and Google Summer of Code mentorship.'
    },
    {
      name: 'Kalakrit',
      category: 'Fine Arts & Design',
      icon: Palette,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300',
      desc: 'Creative society responsible for campus stage art, UI/UX graphic design, GENERO fest branding, and digital illustration workshops.'
    },
    {
      name: 'Samvaad',
      category: 'Literary & Debating',
      icon: Mic,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300',
      desc: 'Premier literary and parliamentary debating society hosting youth parliaments, Model UNs, and GD preparation for corporate placements.'
    },
    {
      name: 'Club GenX',
      category: 'Robotics & Hardware IoT',
      icon: Cpu,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300',
      desc: 'Hands-on hardware lab for autonomous drone development, combat robot fabrication (RoboWars), and embedded microcontroller IoT.'
    },
    {
      name: 'Manthan',
      category: 'Theatrics & Street Play',
      icon: Drama,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300',
      desc: 'Award-winning Nukkad Natak (street play) and dramatic society representing ABES Engineering College at IIT Kanpur and Delhi University.'
    },
    {
      name: 'ACM & CSI ABESEC Chapters',
      category: 'Global Tech Chapters',
      icon: Sparkles,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300',
      desc: 'Student branches of the Association for Computing Machinery and Computer Society of India connecting students with global conferences.'
    }
  ];

  const filteredEvents = events.filter(
    (e) => selectedCategory === 'All' || e.category === selectedCategory
  );

  const handleRegister = (id: string) => {
    registerForEvent(id);
    setRegisteredIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            ABES Events, Fests & Student Clubs Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            GENERO Annual Fest, Smart India Hackathons, and active collegiate chapters (Minerva, Kalakrit, Samvaad, GenX)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Cultural', 'Hackathon', 'Technical'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Cards with Real Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((ev) => {
          const isRegistered = registeredIds[ev.id];
          return (
            <div
              key={ev.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card dark:border-slate-800 dark:bg-[#111928]"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={ev.banner}
                  alt={ev.title}
                  className="h-full w-full object-cover opacity-85 hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold text-white shadow">
                  {ev.category}
                </span>
                <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white">
                  {ev.status}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-brand-600 dark:text-brand-400">
                    Organizer: {ev.organizer}
                  </div>
                  <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                    {ev.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{ev.date} ({ev.time})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{ev.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs dark:border-slate-800">
                  <span className="font-semibold text-slate-500">
                    {ev.registeredCount} Participants Registered
                  </span>

                  {isRegistered ? (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>RSVP Confirmed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRegister(ev.id)}
                      className="rounded-lg bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-brand-700 shadow-xs"
                    >
                      Join Event
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official ABES Student Clubs Directory */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Official ABES Engineering College Student Societies & Clubs
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Registered student organizations approved under the Office of Dean Student Welfare
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {realClubs.map((club, idx) => {
            const Icon = club.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${club.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{club.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{club.category}</span>
                  </div>
                </div>
                <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {club.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
