'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Plus, Sparkles, ArrowRight } from 'lucide-react';

export interface SponsorItem {
  id: string;
  companyName: string;
  tier: string;
  status: string;
  category: string;
  logoUrl: string;
  websiteUrl?: string | null;
  shortDescription?: string | null;
  displayOrder: number;
}

export interface SponsorTierItem {
  name: string;
  label: string;
  targetQuota: number;
  confirmedCount: number;
  totalDisplayCount: number;
  sponsors: SponsorItem[];
}

interface SponsorGridProps {
  tiers: SponsorTierItem[];
  showOpenSlots?: boolean;
  showQuotaNumbers?: boolean;
}

export default function SponsorGrid({
  tiers,
  showOpenSlots = true,
  showQuotaNumbers = false,
}: SponsorGridProps) {
  const getTierMeta = (tierName: string) => {
    switch (tierName.toUpperCase()) {
      case 'PLATINUM':
        return {
          type: 'platinum',
          title: 'Platinum Partners',
          badgeClass: 'bg-itcg-navy text-white border border-itcg-navy',
          subLabel: 'Premier Technology Keynote & Executive Stage Partners',
          gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        };
      case 'GOLD':
        return {
          type: 'gold',
          title: 'Gold Partners',
          badgeClass: 'bg-itcg-blue text-white border border-itcg-blue',
          subLabel: 'Exhibition Wings & Technology Innovation Partners',
          gridCols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5',
        };
      case 'SILVER':
      default:
        return {
          type: 'silver',
          title: 'Silver Partners',
          badgeClass: 'bg-itcg-gray-dark text-white border border-itcg-gray-dark',
          subLabel: 'Ecosystem & Enterprise Solution Partners',
          gridCols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4',
        };
    }
  };

  return (
    <div className="space-y-16">
      {tiers.map((tier) => {
        const meta = getTierMeta(tier.name);
        const effectiveQuota = Math.max(tier.targetQuota, tier.confirmedCount);
        const openSlotsCount = showOpenSlots ? Math.max(1, effectiveQuota - tier.confirmedCount) : 0;

        return (
          <div key={tier.name} className="relative">
            
            {/* Tier Header Bar (Clean, no facility/quota leak) */}
            <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-itcg-gray mb-6">
              <div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs font-heading font-extrabold uppercase rounded-md ${meta.badgeClass}`}>
                    {meta.title}
                  </span>
                  {showQuotaNumbers && tier.confirmedCount >= tier.targetQuota && (
                    <span className="inline-flex items-center text-[11px] font-heading font-bold text-itcg-blue bg-itcg-blue-light border border-itcg-blue/30 px-2 py-0.5 rounded">
                      <Sparkles className="w-3 h-3 mr-1 text-itcg-blue" />
                      Flexible Capacity
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-itcg-navy/70 mt-1.5 font-medium max-w-2xl">
                  {meta.subLabel}
                </p>
              </div>

              {/* Status Badge: Clean & Elegant */}
              <div className="mt-4 md:mt-0 flex items-center space-x-2 flex-shrink-0">
                {showQuotaNumbers ? (
                  <>
                    <span className="text-xs font-heading font-semibold text-itcg-gray-dark">
                      Confirmed Slots:
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-itcg-navy text-white">
                      {tier.confirmedCount} / {effectiveQuota} Slots
                    </span>
                  </>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-heading font-semibold bg-itcg-blue-light text-itcg-blue border border-itcg-blue/30 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-itcg-blue mr-2 animate-pulse" />
                    Partnership Open
                  </span>
                )}
              </div>
            </div>

            {/* Tier-Specific Grid Layout */}
            <div className={`grid ${meta.gridCols}`}>
              
              {/* Confirmed Sponsor Cards */}
              {tier.sponsors && tier.sponsors.map((s) => {
                // PLATINUM CARD (3 Columns, Largest format)
                if (meta.type === 'platinum') {
                  return (
                    <div
                      key={s.id}
                      className="bg-white border-2 border-itcg-gray hover:border-itcg-red hover:shadow-2xl rounded-2xl p-6 sm:p-7 transition-all duration-300 ease-smooth flex flex-col justify-between group transform hover:-translate-y-1.5 will-change-transform"
                    >
                      <div>
                        {/* Big Logo Container */}
                        <div className="w-full h-32 sm:h-36 bg-itcg-gray-light border border-itcg-gray/60 rounded-xl flex items-center justify-center p-4 mb-5 group-hover:bg-itcg-red-subtle/40 group-hover:border-itcg-red/20 transition-colors duration-200">
                          <img
                            src={s.logoUrl}
                            alt={s.companyName}
                            className="max-h-20 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-sm font-heading font-extrabold text-itcg-navy text-center px-3">${s.companyName}</span>`;
                              }
                            }}
                          />
                        </div>

                        {/* Company Name */}
                        <h4 className="text-lg sm:text-xl font-heading font-black text-itcg-navy group-hover:text-itcg-red transition-colors tracking-tight">
                          {s.companyName}
                        </h4>

                        {/* Industry Category */}
                        <div className="mt-1.5">
                          <span className="inline-block text-xs font-heading font-semibold text-itcg-navy bg-itcg-gray/70 px-2.5 py-0.5 rounded">
                            {s.category}
                          </span>
                        </div>

                        {/* Description */}
                        {s.shortDescription && (
                          <p className="text-xs sm:text-sm text-itcg-navy/70 mt-3 line-clamp-3 leading-relaxed">
                            {s.shortDescription}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-5 pt-4 border-t border-itcg-gray/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-heading font-bold text-itcg-navy bg-itcg-blue-light border border-itcg-blue/30 px-2.5 py-0.5 rounded uppercase tracking-wide">
                          PLATINUM CONFIRMED
                        </span>

                        {s.websiteUrl && (
                          <a
                            href={s.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-itcg-blue hover:text-itcg-navy font-bold text-xs transition-colors"
                          >
                            <span>Website</span>
                            <ExternalLink className="ml-1 w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }

                // GOLD CARD (4 Columns, Medium format)
                if (meta.type === 'gold') {
                  return (
                    <div
                      key={s.id}
                      className="bg-white border-2 border-itcg-gray hover:border-itcg-blue hover:shadow-xl rounded-xl p-5 transition-all duration-300 ease-smooth flex flex-col justify-between group transform hover:-translate-y-1 will-change-transform"
                    >
                      <div>
                        {/* Logo Container */}
                        <div className="w-full h-24 bg-itcg-gray-light border border-itcg-gray/60 rounded-lg flex items-center justify-center p-3 mb-4 group-hover:bg-itcg-blue-light/50 group-hover:border-itcg-blue/30 transition-colors duration-200">
                          <img
                            src={s.logoUrl}
                            alt={s.companyName}
                            className="max-h-14 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-heading font-bold text-itcg-navy text-center px-2">${s.companyName}</span>`;
                              }
                            }}
                          />
                        </div>

                        {/* Company Name */}
                        <h4 className="text-base font-heading font-extrabold text-itcg-navy group-hover:text-itcg-blue transition-colors">
                          {s.companyName}
                        </h4>

                        {/* Industry Category */}
                        <div className="mt-1">
                          <span className="inline-block text-[11px] font-heading font-semibold text-itcg-navy bg-itcg-gray/70 px-2 py-0.5 rounded">
                            {s.category}
                          </span>
                        </div>

                        {/* Description */}
                        {s.shortDescription && (
                          <p className="text-xs text-itcg-navy/70 mt-2.5 line-clamp-2 leading-relaxed">
                            {s.shortDescription}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-4 pt-3 border-t border-itcg-gray/60 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-heading font-bold text-itcg-blue bg-itcg-blue-light border border-itcg-blue/30 px-2 py-0.5 rounded uppercase">
                          GOLD CONFIRMED
                        </span>

                        {s.websiteUrl && (
                          <a
                            href={s.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-itcg-blue hover:text-itcg-navy font-semibold text-xs transition-colors"
                          >
                            <span>Website</span>
                            <ExternalLink className="ml-1 w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }

                // SILVER CARD (6 Columns, Compact format)
                return (
                  <div
                    key={s.id}
                    className="bg-white border border-itcg-gray hover:border-itcg-gray-dark hover:shadow-md rounded-lg p-3.5 sm:p-4 transition-all duration-200 ease-smooth flex flex-col justify-between group transform hover:-translate-y-0.5 text-center will-change-transform"
                  >
                    <div>
                      {/* Compact Logo Container */}
                      <div className="w-full h-16 sm:h-20 bg-itcg-gray-light border border-itcg-gray/60 rounded-md flex items-center justify-center p-2 mb-2.5 group-hover:bg-itcg-gray/50 transition-colors">
                        <img
                          src={s.logoUrl}
                          alt={s.companyName}
                          className="max-h-9 sm:max-h-11 max-w-[85%] object-contain transition-transform duration-200 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-[11px] font-heading font-bold text-itcg-navy text-center px-1">${s.companyName}</span>`;
                            }
                          }}
                        />
                      </div>

                      {/* Company Name */}
                      <h4 className="text-xs sm:text-sm font-heading font-bold text-itcg-navy group-hover:text-itcg-blue transition-colors line-clamp-1">
                        {s.companyName}
                      </h4>

                      {/* Industry Category */}
                      <div className="mt-1">
                        <span className="inline-block text-[10px] font-heading font-semibold text-itcg-navy/80 bg-itcg-gray/70 px-1.5 py-0.5 rounded line-clamp-1">
                          {s.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-2.5 pt-2 border-t border-itcg-gray/60 flex items-center justify-between text-[10px]">
                      <span className="font-heading font-bold text-itcg-navy bg-itcg-gray/60 border border-itcg-gray px-1.5 py-0.5 rounded">
                        CONFIRMED
                      </span>

                      {s.websiteUrl ? (
                        <a
                          href={s.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-itcg-gray-dark hover:text-itcg-blue"
                          title="Website"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-itcg-gray-dark font-heading font-bold">PARTNER</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Open Slot Placeholder Cards */}
              {showOpenSlots && Array.from({ length: Math.min(openSlotsCount, meta.type === 'platinum' ? 1 : meta.type === 'gold' ? 2 : 2) }).map((_, idx) => {
                if (meta.type === 'platinum') {
                  return (
                    <Link
                      key={`open-${tier.name}-${idx}`}
                      href="#partnership-inquiry"
                      data-tier="PLATINUM"
                      className="select-tier-btn border-2 border-dashed border-itcg-red/40 hover:border-itcg-red bg-itcg-red-subtle/30 hover:bg-itcg-red-subtle/60 rounded-2xl p-6 sm:p-7 transition-all duration-300 ease-smooth flex flex-col justify-between text-center group cursor-pointer transform hover:-translate-y-1.5 hover:shadow-xl will-change-transform"
                    >
                      <div className="py-4">
                        <div className="w-14 h-14 mx-auto rounded-full bg-itcg-red-subtle flex items-center justify-center text-itcg-red group-hover:scale-110 transition-transform duration-300 ease-smooth mb-4">
                          <Plus className="w-7 h-7 stroke-[2.5]" />
                        </div>
                        
                        <div className="text-xs font-heading font-extrabold text-itcg-red tracking-wider uppercase">
                          + YOUR LOGO HERE
                        </div>
                        
                        <div className="text-base sm:text-lg font-heading font-extrabold text-itcg-navy mt-1.5">
                          Platinum Sponsorship Available
                        </div>

                        <p className="text-xs text-itcg-navy/70 mt-2 max-w-[240px] mx-auto leading-relaxed">
                          Panggung presentasi eksklusif dan eksposur brand utama di hadapan 300+ praktisi serta pimpinan IT kawasan industri Karawang, Bekasi, dan Purwakarta.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-itcg-red/20 flex items-center justify-center space-x-1.5 text-xs font-heading font-extrabold text-itcg-red group-hover:underline">
                        <span>Explore Package</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-smooth" />
                      </div>
                    </Link>
                  );
                }

                if (meta.type === 'gold') {
                  return (
                    <Link
                      key={`open-${tier.name}-${idx}`}
                      href="#partnership-inquiry"
                      data-tier="GOLD"
                      className="select-tier-btn border-2 border-dashed border-itcg-blue/30 hover:border-itcg-blue bg-itcg-blue-light/30 hover:bg-itcg-blue-light/60 rounded-xl p-5 transition-all duration-300 ease-smooth flex flex-col justify-between text-center group cursor-pointer transform hover:-translate-y-1 hover:shadow-md will-change-transform"
                    >
                      <div className="py-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-itcg-blue-light flex items-center justify-center text-itcg-blue group-hover:scale-110 transition-transform duration-300 ease-smooth mb-3">
                          <Plus className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        
                        <div className="text-xs font-heading font-extrabold text-itcg-blue tracking-wider uppercase">
                          + YOUR LOGO HERE
                        </div>
                        
                        <div className="text-sm font-heading font-extrabold text-itcg-navy mt-1">
                          Gold Slot Available
                        </div>

                        <p className="text-[11px] text-itcg-navy/70 mt-1 max-w-[200px] mx-auto leading-relaxed">
                          Terbuka untuk Mitra Industri &amp; Solusi Enterprise
                        </p>
                      </div>

                      <div className="pt-3 border-t border-itcg-blue/20 flex items-center justify-center space-x-1 text-xs font-heading font-bold text-itcg-blue group-hover:underline">
                        <span>Explore Package</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 ease-smooth" />
                      </div>
                    </Link>
                  );
                }

                // Silver Open Slot
                return (
                  <Link
                    key={`open-${tier.name}-${idx}`}
                    href="#partnership-inquiry"
                    data-tier="SILVER"
                    className="select-tier-btn border-2 border-dashed border-itcg-gray hover:border-itcg-blue bg-itcg-gray-light hover:bg-itcg-blue-light/30 rounded-lg p-3.5 sm:p-4 transition-all duration-200 ease-smooth flex flex-col justify-between text-center group cursor-pointer transform hover:-translate-y-0.5 will-change-transform"
                  >
                    <div className="py-2">
                      <div className="w-8 h-8 mx-auto rounded-full bg-itcg-gray group-hover:bg-itcg-blue-light flex items-center justify-center text-itcg-gray-dark group-hover:text-itcg-blue transition-colors mb-2">
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      
                      <div className="text-[10px] font-heading font-extrabold text-itcg-blue tracking-wider uppercase">
                        + YOUR LOGO
                      </div>
                      
                      <div className="text-xs font-heading font-bold text-itcg-navy mt-1 line-clamp-1">
                        Silver Available
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-itcg-gray flex items-center justify-center text-[10px] font-heading font-bold text-itcg-blue group-hover:underline">
                      <span>Explore Package</span>
                    </div>
                  </Link>
                );
              })}

            </div>

          </div>
        );
      })}
    </div>
  );
}
