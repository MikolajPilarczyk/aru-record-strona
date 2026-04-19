import { Play, ArrowRight, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from './sanityClient';

export function Hero() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    client
        .fetch('*[_type == "post"] | order(publishedAt desc) {_id,title,slug,publishedAt,image,body}')
        .then(setPosts)
        .catch(console.error);
  }, []);

  return (
      <div className="relative overflow-hidden w-screen bg-gradient-to-b from-[#14203D] to-[#505B6C] pb-20 max-w-full">

        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <img
              src="/puste_to_tylko_logo.png"
              alt="Background Watermark"
              className="w-full max-w-[2500px] opacity-40 rotate-[-3deg] object-contain"
          />
        </div>

        <div className="relative z-10 w-full">

          <section id="hero" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-15 items-center">
                <div className="pt-10">
                  <h1 className="text-5xl sm:text-6xl lg:text-6xl text-white leading-tight font-luckiest">
                    Banda Szczurów<br />
                    <span className="bg-gradient-to-r from-[#1e7707] to-[#2ca3e1] bg-clip-text text-transparent">
                 dorwała się do mikrofonów i robi dubbing
                </span>

                  </h1>
                  <p className="text-lg text-gray-400 leading-relaxed pb-10 pl-1 pt-2" >
                    Jesteśmy prężnie rozwijającym się studiem specjalizującym się w spolszczeniach i dubbingu do filmów, seriali, gier, animacji i materiałów reklamowych. Gwarantujemy najwyższą jakość i przyjemną współpracę.
                  </p>


                  <div className="flex flex-wrap gap-4">

                    <Link to={"/portfolio"}>

                    <button className="px-6 py-5 bg-gradient-to-r from-[#1e7707] to-[#2ca3e1] hover:scale-110 transition-all duration-200 text-white rounded-lg bg-clip-padding flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Zobacz nasze prace

                    </button>
                    </Link>
                    <a href={"#contact"}>
                      <button className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:scale-110 transition-all  border border-gray-700">
                        Kontakt
                      </button>
                    </a>

                  </div>
                </div>

                <div className="relative">
                  <img src="/scur_piwo.png" alt="scur" className="relative z-20 w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1e7707] to-[#2ca3e1] rounded-2xl blur-3xl opacity-20"></div>
                </div>
              </div>
            </div>
          </section>

          {/* PORTFOLIO - Usunięto bg-gradient */}
          <section id="voices" className="relative py-20 bg-transparent px-5 md:px-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-left mb-16">
                <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasze Portfolio</h2>
                <div className="w-60 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 float-left mb-5" />
                <p className="text-gray-400 mt-4 max-w-2xl text-left clear-both">
                  Oto projekty nad jakimi ostatnio pracowaliśmy
                </p>
              </div>

              <div className="flex overflow-x-auto gap-8 pb-8 custom-scrollbar snap-x snap-mandatory scroll-smooth py-1">
                {posts.map((post) => (
                    <Link
                        to={`/post/${post._id}`}
                        key={post._id}
                        className="min-w-[calc(100%-2rem)] sm:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] snap-start px-2"
                    >
                      <div className="group relative bg-gray-700/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-600 hover:border-transparent transition-all duration-300 hover:scale-105 h-full shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

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

              <div className="flex justify-center md:justify-start">
                <button className="border-1 border-emerald-400 text-emerald-300 hover:scale-105  transition-all ml-5 p-4 rounded-xl flex items-center gap-2 my-10 shadow-emerald-500/20 shadow-xl">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    Zobacz nasze całe portfolio <ArrowRight className="w-5 h-5" />
                  </Link>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}