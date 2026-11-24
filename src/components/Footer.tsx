'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Calendar, Lock, ArrowUpRight } from 'lucide-react';
import ModularGeometricTiles from '@/components/ModularGeometricTiles';

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-itcg-navy text-white overflow-hidden border-t border-white/10">
      {/* Official Modular Geometric Corner Tiles at Bottom-Right */}
      <ModularGeometricTiles position="bottom-right" theme="dark" scale="large" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Column 1 (span 4): Brand & Community Identity */}
          <div className="md:col-span-4 space-y-4">
            {/* Pure White Container with rounded-xl for KOMITKABE Official Logo */}
            <div className="inline-flex items-center bg-white rounded-xl px-4 py-2.5 shadow-sm">
              <img
                src="/images/komitkabe-logo.png"
                alt="KOMITKABE - Komunitas IT Kawasan Industri"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-heading font-extrabold tracking-tight text-white">
                KOMITKABE
              </h3>
              <p className="text-xs sm:text-sm font-heading font-bold text-itcg-red italic tracking-wide">
                The Power of Collaborations: Komunitas IT Kawasan Industri
              </p>
            </div>

            <p className="text-xs sm:text-sm text-itcg-gray/80 leading-relaxed max-w-sm">
              Wadah kolaborasi profesional, praktisi, dan pimpinan teknologi informasi kawasan industri Karawang, Bekasi, dan Purwakarta (mencakup EJIP, MM2100, Jababeka, GIIC, Suryacipta dan sekitarnya) sejak tahun 2006.
            </p>
          </div>

          {/* Column 2 (span 3): Event & Venue Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold text-white uppercase tracking-widest pb-1.5 border-b border-white/20">
              Event Details
            </h4>
            <div className="space-y-3 text-xs text-itcg-gray/90">
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-itcg-red flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">January 16-17, 2027</strong>
                  08:30 - 18:00 WIB
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-medium">Grand Ballroom Sutan Raja</strong>
                  Sutan Raja Hotel &amp; Convention Centre<br />
                  <span className="text-[11px] text-itcg-gray/70">Jl. Raya Soreang KM.17 No.10, Kab. Bandung</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 3 (span 2): Quick Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold text-white uppercase tracking-widest pb-1.5 border-b border-white/20">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-itcg-gray/80">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Event
                </Link>
              </li>
              <li>
                <Link href="/#partners" className="hover:text-white transition-colors">
                  Sponsors &amp; Partners
                </Link>
              </li>
              <li>
                <Link href="/#schedule" className="hover:text-white transition-colors">
                  Event Schedule
                </Link>
              </li>
              <li>
                <Link href="/booths" className="hover:text-white transition-colors text-itcg-blue-light font-medium">
                  Denah Booth &amp; Booking
                </Link>
              </li>
              <li>
                <Link href="/#venue" className="hover:text-white transition-colors">
                  Ballroom Floor Plan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Secretariat
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-itcg-blue-light hover:text-white transition-colors inline-flex items-center space-x-1">
                  <span>Sponsorship Tiers</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 (span 3): Official Committee & Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold text-white uppercase tracking-widest pb-1.5 border-b border-white/20">
              Organizing Committee
            </h4>
            <div className="space-y-2.5 text-xs text-itcg-gray/90">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-itcg-red flex-shrink-0" />
                <a
                  href="mailto:partnership@komitkabe.id"
                  className="hover:text-white hover:underline transition-colors"
                >
                  partnership@komitkabe.id
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-itcg-red flex-shrink-0" />
                <a
                  href="mailto:official@komitkabe.id"
                  className="hover:text-white hover:underline transition-colors"
                >
                  official@komitkabe.id
                </a>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/admin"
                className="inline-flex items-center space-x-1.5 text-[11px] text-itcg-gray/60 hover:text-white transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Committee Portal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Event Registration */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-itcg-gray/60 gap-2">
          <p>© 2027 KOMITKABE (Komunitas IT Kawasan Industri). All rights reserved.</p>
          <p className="font-heading font-bold text-xs text-white/80">
            One Community • ITCG 2027
          </p>
        </div>
      </div>
    </footer>
  );
}
