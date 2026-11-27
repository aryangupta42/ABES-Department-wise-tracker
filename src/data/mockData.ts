import {
  User,
  Department,
  Student,
  Faculty,
  Subject,
  AttendanceRecord,
  Assignment,
  ExamResult,
  TimetableSlot,
  PlacementDrive,
  CollegeEvent,
  Notice,
  ApprovalRequest,
  ComplaintTicket,
  AchievementItem,
  ActivityTimelineItem
} from '../types';

export const ABES_REAL_ASSETS = {
  logo: 'https://cdn.brandfetch.io/iddpYyLAiA/w/1500/h/500/idDTLMBS8L.jpeg',
  mainBuilding: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/ABES_Main_Building.jpg',
  aerialView: 'https://upload.wikimedia.org/wikipedia/commons/7/79/ABES_Engineering_College_10.jpg',
  cricketStadium: 'https://upload.wikimedia.org/wikipedia/commons/8/88/ABES_Cricket_stadium.jpg',
  campus03: 'https://upload.wikimedia.org/wikipedia/commons/7/79/ABES_Engineering_College_03.jpg',
  address: '19th KM Stone, NH-09 (Formerly NH-24), Vijay Nagar, Ghaziabad, Uttar Pradesh 201009',
  aktuCode: '032',
  established: 2000,
  campusArea: '15.7 Acres Lush Green Wi-Fi Campus'
};

