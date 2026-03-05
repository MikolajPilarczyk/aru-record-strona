import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../sanityClient'; // sprawdź ścieżkę
import { PortableText } from '@portabletext/react';

export function VoiceActorsDetail() {
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
            body 
        }`;
        
        client.fetch(query, { id }).then((data) => {
          setActor(data);
        }).catch(console.error);
      }, [id]);
    
    // Loader w klimacie Twojej strony
    if (!actors) return <div className="min-h-screen bg-gray-880 flex items-center justify-center text-white">Wczytywanie głosu...</div>;
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6 md:p-12">
      <div className="py-7 max-w-4xl mx-auto backdrop-blur-md rounded-3xl overflow-hidden ">
        

        <div className="p-8 md:p-12">
          <h1 className="text-5xl md:text-7xl font-luckiest text-white mb-2">
            {`${actors.imie} "${actors.ksywka}" ${actors.nazwisko}`}
          </h1>
          <p className="text-cyan-400 text-xl font-medium mb-8">
            {actors.specialization}
          </p>
            
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

          {/* Treść (body) z bazy */}
          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            {actors.body ? (
              <PortableText value={actors.body} />
            ) : (
              <p className="italic text-gray-500">Ten lektor nie posiada jeszcze opisu profilu.</p>
            )}
          </div>
        </div>
        {actors.image && (
          <div className="w-full h-250">
            <img 
              src={urlFor(actors.image).url()} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={actors.ksywka || actors.imie} 
            />
          </div>
        )}
      </div>
    </div>
);
}