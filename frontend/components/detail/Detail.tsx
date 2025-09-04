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

  return (
    <article className="flex flex-col lg:flex-row gap-8 p-6 items-start lg:items-center bg-white rounded-2xl shadow-lg border border-gray-100">
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

      <div className="flex-1 space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold capitalize mb-4 text-gymshock-dark-900">
            {name}
          </h1>
          <p className="text-gymshock-dark-600 text-lg leading-relaxed">
            Exercises keep you strong. <span className="capitalize font-semibold text-gymshock-primary-600">{name}</span> is one
            of the best exercises to target your <span className="font-semibold text-orange-600">{target}</span>. 
            It will help you improve your mood and gain energy.
          </p>
        </div>

        <div className="grid gap-4">
          {bodyPart && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gymshock-primary-200 hover:shadow-md transition-all duration-200">
              <div className="bg-gymshock-primary-100 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <UserCircle2 size={24} className="text-gymshock-primary-600" />
              </div>
              <div className="min-w-0">
                <div className="text-gymshock-primary-700 font-bold text-lg capitalize">
                  {bodyPart}
                </div>
                <div className="text-sm text-gymshock-dark-500 font-medium">
                  Body Part
                </div>
              </div>
            </div>
          )}
          
          {target && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-orange-200 hover:shadow-md transition-all duration-200">
              <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Box size={24} className="text-orange-600" />
              </div>
              <div className="min-w-0">
                <div className="text-orange-700 font-bold text-lg capitalize">
                  {target}
                </div>
                <div className="text-sm text-gymshock-dark-500 font-medium">
                  Target
                </div>
              </div>
            </div>
          )}
          
          {equipment && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gymshock-primary-200 hover:shadow-md transition-all duration-200">
              <div className="bg-gymshock-primary-50 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Dumbbell size={24} className="text-gymshock-primary-500" />
              </div>
              <div className="min-w-0">
                <div className="text-gymshock-primary-600 font-bold text-lg capitalize">
                  {equipment}
                </div>
                <div className="text-sm text-gymshock-dark-500 font-medium">
                  Equipment
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Detail;