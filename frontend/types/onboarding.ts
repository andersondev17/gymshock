// types/onboarding.ts

export interface FlowStep {
    type: 'welcome' | 'prediction' | 'feedback' | 'urgency';
    duration: number;
}

export interface RegionalStat {
    city: string;
    average: number;
    color: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}

export interface FlowConfig {
    steps: FlowStep[];
    content: {
        welcome: {
            greeting: string;
            subtitle: string;
            locationInfo: string;
            icon: string;
        };
        prediction: {
            title: string;
            question: string;
            options: number[];
            placeholder: string;
            hint: string;
            icon: string;
        };
        feedback: {
            title: string;
            subtitle: string;
            averageLabel: string;
            averageValue: number;
            aboveAverageText: string;
            belowAverageText: string;
            regionalStats: RegionalStat[];
            icon: string;
        };
        urgency: {
            title: string;
            subtitle: string;
            momentumTitle: string;
            momentumText: string;
            socialProof: string;
            ctaText: string;
            icon: string;
        };
    };
    country: {
        name: string;
        flag: string;
        code: string;
    };
    stats: {
        userCount: number;
        recentActivity: number;
    };
}

// Utility function for text interpolation
export const interpolateText = (template: string, variables: Record<string, string | number>): string => {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        const value = variables[key];
        return value !== undefined ? String(value) : match;
    });
};