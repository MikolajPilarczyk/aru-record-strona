import { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';
import { PortableText } from '@portabletext/react';
import { Routes, Route, Link } from 'react-router-dom';
import { About } from './about';
import './index.css';
import { PostDetail } from './post/postDetail';
import { Navigation } from './navigation';
import { Hero } from './hero';
import { Services } from './services';
import { VoiceActorsDetail } from "./aktorzy-glosowi/voiceActorsDetail"
import VoiceActors from './voiceActors';
import { Contact } from './contact';
import Posty from './posty';

export function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Zapytanie GROQ - upewnij się, że pobierasz wszystkie potrzebne pola
    client.fetch('*[_type == "post"]{ _id, slug, title, mainImage, body }')
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div>
    <Hero/>
    <Services/>
    <Posty/>
    <VoiceActors/>
    <Contact/>
    </div>);
}