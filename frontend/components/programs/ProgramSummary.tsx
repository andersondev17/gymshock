'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FITNESS_GOALS, PROGRAM_LEVELS, TIME_OPTIONS } from '@/constants/programs';
import { Clock, Target, Zap } from 'lucide-react';

interface Props {
  level: keyof typeof PROGRAM_LEVELS;
  goals: string[];
  time: string;
  onCreate: () => void;
  isLoading?: boolean;
}

export default function ProgramSummary({ level, goals, time, onCreate, isLoading = false }: Props) {
  const levelData = PROGRAM_LEVELS[level];
  const timeData = TIME_OPTIONS.find(t => t.value === time);
  const goalData = goals.map(g => FITNESS_GOALS.find(fg => fg.id === g)!);

  return (
    <Card className="border-2 border-red-200 bg-red-50">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-base md:text-lg xl:text-xl font-bold text-gray-900 mb-2">
              ¡Tu programa está listo! 🎯
            </h3>
            <p className="text-gray-600 text-xs md:text-sm xl:text-lg">
              Hemos diseñado el plan perfecto basado en tu perfil
            </p>
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-3 gap-4 text-left ">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-red-600" />
                <span className="font-medium text-sm md:text-base xl:text-lg">Nivel</span>
              </div>
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">{levelData.label}</p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-red-600" />
                <span className="font-medium text-sm md:text-base xl:text-lg">Objetivos</span>
              </div>
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">
                {goalData.map(g => g.label).join(', ')}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-red-600" />
                <span className="font-medium text-sm md:text-base xl:text-lg">Duración</span>
              </div>
              <p className="text-xs md:text-sm lg:text-sm text-gray-600">{timeData?.label}</p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-sm md:text-base xl:text-lg font-semibold transition-all hover:scale-105"
            onClick={onCreate}
            disabled={isLoading}
          >
            {isLoading ? 'Creando...' : '🚀 Ver Mi Programa'}
          </Button>

          <p className="text-xs md:text-sm lg:text-sm text-gray-500">
            Generaremos rutinas adaptadas a tu perfil en segundos
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
