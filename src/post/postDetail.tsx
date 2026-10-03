import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import { PortableText } from '@portabletext/react';
import { Calendar } from 'lucide-react';

// Funkcja pomocnicza do parsowania ID z linków YouTube lub czystego ID
function extractYouTubeId(url: string) {
    if (!url) return '';
    if (url.length === 11 && !url.includes('/') && !url.includes('.')) {
        return url;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
}

export function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [videoSrc, setSrc] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        const LIBRARY_ID = '726936';
        const DEFAULT_VIDEO_ID = '866d7d44-b1db-4af3-b2b6-ee1311e31d22';

        const query = `*[_type == "post" && _id == $id][0]{ 
        title,
        publishedAt,
        body,
        image,
        bunnyId,
        ytLink,
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
        "nativeVideoUrl": nativeVideo.asset->url
    }`;

        client.fetch(query, { id })
            .then((data) => {
                setPost(data);

                // Automatyczne rozpoznawanie źródła wideo:
                if (data?.ytLink && data.ytLink.trim() !== '') {
                    const ytId = extractYouTubeId(data.ytLink);
                    setSrc(`https://www.youtube.com/embed/${ytId}`);
                } else if (data?.bunnyId && data.bunnyId.trim() !== '') {
                    setSrc(`https://player.mediadelivery.net/embed/${LIBRARY_ID}/${data.bunnyId}?autoplay=true&loop=false&muted=true&preload=true&responsive=true`);
                } else {
                    setSrc(`https://player.mediadelivery.net/embed/${LIBRARY_ID}/${DEFAULT_VIDEO_ID}?autoplay=true&loop=false&muted=true&preload=true&responsive=true`);
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Błąd podczas pobierania posta:", err);
                setSrc(`https://player.mediadelivery.net/embed/${LIBRARY_ID}/${DEFAULT_VIDEO_ID}?autoplay=true&loop=false&muted=true&preload=true&responsive=true`);
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Ładowanie...</div>;
    }

    if (!post) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Nie znaleziono wpisu.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#172440] p-6 md:p-12">
            <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden">
                <div className="mb-8">
                    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                        <iframe
                            id="main-video-player"
                            src={videoSrc}
                            loading="lazy"
                            style={{
                                border: 0,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                            }}
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen"
                            allowFullScreen
                        />
                    </div>
                </div>

                <h1 className="text-5xl md:text-3xl font-luckiest py-2 text-white mb-2 px-2">
                    {post.title || "Tytuł niedostępny"}
                </h1>

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
            </div>
        </div>
    );
}