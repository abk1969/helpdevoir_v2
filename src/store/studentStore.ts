import { create } from 'zustand';
import { Student } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from './authStore';
import { subjectsByGrade } from '../data/subjects';

interface StudentState {
  addStudent: (studentData: Omit<Student, 'id' | 'subjects'>) => void;
  getStudents: () => Student[];
}

export const useStudentStore = create<StudentState>((set, get) => ({
  addStudent: (studentData) => {
    const parent = useAuthStore.getState().parent;
    if (!parent) return;

    const newStudent: Student = {
      id: uuidv4(),
      ...studentData,
      subjects: subjectsByGrade[studentData.gradeLevel]
    };

    useAuthStore.setState({
      parent: {
        ...parent,
        students: [...parent.students, newStudent]
      }
    });
  },
  getStudents: () => {
    const parent = useAuthStore.getState().parent;
    return parent?.students || [];
  }
}));