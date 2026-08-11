import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: 'Aura Luxury Interiors & Renovations Dubai',
    tagline: 'Bespoke Fit-Out, Joinery & Architectural Renovation in Dubai',
    phone: '+971 4 800 9988',
    whatsapp: '+971501234567',
    email: 'info@aurainteriors.ae',
    address: 'Design District (D3), Building 4, Suite 302, Dubai, UAE',
    statistics: { yearsExperience: 14, completedProjects: 350, teamMembers: 45, propertyInspections: 820, customerRating: 4.9 }
  });

  const fetchSettings = async () => {
    try {
      const res = await apiFetch('/settings');
      if (res.success && res.data) {
        setSettings(res.data);
      }
    } catch (e) {
      // Use defaults
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteContext.Provider value={{ settings, refreshSettings: fetchSettings }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
