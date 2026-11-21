'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Siapa saja yang dapat mengikuti 6th IT Community Gathering 2027?',
    answer:
      'ITCG 2027 terbuka bagi para praktisi teknologi, insinyur (IT & OT/SCADA), arsitek cloud, analis keamanan siber, akademisi, serta pimpinan dan penentu kebijakan TI (CIO, VP Technology, IT Manager, Head of Infrastructure) lintas kawasan industri Karawang, Bekasi, Purwakarta, dan sekitarnya.',
  },
  {
    question: 'Kapan dan di mana acara ITCG 2027 diselenggarakan?',
    answer:
      'Acara diselenggarakan selama 2 hari penuh pada Sabtu dan Minggu, 16-17 Januari 2027 bertempat di Grand Ballroom Sutan Raja Hotel and Convention Centre, Soreang, Kabupaten Bandung.',
  },
  {
    question: 'Bagaimana cara perusahaan mengajukan paket Sponsorship atau Booth Exhibition?',
    answer:
      'Perusahaan penyedia teknologi dapat melihat ketersediaan slot kuota dan simulasi penempatan logo secara interaktif pada menu Sponsorship di halaman /sponsors, atau mengirimkan inquiry kemitraan langsung ke email partnership@komitkabe.id.',
  },
  {
    question: 'Bagaimana cara mendapatkan informasi terbaru terkait pembicara dan jadwal sesi?',
    answer:
      'Jadwal lengkap dan susunan sesi dapat dipantau langsung pada tab Event Schedule di portal ini. Peserta yang telah mendaftar juga akan menerima pembaruan berkala melalui email dan grup koordinasi resmi panitia.',
  },
];

export default function ContactFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E6E9F2] p-6 sm:p-8 shadow-xs">
      <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
        <span>Frequently Asked Questions</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2B6B] tracking-tight leading-tight">
        Pertanyaan Umum Seputar ITCG 2027
      </h3>
      <p className="text-xs sm:text-sm text-itcg-navy/70 mt-1 mb-6">
        Informasi cepat mengenai kepesertaan, lokasi, kemitraan, dan agenda acara.
      </p>

      <div className="divide-y divide-[#E6E9F2]">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left group focus:outline-none"
              >
                <span className="text-sm sm:text-base font-heading font-bold text-itcg-navy group-hover:text-[#0066E0] transition-colors pr-4">
                  {faq.question}
                </span>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#0066E0] text-white rotate-180' : 'bg-[#F5F7FA] text-itcg-navy/70'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              {isOpen && (
                <div className="mt-3 text-xs sm:text-sm text-itcg-navy/80 leading-relaxed font-normal pr-8">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