export const DEMO_USERS: Record<string, User> = {
  super_admin: {
    id: 'u-admin-1',
    name: 'Prof. (Dr.) Sanjay Kumar Singh',
    email: 'director@abes.ac.in',
    collegeId: 'ABES-DIR-001',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    designation: 'Director & Chief Academic Officer',
    department: 'Central Administration, Bhabha Block',
    phone: '+91 120 7135112',
    joinDate: '15 Aug 2014'
  },
  hod: {
    id: 'u-hod-1',
    name: 'Dr. Amit Sinha',
    email: 'hod.cse@abes.ac.in',
    collegeId: 'ABES-FAC-014',
    role: 'hod',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    designation: 'Professor & Head of Department',
    department: 'Computer Science & Engineering',
    phone: '+91 98101 23456',
    joinDate: '10 Jul 2016'
  },
  faculty: {
    id: 'u-fac-1',
    name: 'Dr. Meenakshi Sharma',
    email: 'faculty.sharma@abes.ac.in',
    collegeId: 'ABES-FAC-089',
    role: 'faculty',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    phone: '+91 99234 56789',
    joinDate: '01 Feb 2019'
  },
  student: {
    id: 'u-stu-1',
    name: 'Varun Gupta',
    email: 'student.varun@abes.ac.in',
    collegeId: '2200320100145',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & Engineering',
    semester: 6,
    section: 'CSE-3B',
    phone: '+91 94567 89012',
    joinDate: '20 Aug 2022'
  }
};

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept-cse',
    name: 'Computer Science & Engineering',
    code: 'CSE',
    hodName: 'Dr. Amit Sinha',
    hodEmail: 'hod.cse@abes.ac.in',
    facultyCount: 54,
    studentCount: 780,
    sectionsCount: 12,
    averageAttendance: 84.6,
    healthScore: 93,
    placementPercentage: 94.8,
    establishedYear: 2000,
    description: 'Premier department housed in Kalpana Chawla Block with NBA Tier-1 accreditation. Focuses on Artificial Intelligence, Cloud Computing, and Cybersecurity with industry labs.',
    achievementsCount: 42,
    labsCount: 14,
    accreditedUntil: '2027 (NBA Tier 1)'
  },
  {
    id: 'dept-it',
    name: 'Information Technology',
    code: 'IT',
    hodName: 'Dr. Bipin Kumar Rai',
    hodEmail: 'hod.it@abes.ac.in',
    facultyCount: 36,
    studentCount: 460,
    sectionsCount: 8,
    averageAttendance: 82.8,
    healthScore: 90,
    placementPercentage: 92.5,
    establishedYear: 2002,
    description: 'Specializes in Distributed Systems, Mobile Computing, Full-Stack Development and Internet Technologies with HP Center of Excellence.',
    achievementsCount: 28,
    labsCount: 9,
    accreditedUntil: '2026 (NBA Tier 1)'
  },
  {
    id: 'dept-aiml',
    name: 'CS - Artificial Intelligence & ML',
    code: 'CS-AIML',
    hodName: 'Dr. Rizwan Khan',
    hodEmail: 'hod.aiml@abes.ac.in',
    facultyCount: 30,
    studentCount: 420,
    sectionsCount: 7,
    averageAttendance: 87.2,
    healthScore: 95,
    placementPercentage: 96.5,
    establishedYear: 2020,
    description: 'Advanced state-of-the-art program powered by NVIDIA GPU Deep Learning Research Lab and GenAI Computer Vision simulation centers.',
    achievementsCount: 35,
    labsCount: 8,
    accreditedUntil: '2028 (NBA Accredited)'
  },
  {
    id: 'dept-ece',
    name: 'Electronics & Communication',
    code: 'ECE',
    hodName: 'Dr. Sanjay Singh',
    hodEmail: 'hod.ece@abes.ac.in',
    facultyCount: 38,
    studentCount: 410,
    sectionsCount: 7,
    averageAttendance: 80.1,
    healthScore: 85,
    placementPercentage: 87.2,
    establishedYear: 2000,
    description: 'VLSI Design, Embedded IoT, Wireless 5G Networks, and Robotics Automation Lab in Bhabha Block.',
    achievementsCount: 22,
    labsCount: 12,
    accreditedUntil: '2026 (NBA Tier 1)'
  },
  {
    id: 'dept-me',
    name: 'Mechanical Engineering',
    code: 'ME',
    hodName: 'Dr. R. K. Singh',
    hodEmail: 'hod.me@abes.ac.in',
    facultyCount: 28,
    studentCount: 220,
    sectionsCount: 4,
    averageAttendance: 77.4,
    healthScore: 80,
    placementPercentage: 81.0,
    establishedYear: 2001,
    description: 'Automotive CAD/CAM fabrication centers, Industrial Robotics cell, and Thermal Energy Testing bays.',
    achievementsCount: 16,
    labsCount: 12,
    accreditedUntil: '2025 (Tier 2)'
  },
  {
    id: 'dept-ce',
    name: 'Civil Engineering',
    code: 'CE',
    hodName: 'Dr. Vandana Verma',
    hodEmail: 'hod.ce@abes.ac.in',
    facultyCount: 20,
    studentCount: 160,
    sectionsCount: 3,
    averageAttendance: 78.5,
    healthScore: 78,
    placementPercentage: 76.0,
    establishedYear: 2008,
    description: 'Geo-technical testing, Environmental Engineering, Remote Sensing GIS, and Earthquake-Resistant Structure research.',
    achievementsCount: 11,
    labsCount: 8,
    accreditedUntil: '2025 (Tier 2)'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-1',
    rollNo: '2200320100145',
    admissionNo: '2022-CSE-0145',
    name: 'Varun Gupta',
    email: 'varun.gupta22@abes.ac.in',
    phone: '+91 94567 89012',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 6,
    section: 'CSE-3B',
    cgpa: 8.92,
    attendance: 87.5,
    mentorName: 'Dr. Meenakshi Sharma',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    codingRating: 1845,
    placed: false
  },
  {
    id: 'stu-2',
    rollNo: '2200320100088',
    admissionNo: '2022-CSE-0088',
    name: 'Ananya Saxena',
    email: 'ananya.s22@abes.ac.in',
    phone: '+91 98112 34567',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 6,
    section: 'CSE-3A',
    cgpa: 9.48,
    attendance: 94.2,
    mentorName: 'Dr. Meenakshi Sharma',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    codingRating: 2012,
    placed: true,
    packageLPA: 34.0
  },
  {
    id: 'stu-3',
    rollNo: '2200320100034',
    admissionNo: '2022-CSE-0034',
    name: 'Aditya Srivastava',
    email: 'aditya.s22@abes.ac.in',
    phone: '+91 97123 45678',
    department: 'Computer Science & Engineering',
    year: 3,
    semester: 6,
    section: 'CSE-3B',
    cgpa: 6.84,
    attendance: 68.4,
    mentorName: 'Dr. Rajesh Tiwari',
    status: 'Defaulter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    codingRating: 1420,
    placed: false
  },
  {
    id: 'stu-4',
    rollNo: '2100320130022',
    admissionNo: '2021-IT-0022',
    name: 'Kavya Singhania',
    email: 'kavya.s21@abes.ac.in',
    phone: '+91 99887 65432',
    department: 'Information Technology',
    year: 4,
    semester: 8,
    section: 'IT-4A',
    cgpa: 9.15,
    attendance: 91.0,
    mentorName: 'Dr. Bipin Kumar Rai',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    codingRating: 1940,
    placed: true,
    packageLPA: 28.5
  },
  {
    id: 'stu-5',
    rollNo: '2300320150041',
    admissionNo: '2023-AIML-0041',
    name: 'Rohan Deshmukh',
    email: 'rohan.d23@abes.ac.in',
    phone: '+91 95432 10987',
    department: 'CS - Artificial Intelligence & ML',
    year: 2,
    semester: 4,
    section: 'AIML-2A',
    cgpa: 8.76,
    attendance: 85.0,
    mentorName: 'Dr. Rizwan Khan',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    codingRating: 1680,
    placed: false
  },
  {
    id: 'stu-6',
    rollNo: '2200320310015',
    admissionNo: '2022-ECE-0015',
    name: 'Priyanka Rawat',
    email: 'priyanka.r22@abes.ac.in',
    phone: '+91 96543 21876',
    department: 'Electronics & Communication',
    year: 3,
    semester: 6,
    section: 'ECE-3A',
    cgpa: 7.95,
    attendance: 72.8,
    mentorName: 'Dr. Sanjay Singh',
    status: 'Defaulter',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    codingRating: 1350,
    placed: false
  }
];

