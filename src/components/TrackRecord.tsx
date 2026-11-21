'use client';

import React from 'react';
import { History, Milestone, Sparkles, CheckCircle } from 'lucide-react';

const historyMilestones = [
  {
    edition: 'ITCG 1',
    year: '2017',
    theme: 'THINK Safe, WORK Safe, KEEP Safe, and FEEL Safe, in the age of TECHNOLOGY',
    venue: 'Harper Purwakarta',
    participants: '80+ IT Practitioners',
    description: 'Membangun kesadaran menyeluruh di kalangan praktisi IT kawasan industri bahwa adopsi teknologi harus berjalan seiring dengan budaya keselamatan dan keamanan. Mulai dari pola pikir preventif, praktik kerja aman, hingga perlindungan infrastruktur agar setiap tim dapat berinovasi dengan rasa aman.',
    active: false,
  },
  {
    edition: 'ITCG 2',
    year: '2019',
    theme: 'THE ROLE OF IT IN THE ERA OF DIGITAL BUSINESS TRANSFORMATION',
    venue: 'Grand Mulya Bogor',
    participants: '150+ IT Practitioners',
    description: 'Menggeser paradigma divisi IT dari sekadar fungsi pendukung teknis menjadi penggerak utama transformasi bisnis digital. Membahas strategi modernisasi proses operasional, efisiensi alur kerja, serta kesiapan talenta teknologi dalam menjawab tuntutan daya saing perusahaan modern.',
    active: false,
  },
  {
    edition: 'ITCG 3',
    year: '2021',
    theme: 'Industry 4.0: Opportunity or Threat?',
    venue: 'Camp Hulu Cai',
    participants: '200+ IT Practitioners',
    description: 'Membedah dua sisi gelombang Revolusi Industri 4.0 bagi ekosistem IT lintas perusahaan. Mengupas langkah strategis mengubah disrupsi otomasi, konektivitas data, dan risiko keamanan siber menjadi peluang efisiensi operasional serta keunggulan kompetitif jangka panjang.',
    active: false,
  },
  {
    edition: 'ITCG 4',
    year: '2023',
    theme: 'SYNERGY: UNLEASHING THE POWER OF COLLABORATION',
    venue: 'Prime Plaza Hotel Purwakarta',
    participants: '250+ IT Practitioners',
    description: 'Menyatukan kekuatan lintas perusahaan, praktisi IT, dan prinsipal teknologi untuk meruntuhkan sekat kerja yang terisolasi. Melalui pertukaran pengalaman nyata dan sinergi ekosistem, setiap organisasi mampu mempercepat inovasi, ketangguhan infrastruktur, serta pemecahan masalah bersama.',
    active: false,
  },
  {
    edition: 'ITCG 5',
    year: '2025',
    theme: 'Connect, Collaborate, Elevate',
    venue: 'Albero Hotel Bogor',
    participants: '280+ IT Practitioners',
    description: 'Mempertemukan ratusan praktisi dan pimpinan IT dalam satu ekosistem solid untuk saling terhubung, berkolaborasi merumuskan solusi atas tantangan teknologi terkini, serta mengangkat standar kepemimpinan dan kapabilitas IT kawasan industri ke level yang lebih tinggi.',
    active: false,
  },
  {
    edition: 'ITCG 6',
    year: '2027',
    theme: 'INTELLIGENCE IN MOTION: Driving Smart Industry. Securing the Future.',
    venue: 'Sutan Raja Hotel and Convention Centre, Soreang, Bandung',
    participants: '300+ IT Leaders & Practitioners',
    description: 'Akselerasi penerapan Artificial Intelligence, integrasi Industrial IoT, serta penguatan Zero-Trust Cybersecurity untuk mendorong transformasi industri cerdas dan ketahanan sistem jangka panjang.',
    active: true,
  },
];

export default function TrackRecord() {
  return (
    <section className="py-16 sm:py-24 bg-itcg-gray-light/60 border-t border-b border-itcg-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
            <span>Gathering Milestones Since 2017</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
            The Evolution of IT Community Gathering Leading to ITCG 2027
          </h2>
          <p className="text-sm sm:text-base text-itcg-navy/70 mt-2">
            Satu dekade memperkuat sinergi dan transformasi digital para pimpinan IT di kawasan industri manufaktur terbesar Indonesia.
          </p>
        </div>

        {/* Timeline Grid (6 Editions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historyMilestones.map((item, index) => {
            return (
              <div
                key={index}
                className={`p-5 sm:p-6 rounded-2xl relative border transition-all duration-300 ease-out transform hover:-translate-y-1 flex flex-col justify-between ${
                  item.active
                    ? 'bg-itcg-navy text-white border-itcg-red shadow-xl ring-2 ring-itcg-red/30'
                    : 'bg-white text-itcg-navy border-[#E6E9F2] hover:border-itcg-blue/60 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Edition & Year Header */}
                  <div
                    className={`flex items-center justify-between pb-3 border-b ${
                      item.active ? 'border-white/20' : 'border-[#E6E9F2]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-heading font-extrabold px-2.5 py-1 rounded-md ${
                          item.active
                            ? 'bg-itcg-red text-white'
                            : 'bg-itcg-blue text-white'
                        }`}
                      >
                        {item.edition}
                      </span>
                      <span className="text-xs font-mono font-bold opacity-80">
                        Year {item.year}
                      </span>
                    </div>

                    {item.active && (
                      <span className="flex items-center text-[10px] font-heading font-extrabold text-white bg-itcg-red/80 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Current Edition
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-base sm:text-lg font-heading font-extrabold mt-3.5 leading-snug ${
                      item.active ? 'text-white' : 'text-itcg-navy'
                    }`}
                  >
                    {item.theme}
                  </h3>

                  <p
                    className={`text-xs mt-2.5 leading-relaxed ${
                      item.active ? 'text-itcg-gray' : 'text-itcg-navy/75'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Card Meta Footer */}
                <div
                  className={`mt-5 pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] ${
                    item.active ? 'border-white/10 text-white/90' : 'border-itcg-gray text-itcg-navy/80'
                  }`}
                >
                  <span className="font-semibold">{item.venue}</span>
                  <span className="font-semibold text-left sm:text-right opacity-80">{item.participants}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
