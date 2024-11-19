import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilitySettings {
  font: string;
  fontSize: number;
  lineSpacing: number;
  colorScheme: string;
  textToSpeech: boolean;
  voiceInput: boolean;
  isDyslexiaMode: boolean;
}

interface AccessibilityState extends AccessibilitySettings {
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
  toggleDyslexiaMode: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      font: 'arial',
      fontSize: 16,
      lineSpacing: 1.5,
      colorScheme: 'cream',
      textToSpeech: false,
      voiceInput: false,
      isDyslexiaMode: false,
      updateSettings: (newSettings) =>
        set((state) => ({ ...state, ...newSettings })),
      toggleDyslexiaMode: () =>
        set((state) => ({ ...state, isDyslexiaMode: !state.isDyslexiaMode }))
    }),
    {
      name: 'accessibility-settings'
    }
  )
);