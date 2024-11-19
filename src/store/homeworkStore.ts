import { create } from 'zustand';
import { Homework } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface HomeworkState {
  homeworks: Homework[];
  addHomework: (homework: Omit<Homework, 'id'>) => void;
  toggleHomework: (id: string) => void;
  getHomeworksBySubject: (studentId: string, subjectId: string) => Homework[];
}

export const useHomeworkStore = create<HomeworkState>((set, get) => ({
  homeworks: [],
  addHomework: (homework) => {
    const newHomework = { ...homework, id: uuidv4() };
    set((state) => ({
      homeworks: [...state.homeworks, newHomework]
    }));
  },
  toggleHomework: (id) => {
    set((state) => ({
      homeworks: state.homeworks.map((hw) =>
        hw.id === id ? { ...hw, completed: !hw.completed } : hw
      )
    }));
  },
  getHomeworksBySubject: (studentId, subjectId) => {
    return get().homeworks.filter(
      (hw) => hw.studentId === studentId && hw.subjectId === subjectId
    );
  }
}));