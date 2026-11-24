'use client';

import React from 'react';
import { Bell, CheckCircle, Clock, Sparkles, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface EventUpdateData {
  id: string;
  title: string;
  description: string;
  badgeStatus: string;
  publishedAt: string | Date;
}

interface LiveUpdateBoardProps {
  updates: EventUpdateData[];
}

export default function LiveUpdateBoard({ updates }: LiveUpdateBoardProps) {
  const getBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terkonfirmasi':
        return 'bg-itcg-blue-light text-itcg-navy border-itcg-blue/30';
      case 'progress':
        return 'bg-itcg-blue-light text-itcg-blue border-itcg-blue/30';
      case 'open':
        return 'bg-itcg-red-subtle text-itcg-red border-itcg-red/20';
      default:
        return 'bg-itcg-gray-light text-itcg-navy border-itcg-gray';
    }
  };

  const getBadgeIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terkonfirmasi':
        return <CheckCircle className="w-3.5 h-3.5 mr-1 text-itcg-blue" />;
      case 'progress':
        return <Clock className="w-3.5 h-3.5 mr-1 text-itcg-blue" />;
      case 'open':
        return <Sparkles className="w-3.5 h-3.5 mr-1 text-itcg-red" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 mr-1 text-itcg-gray-dark" />;
    }
  };

  return (
    <section className="py-14 bg-itcg-gray-light/40 relative border-b border-itcg-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center pb-6 border-b border-itcg-gray">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-itcg-navy text-white flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-itcg-red" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-1 bg-[#E3062E]/10 text-[#E3062E] border border-[#E3062E]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3062E] shrink-0" />
                <span>Official Event Bulletin</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-itcg-navy tracking-tight">
                Live Preparation Update Board
              </h2>
            </div>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates && updates.length > 0 ? (
            updates.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-itcg-gray hover:border-itcg-blue/60 p-5 rounded-xl shadow-2xs hover:shadow-sm transition-all duration-300 ease-smooth flex flex-col justify-between transform hover:-translate-y-0.5 will-change-transform"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-itcg-gray/80">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-heading font-bold border ${getBadgeStyle(
                        item.badgeStatus
                      )}`}
                    >
                      {getBadgeIcon(item.badgeStatus)}
                      {item.badgeStatus}
                    </span>
                    <span className="text-[11px] font-mono text-itcg-gray-dark">
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-extrabold text-itcg-navy mt-3 leading-snug">
                    {item.title}
                  </h3>

                  <div className="space-y-3 text-sm leading-relaxed text-itcg-navy/75 mt-2.5">
                    {(item.description || '')
                      .split(/\r?\n+/)
                      .filter((para) => para.trim().length > 0)
                      .map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph.trim()}</p>
                      ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-itcg-gray/60 flex items-center justify-between text-[10px] text-itcg-gray-dark uppercase font-heading font-semibold">
                  <span>Panitia ITCG 2027</span>
                  <span className="text-itcg-blue font-bold">Verified Announcement</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-sm text-itcg-gray-dark">
              Belum ada pengumuman baru yang dipublikasikan.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
