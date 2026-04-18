import {Link, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../sanityClient'; // sprawdź ścieżkę
import { PortableText, type PortableTextComponents } from '@portabletext/react';

export function VoiceActorsDetail() {
    // Konfiguracja renderowania treści Portable Text pobranej z Sanity.
    const portableTextComponents: PortableTextComponents = {
        types: {
            image: ({ value }) => {
                return (
                    <div className="my-8">
                        <img
                            src={urlFor(value).width(1200).fit('max').auto('format').url()}
                            alt={value.alt || 'Zdjęcie w opisie'}
                            className="rounded-lg border border-gray-800 shadow-lg"
                        />
                        {value.caption && (
                            <p className="mt-2 text-center text-sm text-gray-500 italic">
                                {value.caption}
                            </p>
                        )}
                    </div>
                );
            },
        },
        block: {
            h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h3>,
            h4: ({ children }) => <h4 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h4>,
            h5: ({ children }) => <h5 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h5>,
            h6: ({ children }) => <h6 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h6>,
            normal: ({ children }) => <p className="mb-4">{children}</p>,
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-400">
                    {children}
                </blockquote>
            ),
        },
        list: {
            // Wymuszamy poprawne semantycznie listy, niezależnie od stylowania `prose`.
            bullet: ({ children }) => <ul className="list-disc ml-6 mb-6 space-y-2">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal ml-6 mb-6 space-y-2">{children}</ol>,
        },
        marks: {
            // Linki zewnętrzne dostają `rel`, żeby ograniczyć dostęp do `window.opener`.
            link: ({ children, value }) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;

                return (
                    <a
                        href={value.href}
                        rel={rel}
                        className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4"
                    >
                        {children}
                    </a>
                );
            },
        },
    };


    interface Post {
        _id: string;
        title: string;
        publishedAt: string;
        slug: { current: string };
        body: any; // Możesz doprecyzować używając TypedObject[] z PortableText
        cast: Array<{
            characterName: string;
            actorDetail: {
                _id: string;
                imie: string;
                nazwisko: string;
                ksywka?: string;
                slug: { current: string };
                // dodaj resztę pól, których używasz
            };
        }>;

    }


    const { id } = useParams();
    const [actors, setActor] = useState<Record<string, any> | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // 1. Definicja zapytań
        const actorQuery = `*[_type == "voiceAcotrs" && _id == $id][0]{ 
        _id, imie, ksywka, nazwisko, specialization, image, body,
        "demo": demo.asset->url
    }`;

        const postsQuery = `*[_type == "post" && $id in cast[].actor._ref]{ 
        _id,
        title,
        publishedAt,
        slug,
        "cast": cast[]{
          characterName,
          "actorDetail": actor->{ _id, imie, nazwisko }
        }
    }`;

        // 2. Pobieranie danych
        const fetchData = async () => {
            try {
                // Pobieramy dane aktora
                const actorData = await client.fetch(actorQuery, { id });
                setActor(actorData);

                // Pobieramy posty, w których ten konkretny aktor występuje w tablicy 'cast'
                // Używamy bezpośrednio 'id', zamiast przekazywać całą tablicę obiektów
                const relatedPosts = await client.fetch(postsQuery, { id });
                setPosts(relatedPosts);

            } catch (err) {
                console.error("Błąd pobierania danych:", err);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);




    // Stan przejściowy, zanim dane wrócą z CMS-a.
    if (!actors) {
        return (
            <div className="min-h-screen bg-gray-880 flex items-center justify-center text-white">
                Wczytywanie głosu...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#172440] p-6 md:p-12">
            <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden ">
                <div className="p-8 md:p-12">
                    <div className="flex items-center justify-between">
                        {/* Zdjęcie jest opcjonalne, więc nie renderujemy pustego kontenera bez danych. */}
                        {actors.image && (
                            <div className="w-75 h-full">
                                <img
                                    src={urlFor(actors.image).url()}
                                    className="w-full h-full rounded-4xl object-cover transition-transform duration-500 "
                                    alt={actors.ksywka || actors.imie}
                                />
                            </div>
                        )}

                        <div className="ml-10">
                            <h1 className="text-5xl md:text-7xl font-luckiest text-white mb-2">
                                {`${actors.imie} "${actors.ksywka}" ${actors.nazwisko}`}
                            </h1>
                            <p className="text-cyan-400 text-xl font-medium mb-8">
                                {actors.specialization}
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

                    <h2 className="text-white text-2xl py-5">Demo głosowe</h2>
                    <audio
                        controls
                        className="w-1/2 h-12 rounded-lg bg-gray-900 p-2 shadow-2xl accent-orange-500 border border-gray-700"
                    >
                        {/* Źródło audio pochodzi z pola `demo` rozwiniętego w zapytaniu GROQ. */}
                        <source src={actors.demo} type="audio/wav" />
                    </audio>

                    {/* Treść profilu renderujemy z bloków Portable Text zapisanych w bazie. */}
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        {actors.body ? (
                            <PortableText
                                value={actors.body}
                                components={portableTextComponents}
                            />
                        ) : (
                            <p className="italic text-gray-500 text-center py-10">
                                Ten lektor nie posiada jeszcze opisu profilu.
                            </p>
                        )}
                    </div>
                    { posts.length>0 ? (

                        <div>
                            <h2 className="text-gray-50 text-2xl py-5">Brał udział w:</h2>
                            {posts.map((post) => (
                                <Link to={`/post/${post._id}`} className={""} >
                                    <div key={post.slug.current} className="post-card text-gray-50 hover:opacity-85 border-transparent transition-all rounded-md pb-5">
                                        <h3 className={"text-lg"}>{post.title}</h3>
                                        <ul>
                                            <li className="">{post.cast?.map((member, index) => (
                                                <div key={index}>
                                                    <strong>W roli {member.characterName}</strong>
                                                </div>
                                            ))}</li>
                                        </ul>
                                    </div>
                                </Link>
                            ))}


                        </div>
                    ):(
                        <div></div>
                    )}

                </div>
            </div>
        </div>
    );
}
