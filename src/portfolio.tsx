import {useEffect, useState} from "react";
import {client, urlFor} from "./sanityClient.ts";
import {Link} from "react-router-dom";
import {Search, Calendar, CalendarArrowUp,CalendarArrowDown } from "lucide-react";

export function Portfolio()  {
    const [posts, setPosts] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [orderAsc, setOrderAsc] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(search=="Szczury Walczące na miecze świetlne")
        {
            alert("Pow Pow");
        }
        if(orderAsc) {


            const query = `*[_type == "post" && title match "${search}*"] | order(publishedAt asc) {
        _id,
        title,
        slug,
        publishedAt,
        image,
        body
            }`;
            client.fetch(query)
                .then(setPosts)
                .catch(console.error);
        }
        else {
            const query = `*[_type == "post" && title match "${search}*"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        image,
        body
            }`;
            client.fetch(query)
                .then(setPosts)
                .catch(console.error);
        }

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        client.fetch('*[_type == "post"] | order(publishedAt desc) {_id,title,slug,publishedAt,image,body}')
            .then(setPosts)
            .catch(console.error);
    }, []);

    return (
        <section id="voices" className="relative py-20 bg-gradient-to-b from-[#14203D] to-[#172440] md:min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">


                    <div className="text-left mb-16 pt-15 ">
                        <div>
                            <h2 className="text-4xl md:text-5xl mb-4 text-white font-luckiest">Nasze Portfolio</h2>
                            <div className="w-60 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto float-left mb-5" />
                            <p className="text-gray-400 mt-4 max-w-2xl text-left clear-both">
                                Oto projekty nad jakimi ostatnio pracowaliśmy
                            </p>
                        </div>
                        {

                            search=="Szczury Walczące na miecze świetlne"&&<img src={"/scul%20blancior.png"} className={"w-50 transition-all duration-150"} />
                        }

                    </div>

                </div>
                <h3 className="text-gray-100 px-2 text-2xl  my-5">Wyszukaj naszego projektu</h3>
                <form onSubmit={handleSubmit} className="md:flex  mb-10 ">
                    <input onChange={handleChange} name={"searchData"}  type={"text"} className="bg-gray-600
                     px-4 text-gray-50 w-80 md:w-150 p-2 rounded-full border-2 focus:outline-none focus:border-gray-300
                      border-gray-400 shadow-xl/20 shadow-emerald-300 placeholder:text-sm"
                           placeholder={"Szczury Walczące na miecze świetlne..." }/>
                    {
                        orderAsc?(
                            <button onClick={()=>setOrderAsc(false)} className="bg-gradient-to-br  from-emerald-500 to-cyan-500 mx-2 ml-4 text-gray-100 shadow-gray-400 shadow-xl/20 hover:scale-110
                     hover:shadow-white md:mt-0 mt-3  duration-100 p-2 ease-in rounded-full px-3"> <CalendarArrowUp></CalendarArrowUp></button>

                        ):(

                            <button onClick={()=>setOrderAsc(true)} className="bg-gradient-to-br  from-emerald-500 to-cyan-500 mx-2 ml-4 text-gray-100 shadow-gray-400 shadow-xl/20 hover:scale-110
                     hover:shadow-white md:mt-0 mt-3 duration-100 p-2 ease-in rounded-full px-3"> <CalendarArrowDown></CalendarArrowDown></button>
                        )
                    }


                    <button type={"submit"} className="bg-gradient-to-br  md:mt-0 mt-3 from-emerald-500 to-cyan-500 mx-2 text-gray-100 shadow-gray-400
                     shadow-xl/20 hover:scale-110 hover:shadow-white  duration-100 p-2 ease-in rounded-full px-3"><Search></Search></button>
                </form>
                {/* KONTENER */}
                <div className="flex flex-wrap gap-y-6 pb-8 py-5">
                    {posts.map((post) => (
                        <Link
                            to={`/post/${post._id}`}
                            key={post._id}
                            className="w-full sm:w-1/2 lg:w-1/4 snap-start p-2"
                        >
                            <div className="group relative bg-gray-700/50 backdrop-blur-sm rounded-sm overflow-hidden border border-gray-600 hover:border-transparent transition-all duration-300 hover:scale-105">
                                {/* Reszta Twojego kodu bez zmian */}
                                <div className={`absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

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

            </div>
        </section>
    );
}
