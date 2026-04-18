import './index.css';
import { Hero } from './hero';
import { Services } from './services';
import VoiceActors from './voiceActors';
import { Contact } from './contact';
import LatestVideos from './youtubeConnect';

export function Home() {

  return (
    <div>
    <Hero/>
    <LatestVideos/>
    <VoiceActors/>
      <Services/>
    <Contact/>
    </div>);
}