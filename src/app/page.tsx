import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LivePreparationBar from '@/components/LivePreparationBar';
import SponsorGrid from '@/components/SponsorGrid';
import CommunityPillars from '@/components/CommunityPillars';
import LiveUpdateBoard from '@/components/LiveUpdateBoard';
import InteractiveRundown from '@/components/InteractiveRundown';
import TrackRecord from '@/components/TrackRecord';
import BallroomFloorPlan from '@/components/BallroomFloorPlan';
import SponsorshipCallout from '@/components/SponsorshipCallout';
import Footer from '@/components/Footer';
import { getLiveUpdates, getSponsorshipTiersWithSponsors, getScheduleSessions } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const updates = await getLiveUpdates();
  const tiers = await getSponsorshipTiersWithSponsors();
  const scheduleSessions = await getScheduleSessions();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header / Navbar (72px, clean white, single registration button) */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section & Live Preparation Bar (White Architectural Canvas) */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-white border-b border-[#E6E9F2] lg:h-screen min-h-[600px]">
          <HeroSection />
          <LivePreparationBar updates={updates} />
        </div>

        {/* 4. About: Community Foundation, 3 Core Tech Pillars & 10-Year Track Record */}
        <CommunityPillars />
        <TrackRecord />

        {/* 5. Partners: Confirmed Sponsors & Technology Ecosystem (Tiered Grid: Platinum 3, Gold 4, Silver 6) */}
        <section id="partners" className="py-20 sm:py-24 bg-white border-b border-itcg-gray scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
                  <span>Confirmed Sponsors &amp; Technology Partners</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
                  Industry Partners &amp; Technology Ecosystem
                </h2>
                <p className="text-sm sm:text-base text-itcg-navy/70 mt-2 max-w-2xl">
                  Penyedia teknologi enterprise terkemuka yang menghadirkan solusi industrial AI, enterprise IoT, dan cybersecurity untuk kawasan industri Jawa Barat.
                </p>
              </div>

              <div className="mt-6 md:mt-0">
                <Link
                  href="/sponsors"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs sm:text-sm font-heading font-extrabold text-white bg-itcg-red hover:bg-itcg-red-hover rounded-lg transition-all shadow-xs group"
                >
                  <span>Explore Sponsorship Packages</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Logo-First Tiered Sponsor Showcase (Platinum 3, Gold 4, Silver 6, Clean without facility text or quota leak) */}
            <SponsorGrid tiers={tiers} showOpenSlots={true} showQuotaNumbers={false} />
          </div>
        </section>

        {/* 6. Live Preparation Updates */}
        <div id="updates">
          <LiveUpdateBoard updates={updates} />
        </div>

        {/* 7. Schedule: Interactive Conference Agenda */}
        <InteractiveRundown initialSessions={scheduleSessions} />

        {/* 8. Venue: Sutan Raja Hotel and Convention Centre, Soreang, Bandung & Denah Interaktif */}
        <BallroomFloorPlan />

        {/* 9. Strategic Partnership Callout (Modern, Architectural, without package facilities or pricing tables) */}
        <SponsorshipCallout />
      </main>

      {/* 11. Footer Bersih (KOMITKABE Identity, Tanpa Tautan Resmi & Portal) */}
      <Footer />
    </div>
  );
}
