// src/components/detail/Detail.tsx
import { Box, Dumbbell, UserCircle2 } from "lucide-react";
import Image from "next/image";

interface DetailProps {
  exerciseDetail: {
    name: string;
    gifUrl: string;
    target: string;
    equipment: string;
    bodyPart: string;
  };
}

const Detail: React.FC<DetailProps> = ({ exerciseDetail }) => {
  const { name, gifUrl, target, equipment, bodyPart } = exerciseDetail;

  const extraDetails = [
    {
      icon: <UserCircle2 size={24} className="text-red-500" />,
      name: bodyPart,
      label: "Body Part",
      bgColor: "bg-red-100",
      textColor: "text-red-600"
    },
    {
      icon: <Box size={24} className="text-blue-500" />,
      name: target,
      label: "Target",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      icon: <Dumbbell size={24} className="text-green-500" />,
      name: equipment,
      label: "Equipment",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 items-center">
      {/* Exercise GIF */}
      <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg">
        {gifUrl ? (
          <Image
            src={gifUrl}
            alt={name}
            fill
            unoptimized
            style={{ objectFit: 'contain' }}
            priority
            className="detail-image"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Image not available</p>
          </div>
        )}
      </div>

      {/* Exercise Information */}
      <div className="flex flex-col gap-6 max-w-xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize">{name}</h2>
        
        <p className="text-gray-700 text-lg">
          Exercises keep you strong. <span className="capitalize">{name}</span> is one
          of the best exercises to target your {target}. It will help you improve your
          mood and gain energy.
        </p>

        {/* Detail Items */}
        <div className="flex flex-col gap-6 mt-4">
          {extraDetails.map((item) => (
            <div key={item.name} className="flex items-center gap-4">
              <div className={`${item.bgColor} w-16 h-16 rounded-full flex items-center justify-center`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className={`${item.textColor} text-lg font-semibold capitalize`}>{item.name}</span>
                <span className="text-sm text-gray-500">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;