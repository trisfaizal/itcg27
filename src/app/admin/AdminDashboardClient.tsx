'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogOut, Users, Target, Bell, ExternalLink, Calendar } from 'lucide-react';
import AdminSponsorsTab from '@/components/Admin/AdminSponsorsTab';
import AdminScheduleTab from '@/components/Admin/AdminScheduleTab';
import AdminQuotasTab from '@/components/Admin/AdminQuotasTab';
import AdminUpdatesTab from '@/components/Admin/AdminUpdatesTab';

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'sponsors' | 'schedule' | 'quotas' | 'updates'>('sponsors');

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
    <div className="min-h-screen bg-itcg-gray-light">
      
      {/* Top Admin Header */}
      <header className="bg-itcg-navy text-white border-b-2 border-itcg-red shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/">
                <img
                  src="/images/itcg-logo.svg"
                  alt="ITCG 2027"
                  className="h-10 w-auto bg-white/95 px-2 py-1 rounded"
                />
              </Link>
              <div className="hidden sm:block h-6 w-px bg-white/20" />
              <div>
                <span className="text-xs font-heading font-extrabold text-semantic-warning uppercase tracking-wider block">
                  Panel Panitia Penyelenggara
                </span>
                <h1 className="text-sm sm:text-base font-heading font-extrabold text-white">
                  Dashboard Manajemen ITCG 2027
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/"
                target="_blank"
                className="hidden md:inline-flex items-center text-xs font-semibold text-itcg-gray hover:text-white px-3 py-1.5 rounded border border-white/20 hover:border-white transition-colors"
              >
                <span>Lihat Website Publik</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 text-xs font-heading font-bold text-white bg-itcg-red hover:bg-itcg-red-hover px-3.5 py-2 rounded-md transition-all shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-itcg-gray pb-4 mb-8">
          <button
            onClick={() => setActiveTab('sponsors')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-lg transition-all ${
              activeTab === 'sponsors'
                ? 'bg-itcg-navy text-white shadow-md'
                : 'bg-white text-itcg-navy border border-itcg-gray hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            <span>Manajemen Sponsor</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-lg transition-all ${
              activeTab === 'schedule'
                ? 'bg-itcg-navy text-white shadow-md'
                : 'bg-white text-itcg-navy border border-itcg-gray hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Event Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('quotas')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-lg transition-all ${
              activeTab === 'quotas'
                ? 'bg-itcg-navy text-white shadow-md'
                : 'bg-white text-itcg-navy border border-itcg-gray hover:bg-gray-100'
            }`}
          >
            <Target className="w-4 h-4 mr-2" />
            <span>Kuota Target Tier</span>
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`inline-flex items-center px-4 py-2.5 text-xs sm:text-sm font-heading font-bold rounded-lg transition-all ${
              activeTab === 'updates'
                ? 'bg-itcg-navy text-white shadow-md'
                : 'bg-white text-itcg-navy border border-itcg-gray hover:bg-gray-100'
            }`}
          >
            <Bell className="w-4 h-4 mr-2" />
            <span>Warta Live Update</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        {activeTab === 'sponsors' && <AdminSponsorsTab />}
        {activeTab === 'schedule' && <AdminScheduleTab />}
        {activeTab === 'quotas' && <AdminQuotasTab />}
        {activeTab === 'updates' && <AdminUpdatesTab />}

      </main>
    </div>
  );
}
