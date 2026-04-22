import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../sanityClient';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { faDiscord, faYoutube,faInstagram, faTiktok} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Helmet} from "react-helmet-async";



export function VoiceActorsDetail() {
    // ... (portableTextComponents bez zmian)
    const portableTextComponents: PortableTextComponents = {
        // ... Twój poprzedni kod komponentów ...
        types: {
            image: ({ value }) => (
                <div className="my-8">
                    <img src={urlFor(value).width(1200).url()} alt="Zdjęcie" className="rounded-lg border border-gray-800" />
                </div>
            ),
        },
        block: {
            h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h3>,
            normal: ({ children }) => <p className="mb-4">{children}</p>,
        },
    };

    const { id } = useParams();
    const [actors, setActor] = useState<Record<string, any> | null>(null);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const actorQuery = `*[_type == "voiceAcotrs" && ksywka == $id][0]{ 
            _id, imie, ksywka, nazwisko, specialization, image, body,
                socials[]{
                    platform,
                    username
                },
            "demo": demo[]{
                "url": asset->url,
                "description": description
            }
        }`;

        const postsQuery = `*[_type == "post" && $id in cast[].actor._ref]{ 
            _id, title, publishedAt, slug,
            "cast": cast[]{ characterName, "actorDetail": actor->{ _id } }
        }`;

        const fetchData = async () => {
            try {
                const [actorData, relatedPosts] = await Promise.all([
                    client.fetch(actorQuery, { id }),
                    client.fetch(postsQuery, { id })
                ]);
                setActor(actorData);
                setPosts(relatedPosts);
            } catch (err) {
                console.error("Błąd pobierania danych:", err);
            }
        };

        if (id) fetchData();
    }, [id]);

    if (!actors) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Wczytywanie...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#172440] p-6 md:p-12">
            <Helmet>
                <title>{actors.ksywka}</title>
            </Helmet>
            <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden">
                <div className="p-8 md:p-12">
                    {/* Nagłówek i zdjęcie */}
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        {actors.image && (
                            <div className="w-64 h-64 flex-shrink-0">
                                <img src={urlFor(actors.image).url()} className="w-full h-full rounded-3xl object-cover shadow-2xl" alt={actors.imie} />
                            </div>
                        )}
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                                {actors.imie} {actors.ksywka ? `"${actors.ksywka}"` : ""} {actors.nazwisko}
                            </h1>
                            <p className="text-cyan-400 text-xl font-medium">{actors.specialization}</p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-10" />

                    {/* SEKCJA WIELU DEMO GŁOSOWYCH */}
                    {actors.demo && actors.demo.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-white text-2xl mb-6 font-semibold">Próbki głosowe</h2>
                            <div className="space-y-4">
                                {actors.demo.map((track: any, index: number) => (
                                    <div key={index} className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 flex flex-col gap-2">
                                        {track.description && (
                                            <span className="text-gray-400 text-sm italic">{track.description}</span>
                                        )}
                                        <audio controls className="w-full h-10 accent-orange-500">
                                            <source src={track.url} type="audio/mpeg" />
                                            Twoja przeglądarka nie obsługuje audio.
                                        </audio>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Treść profilu */}
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        {actors.body ? (
                            <PortableText value={actors.body} components={portableTextComponents} />
                        ) : (
                            <p className="italic text-gray-500 text-center py-10">Brak opisu profilu.</p>
                        )}
                    </div>

                    {/*Sekcja z socialami*/}
                    {
                        actors.socials?(
                            <div>
                                {actors.socials.map((social: any, index: number) => (
                                    <div key={index} className={"text-gray-200 text-lg"}>
                                        {
                                            social.platform =="discord" ?(
                                                    <div className="flex items-center gap-2">
                                                        <FontAwesomeIcon
                                                            icon={faDiscord}
                                                            size="xl"
                                                            className={"text-gray-50"}
                                                        />
                                                        {social.username}


                                                    </div>
                                                )
                                                : social.platfrom == "instagrm"?(
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faInstagram}
                                                            size="xl"
                                                            className={"text-gray-50"}
                                                        />

                                                        {social.username}</div>
                                                ) : social.platfrom =="tiktok"?(
                                                    <div>
                                                        <FontAwesomeIcon
                                                            icon={faTiktok}
                                                            size="xl"
                                                            className={"text-gray-50"}
                                                        />

                                                        {social.username}</div>
                                                ) : (
                                                    <div><FontAwesomeIcon
                                                        icon={faYoutube}
                                                        size="xl"
                                                        className={"text-gray-50"}
                                                    />
                                                        {social.username}</div>
                                                )
                                        }

                                    </div>
                                ))}
                            </div>
                        ):
                            (
                                <div>


                                </div>
                            )

                    }





                    {/* Powiązane posty */}
                    {posts.length > 0 && (
                        <div className="mt-12 pt-10 border-t border-gray-800">
                            <h2 className="text-white text-3xl font-bold mb-6">Brał udział w:</h2>
                            <div className="grid gap-4">
                                {posts.map((post) => (
                                    <Link to={`/post/${post._id}`} key={post._id} className="block p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-gray-700">
                                        <h3 className="text-xl text-white font-semibold">{post.title}</h3>
                                        <div className="mt-2 text-cyan-400 italic">
                                            {post.cast?.filter((c: any) => c.actorDetail?._id === id).map((member: any, idx: number) => (
                                                <span key={idx}>W roli: {member.characterName}</span>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}