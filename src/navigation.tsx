import { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from './LocalizedLink';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLang } from './useLang';
import './App.css';
import './index.css';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { localePath } = useLang();

  // Funkcja pomocnicza do zamykania menu i przewijania na samą górę
  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-slate-800 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <div className="flex items-center gap-2">
              <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2">
                <img src="/ARU_logo.png" alt={t('nav.logoAlt')} className="w-13 h-13 p-1 rounded-lg" />
                <p className="text-xl font-bold text-white">Aru Record</p>
              </Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-emerald-500 transition-colors">
                {t('nav.home')}
              </Link>
              <Link to="/portfolio" className="text-gray-300 hover:text-emerald-500 transition-colors">
                {t('nav.portfolio')}
              </Link>
              <Link to="/aktorzy-glosowi" className="text-gray-300 hover:text-emerald-500 transition-colors">
                {t('nav.actors')}
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-emerald-500 transition-colors">
                {t('nav.about')}
              </Link>

              <LanguageSwitcher />

              <HashLink to={localePath('/#contact')}>
                <button className="px-6 py-2 bg-gradient-to-r from-[#1e7707] to-[#2ca3e1] hover:scale-105 transition-all duration-200 text-white rounded-lg">
                  {t('nav.contact')}
                </button>
              </HashLink>
            </div>

            {/* MOBILE MENU BUTTON (Hamburger / Paski) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white focus:outline-none relative w-8 h-8 flex flex-col justify-center items-center z-50"
                aria-label={t('nav.toggleMenu')}
            >
              {/* Górny pasek */}
              <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? 'rotate-45' : '-translate-y-2'
                  }`}
              />
              {/* Środkowy pasek */}
              <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-200 ease-in-out ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              {/* Dolny pasek */}
              <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isOpen ? '-rotate-45' : 'translate-y-2'
                  }`}
              />
            </button>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
              <div className="md:hidden py-4  flex flex-col gap-4 animate-fadeIn justify-center items-center bg-slate-700 opacity-80  rounded-b-2xl ">
                <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-emerald-500 transition-colors px-2 py-1"
                >
                  {t('nav.home')}
                </Link>
                <Link
                    to="/portfolio"
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-emerald-500 transition-colors px-2 py-1"
                >
                  {t('nav.portfolio')}
                </Link>
                <Link
                    to="/aktorzy-glosowi"
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-emerald-500 transition-colors px-2 py-1"
                >
                  {t('nav.actors')}
                </Link>
                <Link
                    to="/about"
                    onClick={handleLinkClick}
                    className="text-gray-300 hover:text-emerald-500 transition-colors px-2 py-1 justify-center items-center z-50"
                >
                  {t('nav.about')}
                </Link>

                <LanguageSwitcher onClick={() => setIsOpen(false)} />

                <HashLink to={localePath('/#contact')} onClick={() => setIsOpen(false)} >
                  <button  className="text-gray-300 hover:text-emerald-500 transition-colors px-2 py-1 justify-center items-center z-50">
                    {t('nav.contact')}
                  </button>
                </HashLink>
              </div>
          )}
        </div>
      </nav>
  );
}
