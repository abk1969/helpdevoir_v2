import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudentStore } from '../store/studentStore';
import { useHomeworkStore } from '../store/homeworkStore';
import { subjectsByGrade } from '../data/subjects';
import { Share2, Plus, CheckCircle } from 'lucide-react';
import AICorrection from '../components/homework/AICorrection';
import FileUpload from '../components/homework/FileUpload';
import ShareModal from '../components/homework/ShareModal';
import toast from 'react-hot-toast';

export default function SubjectHomework() {
  const { studentId, subjectId } = useParams();
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<string | null>(null);
  const [showNewHomeworkForm, setShowNewHomeworkForm] = useState(false);

  const getStudents = useStudentStore((state) => state.getStudents);
  const { homeworks, addHomework, toggleHomework } = useHomeworkStore();

  const student = getStudents().find(s => s.id === studentId);
  const subject = student?.subjects.find(s => s.id === subjectId);
  const subjectHomeworks = homeworks.filter(
    hw => hw.studentId === studentId && hw.subjectId === subjectId
  );

  const [newHomework, setNewHomework] = useState({
    title: '',
    description: '',
    dueDate: '',
    attachments: []
  });

  if (!student || !subject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Matière non trouvée</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Retour
        </button>
      </div>
    );
  }

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHomework.title || !newHomework.dueDate) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    addHomework({
      ...newHomework,
      completed: false,
      studentId: studentId!,
      subjectId: subjectId!,
      attachments: []
    });

    setNewHomework({
      title: '',
      description: '',
      dueDate: '',
      attachments: []
    });
    setShowNewHomeworkForm(false);
    toast.success('Devoir ajouté avec succès !');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {subject.name} - {student.firstName}
          </h1>
          <p className="text-gray-600">{student.gradeLevel}</p>
        </div>
        <button
          onClick={() => setShowNewHomeworkForm(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un devoir
        </button>
      </div>

      {showNewHomeworkForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Nouveau devoir</h2>
          <form onSubmit={handleSubmitHomework} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                value={newHomework.title}
                onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newHomework.description}
                onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date limite
              </label>
              <input
                type="date"
                value={newHomework.dueDate}
                onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <FileUpload
              onFileSelect={(attachments) =>
                setNewHomework({ ...newHomework, attachments })
              }
            />

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewHomeworkForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {subjectHomeworks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">Aucun devoir pour le moment</p>
          </div>
        ) : (
          subjectHomeworks.map((homework) => (
            <div
              key={homework.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {homework.title}
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedHomework(homework.id);
                        setShowShareModal(true);
                      }}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-gray-600">{homework.description}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    À rendre le : {new Date(homework.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => toggleHomework(homework.id)}
                  className={`ml-4 p-2 rounded-full ${
                    homework.completed
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <CheckCircle className="h-6 w-6" />
                </button>
              </div>

              {homework.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Fichiers joints :</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {homework.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <AICorrection
                homeworkId={homework.id}
                question={`Veuillez corriger ce devoir de ${subject.name} avec le titre "${homework.title}". ${homework.description}`}
              />
            </div>
          ))
        )}
      </div>

      {showShareModal && selectedHomework && (
        <ShareModal
          homework={homeworks.find(h => h.id === selectedHomework)!}
          onClose={() => {
            setShowShareModal(false);
            setSelectedHomework(null);
          }}
        />
      )}
    </div>
  );
}