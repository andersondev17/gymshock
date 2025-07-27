import { CardTitle } from '@/components/ui/card';

interface Props {
    stepNumber: number;
    title: string;
}
export default function StepHeader({ stepNumber, title }: Props) {
    return (
        <CardTitle className="flex items-center gap-2 text-base md:text-lg lg:text-xl font-semibold">
            <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm md:text-base font-bold">
                {stepNumber}
            </span>
            {title}
        </CardTitle>
    );
}