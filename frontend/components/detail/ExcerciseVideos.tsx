'use client';

import { ExerciseVideosProps, YoutubeVideo } from '@/types/exercise';
import { fetchData, youtubeOptions } from '@/utils/fetchData';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ExerciseVideos = ({ name }: ExerciseVideosProps) => {
  const [exerciseVideos, setExerciseVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExerciseVideos = async () => {
      if (!name) return;

      try {
        setLoading(true);
        const searchTerm = `${name} exercise`;
        const youtubeSearchUrl = `https://youtube-search-and-download.p.rapidapi.com/search?query=${searchTerm}`;
        
        const videosData = await fetchData<{ contents: any[] }>(youtubeSearchUrl, youtubeOptions);
        
        // Extract video information from the response
        const videos = videosData.contents
          ?.filter(item => item.type === 'video')
          ?.map(item => ({
            videoId: item.video.videoId,
            title: item.video.title,
            thumbnailUrl: item.video.thumbnails[0].url,
            channelName: item.video.author?.name || 'Unknown',
            viewCount: item.video.viewCountText || '0 views',
          }))
          ?.slice(0, 3) || [];
        
        setExerciseVideos(videos);
        setError(null);
      } catch (err) {
        console.error('Error fetching exercise videos:', err);
        setError('Could not load related videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseVideos();
  }, [name]);

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600" />
        </div>
      </div>
    );
  }

  if (error || exerciseVideos.length === 0) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos</h3>
        <p className="text-gray-600">
          {error || `No videos found for ${name}. Try searching on YouTube directly.`}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">
        Watch <span className="text-red-600 capitalize">{name}</span> Exercise Videos
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exerciseVideos.map((video, index) => (
          <a
            key={index}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="exercise-video bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <ExternalLink size={36} className="text-white" />
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-lg line-clamp-2 mb-2">{video.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{video.channelName}</p>
              <p className="text-xs text-gray-500">{video.viewCount}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExerciseVideos;