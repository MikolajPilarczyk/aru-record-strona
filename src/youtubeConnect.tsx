
import React, { useEffect, useState } from 'react';
import { createClient } from '@sanity/client'
import he from 'he';

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}

const API_SANITY = import.meta.env.VITE_SANITY_WRITE_TOKEN;
const client = createClient({
  projectId: 'qq5p1kty',
  dataset: 'production',
  useCdn: false,
  token: API_SANITY, // Token z uprawnieniami Editor/Admin
  apiVersion: '2024-03-08',
})



const LatestVideos: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = 'UCmyO_-MSJSW3m1kyJqg5YvQ';


  const [videosFromDataBase, setVideosFromDataBase] = useState<any[]>([]);
  
    useEffect(() => {
      client.fetch('*[_type == "video"]{_id,videoID,title,thumbnailsUrl}')
        .then(setVideosFromDataBase)
        .catch(console.error);
    }, []);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Używamy endpointu 'search', aby pobrać najnowsze filmy (order=date)
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`
        );
        const data = await response.json();
        setVideos(data.items || []);
        setLoading(false);
      } catch (error) {
        console.error("Błąd podczas pobierania filmów:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);
  useEffect(() => {
    if (videos.length > 0) {
      const saveToSanity = async () => {
        const transaction = client.transaction();
        
        const itemsToSave = videos.slice(0, 5);
  
        itemsToSave.forEach((video, index) => {
          transaction.createOrReplace({
            _id: `video-${index + 1}`, 
            _type: 'video',
            videoID: video.id.videoId,
            title: he.decode(video.snippet.title),
            thumbnailsUrl: video.snippet.thumbnails.medium.url 
          });
        });
  
        try {
          await transaction.commit();
          console.log('Zapisano pomyślnie 5 filmów w Sanity');
        } catch (err) {
          console.error('Błąd zapisu do Sanity:', err);
        }
      };
  
      saveToSanity();
    }
  }, [videos]);

  if (loading) return <p>Ładowanie filmów...</p>;

  return (
        <section id="voices" className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-800 overflow-hidden sm:w-screen px-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasz Kanał na YouTube</h2>
            <div className="lg:w-120   h-1 bg-gradient-to-r from-cyan-500 to-red-500 mx-auto float-left mb-5 w-70" />
            <p className="text-gray-400 mt-4 max-w-2xl text-left clear-both">
              Sprawdźcie nasz kanał na YouTubie oto nasze ostatnie publikacje
            </p>
          </div>
      
          {/* KONTENER PRZEWIJANY */}
          <div className="flex overflow-x-auto gap-8 pb-8 custom-scrollbar2 snap-x snap-mandatory scroll-smooth py-5 ">
          {videosFromDataBase.map((video) => (
                <a 
                key={video.videoID} 
                href={`https://www.youtube.com/watch?v=${video.videoID}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] md:w-[400px] snap-center"
              >
                <div className="group relative bg-gray-700/50 backdrop-blur-sm  overflow-hidden border border-gray-600 hover:border-transparent transition-all duration-300 hover:scale-105 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="aspect-video w-full overflow-hidden bg-gray-800">
                  <img 
                        src={video.thumbnailsUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
                      />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg text-white font-bold truncate">
                        {video.title}
                      </h3>
                    </div>
                    <div className="text-gray-400 text-sm flex items-center">
                    
                    </div>
                  </div>
                </div>
                </a>
            ))}
          </div>
        </div>
      </section>

     
        
       

  );
};

export default LatestVideos;