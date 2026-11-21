'use client';

import React from 'react';
import { Cpu, Network, ShieldCheck, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    id: 'ai',
    number: '01',
    title: 'Accelerate Intelligence',
    subtitle: 'Artificial Intelligence & Data Ops',
    color: '#0066E0',
    borderColor: 'border-itcg-blue',
    icon: Cpu,
    description: 'Transformasi data operasional pabrik menjadi insight prediktif real-time. Membahas implementasi Computer Vision untuk quality control, Machine Learning predictive maintenance, dan otomasi workflow industri modern.',
    highlights: [
      'Industrial Computer Vision & AOI',
      'Predictive Maintenance & Anomaly Detection',
      'Shopfloor Autonomous Decision Support',
      'Data Lakehouse & Manufacturing Intelligence',
    ],
  },
  {
    id: 'iot',
    number: '02',
    title: 'Integrate Industrial Technology',
    subtitle: 'Industrial IT & IoT Convergence',
    color: '#0D2B6B',
    borderColor: 'border-itcg-navy',
    icon: Network,
    description: 'Menjembatani batas antara Information Technology (IT) dan Operational Technology (OT). Mengintegrasikan sensor IoT, protokol SCADA/PLC, sistem MES, dan cloud platform untuk mewujudkan pabrik cerdas mandiri.',
    highlights: [
      'IT/OT Bridge & SCADA/PLC Integration',
      'Industrial IoT Gateways & Edge Computing',
      'Smart Warehouse & AGV Fleet Coordination',
      'Energy Management & ESG Automated Tracking',
    ],
  },
  {
    id: 'cyber',
    number: '03',
    title: 'Strengthen Cyber Resilience',
    subtitle: 'Industrial Cybersecurity & OT Defense',
    color: '#E3062E',
    borderColor: 'border-itcg-red',
    icon: ShieldCheck,
    description: 'Memperkuat ketahanan infrastruktur industri kritis dari ancaman siber dan ransomware. Pendekatan zero-trust, segmentasi jaringan berbasis IEC 62443, serta Managed SOC 24/7 untuk menjaga kontinuitas manufaktur.',
    highlights: [
      'Zero-Trust Architecture for IT & OT Systems',
      'Purdue Model & IEC 62443 Network Segmentation',
      'Ransomware Defense & Rapid Disaster Recovery',
      'Managed Industrial SOC & Threat Hunting',
    ],
  },
];

const connectValues = [
  { letter: 'C', word: 'Collaboration', desc: 'Sinergi antarpraktisi lintas pabrik dan disiplin' },
  { letter: 'O', word: 'Ownership', desc: 'Tanggung jawab penuh menjaga standar keandalan IT' },
  { letter: 'N', word: 'Networking', desc: 'Membangun relasi profesional yang saling memberdayakan' },
  { letter: 'N', word: 'Noble Impact', desc: 'Memberi dampak positif bagi efisiensi industri nasional' },
  { letter: 'E', word: 'Excellence', desc: 'Menghadirkan standar implementasi teknologi terbaik' },
  { letter: 'C', word: 'Continuous Learning', desc: 'Adaptasi aktif terhadap gelombang disrupsi digital' },
  { letter: 'T', word: 'Trust', desc: 'Integritas dan transparansi dalam setiap kerja sama' },
];

export default function CommunityPillars() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white relative scroll-mt-16">
      <span id="tentang" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
            <span>About KOMITKABE &amp; ITCG Foundation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
            KOMITKABE: Industrial IT Leadership &amp; Collaboration Since 2006
          </h2>
          <p className="text-base sm:text-lg text-itcg-navy/70 mt-3 leading-relaxed">
            Berawal dari forum temu muka manajer dan engineer IT sejak tahun 2006, KOMITKABE telah bertransformasi menjadi ekosistem profesional terdepan yang mempersatukan ratusan pemimpin teknologi enterprise di koridor industri Karawang, Bekasi, dan Purwakarta.
          </p>
        </div>

        {/* Narrative Banner & Real Photo with Clean Architectural Styling */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F5F7FA] p-6 sm:p-10 rounded-2xl border border-[#E6E9F2] relative overflow-hidden">
          <div className="lg:col-span-7 space-y-5 relative z-10">
            <h3 className="text-2xl font-heading font-extrabold text-itcg-navy">
              The Philosophy of <span className="text-itcg-red">C.O.N.N.E.C.T</span>
            </h3>
            <p className="text-sm sm:text-base text-itcg-navy/80 leading-relaxed">
              Selama hampir dua dekade, KOMITKABE menjadi ruang kolaborasi strategis para pimpinan IT lintas industri manufaktur. Berlandaskan nilai CONNECT, kami menghubungkan para praktisi untuk saling berbagi wawasan, menguji solusi teknologi, dan mempercepat efisiensi operasional pabrik.
            </p>

            {/* CONNECT acronym grid (Clean uniform rounded cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {connectValues.map((val, i) => (
                <div key={i} className="bg-white p-3.5 rounded-xl border border-[#E6E9F2] shadow-xs hover:border-itcg-blue/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-itcg-navy text-white text-xs font-heading font-extrabold flex items-center justify-center flex-shrink-0">
                      {val.letter}
                    </span>
                    <span className="text-xs font-heading font-bold text-itcg-navy">
                      {val.word}
                    </span>
                  </div>
                  <p className="text-[11px] text-itcg-gray-dark mt-1.5 leading-snug">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Authentic Past Event Photo */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-[#E6E9F2] shadow-md">
              <img
                src="/images/gathering-2024-2025.jpg"
                alt="Dokumentasi IT Community Gathering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-itcg-navy/90 via-itcg-navy/20 to-transparent flex items-end p-5">
                <div className="text-white">
                  <div className="text-xs font-heading font-bold text-itcg-blue-light">
                    Community Heritage
                  </div>
                  <div className="text-sm sm:text-base font-heading font-bold mt-0.5">
                    IT Community Gathering Across Generations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Drivers Pillar Cards */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#E3062E]/10 text-[#E3062E] border border-[#E3062E]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3062E] shrink-0" />
              <span>3 Strategic Themes of ITCG 2027</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-itcg-navy leading-tight">
              Core Drivers of Smart Industrial Transformation
            </h3>
            <p className="text-sm text-itcg-navy/70 mt-2">
              Keynote panggung utama, pameran teknologi terdepan, serta dialog eksekutif dikurasi secara terarah pada tiga pilar strategis ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white border border-[#E6E9F2] hover:border-itcg-blue shadow-sm hover:shadow-xl rounded-2xl p-7 relative transition-all duration-300 ease-smooth flex flex-col justify-between group transform hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header: Icon & Number */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#E6E9F2]">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-heading font-black text-itcg-gray-dark/40 group-hover:text-itcg-navy/60 transition-colors">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Titles */}
                    <h4 className="text-xl font-heading font-extrabold text-itcg-navy mt-4 group-hover:text-itcg-blue transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs font-heading font-semibold text-itcg-gray-dark mt-1">
                      {pillar.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-itcg-navy/75 mt-3.5 leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="mt-6 space-y-2.5 pt-5 border-t border-itcg-gray">
                      {pillar.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-itcg-navy/85">
                          <CheckCircle2 className="w-4 h-4 text-itcg-blue flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-4 border-t border-itcg-gray flex items-center justify-between text-xs font-heading font-medium text-itcg-gray-dark">
                    <span>ITCG Core Pillar</span>
                    <span className="font-bold text-itcg-navy">Sutan Raja Ballroom, Soreang</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
