import  { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';
import { Link } from 'react-router-dom';
import './index.css';
import { ArrowRight } from 'lucide-react';

function VoiceActors() {
    const [actors, setActors] = useState<any[]>([]);

    useEffect(() => {
      client.fetch('*[_type == "voiceAcotrs"][0..3]{ _id, imie,ksywka,nazwisko, slug, specialization, image, body }')
        .then(setActors)
        .catch(console.error);
    }, []);


    return (
      <section id="voices" className="relative py-20 bg-gradient-to-b from-[#172440] to-[#14203D] w-screen overflow-hidden px-5 max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">






              <div className="text-left mb-16 grid grid-cols-2">
                  <div>
                      <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasi Aktorzy</h2>
                      <div className="w-60 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto float-left mb-5" />
                      <p className="text-gray-400 mt-4 max-w-2xl text-left clear-both">
                          Poznaj naszych doświadczonych aktorów, którzy nadają charakter każdemu projektowi
                      </p>
                  </div>
                <img src="/scul%20love.png" alt="scul-plose" className="w-45 mx-95"/>
              </div>


          </div>

          {/* KONTENER PRZEWIJANY */}
          <div className="flex overflow-x-auto gap-8 pb-8 px-10 custom-scrollbar snap-x snap-mandatory scroll-smooth py-5 ">
            {actors.map((actor) => (


              <Link
                to={`/aktorzy-glosowi/${actor._id}`}
                key={actor._id}
                className="min-w-[calc(100%-2rem)] sm:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(25%-1.5rem)] snap-start px-2"
              >
                  <div className="group relative bg-gray-900 rounded-sm overflow-hidden border border-gray-600 hover:border-green-500/50 transition-all duration-300 hover:scale-105 h-full aspect-[3/4]">
                      {/* Kontener obrazu */}
                      <div className="absolute inset-0">
                          <img
                              src={urlFor(actor.image).url()}
                              alt={actor.imie}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Gradient poprawiający czytelność tekstu na dole */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Treść nałożona na obraz */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center mb-1">
                              {/* Mały akcent kolorystyczny */}
                              <div className="w-1 h-6 bg-green-500 mr-3 rounded-full" />

                              <h3 className="text-xl text-white font-black uppercase tracking-wider drop-shadow-lg">
                                  {actor.imie}
                                  <span className="block text-green-400 text-sm font-medium">"{actor.ksywka}"</span>
                              </h3>
                          </div>

                          <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                              <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                  <span className="text-white">{actor.specialization}</span>
                              </p>
                          </div>
                      </div>

                      {/* Połysk przy hoverze */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
                  </div>
              </Link>

            ))}
          </div>
            <div className="justify-items-center">
                <button className={" border-1 border-green-500  text-green-400 hover:scale-105 transition-all p-4 rounded-xl   flex my-10  shadow-green-500/50 shadow-xl/20 "}><Link to="/aktorzy-glosowi">  Zobacz wszystkich naszych aktorów </Link><ArrowRight></ArrowRight></button>

            </div>

        </div>

      </section>
    );
  }

export default VoiceActors;