export const INITIAL_FACULTY: Faculty[] = [
  {
    id: 'fac-1',
    employeeCode: 'ABES-FAC-014',
    name: 'Dr. Amit Sinha',
    email: 'hod.cse@abes.ac.in',
    phone: '+91 98101 23456',
    department: 'Computer Science & Engineering',
    designation: 'HOD & Professor',
    qualification: 'Ph.D (IIT Delhi), M.Tech (CSE)',
    experienceYears: 20,
    assignedSubjects: ['CS601: Compiler Design', 'CS802: Distributed Systems'],
    workloadHoursPerWeek: 14,
    menteeCount: 18,
    researchPapersCount: 45,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'fac-2',
    employeeCode: 'ABES-FAC-089',
    name: 'Dr. Meenakshi Sharma',
    email: 'faculty.sharma@abes.ac.in',
    phone: '+91 99234 56789',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    qualification: 'Ph.D (JNU), M.Tech (CSE)',
    experienceYears: 13,
    assignedSubjects: ['CS602: Web Technology & Cloud', 'CS403: Operating Systems'],
    workloadHoursPerWeek: 18,
    menteeCount: 22,
    researchPapersCount: 22,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'fac-3',
    employeeCode: 'ABES-FAC-102',
    name: 'Dr. Rajesh Tiwari',
    email: 'rajesh.tiwari@abes.ac.in',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    qualification: 'M.Tech (AKTU), Ph.D (Pursuing)',
    experienceYears: 8,
    assignedSubjects: ['CS603: Computer Networks', 'CS301: Data Structures Lab'],
    workloadHoursPerWeek: 20,
    menteeCount: 24,
    researchPapersCount: 9,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'fac-4',
    employeeCode: 'ABES-FAC-033',
    name: 'Dr. Rizwan Khan',
    email: 'hod.aiml@abes.ac.in',
    phone: '+91 98112 99887',
    department: 'CS - Artificial Intelligence & ML',
    designation: 'HOD & Professor',
    qualification: 'Ph.D (Jamia Millia), M.Tech (AI)',
    experienceYears: 17,
    assignedSubjects: ['AIML601: Deep Learning', 'AIML402: NLP'],
    workloadHoursPerWeek: 15,
    menteeCount: 20,
    researchPapersCount: 34,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    status: 'Active'
  }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-1',
    code: 'KCS-601',
    name: 'Software Engineering & Agile Methodologies',
    department: 'Computer Science & Engineering',
    semester: 6,
    credits: 4,
    facultyName: 'Dr. Meenakshi Sharma',
    totalLectures: 45,
    deliveredLectures: 38,
    completionPercentage: 84.4,
    syllabusUnits: [
      { unit: 1, title: 'Introduction to Software Processes & Life Cycle Models', hours: 9, status: 'Completed' },
      { unit: 2, title: 'Requirement Engineering & SRS Documentation', hours: 9, status: 'Completed' },
      { unit: 3, title: 'Architectural Design & UML Modeling', hours: 9, status: 'Completed' },
      { unit: 4, title: 'Software Testing, Quality Assurance & CI/CD Pipelines', hours: 10, status: 'In Progress' },
      { unit: 5, title: 'Agile Frameworks (Scrum/Kanban) & Maintenance', hours: 8, status: 'Upcoming' }
    ]
  },
  {
    id: 'sub-2',
    code: 'KCS-602',
    name: 'Web Technology & Cloud Applications',
    department: 'Computer Science & Engineering',
    semester: 6,
    credits: 4,
    facultyName: 'Dr. Meenakshi Sharma',
    totalLectures: 42,
    deliveredLectures: 36,
    completionPercentage: 85.7,
    syllabusUnits: [
      { unit: 1, title: 'HTML5, CSS3, DOM & Modern JavaScript (ES6+)', hours: 8, status: 'Completed' },
      { unit: 2, title: 'Frontend Frameworks (React) & State Management', hours: 10, status: 'Completed' },
      { unit: 3, title: 'Node.js, Express & RESTful Microservices', hours: 9, status: 'Completed' },
      { unit: 4, title: 'Databases (MongoDB/PostgreSQL) & ORM', hours: 8, status: 'In Progress' },
      { unit: 5, title: 'Cloud Deployment (AWS/Docker/Kubernetes) & Security', hours: 7, status: 'Upcoming' }
    ]
  },
  {
    id: 'sub-3',
    code: 'KCS-603',
    name: 'Computer Networks & Network Security',
    department: 'Computer Science & Engineering',
    semester: 6,
    credits: 4,
    facultyName: 'Dr. Rajesh Tiwari',
    totalLectures: 44,
    deliveredLectures: 33,
    completionPercentage: 75.0,
    syllabusUnits: [
      { unit: 1, title: 'OSI & TCP/IP Reference Architectures', hours: 9, status: 'Completed' },
      { unit: 2, title: 'Data Link Layer: Framing, Flow & Error Control', hours: 9, status: 'Completed' },
      { unit: 3, title: 'Network Layer: Routing Algorithms & IPv4/IPv6', hours: 9, status: 'Completed' },
      { unit: 4, title: 'Transport Layer: TCP, UDP, Congestion Control', hours: 9, status: 'In Progress' },
      { unit: 5, title: 'Cryptography, Firewalls & Zero Trust Security', hours: 8, status: 'Upcoming' }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Assignment 3: Microservice REST API with Express & JWT',
    subjectCode: 'KCS-602',
    subjectName: 'Web Technology & Cloud Applications',
    department: 'Computer Science & Engineering',
    semester: 6,
    section: 'CSE-3B',
    facultyName: 'Dr. Meenakshi Sharma',
    dueDate: '2026-11-28',
    totalMarks: 20,
    totalSubmissions: 58,
    evaluatedSubmissions: 42,
    status: 'Active',
    description: 'Implement a secure authentication microservice handling role-based tokens, password hashing, and test via Postman documentation.'
  },
  {
    id: 'asg-2',
    title: 'Assignment 2: Network Subnetting & Packet Analysis with Wireshark',
    subjectCode: 'KCS-603',
    subjectName: 'Computer Networks & Network Security',
    department: 'Computer Science & Engineering',
    semester: 6,
    section: 'CSE-3B',
    facultyName: 'Dr. Rajesh Tiwari',
    dueDate: '2026-11-25',
    totalMarks: 25,
    totalSubmissions: 63,
    evaluatedSubmissions: 63,
    status: 'Closed',
    description: 'Perform CIDR variable length subnet masking (VLSM) calculations and capture 3-way TCP handshakes with packet inspection logs.'
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 'tt-1', day: 'Monday', time: '09:00 - 10:00 AM', subjectCode: 'KCS-601', subjectName: 'Software Engineering', facultyName: 'Dr. Meenakshi Sharma', room: 'Bhabha Block 302', section: 'CSE-3B', department: 'CSE', type: 'Theory' },
  { id: 'tt-2', day: 'Monday', time: '10:00 - 11:00 AM', subjectCode: 'KCS-602', subjectName: 'Web Technology', facultyName: 'Dr. Meenakshi Sharma', room: 'Bhabha Block 302', section: 'CSE-3B', department: 'CSE', type: 'Theory' },
  { id: 'tt-3', day: 'Monday', time: '11:15 - 01:15 PM', subjectCode: 'KCS-652', subjectName: 'Web Technology Lab', facultyName: 'Dr. Meenakshi Sharma', room: 'HP Center of Excellence Lab 4', section: 'CSE-3B', department: 'CSE', type: 'Lab' },
  { id: 'tt-4', day: 'Tuesday', time: '09:00 - 10:00 AM', subjectCode: 'KCS-603', subjectName: 'Computer Networks', facultyName: 'Dr. Rajesh Tiwari', room: 'Bhabha Block 302', section: 'CSE-3B', department: 'CSE', type: 'Theory' },
  { id: 'tt-5', day: 'Wednesday', time: '11:15 - 01:15 PM', subjectCode: 'KCS-653', subjectName: 'Networks Simulation Lab', facultyName: 'Dr. Rajesh Tiwari', room: 'Kalpana Chawla Lab 402', section: 'CSE-3B', department: 'CSE', type: 'Lab' }
];

