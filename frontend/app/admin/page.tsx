'use client';

import PopularExercisesChart from "@/components/admin/dashboard/PopularExercisesChart";
import RecentActivityFeed from "@/components/admin/dashboard/RecentActivityFeed";
import StatsCard from "@/components/admin/dashboard/StatsCard";
import { Activity, Dumbbell, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

// Dashboard summary interface
interface DashboardSummary {
  totalExercises: number;
  totalUsers: number;
  totalBodyParts: number;
  recentSearches: number;
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalExercises: 0,
    totalUsers: 0,
    totalBodyParts: 0,
    recentSearches: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simular retardo de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setSummary({
          totalExercises: 1342,
          totalUsers: 157,
          totalBodyParts: 8,
          recentSearches: 547
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-gray-400 ">
            Overview of your GymShock platform
          </p>
        </div>
        <button className="bg-gradient-to-r from-red-600 to-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-red-600/20 transition-all flex items-center gap-2 font-medium">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Weekly Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Exercises"
          icon={<Dumbbell className="h-5 w-5" />}
          value={summary.totalExercises}
          description="from last month"
          trend="+20"
          loading={loading}
        />
        
        <StatsCard
          title="Active Users"
          icon={<Users className="h-5 w-5" />}
          value={summary.totalUsers}
          description="from last week"
          trend="+12%"
          loading={loading}
        />
        
        <StatsCard
          title="Body Parts"
          icon={<Activity className="h-5 w-5" />}
          value={summary.totalBodyParts}
          description="categories available"
          loading={loading}
        />
        
        <StatsCard
          title="Recent Searches"
          icon={<TrendingUp className="h-5 w-5" />}
          value={summary.recentSearches}
          description="from last month"
          trend="+18%"
          loading={loading}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <PopularExercisesChart loading={loading} />
        <RecentActivityFeed  />
      </div>
    </div>
  );
}