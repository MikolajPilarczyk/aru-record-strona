  import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {client, urlFor} from '../sanityClient';
import { PortableText } from '@portabletext/react';
import {  Calendar} from 'lucide-react';
  import MuxPlayer from '@mux/mux-player-react';

export function PostDetail() {
  const { id } = useParams(); // Pobieramy 'id' z adresu URL
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Zapytanie o konkretny dokument na podstawie jego _id
    const query = `*[_type == "post" && _id == $id][0]{ 
  title,
  publishedAt,
  slug,
  body,
  "cast": cast[]{
    characterName,
     "actorDetail": actor->{ _id, imie,ksywka,nazwisko, slug, specialization, image, body }
  },
  "videoData": videoToUpLoad.asset-> {
    playbackId,
    aspectRatio,
    duration
  }
}`;
    
    client.fetch(query, { id }).then((data) => {
      setPost(data);
    });
  }, [id]);

  if (!post) return <div className="p-8">Ładowanie...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#172440] p-6 md:p-12">
    <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden ">
      

      <div className="p-8 md:p-12">

          
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

        {/* Treść (body) z bazy */}

      </div>
      <MuxPlayer
          playbackId={post.videoData.playbackId}
          metadataVideoTitle={post.title}
          streamType="on-demand"
      />
      <h1 className="text-5xl md:text-3xl font-luckiest py-2 text-white mb-2">
        {`${post.title}`}
      </h1>
      <div className="text-gray-400 text-m flex items-center m-2">
        <Calendar className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
        <span>
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }) : 'Brak daty'}
            </span>
      </div>
      <div className="prose prose-invert prose-lg max-w-none text-gray-300 m-2">
        {post.body ? (
            <PortableText value={post.body} />
        ) : (
            <p className="italic text-gray-500">Ten wpis nie posiada jeszcze opisu.</p>
        )}
      </div>

      {/*Kontener z aktorami*/}
      <h2 className="text-gray-200  p-2">W tej produkcji występili:</h2>
      <div className="flex grid grid-cols-1">
          {post.cast?.map((actor) => (
              <Link
                  to={`/aktorzy-glosowi/${actor.actorDetail._id}`}
                  key={actor.actorDetail._id}
                  className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-xl transition-all"
              >
                {/* Kontener na obrazek */}
                <div className="w-16 h-16 shrink-0">
                  <img
                      src={urlFor(actor.actorDetail.image).width(200).height(200).url()}
                      alt={actor.actorDetail.imie}
                      className="w-full h-full rounded-full object-cover border-2 border-emerald-500/20"
                  />
                </div>

                {/* Kontener na tekst */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-gray-50 font-semibold truncate">
                    {actor.actorDetail.imie} "{actor.actorDetail.ksywka}" {actor.actorDetail.nazwisko}
                  </h3>
                  <span className="bg-gradient-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent text-sm font-medium">
                  W roli: {actor.characterName}
                </span>
                </div>
              </Link>

          ))}
        </div>

      </div>
  </div>
  );
}