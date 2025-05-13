import { Box, Dumbbell, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DetailProps {
  exerciseDetail: {
    name: string;
    gifUrl?: string;
    target?: string;
    equipment?: string;
    bodyPart?: string;
    id?: string;
  };
}

const Detail: React.FC<DetailProps> = ({ exerciseDetail }) => {
  const { name, gifUrl, target, equipment, bodyPart, id } = exerciseDetail;
  const [imgError, setImgError] = useState(false);

  const imageSrc = imgError 
    ? '/assets/images/exercise-placeholder.png'
    : gifUrl || `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}/gif`;

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
    <div className="flex flex-col lg:flex-row gap-8 p-6 items-start lg:items-center">
      {/*IMAGEN CONTAINER  */}
      <div className="relative w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
        <div className="relative w-full bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={imageSrc}
            alt={`${name} exercise demonstration`}
            width={500}
            height={500}
            className="w-full h-auto object-contain"
            priority
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="flex-1 space-y-6 max-w-2xl">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize mb-4">
            {name}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold">{name}</span> is one
            of the best exercises to target your {target}. It will help you improve your
            mood and gain energy.
          </p>
        </div>

        <div className="grid gap-4">
          {extraDetails.map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className={`${item.bgColor} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className={`${item.textColor} font-semibold capitalize`}>
                  {item.name}
                </div>
                <div className="text-sm text-gray-500">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;