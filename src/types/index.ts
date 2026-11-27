export type UserRole = 'super_admin' | 'hod' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  collegeId: string;
  role: UserRole;
  avatar: string;
  department?: string;
  designation?: string;
  semester?: number;
  section?: string;
  phone?: string;
  joinDate?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  hodName: string;
  hodEmail: string;
  facultyCount: number;
  studentCount: number;
  sectionsCount: number;
  averageAttendance: number;
  healthScore: number;
  placementPercentage: number;
  establishedYear: number;
  description: string;
  achievementsCount: number;
  labsCount: number;
  accreditedUntil: string;
}

export interface Student {
  id: string;
  rollNo: string;
  admissionNo: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: number;
  semester: number;
  section: string;
  cgpa: number;
  attendance: number;
  mentorName: string;
  status: 'Active' | 'Defaulter' | 'On Leave' | 'Alumni';
  avatar: string;
  codingRating?: number;
  placed?: boolean;
  packageLPA?: number;
}

export interface Faculty {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'HOD & Professor';
  qualification: string;
  experienceYears: number;
  assignedSubjects: string[];
  workloadHoursPerWeek: number;
  menteeCount: number;
  researchPapersCount: number;
  avatar: string;
  status: 'Active' | 'On Leave' | 'Sabbatical';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  facultyName: string;
  totalLectures: number;
  deliveredLectures: number;
  completionPercentage: number;
  syllabusUnits: {
    unit: number;
    title: string;
    hours: number;
    status: 'Completed' | 'In Progress' | 'Upcoming';
  }[];
}

export interface AttendanceRecord {
  id: string;
  date: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: number;
  section: string;
  facultyName: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  percentage: number;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: number;
  section: string;
  facultyName: string;
  dueDate: string;
  totalMarks: number;
  totalSubmissions: number;
  evaluatedSubmissions: number;
  status: 'Active' | 'Closed' | 'Draft';
  description: string;
}

export interface ExamResult {
  id: string;
  studentRollNo: string;
  studentName: string;
  department: string;
  semester: number;
  examType: 'Sessional 1' | 'Sessional 2' | 'Pre-University (PUT)' | 'University End-Sem';
  academicYear: string;
  subjects: {
    code: string;
    name: string;
    maxMarks: number;
    obtainedMarks: number;
    grade: string;
  }[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  sgpa: number;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  section: string;
  department: string;
  type: 'Theory' | 'Lab' | 'Tutorial';
}

export interface PlacementDrive {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  packageLPA: number;
  eligibleBranches: string[];
  minCgpa: number;
  driveDate: string;
  registeredCount: number;
  selectedCount: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  location: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  organizer: string; // Club or Department
  category: 'Technical' | 'Cultural' | 'Sports' | 'Workshop' | 'Hackathon';
  date: string;
  time: string;
  venue: string;
  registeredCount: number;
  banner: string;
  description: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface Notice {
  id: string;
  title: string;
  category: 'Urgent' | 'Academic' | 'Examination' | 'Placement' | 'General';
  targetAudience: 'All' | 'Students' | 'Faculty' | 'HODs';
  publishedBy: string;
  date: string;
  content: string;
  isPinned: boolean;
  attachmentName?: string;
}

export interface ApprovalRequest {
  id: string;
  type: 'Student Leave' | 'Faculty Leave' | 'Budget Approval' | 'Event Permission' | 'OD / Duty Leave';
  applicantName: string;
  applicantRole: UserRole;
  department: string;
  title: string;
  reason: string;
  dates: string;
  appliedOn: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string;
  remarks?: string;
}

export interface ComplaintTicket {
  id: string;
  ticketNo: string;
  category: 'Academic' | 'Hostel' | 'Infrastructure' | 'Lab Equipment' | 'Library' | 'Other';
  title: string;
  description: string;
  submittedBy: string;
  submittedRole: UserRole;
  department: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved';
  resolutionNotes?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  recipientName: string;
  type: 'Student' | 'Faculty' | 'Department';
  department: string;
  category: 'Hackathon Win' | 'Research Paper' | 'Patent' | 'Sports Gold' | 'Academic Gold Medal';
  year: string;
  description: string;
  verified: boolean;
}

export interface ActivityTimelineItem {
  id: string;
  user: string;
  role: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'create' | 'approve' | 'alert' | 'update' | 'event';
}
