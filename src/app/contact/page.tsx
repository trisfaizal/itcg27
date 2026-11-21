import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactInfoCards from '@/components/ContactInfoCards';
import ContactForm from '@/components/ContactForm';
import ContactFaqAccordion from '@/components/ContactFaqAccordion';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Secretariat | 6th IT Community Gathering 2027',
  description:
    'Hubungi sekretariat dan panitia IT Community Gathering (ITCG) 2027 KOMITKABE untuk pertanyaan registrasi, informasi acara, media partner, dan koordinasi umum.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero / Header Section */}
        <section className="bg-white border-b border-[#E6E9F2] pt-24 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden">
          {/* Subtle background accent blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-50/50 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
                <span>SECRETARIAT &amp; GENERAL INQUIRIES</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#0D2B6B] tracking-tight leading-tight">
                Hubungi Panitia ITCG 2027
              </h1>
              <p className="text-sm sm:text-base text-itcg-navy/75 leading-relaxed font-normal">
                Sampaikan pertanyaan seputar registrasi peserta, informasi acara, media partner, atau koordinasi teknis bersama tim sekretariat KOMITKABE.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Main 2-Column Section: Info & Form */}
        <section className="py-12 sm:py-16 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Secretariat Information & Special Routes */}
              <div className="lg:col-span-5">
                <ContactInfoCards />
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>

            {/* 4. FAQ Section */}
            <div className="mt-14 w-full">
              <ContactFaqAccordion />
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
