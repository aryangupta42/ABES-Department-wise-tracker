import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  X,
  Sparkles,
  Maximize2,
  Minimize2,
  HelpCircle,
  Lightbulb,
  Building2,
  Calendar,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { cn } from '../../utils/cn';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void }[];
}

export const AICampusAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { user, role } = useAuth();
  const { departments, students, assignments, events } = useData();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${user?.name || 'there'}! I am **ABES Campus AI**, your localized academic assistant. \n\nI can answer questions regarding department health scores, student attendance rules, upcoming hackathons, faculty contacts, and AKTU exam policies. How can I help you today?`,
      timestamp: 'Just now'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const suggestedQuestions = [
    'What is my current attendance status?',
    'Compare CSE vs IT placement percentage',
    'Upcoming hackathons and fests',
    'What is the 75% attendance rule at ABES?',
    'Who is the HOD of Computer Science?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate intelligent response using local mock data
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply = '';

      if (lower.includes('attendance') && (lower.includes('my') || lower.includes('status'))) {
        if (role === 'student') {
          reply = `📊 **Your Attendance Overview:**\n• Aggregate Attendance: **87.5%** (Safe & Eligible)\n• Threshold status: **12.5% above** mandatory 75% cutoff\n• Next Sessional Eligibility: **Approved**\n• Classes attended: 126 / 144 delivered lectures.`;
        } else {
          reply = `📊 **College Aggregate Attendance:**\n• Overall Campus Average: **82.3%**\n• CSE Department: **84.6%**\n• CS-AIML: **86.8%** (Highest)\n• Defaulters below 75%: **64 students flagged** across all years.`;
        }
      } else if (lower.includes('cse') && lower.includes('it')) {
        const cse = departments.find((d) => d.code === 'CSE');
        const it = departments.find((d) => d.code === 'IT');
        reply = `⚖️ **CSE vs IT Department Comparison:**\n\n• **Placement Rate**: CSE (**${cse?.placementPercentage}%**) vs IT (**${it?.placementPercentage}%**)\n• **Health Score**: CSE (**${cse?.healthScore}/100**) vs IT (**${it?.healthScore}/100**)\n• **Faculty Strength**: CSE (${cse?.facultyCount}) vs IT (${it?.facultyCount})\n• **Average Attendance**: CSE (${cse?.averageAttendance}%) vs IT (${it?.averageAttendance}%)\n\nBoth departments hold Tier-1 NBA accreditation.`;
      } else if (lower.includes('hackathon') || lower.includes('fest') || lower.includes('event')) {
        const ev = events[0];
        reply = `🚀 **Upcoming Major Event:**\n**${ev?.title || 'Generative AI Hackathon'}**\n• Date: **${ev?.date}**\n• Venue: **${ev?.venue}**\n• Category: ${ev?.category}\n• Registered Teams: ${ev?.registeredCount} participants\n• Prize Pool: ₹2,50,000 INR.`;
      } else if (lower.includes('hod') || lower.includes('head')) {
        const cse = departments.find((d) => d.code === 'CSE');
        reply = `🏛️ **Head of Department (CSE):**\n• **${cse?.hodName}**\n• Designation: Professor & HOD\n• Email: \`${cse?.hodEmail}\`\n• Office: Kalpana Chawla Block, 3rd Floor, Cabin HOD-01.`;
      } else if (lower.includes('75') || lower.includes('rule') || lower.includes('defaulter')) {
        reply = `⚠️ **ABES & AKTU 75% Attendance Ordinance:**\n\n1. Students must maintain a minimum of **75% aggregate attendance** in every semester to appear in Sessional and University End-Sem exams.\n2. In genuine medical cases, condonation up to **10% (65% minimum)** can be granted by the Director upon verified submission of medical certificates within 3 days.\n3. Students below 65% are strictly detained without exception.`;
      } else if (lower.includes('assignment') || lower.includes('deadline')) {
        const asg = assignments[0];
        reply = `📝 **Upcoming Assignment Deadline:**\n• **${asg?.title}**\n• Subject: ${asg?.subjectName} (${asg?.subjectCode})\n• Due Date: **${asg?.dueDate}**\n• Status: ${asg?.status}\n• Submissions Received: ${asg?.totalSubmissions}.`;
      } else {
        reply = `🤖 Thank you for your question about *" ${query} "*. \n\nAs a localized simulated campus assistant, I currently have indexed:\n• **${departments.length} Departments** (CSE, IT, ECE, ME, CE, CS-AIML)\n• **${students.length}+ Student Profiles & Attendance Records**\n• **Faculty schedules & assignments**\n• **AKTU Academic regulations & placement records**\n\nTry clicking one of the suggested prompts below or ask about specific department health scores!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full bg-brand-600 px-4 py-3 text-white shadow-xl hover:bg-brand-700 hover:shadow-2xl transition-all duration-200 active:scale-95"
        >
          <div className="relative">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </div>
          <span className="text-xs font-semibold tracking-wide">Ask Campus AI</span>
        </button>
      )}

      {/* Assistant Window */}
      {isOpen && (
        <div
          className={cn(
            'flex flex-col rounded-2xl border border-slate-200/90 bg-white shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-[#111928]',
            isExpanded
              ? 'fixed inset-4 sm:inset-10 z-50'
              : 'w-[90vw] sm:w-[410px] h-[540px]'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-brand-700 px-4 py-3.5 text-white rounded-t-2xl dark:border-slate-800 dark:bg-navy-900">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold">ABES Campus AI</h3>
                  <span className="rounded bg-white/20 px-1.5 py-0.2 text-[10px] font-semibold uppercase tracking-wider">
                    Simulated
                  </span>
                </div>
                <p className="text-[11px] text-brand-100 dark:text-slate-300">
                  Local academic knowledge base
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded-lg p-1 text-white/80 hover:bg-white/10 hover:text-white"
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50/40 dark:bg-slate-950/30">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn('flex flex-col max-w-[85%]', m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start')}
              >
                <div
                  className={cn(
                    'rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm whitespace-pre-wrap',
                    m.sender === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200'
                  )}
                >
                  {m.text}
                </div>
                <span className="mt-1 text-[10px] text-slate-400 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 w-24">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="border-t border-slate-100 bg-white px-3 py-2 dark:border-slate-800 dark:bg-[#111928]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-semibold uppercase text-slate-400 shrink-0 flex items-center gap-1">
                <Lightbulb className="h-3 w-3 text-amber-500" /> Ask:
              </span>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-100 bg-white p-3 rounded-b-2xl dark:border-slate-800 dark:bg-[#111928]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about ABES departments, events..."
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-lg bg-brand-600 p-2 text-white hover:bg-brand-700 disabled:opacity-40 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
