'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogOut, Users, Target, Bell, ExternalLink, Calendar, Layers } from 'lucide-react';
import AdminSponsorsTab from '@/components/Admin/AdminSponsorsTab';
import AdminBoothsTab from '@/components/Admin/AdminBoothsTab';
import AdminScheduleTab from '@/components/Admin/AdminScheduleTab';
import AdminQuotasTab from '@/components/Admin/AdminQuotasTab';
import AdminUpdatesTab from '@/components/Admin/AdminUpdatesTab';

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'sponsors' | 'booths' | 'schedule' | 'quotas' | 'updates'>('sponsors');

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] relative text-[#0D2B6B]">
      
      {/* Top Admin Header */}
      <header className="bg-gradient-to-r from-[#071A42] via-[#0D2B6B] to-[#0A2255] text-white border-b-2 border-[#E3062E] shadow-md relative overflow-hidden z-20">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#0066E0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-16 w-64 h-64 bg-[#E3062E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/" className="transition-transform hover:scale-105 duration-200">
                <img
                  src="/images/itcg-logo.svg"
                  alt="ITCG 2027"
                  className="h-9 sm:h-10 w-auto bg-white/95 px-2.5 py-1 rounded-xl shadow-xs border border-white/20"
                />
              </Link>
              <div className="hidden sm:block h-6 w-px bg-white/20" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-semantic-warning/20 border border-semantic-warning/30 text-semantic-warning text-[10px] font-heading font-extrabold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-semantic-warning shrink-0" />
                  <span>Panel Panitia Penyelenggara</span>
                </div>
                <h1 className="text-sm sm:text-base font-heading font-extrabold text-white mt-0.5">
                  Dashboard Manajemen ITCG 2027
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/"
                target="_blank"
                className="hidden md:inline-flex items-center text-xs font-semibold text-[#E6E9F2] hover:text-white px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/50 transition-colors bg-white/5"
              >
                <span>Lihat Website Publik</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 text-xs font-heading font-bold text-white bg-[#E3062E] hover:bg-[#C00426] active:scale-95 px-3.5 py-2 rounded-lg transition-all shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#E6E9F2] pb-4 mb-8">
          <button
            onClick={() => setActiveTab('sponsors')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-xl transition-all ${
              activeTab === 'sponsors'
                ? 'bg-[#0D2B6B] text-white shadow-md ring-2 ring-[#0066E0]/20'
                : 'bg-white text-[#0D2B6B] border border-[#E6E9F2] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            <span>Manajemen Sponsor</span>
          </button>

          <button
            onClick={() => setActiveTab('booths')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-xl transition-all ${
              activeTab === 'booths'
                ? 'bg-[#0D2B6B] text-white shadow-md ring-2 ring-[#0066E0]/20'
                : 'bg-white text-[#0D2B6B] border border-[#E6E9F2] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]'
            }`}
          >
            <Layers className="w-4 h-4 mr-2" />
            <span>Manajemen Booth</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-xl transition-all ${
              activeTab === 'schedule'
                ? 'bg-[#0D2B6B] text-white shadow-md ring-2 ring-[#0066E0]/20'
                : 'bg-white text-[#0D2B6B] border border-[#E6E9F2] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Event Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('quotas')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-xl transition-all ${
              activeTab === 'quotas'
                ? 'bg-[#0D2B6B] text-white shadow-md ring-2 ring-[#0066E0]/20'
                : 'bg-white text-[#0D2B6B] border border-[#E6E9F2] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]'
            }`}
          >
            <Target className="w-4 h-4 mr-2" />
            <span>Kuota Target Tier</span>
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-xl transition-all ${
              activeTab === 'updates'
                ? 'bg-[#0D2B6B] text-white shadow-md ring-2 ring-[#0066E0]/20'
                : 'bg-white text-[#0D2B6B] border border-[#E6E9F2] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]'
            }`}
          >
            <Bell className="w-4 h-4 mr-2" />
            <span>Warta Live Update</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        {activeTab === 'sponsors' && <AdminSponsorsTab />}
        {activeTab === 'booths' && <AdminBoothsTab />}
        {activeTab === 'schedule' && <AdminScheduleTab />}
        {activeTab === 'quotas' && <AdminQuotasTab />}
        {activeTab === 'updates' && <AdminUpdatesTab />}

      </main>
    </div>
  );
}
