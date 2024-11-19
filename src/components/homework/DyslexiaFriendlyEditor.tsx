import React, { useEffect, useState } from 'react';
import { createEditor, $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useAccessibilityStore } from '../../store/accessibilityStore';
import { Mic, Square } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface DyslexiaFriendlyEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function DyslexiaFriendlyEditor({
  initialValue = '',
  onChange,
  placeholder = 'Commencez à écrire ou utilisez la saisie vocale...'
}: DyslexiaFriendlyEditorProps) {
  const { font, fontSize, lineSpacing, colorScheme, voiceInput } = useAccessibilityStore();
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const initialConfig = {
    namespace: 'DyslexiaFriendlyEditor',
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: []
  };

  useEffect(() => {
    if (transcript && onChange) {
      onChange(transcript);
    }
  }, [transcript, onChange]);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  const getBackgroundColor = () => {
    switch (colorScheme) {
      case 'cream':
        return '#f5f5dc';
      case 'blue':
        return '#e6f3ff';
      case 'yellow':
        return '#fafad2';
      default:
        return '#ffffff';
    }
  };

  return (
    <div className="relative">
      <LexicalComposer initialConfig={initialConfig}>
        <div
          className="min-h-[200px] p-4 rounded-lg border border-gray-200"
          style={{
            backgroundColor: getBackgroundColor(),
            fontFamily: font === 'opendyslexic' ? 'OpenDyslexic' : font,
            fontSize: `${fontSize}px`,
            lineHeight: lineSpacing
          }}
        >
          <PlainTextPlugin
            contentEditable={
              <ContentEditable
                className="outline-none min-h-[180px]"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400">
                {placeholder}
              </div>
            }
          />
          <HistoryPlugin />
        </div>
      </LexicalComposer>

      {voiceInput && browserSupportsSpeechRecognition && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={toggleListening}
            className={`p-2 rounded-full ${
              isListening ? 'bg-red-500' : 'bg-indigo-600'
            } text-white hover:opacity-90 transition-opacity`}
          >
            {isListening ? (
              <Square className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
          {isListening && (
            <span className="text-sm text-gray-600">Enregistrement en cours...</span>
          )}
        </div>
      )}
    </div>
  );
}