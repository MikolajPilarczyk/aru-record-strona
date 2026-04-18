import {useEffect, useState} from "react";
import {client, urlFor} from "./sanityClient.ts";
import {Link} from "react-router-dom";
import {Search ,} from "lucide-react";

export function AllVoiceActors()
{


    const [restActors, setRestActors] = useState<any[]>([]);

    const [search, setSearch] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query = `*[_type == "voiceAcotrs" && (imie match "*${search}*" || ksywka match "*${search}*" || nazwisko match "*${search}*" || specialization match "*${search}*")]
            { 
              _id, 
              imie, 
              ksywka, 
              nazwisko, 
              slug, 
              specialization, 
              image, 
              body 
            }`;
        client.fetch(query)
            .then(setRestActors)
            .catch(console.error);


    }
    const handleChange = (e) => {
        setSearch(e.target.value);
    }



    useEffect(() => {

        client.fetch('*[_type == "voiceAcotrs"]{ _id, imie,ksywka,nazwisko, slug, specialization, image, body }')
            .then(setRestActors)
            .catch(console.error);
    }, []);



    return (
        <section id="voices" className="relative py-30 bg-gradient-to-b from-[#14203D] to-[#172440]  min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasza zgraja</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Poznaj naszych aktorów głosowych, którzy nadają charakter każdemu projektowi
                    </p>
                    {

                        search=="Szczur Romek walczący z aligatorem"&&<img src={"/scul%20blancior.png"} className={"w-50 transition-all duration-150"} />
                    }
                </div>

                <h2 className="text-gray-100 px-2 text-2xl  my-7 ml-15">Wyszukaj aktora</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row items-center gap-4 mb-10 md:mb-20 md:ml-20 w-full px-4 md:px-0"
                >
                    <input
                        onChange={handleChange}
                        name="searchData"
                        type="text"
                        className="bg-gray-600 px-4 text-gray-50 w-full md:w-1/2 p-2 rounded-full border-2 focus:outline-none focus:border-gray-300 border-gray-400 shadow-xl/20 shadow-green-300 placeholder:text-sm"
                        placeholder="Szczur Romek walczący z aligatorem..."
                    />

                    <select
                        onChange={handleChange}
                        name="searchData"
                        className="bg-gradient-to-l text-sm shadow-green-300 shadow-xl/20 border-gray-400 from-gray-600 to-gray-600 text-gray-400 p-3 rounded-full w-full md:w-auto border-2 focus:outline-none"
                    >
                        <option className="bg-gray-300 text-gray-700" value="">Wszystkie głosy</option>
                        <option className="bg-gray-200 text-gray-700" value="damski">Głosy damskie</option>
                        <option className="bg-gray-300 text-gray-700" value="męski">Głosy męskie</option>
                        <option className="bg-gray-200 text-gray-700" value="dorosły">Głosy dorosłe</option>
                        <option className="bg-gray-300 text-gray-700" value="dziecięcy">Głosy dziecięce</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-gradient-to-br from-green-400 to-emerald-500 text-gray-100 shadow-gray-400 shadow-xl/20 hover:scale-110 duration-100 p-3 ease-in rounded-full w-full md:w-auto flex justify-center items-center"
                    >
                        <Search />
                        <span className="ml-2 md:hidden font-bold">Szukaj</span>
                    </button>
                </form>


                {/*Pozostałe Głosy*/}

                <h2 className={"text-2xl text-gray-200 mx-15 mt-10 font-sans"}>Oto nasza brygada szczurów ({restActors.length})</h2>
                    {restActors.length> 0 ?
                    (
                        <div className="flex gap-8 pb-8 px-10 snap-x snap-mandatory flex flex-wrap gap-3 py-5 ">
                            {restActors.map((actor) => (


                                <Link
                                    to={`/aktorzy-glosowi/${actor._id}`}
                                    key={actor._id}
                                    className="w-70 snap-start mx-5 my-5"
                                >
                                    <div className="group relative bg-gray-900 rounded-sm overflow-hidden border border-gray-600 transition-all duration-300 hover:scale-105 h-75 aspect-[3/4]">
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
                                                <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-500 mr-3 rounded-full" />

                                                <h3 className="text-xl text-white font-black uppercase tracking-wider drop-shadow-lg">
                                                    {actor.imie}
                                                    <span className="block bg-gradient-to-b from-green-400 to-emerald-500 bg-clip-text text-transparent text-md font-medium">"{actor.ksywka}"</span>
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

                    ) : (
                        <div className="h-100 flex items-center justify-center ">
                        <h3 className="text-gray-400 text-3xl text-center italic">Brak takich aktorów</h3>
                        </div>

                        )}



            </div>

        </section>
    );
}