'use client';

import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Sparkles, Building } from 'lucide-react';
import { ScheduleSessionItem, fallbackScheduleSessions } from '@/lib/data';

interface InteractiveRundownProps {
  initialSessions?: ScheduleSessionItem[];
}

function getCategoryBadge(category: string) {
  switch (category) {
    case 'OPENING':
      return { label: 'Opening', color: 'bg-itcg-navy text-white' };
    case 'KEYNOTE_SPEECH':
      return { label: 'Keynote Speech', color: 'bg-itcg-red text-white' };
    case 'PLATINUM_KEYNOTE':
    case 'PLATINUM PARTNER':
    case 'PLATINUM':
      return { label: 'Platinum Tech Keynote', color: 'bg-itcg-blue text-white' };
    case 'NETWORKING':
      return { label: 'Networking & ISOMA', color: 'bg-itcg-navy-light text-white' };
    case 'EXHIBITION':
      return { label: 'Exhibition Showcase', color: 'bg-itcg-blue text-white' };
    case 'EXECUTIVE_PANEL':
    case 'PANEL DISCUSSION':
      return { label: 'Executive Panel', color: 'bg-itcg-navy-light text-white border border-itcg-blue' };
    case 'CLOSING':
      return { label: 'Closing Ceremony', color: 'bg-itcg-red text-white' };
    default:
      return { label: category.replace('_', ' '), color: 'bg-itcg-navy text-white' };
  }
}

