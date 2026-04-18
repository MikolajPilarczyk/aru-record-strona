export function PrivatePolicy()
{
    return (
            <div className="min-h-screen  bg-gradient-to-b from-[#14203D] to-[#172440] py-12 px-4 flex justify-center items-start ">
                <div className="w-full max-w-3xl 0 rounded-2xl p-8">

                    <h1 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
                        Polityka Prywatności
                    </h1>

                    <div className="space-y-8 text-gray-300">

                        {/* 1. Administrator Danych */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">1. Administrator Danych</h2>
                            <p>
                                Administratorem danych osobowych zbieranych za pośrednictwem strony jest: <br />
                                <span className="text-purple-400 font-mono text-sm">[TWOJE IMIĘ I NAZWISKO / NAZWA FIRMY]</span><br />
                                Adres do kontaktu: <span className="text-purple-400 font-mono text-sm">[TWÓJ E-MAIL KONTAKTOWY]</span>
                            </p>
                        </section>

                        {/* 2. Formularz Kontaktowy */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">2. Formularz Kontaktowy</h2>
                            <p>
                                Dane podane w formularzu kontaktowym (imię, adres e-mail, treść wiadomości) przetwarzane są wyłącznie w celu udzielenia odpowiedzi na Twoje zapytanie.
                            </p>
                        </section>

                        {/* 3. Google Analytics i Reklamy */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">3. Analityka i Reklamy (Google)</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Google Analytics:</strong> Korzystamy z narzędzi Google w celu zbierania anonimowych statystyk ruchu na stronie (np. czas spędzony na stronie, rodzaj przeglądarki). Dane te pomagają nam ulepszać serwis.
                                </li>
                                <li>
                                    <strong>Reklamy Google (AdSense):</strong> Na stronie mogą być wyświetlane reklamy. Google korzysta z plików cookies (np. cookie DART), aby wyświetlać reklamy dopasowane do Twoich zainteresowań na podstawie wizyt w tym i innych serwisach.
                                </li>
                                <li>
                                    Możesz zarządzać ustawieniami reklam lub zrezygnować z personalizacji w ustawieniach swojego konta Google.
                                </li>
                            </ul>
                        </section>

                        {/* 4. Odbiorcy Danych */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">4. Kto odbiera dane?</h2>
                            <p className="mb-2">Twoje dane mogą być przekazywane następującym podmiotom:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Operator hostingu:</strong> <span className="text-purple-400 font-mono text-sm">[NAZWA HOSTINGU, np. Vercel / Netlify]</span> – w celu przechowywania danych na serwerze.</li>
                                <li><strong>Google LLC:</strong> W zakresie usług analitycznych i reklamowych.</li>
                                <li><strong>Uprawnione organy państwowe:</strong> Tylko jeśli wystąpią z taką prośbą na podstawie przepisów prawa.</li>
                            </ul>
                        </section>

                        {/* 5. Prawa Użytkownika */}
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-3">5. Twoje Prawa</h2>
                            <p>
                                Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia ("prawo do bycia zapomnianym"), ograniczenia przetwarzania oraz prawo do wniesienia sprzeciwu wobec przetwarzania.
                            </p>
                        </section>

                        <div className="pt-8 text-sm text-gray-500 italic border-t border-gray-700 text-center">
                            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
                        </div>

                    </div>
                </div>
            </div>
    );
}