import React from 'react';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import { Type, Palette, Mic, Volume2, TextQuote } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

const fontOptions = [
  { id: 'opendyslexic', name: 'OpenDyslexic' },
  { id: 'arial', name: 'Arial' },
  { id: 'comic-sans', name: 'Comic Sans MS' }
];

const colorSchemes = [
  { id: 'cream', name: 'Crème', bg: 'bg-[#f5f5dc]', text: 'text-gray-900' },
  { id: 'blue', name: 'Bleu clair', bg: 'bg-[#e6f3ff]', text: 'text-gray-900' },
  { id: 'yellow', name: 'Jaune pâle', bg: 'bg-[#fafad2]', text: 'text-gray-900' }
];

export default function DyslexiaSettings() {
  const {
    font,
    fontSize,
    lineSpacing,
    colorScheme,
    textToSpeech,
    voiceInput,
    updateSettings
  } = useAccessibilityStore();

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres d'accessibilité</h2>

      {/* Police de caractères */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <TextQuote className="w-5 h-5 mr-2" />
          Police de caractères
        </label>
        <ToggleGroup.Root
          type="single"
          value={font}
          onValueChange={(value) => value && updateSettings({ font: value })}
          className="flex gap-2"
        >
          {fontOptions.map((option) => (
            <ToggleGroup.Item
              key={option.id}
              value={option.id}
              className={`px-4 py-2 rounded-md border ${
                font === option.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.name}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>

      {/* Taille du texte */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type className="w-5 h-5 mr-2" />
          Taille du texte
        </label>
        <input
          type="range"
          min="14"
          max="24"
          value={fontSize}
          onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Aa</span>
          <span>AAA</span>
        </div>
      </div>

      {/* Espacement des lignes */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type className="w-5 h-5 mr-2" />
          Espacement des lignes
        </label>
        <input
          type="range"
          min="1.5"
          max="3"
          step="0.5"
          value={lineSpacing}
          onChange={(e) => updateSettings({ lineSpacing: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Schéma de couleurs */}
      <div className="space-y-3">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Palette className="w-5 h-5 mr-2" />
          Schéma de couleurs
        </label>
        <div className="flex gap-3">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => updateSettings({ colorScheme: scheme.id })}
              className={`p-4 rounded-lg ${scheme.bg} ${scheme.text} ${
                colorScheme === scheme.id ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {scheme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Synthèse vocale */}
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Volume2 className="w-5 h-5 mr-2" />
          Synthèse vocale
        </label>
        <Switch.Root
          checked={textToSpeech}
          onCheckedChange={(checked) => updateSettings({ textToSpeech: checked })}
          className={`w-11 h-6 rounded-full transition-colors ${
            textToSpeech ? 'bg-indigo-600' : 'bg-gray-200'
          }`}
        >
          <Switch.Thumb className={`block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 ${
            textToSpeech ? 'translate-x-6' : ''
          }`} />
        </Switch.Root>
      </div>

      {/* Saisie vocale */}
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Mic className="w-5 h-5 mr-2" />
          Saisie vocale
        </label>
        <Switch.Root
          checked={voiceInput}
          onCheckedChange={(checked) => updateSettings({ voiceInput: checked })}
          className={`w-11 h-6 rounded-full transition-colors ${
            voiceInput ? 'bg-indigo-600' : 'bg-gray-200'
          }`}
        >
          <Switch.Thumb className={`block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 ${
            voiceInput ? 'translate-x-6' : ''
          }`} />
        </Switch.Root>
      </div>
    </div>
  );
}