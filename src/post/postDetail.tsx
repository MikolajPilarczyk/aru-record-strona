import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { Calendar } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';
import {Helmet} from "react-helmet-async";

export function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const query = `*[_type == "post" && _id == $id][0]{ 
            title,
            publishedAt,
            body,
            image,
            "cast": cast[]{
                characterName,
                "actorDetail": actor->{ _id, imie, ksywka, nazwisko, image }
            },
            "techCast": techCast[]{
                characterName,
                
                "actorDetail": actor->{ _id, imie, ksywka, nazwisko, image }
            },
            "partnerCast": partnerCast[]{
                characterName,
                "actorDetail": actor->{ _id, imie, ksywka, nazwisko, image }
            },
            "videoData": videoToUpLoad.asset-> {
                playbackId,
                aspectRatio
            },
            // Pobieramy bezpośredni URL do pliku wideo w Sanity
            "nativeVideoUrl": nativeVideo.asset->url
        }`;

        client.fetch(query, { id })
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Ładowanie...</div>;
    }

    if (!post) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Nie znaleziono wpisu.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#172440] p-6 md:p-12">
            <Helmet>
                <title>{post.title}</title>
                <meta
                    property="og:image"
                    content="https://aru-studio.web.app/scul%20love.png"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://aru-studio.web.app/scul%20love.png" />
            </Helmet>

            <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden">

                <div className="mb-8">
                    {/* LOGIKA WYŚWIETLANIA: MUX -> Native Video -> Brak */}
                    {post.videoData?.playbackId ? (
                        <MuxPlayer
                            playbackId={post.videoData.playbackId}
                            metadataVideoTitle={post.title || "Wideo"}
                            streamType="on-demand"
                            className="w-full aspect-video rounded-xl shadow-xl"
                        />
                    ) : post.nativeVideoUrl ? (
                        <div className="rounded-xl overflow-hidden shadow-xl bg-black border border-gray-800">
                            <video
                                src={post.nativeVideoUrl}
                                controls
                                className="w-full aspect-video"
                                controlsList="nodownload" // Opcjonalnie: blokuje przycisk pobierania
                            >
                                Twoja przeglądarka nie wspiera odtwarzacza wideo.
                            </video>
                        </div>
                    ) : (
                        <div className="bg-black/20 aspect-video flex items-center justify-center text-gray-500 rounded-xl border border-gray-800 italic">
                            Wideo niedostępne
                        </div>
                    )}
                </div>

                <h1 className="text-5xl md:text-3xl font-luckiest py-2 text-white mb-2 px-2">
                    {post.title || "Tytuł niedostępny"}
                </h1>

                {/* Reszta Twojego kodu (Data, Body, Cast) pozostaje bez zmian */}
                <div className="text-gray-400 text-m flex items-center m-2">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                    <span>
                        {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })
                            : 'Data nieznana'}
                    </span>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 m-2">
                    {post.body && post.body.length > 0 ? (
                        <PortableText value={post.body} />
                    ) : (
                        <p className="italic text-gray-500">Ten wpis nie posiada opisu.</p>
                    )}
                </div>

                {post.cast && Array.isArray(post.cast) && post.cast.length > 0 && (
                    <div className="mt-8 p-2">
                        <h2 className="text-gray-200 text-xl font-bold mb-4">W tej produkcji wystąpili:</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {post.cast.map((member: any, index: number) => {
                                if (!member?.actorDetail) return null;
                                const { actorDetail, characterName } = member;

                                return (
                                    <Link
                                        to={`/aktorzy-glosowi/${actorDetail.ksywka}`}
                                        key={actorDetail._id || index}
                                        className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-xl transition-all"
                                    >
                                        <div className="w-16 h-16 shrink-0">
                                            {actorDetail.image ? (
                                                <img
                                                    src={urlFor(actorDetail.image).width(200).height(200).url()}
                                                    alt={actorDetail.imie || "Aktor"}
                                                    className="w-full h-full rounded-full object-cover border-2 border-emerald-500/20"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-gray-600 text-[10px] text-center border-2 border-gray-700 p-1">
                                                    Brak foto
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h3 className="text-gray-50 font-semibold truncate">
                                                {`${actorDetail.imie || 'Nieznany'} ${actorDetail.ksywka ? `"${actorDetail.ksywka}"` : ''} ${actorDetail.nazwisko || ''}`.trim()}
                                            </h3>
                                            <span className="bg-gradient-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent text-sm font-medium">
                                                {characterName || "Nieokreślona"}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}



                        </div>
                    </div>
                )}

                {post.techCast && Array.isArray(post.techCast) && post.techCast.length > 0 && (
                    <div className="mt-8 p-2">
                        <h2 className="text-gray-200 text-xl font-bold mb-4">Realizacja techniczna  :</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {post.techCast.map((member: any, index: number) => {
                                if (!member?.actorDetail) return null;
                                const { actorDetail, characterName } = member;

                                return (
                                    <Link
                                        to={`/aktorzy-glosowi/${actorDetail.ksywka}`}
                                        key={actorDetail._id || index}
                                        className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-xl transition-all"
                                    >
                                        <div className="w-16 h-16 shrink-0">
                                            {actorDetail.image ? (
                                                <img
                                                    src={urlFor(actorDetail.image).width(200).height(200).url()}
                                                    alt={actorDetail.imie || "Aktor"}
                                                    className="w-full h-full rounded-full object-cover border-2 border-emerald-500/20"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-gray-600 text-[10px] text-center border-2 border-gray-700 p-1">
                                                    Brak foto
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h3 className="text-gray-50 font-semibold truncate">
                                                {`${actorDetail.imie || 'Nieznany'} ${actorDetail.ksywka ? `"${actorDetail.ksywka}"` : ''} ${actorDetail.nazwisko || ''}`.trim()}
                                            </h3>
                                            <span className="bg-gradient-to-b from-emerald-50 to-orange-400 bg-clip-text text-transparent text-sm font-medium">
                                                {characterName || "Nieokreślona"}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}






                {post.partnerCast && Array.isArray(post.partnerCast) && post.partnerCast.length > 0 && (
                    <div className="mt-8 p-2">
                        <h2 className="text-gray-200 text-xl font-bold mb-4">Występ gościnny:</h2>
                        <div className="grid grid-cols-1 gap-2">
                            {post.partnerCast.map((member: any, index: number) => {
                                if (!member?.actorDetail) return null;
                                const { actorDetail, characterName } = member;

                                return (
                                    <div
                                        key={actorDetail._id || index}
                                        className="flex items-center gap-4 group hover:bg-white/5 p-2 rounded-xl transition-all"
                                    >
                                        <div className="w-16 h-16 shrink-0">
                                            {actorDetail.image ? (
                                                <img
                                                    src={urlFor(actorDetail.image).width(200).height(200).url()}
                                                    alt={actorDetail.imie || "Aktor"}
                                                    className="w-full h-full rounded-full object-cover border-2 border-emerald-500/20"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-gray-600 text-[10px] text-center border-2 border-gray-700 p-1">
                                                    <img
                                                        src={"/scul_partnerski.png"}
                                                        alt={actorDetail.imie || "Aktor"}
                                                        className="w-full h-full rounded-full object-cover border-2 border-emerald-500/20"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h3 className="text-gray-50 font-semibold truncate">
                                                {`${actorDetail.imie || 'Nieznany'} ${actorDetail.ksywka ? `"${actorDetail.ksywka}"` : ''} ${actorDetail.nazwisko || ''}`.trim()}
                                            </h3>
                                            <span className="bg-gradient-to-b from-sky-50 to-blue-200 bg-clip-text text-transparent text-sm font-medium">
                                                {characterName || "Nieokreślona"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/*Występ gościnny*/}
            </div>
        </div>
    );
}