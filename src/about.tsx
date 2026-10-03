import { Mic2, Users, Trophy, Radio, ArrowRight } from 'lucide-react';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from './LocalizedLink';
import { Seo } from "./seo";

export function About() {
  const { t } = useTranslation();

  const stats = [
    { key: 'quality', icon: Trophy },
    { key: 'speed', icon: Mic2 },
    { key: 'actors', icon: Users },
    { key: 'translations', icon: Radio },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="about" className="relative min-h-screen w-full flex items-center  bg-gradient-to-b from-gray-900 to-[#172440]  overflow-hidden py-20  pt-35">
      <Seo
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        path="/about"
      />

      {/* Tło z mocniejszymi akcentami świetlnymi */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEWA STRONA: Treść */}
          <div className="order-2 lg:order-1 space-y-10">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold tracking-widest uppercase">
                {t('about.badge')}
              </span>
              <h1 className="text-5xl md:text-7xl font-luckiest text-white leading-[1.1]">
                {t('about.titleLine1')}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                 {t('about.titleLine2')}
                </span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed max-w-xl">
                {t('about.description')}
              </p>
            </div>

            {/* Statystyki w formie nowoczesnych kart */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
              {stats.map(({ key, icon: Icon }) => (
                <div key={key} className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors backdrop-blur-md">
                  <Icon className="w-6 h-6 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-white mb-1">{t(`about.stats.${key}.value`)}</div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-tight">{t(`about.stats.${key}.label`)}</div>
                </div>
              ))}
            </div>
            <Link to={"/portfolio"}>
              <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-1">
                {t('about.cta')} <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

          </div>

          {/* PRAWA STRONA: Duży wizual (Zdjęcie 16:9 lub Portrait) */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] lg:aspect-square group">
              <img
                src="/scul%20plose.png"
                alt={t('about.imageAlt')}
              />
              {/* Overlay gradientowy na zdjęciu */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
            </div>

            {/* Dekoracyjne elementy za zdjęciem */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
