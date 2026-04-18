import {   Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faYoutube,faInstagram, faTiktok,faBluesky} from '@fortawesome/free-brands-svg-icons';

export function Contact()
{
return(
<section id="contact" className="relative py-20 bg-gradient-to-b from-[#14203D] to-[#172440] w-screen ">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-16">

    <h2 className="text-4xl md:text-5xl mb-4 text-white">Skontaktuj się z nami</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-green-500 mx-auto rounded-full" />
  </div>

  <div className="grid md:grid-cols-2 gap-12">
    <div className="space-y-8">



      <div className="flex items-start space-x-4 hover:scale-105 transition-all duration-150">
        <div className="w-12 h-12  bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon
              icon={faInstagram}
              size="xl"
              className={"text-gray-50"}
          />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-gray-200 pt-2 ">@arurec0rd</h3>
        </div>
      </div>

      <div className="flex items-start space-x-4 hover:scale-105 transition-all duration-150">
        <div className="w-12 h-12  bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center  justify-center flex-shrink-0">
          <FontAwesomeIcon
              icon={faTiktok}
              size="xl"
              className={"text-gray-50"}
          />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-gray-200 pt-2 ">@arurecord</h3>
        </div>
      </div>



      <div className="flex items-start space-x-4 hover:scale-105 transition-all duration-150">
        <div className="w-12 h-12  bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon
              icon={faYoutube}
              size="xl"
              className={"text-gray-50"}
          />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-gray-200 pt-2 ">Kanał YouTube</h3>
        </div>
      </div>

      <div className="flex items-start space-x-4 hover:scale-105 transition-all duration-150">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon
              icon={faDiscord}
              size="xl"
              className={"text-gray-50"}
            />
        </div>
        <div>
          <i className="fa-brands fa-discord"></i>
          <h3 className="text-xl mb-2 text-gray-200 pt-2 ">Serwer Discord</h3>
        </div>
      </div>

      <div className="flex items-start space-x-4 hover:scale-105 transition-all duration-150">
        <div className="w-12 h-12  bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon
              icon={faBluesky}
              size="xl"
              className={"text-gray-50"}
          />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-gray-200 pt-2 ">@arurecord.bsky.social</h3>
        </div>
      </div>
      <div className="flex items-start space-x-4 hover:scale-105 transition-all duration-150">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-gray-200 pt-2 ">arurecordmail@gmail.com</h3>
        </div>
      </div>
    </div>



    <div className="bg-[#172440] backdrop-blur-sm rounded-xl p-8 border border-slate-700">
      <form className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Imię i nazwisko</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Jan Kowalski"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="jan@example.com"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Wiadomość</label>
          <textarea 
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
            placeholder="Opisz swój projekt..."
          />
        </div>

        <button 
          type="submit"
          className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500  to-purple-500 text-white rounded-lg hover:scale-105 transition-transform"
        >
          Wyślij wiadomość
        </button>
      </form>
    </div>
  </div>
</div>
  <img src="/scul%20płaski.png" className="w-screen px-170 pt-20"/>
</section>
);
}