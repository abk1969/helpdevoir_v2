import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../../types';
import { GraduationCap } from 'lucide-react';

interface StudentListProps {
  students: Student[];
}

export default function StudentList({ students }: StudentListProps) {
  const navigate = useNavigate();

  return (
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
  );
}