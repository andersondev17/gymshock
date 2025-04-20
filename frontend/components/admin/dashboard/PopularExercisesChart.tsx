import { useState } from 'react';

const PopularExercisesChart = ({ loading }: { loading: boolean }) => {
    const [timeRange, setTimeRange] = useState('30d');
    const chartColors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo'];
    const chartData = ['Push-ups', 'Bench', 'Squats', 'Lunges', 'Deadlift', 'Pull-ups', 'Plank'];
    const yAxisLabels = [0, 25, 50, 75];

    return (
        <div className="lg:col-span-4 bg-gradient-to-b from-gray-900 to-slate-800 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-bold">Popular Exercises</h2>
                    <p className="text-sm text-gray-300">Last 30 days</p>
                </div>
                <select
                    className="bg-white/10 border border-white/20 text-gray-300 text-sm rounded-lg p-2"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    {['30d', '7d', '24h'].map(option => (
                        <option key={option} value={option}>Last {option}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="h-64 flex-center">
                    <div className="animate-spin rounded-full items-center justify-center h-12 w-12 border-t-2 border-b-2 border-red-500" />
                </div>
            ) : (
                <div className="h-64 relative mt-8">
                    {yAxisLabels.map((label, i) => (
                        <div key={label} className="absolute left-0 right-0" style={{ bottom: `${i * 25}%` }}>
                            <div className="h-px bg-gray-700" />
                            <div className="text-xs text-gray-400 transform -translate-y-2">{label}</div>
                        </div>
                    ))}

                    <div className="grid grid-cols-7 gap-4 h-full pl-5 pt-1 pb-6">
                        {chartData.map((item, i) => {
                            const value = 70 - i * 5;
                            return (
                                <div key={item} className="flex flex-col items-center justify-end h-full">
                                    <div
                                        className={`bg-gradient-to-t from-${chartColors[i]}-600 to-${chartColors[i]}-500 rounded-t-md w-full`}
                                        style={{ height: `${value}%` }}
                                    >
                                        <div className="text-xs text-white font-medium text-center mt-1 opacity-80">
                                            {value}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-300 mt-2 text-center">{item}</div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopularExercisesChart;