'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Check, Info } from 'lucide-react';

interface ZoneDetail {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  dimensions: string;
  capacity: string;
  power: string;
  description: string;
  amenities: string[];
}

const zones: Record<string, ZoneDetail> = {
  speaker_lounge: {
    id: 'speaker_lounge',
    name: 'Speaker Lounge & VIP Holding Area',
    badge: 'VIP & Speaker Holding',
    badgeColor: 'bg-itcg-navy text-white',
    dimensions: '14.0 m x 3.5 m (Enclosed Rear Stage Area)',
    capacity: '15-20 Keynote Speakers, Panelis Eksekutif & VIP',
    power: 'Dedicated 5.000 Watt Clean Power Hub',
    description: 'Ruang tunggu eksklusif tertutup di belakang panggung utama (Main Stage) untuk para pembicara keynote, panelis eksekutif, dan tamu kehormatan sebelum sesi presentasi dimulai.',
    amenities: [
      'Sofa lounge eksekutif & meja konsol briefing',
      'Private monitor live feed panggung & countdown timer',
      'High-speed Wi-Fi 6 enterprise & multi-device charging hub',
      'Layanan hospitality & snack khusus VIP',
    ],
  },
  stage: {
    id: 'stage',
    name: 'Main Stage (16.0 x 6.0 m)',
    badge: 'Central Stage',
    badgeColor: 'bg-itcg-navy text-white',
    dimensions: '16.0 m x 6.0 m (Tinggi Level 60 cm)',
    capacity: 'Panggung Utama 15-20 Pembicara & VIP',
    power: 'Dedicated Power 15.000 Watt + Dual UPS Backup',
    description: 'Panggung utama megah dengan backdrop LED Videotron P2.5, podium presentasi formal, serta clearance bersih di kedua sisi sayap panggung untuk visibilitas optimal seluruh peserta.',
    amenities: [
      'Panggung 16 x 6 meter karpet navy premium',
      'Tinggi stage 60 cm pandangan leluasa dari seluruh penjuru ballroom',
      'Dual Confidence Monitor 55 inch untuk presenter',
      'Wireless Podium Shure Microphone & Laser Pointer',
    ],
  },
  videotron: {
    id: 'videotron',
    name: 'LED Videotron P2.5 Ultra HD (8.0 x 4.0 m)',
    badge: 'Main Visual Display',
    badgeColor: 'bg-itcg-red text-white',
    dimensions: '8.0 m x 4.0 m (Center Stage Backdrop)',
    capacity: 'Resolusi 4K Seamless Video & Presentation',
    power: '10.000 Watt Industrial Power Supply',
    description: 'Layar videotron utama terpasang di sisi depan/atas panggung, menampilkan materi presentasi pembicara, showcase video sponsor Platinum, dan visual grafis dinamis ITCG 2027.',
    amenities: [
      'Refresh rate 3840Hz bebas flicker kamera & siaran video',
      'Resolusi Ultra-HD 4K Native rasio 16:9',
      'Seamless Multi-Window PiP switcher controller',
      'Branding visual sponsor resmi di setiap transisi sesi',
    ],
  },
  seating: {
    id: 'seating',
    name: 'Main Audience Seating (±300 Participants)',
    badge: 'Audience Seating',
    badgeColor: 'bg-itcg-blue text-white',
    dimensions: '22.0 m x 16.0 m (Central Participant Area)',
    capacity: '±300 IT Leaders, Managers & Praktisi Industri',
    power: 'Charging hub station di deretan meja peserta',
    description: 'Area duduk peserta di tengah ballroom dengan konfigurasi round banquet table nyaman, memfasilitasi fokus presentasi dan interaksi jejaring antar praktisi IT kawasan industri.',
    amenities: [
      'Banquet round tables berkapasitas 8-10 orang per meja',
      'Buku panduan ITCG 2027 & exclusive stationery kit',
      'Akses Wi-Fi 6 High-Density enterprise grade',
      'Layanan hospitality & air mineral meja',
    ],
  },
  platinum_booth: {
    id: 'platinum_booth',
    name: 'Platinum Booth Cluster',
    badge: 'Tier Platinum',
    badgeColor: 'bg-itcg-navy text-white',
    dimensions: '3.0 m x 3.0 m per booth',
    capacity: '6 Mitra Platinum (3 Booth Sayap Kiri & 3 Booth Sayap Kanan)',
    power: 'Daya Listrik 2.200 Watt per booth',
    description: 'Klaster booth eksklusif di posisi depan mengapit area duduk peserta dan akses panggung utama. Menjamin visibilitas maksimal dan interaksi langsung dengan audiens eksekutif.',
    amenities: [
      'Partisi R8 Custom & Fascia Nama Perusahaan',
      '1 Meja Dealing, 4 Kursi Lipat, 1 Meja Display',
      'Stop Kontak Listrik',
      'Smart TV LED (Optional Add-on)',
      '1 Night Hotel Stay di Sutan Raja Hotel (Include)',
    ],
  },
  gold_booth: {
    id: 'gold_booth',
    name: 'Gold Booth Cluster',
    badge: 'Tier Gold',
    badgeColor: 'bg-itcg-blue text-white',
    dimensions: '2.0 m x 2.0 m per booth',
    capacity: '12 Mitra Gold (6 Booth Sayap Kiri & 6 Booth Sayap Kanan)',
    power: 'Daya Listrik 1.300 Watt per booth',
    description: 'Klaster booth pameran berposisi strategis tepat di bawah klaster Platinum pada sayap kiri dan kanan, memberikan akses langsung ke alur sirkulasi peserta.',
    amenities: [
      'Partisi R8 Standar & Fascia Nama Booth',
      '1 Meja Informasi & 2 Kursi Lipat',
      'Stop Kontak Listrik',
      'Smart TV LED (Optional Add-on)',
      'Penyebaran flyer & profil perusahaan di area registrasi',
    ],
  },
  silver_booth: {
    id: 'silver_booth',
    name: 'Silver Booth Area',
    badge: 'Tier Silver',
    badgeColor: 'bg-itcg-gray-dark text-white',
    dimensions: 'Promotional Table Area (1.5 x 1.5 m per booth)',
    capacity: '12 Mitra Silver (6 Booth Sayap Kiri & 6 Booth Sayap Kanan)',
    power: 'Daya Listrik 450 Watt per booth',
    description: 'Deretan meja promosi Silver di sisi kiri dan kanan belakang area duduk peserta, tepat di samping FOH Control Desk.',
    amenities: [
      '1 Meja Promosi Display & 2 Kursi',
      'Stop Kontak Listrik',
      'Fasilitas pasang X-Banner/Roll-up Banner mandiri',
      'Penyisipan brosur perusahaan di Goodie Bag peserta',
    ],
  },
  access_corridor: {
    id: 'access_corridor',
    name: 'Access Corridor & VIP Passage',
    badge: 'Service & Stage Access',
    badgeColor: 'bg-itcg-gray-dark text-white',
    dimensions: 'Lebar Koridor 3.0 m (Sayap Kanan Atas)',
    capacity: 'Akses Evakuasi, Alur Logistik & Jalur Masuk VIP',
    power: 'Emergency Lighting & Exit Indicators',
    description: 'Koridor akses di area kanan atas adjacent dengan zona panggung acara dan speaker lounge, menjamin kelancaran alur VIP, logistik, dan standar keselamatan ballroom.',
    amenities: [
      'Jalur bebas rintangan tanpa booth pameran',
      'Pintu darurat & signage jalur evakuasi resmi venue',
      'Akses langsung menuju Speaker Lounge & Backstage',
      'Petunjuk arah visual jelas berstandar venue',
    ],
  },
  foh: {
    id: 'foh',
    name: 'FOH Control Desk (Front of House)',
    badge: 'Technical Control',
    badgeColor: 'bg-itcg-navy text-white',
    dimensions: '4.0 m x 3.0 m (Tengah Belakang)',
    capacity: 'Tim Teknis Audio, Visual, Lighting & Streaming',
    power: 'Dedicated 5.000 Watt Clean Earth Line',
    description: 'Pusat kendali multimedia, audio engineering, live streaming multi-kamera, dan timer presenter di posisi tengah belakang area peserta.',
    amenities: [
      'Digital Audio Mixer 32 Channel',
      'Blackmagic Design Video Switcher ATEM',
      'DMX Stage Lighting Controller',
      'Live Streaming Recording Multi-Angle Full HD',
    ],
  },
  photobooth: {
    id: 'photobooth',
    name: 'Photobooth & 360 Spin Camera',
    badge: 'Media & Documentation',
    badgeColor: 'bg-itcg-red text-white',
    dimensions: '5.0 m x 3.0 m (Sayap Kiri Depan)',
    capacity: 'Photo Spot Bersama & 360 Spin Video',
    power: 'Lighting Softbox 1.000 Watt',
    description: 'Backdrop resmi ITCG 2027 berlogo KOMITKABE dan sponsor di area depan kiri, dilengkapi fotografer profesional dan instant digital print.',
    amenities: [
      'Backdrop Geometris 30° ITCG 2027 resolusi tinggi',
      '360 Spin Video Booth & Lighting Studio Softbox',
      'Fotografer & Videografer Dokumentasi Acara',
      'Direct QR Download Foto Digital Instan',
    ],
  },
  entrance: {
    id: 'entrance',
    name: 'Main Gate & Registration',
    badge: 'Main Entrance & Gate',
    badgeColor: 'bg-itcg-navy text-white',
    dimensions: 'Pintu Ganda Lebar 6.0 m (Center Bottom)',
    capacity: 'Alur Masuk 300+ Peserta & VIP',
    power: 'Terminal Scanner Barcode & Digital Check-in',
    description: 'Pintu gerbang utama ballroom dilengkapi meja registrasi digital QR barcode cepat, welcoming corner, dan pengambilan lanyard peserta.',
    amenities: [
      '4 Meja Registrasi Digital Check-in QR Cepat',
      'Gate Welcoming Signage ITCG 2027',
      'Papan Denah Navigasi Ballroom Interaktif',
      'Tim Usher Penyambut Tamu KOMITKABE',
    ],
  },
  catering: {
    id: 'catering',
    name: 'Coffee & VIP Catering Station',
    badge: 'Hospitality & Refreshment',
    badgeColor: 'bg-itcg-blue text-white',
    dimensions: '6.0 m x 3.0 m (Sayap Kanan Depan)',
    capacity: 'Hospitality Snack & Refreshment 300+ Peserta',
    power: 'Power 3.000 Watt untuk Coffee Maker & Chiller',
    description: 'Area snack, coffee break espresso bar, dan catering refreshment untuk peserta dan VIP di sisi kanan depan saat jeda sesi acara.',
    amenities: [
      'Espresso Bar Machine & Aneka Coffee/Tea Premium',
      'Snack & Pastry Corner Sutan Raja Hotel',
      'Water Station Ramah Lingkungan',
      'Standing Table untuk Networking Santai',
    ],
  },
};

