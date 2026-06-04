import { useEffect, useState } from "react";
import { client, urlFor } from "./sanityClient.ts";
import { Link } from "react-router-dom";
import { Search, Calendar, CalendarArrowUp, CalendarArrowDown } from "lucide-react";
import { Seo } from "./seo.tsx";

export function Portfolio() {
    const [posts, setPosts] = useState<any[]>([]);
    const [searchTags, setSearchTags] = useState('');
    const [search, setSearch] = useState('');
    const [orderAsc, setOrderAsc] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = {
            search: search.trim() !== "" ? `${search}*` : "*",
            searchTags: searchTags !== "" ? `${searchTags}*` : "*"
        };

        if (search === "Szczury Walczące na miecze świetlne") {
            alert("Pow Pow");
        }

        const order = orderAsc ? "asc" : "desc";

        const query = `*[_type == "post" && (title match $search && tags[] match $searchTags)] | order(publishedAt ${order}) {
        _id,
        title,
        slug,
        publishedAt,
        "tags": tags[],
        image,
        body
    }`;

        client.fetch(query, params)
            .then(setPosts)
            .catch(console.error);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        client.fetch('*[_type == "post"] | order(publishedAt desc) {_id,title,slug,publishedAt,"tags": tags[],image,body}')
            .then(setPosts)
            .catch(console.error);
    }, []);

    return (
        <section id="voices" className="relative py-20 bg-gradient-to-b from-[#14203D] to-[#172440] md:min-h-screen">
            <Seo
                title="Portfolio"
                description="Zobacz portfolio AruRecord: dubbing, spolszczenia, animacje, scenki, covery i inne projekty głosowe naszego studia."
                path="/portfolio"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* NAGŁÓWEK */}
                <div className="text-left mb-12 pt-15">
                    <div>
                        <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasze Portfolio</h2>
                        <div className="w-60 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mb-5" />
                        <p className="text-gray-400 mt-4 max-w-2xl text-left">
                            Oto projekty nad jakimi ostatnio pracowaliśmy
                        </p>
                    </div>
                    {search === "Szczury Walczące na miecze świetlne" && (
                        <img src="/scul%20blancior.png" alt="Easter Egg" className="w-50 transition-all duration-150 mt-4" />
                    )}
                </div>

                <h3 className="text-gray-100 px-1 text-2xl mb-5">Wyszukaj naszego projektu</h3>

                {/* POPRAWIONY FORMULARZ WYSZUKIWANIA */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center mb-10 w-full max-w-4xl">

                    {/* Wyszukiwarka tekstowa - zajmuje max przestrzeni */}
                    <div className="flex-1 min-w-0">
                        <input
                            onChange={handleChange}
                            name="searchData"
                            type="text"
                            className="bg-gray-600 px-5 text-gray-50 w-full p-3 rounded-full border-2 focus:outline-none focus:border-gray-300 border-gray-400 shadow-xl/20 shadow-emerald-300 placeholder:text-sm"
                            placeholder="Szczury Walczące na miecze świetlne..."
                        />
                    </div>

                    {/* Select, strzałka i lupa w jednym rzędzie na mobilce i desktopie */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                            onChange={(e) => setSearchTags(e.target.value)}
                            className="bg-gray-600 text-sm shadow-lg border-gray-400 text-gray-100 p-3 rounded-full flex-1 sm:flex-initial sm:w-48 border-2 focus:outline-none"
                        >
                            <option value="*">Wszystkie projekty</option>
                            <option value="animacja">Animacja</option>
                            <option value="polecane">Polecane</option>
                            <option value="Pilot">Pilot</option>
                            <option value="Oficjalne">Oficjalne</option>
                            <option value="Scenka">Scenka</option>
                            <option value="Cover">Cover</option>
                        </select>

                        {/* Przycisk Sortowania daty (z dodanym type="button") */}
                        <button
                            type="button"
                            onClick={() => setOrderAsc(!orderAsc)}
                            className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-gray-100 p-3 hover:scale-110 transition-all duration-100 ease-in rounded-full shrink-0"
                        >
                            {orderAsc ? <CalendarArrowUp /> : <CalendarArrowDown />}
                        </button>

                        {/* Przycisk Szukaj */}
                        <button
                            type="submit"
                            className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-gray-100 p-3 hover:scale-110 transition-all duration-100 ease-in rounded-full shrink-0"
                        >
                            <Search />
                        </button>
                    </div>
                </form>

                {/* KONTENER Z FILRAMI / POSTAMI */}
                <div className="flex flex-wrap gap-y-6 pb-8 py-5">
                    {posts.map((post) => (
                        <Link
                            to={`/post/${post._id}`}
                            key={post._id}
                            className="w-full sm:w-1/2 lg:w-1/3 snap-start p-2"
                        >
                            <div className="group relative bg-gray-700/50 backdrop-blur-sm rounded-sm overflow-hidden border border-gray-600 hover:border-transparent transition-all duration-300 hover:scale-105">
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
                                    <div>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 pb-2">
                                                {post.tags.map((tag, index) => (
                                                    <p key={index} className="bg-gray-700/50 text-xs p-1 px-2 text-center text-gray-400 rounded-full border border-gray-600">
                                                        {tag}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
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

            </div>
        </section>
    );
}