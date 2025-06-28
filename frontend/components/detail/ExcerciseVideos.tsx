'use client';

import { YoutubeVideo } from '@/types/exercise';
import { fetchYoutubeVideos } from '@/utils/fetchData';
import { ExternalLink } from 'lucide-react';
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

  // ✅ Single conditional render - Midudev style
  if (videos === null) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">
          Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos
        </h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-red-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">
        Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos
      </h3>

      {videos.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 mb-4">
            No videos found for {name}. Try searching on YouTube directly.
          </p>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} exercise`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:underline inline-flex items-center gap-1"
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
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={32} className="text-white" />
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg line-clamp-2 mb-2">{video.title}</h4>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 truncate">{video.channelName}</span>
                  <span className="text-gray-500">{video.viewCount}</span>
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