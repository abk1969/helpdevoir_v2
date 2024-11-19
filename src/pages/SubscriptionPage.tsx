import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { CheckCircle2, Star, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const plans = [
  {
    id: 'essential',
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
    id: 'family',
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
    id: 'premium',
    name: "Premium",
    price: "29.99",
    period: "mois",
    color: "bg-purple-600",
    features: [
      "Enfants illimités",
      "Toutes les fonctionnalités Famille",
      "Correction IA des devoirs",
      "Tutorat en ligne",
      "Ressources pédagogiques",
      "Support 24/7",
      "Accès API"
    ]
  }
];

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const { parent, updateSubscription } = useAuthStore();

  const handleSubscribe = async (planId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateSubscription({
        plan: planId as 'essential' | 'family' | 'premium',
        status: 'active'
      });
      
      toast.success('Abonnement activé avec succès !');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Erreur lors de l\'activation de l\'abonnement');
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choisissez votre formule
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sélectionnez l'abonnement qui correspond le mieux à vos besoins et profitez de toutes les fonctionnalités de Help Devoir
          </p>
        </div>

        {parent?.subscription && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-800">
              Vous avez déjà un abonnement {parent.subscription.plan}. Changer de formule mettra à jour votre abonnement.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
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
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium ${plan.color} hover:opacity-90 transition-opacity`}
                >
                  {parent?.subscription?.plan === plan.id
                    ? 'Abonnement actuel'
                    : 'Choisir cette formule'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Tous les prix sont en euros TTC. Vous pouvez annuler votre abonnement à tout moment.
          </p>
        </div>
      </div>
    </div>
  );
}