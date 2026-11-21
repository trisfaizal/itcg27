'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ExternalLink, Cpu, Network, ShieldCheck } from 'lucide-react';
import ModularGeometricTiles, {
  DiagonalSplitTile,
  QuarterCircleTile,
} from '@/components/ModularGeometricTiles';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white text-itcg-navy flex-1 flex items-center pt-20 sm:pt-24 lg:pt-22 pb-6 lg:pb-0 w-full">
      {/* 1. Architectural Background: Figma Config: Kinetic Arcs */}
      <svg
        viewBox="0 0 1440 780"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden w-full h-full opacity-50 md:opacity-100"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blur filter for soft elliptical text mask */}
          <filter id="softTextMaskBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="28" />
          </filter>

          {/* Mask to protect left text column softly while letting arcs flow in open areas */}
          <mask id="heroTextSafeMask">
            {/* Full canvas visible */}
            <rect width="1440" height="780" fill="white" />
            {/* Soft elliptical exclusion directly behind left text block */}
            <ellipse cx="375" cy="415" rx="265" ry="175" fill="black" filter="url(#softTextMaskBlur)" />
          </mask>

          {/* 3 Color-Coded Linear Gradients for Kinetic Arcs */}
          {/* Outer Arc: ITCG Navy (#0D2B6B) */}
          <linearGradient id="kinetic-grad-navy" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D2B6B" stopOpacity="0" />
            <stop offset="50%" stopColor="#0D2B6B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0D2B6B" stopOpacity="0" />
          </linearGradient>

          {/* Middle Arc: ITCG Tech Blue (#0066E0) */}
          <linearGradient id="kinetic-grad-blue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066E0" stopOpacity="0" />
            <stop offset="50%" stopColor="#0066E0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0066E0" stopOpacity="0" />
          </linearGradient>

          {/* Inner Arc: ITCG Red (#E3062E) */}
          <linearGradient id="kinetic-grad-red" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E3062E" stopOpacity="0" />
            <stop offset="50%" stopColor="#E3062E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E3062E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Arcs Group Protected by heroTextSafeMask */}
        <g mask="url(#heroTextSafeMask)">
          {/* Static Base Arcs (#E6E9F2) Sweeping Open Upper & Center Canvas */}
          {/* 1. Outer Base Arc (R=760) */}
          <path
            d="M 180 780 A 760 760 0 0 1 940 20"
            stroke="#E6E9F2"
            strokeWidth="1.5"
            fill="none"
          />
          {/* 2. Middle Base Arc (R=630) */}
          <path
            d="M 310 780 A 630 630 0 0 1 940 150"
            stroke="#E6E9F2"
            strokeWidth="1.5"
            fill="none"
          />
          {/* 3. Inner Base Arc (R=500) */}
          <path
            d="M 440 780 A 500 500 0 0 1 940 280"
            stroke="#E6E9F2"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Kinetic Light Pulses with Independent Rhythms */}
          {/* 1. Outer Arc: Navy (#0D2B6B) - 8.5s duration */}
          <path
            d="M 180 780 A 760 760 0 0 1 940 20"
            stroke="url(#kinetic-grad-navy)"
            strokeWidth="2.25"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="20 105"
            className="animate-kinetic-arc"
            style={{ animationDuration: '8.5s', animationDelay: '-2.5s' }}
            fill="none"
          />

          {/* 2. Middle Arc: Tech Blue (#0066E0) - 6.5s duration */}
          <path
            d="M 310 780 A 630 630 0 0 1 940 150"
            stroke="url(#kinetic-grad-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="24 105"
            className="animate-kinetic-arc"
            style={{ animationDuration: '6.5s', animationDelay: '0s' }}
            fill="none"
          />

          {/* 3. Inner Arc: Red (#E3062E) - 5.5s duration */}
          <path
            d="M 440 780 A 500 500 0 0 1 940 280"
            stroke="url(#kinetic-grad-red)"
            strokeWidth="2.25"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="18 105"
            className="animate-kinetic-arc"
            style={{ animationDuration: '5.5s', animationDelay: '-3.8s' }}
            fill="none"
          />
        </g>
      </svg>

      {/* 100% Solid Vivid Modular Corner Tiles (Top-Right & Bottom-Left, Pure Bold Colors, Zero Opacity) */}
      <ModularGeometricTiles position="diagonal-alt" scale="large" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: 100% Pure White Clean Keynote Typography */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-4.5 lg:space-y-5">
            
            {/* Pill Badge: Modular & Clean */}
            <div className="hero-animate-in delay-100 inline-flex items-center space-x-2 bg-[#E6E9F2] hover:bg-itcg-gray/70 border border-[#E6E9F2] text-itcg-navy text-xs font-heading font-bold px-3.5 py-1.5 rounded-full transition-colors shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-itcg-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-itcg-red" />
              </span>
              <span className="tracking-wide uppercase text-[11px] sm:text-xs font-extrabold text-itcg-navy">
                6TH IT COMMUNITY GATHERING 2027
              </span>
            </div>

            {/* Massive Keynote Headline: INTELLIGENCE in Navy, IN MOTION in Blue with Modular Block Reveal */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-heading font-black tracking-tight text-itcg-navy leading-[1.08] flex flex-col items-start gap-1">
                {/* Line 1: INTELLIGENCE (#0D2B6B) with Modular Color-Block Shutter Reveal */}
                <span className="relative inline-block overflow-hidden py-0.5">
                  <span className="headline-text-reveal block">
                    INTELLIGENCE
                  </span>
                  <span
                    className="headline-block-reveal-1 absolute inset-0 bg-[#0D2B6B] pointer-events-none z-10"
                    aria-hidden="true"
                  />
                </span>

                {/* Line 2: IN MOTION (#0066E0) with Red Accent Edge + Kinetic Modular Petal */}
                <span className="inline-flex items-center flex-wrap gap-x-2.5 sm:gap-x-3.5">
                  <span className="relative inline-block overflow-hidden text-itcg-blue py-0.5">
                    <span className="headline-text-reveal-2 block text-itcg-blue">
                      IN MOTION
                    </span>
                    <span
                      className="headline-block-reveal-2 absolute inset-0 bg-[#0066E0] pointer-events-none z-10 flex justify-end"
                      aria-hidden="true"
                    >
                      {/* Accent Edge in ITCG Red (#E3062E) */}
                      <span className="w-2 sm:w-2.5 h-full bg-[#E3062E] flex-shrink-0" />
                    </span>
                  </span>

                  {/* Kinetic Modular Accent: Petal (#E3062E) with 90-degree Step Rotation */}
                  <span className="inline-flex items-center headline-accent-enter">
                    <span
                      className="headline-kinetic-accent inline-block w-5 h-5 sm:w-6 sm:h-6 bg-[#E3062E] rounded-tl-lg rounded-br-lg flex-shrink-0 shadow-xs"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </h1>
              <p className="hero-animate-in delay-200 text-base sm:text-lg lg:text-xl font-heading font-bold text-itcg-navy tracking-normal">
                Driving Smart Industry. Securing the Future.
              </p>
            </div>

            {/* Concise Keynote Description with High Contrast on Pure White */}
            <p className="hero-animate-in delay-250 text-xs sm:text-sm lg:text-[14.5px] text-itcg-navy/80 leading-relaxed max-w-xl font-normal">
              Bertemu, perluas jejaring, dan temukan peluang kolaborasi baru bersama <strong className="text-itcg-navy font-bold">300+ praktisi</strong> serta pimpinan <strong className="text-itcg-navy font-semibold">IT</strong> lintas perusahaan di kawasan industri <strong className="text-itcg-navy font-semibold">Karawang, Bekasi, dan Purwakarta</strong>. Temukan solusi teknologi terbaik di <strong className="text-itcg-navy font-semibold">Tech Exhibition</strong> dan serap wawasan strategis dari para <strong className="text-itcg-navy font-semibold">Technology Partner</strong> bersama KOMITKABE.
            </p>

            {/* Action Buttons: Primary Tech Blue & Secondary Navy Outline */}
            <div className="hero-animate-in delay-300 flex flex-wrap gap-3 items-center pt-1 sm:pt-1.5">
              <a
                href="https://connect.komitkabe.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] text-xs sm:text-sm font-heading font-extrabold text-white bg-[#0066E0] hover:bg-[#0052B4] rounded-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md hover:shadow-lg group whitespace-nowrap transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#0066E0]/50"
              >
                <span>Register as Participant</span>
                <ExternalLink className="ml-2 w-4 h-4 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </a>

              <Link
                href="/sponsors"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] text-xs sm:text-sm font-heading font-extrabold text-itcg-navy bg-white hover:bg-itcg-navy hover:text-white border-2 border-itcg-navy rounded-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-itcg-navy/40"
              >
                <span>Become a Sponsor</span>
              </Link>
            </div>

            {/* Date & Location Info Row */}
            <div className="hero-animate-in delay-400 pt-3 sm:pt-3.5 border-t border-[#E6E9F2] flex items-center space-x-2.5 text-xs sm:text-sm font-heading font-medium text-itcg-navy/80">
              <Calendar className="w-4 h-4 text-itcg-red flex-shrink-0" />
              <span className="font-semibold text-itcg-navy whitespace-nowrap flex-shrink-0">January 16-17, 2027</span>
              <span className="w-1.5 h-1.5 rounded-tl-sm rounded-br-sm bg-[#0066E0] flex-shrink-0" aria-hidden="true" />
              <MapPin className="w-4 h-4 text-itcg-blue flex-shrink-0" />
              <span className="whitespace-nowrap font-medium text-itcg-navy">Sutan Raja Hotel and Convention Centre</span>
            </div>

          </div>

          {/* Right Column: 100% Clean White Canvas Behind 3 Pillar Modules with Solid Offset Layers */}
          <div className="lg:col-span-6 flex flex-col justify-center relative py-4 lg:py-0 w-full space-y-4 sm:space-y-4.5 xl:space-y-5">

            {/* PILLAR 01: ARTIFICIAL INTELLIGENCE (Opposite-Rounded) */}
            <a
              href="#schedule"
              className="w-full anim-node-1 hero-card-enter-1 relative group select-none block cursor-pointer active:scale-[0.99] transition-transform duration-200"
            >
              {/* Solid Offset Layer in 100% Solid Tech Blue (#0066E0) */}
              <div
                className="absolute inset-0 rounded-tl-2xl rounded-br-2xl bg-[#0066E0] translate-x-1.5 translate-y-1.5 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"
                aria-hidden="true"
              />

              <div className="card-seq-1 relative bg-white border border-[#E6E9F2] rounded-tl-2xl rounded-br-2xl p-3 sm:p-3.5 shadow-md transition-all duration-300 ease-out group-hover:-translate-y-0.5 hover:border-itcg-blue z-10">
                <div className="flex items-start gap-3">
                  {/* Left Modular Geometric Accent Tile (Diagonal Split #0066E0 + #E6E9F2) */}
                  <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-tl-xl rounded-br-xl overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                    <DiagonalSplitTile colorA="#0066E0" colorB="#E6E9F2" size={48} direction="tl-br" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-white drop-shadow-sm" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded text-[9.5px] font-heading font-extrabold uppercase tracking-wider bg-itcg-blue/15 text-itcg-blue border border-itcg-blue/30">
                        PILLAR 01 // AI &amp; DATA
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-heading font-black text-itcg-navy tracking-tight leading-snug">
                      ARTIFICIAL INTELLIGENCE
                    </h3>
                    <p className="text-[11px] sm:text-xs font-heading font-bold text-itcg-blue tracking-normal mt-0.5 leading-snug break-words">
                      Industrial Computer Vision, Predictive Quality &amp; Smart Operations
                    </p>
                    <p className="text-[11px] text-itcg-navy/70 font-sans font-normal leading-relaxed mt-0.5">
                      Penerapan AI untuk otomasi manufaktur terintegrasi
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* PILLAR 02: INDUSTRIAL IOT (Opposite-Rounded) */}
            <a
              href="#schedule"
              className="w-full anim-node-2 hero-card-enter-2 relative group select-none block cursor-pointer active:scale-[0.99] transition-transform duration-200"
            >
              {/* Solid Offset Layer in 100% Solid Deep Navy (#0D2B6B) */}
              <div
                className="absolute inset-0 rounded-tr-2xl rounded-bl-2xl bg-[#0D2B6B] translate-x-1.5 translate-y-1.5 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"
                aria-hidden="true"
              />

              <div className="card-seq-2 relative bg-white border border-[#E6E9F2] rounded-tr-2xl rounded-bl-2xl p-3 sm:p-3.5 shadow-md transition-all duration-300 ease-out group-hover:-translate-y-0.5 hover:border-itcg-blue z-10">
                <div className="flex items-start gap-3">
                  {/* Left Modular Geometric Accent Tile (Quarter-Circle Tech Blue) */}
                  <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-tr-xl rounded-bl-xl overflow-hidden shadow-2xs group-hover:scale-105 transition-transform bg-[#0D2B6B]">
                    <QuarterCircleTile fillColor="#0066E0" corner="tl" size={48} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Network className="w-5 h-5 text-white drop-shadow-sm" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded text-[9.5px] font-heading font-extrabold uppercase tracking-wider bg-itcg-blue/15 text-itcg-blue border border-itcg-blue/30">
                        PILLAR 02 // INDUSTRIAL IOT
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-heading font-black text-itcg-navy tracking-tight leading-snug">
                      INDUSTRIAL IOT
                    </h3>
                    <p className="text-[11px] sm:text-xs font-heading font-bold text-itcg-blue tracking-normal mt-0.5 leading-snug break-words">
                      SCADA/PLC Integration, Edge Computing &amp; Shopfloor Sensors
                    </p>
                    <p className="text-[11px] text-itcg-navy/70 font-sans font-normal leading-relaxed mt-0.5">
                      Jembatan konektivitas IT/OT lintas fasilitas produksi
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* PILLAR 03: CYBERSECURITY (Opposite-Rounded) */}
            <a
              href="#schedule"
              className="w-full anim-node-3 hero-card-enter-3 relative group select-none block cursor-pointer active:scale-[0.99] transition-transform duration-200"
            >
              {/* Solid Offset Layer in 100% Solid ITCG Red (#E3062E) */}
              <div
                className="absolute inset-0 rounded-tl-2xl rounded-br-2xl bg-[#E3062E] translate-x-1.5 translate-y-1.5 transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2"
                aria-hidden="true"
              />

              <div className="card-seq-3 relative bg-white border border-[#E6E9F2] rounded-tl-2xl rounded-br-2xl p-3 sm:p-3.5 shadow-md transition-all duration-300 ease-out group-hover:-translate-y-0.5 hover:border-itcg-red z-10">
                <div className="flex items-start gap-3">
                  {/* Left Modular Geometric Accent Tile (Diagonal Split #E3062E + #0D2B6B) */}
                  <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-tl-xl rounded-br-xl overflow-hidden shadow-2xs group-hover:scale-105 transition-transform bg-[#0D2B6B]">
                    <DiagonalSplitTile colorA="#E3062E" colorB="#0D2B6B" size={48} direction="tr-bl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-white drop-shadow-sm" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded text-[9.5px] font-heading font-extrabold uppercase tracking-wider bg-itcg-red/15 text-itcg-red border border-itcg-red/30">
                        PILLAR 03 // CYBERSECURITY
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-heading font-black text-itcg-navy tracking-tight leading-snug">
                      CYBERSECURITY
                    </h3>
                    <p className="text-[11px] sm:text-xs font-heading font-bold text-itcg-red tracking-normal mt-0.5 leading-snug break-words">
                      Zero-Trust Architecture &amp; Critical Infrastructure Protection
                    </p>
                    <p className="text-[11px] text-itcg-navy/70 font-sans font-normal leading-relaxed mt-0.5">
                      Perlindungan ketahanan operasional pabrik dari disrupsi
                    </p>
                  </div>
                </div>
              </div>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
