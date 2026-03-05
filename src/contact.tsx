import { MapPin, Phone, Mail } from 'lucide-react';


export function Contact()
{
return(
<section id="contact" className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800 ">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl mb-4 text-white">Skontaktuj się z nami</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-green-500 mx-auto rounded-full" />
  </div>

  <div className="grid md:grid-cols-2 gap-12">
    <div className="space-y-8">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-emerald-400 rounded-lg flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-white">Email</h3>
          <p className="text-gray-400">kontakt@voicestudio.pl</p>
          <p className="text-gray-400">biuro@voicestudio.pl</p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-12 h-12  bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-white">Telefon</h3>
          <p className="text-gray-400">+48 123 456 789</p>
          <p className="text-gray-400">+48 987 654 321</p>
        </div>
      </div>

      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl mb-2 text-white">Adres</h3>
          <p className="text-gray-400">ul. Dubbingowa 15</p>
          <p className="text-gray-400">00-001 Warszawa</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
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
</section>
);
}