'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Clock, Calendar, ArrowRight, Copy, Check, Sparkles, Building2 } from 'lucide-react';

export default function ContactInfoCards() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Official Secretariat Contacts Card */}
      <div className="rounded-2xl bg-white border border-[#E6E9F2] p-6 sm:p-8 shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
          <span>Informasi Sekretariat Resmi</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2B6B] tracking-tight leading-tight">
          Sekretariat KOMITKABE
        </h3>
        <p className="text-xs sm:text-sm text-itcg-navy/70 mt-1 mb-6">
          Kanal komunikasi resmi panitia penyelenggara 6th IT Community Gathering 2027.
        </p>

        <div className="space-y-5 text-xs sm:text-sm">
          {/* Email Sekretariat Umum */}
          <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E6E9F2] flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-heading font-bold text-itcg-navy/60 uppercase tracking-wider block">
                Email Sekretariat Umum
              </span>
              <a
                href="mailto:official@komitkabe.id"
                className="font-heading font-extrabold text-[#0D2B6B] hover:text-[#0066E0] text-sm break-all transition-colors"
              >
                official@komitkabe.id
              </a>
              <span className="text-[11px] text-itcg-navy/60 block">
                Informasi peserta, jadwal, dan administrasi umum.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('official@komitkabe.id', 'official')}
              className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all flex-shrink-0 ${
                copiedKey === 'official'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-itcg-navy border border-[#E6E9F2] hover:bg-slate-100'
              }`}
              title="Salin alamat email"
            >
              {copiedKey === 'official' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Email Kemitraan & Sponsor */}
          <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E6E9F2] flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-heading font-bold text-itcg-navy/60 uppercase tracking-wider block">
                Email Kemitraan &amp; Sponsor
              </span>
              <a
                href="mailto:partnership@komitkabe.id"
                className="font-heading font-extrabold text-[#0D2B6B] hover:text-[#0066E0] text-sm break-all transition-colors"
              >
                partnership@komitkabe.id
              </a>
              <span className="text-[11px] text-itcg-navy/60 block">
                Sponsorship Platinum/Gold/Silver &amp; Exhibition Booth.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('partnership@komitkabe.id', 'partnership')}
              className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all flex-shrink-0 ${
                copiedKey === 'partnership'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-itcg-navy border border-[#E6E9F2] hover:bg-slate-100'
              }`}
              title="Salin alamat email"
            >
              {copiedKey === 'partnership' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Lokasi Acara */}
          <div className="flex items-start space-x-3 pt-1">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[#0066E0]" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-heading font-bold text-itcg-navy block">
                Lokasi Acara
              </span>
              <span className="text-xs text-itcg-navy/80 block font-medium">
                Sutan Raja Hotel and Convention Centre
              </span>
              <span className="text-[11px] text-itcg-navy/60 block">
                Jl. Raya Soreang KM.17 No.10, Soreang, Kabupaten Bandung
              </span>
            </div>
          </div>

          {/* Waktu & Jadwal */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar className="w-4 h-4 text-[#E3062E]" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-heading font-bold text-itcg-navy block">
                Waktu Pelaksanaan
              </span>
              <span className="text-xs text-itcg-navy/80 block font-medium">
                16-17 Januari 2027 (Sabtu - Minggu)
              </span>
              <span className="text-[11px] text-itcg-navy/60 block">
                08.30 - 18.00 WIB
              </span>
            </div>
          </div>

          {/* Jam Layanan */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-itcg-navy" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-heading font-bold text-itcg-navy block">
                Jam Layanan Sekretariat
              </span>
              <span className="text-xs text-itcg-navy/80 block font-medium">
                Senin - Jumat, 09.00 - 17.00 WIB
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Kartu Arahkan Jalur Khusus (Sponsorship & Exhibition) */}
      <div className="rounded-2xl bg-[#F5F7FA] border border-[#E6E9F2] p-6 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#E3062E]/10 text-[#E3062E] border border-[#E3062E]/15">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E3062E] shrink-0" />
          <span>Pengajuan Sponsorship &amp; Exhibition</span>
        </div>
        <h4 className="text-base sm:text-lg font-heading font-black text-[#0D2B6B] leading-tight">
          Ingin Bermitra sebagai Sponsor Teknologi?
        </h4>
        <p className="text-xs sm:text-sm text-itcg-navy/75 leading-relaxed">
          Untuk pemesanan paket sponsor (Platinum, Gold, Silver), rincian kuota slot booth, dan simulasi penempatan logo secara interaktif, silakan langsung menuju portal sponsorship kami.
        </p>
        <div className="pt-1">
          <Link
            href="/sponsors"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-heading font-extrabold text-[#0066E0] hover:text-[#0052B4] group transition-colors"
          >
            <span>Ke Halaman Sponsorship</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
