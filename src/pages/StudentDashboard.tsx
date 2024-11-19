import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudentStore } from '../store/studentStore';
import { useHomeworkStore } from '../store/homeworkStore';
import { useAccessibilityStore } from '../store/accessibilityStore';
import { subjectsByGrade } from '../data/subjects';
import DyslexiaSupport from '../components/accessibility/DyslexiaSupport';
import { Brain } from 'lucide-react';

export default function StudentDashboard() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const getStudents = useStudentStore((state) => state.getStudents);
  const getHomeworksBySubject = useHomeworkStore((state) => state.getHomeworksBySubject);
  const { isDyslexiaMode } = useAccessibilityStore();
  const student = getStudents().find(s => s.id === studentId);

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Étudiant non trouvé</h2>
      </div>
    );
  }

  const subjects = subjectsByGrade[student.gradeLevel];

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de bord de {student.firstName}
        </h1>
        <p className="mt-2 text-gray-600">
          {student.gradeLevel} - {student.age} ans
        </p>
      </header>

      <DyslexiaSupport />

      {/* Bouton Parcours Dyslexie */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate(`/students/${studentId}/dyslexia`)}
          className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Brain className="h-5 w-5 mr-2" />
          Accéder au parcours dyslexie
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
        isDyslexiaMode ? 'font-dyslexic' : ''
      }`}>
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const homeworkCount = getHomeworksBySubject(studentId!, subject.id).length;
          
          return (
            <button
              key={subject.id}
              onClick={() => navigate(`/students/${studentId}/subjects/${subject.id}`)}
              className={`${subject.color} p-6 rounded-lg shadow-md text-white hover:opacity-90 transition-opacity w-full text-left relative group`}
            >
              <div className="flex items-center space-x-4">
                <Icon size={24} />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{subject.name}</h3>
                  <p className="text-sm opacity-90">
                    {homeworkCount > 0 
                      ? `${homeworkCount} devoir${homeworkCount > 1 ? 's' : ''}`
                      : 'Aucun devoir'
                    }
                  </p>
                </div>
                {homeworkCount > 0 && (
                  <span className="absolute top-4 right-4 bg-white text-gray-900 rounded-full h-8 w-8 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                    {homeworkCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}