import './index.css';
import { Hero } from './hero';
import { Services } from './services';
import VoiceActors from './voiceActors';
import { Contact } from './contact';
import Posty from './posty';

export function Home() {

  return (
    <div>
    <Hero/>
    <Services/>
    <Posty/>
    <VoiceActors/>
    <Contact/>
    </div>);
}