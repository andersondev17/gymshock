'use client';
import { GoalTag, NoProfileState, ProfileCard, RoleBadge } from '@/components/profile';
import { ProfileStatCard } from '@/components/profile/StatCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LoadingBar } from '@/components/ui/LoadingBar';
import { FREQUENCY_OPTIONS, PROGRAM_LEVELS, TIME_OPTIONS } from '@/constants/programs';
import { useAuth } from '@/context/AuthProvider';
import { getGreeting, getInitials } from '@/lib/utils';
import { programService } from '@/services/programService';
import { FitnessProfile } from '@/types/profile';
import { ArrowRight, Calendar, Clock, Flame, Mail, Sparkles, Target, TrendingUp, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<FitnessProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            const data = await programService.getProfile();
            setProfile(data);
        } catch (err) {
            console.error('Error fetching profile:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading) {
        return <LoadingBar />;
    }

    if (!profile) return <NoProfileState />;

    const levelConfig = PROGRAM_LEVELS[profile.level as keyof typeof PROGRAM_LEVELS];
    const timeConfig = TIME_OPTIONS.find(t => t.value === profile.timeAvailable);
    const frequencyConfig = FREQUENCY_OPTIONS.find(f => f.value === profile.frequency);

    return (
        <main className="min-h-screen bg-gymshock-hero relative">
            <h1 className="sr-only">Perfil de Usuario - {user?.name || user?.username}</h1>

            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('/assets/images/pattern.png')] opacity-15 bg-repeat" />
            <header className="relative">
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="flex flex-col lg:flex-row items-start gap-10">
                        {/* User Info */}
                        <div className="flex items-center gap-8">
                            <div className="relative group">
                                <Avatar className="w-32 h-32 border-4 border-gradient-to-br from-gymshock-primary-600 to-gymshock-energy-600 shadow-gymshock-brand">
                                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-gymshock-primary-600 to-gymshock-energy-600 text-white">
                                        {getInitials(user?.name || user?.username || 'U')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -inset-2 bg-gradient-to-br from-gymshock-primary-600/20 to-gymshock-energy-600/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />

                                <div className="absolute -bottom-2 -right-2 bg-gymshock-success-500 border-4 border-gymshock-dark-900 rounded-full w-8 h-8 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-white text-shadow-gymshock-white">
                                    {getGreeting()},{' '}
                                    <span className=" bg-gradient-to-r from-gymshock-primary-400 to-gymshock-energy-400 bg-clip-text text-transparent">
                                        {user?.name || user?.username}
                                    </span>
                                </h2>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <RoleBadge role={user?.role || 'user'} />
                                    <span className="text-gymshock-dark-300 text-sm md:text-base  flex items-center gap-2 px-3 py-1.5 bg-gymshock-dark-800/50 rounded-full backdrop-blur-sm border border-gymshock-dark-700">
                                        <Mail className="w-4 h-4" />
                                        {user?.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col sm:flex-row flex-wrap items-stretch  sm:items-center w-full gap-4 ">
                            <Link href="/programs" className='w-full sm:w-auto'>
                                <Button className="group bg-gradient-to-r from-gymshock-primary-600 to-gymshock-energy-600 hover:from-gymshock-primary-500 hover:to-gymshock-energy-500 text-white font-semibold px-6 py-3 rounded-xl shadow-gymshock-brand hover:shadow-gymshock-glow transition-all duration-300 w-full">
                                    <Target className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                    Renovar Evaluación
                                </Button>
                            </Link>
                            <Link href="/exercises">
                                <Button variant="outline" className="border-gymshock-dark-600 bg-gymshock-dark-800/30 backdrop-blur-sm text-white hover:bg-gymshock-dark-700/50 hover:border-gymshock-primary-600/50 transition-all duration-300 px-6 py-3 rounded-xl w-full">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Explorar Ejercicios
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <section className="relative max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Overview */}
                    <div className="lg:col-span-2 space-y-8">
                        <ProfileCard title="Tu Perfil Fitness" icon={<Zap className="w-5 h-5 text-gymshock-primary-400" />}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                                <ProfileStatCard
                                    icon={<span className="text-3xl">{levelConfig.icon}</span>}
                                    value={levelConfig.label}
                                    description="Nivel actual"
                                    variant="fitness"
                                    colorTheme="primary"
                                />
                                <ProfileStatCard
                                    icon={<Clock className="w-8 h-8 text-white" />}
                                    value={timeConfig?.label || ''}
                                    description="Por sesión"
                                    variant="fitness"
                                    colorTheme="energy"
                                />
                                <ProfileStatCard
                                    icon={<Calendar className="w-8 h-8 text-white" />}
                                    value={frequencyConfig?.label || ''}
                                    description="Por semana"
                                    variant="fitness"
                                    colorTheme="success"
                                />
                                <ProfileStatCard
                                    icon={<Trophy className="w-8 h-8 text-white" />}
                                    value={profile.daysSinceEvaluation || 0}
                                    description="Días activo"
                                    variant="fitness"
                                    colorTheme="warning"
                                />
                            </div>
                        </ProfileCard>
                        {/* Goals */}
                        <div className="mt-8 p-6 bg-gradient-to-br from-gymshock-dark-800/30 to-gymshock-dark-900/30 rounded-2xl border border-gymshock-dark-700/50 backdrop-blur-sm">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-lg">
                                <Target className="w-5 h-5 text-gymshock-primary-400" />
                                Objetivos de Entrenamiento
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {profile.goals.map((goalId) => (
                                    <GoalTag key={goalId} goalId={goalId} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-8">
                        <ProfileCard title="Estadísticas" icon={<TrendingUp className="w-5 h-5 text-gymshock-success-400" />}>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <ProfileStatCard
                                    icon={<Zap className="w-6 h-6 text-gymshock-primary-400" />}
                                    value={profile.stats?.totalWorkouts || 0}
                                    description="Entrenamientos"
                                    variant="stats"
                                    colorTheme="primary"
                                />
                                <ProfileStatCard
                                    icon={<Flame className="w-6 h-6 text-gymshock-warning-400" />}
                                    value={profile.stats?.currentStreak || 0}
                                    description="Racha actual"
                                    variant="stats"
                                    colorTheme="energy"
                                />
                                <ProfileStatCard
                                    icon={<Trophy className="w-6 h-6 text-gymshock-success-400" />}
                                    value="Pro"
                                    description="Estado"
                                    variant="stats"
                                    colorTheme="success"
                                    className="md:col-span-1 col-span-2 md:mx-0 mx-auto md:max-w-none max-w-48"
                                />
                            </div>
                        </ProfileCard>
                        <ProfileCard title="Acceso Rápido">
                            <div className="space-y-4">
                                <Link href="/exercises">
                                    <Button variant="outline" className="w-full justify-start bg-gymshock-dark-800/30 border-gymshock-dark-600/50 text-white hover:bg-gymshock-primary-600/20 hover:border-gymshock-primary-600/50 transition-all duration-300">
                                        <Zap className="w-4 h-4 mr-3 text-gymshock-primary-400" />
                                        Explorar Ejercicios
                                        <ArrowRight className="w-4 h-4 ml-auto" />
                                    </Button>
                                </Link>
                                <Link href="/programs">
                                    <Button variant="outline" className="w-full justify-start bg-gymshock-dark-800/30 border-gymshock-dark-600/50 text-white hover:bg-gymshock-energy-600/20 hover:border-gymshock-energy-600/50 transition-all duration-300">
                                        <Target className="w-4 h-4 mr-3 text-gymshock-energy-400" />
                                        Nuevo Programa
                                        <ArrowRight className="w-4 h-4 ml-auto" />
                                    </Button>
                                </Link>
                            </div>
                        </ProfileCard>
                    </aside>
                </div>
            </section>
        </main>
    );
}