export const INITIAL_EXAMS: ExamResult[] = [
  {
    id: 'res-1',
    studentRollNo: '2200320100145',
    studentName: 'Varun Gupta',
    department: 'Computer Science & Engineering',
    semester: 5,
    examType: 'University End-Sem',
    academicYear: '2025-26 Odd Sem (AKTU Code 032)',
    subjects: [
      { code: 'KCS-501', name: 'Database Management Systems', maxMarks: 100, obtainedMarks: 88, grade: 'A+' },
      { code: 'KCS-502', name: 'Design & Analysis of Algorithms', maxMarks: 100, obtainedMarks: 91, grade: 'O' },
      { code: 'KCS-503', name: 'Object Oriented Programming with Java', maxMarks: 100, obtainedMarks: 85, grade: 'A+' },
      { code: 'KCS-504', name: 'Formal Languages & Automata', maxMarks: 100, obtainedMarks: 79, grade: 'A' },
      { code: 'KNC-501', name: 'Constitution of India', maxMarks: 100, obtainedMarks: 82, grade: 'A' }
    ],
    totalMarks: 500,
    obtainedMarks: 425,
    percentage: 85.0,
    sgpa: 8.92
  }
];

export const INITIAL_PLACEMENTS: PlacementDrive[] = [
  {
    id: 'pd-1',
    companyName: 'Adobe Systems',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    role: 'Member of Technical Staff (Product MTS)',
    packageLPA: 34.0,
    eligibleBranches: ['CSE', 'IT', 'CS-AIML'],
    minCgpa: 8.5,
    driveDate: '2026-11-30',
    registeredCount: 195,
    selectedCount: 6,
    status: 'Ongoing',
    location: 'ABES Bhabha Auditorium / Noida Hub'
  },
  {
    id: 'pd-2',
    companyName: 'Amazon AWS',
    logo: 'https://images.unsplash.com/photo-1523474255658-4af61b1683cb?w=100&auto=format&fit=crop&q=80',
    role: 'Cloud Support Associate / SDE-1',
    packageLPA: 28.5,
    eligibleBranches: ['CSE', 'IT', 'CS-AIML', 'ECE'],
    minCgpa: 8.0,
    driveDate: '2026-12-10',
    registeredCount: 284,
    selectedCount: 14,
    status: 'Upcoming',
    location: 'ABES On-Campus Placement Cell'
  },
  {
    id: 'pd-3',
    companyName: 'Zscaler Cloud Security',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=80',
    role: 'Security Software Engineer',
    packageLPA: 19.5,
    eligibleBranches: ['CSE', 'IT'],
    minCgpa: 7.5,
    driveDate: '2026-12-18',
    registeredCount: 210,
    selectedCount: 0,
    status: 'Upcoming',
    location: 'Mohali / On-Campus'
  },
  {
    id: 'pd-4',
    companyName: 'TCS Digital / Prime',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    role: 'Digital Software Engineer',
    packageLPA: 9.0,
    eligibleBranches: ['All B.Tech Branches'],
    minCgpa: 7.0,
    driveDate: '2026-11-15',
    registeredCount: 650,
    selectedCount: 112,
    status: 'Completed',
    location: 'ABES Main Auditorium & Computing Labs'
  }
];