export default function BallroomFloorPlan() {
  const [selectedZone, setSelectedZone] = useState<string>('stage');
  const current = zones[selectedZone] || zones.stage;

  const handleZoneKeyDown = (e: React.KeyboardEvent, zoneKey: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedZone(zoneKey);
    }
  };

  return (
    <section id="venue" className="py-16 sm:py-24 bg-itcg-gray-light/35 relative border-t border-itcg-gray scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0D2B6B]/8 text-[#0D2B6B] border border-[#0D2B6B]/12">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D2B6B] shrink-0" />
              <span>Venue &amp; Interactive Floor Plan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
              Sutan Raja Hotel &amp; Convention Centre Ballroom
            </h2>
            <p className="text-sm sm:text-base text-itcg-navy/70 mt-2 max-w-2xl">
              Venue bintang empat terkemuka di lokasi strategis Soreang, Bandung, dilengkapi grand ballroom tanpa pilar, akustik langit-langit tinggi, serta fasilitas pameran terpadu.
            </p>
            <p className="text-xs text-itcg-navy/60 mt-1 flex items-center space-x-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-itcg-red inline flex-shrink-0" />
              <span>Jl. Raya Soreang KM.17 No.10, Soreang, Kabupaten Bandung, Jawa Barat 40911</span>
            </p>
          </div>

          {/* External Google Maps Button */}
          <div className="mt-6 md:mt-0">
            <a
              href="https://maps.google.com/?q=Sutan+Raja+Hotel+and+Convention+Centre+Soreang+Bandung"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-heading font-bold text-white bg-itcg-blue hover:bg-itcg-blue-hover rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-itcg-blue/40"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Venue Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-itcg-gray-light p-4 rounded-xl border border-itcg-gray">
            <div className="text-xs font-heading font-bold text-itcg-gray-dark uppercase">Main Stage Specs</div>
            <div className="text-lg font-heading font-extrabold text-itcg-navy mt-1">16.0 x 6.0 m</div>
            <div className="text-xs text-itcg-blue mt-0.5">Stage Height 60 cm • Dual Screen Podium</div>
          </div>

          <div className="bg-itcg-gray-light p-4 rounded-xl border border-itcg-gray">
            <div className="text-xs font-heading font-bold text-itcg-gray-dark uppercase">Primary LED Videotron</div>
            <div className="text-lg font-heading font-extrabold text-itcg-navy mt-1">8.0 x 4.0 m</div>
            <div className="text-xs text-itcg-red mt-0.5">Pixel Pitch 2.5 mm High Refresh Rate</div>
          </div>

          <div className="bg-itcg-gray-light p-4 rounded-xl border border-itcg-gray">
            <div className="text-xs font-heading font-bold text-itcg-gray-dark uppercase">Ballroom Capacity</div>
            <div className="text-lg font-heading font-extrabold text-itcg-navy mt-1">±300 IT Professionals</div>
            <div className="text-xs text-itcg-blue mt-0.5">Exhibition Booths (Platinum, Gold, Silver)</div>
          </div>
        </div>

        {/* Main Grid: Interactive Floor Plan Canvas & Technical Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Interactive SVG Ballroom Floor Plan (Col 7) */}
          <div className="lg:col-span-7 bg-itcg-gray-light p-4 sm:p-6 rounded-2xl border-2 border-itcg-navy shadow-lg relative overflow-hidden">

            <div className="flex items-center justify-between pb-3 border-b border-itcg-gray mb-4">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-itcg-red opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-itcg-red" />
                </span>
                <span className="text-xs font-heading font-extrabold text-itcg-navy">
                  BALLROOM ARCHITECTURAL LAYOUT (CLICK ZONE FOR DETAILS)
                </span>
              </div>
              <span className="text-[11px] font-mono text-itcg-gray-dark">Scale 1:100</span>
            </div>

            {/* SVG Floor Plan Diagram */}
            <div className="w-full aspect-[4/3.2] bg-white border border-itcg-gray rounded-lg p-2 shadow-inner relative flex items-center justify-center">
              <svg
                viewBox="0 0 800 640"
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.04))' }}
                role="region"
                aria-label="Ballroom Floor Plan Map"
              >
                {/* Background Grid Lines (Subtle Architectural Grid) */}
                <defs>
                  <pattern id="planGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6E9F2" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="800" height="640" fill="url(#planGrid)" rx="8" />

                {/* Ballroom Outer Perimeter Wall */}
                <rect x="20" y="18" width="760" height="604" fill="none" stroke="#0D2B6B" strokeWidth="3" rx="10" />

                {/* ======================================================== */}
                {/* 1. SPEAKER LOUNGE (Long Horizontal Enclosed Area at Top) */}
                {/* ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Speaker Lounge & VIP Holding Area"
                  onClick={() => setSelectedZone('speaker_lounge')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'speaker_lounge')}
                  className="cursor-pointer transition-transform hover:opacity-95 focus:outline-none"
                >
                  <rect
                    x="180"
                    y="26"
                    width="440"
                    height="38"
                    rx="4"
                    fill={selectedZone === 'speaker_lounge' ? '#0D2B6B' : '#EBF3FD'}
                    stroke={selectedZone === 'speaker_lounge' ? '#E3062E' : '#0D2B6B'}
                    strokeWidth={selectedZone === 'speaker_lounge' ? '2.5' : '1.5'}
                  />
                  <text
                    x="400"
                    y="45"
                    textAnchor="middle"
                    fill={selectedZone === 'speaker_lounge' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="11"
                    letterSpacing="0.05em"
                  >
                    SPEAKER LOUNGE // VIP HOLDING AREA
                  </text>
                  <text
                    x="400"
                    y="57"
                    textAnchor="middle"
                    fill={selectedZone === 'speaker_lounge' ? '#EBF3FD' : '#75829C'}
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="8.5"
                  >
                    Enclosed Private Holding (14.0 x 3.5 m) • Backstage Passage
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 2. CLEAR SIDES BESIDE MAIN STAGE (Both Sides Clear)     */}
                {/* ======================================================== */}
                {/* Left Stage Clearance Aisle */}
                <g>
                  <rect
                    x="35"
                    y="26"
                    width="125"
                    height="144"
                    rx="4"
                    fill="#F8FAFC"
                    stroke="#E6E9F2"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <text x="97.5" y="94" textAnchor="middle" fill="#75829C" fontFamily="Montserrat" fontWeight="700" fontSize="9">
                    STAGE WING
                  </text>
                  <text x="97.5" y="108" textAnchor="middle" fill="#75829C" fontFamily="Inter" fontWeight="500" fontSize="8">
                    Clear Aisle (No Booths)
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 3. ACCESS CORRIDOR (Upper-Right Area adjacent to Stage)  */}
                {/* ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Access Corridor & VIP Passage"
                  onClick={() => setSelectedZone('access_corridor')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'access_corridor')}
                  className="cursor-pointer transition-transform hover:opacity-95 focus:outline-none"
                >
                  <rect
                    x="640"
                    y="26"
                    width="125"
                    height="144"
                    rx="4"
                    fill={selectedZone === 'access_corridor' ? '#0D2B6B' : '#E6E9F2'}
                    stroke={selectedZone === 'access_corridor' ? '#0066E0' : '#75829C'}
                    strokeWidth={selectedZone === 'access_corridor' ? '2.5' : '1.5'}
                    strokeDasharray={selectedZone === 'access_corridor' ? 'none' : '4 3'}
                  />
                  <text
                    x="702.5"
                    y="88"
                    textAnchor="middle"
                    fill={selectedZone === 'access_corridor' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10"
                  >
                    ACCESS CORRIDOR
                  </text>
                  <text
                    x="702.5"
                    y="102"
                    textAnchor="middle"
                    fill={selectedZone === 'access_corridor' ? '#EBF3FD' : '#0066E0'}
                    fontFamily="Montserrat"
                    fontWeight="700"
                    fontSize="8.5"
                  >
                    &amp; VIP PASSAGE
                  </text>
                  <text
                    x="702.5"
                    y="118"
                    textAnchor="middle"
                    fill={selectedZone === 'access_corridor' ? '#EBF3FD' : '#75829C'}
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="7.5"
                  >
                    Stage &amp; Evacuation Route
                  </text>
                  {/* Arrow Indicator */}
                  <polygon
                    points="702.5,130 696.5,138 708.5,138"
                    fill={selectedZone === 'access_corridor' ? '#FFFFFF' : '#0066E0'}
                  />
                </g>

                {/* ======================================================== */}
                {/* 4. MAIN STAGE (Centered Horizontally, 16.0 x 6.0 m)      */}
                {/* ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Main Stage"
                  onClick={() => setSelectedZone('stage')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'stage')}
                  className="cursor-pointer transition-transform hover:opacity-95 focus:outline-none"
                >
                  <rect
                    x="180"
                    y="72"
                    width="440"
                    height="98"
                    rx="6"
                    fill={selectedZone === 'stage' ? '#0D2B6B' : '#153C8D'}
                    stroke={selectedZone === 'stage' ? '#E3062E' : '#0D2B6B'}
                    strokeWidth={selectedZone === 'stage' ? '3' : '1.5'}
                  />
                  <text x="400" y="122" textAnchor="middle" fill="#FFFFFF" fontFamily="Montserrat" fontWeight="800" fontSize="15">
                    MAIN STAGE (16 x 6 m)
                  </text>
                  <text x="400" y="142" textAnchor="middle" fill="#EBF3FD" fontFamily="Inter" fontWeight="600" fontSize="10">
                    Tinggi 60 cm • Podium Keynote &amp; Sesi Presentasi Platinum
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 5. LED VIDEOTRON (Front/Top Edge of Main Stage, 8 x 4 m) */}
                {/* ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="LED Videotron"
                  onClick={() => setSelectedZone('videotron')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'videotron')}
                  className="cursor-pointer transition-transform hover:opacity-95 focus:outline-none"
                >
                  <rect
                    x="270"
                    y="76"
                    width="260"
                    height="22"
                    rx="3"
                    fill={selectedZone === 'videotron' ? '#C00426' : '#E3062E'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <text
                    x="400"
                    y="91"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="9.5"
                    letterSpacing="0.05em"
                  >
                    LED VIDEOTRON P2.5 (8 x 4 m)
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 6. MAIN SEATING AREA (Center, ~300 Participants)        */}
                {/* ======================================================== */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Main Audience Seating"
                  onClick={() => setSelectedZone('seating')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'seating')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="150"
                    y="180"
                    width="500"
                    height="256"
                    rx="8"
                    fill={selectedZone === 'seating' ? '#F0F7FF' : '#F8FAFC'}
                    stroke={selectedZone === 'seating' ? '#0066E0' : '#CBD5E1'}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Banquet Round Tables (4 Rows x 5 Columns = 20 Tables for ~300 pax) */}
                  {[0, 1, 2, 3].map((row) => (
                    [0, 1, 2, 3, 4].map((col) => (
                      <g key={`t-${row}-${col}`}>
                        <circle
                          cx={204 + col * 98}
                          cy={215 + row * 60}
                          r="18"
                          fill="#FFFFFF"
                          stroke={selectedZone === 'seating' ? '#0066E0' : '#94A3B8'}
                          strokeWidth="1.5"
                        />
                        <circle
                          cx={204 + col * 98}
                          cy={215 + row * 60}
                          r="4"
                          fill={selectedZone === 'seating' ? '#0066E0' : '#CBD5E1'}
                        />
                      </g>
                    ))
                  ))}
                  {/* Seating Banner Badge */}
                  <rect x="250" y="295" width="300" height="32" rx="4" fill="#0D2B6B" opacity="0.92" />
                  <text x="400" y="316" textAnchor="middle" fill="#FFFFFF" fontFamily="Montserrat" fontWeight="800" fontSize="12">
                    MAIN SEATING AREA (±300 PARTICIPANTS)
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 7. LEFT SIDE SPONSOR CLUSTERS (Compact Columns)         */}
                {/* ======================================================== */}
                {/* Left Platinum Booth Cluster (Upper Position) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Platinum Booth Cluster"
                  onClick={() => setSelectedZone('platinum_booth')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'platinum_booth')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="35"
                    y="180"
                    width="85"
                    height="106"
                    rx="5"
                    fill={selectedZone === 'platinum_booth' ? '#0D2B6B' : '#EBF3FD'}
                    stroke={selectedZone === 'platinum_booth' ? '#E3062E' : '#0D2B6B'}
                    strokeWidth={selectedZone === 'platinum_booth' ? '2.5' : '1.5'}
                  />
                  {/* Cluster Title Header: PLATINUM only */}
                  <text
                    x="77.5"
                    y="196"
                    textAnchor="middle"
                    fill={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10"
                    letterSpacing="0.08em"
                  >
                    PLATINUM
                  </text>

                  {/* 3 Compact Rectangular Modules in a Single Vertical Column */}
                  <rect
                    x="41"
                    y="204"
                    width="73"
                    height="23"
                    rx="3"
                    fill={selectedZone === 'platinum_booth' ? '#153C8D' : '#FFFFFF'}
                    stroke={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    strokeWidth="1"
                  />
                  <rect
                    x="41"
                    y="231"
                    width="73"
                    height="23"
                    rx="3"
                    fill={selectedZone === 'platinum_booth' ? '#153C8D' : '#FFFFFF'}
                    stroke={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    strokeWidth="1"
                  />
                  <rect
                    x="41"
                    y="258"
                    width="73"
                    height="23"
                    rx="3"
                    fill={selectedZone === 'platinum_booth' ? '#153C8D' : '#FFFFFF'}
                    stroke={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    strokeWidth="1"
                  />
                </g>

                {/* Left Gold Booth Cluster (Directly Below Platinum) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Gold Booth Cluster"
                  onClick={() => setSelectedZone('gold_booth')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'gold_booth')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="35"
                    y="294"
                    width="85"
                    height="142"
                    rx="5"
                    fill={selectedZone === 'gold_booth' ? '#0066E0' : '#EBF3FD'}
                    stroke={selectedZone === 'gold_booth' ? '#0D2B6B' : '#0066E0'}
                    strokeWidth={selectedZone === 'gold_booth' ? '2.5' : '1.5'}
                  />
                  {/* Cluster Title Header: GOLD only */}
                  <text
                    x="77.5"
                    y="309"
                    textAnchor="middle"
                    fill={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10"
                    letterSpacing="0.08em"
                  >
                    GOLD
                  </text>

                  {/* 6 Compact Rectangular Modules in a Single Vertical Column */}
                  <rect
                    x="41"
                    y="316"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="41"
                    y="335"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="41"
                    y="354"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="41"
                    y="373"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="41"
                    y="392"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="41"
                    y="411"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                </g>

                {/* ======================================================== */}
                {/* 8. RIGHT SIDE SPONSOR CLUSTERS (Compact Columns)        */}
                {/* ======================================================== */}
                {/* Right Platinum Booth Cluster (Upper Position) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Platinum Booth Cluster"
                  onClick={() => setSelectedZone('platinum_booth')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'platinum_booth')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="680"
                    y="180"
                    width="85"
                    height="106"
                    rx="5"
                    fill={selectedZone === 'platinum_booth' ? '#0D2B6B' : '#EBF3FD'}
                    stroke={selectedZone === 'platinum_booth' ? '#E3062E' : '#0D2B6B'}
                    strokeWidth={selectedZone === 'platinum_booth' ? '2.5' : '1.5'}
                  />
                  {/* Cluster Title Header: PLATINUM only */}
                  <text
                    x="722.5"
                    y="196"
                    textAnchor="middle"
                    fill={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10"
                    letterSpacing="0.08em"
                  >
                    PLATINUM
                  </text>

                  {/* 3 Compact Rectangular Modules in a Single Vertical Column */}
                  <rect
                    x="686"
                    y="204"
                    width="73"
                    height="23"
                    rx="3"
                    fill={selectedZone === 'platinum_booth' ? '#153C8D' : '#FFFFFF'}
                    stroke={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    strokeWidth="1"
                  />
                  <rect
                    x="686"
                    y="231"
                    width="73"
                    height="23"
                    rx="3"
                    fill={selectedZone === 'platinum_booth' ? '#153C8D' : '#FFFFFF'}
                    stroke={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    strokeWidth="1"
                  />
                  <rect
                    x="686"
                    y="258"
                    width="73"
                    height="23"
                    rx="3"
                    fill={selectedZone === 'platinum_booth' ? '#153C8D' : '#FFFFFF'}
                    stroke={selectedZone === 'platinum_booth' ? '#FFFFFF' : '#0D2B6B'}
                    strokeWidth="1"
                  />
                </g>

                {/* Right Gold Booth Cluster (Directly Below Platinum) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Gold Booth Cluster"
                  onClick={() => setSelectedZone('gold_booth')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'gold_booth')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="680"
                    y="294"
                    width="85"
                    height="142"
                    rx="5"
                    fill={selectedZone === 'gold_booth' ? '#0066E0' : '#EBF3FD'}
                    stroke={selectedZone === 'gold_booth' ? '#0D2B6B' : '#0066E0'}
                    strokeWidth={selectedZone === 'gold_booth' ? '2.5' : '1.5'}
                  />
                  {/* Cluster Title Header: GOLD only */}
                  <text
                    x="722.5"
                    y="309"
                    textAnchor="middle"
                    fill={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10"
                    letterSpacing="0.08em"
                  >
                    GOLD
                  </text>

                  {/* 6 Compact Rectangular Modules in a Single Vertical Column */}
                  <rect
                    x="686"
                    y="316"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="686"
                    y="335"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="686"
                    y="354"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="686"
                    y="373"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="686"
                    y="392"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                  <rect
                    x="686"
                    y="411"
                    width="73"
                    height="16"
                    rx="2.5"
                    fill={selectedZone === 'gold_booth' ? '#0052B8' : '#FFFFFF'}
                    stroke={selectedZone === 'gold_booth' ? '#FFFFFF' : '#0066E0'}
                    strokeWidth="0.9"
                  />
                </g>

                {/* ======================================================== */}
                {/* 9. REAR FACILITIES (Silver Booth Areas & FOH Center)     */}
                {/* ======================================================== */}
                {/* Silver Booth Area (Left of FOH) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Silver Booth Area"
                  onClick={() => setSelectedZone('silver_booth')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'silver_booth')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="35"
                    y="448"
                    width="240"
                    height="50"
                    rx="5"
                    fill={selectedZone === 'silver_booth' ? '#75829C' : '#E6E9F2'}
                    stroke={selectedZone === 'silver_booth' ? '#0D2B6B' : '#75829C'}
                    strokeWidth={selectedZone === 'silver_booth' ? '2.5' : '1.5'}
                  />
                  <text
                    x="155"
                    y="473"
                    textAnchor="middle"
                    fill={selectedZone === 'silver_booth' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10"
                  >
                    SILVER BOOTH AREA
                  </text>
                  <text
                    x="155"
                    y="488"
                    textAnchor="middle"
                    fill={selectedZone === 'silver_booth' ? '#EBF3FD' : '#75829C'}
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="8"
                  >
                    Promotional Desks (1.5 x 1.5 m)
                  </text>
                </g>

                {/* FOH Control Desk (Center between Silver Areas) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="FOH Control Desk"
                  onClick={() => setSelectedZone('foh')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'foh')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="295"
                    y="448"
                    width="210"
                    height="50"
                    rx="5"
                    fill={selectedZone === 'foh' ? '#071A42' : '#0D2B6B'}
                    stroke={selectedZone === 'foh' ? '#E3062E' : '#0066E0'}
                    strokeWidth={selectedZone === 'foh' ? '2.5' : '1.5'}
                  />
                  <text x="400" y="471" textAnchor="middle" fill="#FFFFFF" fontFamily="Montserrat" fontWeight="800" fontSize="11">
                    FOH CONTROL DESK
                  </text>
                  <text x="400" y="486" textAnchor="middle" fill="#EBF3FD" fontFamily="Inter" fontWeight="600" fontSize="8.5">
                    Audio, Lighting, Mixer &amp; Broadcast Center
                  </text>
                </g>

                {/* Silver Booth Area (Right of FOH) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Silver Booth Area"
                  onClick={() => setSelectedZone('silver_booth')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'silver_booth')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="525"
                    y="448"
                    width="240"
                    height="50"
                    rx="5"
                    fill={selectedZone === 'silver_booth' ? '#75829C' : '#E6E9F2'}
                    stroke={selectedZone === 'silver_booth' ? '#0D2B6B' : '#75829C'}
                    strokeWidth={selectedZone === 'silver_booth' ? '2.5' : '1.5'}
                  />
                  <text
                    x="645"
                    y="473"
                    textAnchor="middle"
                    fill={selectedZone === 'silver_booth' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10"
                  >
                    SILVER BOOTH AREA
                  </text>
                  <text
                    x="645"
                    y="488"
                    textAnchor="middle"
                    fill={selectedZone === 'silver_booth' ? '#EBF3FD' : '#75829C'}
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="8"
                  >
                    Promotional Desks (1.5 x 1.5 m)
                  </text>
                </g>

                {/* ======================================================== */}
                {/* 10. FRONT/BOTTOM AREA (Photobooth, Gate, Catering)       */}
                {/* ======================================================== */}
                {/* Photobooth & 360 Spin (Bottom Left) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Photobooth & 360 Spin"
                  onClick={() => setSelectedZone('photobooth')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'photobooth')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="35"
                    y="515"
                    width="230"
                    height="62"
                    rx="6"
                    fill={selectedZone === 'photobooth' ? '#C00426' : '#FFFFFF'}
                    stroke="#E3062E"
                    strokeWidth={selectedZone === 'photobooth' ? '2.5' : '1.5'}
                  />
                  <text
                    x="150"
                    y="543"
                    textAnchor="middle"
                    fill={selectedZone === 'photobooth' ? '#FFFFFF' : '#E3062E'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10.5"
                  >
                    PHOTOBOOTH &amp; 360 SPIN
                  </text>
                  <text
                    x="150"
                    y="560"
                    textAnchor="middle"
                    fill={selectedZone === 'photobooth' ? '#EBF3FD' : '#0D2B6B'}
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="8.5"
                  >
                    Media Wall &amp; Dokumentasi Resmi (5 x 3 m)
                  </text>
                </g>

                {/* Main Gate & Registration (Bottom Center) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Main Gate & Registration"
                  onClick={() => setSelectedZone('entrance')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'entrance')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="285"
                    y="515"
                    width="230"
                    height="62"
                    rx="6"
                    fill={selectedZone === 'entrance' ? '#0D2B6B' : '#EBF3FD'}
                    stroke={selectedZone === 'entrance' ? '#E3062E' : '#0066E0'}
                    strokeWidth={selectedZone === 'entrance' ? '2.5' : '1.5'}
                  />
                  <text
                    x="400"
                    y="543"
                    textAnchor="middle"
                    fill={selectedZone === 'entrance' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="11"
                  >
                    MAIN GATE &amp; REGISTRATION
                  </text>
                  <text
                    x="400"
                    y="560"
                    textAnchor="middle"
                    fill={selectedZone === 'entrance' ? '#EBF3FD' : '#0066E0'}
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="8.5"
                  >
                    Pintu Masuk Utama • QR Check-in Terminal
                  </text>
                  {/* Entrance Arrow Direction */}
                  <polygon
                    points="400,587 392,597 408,597"
                    fill={selectedZone === 'entrance' ? '#E3062E' : '#0066E0'}
                  />
                </g>

                {/* Coffee & VIP Catering (Bottom Right) */}
                <g
                  role="button"
                  tabIndex={0}
                  aria-label="Coffee & VIP Catering Station"
                  onClick={() => setSelectedZone('catering')}
                  onKeyDown={(e) => handleZoneKeyDown(e, 'catering')}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="535"
                    y="515"
                    width="230"
                    height="62"
                    rx="6"
                    fill={selectedZone === 'catering' ? '#0066E0' : '#FFFFFF'}
                    stroke={selectedZone === 'catering' ? '#0D2B6B' : '#0066E0'}
                    strokeWidth={selectedZone === 'catering' ? '2.5' : '1.5'}
                  />
                  <text
                    x="650"
                    y="543"
                    textAnchor="middle"
                    fill={selectedZone === 'catering' ? '#FFFFFF' : '#0D2B6B'}
                    fontFamily="Montserrat"
                    fontWeight="800"
                    fontSize="10.5"
                  >
                    COFFEE &amp; VIP CATERING
                  </text>
                  <text
                    x="650"
                    y="560"
                    textAnchor="middle"
                    fill={selectedZone === 'catering' ? '#EBF3FD' : '#75829C'}
                    fontFamily="Inter"
                    fontWeight="600"
                    fontSize="8.5"
                  >
                    Snack Bar &amp; Refreshment Station (6 x 3 m)
                  </text>
                </g>

                {/* Main Ballroom Entry / Foyer Door Indicator */}
                <line x1="340" y1="622" x2="460" y2="622" stroke="#E3062E" strokeWidth="4" />
                <text x="400" y="614" textAnchor="middle" fill="#E3062E" fontFamily="Montserrat" fontWeight="800" fontSize="8" letterSpacing="0.08em">
                  ▲ MAIN BALLROOM ENTRY
                </text>

              </svg>
            </div>

            {/* Visual Color Legend Bar */}
            <div className="mt-4 pt-3 border-t border-itcg-gray flex flex-wrap items-center justify-between text-[11px] font-medium text-itcg-navy/80 gap-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-xs bg-itcg-navy inline-block" />
                <span className="font-semibold text-itcg-navy">Main Stage &amp; Platinum (3x3m)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-xs bg-itcg-blue inline-block" />
                <span className="font-semibold text-itcg-blue">Gold Booths (2x2m)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-xs bg-itcg-gray-dark inline-block" />
                <span className="font-semibold text-itcg-navy/70">Silver Booth Area &amp; Corridor</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-xs bg-itcg-red inline-block" />
                <span className="font-semibold text-itcg-red">Videotron &amp; Photobooth</span>
              </div>
            </div>

            {/* Quick Navigation Pills for Interactive Zones */}
            <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
              {Object.keys(zones).map((key) => {
                const z = zones[key];
                const active = selectedZone === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedZone(key)}
                    className={`px-2.5 py-1 text-[11px] font-heading font-semibold rounded transition-all focus:outline-none focus:ring-2 focus:ring-itcg-blue/40 ${
                      active
                        ? 'bg-itcg-navy text-white shadow-xs'
                        : 'bg-white text-itcg-navy border border-itcg-gray hover:bg-gray-100'
                    }`}
                  >
                    {z.name.split(' (')[0].split(' &')[0]}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Technical Specifications Panel (Col 5) */}
          <div className="lg:col-span-5 bg-white border border-[#E6E9F2] shadow-md rounded-2xl p-6 relative">

            <div className="pb-4 border-b border-itcg-gray">
              <span className={`inline-block text-[10px] font-heading font-extrabold uppercase px-2 py-0.5 rounded ${current.badgeColor}`}>
                {current.badge}
              </span>
              <h3 className="text-xl font-heading font-extrabold text-itcg-navy mt-2">
                {current.name}
              </h3>
              <p className="text-xs text-itcg-navy/70 mt-1 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Specs Summary */}
            <div className="py-4 space-y-3 border-b border-itcg-gray text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-itcg-gray-dark">Dimensions:</span>
                <span className="font-mono font-bold text-itcg-navy">{current.dimensions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-itcg-gray-dark">Capacity:</span>
                <span className="font-semibold text-itcg-navy">{current.capacity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-itcg-gray-dark">Power Supply:</span>
                <span className="font-mono font-semibold text-itcg-blue">{current.power}</span>
              </div>
            </div>

            {/* Amenities List */}
            <div className="pt-4">
              <div className="text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-2">
                Technical Amenities:
              </div>
              <div className="space-y-2">
                {current.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-itcg-navy/85">
                    <Check className="w-3.5 h-3.5 text-itcg-blue flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip note */}
            <div className="mt-6 p-3 bg-itcg-blue-light/60 rounded-lg border border-itcg-blue/20 flex items-start space-x-2 text-[11px] text-itcg-navy">
              <Info className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
              <span>
                Prioritas pemilihan posisi booth ditentukan berdasarkan urutan konfirmasi dan pelunasan kemitraan.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
