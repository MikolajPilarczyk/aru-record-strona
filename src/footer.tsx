import { Mic } from "lucide-react";
import {Link} from "react-router-dom";

export function Footer()
{
    return(
        <footer className="relative bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-emerald-400 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-cyan-400 to-green-300 bg-clip-text text-transparent">
                Aru Record
              </span>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2026 Aru Record. Wszelkie prawa zastrzeżone.
            </p>
            
            <div className="flex space-x-6">
              <Link to={"polityka-prywatnosci"}>
              <a  className="text-gray-400 hover:text-purple-400 transition-colors">
                Polityka prywatności
              </a>
              </Link>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Regulamin
              </a>
            </div>
          </div>
        </div>
      </footer>


    );
}