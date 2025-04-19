import { RecentActivity } from "@/constants";

const RecentActivityFeed = ({ loading }: { loading: boolean }) => {

    return (
        <div className="lg:col-span-3 bg-gradient-to-b from-gray-900 to-slate-800 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-bold">Recent Activity</h2>
                    <p className="text-sm text-gray-300">User interactions</p>
                </div>
                <button className="text-xs text-gray-300 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors">
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {RecentActivity.map(activity => (
                    <div key={activity.id} className="p-3 bg-white rounded-lg hover:bg-gray-100 text-gray-900 flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${activity.color} flex-center text-white`}>
                            {activity.initials}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">{activity.name}</p>
                            <p className="text-xs text-gray-500">
                                {activity.action}{activity.target && `: ${activity.target}`}
                            </p>
                        </div>
                        <div className="text-xs text-gray-400">2h ago</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivityFeed;