import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';
import { Link } from 'react-router-dom';
import './index.css';

function VoiceActors() {
    const [actors, setActors] = useState<any[]>([]);
  
    useEffect(() => {
      client.fetch('*[_type == "voiceAcotrs"]{ _id, imie,ksywka,nazwisko, slug, specialization, image, body }')
        .then(setActors)
        .catch(console.error);
    }, []);
  
    return ( 
      <section id="voices" className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasze Głosy</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Poznaj naszych doświadczonych lektorów, którzy nadają charakter każdemu projektowi
            </p>
          </div>
      
          {/* KONTENER PRZEWIJANY */}
          <div className="flex overflow-x-auto gap-8 pb-8 custom-scrollbar snap-x snap-mandatory scroll-smooth py-5 ">
            {actors.map((actor) => (
              <Link 
                to={`/aktorzy-glosowi/${actor._id}`} 
                key={actor._id}
                className="min-w-[calc(100%-2rem)] sm:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(25%-1.5rem)] snap-start px-2"
              >
                <div className="group relative bg-gray-700/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-600 hover:border-transparent transition-all duration-300 hover:scale-105 h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={urlFor(actor.image).url()}
                      alt={actor.imie}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 "
                    />
                  </div>
      
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-lg text-white font-bold truncate">
                        {actor.imie} "{actor.ksywka}"
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-1">
                      Specjalizacja: {actor.specialization}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

export default VoiceActors;