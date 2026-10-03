import { Mic2, Film, Gamepad2, Megaphone, Users, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './index.css';

export function Services() {
  const { t } = useTranslation();

  const services = [
    { key: 'film', icon: Film, color: 'from-[#1e7707] to-[#2ca3e1]' },
    { key: 'games', icon: Gamepad2, color: 'from-green-300 to-blue-400' },
    { key: 'ads', icon: Megaphone, color: 'from-[#1e7707] to-[#2ca3e1]' },
    { key: 'voiceover', icon: Mic2, color: 'from-green-300 to-blue-400' },
    { key: 'audiobooks', icon: Users, color: 'from-[#1e7707] to-[#2ca3e1]' },
    { key: 'translations', icon: Languages, color: 'from-green-300 to-blue-400' },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#14203D] w-screen max-w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.key}
              className="group p-6 bg-[#172440]  rounded-xl border border-gray-800 hover:border-gray-700 transition-all hover:transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl text-white mb-2">
                {t(`services.items.${service.key}.title`)}
              </h3>
              <p className="text-gray-400">
                {t(`services.items.${service.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
