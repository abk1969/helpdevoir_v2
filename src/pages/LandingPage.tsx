import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, GraduationCap, BookOpen, Brain, Star } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Essentiel",
      price: "9.99",
      period: "mois",
      color: "bg-blue-600",
      features: [
        "1 enfant",
        "Suivi des devoirs",
        "Rappels par email",
        "Support par email"
      ]
    },
    {
      name: "Famille",
      price: "19.99",
      period: "mois",
      color: "bg-indigo-600",
      popular: true,
      features: [
        "3 enfants",
        "Suivi des devoirs",
        "Rappels par email et SMS",
        "Support prioritaire",
        "Partage avec les enseignants",
        "Statistiques détaillées"
      ]
    },
    {
      name: "Premium",
      price: "29.99",
      period: "mois",
      color: "bg-purple-600",
      features: [
        "Enfants illimités",
        "Toutes les fonctionnalités Famille",
        "Tutorat en ligne",
        "Ressources pédagogiques",
        "Support 24/7",
        "Accès API"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="pt-20 pb-16 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Help Devoir
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          La solution complète pour accompagner la réussite scolaire de vos enfants
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Commencer gratuitement
        </button>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivi personnalisé</h3>
              <p className="text-gray-600">Accompagnement adapté au niveau de chaque enfant</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organisation efficace</h3>
              <p className="text-gray-600">Gestion simple des devoirs et du planning</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progression continue</h3>
              <p className="text-gray-600">Suivi des progrès et statistiques détaillées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Choisissez votre formule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg shadow-lg bg-white ${
                  plan.popular ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white">
                      <Star className="h-4 w-4 mr-1" />
                      Populaire
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}€</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/register')}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium ${plan.color} hover:opacity-90 transition-opacity`}
                  >
                    Choisir {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à accompagner la réussite de vos enfants ?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Rejoignez des milliers de parents qui font confiance à Help Devoir
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>
  );
}