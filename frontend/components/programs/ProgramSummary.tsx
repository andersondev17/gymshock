'use client';

import { Button } from '@/components/ui/button';
import { FITNESS_GOALS, FREQUENCY_OPTIONS, PROGRAM_LEVELS, TIME_OPTIONS } from '@/constants/programs';
import { useAuth } from '@/context/AuthProvider';
import { useProgramActions } from '@/hooks/useProgramActions';
import { Calendar, Clock, Target, Zap } from 'lucide-react';
import { useState } from 'react';
import { AuthMessage } from './index';

interface Props {
  level: keyof typeof PROGRAM_LEVELS;
  goals: string[];
  time: string;
  frequency: string;
  onCreate: () => void;
  isLoading?: boolean;
}

export function ProgramSummary({ 
  level, 
  goals, 
  time, 
  frequency, 
  onCreate, 
  isLoading = false 
}: Props) {
  const { user } = useAuth();
  const { saveProfile } = useProgramActions();
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  const levelData = PROGRAM_LEVELS[level];
  const timeData = TIME_OPTIONS.find(t => t.value === time);
  const goalData = goals.map(g => FITNESS_GOALS.find(fg => fg.id === g)!);
  const frequencyData = FREQUENCY_OPTIONS.find(f => f.value === frequency);

  const handleCreate = async () => {
    if (!user) {
      setShowAuthMessage(true);
      return;
    }

    try {
      const success = await saveProfile({
        level,
        goals,
        timeAvailable: time,
        frequency
      });

      if (success) {
        onCreate();
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (showAuthMessage && !user) {
    return <AuthMessage onBack={() => setShowAuthMessage(false)} />;
  }

  return (
    <main className="bg-gymshock-dark-800 backdrop-blur-md rounded-xl border border-gymshock-dark-700 p-6">
      <article className="text-center space-y-6">
        <header>
          <h3 className="text-2xl font-bold text-white mb-2">
            ¡Tu programa está listo! 🎯
          </h3>
          <p className="text-gymshock-dark-400 text-sm mb-4">
            Hemos diseñado el plan perfecto basado en tu perfil
          </p>
        </header>

        <section className="grid md:grid-cols-4 gap-4">
          <div className="bg-gymshock-dark-800 backdrop-blur-md border border-gymshock-dark-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-gymshock-primary-400" />
              <span className="font-medium text-white">Nivel</span>
            </div>
            <p className="text-gray-300 text-sm">{levelData.label}</p>
          </div>

          <div className="bg-gymshock-dark-800 backdrop-blur-md border border-gymshock-dark-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-gymshock-primary-400" />
              <span className="font-medium text-white">Objetivos</span>
            </div>
            <p className="text-gymshock-dark-400 text-sm">
              {goalData.map(g => g.label).join(', ')}
            </p>
          </div>

          <div className="bg-gymshock-dark-800 backdrop-blur-md border border-gymshock-dark-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-gymshock-primary-400" />
              <span className="font-medium text-white">Duración</span>
            </div>
            <p className="text-gymshock-dark-400 text-sm">{timeData?.label}</p>
          </div>

          <div className="bg-gymshock-dark-800 backdrop-blur-md border border-gymshock-dark-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-gymshock-primary-400" />
              <span className="font-medium text-white">Frecuencia</span>
            </div>
            <p className="text-gray-300 text-sm">
              {frequencyData?.label}
            </p>
          </div>
        </section>

        <Button
          size="lg"
          className="bg-transparent border-2 border-gymshock-primary-600 text-gymshock-primary-600 hover:bg-gymshock-primary-700 hover:text-white font-medium text-lg px-8 py-4 rounded-xl shadow-lg shadow-gymshock-primary-600/20 transition duration-300 ease-in-out hover:scale-105"
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gymshock-primary-600 border-t-transparent" />
              Creando...
            </span>
          ) : user ? (
            '🚀 Ver Mi Programa'
          ) : (
            '🚀 Crear Mi Programa'
          )}
        </Button>

        <p className="text-gymshock-dark-400 text-sm">
          {user
            ? 'Generaremos rutinas adaptadas a tu perfil en segundos'
            : 'Inicia sesión para guardar y acceder a tu programa personalizado'
          }
        </p>
      </article>
    </main>
  );
}