import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SponsorGrid from '@/components/SponsorGrid';
import SponsorLogoSimulator from '@/components/SponsorLogoSimulator';
import SponsorInquiryForm from '@/components/SponsorInquiryForm';
import { getSponsorshipTiersWithSponsors } from '@/lib/data';
import {
  Users,
  Eye,
  MonitorPlay,
  Handshake,
  Mic,
  Calendar,
  CheckCircle2,
  CreditCard,
  Building,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SponsorsPage() {
  const tiers = await getSponsorshipTiersWithSponsors();

  const sponsorshipValues = [
    {
      icon: Users,
      title: 'Direct Access to ±300 Industrial IT Leaders',
      desc: 'Berinteraksi langsung dengan CIO, VP Technology, IT Manager, OT/SCADA Engineers, dan Head of Infrastructure lintas pabrik di kawasan industri Karawang, Bekasi, dan Purwakarta (mencakup EJIP, MM2100, Jababeka, GIIC, Suryacipta).',
    },
    {
      icon: Eye,
      title: 'Maximum & Sustainable Brand Exposure',
      desc: 'Penempatan logo prominen di LED Videotron raksasa 8x4m, backdrop panggung utama, materi promosi cetak, lanyard badge resmi, serta direktori mitra portal digital KOMITKABE.',
    },
    {
      icon: MonitorPlay,
      title: 'Live Technology Demonstrations at Dedicated Booths',
      desc: 'Pamerkan keunggulan solusi hardware industri, live platform dashboard, edge device sensor, dan teknologi AI terkini di booth pameran berdaya listrik terdedikasi.',
    },
    {
      icon: Handshake,
      title: 'Executive B2B Networking & Matchmaking',
      desc: 'Akses ke sesi makan siang eksekutif prasmanan (ISOMA) dan coffee break networking untuk menjajaki implementasi PoC (Proof of Concept) langsung dengan calon klien potensial.',
    },
    {
      icon: Mic,
      title: 'Exclusive Speaking Slot on Main Stage',
      desc: 'Bagi mitra Platinum, kesempatan emas menyampaikan presentasi teknologi keynote selama 40 menit di hadapan seluruh audiens di panggung utama 16x6m.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main className="flex-grow">
        
        {/* Hero Section of Sponsorship Page */}
        <section className="bg-itcg-navy text-white pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-itcg-gray relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-white/10 text-white border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
                <span>Strategic Partnership Program ITCG 2027</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
                Partnership Opportunities &amp; Industrial Technology Exhibition
              </h1>
              <p className="text-base sm:text-lg text-itcg-gray/85 leading-relaxed">
                Jembatani solusi teknologi perusahaan Anda dengan 300+ praktisi dan penentu kebijakan IT kawasan industri Karawang, Bekasi, dan Purwakarta. Temukan gambaran fasilitas, ketersediaan slot kemitraan, dan alur kemitraan terpadu.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Confirmed Sponsors & Slot Availability */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
                <span>Live Partnership Status</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
                Confirmed Sponsors &amp; Available Slots
              </h2>
              <p className="text-sm sm:text-base text-itcg-navy/70 mt-2">
                Kapasitas dialokasikan secara eksklusif untuk mitra Platinum, Gold, dan Silver demi menjamin eksposur optimal bagi setiap mitra teknologi.
              </p>
            </div>

            <SponsorGrid tiers={tiers} showOpenSlots={true} showQuotaNumbers={false} />

            {/* Interactive Floor Plan Callout */}
            <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-itcg-navy to-[#15347a] text-white border border-white/10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-white/10 text-itcg-blue border border-white/15">
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Denah Booth 3D Interaktif</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Ingin Memilih Posisi Booth Spesifik?
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Jelajahi visualisasi denah ballroom 3D render, cek spesifikasi masing-masing slot (P-01 s/d P-06, G-01 s/d G-12, S-01 s/d S-06), dan booking booth pilihan Anda secara langsung.
                </p>
              </div>
              <Link
                href="/booths"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-itcg-blue hover:bg-itcg-blue-hover text-white font-heading font-bold text-sm shadow-md transition-all shrink-0"
              >
                <span>Buka Denah Interaktif</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3. 5 Nilai Kemitraan Utama Bagi Sponsor */}
        <section className="py-16 sm:py-20 bg-itcg-gray-light border-y border-itcg-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#E3062E]/10 text-[#E3062E] border border-[#E3062E]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3062E] shrink-0" />
                <span>Benefits &amp; Return on Engagement</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
                5 Core Values of Becoming an ITCG 2027 Sponsor Partner
              </h2>
              <p className="text-sm sm:text-base text-itcg-navy/70 mt-2">
                Investasi kemitraan yang dirancang secara terukur untuk mempercepat penetrasi pasar teknologi Anda ke sektor manufaktur dan industri koridor timur Jakarta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsorshipValues.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl border border-itcg-gray shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-itcg-blue-light text-itcg-blue flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-itcg-blue" />
                      </div>
                      <h3 className="text-base font-heading font-extrabold text-itcg-navy leading-snug">
                        {val.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-itcg-navy/75 mt-2 leading-relaxed">
                        {val.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-itcg-gray/60 flex items-center justify-between text-xs font-heading font-bold text-itcg-gray-dark">
                      <span>Value #{idx + 1}</span>
                      <span className="text-itcg-blue font-bold">ITCG 2027</span>
                    </div>
                  </div>
                );
              })}

              {/* Bonus 6th Box: Komunitas Terverifikasi */}
              <div className="bg-itcg-navy text-white p-6 rounded-xl border-2 border-itcg-blue shadow-md flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white/10 text-white flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-heading font-extrabold text-white leading-snug">
                    Long-Term Partnership Ecosystem
                  </h3>
                  <p className="text-xs sm:text-sm text-itcg-gray/80 mt-2 leading-relaxed">
                    Lebih dari sekadar pertemuan dua hari (16-17 Januari 2027), kemitraan ITCG membuka akses berkelanjutan ke ekosistem profesional, forum diskusi pengambil keputusan, dan agenda kolaborasi KOMITKABE sepanjang tahun.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/10 text-xs font-heading text-itcg-red font-bold">
                  The Power of Collaborations
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Gambaran Tingkat Kemitraan & Ketentuan Penting */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0D2B6B]/8 text-[#0D2B6B] border border-[#0D2B6B]/12">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D2B6B] shrink-0" />
                <span>Official Packages &amp; Terms</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
                Partnership Facilities Overview &amp; Payment Terms
              </h2>
              <p className="text-sm sm:text-base text-itcg-navy/70 mt-2">
                Pilihan tingkatan disesuaikan dengan intensitas eksposur panggung, luas booth pameran, dan kebutuhan fasilitas akomodasi perwakilan vendor.
              </p>
            </div>

            {/* 3 Tier Comparison Cards (Tablet 2-col, Desktop 3-col) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              
              {/* PLATINUM */}
              <div className="border-2 border-itcg-navy bg-white rounded-2xl p-6 sm:p-7 shadow-lg relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-itcg-gray">
                    <span className="px-3 py-1 text-xs font-heading font-extrabold uppercase bg-itcg-navy text-white rounded">
                      PLATINUM PARTNER
                    </span>
                    <span className="text-xs font-heading font-bold text-itcg-red">Primary Exclusive</span>
                  </div>

                  <h3 className="text-xl font-heading font-extrabold text-itcg-navy mt-4">
                    Main Stage Keynote &amp; Front-Row Booth
                  </h3>
                  <p className="text-xs text-itcg-navy/70 mt-1">
                    Paket kemitraan paling prestisius dengan eksposur keynote panggung utama dan akses langsung ke 300+ pengambil keputusan IT industri.
                  </p>

                  <div className="mt-6 space-y-3 text-xs text-itcg-navy/85">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-red flex-shrink-0 mt-0.5" />
                      <span><strong>Sesi Presentasi 40 Menit</strong> di Panggung Utama (16x6m) dengan LED Videotron 8x4m</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Booth Ukuran 3.0 x 3.0 m</strong> di baris terdepan menghadap panggung</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Akomodasi Hotel 1 Malam</strong> di Sutan Raja Hotel (Include Breakfast)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Daya Listrik Dedicated 2.200 Watt</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Stop Kontak Listrik (Included)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Smart TV LED (Optional Add-on)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>4 VIP Delegate Passes & Full Dining Hospitality</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Penempatan logo ukuran besar di seluruh materi cetak & digital</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-itcg-gray space-y-3">
                  <div className="text-xs font-heading font-medium text-itcg-navy/70">
                    Posisi Booth Terdepan • Priority #1 Selection
                  </div>
                  <a
                    href="#partnership-inquiry"
                    data-tier="PLATINUM"
                    className="select-tier-btn w-full inline-flex items-center justify-center px-4 py-3 text-xs sm:text-sm font-heading font-extrabold text-white bg-itcg-navy hover:bg-itcg-blue rounded-xl transition-all shadow-md group"
                  >
                    <span>Pilih Paket Platinum</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* GOLD */}
              <div className="border-2 border-itcg-blue/50 hover:border-itcg-blue bg-white rounded-2xl p-6 sm:p-7 shadow-md relative flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-itcg-gray">
                    <span className="px-3 py-1 text-xs font-heading font-extrabold uppercase bg-itcg-blue text-white rounded">
                      GOLD PARTNER
                    </span>
                    <span className="text-xs font-heading font-bold text-itcg-blue">Interactive Exhibition</span>
                  </div>

                  <h3 className="text-xl font-heading font-extrabold text-itcg-navy mt-4">
                    Ballroom Wing 2x2m Exhibition Booth
                  </h3>
                  <p className="text-xs text-itcg-navy/70 mt-1">
                    Posisi strategis di sayap ballroom untuk demonstrasi teknologi dan interaksi bisnis intensif bersama delegasi pabrik.
                  </p>

                  <div className="mt-6 space-y-3 text-xs text-itcg-navy/85">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Booth Ukuran 2.0 x 2.0 m</strong> di sayap kiri dan kanan ballroom</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Tech Spotlight Mention</strong> oleh MC formal pada sesi transisi panggung</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Daya Listrik 1.300 Watt, 1 Meja Dealing, &amp; 2 Kursi Pameran</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Stop Kontak Listrik (Included)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Smart TV LED (Optional Add-on)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>2 Delegate Passes &amp; Akses Makan Siang Eksekutif</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Penempatan logo di Videotron ballroom &amp; direktori portal</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-itcg-gray space-y-3">
                  <div className="text-xs font-heading font-medium text-itcg-navy/70">
                    Jalur Sirkulasi Peserta Menuju ISOMA &amp; Coffee Break
                  </div>
                  <a
                    href="#partnership-inquiry"
                    data-tier="GOLD"
                    className="select-tier-btn w-full inline-flex items-center justify-center px-4 py-3 text-xs sm:text-sm font-heading font-extrabold text-white bg-itcg-blue hover:bg-itcg-navy rounded-xl transition-all shadow-md group"
                  >
                    <span>Pilih Paket Gold</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* SILVER */}
              <div className="border-2 border-itcg-gray bg-white rounded-2xl p-6 sm:p-7 shadow-xs relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-itcg-gray">
                    <span className="px-3 py-1 text-xs font-heading font-extrabold uppercase bg-gray-700 text-white rounded">
                      SILVER PARTNER
                    </span>
                    <span className="text-xs font-heading font-bold text-gray-600">Promotional Display</span>
                  </div>

                  <h3 className="text-xl font-heading font-extrabold text-itcg-navy mt-4">
                    Corridor Promotional Display &amp; Branding Area
                  </h3>
                  <p className="text-xs text-itcg-navy/70 mt-1">
                    Pilihan efektif untuk membangun brand presence dan mengenalkan solusi teknologi di koridor utama lalu lintas peserta.
                  </p>

                  <div className="mt-6 space-y-3 text-xs text-itcg-navy/85">
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span><strong>Meja Display Promosi (1.5 x 1.5 m)</strong> di area koridor &amp; foyer</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Penyisipan brosur / merchandise di dalam Goodie Bag resmi</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Daya Listrik 450 Watt &amp; Fasilitas Pasang Roll-up Banner mandiri</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Stop Kontak Listrik (Included)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>1 Delegate Pass &amp; Akses Penuh Konferensi</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                      <span>Pencantuman logo di katalog pameran &amp; running screen</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-itcg-gray space-y-3">
                  <div className="text-xs font-heading font-medium text-itcg-navy/70">
                    Titik Strategis Alur Masuk &amp; Pintu Ballroom
                  </div>
                  <a
                    href="#partnership-inquiry"
                    data-tier="SILVER"
                    className="select-tier-btn w-full inline-flex items-center justify-center px-4 py-3 text-xs sm:text-sm font-heading font-extrabold text-white bg-gray-800 hover:bg-itcg-navy rounded-xl transition-all shadow-md group"
                  >
                    <span>Pilih Paket Silver</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* Ketentuan Utama & Informasi Rekening Bendahara */}
            <div className="bg-itcg-gray-light p-6 sm:p-8 rounded-2xl border-2 border-itcg-navy">
              <div className="flex items-center space-x-2 text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-4">
                <FileCheck className="w-4 h-4 text-itcg-red" />
                <span>Key Terms for ITCG 2027 Partnership Participation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-itcg-navy/85">
                <div className="bg-white p-4 rounded-lg border border-itcg-gray">
                  <div className="font-heading font-extrabold text-itcg-navy flex items-center space-x-1.5 mb-1.5">
                    <Calendar className="w-4 h-4 text-itcg-red" />
                    <span>Payment Deadline</span>
                  </div>
                  <p className="leading-relaxed">
                    Batas akhir konfirmasi dan pelunasan kemitraan adalah <strong>1 Januari 2027</strong> demi kepastian produksi materi branding panggung dan penempatan denah ballroom.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-itcg-gray">
                  <div className="font-heading font-extrabold text-itcg-navy flex items-center space-x-1.5 mb-1.5">
                    <Building className="w-4 h-4 text-itcg-blue" />
                    <span>Booth Selection Priority</span>
                  </div>
                  <p className="leading-relaxed">
                    Pemilihan nomor titik booth di denah ballroom menggunakan prinsip <em>First-Verified, First-Served</em> berdasarkan urutan konfirmasi bukti transfer pembayaran yang diverifikasi bendahara.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-itcg-gray">
                  <div className="font-heading font-extrabold text-itcg-navy flex items-center space-x-1.5 mb-1.5">
                    <CreditCard className="w-4 h-4 text-itcg-blue" />
                    <span>Official Treasurer Account</span>
                  </div>
                  <div className="leading-relaxed font-mono">
                    <strong>Bank BCA KCP Cibitung</strong><br />
                    No. Rekening: <span className="text-itcg-navy font-bold">577-5563-301</span><br />
                    Atas Nama: <strong>Heru Pramono</strong>
                  </div>
                  <p className="text-[10px] text-itcg-gray-dark mt-1 italic">
                    Konfirmasi bukti transfer ke tim partnership untuk penerbitan kuitansi resmi.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4.5. Sponsor Logo Placement Simulator (Interactive Brand Exposure Preview) */}
        <section className="py-16 sm:py-20 bg-white border-t border-itcg-gray scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SponsorLogoSimulator />
          </div>
        </section>

        {/* 5. Form Diskusi & Pengajuan Kemitraan Langsung (Email & WhatsApp) */}
        <section id="partnership-inquiry" className="py-16 sm:py-20 bg-itcg-gray-light border-t border-itcg-gray scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SponsorInquiryForm />
          </div>
        </section>

      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
