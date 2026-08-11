import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, FolderKanban, Star, TrendingUp, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [quotesCount, setQuotesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [leadsRes, projRes, quoteRes] = await Promise.all([
          apiFetch('/leads?limit=5'),
          apiFetch('/projects'),
          apiFetch('/quotes')
        ]);
        if (leadsRes.success) setLeads(leadsRes.data);
        if (projRes.success) setProjectsCount(projRes.data.length);
        if (quoteRes.success) setQuotesCount(quoteRes.data.length);
      } catch (e) {
        console.error('Error loading dashboard data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const totalLeads = leads.length;
  const newLeadsToday = leads.filter(l => l.status === 'New').length;
  const openLeads = leads.filter(l => ['New', 'Contacted', 'Quoted'].includes(l.status)).length;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-stone-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-stone-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C4795A]">
            Executive Overview
          </span>
          <h1 className="font-serif text-3xl font-bold mt-1">Welcome back, {user?.name}</h1>
          <p className="text-stone-400 text-xs mt-1">
            System status normal • Dubai Interior Management & Quotation Engine
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/quotes"
            className="btn-terracotta px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Quote (Q-YYYY-NNNN)</span>
          </Link>
        </div>
      </div>

      {/* FR-100 Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-stone-500 text-xs font-bold uppercase tracking-wider">New Leads Today</div>
            <div className="font-serif text-3xl font-bold text-stone-900 mt-2">{newLeadsToday}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-stone-500 text-xs font-bold uppercase tracking-wider">Open Pipeline Leads</div>
            <div className="font-serif text-3xl font-bold text-[#C4795A] mt-2">{openLeads}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#C4795A] flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-stone-500 text-xs font-bold uppercase tracking-wider">Published Projects</div>
            <div className="font-serif text-3xl font-bold text-stone-900 mt-2">{projectsCount}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#5C7A6B] flex items-center justify-center font-bold">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-stone-500 text-xs font-bold uppercase tracking-wider">Total Quotations</div>
            <div className="font-serif text-3xl font-bold text-stone-900 mt-2">{quotesCount}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">Recent Customer Leads</h2>
            <p className="text-xs text-stone-500">Inquiries submitted via public consultation form</p>
          </div>
          <Link
            to="/admin/leads"
            className="text-xs font-semibold text-[#C4795A] hover:underline flex items-center space-x-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone / Email</th>
                <th className="py-3 px-4">Service Required</th>
                <th className="py-3 px-4">Property Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-stone-50 transition">
                    <td className="py-3.5 px-4 font-bold text-stone-900">{lead.fullName}</td>
                    <td className="py-3.5 px-4">
                      <div>{lead.phone}</div>
                      <div className="text-stone-400 text-[11px]">{lead.email}</div>
                    </td>
                    <td className="py-3.5 px-4">{lead.service}</td>
                    <td className="py-3.5 px-4">{lead.propertyType} ({lead.location})</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        lead.status === 'New' ? 'bg-amber-100 text-amber-800' :
                        lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'Quoted' ? 'bg-purple-100 text-purple-800' :
                        lead.status === 'Won' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        to={`/admin/leads/${lead._id}`}
                        className="text-[#C4795A] hover:underline font-bold text-[11px]"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-stone-400">No leads recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
