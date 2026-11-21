'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isContact = pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`pointer-events-auto w-full h-14 sm:h-16 px-5 sm:px-7 rounded-2xl bg-white/95 backdrop-blur-md border ${
            scrolled
              ? 'shadow-[0_16px_36px_-12px_rgba(13,43,107,0.20)] border-[#D5DCEB]'
              : 'border-[#E6E9F2] shadow-[0_12px_32px_-12px_rgba(13,43,107,0.14)]'
          } flex items-center justify-between transition-all duration-300`}
        >
        {/* Left: Official ITCG Brand Logo */}
        <Link
          href="/"
          className="flex items-center group flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 rounded-lg p-1"
          title="KOMITKABE ITCG 2027"
        >
          <img
            src="/images/itcg-logo.png"
            alt="ITCG - IT Community Gathering"
            className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Center: Desktop Navigation Links (md:flex) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 whitespace-nowrap">
          <Link
            href="/#about"
            className="text-sm font-medium text-[#0D2B6B] hover:text-[#0066E0] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 rounded-md px-1 py-0.5"
          >
            About
          </Link>
          <Link
            href="/#partners"
            className="text-sm font-medium text-[#0D2B6B] hover:text-[#0066E0] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 rounded-md px-1 py-0.5"
          >
            Partners
          </Link>
          <Link
            href="/#schedule"
            className="text-sm font-medium text-[#0D2B6B] hover:text-[#0066E0] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 rounded-md px-1 py-0.5"
          >
            Schedule
          </Link>
          <Link
            href="/#venue"
            className="text-sm font-medium text-[#0D2B6B] hover:text-[#0066E0] transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 rounded-md px-1 py-0.5"
          >
            Venue
          </Link>
          <Link
            href="/contact"
            className={`text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 rounded-md px-1 py-0.5 ${
              isContact
                ? 'text-[#0066E0] font-semibold'
                : 'font-medium text-[#0D2B6B] hover:text-[#0066E0]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: CTA Button & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* CTA: Become a Sponsor */}
          <Link
            href="/sponsors"
            className="hidden sm:inline-flex items-center justify-center bg-[#E3062E] hover:bg-[#c20527] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition-colors shadow-xs whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#E3062E]/40"
          >
            <span>Become a Sponsor</span>
          </Link>

          {/* Mobile Menu Button (md:hidden) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#0D2B6B] hover:text-[#0066E0] hover:bg-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

        {/* Floating Dropdown Menu Mobile (< 768px) */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto mt-2 w-full rounded-2xl bg-white border border-[#E6E9F2] shadow-[0_18px_40px_-12px_rgba(13,43,107,0.18)] p-4 flex flex-col gap-2 transition-all">
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#0D2B6B] hover:bg-[#F5F7FA] hover:text-[#0066E0] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#0D2B6B] hover:bg-[#F5F7FA] hover:text-[#0066E0] transition-colors"
            >
              Partners
            </Link>
            <Link
              href="/#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#0D2B6B] hover:bg-[#F5F7FA] hover:text-[#0066E0] transition-colors"
            >
              Schedule
            </Link>
            <Link
              href="/#venue"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#0D2B6B] hover:bg-[#F5F7FA] hover:text-[#0066E0] transition-colors"
            >
              Venue
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                isContact
                  ? 'text-[#0066E0] font-semibold bg-itcg-blue-light/50'
                  : 'font-medium text-[#0D2B6B] hover:bg-[#F5F7FA] hover:text-[#0066E0]'
              }`}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-[#E6E9F2] mt-1">
              <Link
                href="/sponsors"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-heading font-extrabold text-white bg-[#E3062E] hover:bg-[#c20527] rounded-xl transition-colors shadow-xs"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
