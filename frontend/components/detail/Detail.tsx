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
      icon: <UserCircle2 size={24} className="text-gymshock-primary-600" />,
      name: bodyPart,
      label: "Body Part",
      bgColor: "bg-gymshock-primary-100",
      textColor: "text-gymshock-primary-700",
      borderColor: "border-gymshock-primary-200"
    },
    {
      icon: <Box size={24} className="text-orange-600" />,
      name: target,
      label: "Target", 
      bgColor: "bg-orange-100",
      textColor: "text-orange-700",
      borderColor: "border-orange-200"
    },
    {
      icon: <Dumbbell size={24} className="text-gymshock-primary-500" />,
      name: equipment,
      label: "Equipment",
      bgColor: "bg-gymshock-primary-50", 
      textColor: "text-gymshock-primary-600",
      borderColor: "border-gymshock-primary-200"
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 items-start lg:items-center bg-white rounded-2xl shadow-lg border border-gray-100">
      {/*IMAGEN CONTAINER  */}
      <div className="relative w-full lg:w-1/2 max-w-lg mx-auto lg:mx-0">
        <div className="relative w-full bg-gradient-to-br from-gymshock-dark-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <Image
            src={imageSrc}
            alt={`${name} exercise demonstration`}
            width={500}
            height={500}
            className="w-full h-auto object-contain p-4"
            priority
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="flex-1 space-y-6 max-w-2xl">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize mb-4 text-gymshock-dark-900">
            {name}
          </h2>
          <p className="text-gymshock-dark-600 text-lg leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold text-gymshock-primary-600">{name}</span> is one
            of the best exercises to target your <span className="font-semibold text-orange-600">{target}</span>. It will help you improve your
            mood and gain energy.
          </p>
        </div>

        <div className="grid gap-4">
          {extraDetails.map((item) => (
            <div 
              key={item.label} 
              className={`flex items-center gap-4 p-4 rounded-xl bg-white border ${item.borderColor} hover:shadow-md transition-all duration-200 hover:scale-[1.02]`}
            >
              <div className={`${item.bgColor} w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className={`${item.textColor} font-bold text-lg capitalize`}>
                  {item.name}
                </div>
                <div className="text-sm text-gymshock-dark-500 font-medium">
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