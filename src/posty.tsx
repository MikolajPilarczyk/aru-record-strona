import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';
import { Link } from 'react-router-dom';
import './index.css';

function Posty() {
    const [posts, setPosts] = useState<any[]>([]);
  
    useEffect(() => {
      client.fetch('*[_type == "post"] | order(publishedAt desc) {_id,title,slug,publishedAt,image,body}')
        .then(setPosts)
        .catch(console.error);
    }, []);
  
    return ( 
      <section id="voices" className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasze Projekty</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Oto nasze ostatnie projekty nad jakimi pracowaliśmy
            </p>
          </div>
      
          {/* KONTENER PRZEWIJANY */}
          <div className="flex overflow-x-auto gap-8 pb-8 custom-scrollbar snap-x snap-mandatory scroll-smooth py-5 ">
  {posts.map((post) => (
    <Link 
      to={`/post/${post._id}`} 
      key={post._id}
      className="min-w-[calc(100%-2rem)] sm:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] snap-start px-2"
    >
      <div className="group relative bg-gray-700/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-600 hover:border-transparent transition-all duration-300 hover:scale-105 h-full">
        <div className={`absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
        
        {/* ZMIANA: aspect-square -> aspect-video (16:9) */}
        <div className="aspect-video overflow-hidden bg-gray-800">
          {post.image ? (
            <img 
              src={urlFor(post.image).url()} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 text-xs">Brak zdjęcia</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center mb-2">
            <h3 className="text-lg text-white font-bold truncate">
              {post.title}
            </h3>
          </div>
          <div className="text-gray-400 text-sm flex items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <span>
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
              }) : 'Brak daty'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
        </div>
      </section>
    );
  }

export default Posty;