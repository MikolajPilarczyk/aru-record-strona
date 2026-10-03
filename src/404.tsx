import { useTranslation } from 'react-i18next';
import { LocalizedLink as Link } from './LocalizedLink';

export function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-[#172440] p-6 md:p-12 flex flex-col items-center justify-center">
            <div className="py-12 px-6 max-w-xl w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl overflow-hidden text-center shadow-2xl">
                {/* Główny nagłówek z efektem świecenia */}


                {/* Treść błędu */}
                <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-white">
                    {t('notFound.title')}
                </h2>

                <p className="mt-3 text-gray-400 max-w-sm mx-auto text-sm md:text-base">
                    {t('notFound.text')}
                </p>

                {/* Przycisk akcji */}
                <div className="mt-8">
                    <Link
                        to="/"
                        className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        {t('notFound.backHome')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
