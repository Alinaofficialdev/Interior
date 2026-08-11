import React from 'react';
import { Briefcase, MapPin, Send } from 'lucide-react';

export default function Careers() {
  const jobs = [
    { title: 'Senior Interior Architect', type: 'Full Time', location: 'Dubai Design District (D3)', desc: 'Lead luxury villa renovation concepts and technical AutoCAD / 3D Max drawings.' },
    { title: 'Joinery Workshop Foreman', type: 'Full Time', location: 'Al Quoz Industrial, Dubai', desc: 'Oversee custom CNC wood cutting, veneering, and assembly in our private factory.' },
    { title: 'Property Snagging & MEP Inspector', type: 'Full Time', location: 'Dubai, UAE', desc: 'Conduct thermal imaging and comprehensive architectural handover audits for client villas.' }
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#C4795A] font-semibold text-xs uppercase tracking-widest">Join Our Craftsmen</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-2">Careers at Aura Interiors</h1>
          <p className="text-stone-300 mt-3 max-w-2xl mx-auto text-sm">
            Shape the future of luxury residential & commercial architecture in Dubai.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        <h2 className="font-serif text-3xl font-bold text-stone-900 mb-6">Open Positions</h2>
        <div className="space-y-6">
          {jobs.map((j, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                  {j.type}
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">{j.title}</h3>
                <p className="text-stone-600 text-sm mt-2">{j.desc}</p>
                <div className="flex items-center space-x-1 text-xs text-stone-500 mt-3">
                  <MapPin className="w-3.5 h-3.5 text-[#C4795A]" />
                  <span>{j.location}</span>
                </div>
              </div>
              <a
                href="mailto:careers@aurainteriors.ae"
                className="btn-terracotta text-center px-6 py-3 rounded-xl font-semibold text-xs shrink-0"
              >
                Apply via Email
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
