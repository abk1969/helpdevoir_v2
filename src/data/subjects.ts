import { Book, Calculator, Microscope, Languages, Music, Palette, Globe, TestTube, Code } from 'lucide-react';
import { Subject, GradeLevel } from '../types';

type SubjectsByGrade = Record<GradeLevel, Subject[]>;

export const subjectsByGrade: SubjectsByGrade = {
  "CP": [
    { id: "fr-cp", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "CP" },
    { id: "math-cp", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "CP" },
    { id: "art-cp", name: "Arts Plastiques", icon: Palette, color: "bg-purple-600", gradeLevel: "CP" },
    { id: "decouverte-cp", name: "Découverte du Monde", icon: Globe, color: "bg-green-600", gradeLevel: "CP" }
  ],
  "CE1": [
    { id: "fr-ce1", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "CE1" },
    { id: "math-ce1", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "CE1" },
    { id: "art-ce1", name: "Arts Plastiques", icon: Palette, color: "bg-purple-600", gradeLevel: "CE1" },
    { id: "decouverte-ce1", name: "Découverte du Monde", icon: Globe, color: "bg-green-600", gradeLevel: "CE1" }
  ],
  "CE2": [
    { id: "fr-ce2", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "CE2" },
    { id: "math-ce2", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "CE2" },
    { id: "sciences-ce2", name: "Sciences", icon: TestTube, color: "bg-green-600", gradeLevel: "CE2" },
    { id: "anglais-ce2", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "CE2" }
  ],
  "CM1": [
    { id: "fr-cm1", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "CM1" },
    { id: "math-cm1", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "CM1" },
    { id: "sciences-cm1", name: "Sciences", icon: TestTube, color: "bg-green-600", gradeLevel: "CM1" },
    { id: "anglais-cm1", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "CM1" },
    { id: "histoire-cm1", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "CM1" }
  ],
  "CM2": [
    { id: "fr-cm2", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "CM2" },
    { id: "math-cm2", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "CM2" },
    { id: "sciences-cm2", name: "Sciences", icon: TestTube, color: "bg-green-600", gradeLevel: "CM2" },
    { id: "anglais-cm2", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "CM2" },
    { id: "histoire-cm2", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "CM2" }
  ],
  "6ème": [
    { id: "fr-6", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "6ème" },
    { id: "math-6", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "6ème" },
    { id: "svt-6", name: "SVT", icon: Microscope, color: "bg-green-600", gradeLevel: "6ème" },
    { id: "anglais-6", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "6ème" },
    { id: "histoire-6", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "6ème" },
    { id: "musique-6", name: "Musique", icon: Music, color: "bg-pink-600", gradeLevel: "6ème" }
  ],
  "5ème": [
    { id: "fr-5", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "5ème" },
    { id: "math-5", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "5ème" },
    { id: "svt-5", name: "SVT", icon: Microscope, color: "bg-green-600", gradeLevel: "5ème" },
    { id: "physique-5", name: "Physique-Chimie", icon: TestTube, color: "bg-purple-600", gradeLevel: "5ème" },
    { id: "anglais-5", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "5ème" },
    { id: "histoire-5", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "5ème" }
  ],
  "4ème": [
    { id: "fr-4", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "4ème" },
    { id: "math-4", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "4ème" },
    { id: "svt-4", name: "SVT", icon: Microscope, color: "bg-green-600", gradeLevel: "4ème" },
    { id: "physique-4", name: "Physique-Chimie", icon: TestTube, color: "bg-purple-600", gradeLevel: "4ème" },
    { id: "anglais-4", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "4ème" },
    { id: "histoire-4", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "4ème" }
  ],
  "3ème": [
    { id: "fr-3", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "3ème" },
    { id: "math-3", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "3ème" },
    { id: "svt-3", name: "SVT", icon: Microscope, color: "bg-green-600", gradeLevel: "3ème" },
    { id: "physique-3", name: "Physique-Chimie", icon: TestTube, color: "bg-purple-600", gradeLevel: "3ème" },
    { id: "anglais-3", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "3ème" },
    { id: "histoire-3", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "3ème" }
  ],
  "Seconde": [
    { id: "fr-2", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "Seconde" },
    { id: "math-2", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "Seconde" },
    { id: "svt-2", name: "SVT", icon: Microscope, color: "bg-green-600", gradeLevel: "Seconde" },
    { id: "physique-2", name: "Physique-Chimie", icon: TestTube, color: "bg-purple-600", gradeLevel: "Seconde" },
    { id: "anglais-2", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "Seconde" },
    { id: "histoire-2", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "Seconde" },
    { id: "nsi-2", name: "NSI", icon: Code, color: "bg-indigo-600", gradeLevel: "Seconde" }
  ],
  "Première": [
    { id: "fr-1", name: "Français", icon: Book, color: "bg-blue-600", gradeLevel: "Première" },
    { id: "math-1", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "Première" },
    { id: "svt-1", name: "SVT", icon: Microscope, color: "bg-green-600", gradeLevel: "Première" },
    { id: "physique-1", name: "Physique-Chimie", icon: TestTube, color: "bg-purple-600", gradeLevel: "Première" },
    { id: "anglais-1", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "Première" },
    { id: "histoire-1", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "Première" },
    { id: "nsi-1", name: "NSI", icon: Code, color: "bg-indigo-600", gradeLevel: "Première" }
  ],
  "Terminale": [
    { id: "philo-t", name: "Philosophie", icon: Book, color: "bg-blue-600", gradeLevel: "Terminale" },
    { id: "math-t", name: "Mathématiques", icon: Calculator, color: "bg-red-600", gradeLevel: "Terminale" },
    { id: "svt-t", name: "SVT", icon: Microscope, color: "bg-green-600", gradeLevel: "Terminale" },
    { id: "physique-t", name: "Physique-Chimie", icon: TestTube, color: "bg-purple-600", gradeLevel: "Terminale" },
    { id: "anglais-t", name: "Anglais", icon: Languages, color: "bg-yellow-600", gradeLevel: "Terminale" },
    { id: "histoire-t", name: "Histoire-Géographie", icon: Globe, color: "bg-orange-600", gradeLevel: "Terminale" },
    { id: "nsi-t", name: "NSI", icon: Code, color: "bg-indigo-600", gradeLevel: "Terminale" }
  ]
};