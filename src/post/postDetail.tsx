import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { User, Calendar } from 'lucide-react';

export function PostDetail() {
  const { id } = useParams(); // Pobieramy 'id' z adresu URL
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Zapytanie o konkretny dokument na podstawie jego _id
    const query = `*[_type == "post" && _id == $id][0]`;
    
    client.fetch(query, { id }).then((data) => {
      setPost(data);
    });
  }, [id]);

  if (!post) return <div className="p-8">Ładowanie...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 md:p-12">
    <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden ">
      

      <div className="p-8 md:p-12">
        <h1 className="text-5xl md:text-7xl font-luckiest text-white mb-2">
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
          
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

        {/* Treść (body) z bazy */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p className="italic text-gray-500">Ten wpis nie posiada jeszcze opisu.</p>
          )}
        </div>
      </div>
      {post.image && (
        <div className="w-full h-full">
          <img 
            src={urlFor(post.image).url()} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt={post.ksywka || post.imie} 
          />
        </div>
      )}
    </div>
  </div>
  );
}