export const INITIAL_EVENTS: CollegeEvent[] = [
  {
    id: 'ev-1',
    title: 'GENERO 2026: Annual Techno-Cultural Extravaganza',
    organizer: 'ABES Student Council & Kalakrit Club',
    category: 'Cultural',
    date: '18 Feb - 20 Feb 2026',
    time: '10:00 AM onwards (3 Days)',
    venue: 'ABES Cricket Stadium & Main Campus Lawns',
    registeredCount: 3400,
    banner: ABES_REAL_ASSETS.cricketStadium,
    description: 'The flagship annual fest of ABES Engineering College featuring celebrity concerts, Battle of Bands, RoboWars, EDM night, street plays by Manthan, and inter-college cultural competitions across NCR.',
    status: 'Upcoming'
  },
  {
    id: 'ev-2',
    title: 'SIH 2026 Internal Hackathon & Innovation Sprint',
    organizer: 'Dept. of CSE & Club Minerva',
    category: 'Hackathon',
    date: '05 Dec 2026',
    time: '09:00 AM - 09:00 PM (36 Hours)',
    venue: 'Bhabha Block Auditorium & HP Center of Excellence',
    registeredCount: 520,
    banner: ABES_REAL_ASSETS.mainBuilding,
    description: 'Smart India Hackathon institutional preliminary round judged by industry mentors from Google, Adobe, and Microsoft. ₹2,00,000 prize pool.',
    status: 'Upcoming'
  },
  {
    id: 'ev-3',
    title: 'Technovation 2026: Project & Robotics Expo',
    organizer: 'Club GenX & Robotics Center',
    category: 'Technical',
    date: '28 Nov 2026',
    time: '11:00 AM - 05:00 PM',
    venue: 'Kalpana Chawla Block Seminar Foyer',
    registeredCount: 380,
    banner: ABES_REAL_ASSETS.aerialView,
    description: 'Exhibition of final year AI models, drone surveying prototypes, electric vehicle powertrains, and IoT medical devices evaluated by AICTE jury.',
    status: 'Ongoing'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Mandatory 75% Attendance Requirement for Sessional-II Exam Eligibility (AKTU Code 032)',
    category: 'Urgent',
    targetAudience: 'All',
    publishedBy: 'Office of the Dean Academics (ABESEC)',
    date: '22 Nov 2026',
    content: 'All students are strictly notified that candidates having aggregate attendance below 75% as per AKTU university ordinance will NOT be permitted to sit in Sessional Examinations. Defaulter lists will be finalized by HODs on Monday.',
    isPinned: true,
    attachmentName: 'Circular_Ref_ABES_Dean_Acad_2026_88.pdf'
  },
  {
    id: 'not-2',
    title: 'AKTU Even Semester Examination Form Verification Schedule',
    category: 'Examination',
    targetAudience: 'Students',
    publishedBy: 'Controller of Examinations, ABESEC',
    date: '20 Nov 2026',
    content: 'Students eligible for Even Semester University Examinations must submit their examination forms and verify elective subjects on the ERP portal before 5th December without late fine.',
    isPinned: true,
    attachmentName: 'AKTU_Exam_Schedule_Code_032.pdf'
  },
  {
    id: 'not-3',
    title: 'GENERO 2026: Student Auditions for Drama, Dance, and Technical Committees',
    category: 'General',
    targetAudience: 'Students',
    publishedBy: 'Dean Student Welfare & Kalakrit Club',
    date: '19 Nov 2026',
    content: 'Auditions for the official GENERO 2026 organizing team and competitive teams (Manthan, Kalakrit, Club GenX, Club Minerva) will be held at Sarabhai Seminar Hall.',
    isPinned: false
  }
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  {
    id: 'appr-1',
    type: 'Student Leave',
    applicantName: 'Varun Gupta',
    applicantRole: 'student',
    department: 'Computer Science & Engineering',
    title: 'Medical Leave Application (Fever & Viral Infection)',
    reason: 'Advisable bed rest for 3 days due to seasonal viral fever. Medical certificate from campus dispensary attached.',
    dates: '24 Nov 2026 - 26 Nov 2026 (3 Days)',
    appliedOn: '23 Nov 2026',
    status: 'Pending',
    remarks: 'Awaiting Faculty Mentor review'
  },
  {
    id: 'appr-2',
    type: 'Faculty Leave',
    applicantName: 'Dr. Meenakshi Sharma',
    applicantRole: 'faculty',
    department: 'Computer Science & Engineering',
    title: 'Duty Leave (OD) for IEEE International Conference',
    reason: 'Presenting research paper on "Federated Learning for Edge Medical Imaging" at IIT Roorkee.',
    dates: '01 Dec 2026 - 02 Dec 2026 (2 Days)',
    appliedOn: '21 Nov 2026',
    status: 'Pending',
    remarks: 'Substitute classes arranged with Dr. Rajesh Tiwari'
  },
  {
    id: 'appr-3',
    type: 'Budget Approval',
    applicantName: 'Dr. Amit Sinha',
    applicantRole: 'hod',
    department: 'Computer Science & Engineering',
    title: 'Hardware Upgrade for NVIDIA AI Research Lab (Kalpana Chawla Block)',
    reason: 'Procurement of 4x NVIDIA RTX 4090 GPUs and 128GB RAM kits for student LLM capstone projects.',
    dates: 'Financial Year 2026-Q4',
    appliedOn: '19 Nov 2026',
    status: 'Approved',
    approvedBy: 'Prof. (Dr.) Sanjay Kumar Singh (Director)',
    remarks: 'Approved under AICTE Modrob grant allocation.'
  }
];

