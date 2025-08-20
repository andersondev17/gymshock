import { FITNESS_GOALS } from '@/constants/programs';

export const GoalTag = ({ goalId }: { goalId: string }) => {
    const goal = FITNESS_GOALS.find(g => g.id === goalId);
    if (!goal) {
        return (
            <span className="px-4 py-2 rounded-full text-sm bg-gymshock-dark-600/50 text-gymshock-dark-200 border border-gymshock-dark-500">
                {goalId}
            </span>
        );
    }

    const getGoalGradient = (goalId: string) => {
        const gradientMap: Record<string, string> = {
            muscle_gain: 'from-gymshock-primary-500 to-gymshock-primary-600',
            strength: 'from-gymshock-success-500 to-gymshock-success-600',
            endurance: 'from-gymshock-energy-500 to-gymshock-energy-600',
            weight_loss: 'from-gymshock-warning-500 to-gymshock-warning-600'
        };
        return gradientMap[goalId] || 'from-gymshock-dark-500 to-gymshock-dark-600';
    };

    return (
        <span aria-label={`Objetivo fitness: ${goal.label}`} className={`group px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getGoalGradient(goalId)} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-default`}>
            <span aria-hidden="true" className="text-lg group-hover:scale-110 transition-transform duration-300">{goal.emoji}</span>
            <span>{goal.label}</span>
        </span>
    );
};