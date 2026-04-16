import {useEffect, useState} from "react";
import {client, urlFor} from "./sanityClient.ts";
import {Link} from "react-router-dom";

export function AllVoiceActors()
{
    const [actress, setActresses] = useState<any[]>([]);

    const [actors, setActors] = useState<any[]>([]);

    const [restActors, setRestActors] = useState<any[]>([]);


    useEffect(() => {
        client.fetch('*[_type == "voiceAcotrs" && specialization match "Męski"]{ _id, imie,ksywka,nazwisko, slug, specialization, image, body }')
            .then(setActors)
            .catch(console.error);


        client.fetch('*[_type == "voiceAcotrs" && specialization match "Damski"]{ _id, imie,ksywka,nazwisko, slug, specialization, image, body }')
            .then(setActresses)
            .catch(console.error);

        client.fetch('*[_type == "voiceAcotrs"]{ _id, imie,ksywka,nazwisko, slug, specialization, image, body }')
            .then(setRestActors)
            .catch(console.error);
    }, []);


    return (
        <section id="voices" className="relative py-30 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Wszyscy aktorzy</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Poznaj naszych doświadczonych aktorów, którzy nadają charakter każdemu projektowi
                    </p>
                </div>

                {/*Głosy Męskie*/}
                <h3 className={"text-3xl text-gray-50 mx-15"}>Głosy Męskie</h3>
                {/* KONTENER PRZEWIJANY */}
                <div className="flex gap-8 pb-8 px-10 snap-x snap-mandatory flex flex-wrap gap-3 py-5 ">
                    {actors.map((actor) => (


                        <Link
                            to={`/aktorzy-glosowi/${actor._id}`}
                            key={actor._id}
                            className="w-70 snap-start mx-5 my-5"
                        >
                            <div className="group relative bg-gray-900 rounded-sm overflow-hidden border border-gray-600  transition-all duration-300 hover:scale-105 h-75 aspect-[3/4]">
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
                                        <div className="w-1 h-6 bg-emerald-300 mr-3 rounded-full" />

                                        <h3 className="text-xl text-white font-black uppercase tracking-wider drop-shadow-lg">
                                            {actor.imie}
                                            <span className="block bg-gradient-to-b from-emerald-500 to-emerald-600 bg-clip-text text-transparent text-sm font-medium">"{actor.ksywka}"</span>
                                        </h3>
                                    </div>

                                    <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                                        <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                            <span className="text-white">{actor.specialization}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Połysk przy hoverze */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
                            </div>
                        </Link>

                    ))}
                </div>
                {/*Głosy Damskie*/}
                <h3 className={"text-3xl text-gray-50 mx-15 mt-10"}>Głosy Damskie</h3>

                <div className="flex gap-8 pb-8 px-10 snap-x snap-mandatory flex flex-wrap gap-3 py-5 ">
                    {actress.map((actor) => (


                        <Link
                            to={`/aktorzy-glosowi/${actor._id}`}
                            key={actor._id}
                            className="w-70 snap-start mx-5 my-5"
                        >
                            <div className="group relative bg-gray-900 rounded-sm overflow-hidden border border-gray-600  transition-all duration-300 hover:scale-105 h-75 aspect-[3/4]">
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
                                        <div className="w-1 h-6 bg-yellow-600 mr-3 rounded-full" />

                                        <h3 className="text-xl text-white font-black uppercase tracking-wider drop-shadow-lg">
                                            {actor.imie}
                                            <span className="block bg-gradient-to-b from-yellow-500 to-yellow-600 bg-clip-text text-transparent text-sm font-medium">"{actor.ksywka}"</span>
                                        </h3>
                                    </div>

                                    <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                                        <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                            <span className="text-white">{actor.specialization}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Połysk przy hoverze */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
                            </div>
                        </Link>

                    ))}
                </div>
                {/*Pozostałe Głosy*/}

                <h3 className={"text-3xl text-gray-50 mx-15 mt-10"}>Wszystkie Głosy</h3>

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
                                        <div className="w-1 h-6 bg-red-600 mr-3 rounded-full" />

                                        <h3 className="text-xl text-white font-black uppercase tracking-wider drop-shadow-lg">
                                            {actor.imie}
                                            <span className="block bg-gradient-to-b from-red-500 to-red-600 bg-clip-text text-transparent text-sm font-medium">"{actor.ksywka}"</span>
                                        </h3>
                                    </div>

                                    <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                                        <p className="text-gray-300 text-xs font-semibold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                            <span className="text-white">{actor.specialization}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Połysk przy hoverze */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
                            </div>
                        </Link>

                    ))}
                </div>

            </div>

        </section>
    );
}