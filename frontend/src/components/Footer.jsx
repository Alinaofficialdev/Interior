import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Footer() {
  const { settings } = useSite();

  return (
    <footer className="bg-gradient-to-b from-stone-950 to-[#0f0e0e] text-stone-300 pt-20 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-stone-800/80">
          
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C4795A] to-[#5C7A6B] flex items-center justify-center text-white font-serif font-bold text-xl shadow-xl ring-2 ring-white/20">
                A
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">AURA</span>
            </div>
            <p className="text-base text-stone-400 leading-relaxed">
              {settings.tagline || 'Premier luxury interior design, custom joinery, villa renovation, and contracting firm operating in Dubai, UAE.'}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={settings.socialMedia?.instagram || 'https://www.instagram.com/'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#C4795A] hover:bg-stone-800 transition shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={settings.socialMedia?.facebook || 'https://www.facebook.com/'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#C4795A] hover:bg-stone-800 transition shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={settings.socialMedia?.linkedin || 'https://www.linkedin.com/'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#C4795A] hover:bg-stone-800 transition shadow-lg">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3 text-base text-stone-400">
              <li><Link to="/about" className="hover:text-[#C4795A] transition font-medium">About Aura Interiors</Link></li>
              <li><Link to="/services" className="hover:text-[#C4795A] transition font-medium">Our Services</Link></li>
              <li><Link to="/projects" className="hover:text-[#C4795A] transition font-medium">Project Portfolio</Link></li>
              <li><Link to="/design-styles" className="hover:text-[#C4795A] transition font-medium">Interior Design Styles</Link></li>
              <li><Link to="/reviews" className="hover:text-[#C4795A] transition font-medium">Client Reviews</Link></li>
              <li><Link to="/careers" className="hover:text-[#C4795A] transition font-medium">Careers & Openings</Link></li>
            </ul>
          </div>

          {/* Col 3: Renovation Services */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-6">Specialist Services</h3>
            <ul className="space-y-3 text-base text-stone-400">
              <li><Link to="/services/villa-renovation" className="hover:text-[#C4795A] transition font-medium">Villa Renovation Dubai</Link></li>
              <li><Link to="/services/bespoke-joinery" className="hover:text-[#C4795A] transition font-medium">Bespoke Joinery & Millwork</Link></li>
              <li><Link to="/services/kitchen-renovation" className="hover:text-[#C4795A] transition font-medium">Luxury Kitchen Remodeling</Link></li>
              <li><Link to="/services/microcement" className="hover:text-[#C4795A] transition font-medium">Seamless Microcement</Link></li>
              <li><Link to="/services/property-inspection" className="hover:text-[#C4795A] transition font-medium">Property Snagging & Inspection</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-6">Dubai Office</h3>
            <ul className="space-y-4 text-base text-stone-400">
              <li className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#C4795A] shrink-0 mt-0.5" />
                <span>{settings.address || 'Design District (D3), Building 4, Suite 302, Dubai, UAE'}</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-[#C4795A] shrink-0" />
                <a href={`tel:${(settings.phone || '+97148009988').replace(/[^+\d]/g, '')}`} className="hover:text-[#C4795A] transition">
                  {settings.phone || '+971 4 800 9988'}
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-[#C4795A] shrink-0" />
                <a href={`mailto:${settings.email || 'info@aurainteriors.ae'}`} className="hover:text-[#C4795A] transition">
                  {settings.email || 'info@aurainteriors.ae'}
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-[#5C7A6B] shrink-0" />
                <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-sm text-stone-500">
          <p>© {new Date().getFullYear()} {settings.companyName || 'Aura Interiors'}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6 sm:mt-0">
            <Link to="/admin/login" className="hover:text-stone-300 transition font-medium">Staff Portal Login</Link>
            <Link to="/contact" className="hover:text-stone-300 transition font-medium">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-stone-300 transition font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
