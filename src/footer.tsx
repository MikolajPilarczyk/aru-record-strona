//import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export function Footer()
{
    const { t } = useTranslation();

    return(
        <footer className="relative bg-[#15223E] border-t border-slate-800 py-12 w-screen max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
             <img src={"/ARU_logo.png"} className={"w-8"}/>
              <span className="bg-gradient-to-r from-cyan-400 to-green-300 bg-clip-text text-transparent">
                Aru Record
              </span>
            </div>

            <p className="text-gray-400 text-sm">
              {t('footer.rights', { year: new Date().getFullYear() })}
            </p>
              {
                  /*
                  * <div className="flex space-x-6">
              <Link to={"polityka-prywatnosci"}>
              <a  className="text-gray-400 hover:text-purple-400 transition-colors">
                {t('footer.privacy')}
              </a>
              </Link>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                {t('footer.terms')}
              </a>
            </div>
                  *
                  *
                  * */


              }

          </div>
        </div>
      </footer>


    );
}