export const INITIAL_COMPLAINTS: ComplaintTicket[] = [
  {
    id: 'cmp-1',
    ticketNo: 'TKT-2026-1042',
    category: 'Infrastructure',
    title: 'Projector resolution failure & flickering in Room Bhabha-302',
    description: 'During lectures, the ceiling projector cuts signal every 10 minutes when HDMI port is connected to faculty laptops.',
    submittedBy: 'Dr. Meenakshi Sharma',
    submittedRole: 'faculty',
    department: 'Computer Science & Engineering',
    date: '22 Nov 2026',
    priority: 'High',
    status: 'In Progress',
    resolutionNotes: 'IT Support technician assigned; replacement HDMI splitter dispatched.'
  },
  {
    id: 'cmp-2',
    ticketNo: 'TKT-2026-1029',
    category: 'Hostel',
    title: 'Wi-Fi connection latency in Dayanand Hostel Block C',
    description: 'Frequent DNS timeouts during late evening hours affecting coding contest participation.',
    submittedBy: 'Varun Gupta',
    submittedRole: 'student',
    department: 'Computer Science & Engineering',
    date: '19 Nov 2026',
    priority: 'Medium',
    status: 'Open'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: '1st Prize - Smart India Hackathon (SIH 2026 National Finale)',
    recipientName: 'Team NeuralByte (Led by Ananya Saxena & Varun Gupta, ABESEC)',
    type: 'Student',
    department: 'Computer Science & Engineering',
    category: 'Hackathon Win',
    year: '2026',
    description: 'Developed an automated disaster relief coordination drone network for Ministry of Jal Shakti. Awarded ₹1,00,000 cash prize.',
    verified: true
  },
  {
    id: 'ach-2',
    title: 'US Patent Granted: Privacy-Preserving Health Telemetry Sensor',
    recipientName: 'Dr. Meenakshi Sharma & Dr. Amit Sinha',
    type: 'Faculty',
    department: 'Computer Science & Engineering',
    category: 'Patent',
    year: '2026',
    description: 'Patent US-11849201B2 published for cryptographic biomedical IoT telemetry on low-power microcontrollers.',
    verified: true
  },
  {
    id: 'ach-3',
    title: 'NBA Tier-1 Accreditation Re-certified Across Departments',
    recipientName: 'ABES Engineering College, Ghaziabad',
    type: 'Department',
    department: 'Computer Science & Engineering',
    category: 'Academic Gold Medal',
    year: '2025-26',
    description: 'Recognized by NBA & AICTE for highest placement package (₹34 LPA) and 94.8% overall placement rate.',
    verified: true
  }
];

