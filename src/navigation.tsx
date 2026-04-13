import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './index.css';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Start', href: '/#hero' },
    { label: 'Usługi', href: '/#services' },
    { label: 'Portfolio', href: '/#projects' },
    { label: 'O nas', href: '/about' },
    { label: 'Kontakt', href: ' #contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            </div>
            <Link to="/">
            <p className="text-xl font-bold text-white">Aru Record</p>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-purple-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
             <Link to="/about">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg bg-clip-padding hover:opacity-90 transition-opacity">
              Wycena
            </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-300 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-cyan-500 text-white rounded-lg  hover:opacity-90 transition-opacity">
              Wycena
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
