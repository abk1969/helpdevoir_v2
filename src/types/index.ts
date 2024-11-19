import { LucideIcon } from 'lucide-react';

export interface Subject {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  gradeLevel: string;
}

export interface HomeworkAttachment {
  id: string;
  type: 'file' | 'photo';
  url: string;
  name: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  subjectId: string;
  studentId: string;
  attachments: HomeworkAttachment[];
  aiCorrection?: string;
}

export interface Student {
  id: string;
  firstName: string;
  age: number;
  email?: string;
  gradeLevel: string;
  subjects: Subject[];
}

export interface Parent {
  id: string;
  email: string;
  students: Student[];
  isPremium?: boolean;
  subscription?: {
    plan: 'essential' | 'family' | 'premium';
    status: 'active' | 'inactive';
  };
}