export const INITIAL_TIMELINE: ActivityTimelineItem[] = [
  {
    id: 'act-1',
    user: 'Prof. (Dr.) Sanjay Kumar Singh (Director)',
    role: 'Super Admin',
    action: 'Approved Annual AI Lab Hardware Upgrade',
    target: 'Kalpana Chawla Block AI Lab',
    timestamp: '25 mins ago',
    type: 'approve'
  },
  {
    id: 'act-2',
    user: 'Office of Dean Academics',
    role: 'Administration',
    action: 'Published Mandatory 75% Attendance Notice (AKTU Code 032)',
    target: 'All Students & Faculty',
    timestamp: '1 hour ago',
    type: 'alert'
  },
  {
    id: 'act-3',
    user: 'Dr. Meenakshi Sharma',
    role: 'Faculty',
    action: 'Created New Assignment: Microservice REST API',
    target: 'CSE-3B (Web Technology)',
    timestamp: '3 hours ago',
    type: 'create'
  },
  {
    id: 'act-4',
    user: 'T&P Placement Cell, ABESEC',
    role: 'Administration',
    action: 'Initiated Shortlisting for Adobe ₹34 LPA Product Drive',
    target: 'B.Tech CSE/IT/AIML Final Year',
    timestamp: '1 day ago',
    type: 'event'
  }
];

export function calculateDepartmentHealth(dept: Department): {
  score: number;
  attendanceFactor: number;
  placementFactor: number;
  facultyRatioFactor: number;
  healthGrade: 'A+' | 'A' | 'B+' | 'B';
} {
  const attendanceFactor = Math.min(100, (dept.averageAttendance / 85) * 100);
  const placementFactor = Math.min(100, (dept.placementPercentage / 90) * 100);
  const ratio = dept.studentCount / (dept.facultyCount || 1);
  const facultyRatioFactor = ratio <= 16 ? 98 : ratio <= 20 ? 88 : 75;
  const score = Math.round(attendanceFactor * 0.4 + placementFactor * 0.4 + facultyRatioFactor * 0.2);

  let healthGrade: 'A+' | 'A' | 'B+' | 'B' = 'B';
  if (score >= 90) healthGrade = 'A+';
  else if (score >= 82) healthGrade = 'A';
  else if (score >= 75) healthGrade = 'B+';

  return {
    score,
    attendanceFactor: Math.round(attendanceFactor),
    placementFactor: Math.round(placementFactor),
    facultyRatioFactor: Math.round(facultyRatioFactor),
    healthGrade
  };
}
