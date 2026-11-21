'use client';

import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, User, Building2, Phone, Briefcase, ChevronDown, ArrowRight } from 'lucide-react';

export default function SponsorInquiryForm() {
  const [formData, setFormData] = useState({
    picName: '',
    companyName: '',
    position: '',
    email: '',
    phone: '',
    tierInterest: 'PLATINUM',
    message: '',
  });

  // Listen for automatic tier preselection from URL or button clicks
  useEffect(() => {
    const applyTierFromUrl = () => {
      // 1. Check URL query params: ?tier=PLATINUM
      const searchParams = new URLSearchParams(window.location.search);
      const tierQuery = searchParams.get('tier');
      if (tierQuery) {
        const normalized = tierQuery.toUpperCase();
        if (['PLATINUM', 'GOLD', 'SILVER', 'CUSTOM'].includes(normalized)) {
          setFormData((prev) => ({ ...prev, tierInterest: normalized }));
          return;
        }
      }

      // 2. Check URL hash: #partnership-inquiry?tier=PLATINUM or #PLATINUM
      const hash = window.location.hash;
      if (hash) {
        const hashMatch = hash.match(/tier=([A-Za-z]+)/i) || hash.match(/#(PLATINUM|GOLD|SILVER|CUSTOM)/i);
        if (hashMatch && hashMatch[1]) {
          const normalized = hashMatch[1].toUpperCase();
          if (['PLATINUM', 'GOLD', 'SILVER', 'CUSTOM'].includes(normalized)) {
            setFormData((prev) => ({ ...prev, tierInterest: normalized }));
          }
        }
      }
    };

    applyTierFromUrl();

    // 3. Global click listener for [data-tier] buttons
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-tier]') as HTMLElement | null;
      if (target && target.dataset.tier) {
        const tier = target.dataset.tier.toUpperCase();
        if (['PLATINUM', 'GOLD', 'SILVER', 'CUSTOM'].includes(tier)) {
          setFormData((prev) => ({ ...prev, tierInterest: tier }));
          const formElement = document.getElementById('partnership-inquiry');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    // 4. Custom event listener for programmatic preselection
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ tier: string }>;
      if (customEvent.detail?.tier) {
        const normalized = customEvent.detail.tier.toUpperCase();
        if (['PLATINUM', 'GOLD', 'SILVER', 'CUSTOM'].includes(normalized)) {
          setFormData((prev) => ({ ...prev, tierInterest: normalized }));
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('hashchange', applyTierFromUrl);
    window.addEventListener('popstate', applyTierFromUrl);
    window.addEventListener('itcg-select-tier', handleCustomEvent);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('hashchange', applyTierFromUrl);
      window.removeEventListener('popstate', applyTierFromUrl);
      window.removeEventListener('itcg-select-tier', handleCustomEvent);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate Mailto URL
  const generateMailto = () => {
    const to = 'partnership@komitkabe.id';
    const cc = 'official@komitkabe.id';
    const subject = encodeURIComponent(
      `[Pengajuan Kemitraan ITCG 2027] - ${formData.companyName || 'Perusahaan'} - Tier ${formData.tierInterest}`
    );
    const body = encodeURIComponent(
      `Yth. Tim Partnership KOMITKABE ITCG 2027,\n\n` +
      `Berikut rincian minat kemitraan sponsorship kami untuk ajang 6th IT Community Gathering 2027:\n\n` +
      `* Nama PIC: ${formData.picName || '-'}\n` +
      `* Perusahaan: ${formData.companyName || '-'}\n` +
      `* Jabatan: ${formData.position || '-'}\n` +
      `* Email: ${formData.email || '-'}\n` +
      `* No. Telepon/WhatsApp: ${formData.phone || '-'}\n` +
      `* Minat Tingkat Kemitraan: ${formData.tierInterest}\n` +
      `* Pesan / Catatan Kebutuhan: ${formData.message || '-'}\n\n` +
      `Mohon dapat ditindaklanjuti dengan proposal resmi dan ketersediaan nomor slot booth.\n\n` +
      `Salam hangat,\n${formData.picName || 'Mitra'}`
    );
    return `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`;
  };

  // Generate WhatsApp Direct URL
  const generateWaLink = (phoneNumber: string) => {
    const text = encodeURIComponent(
      `Halo Tim Partnership ITCG 2027 KOMITKABE,\n\n` +
      `Saya *${formData.picName || 'PIC'}* dari *${formData.companyName || 'Perusahaan'}* (${formData.position || 'Jabatan'}).\n` +
      `Kami berminat untuk mendiskusikan kemitraan sponsorship ITCG 2027 di tingkat *${formData.tierInterest}*.\n\n` +
      `Email: ${formData.email || '-'}\n` +
      `No. Kontak: ${formData.phone || '-'}\n` +
      `Catatan: ${formData.message || 'Mohon informasi ketersediaan slot booth dan formulir resmi.'}`
    );
    return `https://wa.me/${phoneNumber}?text=${text}`;
  };

  return (
    <div id="partnership-inquiry-card" className="bg-white border border-[#E6E9F2] shadow-xl rounded-2xl p-6 sm:p-10 lg:p-12 relative w-full">
      {/* Header */}
      <div className="pb-6 border-b border-itcg-gray">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#E3062E]/10 text-[#E3062E] border border-[#E3062E]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E3062E] shrink-0" />
          <span>Partnership Inquiry &amp; Reservation</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
          Contact the ITCG 2027 Partnership Team
        </h3>
        <p className="text-sm sm:text-base text-itcg-navy/70 mt-1.5 leading-relaxed max-w-3xl">
          Silakan lengkapi profil singkat di bawah ini untuk pengajuan kemitraan melalui email atau terhubung langsung dengan tim partnership kami via WhatsApp.
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
          
          {/* PIC Name */}
          <div>
            <label htmlFor="inquiry-picName" className="block text-xs font-heading font-bold text-itcg-navy mb-1.5">
              Nama Lengkap PIC <span className="text-itcg-red">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-itcg-gray-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-picName"
                type="text"
                name="picName"
                value={formData.picName}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso"
                required
                className="w-full h-12 pl-10 pr-3.5 text-sm bg-itcg-gray-light/60 border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white text-itcg-navy transition-all"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="inquiry-companyName" className="block text-xs font-heading font-bold text-itcg-navy mb-1.5">
              Nama Perusahaan / Brand <span className="text-itcg-red">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-itcg-gray-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-companyName"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="PT Solusi Industri Nusantara"
                required
                className="w-full h-12 pl-10 pr-3.5 text-sm bg-itcg-gray-light/60 border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white text-itcg-navy transition-all"
              />
            </div>
          </div>

          {/* Position */}
          <div>
            <label htmlFor="inquiry-position" className="block text-xs font-heading font-bold text-itcg-navy mb-1.5">
              Jabatan / Divisi <span className="text-itcg-red">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-itcg-gray-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-position"
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Marketing Lead / VP Enterprise"
                required
                className="w-full h-12 pl-10 pr-3.5 text-sm bg-itcg-gray-light/60 border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white text-itcg-navy transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="inquiry-email" className="block text-xs font-heading font-bold text-itcg-navy mb-1.5">
              Alamat Email Resmi <span className="text-itcg-red">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-itcg-gray-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="budi@perusahaan.co.id"
                required
                className="w-full h-12 pl-10 pr-3.5 text-sm bg-itcg-gray-light/60 border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white text-itcg-navy transition-all"
              />
            </div>
          </div>

          {/* Phone / WA - 1 Column (Side-by-side with Tier Interest on md+) */}
          <div>
            <label htmlFor="inquiry-phone" className="block text-xs font-heading font-bold text-itcg-navy mb-1.5">
              Nomor WhatsApp / HP Aktif <span className="text-itcg-red">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-itcg-gray-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inquiry-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0812xxxxxxxx"
                required
                className="w-full h-12 pl-10 pr-3.5 text-sm bg-itcg-gray-light/60 border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white text-itcg-navy transition-all"
              />
            </div>
          </div>

          {/* Tier Interest - 1 Column (Side-by-side with Phone on md+) */}
          <div>
            <label htmlFor="inquiry-tierInterest" className="block text-xs font-heading font-bold text-itcg-navy mb-1.5">
              Pilihan Tingkat Kemitraan <span className="text-itcg-red">*</span>
            </label>
            <div className="relative">
              <select
                id="inquiry-tierInterest"
                name="tierInterest"
                value={formData.tierInterest}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-10 text-sm sm:text-base font-heading font-extrabold text-itcg-navy bg-itcg-gray-light/60 border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white transition-all cursor-pointer appearance-none shadow-2xs"
              >
                <option value="PLATINUM">PLATINUM</option>
                <option value="GOLD">GOLD</option>
                <option value="SILVER">SILVER</option>
                <option value="CUSTOM">CUSTOM</option>
              </select>
              <ChevronDown className="w-5 h-5 text-itcg-navy pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-itcg-navy/60 mt-1">
              Pilih tingkat kemitraan resmi atau opsi CUSTOM untuk diskusi paket kemitraan khusus sesuai target brand Anda.
            </p>
          </div>

          {/* Message - Full Width */}
          <div className="md:col-span-2">
            <label htmlFor="inquiry-message" className="block text-xs font-heading font-bold text-itcg-navy mb-1.5">
              Pesan / Kebutuhan Khusus Tambahan
            </label>
            <div className="relative">
              <textarea
                id="inquiry-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Sebutkan jika ada kebutuhan instalasi daya khusus, demo robotik, atau diskusi jadwal presentasi..."
                className="w-full p-3.5 text-sm bg-itcg-gray-light/60 border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white text-itcg-navy transition-all"
              />
            </div>
          </div>

        </div>

        {/* Action Triggers Grid */}
        <div className="pt-5 border-t border-itcg-gray space-y-5">
          
          {/* Action 1: Kirim Email Resmi */}
          <div>
            <a
              href={generateMailto()}
              className="w-full inline-flex items-center justify-center px-6 py-4 text-sm sm:text-base font-heading font-extrabold text-white bg-itcg-navy hover:bg-itcg-blue transition-all rounded-xl shadow-md hover:shadow-lg group"
            >
              <Mail className="w-5 h-5 mr-2.5 text-itcg-blue-light" />
              <span>Kirim Pengajuan via Email (partnership@komitkabe.id)</span>
              <Send className="w-4 h-4 ml-2.5 opacity-80 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-[11px] text-itcg-gray-dark text-center mt-1.5">
              Akan membuka aplikasi email Anda dengan format subjek dan tembusan resmi ke official@komitkabe.id.
            </p>
          </div>

          {/* Action 2: WhatsApp Direct to 3 PICs */}
          <div className="pt-2">
            <div className="text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-3 text-center sm:text-left">
              Or Connect Directly via WhatsApp:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
              {/* Andri Karyadi */}
              <a
                href={generateWaLink('628111112242')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-itcg-gray-light/70 hover:bg-white border border-itcg-gray hover:border-itcg-blue text-itcg-navy p-3.5 sm:p-4 rounded-xl flex items-center space-x-3 transition-all group shadow-2xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-itcg-blue/40"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-heading font-extrabold text-itcg-navy group-hover:text-itcg-blue transition-colors truncate">
                    Andri Karyadi
                  </div>
                  <div className="text-[11px] font-mono text-itcg-navy/70 mt-0.5">
                    0811 1112 242
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-itcg-gray-dark/50 group-hover:text-itcg-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>

              {/* Qaisar Nur Irfansyah */}
              <a
                href={generateWaLink('6282295139177')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-itcg-gray-light/70 hover:bg-white border border-itcg-gray hover:border-itcg-blue text-itcg-navy p-3.5 sm:p-4 rounded-xl flex items-center space-x-3 transition-all group shadow-2xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-itcg-blue/40"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-heading font-extrabold text-itcg-navy group-hover:text-itcg-blue transition-colors truncate">
                    Qaisar Nur Irfansyah
                  </div>
                  <div className="text-[11px] font-mono text-itcg-navy/70 mt-0.5">
                    0822 9513 9177
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-itcg-gray-dark/50 group-hover:text-itcg-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>

              {/* Ketua Panitia Afriyanto */}
              <a
                href={generateWaLink('6281219884085')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-itcg-gray-light/70 hover:bg-white border border-itcg-gray hover:border-itcg-blue text-itcg-navy p-3.5 sm:p-4 rounded-xl flex items-center space-x-3 transition-all group shadow-2xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-itcg-blue/40"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-heading font-extrabold text-itcg-navy group-hover:text-itcg-blue transition-colors truncate">
                    Afriyanto (Ketua)
                  </div>
                  <div className="text-[11px] font-mono text-itcg-navy/70 mt-0.5">
                    0812 1988 4085
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-itcg-gray-dark/50 group-hover:text-itcg-blue group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </a>
            </div>

          </div>

        </div>
      </form>
    </div>
  );
}
