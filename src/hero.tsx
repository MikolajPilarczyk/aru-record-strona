import { Play, Radio } from 'lucide-react';
import './index.css';

export function Hero() {
  return (
    <section id="hero" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
              <Radio className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-gray-300">Profesjonalne studio dubbingowe</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white leading-tight">
              Twój głos,<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                nasza pasja
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              Specjalizujemy się w dubbingu filmów, seriali, gier i materiałów reklamowych. 
              Profesjonalni lektorzy, najwyższa jakość dźwięku.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg bg-clip-padding hover:opacity-90 transition-opacity flex items-center gap-2">
                <Play className="w-5 h-5" />
                Zobacz nasze prace
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                Kontakt
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-2xl blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}