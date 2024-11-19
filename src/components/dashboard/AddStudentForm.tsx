import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GradeLevel } from '../../types';
import { useStudentStore } from '../../store/studentStore';
import toast from 'react-hot-toast';

const gradeLevels: GradeLevel[] = [
  "CP", "CE1", "CE2", "CM1", "CM2",
  "6ème", "5ème", "4ème", "3ème",
  "Seconde", "Première", "Terminale"
];

const studentSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  age: z.number().min(6).max(18),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  gradeLevel: z.enum(gradeLevels as [string, ...string[]])
});

type StudentFormData = z.infer<typeof studentSchema>;

export default function AddStudentForm() {
  const addStudent = useStudentStore((state) => state.addStudent);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema)
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      addStudent(data);
      toast.success(`${data.firstName} a été ajouté avec succès !`);
      reset();
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'ajout de l'étudiant");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Ajouter un étudiant</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            {...register('firstName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Âge
          </label>
          <input
            type="number"
            {...register('age', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email (optionnel pour les moins de 18 ans)
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700">
            Niveau scolaire
          </label>
          <select
            {...register('gradeLevel')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          >
            <option value="">Sélectionner un niveau</option>
            {gradeLevels.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          {errors.gradeLevel && (
            <p className="mt-1 text-sm text-red-600">{errors.gradeLevel.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Ajout en cours..." : "Ajouter l'étudiant"}
        </button>
      </form>
    </div>
  );
}