# 🏛️ ABES Department Tracker | ABESEC Ghaziabad

> **A Centralized Academic & Department Monitoring SaaS Platform for ABES Engineering College (AKTU Code: 032)**

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://abes-department-wise-tracker.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aryangupta42/ABES-Department-wise-tracker)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🌐 Live Deployment Link

- **Render Live URL:** [https://abes-department-wise-tracker.onrender.com](https://abes-department-wise-tracker.onrender.com)
- **GitHub Repository:** [https://github.com/aryangupta42/ABES-Department-wise-tracker.git](https://github.com/aryangupta42/ABES-Department-wise-tracker.git)

---

## 👥 Full Stack Development Team & Project Details

| Role | Details |
| :--- | :--- |
| **Team Member 1** | **Aryan Gupta** |
| **Team Member 2** | **Arsh Mittal** |
| **Branch** | **Computer Science & Engineering (CSE)** |
| **Section** | **CSE 15** |
| **Institution** | **ABES Engineering College (ABESEC), Ghaziabad** |
| **Team Title** | **Full Stack Development Team** |
| **Copyright** | **© 2026 ABESEC Ghaziabad. All Rights Reserved.** |

---

## 🔐 User Login Credentials (All Roles)

Use any of the demo accounts below or click the **Instant Demo Access** cards on the login page:

### 1. 🛡️ Super Admin (Director / Central Administration)
- **Username / Email:** `director@abes.ac.in` *(or `admin@abes.ac.in`)*
- **Password:** `abes@demo2026`
- **Role:** Director / Super Admin
- **Features:** Complete campus analytics, multi-department health score radar, AI lab approvals, college-wide notifications, placement statistics.

### 2. 👨‍🏫 Head of Department (HOD)
- **Username / Email:** `hod.cse@abes.ac.in`
- **Password:** `abes@demo2026`
- **Role:** HOD (Computer Science & Engineering)
- **Features:** Department overview, faculty weekly workload distribution, student attendance spread, syllabus completion bars, low-attendance alerts.

### 3. 👩‍🏫 Faculty Member
- **Username / Email:** `faculty.sharma@abes.ac.in`
- **Password:** `abes@demo2026`
- **Role:** Faculty (Associate Professor, CSE)
- **Features:** Class timetable, live lecture attendance logger, assignment grading, student mentorship roster, duty leave requests.

### 4. 🎓 Student
- **Username / Email:** `student.varun@abes.ac.in`
- **Password:** `abes@demo2026`
- **Role:** Student (B.Tech CSE, 3rd Year, Roll: `2200320100145`)
- **Features:** Real-time attendance buffer (+12.5% safe margin), semester SGPA transcripts, assignment submission modal, corporate placement drives, helpdesk ticketing.

---

## 🚀 Key Modules & Application Features

1. **Role-Based Portals:** Tailored interfaces for Super Admin, HOD, Faculty, and Students with persistent sessions via `localStorage`.
2. **Instant Role Switcher:** One-click role switching pill in the top navigation bar for seamless evaluation.
3. **Department Health Score Index:** Algorithmic scoring factoring 40% Attendance + 40% Placement Conversion + 20% Student-Faculty Ratio.
4. **Live Lecture Attendance Logger:** Mark Present (P) or Absent (A) with one click; automated SMS warning alerts for parents of students below the mandatory AKTU 75% threshold.
5. **Interactive SGPA Calculator:** Goal simulator projecting target semester grades and credit schemes.
6. **Assignments & Practical Submissions:** Full lifecycle from publishing assignments with rubrics to student file/repo uploads and grading.
7. **T&P Placement Hub:** Campus recruitment drives (Adobe ₹34 LPA, Amazon AWS ₹28.5 LPA, TCS Prime, Zscaler) with eligibility checks.
8. **Digital Workflow & Approvals:** Complete request and authorization pipeline for medical leaves, duty leaves (OD), budget sanctions, and fests.
9. **ABES Campus AI Assistant:** Simulated conversational chatbot answering queries on attendance rules, department heads, hackathons, and policies.
10. **Global Command Palette:** <kbd>Ctrl</kbd> + <kbd>K</kbd> instant search across students, faculty, departments, and circulars.
11. **Real ABESEC Assets:** High-resolution photographs of Aryabhatta Block, Aerial Campus Panorama, and Cricket Stadium from Wikimedia Commons.
12. **Theme Switcher:** Dark & Light modes with Tailwind CSS design system.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 + TypeScript
- **Bundler & Build Tool:** Vite 6
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 3.4 with custom typography and color system
- **Charts & Data Visualization:** Recharts
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State Persistence:** Context API + Browser `localStorage`

---

## 📦 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryangupta42/ABES-Department-wise-tracker.git
   cd ABES-Department-wise-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## ☁️ Deployment Instructions (Render)

To deploy as a **Static Site** on Render:

1. Link your GitHub repository: `https://github.com/aryangupta42/ABES-Department-wise-tracker.git`
2. Configure settings:
   - **Name:** `abes-department-wise-tracker`
   - **Branch:** `main` (or `master`)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. Add a Rewrite Rule in Render for Single Page Applications:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`
4. Click **Deploy Web Service**.

---

## 📜 Academic Affiliation & Information

- **Institution:** ABES Engineering College, Ghaziabad
- **Affiliated to:** Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow
- **AKTU College Code:** 032
- **Accreditation:** NAAC 'A' Grade, NBA Tier-1 Accredited B.Tech Programs
- **Address:** 19th KM Stone, NH-09 (formerly NH-24), Vijay Nagar, Ghaziabad, Uttar Pradesh 201009

---

**Developed & Maintained By:** Team Member 1: Aryan Gupta | Team Member 2: Arsh Mittal | Branch: CSE, Section: CSE 15  
**Full Stack Development Team**  
**© 2026 ABESEC Ghaziabad. All Rights Reserved.**
