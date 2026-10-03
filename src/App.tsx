import { useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import i18n from './i18n';
import { useLang } from './useLang';
import { Home } from './home';
import { About } from './about';
import { PostDetail } from './post/postDetail';
import { VoiceActorsDetail } from './aktorzy-glosowi/voiceActorsDetail';
import { AllVoiceActors } from './allVoiceActors.tsx';
import { Portfolio } from './portfolio.tsx';
import { PrivatePolicy } from './polityka-prywatnosci.tsx';
import { NotFoundPage } from './404.tsx';

// "/" = wersja polska, "/en" = wersja angielska (te same podstrony pod innym prefiksem)
const PREFIXES = ['/', '/en'];

function App() {
  const { lang } = useLang();

  // przy przejściu między /about a /en/about przełącz język i18next
  useLayoutEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <div>
      <Routes>
        {PREFIXES.map((prefix) => (
          <Route key={prefix} path={prefix}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="aktorzy-glosowi" element={<AllVoiceActors />} />
            <Route path="aktorzy-glosowi/:id" element={<VoiceActorsDetail />} />
            <Route path="polityka-prywatnosci" element={<PrivatePolicy />} />
          </Route>
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
