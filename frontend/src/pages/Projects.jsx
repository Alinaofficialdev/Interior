import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { apiFetch } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = category === 'All' ? '/projects' : `/projects?category=${category}`;
        const res = await apiFetch(url);
        if (res.success) setProjects(res.data);
      } catch (e) {
        console.error('Error fetching projects:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [category]);

  const categories = ['All', 'Residential', 'Commercial', 'Retail'];

  return (
    <div className="pt-24 pb-20">
      
      <section className="bg-gradient-to-r from-stone-900 to-[#1A1817] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[#C4795A] font-semibold text-sm uppercase tracking-widest">Completed Transformations</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold mt-4">Project Portfolio</h1>
          <p className="text-stone-300 mt-6 max-w-3xl mx-auto text-lg">
            Explore our architectural fit-out and renovation projects across Palm Jumeirah, Downtown Dubai, and Dubai Hills.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition ${
                category === cat
                  ? 'bg-[#C4795A] text-white shadow-lg'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-3xl overflow-hidden bg-stone-900 shadow-2xl h-[500px] animate-pulse">
                <div className="h-full bg-stone-700" />
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-stone-900 shadow-2xl flex flex-col h-[500px]"
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent p-8 flex flex-col justify-end">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-[#C4795A] uppercase tracking-wider mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location} • {project.category}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#C4795A] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-300 mt-3 line-clamp-2 font-light">
                    {project.scope}
                  </p>
                  <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-sm text-stone-400">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#5C7A6B]" />
                      <span>{project.duration}</span>
                    </div>
                    <span className="text-[#C4795A] font-semibold flex items-center space-x-2">
                      <span>View Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-stone-600">No projects available right now.</div>
        )}
      </section>

    </div>
  );
}
