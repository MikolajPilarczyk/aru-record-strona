import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../sanityClient'; // sprawdź ścieżkę
import { PortableText } from '@portabletext/react';

export function VoiceActorsDetail() {
    const portableTextComponents = {
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
                )
            },
        },
        block: {
            // Definiujemy jak mają wyglądać nagłówki i akapity
            h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h3>,
            normal: ({ children }) => <p className="mb-4">{children}</p>,
            blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-400">
                    {children}
                </blockquote>
            ),
        },
        list: {
            // Tailwind 'prose' zajmie się stylem, ale warto upewnić się, że tagi są poprawne
            bullet: ({ children }) => <ul className="list-disc ml-6 mb-6 space-y-2">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal ml-6 mb-6 space-y-2">{children}</ol>,
        },
        marks: {
            // Obsługa linków
            link: ({ children, value }) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                return (
                    <a
                        href={value.href}
                        rel={rel}
                        className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4"
                    >
                        {children}
                    </a>
                )
            },
        },
    }



    const { id } = useParams();
    const [actors, setActor] = useState<any>(null);

    useEffect(() => {
        // Poprawione zapytanie: $id jako parametr i [0] na końcu, aby dostać 1 obiekt
        const query = `*[_type == "voiceAcotrs" && _id == $id][0]{ 
            _id, 
            imie, 
            ksywka, 
            nazwisko, 
            specialization, 
            image, 
            body,
            "demo": demo.asset->url
        }`;
        
        client.fetch(query, { id }).then((data) => {
          setActor(data);
        }).catch(console.error);
      }, [id]);
    
    if (!actors) return <div className="min-h-screen bg-gray-880 flex items-center justify-center text-white">Wczytywanie głosu...</div>;
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 md:p-12">
      <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden ">
        

        <div className="p-8 md:p-12">
            <div className="flex items-center justify-between">
                {actors.image && (
                    <div className="w-75 h-full">
                        <img
                            src={urlFor(actors.image).url()}
                            className="w-full h-full rounded-4xl object-cover  transition-transform duration-500 "
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

          {/* Treść (body) z bazy */}
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



            <audio
                controls
                className="w-1/2 h-12 rounded-lg bg-gray-900 p-2 shadow-2xl accent-orange-500 border border-gray-700"
            >
                <source src={actors.demo} type="audio/wav" />
            </audio>
        </div>

      </div>
    </div>
);
}