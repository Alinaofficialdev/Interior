import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Compass, Shield, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { settings } = useSite();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Design Styles', path: '/design-styles' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-stone-900/98 backdrop-blur-xl shadow-2xl py-4 border-b border-stone-800 text-white' : 'bg-stone-900/90 backdrop-blur-md py-6 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C4795A] to-[#5C7A6B] flex items-center justify-center text-white font-serif font-bold text-2xl shadow-xl ring-2 ring-white/20">
              A
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white group-hover:text-[#C4795A] transition-colors">
                AURA
              </span>
              <span className="block text-[10px] tracking-widest text-stone-400 uppercase font-sans font-semibold">
                INTERIORS DUBAI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isActive ? 'text-[#C4795A] font-bold' : 'text-stone-300 hover:text-white hover:scale-105'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions: WhatsApp & Book Consultation */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <Link
                to="/admin"
                className="text-xs font-bold px-4 py-2 rounded-lg border border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700 transition"
              >
                Dashboard ({user.role})
              </Link>
            ) : null}

            <a
              href={`https://wa.me/${settings.whatsapp ? settings.whatsapp.replace(/\+/g, '') : '971501234567'}?text=Hello%20Aura%20Interiors,%20I%20would%20like%20to%20inquire%20about%20renovation%20services.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-sm font-bold px-4 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30 transition shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/consultation"
              className="btn-terracotta text-sm font-bold px-6 py-3 rounded-xl flex items-center space-x-2 shadow-xl"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-stone-300 hover:text-white rounded-xl focus:outline-none bg-white/5 hover:bg-white/10 transition"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-stone-900/98 backdrop-blur-xl border-b border-stone-800 px-4 pt-4 pb-8 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-semibold text-stone-300 hover:text-[#C4795A] py-3 px-4 rounded-xl hover:bg-white/5 transition"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-stone-800 space-y-4">
            <Link
              to="/consultation"
              onClick={() => setIsOpen(false)}
              className="w-full btn-terracotta text-center py-4 rounded-xl text-base font-bold block shadow-xl"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
