import './index.css';
import { Hero } from './hero';
import { Services } from './services';
import VoiceActors from './voiceActors';
import { Contact } from './contact';
import LatestVideos from './youtubeConnect';
import { organizationJsonLd, Seo, webSiteJsonLd } from './seo';

export function Home() {

  return (
    <div className="max-w-full overflow-x-hidden">
    <Seo jsonLd={[organizationJsonLd(), webSiteJsonLd()]} />
    <Hero/>
    <LatestVideos/>
    <VoiceActors/>
      <Services/>
    <Contact/>
    </div>);
}
