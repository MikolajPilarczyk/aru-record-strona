import { Routes, Route,} from 'react-router-dom';
import './App.css';
import { Home } from './home';
import { About } from './about';
import './index.css';
import { PostDetail } from './post/postDetail';
import { VoiceActorsDetail } from "./aktorzy-glosowi/voiceActorsDetail"
import {AllVoiceActors} from "./allVoiceActors.tsx";
import {Portfolio} from "./portfolio.tsx";

function App() {
  
  return (
    
    <div>
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/aktorzy-glosowi" element={<AllVoiceActors />} />
          <Route path="/aktorzy-glosowi/:id" element={<VoiceActorsDetail />} />

    </Routes> 
  </div>
  );
}

export default App;