import { Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faYoutube, faInstagram, faTiktok, faBluesky } from '@fortawesome/free-brands-svg-icons';
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const currentTime = new Date().toLocaleString('pl-PL');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSending(true);
    setStatus(null);

    try {
      await emailjs.send(
          'service_2rj9ih2',
          'template_n8ehzd1',
          {
            name: data.fullName,
            email: data.email,
            message: data.message,
            time: currentTime,
          },
          '6z4rR7DOS8-R-xdXb'
      );

      setStatus('success');
      reset();
    } catch (error) {
      console.error('Błąd EmailJS:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
      <section id="contact" className="relative py-20 bg-gradient-to-b from-[#14203D] to-[#172440] w-screen max-w-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white">Skontaktuj się z nami</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-green-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* LEWA KOLUMNA - SOCIAL MEDIA */}
            <div className="space-y-8">
              {/* Instagram */}
              <div className="flex items-start">
                <a href="https://www.instagram.com/arurec0rd/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:scale-105 transition-all duration-150 hover:opacity-85">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faInstagram} size="xl" className="text-gray-50" />
                  </div>
                  <h3 className="text-xl text-gray-200 hover:text-emerald-100">@arurec0rd</h3>
                </a>
              </div>

              {/* TikTok */}
              <div className="flex items-start">
                <a href="https://www.tiktok.com/@arurecord" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:scale-105 transition-all duration-150 hover:opacity-85">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faTiktok} size="xl" className="text-gray-50" />
                  </div>
                  <h3 className="text-xl text-gray-200 hover:text-emerald-100">@arurecord</h3>
                </a>
              </div>

              {/* YouTube */}
              <div className="flex items-start">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:scale-105 transition-all duration-150 hover:opacity-85">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faYoutube} size="xl" className="text-gray-50" />
                  </div>
                  <h3 className="text-xl text-gray-200 hover:text-emerald-100">Kanał YouTube</h3>
                </a>
              </div>

              {/* Discord */}
              <div className="flex items-start">
                <a href="https://discord.gg/82NaCbJXFU" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:scale-105 transition-all duration-150 hover:opacity-85">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faDiscord} size="xl" className="text-gray-50" />
                  </div>
                  <h3 className="text-xl text-gray-200 hover:text-emerald-100">Serwer Discord</h3>
                </a>
              </div>

              {/* BlueSky */}
              <div className="flex items-start">
                <div className="flex items-center space-x-4 hover:scale-105 transition-all duration-150 hover:opacity-85 cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faBluesky} size="xl" className="text-gray-50" />
                  </div>
                  <h3 className="text-xl text-gray-200 hover:text-emerald-100">@arurecord.bsky.social</h3>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="flex items-center space-x-4 hover:scale-105 transition-all duration-150 hover:opacity-85">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-200 hover:text-emerald-100">arurecordmail@gmail.com</h3>
                </div>
              </div>
            </div>

            {/* PRAWA KOLUMNA - FORMULARZ */}
            <div className="bg-[#172440] backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Imię i nazwisko</label>
                  <input
                      type="text"
                      {...register("fullName", { required: "To pole jest wymagane" })}
                      className={`w-full px-4 py-3 bg-gray-700 border ${errors.fullName ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors`}
                      placeholder="Jan Kowalski"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message?.toString()}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                      type="email"
                      {...register("email", {
                        required: "Email jest wymagany",
                        pattern: { value: /^\S+@\S+$/i, message: "Niepoprawny format email" }
                      })}
                      className={`w-full px-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors`}
                      placeholder="jan@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message?.toString()}</p>}
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Wiadomość</label>
                  <textarea
                      rows={4}
                      {...register("message", {
                        required: "Napisz chociaż kilka słów",
                        minLength: { value: 10, message: "Wiadomość musi mieć min. 10 znaków" }
                      })}
                      className={`w-full px-4 py-3 bg-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none`}
                      placeholder="Opisz swój projekt..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message?.toString()}</p>}
                </div>

                {status === 'success' && (
                    <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-400 p-3 rounded-lg text-center">
                      Wiadomość wysłana pomyślnie!
                    </div>
                )}
                {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg text-center">
                      Błąd wysyłki. Spróbuj ponownie.
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSending}
                    className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-purple-500 text-white rounded-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none font-bold"
                >
                  {isSending ? "Wysyłanie..." : "Wyślij wiadomość"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Image */}
        <div className="w-full mt-20">
          <img src="/scul%20płaski.png" alt="Footer" className="w-full h-auto object-contain px-4 md:px-20 lg:px-40" />
        </div>
      </section>
  );
}