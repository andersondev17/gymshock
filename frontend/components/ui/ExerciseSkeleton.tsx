import { Skeleton } from "@/components/ui/skeleton";

export const ExerciseSkeleton = ({ count = 1 }: { count?: number }) => {
    // Si count es 1, mostramos un solo skeleton
    if (count === 1) {
        return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Skeleton className="w-full aspect-video" />
                <div className="p-4">
                    <div className="flex gap-2 mb-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        );
    }

    // Si count > 1, mostramos una grid con múltiples skeletons
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(count).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Skeleton className="w-full aspect-video" />
                    <div className="p-4">
                        <div className="flex gap-2 mb-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-3/4 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
};