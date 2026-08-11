import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Award, Users, Building, CheckCircle2, ChevronRight, MessageCircleMore, Sparkles, TrendingUp } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { apiFetch } from '../services/api';

export default function Home() {
  const { settings } = useSite();
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [designStyles, setDesignStyles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [servRes, projRes, styleRes, revRes, partRes] = await Promise.all([
          apiFetch('/services'),
          apiFetch('/projects?featured=true&limit=6'),
          apiFetch('/design-styles'),
          apiFetch('/reviews'),
          apiFetch('/partners')
        ]);
        if (servRes.success) setServices(servRes.data.slice(0, 6));
        if (projRes.success) setFeaturedProjects(projRes.data);
        if (styleRes.success) setDesignStyles(styleRes.data.slice(0, 4));
        if (revRes.success) setReviews(revRes.data.slice(0, 3));
        if (partRes.success) setPartners(partRes.data);
      } catch (e) {
        console.error('Error loading home data:', e);
      }
    };
    loadHomeData();
  }, []);

  const stats = settings.statistics || { yearsExperience: 14, completedProjects: 350, teamMembers: 45, propertyInspections: 820, customerRating: 4.9 };

  return (
    <div className="pt-20">
      
      {/* FR-003: Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
            alt="Dubai Luxury Villa Interior"
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#C4795A]/20 border border-[#C4795A]/30 text-[#C4795A] text-xs font-semibold uppercase tracking-widest mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Dubai's Premier Turnkey Renovation & Joinery</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-stone-100 max-w-6xl mx-auto leading-[1.1] mb-8">
            Crafting Bespoke Luxury <br/>Interiors Across <span className="text-[#C4795A]">Dubai</span>
          </h1>

          <p className="text-xl sm:text-2xl text-stone-300 max-w-4xl mx-auto font-light leading-relaxed mb-12">
            From Palm Jumeirah villas to Downtown penthouses, we specialize in high-end architectural renovations, custom German millwork, microcement finishes, and DDA authority approvals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              to="/consultation"
              className="w-full sm:w-auto btn-terracotta text-base font-semibold px-10 py-5 rounded-2xl flex items-center justify-center space-x-3 shadow-2xl text-lg"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={`https://wa.me/${settings.whatsapp ? settings.whatsapp.replace(/\+/g, '') : '971501234567'}?text=Hello%20Aura%20Interiors,%20I%20want%20to%20discuss%20my%20renovation.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-base border border-emerald-500 flex items-center justify-center space-x-3 transition shadow-xl"
            >
              <MessageCircleMore className="w-5 h-5" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-stone-300 text-sm font-medium max-w-5xl mx-auto">
            <div className="flex flex-col items-center space-y-2 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <ShieldCheck className="w-8 h-8 text-[#C4795A]" />
              <span className="text-center">DDA & Dubai Municipality Approved</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <Award className="w-8 h-8 text-[#5C7A6B]" />
              <span className="text-center">10-Year Structural Warranty</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <Building className="w-8 h-8 text-[#C4795A]" />
              <span className="text-center">In-House Dubai Factory</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <Star className="w-8 h-8 text-amber-400 fill-current" />
              <span className="text-center">4.9 Star Rating ({reviews.length > 0 ? reviews.length : 48}+ Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FR-004: Company Statistics */}
      <section className="py-20 bg-gradient-to-r from-[#1A1817] to-[#2D2A28] text-white border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-stone-100">Our Excellence in Numbers</h2>
            <p className="text-stone-400 mt-4 text-lg">Trusted by Dubai's elite property owners since 2012</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="font-serif text-5xl font-bold text-[#C4795A]">{stats.yearsExperience}+</div>
              <div className="text-sm uppercase tracking-wider text-stone-400 mt-2 font-medium">Years Experience</div>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="font-serif text-5xl font-bold text-white">{stats.completedProjects}+</div>
              <div className="text-sm uppercase tracking-wider text-stone-400 mt-2 font-medium">Completed Projects</div>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="font-serif text-5xl font-bold text-[#5C7A6B]">{stats.teamMembers}+</div>
              <div className="text-sm uppercase tracking-wider text-stone-400 mt-2 font-medium">Dubai Craftsmen</div>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="font-serif text-5xl font-bold text-white">{stats.propertyInspections}+</div>
              <div className="text-sm uppercase tracking-wider text-stone-400 mt-2 font-medium">Property Inspections</div>
            </div>
            <div className="col-span-2 md:col-span-1 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition">
              <div className="font-serif text-5xl font-bold text-amber-400">{stats.customerRating}</div>
              <div className="text-sm uppercase tracking-wider text-stone-400 mt-2 font-medium">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C4795A] font-semibold text-sm uppercase tracking-widest">Why Aura Interiors</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mt-3">
              The Aura Difference
            </h2>
            <p className="text-stone-600 mt-4 text-lg leading-relaxed">
              What sets us apart from other interior design companies in Dubai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-[#C4795A]/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-[#C4795A]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">DDA Approved</h3>
              <p className="text-stone-600 leading-relaxed">Full Dubai Development Authority and Dubai Municipality approvals for all structural modifications and renovations.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-[#5C7A6B]/10 flex items-center justify-center mb-6">
                <Building className="w-7 h-7 text-[#5C7A6B]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">In-House Factory</h3>
              <p className="text-stone-600 leading-relaxed">Our own Dubai workshop produces custom joinery, cabinetry, and millwork with German precision and quality.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">10-Year Warranty</h3>
              <p className="text-stone-600 leading-relaxed">Comprehensive warranty on all structural work and finishes, giving you complete peace of mind.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">Expert Team</h3>
              <p className="text-stone-600 leading-relaxed">45+ skilled craftsmen, architects, and project managers dedicated to your vision.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">Turnkey Solutions</h3>
              <p className="text-stone-600 leading-relaxed">From design to completion, we handle every aspect of your renovation project.</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">Premium Materials</h3>
              <p className="text-stone-600 leading-relaxed">Only the finest European and local materials sourced from trusted suppliers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FR-005: Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#C4795A] font-semibold text-sm uppercase tracking-widest">Mastery & Execution</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mt-3">
                Our Renovation Services
              </h2>
              <p className="text-stone-600 mt-4 text-lg max-w-2xl">Comprehensive interior solutions tailored for Dubai's most prestigious properties</p>
            </div>
            <Link
              to="/services"
              className="mt-6 md:mt-0 text-base font-semibold text-[#5C7A6B] hover:text-[#4A6456] flex items-center space-x-2 group"
            >
              <span>Explore All Services</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service._id}
                to={`/services/${service.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone-200 flex flex-col"
              >
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={service.heroImage}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className="absolute top-6 left-6 bg-[#C4795A] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    {service.category}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#C4795A] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-stone-600 mt-4 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-stone-200 flex items-center text-sm font-semibold text-[#C4795A] space-x-2">
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FR-006: Featured Projects (Max 6) */}
      <section className="py-24 bg-gradient-to-b from-stone-900 to-[#1A1817] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#C4795A] font-semibold text-sm uppercase tracking-widest">Portfolio Showcase</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-100 mt-3">
                Featured Projects
              </h2>
              <p className="text-stone-400 mt-4 text-lg max-w-2xl">Explore our finest transformations across Dubai's most exclusive addresses</p>
            </div>
            <Link
              to="/projects"
              className="mt-6 md:mt-0 text-base font-semibold text-[#C4795A] hover:text-[#B06546] flex items-center space-x-2 group"
            >
              <span>View Portfolio</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-stone-800 shadow-2xl flex flex-col h-[450px]"
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent p-8 flex flex-col justify-end">
                  <span className="text-sm font-semibold text-[#C4795A] uppercase tracking-wider mb-2">
                    {project.location} • {project.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#C4795A] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-300 mt-3 line-clamp-2 font-light">
                    {project.scope}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Design Styles Section */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#5C7A6B] font-semibold text-sm uppercase tracking-widest">Aesthetic Direction</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 mt-3">
              Signature Design Styles
            </h2>
            <p className="text-stone-600 mt-4 text-lg leading-relaxed">
              Whether your vision leans toward quiet Japandi warmth, Arabian opulent modernism, or sleek contemporary minimalism.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {designStyles.map((style) => (
              <Link
                key={style._id}
                to={`/design-styles/${style.slug}`}
                className="group relative rounded-3xl overflow-hidden h-96 shadow-xl"
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#C4795A] transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-sm text-stone-300 mt-2 line-clamp-2">
                    {style.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FR-007: Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center items-center space-x-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900">
              Trusted by Dubai Property Owners
            </h2>
            <p className="text-stone-600 mt-4 text-lg">See what our clients say about their transformation experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div key={rev._id} className="p-10 rounded-3xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 shadow-lg hover:shadow-xl transition flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 space-x-1 mb-6">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-base leading-relaxed italic">
                    "{rev.reviewText}"
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
                  <span className="font-serif font-bold text-stone-900 text-base">{rev.customerName}</span>
                  <span className="text-xs text-stone-500 font-medium px-3 py-1 rounded-full bg-stone-200/60">{rev.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FR-008: Partners */}
      {partners.length > 0 && (
        <section className="py-16 bg-stone-900 border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-stone-400 text-sm uppercase tracking-widest font-semibold block mb-10">
              Projects Completed In Prestigious Developments
            </span>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-75">
              {partners.map((p) => (
                <div key={p._id} className="text-stone-300 font-serif font-bold text-xl tracking-wider hover:opacity-100 transition hover:text-[#C4795A]">
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section className="py-24 bg-gradient-to-r from-[#C4795A] to-[#945136] text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
            Ready to Redefine Your Interior Space?
          </h2>
          <p className="mt-6 text-stone-100 max-w-3xl mx-auto text-xl">
            Schedule an in-person or virtual consultation with our senior Dubai architectural team today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/consultation"
              className="bg-stone-900 hover:bg-stone-950 text-white font-semibold px-10 py-5 rounded-2xl shadow-2xl text-lg transition"
            >
              Book Free Site Consultation
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp ? settings.whatsapp.replace(/\+/g, '') : '971501234567'}?text=Hello%20Aura%20Interiors,%20I%20want%20to%20discuss%20my%20renovation.`}
              target="_blank"
              rel="noreferrer"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-10 py-5 rounded-2xl border border-white/30 text-lg transition backdrop-blur-sm"
            >
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
