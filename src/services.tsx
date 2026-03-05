import { Mic2, Film, Gamepad2, Megaphone, Users, Languages } from 'lucide-react';
import './index.css';

export function Services() {
  const services = [
    {
      icon: Film,
      title: 'Dubbing filmów i seriali',
      description: 'Profesjonalne tłumaczenie i udźwiękowienie produkcji filmowych i serialowych.',
      color: 'from-purple-400 to-purple-500'
    },
    {
      icon: Gamepad2,
      title: 'Lokalizacja gier',
      description: 'Kompleksowa obsługa dialogów, narracji i efektów dźwiękowych w grach.',
      color: 'from-blue-300 to-blue-400'
    },
    {
      icon: Megaphone,
      title: 'Reklamy i spoty',
      description: 'Produkcja głosowa do spotów reklamowych, materiałów promocyjnych i prezentacji.',
      color: 'from-purple-400 to-purple-500'
    },
    {
      icon: Mic2,
      title: 'Lektoring',
      description: 'Lektor dla dokumentów, filmów instruktażowych i materiałów edukacyjnych.',
      color: 'from-blue-300 to-blue-400'
    },
    {
      icon: Users,
      title: 'Audiobooki',
      description: 'Nagranie audiobooków z profesjonalnymi lektorami o charakterystycznych głosach.',
      color: 'from-purple-500 to-purple-500'
    },
    {
      icon: Languages,
      title: 'Tłumaczenia językowe',
      description: 'Dubbing w wielu językach z rodzimymi lektorami.',
      color: 'from-blue-300 to-blue-400'
    }
  ];
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-white mb-4">
            Nasze usługi
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Oferujemy kompleksową obsługę projektów dubbingowych na najwyższym poziomie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-b from-gray-900 to-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
