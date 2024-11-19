import React from 'react';
import { useStudentStore } from '../store/studentStore';
import { PlusCircle, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const students = useStudentStore((state) => state.getStudents());
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-2 text-gray-600">Gérez les devoirs et le suivi scolaire</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/students/add"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center space-x-4">
            <PlusCircle className="h-8 w-8 text-indigo-600" />
            <span className="text-lg font-medium text-gray-900">Ajouter un étudiant</span>
          </div>
        </Link>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Étudiants inscrits</h3>
                <p className="text-3xl font-bold text-indigo-600">{students.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {students.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Étudiants récents</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {students.map((student) => (
                <li 
                  key={student.id}
                  onClick={() => navigate(`/students/${student.id}`)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <GraduationCap className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">{student.firstName}</h3>
                          <p className="text-sm text-gray-500">{student.gradeLevel}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{student.age} ans</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}