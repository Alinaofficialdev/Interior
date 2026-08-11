import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import DesignStyles from './pages/DesignStyles';
import StyleDetail from './pages/StyleDetail';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Consultation from './pages/Consultation';
import Careers from './pages/Careers';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLeads from './pages/AdminLeads';
import LeadDetailAdmin from './pages/LeadDetailAdmin';
import AdminServices from './pages/AdminServices';
import AdminProjects from './pages/AdminProjects';
import AdminQuotes from './pages/AdminQuotes';

function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/design-styles" element={<DesignStyles />} />
              <Route path="/design-styles/:slug" element={<StyleDetail />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/careers" element={<Careers />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/leads" element={<AdminLeads />} />
              <Route path="/admin/leads/:id" element={<LeadDetailAdmin />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/quotes" element={<AdminQuotes />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </AuthProvider>
    </SiteProvider>
  );
}

export default App;