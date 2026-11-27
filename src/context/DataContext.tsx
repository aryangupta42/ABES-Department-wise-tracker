import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Department,
  Student,
  Faculty,
  Subject,
  Assignment,
  ApprovalRequest,
  ComplaintTicket,
  CollegeEvent,
  Notice,
  ActivityTimelineItem
} from '../types';
import {
  INITIAL_DEPARTMENTS,
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_SUBJECTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_APPROVALS,
  INITIAL_COMPLAINTS,
  INITIAL_EVENTS,
  INITIAL_NOTICES,
  INITIAL_TIMELINE
} from '../data/mockData';

interface DataContextType {
  departments: Department[];
  students: Student[];
  faculty: Faculty[];
  subjects: Subject[];
  assignments: Assignment[];
  approvals: ApprovalRequest[];
  complaints: ComplaintTicket[];
  events: CollegeEvent[];
  notices: Notice[];
  timeline: ActivityTimelineItem[];

  // Actions
  addDepartment: (dept: Omit<Department, 'id'>) => void;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addFaculty: (fac: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, updates: Partial<Faculty>) => void;
  addAssignment: (assignment: Omit<Assignment, 'id' | 'totalSubmissions' | 'evaluatedSubmissions'>) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  updateApprovalStatus: (id: string, status: 'Approved' | 'Rejected', remarks?: string, reviewerName?: string) => void;
  addApprovalRequest: (req: Omit<ApprovalRequest, 'id' | 'appliedOn' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: 'Open' | 'In Progress' | 'Resolved', notes?: string) => void;
  addComplaint: (complaint: Omit<ComplaintTicket, 'id' | 'ticketNo' | 'date' | 'status'>) => void;
  registerForEvent: (eventId: string) => void;
  addTimelineItem: (item: Omit<ActivityTimelineItem, 'id' | 'timestamp'>) => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>(() => {
    const v = localStorage.getItem('abes_dataset_v');
    if (v !== '2.0') {
      localStorage.setItem('abes_dataset_v', '2.0');
      localStorage.setItem('abes_departments', JSON.stringify(INITIAL_DEPARTMENTS));
      localStorage.setItem('abes_students', JSON.stringify(INITIAL_STUDENTS));
      localStorage.setItem('abes_faculty', JSON.stringify(INITIAL_FACULTY));
      localStorage.setItem('abes_subjects', JSON.stringify(INITIAL_SUBJECTS));
      localStorage.setItem('abes_assignments', JSON.stringify(INITIAL_ASSIGNMENTS));
      localStorage.setItem('abes_approvals', JSON.stringify(INITIAL_APPROVALS));
      localStorage.setItem('abes_complaints', JSON.stringify(INITIAL_COMPLAINTS));
      localStorage.setItem('abes_events', JSON.stringify(INITIAL_EVENTS));
      localStorage.setItem('abes_notices', JSON.stringify(INITIAL_NOTICES));
      localStorage.setItem('abes_timeline', JSON.stringify(INITIAL_TIMELINE));
      return INITIAL_DEPARTMENTS;
    }
    const saved = localStorage.getItem('abes_departments');
    return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('abes_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [faculty, setFaculty] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('abes_faculty');
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('abes_subjects');
    return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('abes_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [approvals, setApprovals] = useState<ApprovalRequest[]>(() => {
    const saved = localStorage.getItem('abes_approvals');
    return saved ? JSON.parse(saved) : INITIAL_APPROVALS;
  });

  const [complaints, setComplaints] = useState<ComplaintTicket[]>(() => {
    const saved = localStorage.getItem('abes_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [events, setEvents] = useState<CollegeEvent[]>(() => {
    const saved = localStorage.getItem('abes_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('abes_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [timeline, setTimeline] = useState<ActivityTimelineItem[]>(() => {
    const saved = localStorage.getItem('abes_timeline');
    return saved ? JSON.parse(saved) : INITIAL_TIMELINE;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('abes_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('abes_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('abes_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('abes_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('abes_approvals', JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem('abes_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('abes_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('abes_events', JSON.stringify(events));
  }, [events]);

  const addTimelineItem = (item: Omit<ActivityTimelineItem, 'id' | 'timestamp'>) => {
    const newItem: ActivityTimelineItem = {
      ...item,
      id: `act-${Date.now()}`,
      timestamp: 'Just now'
    };
    setTimeline((prev) => [newItem, ...prev.slice(0, 20)]);
  };

  const addDepartment = (dept: Omit<Department, 'id'>) => {
    const newDept: Department = {
      ...dept,
      id: `dept-${Date.now()}`
    };
    setDepartments((prev) => [...prev, newDept]);
    addTimelineItem({
      user: 'Super Admin',
      role: 'Super Admin',
      action: `Created new department: ${newDept.name}`,
      target: newDept.code,
      type: 'create'
    });
  };

  const updateDepartment = (id: string, updates: Partial<Department>) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: `stu-${Date.now()}`
    };
    setStudents((prev) => [newStudent, ...prev]);
    addTimelineItem({
      user: 'Academic Registry',
      role: 'Super Admin',
      action: `Registered new student: ${newStudent.name} (${newStudent.rollNo})`,
      target: newStudent.department,
      type: 'create'
    });
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const addFaculty = (fac: Omit<Faculty, 'id'>) => {
    const newFaculty: Faculty = {
      ...fac,
      id: `fac-${Date.now()}`
    };
    setFaculty((prev) => [newFaculty, ...prev]);
    addTimelineItem({
      user: 'HR & Dean Faculty',
      role: 'Super Admin',
      action: `Appointed faculty member: ${newFaculty.name}`,
      target: newFaculty.department,
      type: 'create'
    });
  };

  const updateFaculty = (id: string, updates: Partial<Faculty>) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const addAssignment = (asg: Omit<Assignment, 'id' | 'totalSubmissions' | 'evaluatedSubmissions'>) => {
    const newAsg: Assignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      totalSubmissions: 0,
      evaluatedSubmissions: 0
    };
    setAssignments((prev) => [newAsg, ...prev]);
    addTimelineItem({
      user: asg.facultyName,
      role: 'Faculty',
      action: `Published assignment: ${asg.title}`,
      target: asg.section,
      type: 'create'
    });
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setNotices((prev) => [newNotice, ...prev]);
    addTimelineItem({
      user: notice.publishedBy,
      role: 'Administration',
      action: `Posted Circular: ${notice.title}`,
      target: notice.targetAudience,
      type: 'alert'
    });
  };

  const updateApprovalStatus = (
    id: string,
    status: 'Approved' | 'Rejected',
    remarks?: string,
    reviewerName?: string
  ) => {
    setApprovals((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status,
              remarks: remarks || req.remarks,
              approvedBy: reviewerName || 'Authorized Authority'
            }
          : req
      )
    );
    addTimelineItem({
      user: reviewerName || 'Authority',
      role: 'Approver',
      action: `${status} request: #${id}`,
      target: 'Approval Queue',
      type: 'approve'
    });
  };

  const addApprovalRequest = (req: Omit<ApprovalRequest, 'id' | 'appliedOn' | 'status'>) => {
    const newReq: ApprovalRequest = {
      ...req,
      id: `appr-${Date.now()}`,
      appliedOn: 'Today',
      status: 'Pending'
    };
    setApprovals((prev) => [newReq, ...prev]);
  };

  const updateComplaintStatus = (
    id: string,
    status: 'Open' | 'In Progress' | 'Resolved',
    notes?: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              resolutionNotes: notes || c.resolutionNotes
            }
          : c
      )
    );
  };

  const addComplaint = (complaint: Omit<ComplaintTicket, 'id' | 'ticketNo' | 'date' | 'status'>) => {
    const newTicket: ComplaintTicket = {
      ...complaint,
      id: `cmp-${Date.now()}`,
      ticketNo: `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today',
      status: 'Open'
    };
    setComplaints((prev) => [newTicket, ...prev]);
  };

  const registerForEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e
      )
    );
  };

  const resetDemoData = () => {
    setDepartments(INITIAL_DEPARTMENTS);
    setStudents(INITIAL_STUDENTS);
    setFaculty(INITIAL_FACULTY);
    setSubjects(INITIAL_SUBJECTS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setApprovals(INITIAL_APPROVALS);
    setComplaints(INITIAL_COMPLAINTS);
    setEvents(INITIAL_EVENTS);
    setNotices(INITIAL_NOTICES);
    setTimeline(INITIAL_TIMELINE);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        departments,
        students,
        faculty,
        subjects,
        assignments,
        approvals,
        complaints,
        events,
        notices,
        timeline,
        addDepartment,
        updateDepartment,
        addStudent,
        updateStudent,
        deleteStudent,
        addFaculty,
        updateFaculty,
        addAssignment,
        addNotice,
        updateApprovalStatus,
        addApprovalRequest,
        updateComplaintStatus,
        addComplaint,
        registerForEvent,
        addTimelineItem,
        resetDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
