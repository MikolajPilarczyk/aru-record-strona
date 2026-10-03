import { useTranslation } from "react-i18next";
import { Seo } from "./seo";
import { useLang } from "./useLang";

export function PrivatePolicy()
{
    const { t } = useTranslation();
    const { locale } = useLang();

    return (
            <div className="min-h-screen  bg-gradient-to-b from-[#14203D] to-[#172440] py-12 px-4 flex justify-center items-start ">
                <Seo
                    title={t('privacy.seo.title')}
                    description={t('privacy.seo.description')}
                    path="/polityka-prywatnosci"
                    noindex
                />
                <div className="w-full max-w-3xl 0 rounded-2xl p-8">

                    <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
                        {t('privacy.title')}
                    </h1>

                    <div className="space-y-8 text-gray-300">

                        {/* 1. Administrator Danych */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.controller.heading')}</h2>
                            <p>
                                {t('privacy.controller.intro')} <br />
                                <span className="text-purple-400 font-mono text-sm">{t('privacy.controller.namePlaceholder')}</span><br />
                                {t('privacy.controller.contactLabel')} <span className="text-purple-400 font-mono text-sm">{t('privacy.controller.emailPlaceholder')}</span>
                            </p>
                        </section>

                        {/* 2. Formularz Kontaktowy */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.form.heading')}</h2>
                            <p>
                                {t('privacy.form.text')}
                            </p>
                        </section>

                        {/* 3. Google Analytics i Reklamy */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.analytics.heading')}</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>{t('privacy.analytics.ga.label')}</strong> {t('privacy.analytics.ga.text')}
                                </li>
                                <li>
                                    <strong>{t('privacy.analytics.ads.label')}</strong> {t('privacy.analytics.ads.text')}
                                </li>
                                <li>
                                    {t('privacy.analytics.manage')}
                                </li>
                            </ul>
                        </section>

                        {/* 4. Odbiorcy Danych */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.recipients.heading')}</h2>
                            <p className="mb-2">{t('privacy.recipients.intro')}</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>{t('privacy.recipients.hosting.label')}</strong> <span className="text-purple-400 font-mono text-sm">{t('privacy.recipients.hosting.placeholder')}</span> {t('privacy.recipients.hosting.text')}</li>
                                <li><strong>{t('privacy.recipients.google.label')}</strong> {t('privacy.recipients.google.text')}</li>
                                <li><strong>{t('privacy.recipients.authorities.label')}</strong> {t('privacy.recipients.authorities.text')}</li>
                            </ul>
                        </section>

                        {/* 5. Prawa Użytkownika */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">{t('privacy.rights.heading')}</h2>
                            <p>
                                {t('privacy.rights.text')}
                            </p>
                        </section>

                        <div className="pt-8 text-sm text-gray-500 italic border-t border-gray-700 text-center">
                            {t('privacy.lastUpdate', { date: new Date().toLocaleDateString(locale) })}
                        </div>

                    </div>
                </div>
            </div>
    );
}
