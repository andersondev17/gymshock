import { exercises } from "@/constants/index";
import { ArrowRight } from "lucide-react";
const AppPreview = () => {

    return (
        <div className="flex-1 max-w-md relative rounded-2xl">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
                <div className="bg-red-600 p-4">
                    <div className="flex items-center text-white gap-2">
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-3 w-3 rounded-full bg-white/[0.4]" />
                            ))}
                        </div>
                        <span className="text-sm ml-auto">GymShock App</span>
                    </div>
                </div>

                <div className="p-5 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold">Today's Workout</h3>
                        <span className="text-gray-500">June 15</span>
                    </div>

                    <div className="space-y-3">
                        {exercises.map((exercise, index) => (
                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg gap-3">
                                <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center">
                                    {exercise.emoji}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{exercise.name}</h4>
                                    <p className="text-xs text-gray-500">
                                        {exercise.area} • {exercise.sets}
                                    </p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-red-600/10 flex items-center justify-center">
                                    <ArrowRight className="h-4 w-4 text-red-600" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow border border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="bg-red-100 p-2 rounded-full">🔥</div>
                    <div>
                        <p className="text-xs text-gray-500">Streak</p>
                        <p className="font-bold">7 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AppPreview;