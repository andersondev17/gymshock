
import { FlowConfig } from '@/types/onboarding';

export const COLOMBIA_FLOW_CONFIG: FlowConfig = {
    steps: [
        { type: 'welcome', duration: 2000 },    // ⚡ Dopamine hook
        { type: 'prediction', duration: 8000 }, // 🎯 Psychological challenge  
        { type: 'urgency', duration: 3000 }     // 🔥 Honest redirect
    ],
    content: {
        welcome: {
            greeting: '¡Bienvenido {name}! 🎉',
            subtitle: 'Eres nuestro atleta #{userCount}', // STATUS SIGNALING
            locationInfo: 'Comenzar',
            icon: 'trophy'
        },
        prediction: {
            title: 'Pregunta rápida 🧠',
            question: '¿Cuántas flexiones puedes hacer?',
            options: [10, 20, 30],
            placeholder: 'Otro',
            hint: 'La mayoría subestima su capacidad real en un 40%', // BEHAVIORAL PSYCHOLOGY
            icon: 'target'
        },
        feedback: {
            title: 'Perfecto',
            subtitle: '...',
            averageLabel: 'Promedio',
            averageValue: 18,
            aboveAverageText: 'Excelente punto de partida',
            belowAverageText: 'Perfecto para empezar',
            regionalStats: [],
            icon: 'zap'
        },
        urgency: {
            title: 'Encuentra tu Plan de Entreno',
            subtitle: 'En 4 pasos simples, diseñamos un plan que se adapte a ti',
            momentumTitle: '',
            momentumText: '',
            socialProof: '',
            ctaText: 'Crear mi plan personalizado',
            icon: 'clock'
        }
    },
    country: {
        name: 'Colombia',
        flag: '🇨🇴',
        code: 'CO'
    },
    stats: {
        userCount: 47291,
        recentActivity: 27
    }
};
export const SOUNDS = {
    SUCCESS: '/assets/sounds/positive-notification-alert-35.mp3',
    LEVEL_UP: '/assets/sounds/level-up-191997.mp3',
    NOTIFICATION: '/assets/sounds/new-notification-07-210334.mp3',
    HAPPY: '/assets/sounds/happyMessage.mp3'
} as const;


export const EMPOWERMENT_COPY = {
    encouragement: [
        'Tu única competencia eres tú ayer',
        'Cada repetición cuenta',
        'La fuerza nace de la constancia'
    ],
    celebration: [
        '¡Eres imparable!',
        'Esto es solo el comienzo',
        'Ya eres parte del cambio'
    ]
};

export const getFlowConfig = (): FlowConfig => {
    return COLOMBIA_FLOW_CONFIG;
};