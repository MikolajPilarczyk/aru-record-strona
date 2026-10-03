import './index.css';
import { Hero } from './hero';
import { Services } from './services';
import VoiceActors from './voiceActors';
import { Contact } from './contact';
import LatestVideos from './youtubeConnect';
import { organizationJsonLd, Seo, webSiteJsonLd } from './seo';
import { useLang } from './useLang';

export function Home() {
  const { lang } = useLang();

  return (
    <div className="max-w-full overflow-x-hidden">
    <Seo jsonLd={[organizationJsonLd(), webSiteJsonLd(lang)]} />
    <Hero/>
    <LatestVideos/>
    <VoiceActors/>
      <Services/>
    <Contact/>
    </div>);
}
