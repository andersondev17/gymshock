'use client';

import { YoutubeVideo } from '@/types/exercise';
import { fetchYoutubeVideos } from '@/utils/fetchData';
import { ExternalLink, Play } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ExerciseVideosProps {
  name: string;
}

const ExerciseVideos = ({ name }: ExerciseVideosProps) => {
  const [videos, setVideos] = useState<YoutubeVideo[] | null>(null);

  useEffect(() => {
    if (!name) return;
    
    fetchYoutubeVideos(name)
      .then(setVideos)
      .catch(() => setVideos([]));
  }, [name]);

  if (videos === null) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-gymshock-primary-600">
          Watch <span className="text-gymshock-dark-900 capitalize">{name}</span> Exercise Videos
        </h3>
        <div className="h-64 flex items-center justify-center bg-gymshock-dark-50 rounded-2xl border border-gymshock-dark-200">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-gymshock-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6 text-gymshock-primary-50">
        Watch <span className="text-gymshock-primary-500  capitalize">{name}</span> Exercise Videos
      </h3>

      {videos.length === 0 ? (
        <div className="bg-gymshock-dark-50 border border-gymshock-dark-200 p-6 rounded-2xl">
          <p className="text-gymshock-dark-600 mb-4">
            No videos found for <span className="font-semibold">{name}</span>. Try searching on YouTube directly.
          </p>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} exercise`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gymshock-primary-600 hover:text-gymshock-primary-700 font-medium inline-flex items-center gap-2 hover:underline transition-colors"
          >
            Search on YouTube <ExternalLink size={16} />
          </a>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map(video => (
            <a
              key={video.videoId}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-gymshock-primary-200"
            >
              <div className="relative aspect-video bg-gymshock-dark-100">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gymshock-primary-600 rounded-full p-3 shadow-lg">
                    <Play size={24} className="text-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded font-medium">
                  YouTube
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-lg line-clamp-2 mb-2 text-gymshock-dark-900 group-hover:text-gymshock-primary-600 transition-colors">
                  {video.title}
                </h4>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gymshock-dark-600 truncate font-medium">{video.channelName}</span>
                  <span className="text-gymshock-dark-500 bg-gymshock-dark-100 px-2 py-1 rounded-full text-xs">
                    {video.viewCount}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseVideos;