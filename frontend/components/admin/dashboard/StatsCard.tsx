import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
    title: string;
    icon: React.ReactNode;
    value: number;
    description: string;
    loading: boolean;
    trend?: string;
}


const StatsCard = ({ title, icon, value, description, loading, trend }: StatsCardProps) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
                {loading ? (
                    <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4" />
                ) : (
                    value.toLocaleString()
                )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
                {trend && <span className="mr-1">{trend}</span>}
                {description}
            </p>
        </CardContent>
    </Card>
);

export default StatsCard;