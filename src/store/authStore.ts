import { create } from 'zustand';
import { Parent } from '../types';

interface AuthState {
  parent: Parent | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateSubscription: (subscription: Parent['subscription']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  parent: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    try {
      const mockParent: Parent = {
        id: '1',
        email,
        students: [],
        subscription: {
          plan: 'essential',
          status: 'active'
        }
      };
      set({ parent: mockParent, isAuthenticated: true });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },
  logout: () => set({ parent: null, isAuthenticated: false }),
  updateSubscription: (subscription) => 
    set((state) => ({
      parent: state.parent 
        ? { ...state.parent, subscription, isPremium: subscription.plan === 'premium' }
        : null
    }))
}));