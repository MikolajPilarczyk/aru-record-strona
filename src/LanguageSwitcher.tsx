import { Link } from 'react-router-dom';
import { SUPPORTED_LANGS } from './i18n';
import { useLang } from './useLang';

export function LanguageSwitcher({ onClick }: { onClick?: () => void }) {
  const { lang, pathFor } = useLang();

  return (
    <div className="flex items-center gap-1 text-sm" role="group" aria-label="Language">
      {SUPPORTED_LANGS.map((l) => (
        <Link
          key={l}
          to={pathFor(l)}
          onClick={onClick}
          hrefLang={l}
          aria-current={l === lang ? 'true' : undefined}
          className={`px-2 py-1 rounded uppercase transition-colors ${
            l === lang
              ? 'text-emerald-400 font-bold'
              : 'text-gray-400 hover:text-emerald-500'
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
