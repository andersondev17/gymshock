export const PROGRAM_LEVELS = {
    beginner: {
        label: 'Principiante',
        description: 'Soy nuevo o retomando después de una pausa larga',
        icon: '🎯',
        color: 'from-green-500 to-emerald-600',
        maxDuration: 30,
        sessionsPerWeek: 3,
        restTime: 90,
        features: [
            'Movimientos básicos y seguros',
            'Construcción de hábitos',
            'Técnica correcta',
            'Progresión gradual'
        ]
    },
    intermediate: {
        label: 'Intermedio',
        description: 'Ya entreno y quiero mejorar mi desempeño',
        icon: '⚡',
        color: 'from-blue-500 to-cyan-600',
        maxDuration: 45,
        sessionsPerWeek: 4,
        restTime: 60,
        features: [
            'Rutinas más intensas',
            'Ejercicios compuestos',
            'Variedad en entrenamientos',
            'Metas específicas'
        ]
    },
    advanced: {
        label: 'Avanzado/Atleta',
        description: 'Soy constante y quiero llevar mi entrenamiento al siguiente nivel',
        icon: '🏆',
        color: 'from-purple-500 to-violet-600',
        maxDuration: 60,
        sessionsPerWeek: 5,
        restTime: 45,
        features: [
            'Técnicas avanzadas',
            'Periodización',
            'Especialización',
            'Rendimiento máximo'
        ]
    }
} as const;

export const FITNESS_GOALS = [
    {
        id: 'fat-loss',
        label: 'Perder peso',
        emoji: '🔥',
        color: 'bg-red-100 text-red-600',
        description: 'Quemar grasa y reducir peso corporal'
    },
    {
        id: 'muscle-gain',
        label: 'Ganar músculo',
        emoji: '💪',
        color: 'bg-blue-100 text-blue-600',
        description: 'Aumentar masa muscular y fuerza'
    },
    {
        id: 'endurance',
        label: 'Mejorar resistencia',
        emoji: '🏃',
        color: 'bg-green-100 text-green-600',
        description: 'Aumentar capacidad cardiovascular'
    },
    {
        id: 'toning',
        label: 'Tonificar cuerpo',
        emoji: '✨',
        color: 'bg-purple-100 text-purple-600',
        description: 'Definir músculos y mejorar forma'
    },
    {
        id: 'health',
        label: 'Mantener salud general',
        emoji: '❤️',
        color: 'bg-pink-100 text-pink-600',
        description: 'Bienestar general y calidad de vida'
    },
    {
        id: 'sports',
        label: 'Preparación deportiva',
        emoji: '🏆',
        color: 'bg-yellow-100 text-yellow-600',
        description: 'Rendimiento específico para deportes'
    }
] as const;

export const FREQUENCY_OPTIONS = [
    {
        value: '1x',
        label: '1x por semana',
        sessions: 1,
        description: 'Mantenimiento básico',
        minDuration: 45,
        maxDuration: 60,
        recommended: ['beginner']
    },
    {
        value: '2x',
        label: '2x por semana',
        sessions: 2,
        description: 'Progreso constante',
        minDuration: 30,
        maxDuration: 45,
        recommended: ['beginner', 'intermediate']
    },
    {
        value: '3x',
        label: '3x por semana',
        sessions: 3,
        description: 'Desarrollo efectivo',
        minDuration: 30,
        maxDuration: 45,
        recommended: ['intermediate']
    },
    {
        value: '4x+',
        label: '4x o más por semana',
        sessions: 4,
        description: 'Máximo progreso',
        minDuration: 30,
        maxDuration: 60,
        recommended: ['intermediate', 'advanced']
    }
] as const;

export const TIME_OPTIONS = [
    {
        value: '20-30',
        label: '20-30 minutos',
        recommended: 'beginner',
        description: 'Perfecto para empezar'
    },
    {
        value: '30-45',
        label: '30-45 minutos',
        recommended: 'intermediate',
        description: 'Equilibrio ideal'
    },
    {
        value: '45-60',
        label: '45-60 minutos',
        recommended: 'advanced',
        description: 'Entrenamientos completos'
    },
    {
        value: '60+',
        label: 'Más de 60 minutos',
        recommended: 'advanced',
        description: 'Máximo rendimiento'
    }
] as const;

export const VALIDATION_RULES = {
    MIN_GOALS: 1,
    MAX_GOALS: 3,
    MIN_SESSION_DURATION: 15,
    MAX_SESSION_DURATION: 120,
    MIN_PROGRAM_DURATION: 2,
    MAX_PROGRAM_DURATION: 52
} as const;

export type ProgramLevel = keyof typeof PROGRAM_LEVELS;
export type FitnessGoal = typeof FITNESS_GOALS[number];
export type FrequencyOption = typeof FREQUENCY_OPTIONS[number];
