// src/components/detail/Detail.tsx
import Image from "next/image";

interface DetailProps {
  exerciseDetail: any;
}

const Detail: React.FC<DetailProps> = ({ exerciseDetail }) => {
  const { id, name, gifUrl, target, equipment, bodyPart } = exerciseDetail;
  
  // Log para depuración
  console.log('GIF URL:', gifUrl);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-row">
      {/* Usamos un div contenedor con posición relativa para la imagen */}
      <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg bg-white">
        {gifUrl ? (
          // Usamos unoptimized para GIFs, ya que Next.js Image no optimiza GIFs correctamente
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
      
      
      <div>
        <h3 className="text-2xl font-bold mb-4 text-center">{name}</h3>
      <div className="grid grid-cols-2 gap-4 w-full">
        
        <div className="flex flex-col items-center p-3 bg-red-100 rounded-lg">
          <span className="font-semibold text-red-600">{target}</span>
          <span className="text-sm text-gray-500">Target</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-blue-100 rounded-lg">
          <span className="font-semibold text-blue-600">{bodyPart}</span>
          <span className="text-sm text-gray-500">Body Part</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-green-100 rounded-lg col-span-2">
          <span className="font-semibold text-green-600">{equipment}</span>
          <span className="text-sm text-gray-500">Equipment</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Detail;