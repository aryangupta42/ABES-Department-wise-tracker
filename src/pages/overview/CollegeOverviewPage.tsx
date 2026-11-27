import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  HeartPulse,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Maximize2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { StatsCard } from '../../components/common/StatsCard';
import { useData } from '../../context/DataContext';
import { ABES_REAL_ASSETS } from '../../data/mockData';
import { Modal } from '../../components/common/Modal';

export const CollegeOverviewPage: React.FC = () => {
  const { departments, students, faculty } = useData();
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<{ title: string; image: string; desc: string } | null>(null);

  const totalStudents = departments.reduce((acc, d) => acc + d.studentCount, 0);
  const totalFaculty = departments.reduce((acc, d) => acc + d.facultyCount, 0);

  const realCampusPhotos = [
    {
      title: 'Main Aryabhatta Academic Block',
      category: 'Academic Core',
      image: ABES_REAL_ASSETS.mainBuilding,
      desc: 'The iconic central academic building and landscaped front lawn housing smart classrooms, directorate, and central lecture halls.'
    },
    {
      title: 'Aerial View of 15.7-Acre Campus',
      category: 'Campus Panorama',
      image: ABES_REAL_ASSETS.aerialView,
      desc: 'Bird’s-eye perspective of ABES Engineering College located on NH-09 (NH-24), Ghaziabad showcasing academic blocks and open sports zones.'
    },
    {
      title: 'International Standard Cricket Stadium',
      category: 'Sports & Athletics',
      image: ABES_REAL_ASSETS.cricketStadium,
      desc: 'Floodlit cricket ground, athletic track, and sports pavilion hosting inter-university AKTU tournaments and GENERO annual fest concerts.'
    },
    {
      title: 'Academic & Laboratory Quadrangles',
      category: 'Infrastructure',
      image: ABES_REAL_ASSETS.campus03,
      desc: 'Interconnected academic wings featuring Kalpana Chawla Computing Center, Bhabha Block, and research incubation hubs.'
    }
  ];

  const placementTrend = [
    { year: '2022', placed: 84, avgPackage: 5.8, highest: 22.0 },
    { year: '2023', placed: 88, avgPackage: 6.4, highest: 27.5 },
    { year: '2024', placed: 91, avgPackage: 7.1, highest: 31.0 },
    { year: '2025', placed: 93, avgPackage: 7.8, highest: 33.5 },
    { year: '2026 (Ongoing)', placed: 94.8, avgPackage: 8.45, highest: 34.0 }
  ];

  return (
    <div className="space-y-6">
      {/* College Real Hero Banner with Real Photo Background */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl min-h-[260px] flex flex-col justify-end p-6 sm:p-8 text-white border border-white/10">
        <img
          src={ABES_REAL_ASSETS.mainBuilding}
          alt="ABES Engineering College Campus"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.38] contrast-[1.1]"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-500/80 backdrop-blur-md px-3 py-0.5 text-[11px] font-bold text-white shadow">
                AKTU College Code: {ABES_REAL_ASSETS.aktuCode}
              </span>
              <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-0.5 text-[11px] font-bold text-white">
                NAAC 'A' Grade • NBA Tier-1 Accredited
              </span>
              <span className="text-xs text-slate-200">Estd. {ABES_REAL_ASSETS.established}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              ABES Engineering College
            </h1>

            <p className="text-xs text-slate-200 flex items-center gap-1.5 max-w-2xl drop-shadow">
              <MapPin className="h-4 w-4 text-brand-400 shrink-0" />
              <span>{ABES_REAL_ASSETS.address}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/departments')}
              className="rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-600/40 hover:bg-brand-700 transition-all"
            >
              Explore 6 Engineering Departments
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total B.Tech Intake"
          value={totalStudents.toLocaleString()}
          subtitle="Across B.Tech Years 1-4"
          icon={GraduationCap}
          color="brand"
        />
        <StatsCard
          title="Core Faculty"
          value={totalFaculty}
          subtitle="Student ratio 1:16 (AICTE Compliant)"
          icon={Users}
          color="indigo"
        />
        <StatsCard
          title="Placement Rate"
          value="94.8%"
          subtitle="Highest ₹34.0 LPA (Adobe)"
          icon={Award}
          color="emerald"
        />
        <StatsCard
          title="Institutional Health"
          value="93 / 100"
          subtitle="NBA Quality Grade A+"
          icon={HeartPulse}
          color="amber"
        />
      </div>

      {/* REAL CAMPUS INFRASTRUCTURE GALLERY */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-[#111928]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                ABES Campus Infrastructure & Photo Gallery
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Photographs of ABES Engineering College campus facilities, academic blocks, and stadiums
            </p>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            {ABES_REAL_ASSETS.campusArea}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {realCampusPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:shadow-lg hover:border-brand-400 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-full bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white">
                  {photo.category}
                </span>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="rounded-lg bg-white/90 p-1.5 text-slate-800 shadow">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="p-3">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {photo.title}
                </h4>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Trend & Academic Standing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                5-Year Campus Placement Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Placement conversion percentage & highest CTC trend
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600">Peak ₹34 LPA (Adobe)</span>
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placementTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="placed" name="Placement %" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="highest" name="Highest CTC (LPA)" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accreditations & Key Campus Blocks */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-[#111928]">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            ABES Campus Blocks & Centers
          </h3>
          <div className="mt-4 space-y-3">
            {[
              { name: 'Aryabhatta Block', role: 'Main Administrative Hub, Directorate & Classrooms' },
              { name: 'Bhabha Block', role: 'Central Auditorium, Dean Offices & Seminar Complex' },
              { name: 'Kalpana Chawla Block', role: 'CSE & IT Departments, HP Center of Excellence' },
              { name: 'Ramanujan Block', role: 'Applied Sciences & First Year Engineering' },
              { name: 'Dr. APJ Abdul Kalam Library', role: 'Fully automated Central Digital Library' },
              { name: 'Hostels & Sports Arena', role: 'Dayanand & Raman Hostels, Floodlit Cricket Stadium' }
            ].map((block, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{block.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{block.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPhoto(null)}
          title={selectedPhoto.title}
          description={selectedPhoto.desc}
          maxWidth="2xl"
        >
          <div className="overflow-hidden rounded-xl">
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[65vh] object-cover rounded-xl"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
