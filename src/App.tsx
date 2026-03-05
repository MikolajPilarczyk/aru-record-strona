import { Routes, Route,} from 'react-router-dom';
import './App.css';
import { Home } from './home';
import { About } from './about';
import './index.css';
import { PostDetail } from './post/postDetail';
import { Navigation } from './navigation';
import { Hero } from './hero';
import { Services } from './services';
import { VoiceActorsDetail } from "./aktorzy-glosowi/voiceActorsDetail"
import VoiceActors from './voiceActors';
function App() {
  
  return (
    
    <div>
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/aktorzy-glosowi/:id" element={<VoiceActorsDetail />} />

    </Routes> 
  </div>
  );
}

export default App;