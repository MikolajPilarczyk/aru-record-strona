import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { client, urlFor } from "./sanityClient.ts";
import { LocalizedLink as Link } from "./LocalizedLink";
import { Search } from "lucide-react";
import { Seo } from "./seo.tsx";

export function AllVoiceActors() {
    const { t } = useTranslation();
    const [restActors, setRestActors] = useState<any[]>([]);
    const [partnerActors, setPartnerActors] = useState<any[]>([]);

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);



    const fetchActors = (filterQuery = '') => {
        setLoading(true);

        let baseQuery = `*[_type == "voiceAcotrs"${filterQuery}] { 
            _id, imie, ksywka, nazwisko, slug, specialization, image, body 
        }`;


        if(filterQuery == '') {
             baseQuery = `*[_type == "voiceAcotrs"${filterQuery}] { 
                _id, 
                imie, 
                ksywka, 
                nazwisko, 
                slug, 
                specialization, 
                image, 
                body,
                // Sprawdzamy match tutaj - to zwróci true/false
                "priority": specialization match "Oficjalne*"
            } | order(priority desc, lower(ksywka) asc)`;
        }




        client.fetch(baseQuery)
            .then((data) => {
                setRestActors(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Zabezpieczenie przed wstrzykiwaniem znaków do GROQ
        const cleanSearch = search.replace(/"/g, '');
        const filter = cleanSearch
            ? ` && (imie match "*${cleanSearch}*" || ksywka match "*${cleanSearch}*" || nazwisko match "*${cleanSearch}*" || specialization match "*${cleanSearch}*")`
            : '';
        fetchActors(filter);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        fetchActors();
        window.scrollTo(0, 0);


        const partnerActorsQuery = `*[_type == "partnerVoiceAcotrs"] { 
            _id, imie,image, ksywka, nazwisko, slug}`;




        client.fetch(partnerActorsQuery)
            .then((data) => {
                setPartnerActors(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });

    }, []);

    return (
        <section id="voices" className="relative py-30 bg-gradient-to-b from-[#14203D] to-[#172440] min-h-screen">
            <Seo
                title={t('voices.seo.title')}
                description={t('voices.seo.description')}
                path="/aktorzy-glosowi"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">{t('voices.title')}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        {t('voices.subtitle')}
                    </p>

                    {/* Wielkanocne jajko - Szczur Romek */}
                    {search === t('voices.easterEggPhrase') && (
                        <div className="flex justify-center mt-4">
                            <img src="/scul%20blancior.png" className="w-50 animate-bounce" alt={t('voices.easterEggAlt')} />
                        </div>
                    )}
                </div>

                <h2 className="text-gray-100 px-2 text-2xl my-7 md:ml-20">{t('voices.searchHeading')}</h2>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row items-center gap-4 mb-10 md:mb-20 md:ml-20 w-full px-4 md:px-0"
                >
                    <input
                        onChange={handleChange}
                        type="text"
                        className="bg-gray-600 px-4 text-gray-50 w-full md:w-1/2 p-2 rounded-full border-2 focus:outline-none focus:border-green-400 border-gray-400 shadow-lg placeholder:text-gray-400"
                        placeholder={t('voices.searchPlaceholder')}
                    />

                    {/* UWAGA: wartości (value) zostają po polsku - trafiają do zapytania GROQ i
                        są dopasowywane do pola "specialization" w Sanity. Tłumaczymy tylko etykiety. */}
                    <select
                        onChange={handleChange}
                        className="bg-gray-600 text-sm shadow-lg border-gray-400 text-gray-100 p-3 rounded-full w-full md:w-auto border-2 focus:outline-none"
                    >
                        <option value="">{t('voices.filters.all')}</option>
                        <option value="damski">{t('voices.filters.female')}</option>
                        <option value="męski">{t('voices.filters.male')}</option>
                        <option value="dorosły">{t('voices.filters.adult')}</option>
                        <option value="dziecięcy">{t('voices.filters.child')}</option>

                        <option value="realizator">{t('voices.filters.soundEngineer')}</option>
                        <option value="Reżyser">{t('voices.filters.director')}</option>
                        <option value="Dialogista">{t('voices.filters.dialogueWriter')}</option>
                        <option value="wokalist">{t('voices.filters.vocalist')}</option>

                    </select>

                    <button
                        type="submit"
                        className="bg-gradient-to-br from-green-400 to-emerald-500 text-gray-100 shadow-lg hover:scale-110 transition-transform p-3 rounded-full w-full md:w-auto flex justify-center items-center"
                    >
                        <Search className="w-5 h-5" />
                        <span className="ml-2 md:hidden font-bold">{t('voices.searchButton')}</span>
                    </button>
                </form>

                <h2 className="text-2xl text-gray-200 md:mx-20 mt-10 font-sans">
                    {t('voices.teamHeading', { total: restActors.length })}
                </h2>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">{t('voices.loading')}</div>
                ) : restActors.length > 0 ? (
                        <div>
                    <div className="flex flex-wrap gap-8 justify-center py-10">
                        {restActors.map((actor) => (
                            <Link
                                to={`/aktorzy-glosowi/${actor.ksywka}`}
                                key={actor._id}
                                className="w-70 group"
                            >
                                <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:scale-105 h-80 shadow-2xl">
                                    {/* Kontener obrazu z zabezpieczeniem */}
                                    <div className="absolute inset-0">
                                        {actor.image ? (
                                            <img
                                                src={urlFor(actor.image).url()}
                                                alt={actor.imie}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">{t('voices.noPhoto')}</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                                    </div>

                                    {/* Treść */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center">
                                            <div className="w-1 h-10 bg-green-400 mr-3 rounded-full shadow-[0_0_10px_#4ade80]" />
                                            <h3 className="text-xl text-white font-black uppercase tracking-tighter">
                                                {actor.imie || t('voices.anonymous')}
                                                {actor.ksywka && (
                                                    <span className="block text-green-400 text-sm font-medium normal-case">"{actor.ksywka}"</span>
                                                )}
                                            </h3>
                                        </div>

                                        <p className="max-h-0 overflow-hidden group-hover:max-h-12 transition-all duration-500 text-gray-300 text-xs mt-2 italic">
                                            {actor.specialization || t('voices.defaultSpecialization')}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                            <div>
                                {partnerActors.length > 0 && (
                                <h2 className="text-gray-100 px-2 text-2xl my-7 md:ml-20 text-4xl mb-10">{t('voices.guestHeading')}</h2>
                                )}
                                <div className="flex flex-wrap gap-8 py-10 ml-7">
                                    {
                                        partnerActors.length > 0 && (
                                            partnerActors.map((actor) => (
                                                <div key={actor._id} className={"w-70 group"}>
                                                    <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:scale-105 h-80 shadow-2xl">
                                                        {/* Kontener obrazu z zabezpieczeniem */}
                                                        <div className="absolute inset-0">
                                                            {actor.image ? (
                                                                <img
                                                                    src={urlFor(actor.image).url()}
                                                                    alt={actor.imie}
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={"/scul_partnerski.png"}
                                                                    alt={actor.imie}
                                                                    className="w-full h-full object-cover  group-hover:scale-110 transition-transform duration-700"
                                                                />
                                                            )}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                                                        </div>

                                                        {/* Treść */}
                                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <div className="flex items-center">
                                                                <div className="w-1 h-10 bg-blue-200 mr-3 rounded-full shadow-[0_0_10px_#4ade80]" />
                                                                <h3 className="text-xl text-white font-black uppercase tracking-tighter">
                                                                    {actor.imie || t('voices.anonymous')}
                                                                    {actor.ksywka && (
                                                                        <span className="block text-blue-200 text-sm font-medium normal-case">"{actor.ksywka}"</span>
                                                                    )}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    }

                                </div>
                            </div>

                        </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center">
                        <h3 className="text-gray-400 text-3xl italic">{t('voices.emptyTitle')}</h3>
                        <button onClick={() => fetchActors()} className="mt-4 text-green-400 underline">{t('voices.showAll')}</button>
                    </div>
                )}
            </div>
        </section>
    );
}
