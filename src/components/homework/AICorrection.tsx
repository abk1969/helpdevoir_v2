import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface AICorrectionProps {
  homeworkId: string;
  question: string;
}

export default function AICorrection({ homeworkId, question }: AICorrectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [correction, setCorrection] = useState<string | null>(null);
  const { parent } = useAuthStore();
  const navigate = useNavigate();

  const isPremiumActive = parent?.subscription?.plan === 'premium' && parent?.subscription?.status === 'active';

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isPremiumActive) {
      toast.error('Veuillez passer à l\'offre Premium pour utiliser cette fonctionnalité');
      navigate('/subscription');
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error('Veuillez sélectionner un fichier PDF');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Le fichier est trop volumineux (max 10MB)');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('question', question);
    formData.append('homeworkId', homeworkId);

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/homework/correct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000
      });

      if (response.data?.correction) {
        setCorrection(response.data.correction);
        toast.success('Correction IA terminée !');
      } else {
        throw new Error('Réponse invalide du serveur');
      }
    } catch (error) {
      console.error('Erreur lors de la correction :', error);
      toast.error(
        error instanceof Error 
          ? `Erreur : ${error.message}`
          : 'Erreur lors de la correction IA'
      );
    } finally {
      setIsLoading(false);
      event.target.value = '';
    }
  };

  if (!isPremiumActive) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Correction IA Premium
        </h3>
        <p className="text-gray-600 mb-4">
          La correction automatique par IA est disponible uniquement avec l'abonnement Premium.
        </p>
        <button
          onClick={() => navigate('/subscription')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {parent?.subscription?.plan === 'premium' 
            ? 'Activer votre abonnement Premium'
            : 'Passer à Premium'}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Correction IA Premium
      </h3>
      
      {!correction && !isLoading && (
        <div>
          <p className="text-gray-600 mb-4">
            Téléchargez votre devoir pour obtenir une correction instantanée par IA.
          </p>
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Upload className="h-5 w-5 mr-2" />
            Télécharger le devoir (PDF uniquement)
            <input
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-600">
          <Loader className="h-5 w-5 animate-spin" />
          <span>Analyse en cours...</span>
        </div>
      )}

      {correction && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Correction :</h4>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-800 whitespace-pre-wrap">{correction}</p>
          </div>
          <button
            onClick={() => setCorrection(null)}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800"
          >
            Corriger un autre fichier
          </button>
        </div>
      )}
    </div>
  );
}