export default function InteractiveRundown({ initialSessions }: InteractiveRundownProps) {
  const [sessions, setSessions] = useState<ScheduleSessionItem[]>(
    initialSessions && initialSessions.length > 0 ? initialSessions : fallbackScheduleSessions
  );
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'morning' | 'afternoon' | 'closing'>('all');
  const [activeSessionId, setActiveSessionId] = useState<string>('');

  // Revalidate from API on mount
  useEffect(() => {
    let isMounted = true;
    fetch('/api/schedule', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setSessions(data);
        }
      })
      .catch((err) => {
        console.warn('InteractiveRundown revalidation notice:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredItems = filterPeriod === 'all'
    ? sessions
    : sessions.filter((item) => item.period === filterPeriod);

  // Set default active session to first keynote or first session
  const currentActiveId = activeSessionId || (filteredItems[1]?.id || filteredItems[0]?.id || '');

  return (
    <section id="schedule" className="py-20 sm:py-24 bg-white relative border-t border-itcg-gray scroll-mt-16">
      <span id="agenda" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
              <span>Event Schedule</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
              Conference Schedule &amp; Technical Program
            </h2>
            <p className="text-sm sm:text-base text-itcg-navy/70 mt-2 max-w-2xl">
              Agenda terstruktur yang memadukan keynote eksekutif, presentasi teknologi mendalam, demo pameran interaktif, serta networking antarpraktisi industri.
            </p>
          </div>

          {/* Time Filter Pill Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-1.5 bg-white p-1.5 rounded-xl border border-itcg-gray shadow-xs">
            <button
              onClick={() => setFilterPeriod('all')}
              className={`px-3.5 py-2 text-xs font-heading font-bold rounded-lg transition-all duration-300 ease-smooth ${
                filterPeriod === 'all'
                  ? 'bg-itcg-navy text-white shadow-sm'
                  : 'text-itcg-navy/70 hover:text-itcg-navy hover:bg-itcg-gray-light'
              }`}
            >
              All Sessions ({sessions.length})
            </button>
            <button
              onClick={() => setFilterPeriod('morning')}
              className={`px-3.5 py-2 text-xs font-heading font-bold rounded-lg transition-all duration-300 ease-smooth ${
                filterPeriod === 'morning'
                  ? 'bg-itcg-navy text-white shadow-sm'
                  : 'text-itcg-navy/70 hover:text-itcg-navy hover:bg-itcg-gray-light'
              }`}
            >
              Morning (08:30 - 11:30)
            </button>
            <button
              onClick={() => setFilterPeriod('afternoon')}
              className={`px-3.5 py-2 text-xs font-heading font-bold rounded-lg transition-all duration-300 ease-smooth ${
                filterPeriod === 'afternoon'
                  ? 'bg-itcg-navy text-white shadow-sm'
                  : 'text-itcg-navy/70 hover:text-itcg-navy hover:bg-itcg-gray-light'
              }`}
            >
              Afternoon (11:30 - 17:00)
            </button>
            <button
              onClick={() => setFilterPeriod('closing')}
              className={`px-3.5 py-2 text-xs font-heading font-bold rounded-lg transition-all duration-300 ease-smooth ${
                filterPeriod === 'closing'
                  ? 'bg-itcg-navy text-white shadow-sm'
                  : 'text-itcg-navy/70 hover:text-itcg-navy hover:bg-itcg-gray-light'
              }`}
            >
              Closing (17:00 - 18:00)
            </button>
          </div>
        </div>

        {/* Timeline Schedule Cards */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isSelected = currentActiveId === item.id;
            const categoryMeta = getCategoryBadge(item.category);
            const isPlatinum = item.category === 'PLATINUM_KEYNOTE' || item.category === 'PLATINUM PARTNER' || item.category === 'PLATINUM';
            const isTba = isPlatinum && item.status === 'TBA';

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => setActiveSessionId(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveSessionId(item.id);
                  }
                }}
                className={`cursor-pointer bg-white border-2 transition-all duration-300 ease-smooth rounded-xl p-5 sm:p-6 relative transform hover:-translate-y-0.5 will-change-transform focus:outline-none focus:ring-2 focus:ring-itcg-blue/40 ${
                  isSelected
                    ? 'border-itcg-blue shadow-xl ring-2 ring-itcg-blue/20'
                    : isPlatinum && isTba
                    ? 'border-itcg-blue/30 hover:border-itcg-blue/60 shadow-xs hover:shadow-md bg-itcg-blue-light/10'
                    : 'border-itcg-gray hover:border-itcg-gray-dark/50 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  
                  {/* Time Badge */}
                  <div className="md:col-span-3">
                    <div className="inline-flex items-center space-x-1.5 bg-itcg-navy text-white px-3 py-1.5 text-xs font-mono font-bold rounded-md">
                      <Clock className="w-3.5 h-3.5 text-itcg-blue-light" />
                      <span>{item.timeSlot}</span>
                    </div>
                    {item.stage && (
                      <div className="text-xs font-medium text-itcg-gray-dark mt-2 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-itcg-blue flex-shrink-0" />
                        <span>{item.stage}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="md:col-span-6 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-heading font-extrabold px-2 py-0.5 rounded-md ${categoryMeta.color}`}>
                        {categoryMeta.label}
                      </span>

                      {/* Professional subtle TBA Badge for Platinum slot */}
                      {isTba && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-heading font-extrabold uppercase px-2 py-0.5 rounded-md bg-itcg-blue-light text-itcg-blue border border-itcg-blue/30">
                          <Sparkles className="w-3 h-3 text-itcg-blue" />
                          <span>Topic TBA</span>
                        </span>
                      )}

                      {/* Confirmed Company Name if present */}
                      {item.companyName && !isTba && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-heading font-bold text-itcg-navy bg-itcg-gray-light px-2 py-0.5 rounded border border-itcg-gray">
                          <Building className="w-3 h-3 text-itcg-blue" />
                          <span>{item.companyName}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-itcg-navy leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-itcg-navy/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Speaker Info */}
                  <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-itcg-gray/60 pt-3 md:pt-0 md:pl-5">
                    <div className="text-[10px] uppercase font-heading text-itcg-gray-dark font-bold tracking-wider">
                      Speaker / Session Lead
                    </div>
                    <div className="text-sm font-heading font-bold text-itcg-navy mt-0.5">
                      {item.speakerName || 'To Be Announced'}
                    </div>
                    <div className="text-xs text-itcg-blue font-medium mt-0.5">
                      {item.speakerRole || (isTba ? 'Platinum Technology Partner' : '')}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
