'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  Maximize2,
  X,
  FileText,
  CheckCircle2,
  Info,
  ExternalLink,
  Table as TableIcon,
  Layout,
  Layers,
  Eye,
  Image as ImageIcon,
} from 'lucide-react';

export type BoothTierType = 'PLATINUM' | 'GOLD' | 'SILVER';
export type BlueprintZone =
  | 'backdrop'
  | 'crown'
  | 'header'
  | 'left-side'
  | 'right-side'
  | 'side'
  | 'table'
  | 'space'
  | null;

interface SpecRow {
  id: string;
  zone: BlueprintZone;
  subTabTarget: 'backdrop' | 'table';
  element: string;
  frameSize: string;
  printArea: string;
  notes: string;
}

interface TierSpecData {
  tier: BoothTierType;
  title: string;
  tagline: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  dimensionsOverview: string;
  powerSupply: string;
  referenceImage: string;
  rows: SpecRow[];
  guidelines: string[];
}

const SPEC_DATA: Record<BoothTierType, TierSpecData> = {
  PLATINUM: {
    tier: 'PLATINUM',
    title: 'Booth Platinum (3,00 m x 3,00 m)',
    tagline: 'Struktur booth modular 3 dinding tegak penuh dengan mahkota logo 3D, kanopi sudut, dan meja counter oval premium.',
    accentColor: 'border-itcg-red text-itcg-red',
    badgeBg: 'bg-red-50',
    badgeBorder: 'border-itcg-red/30',
    badgeText: 'text-itcg-red',
    dimensionsOverview: '3,00 m x 3,00 m (Tinggi Rangka: 2,50 m)',
    powerSupply: '2.200 Watt (Standard MCB)',
    referenceImage: '/images/booth-specs/platinum.png',
    rows: [
      {
        id: 'plat-backdrop',
        zone: 'backdrop',
        subTabTarget: 'backdrop',
        element: 'Sisi Tengah (Backdrop Utama)',
        frameSize: '3,00 m x 2,50 m (Dinding Tegak Penuh)',
        printArea: '3,00 m x 2,50 m (Opsi 1: Penuh / Opsi 2: Diagonal Background + Logo)',
        notes: 'Backdrop utama menghadap langsung audiens dengan material flexi Korea 440gsm atau stiker vinyl doff.',
      },
      {
        id: 'plat-crown',
        zone: 'crown',
        subTabTarget: 'backdrop',
        element: 'Mahkota Logo Atas (Opsional 3D)',
        frameSize: 'Lebar 3,00 m (bawah) / 2,50 m (atas) x Tinggi 50 cm (kiri) / 30 cm (kanan)',
        printArea: '1,00 m x 30 cm (Area Penempatan Logo Sponsor)',
        notes: 'Panel mahkota trapesium melandai ke kanan terpasang di atas Sisi Tengah untuk visibilitas logo jarak jauh.',
      },
      {
        id: 'plat-header',
        zone: 'header',
        subTabTarget: 'backdrop',
        element: 'Header Kanopi Melengkung (Fascia Sudut)',
        frameSize: 'Tampak Atas: 2,25 m x 1,00 m (tebal ujung 10 cm)',
        printArea: 'Strip Cetak: 2,40 m x 25 cm (Teks & Logo Nama Perusahaan)',
        notes: 'Pita kanopi melengkung di sudut kiri-tengah atas booth untuk identitas nama sponsor.',
      },
      {
        id: 'plat-left-side',
        zone: 'left-side',
        subTabTarget: 'backdrop',
        element: 'Sisi Kiri (Dinding 2 Panel Cetak)',
        frameSize: '3,00 m x 2,50 m (Dinding Tegak Penuh)',
        printArea: '2 Panel Cetak: masing-masing 85 cm x 1,00 m + Background Dinding',
        notes: 'Dinding tegak penuh berlatar grafis perusahaan dilengkapi 2 panel cetak materi produk di bagian atas.',
      },
      {
        id: 'plat-right-side',
        zone: 'right-side',
        subTabTarget: 'backdrop',
        element: 'Sisi Kanan (Dinding Cetak Penuh)',
        frameSize: '3,00 m x 2,50 m (Dinding Tegak Penuh)',
        printArea: '3,00 m x 2,50 m (Design Background & Logo/Text Full)',
        notes: 'Dinding samping kanan berupa satu kesatuan cetak visual penuh tanpa sekat panel tambahan.',
      },
      {
        id: 'plat-table',
        zone: 'table',
        subTabTarget: 'table',
        element: 'Meja Counter Platinum',
        frameSize: 'Panjang 104 cm x Lebar 40 cm x Tinggi 85 cm',
        printArea: 'Total Wrapping: 218 cm x 85 cm (Area Muka Depan: 104 cm x 85 cm)',
        notes: 'Meja lengkung oval/peanut premium berpartisi luas dengan branding stiker vinyl laminasi doff.',
      },
    ],
    guidelines: [
      'Gunakan format file resolusi tinggi (TIFF / PDF / AI) dengan color profile CMYK.',
      'Resolusi gambar minimal 150 DPI pada skala ukuran cetak asli (1:1).',
      'Tambahkan bleed 2-3 cm pada setiap sisi panel backdrop, mahkota, dan meja counter.',
      'Kirimkan materi cetak final kepada panitia paling lambat 10 hari sebelum acara.',
    ],
  },
  GOLD: {
    tier: 'GOLD',
    title: 'Booth Gold (2,00 m x 2,00 m)',
    tagline: 'Struktur sudut berbentuk L dengan backdrop tengah sudut rounded dan sayap melengkung kanan.',
    accentColor: 'border-itcg-blue text-itcg-blue',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-itcg-blue/30',
    badgeText: 'text-itcg-blue',
    dimensionsOverview: '2,00 m x 2,00 m (Tinggi Rangka: 2,00 m)',
    powerSupply: '1.300 Watt (Standard MCB)',
    referenceImage: '/images/booth-specs/gold.png',
    rows: [
      {
        id: 'gold-backdrop',
        zone: 'backdrop',
        subTabTarget: 'backdrop',
        element: 'Backdrop Utama (Sisi Tengah)',
        frameSize: '2,00 m x 2,00 m (Bingkai Persegi Rounded)',
        printArea: '1,70 m x 1,70 m (Area Cetak Efektif Background & Logo/Text)',
        notes: 'Partisi tengah dengan sudut rounded modern dan pencahayaan booth terarah.',
      },
      {
        id: 'gold-side',
        zone: 'side',
        subTabTarget: 'backdrop',
        element: 'Sayap Sisi Kanan (Curved Wing)',
        frameSize: 'Lebar 75 cm x Tinggi 2,00 m (Lengkungan Seperempat Lingkaran Atas)',
        printArea: '50 cm x 40 cm (Area Penempatan Logo Sponsor)',
        notes: 'Panel sayap kanan melengkung di sudut atas memberikan kesan dinamis dan visibilitas samping.',
      },
      {
        id: 'gold-table',
        zone: 'table',
        subTabTarget: 'table',
        element: 'Meja Counter Gold',
        frameSize: 'Lebar Depan 81 cm (muka 78 cm) x Kedalaman 39 cm (sisi 38,5 cm) x Tinggi 76 cm',
        printArea: 'Total Wrapping: 161 cm x 76 cm (Area Depan 78 cm + 2 Sisi Samping @38,5 cm)',
        notes: 'Meja display 3 segmen dengan branding logo sponsor terpusat di panel muka depan.',
      },
    ],
    guidelines: [
      'Gunakan format file resolusi tinggi (TIFF / PDF / AI) dengan color profile CMYK.',
      'Resolusi gambar minimal 150 DPI pada skala ukuran cetak asli (1:1).',
      'Tambahkan bleed 2 cm pada setiap sisi desain backdrop dan meja promosi.',
      'Pastikan teks penting berada di dalam batas aman safe margin 5 cm dari tepi.',
    ],
  },
  SILVER: {
    tier: 'SILVER',
    title: 'Booth Silver (Meja Promosi)',
    tagline: 'Area promosi mandiri efisien di koridor utama pintu masuk tanpa partisi backdrop belakang/samping.',
    accentColor: 'border-slate-500 text-slate-800',
    badgeBg: 'bg-slate-100',
    badgeBorder: 'border-slate-300',
    badgeText: 'text-slate-800',
    dimensionsOverview: '1,50 m x 1,50 m Area Lantai (Tanpa Partisi Dinding)',
    powerSupply: '450 Watt (Standard MCB)',
    referenceImage: '/images/booth-specs/silver.png',
    rows: [
      {
        id: 'silver-space',
        zone: 'space',
        subTabTarget: 'backdrop',
        element: 'Alokasi Area Booth Promosi',
        frameSize: '1,50 m x 1,50 m (Area Lantai Mandiri)',
        printArea: 'Tanpa Partisi Dinding Belakang / Samping',
        notes: 'Booth Silver dirancang terbuka tanpa sekat partisi backdrop, hanya menggunakan meja promosi dan banner.',
      },
      {
        id: 'silver-table',
        zone: 'table',
        subTabTarget: 'table',
        element: 'Meja Counter Silver',
        frameSize: 'Lebar Depan 81 cm (muka 78 cm) x Kedalaman 39 cm (sisi 38,5 cm) x Tinggi 76 cm',
        printArea: 'Total Wrapping: 161 cm x 76 cm (Area Depan 78 cm + 2 Sisi Samping @38,5 cm)',
        notes: 'Meja display 3 segmen dengan stiker vinyl wrapping logo sponsor di muka depan.',
      },
    ],
    guidelines: [
      'Format file print meja: TIFF / PDF skala 1:1, mode warna CMYK, 150 DPI.',
      'Area tampak depan efektif 78 cm x 76 cm ideal untuk logo sponsor dan headline singkat.',
      'Vendor sponsor diperkenankan membawa 1 unit roll up banner ukuran 60x160 cm atau 85x200 cm di samping meja.',
    ],
  },
};

// =========================================================================
// SVG BLUEPRINT UTILITIES & PATTERNS
// =========================================================================

function BlueprintDefs() {
  return (
    <defs>
      <pattern id="bp-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
      </pattern>
      <marker id="bp-arr-start-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 5 L 10 2 L 7 5 L 10 8 z" fill="#0066E0" />
      </marker>
      <marker id="bp-arr-end-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 2 L 10 5 L 0 8 L 3 5 z" fill="#0066E0" />
      </marker>
      <marker id="bp-arr-start-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 5 L 10 2 L 7 5 L 10 8 z" fill="#E02424" />
      </marker>
      <marker id="bp-arr-end-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 2 L 10 5 L 0 8 L 3 5 z" fill="#E02424" />
      </marker>
      <marker id="bp-arr-start-dark" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 5 L 10 2 L 7 5 L 10 8 z" fill="#0F2449" />
      </marker>
      <marker id="bp-arr-end-dark" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 2 L 10 5 L 0 8 L 3 5 z" fill="#0F2449" />
      </marker>
    </defs>
  );
}

// =========================================================================
// 1. PLATINUM BACKDROP SVG (BENTANGAN 3 DINDING TEGAK: SISI KIRI, TENGAH, KANAN)
// =========================================================================

function PlatinumBackdropSVG({ selectedZone }: { selectedZone: BlueprintZone }) {
  const isBackdropHl = selectedZone === 'backdrop';
  const isCrownHl = selectedZone === 'crown';
  const isHeaderHl = selectedZone === 'header';
  const isLeftHl = selectedZone === 'left-side';
  const isRightHl = selectedZone === 'right-side';

  return (
    <svg viewBox="0 0 960 560" className="w-full h-auto select-none font-sans">
      <BlueprintDefs />
      {/* Background Grid */}
      <rect width="960" height="560" fill="#F8FAFC" />
      <rect width="960" height="560" fill="url(#bp-grid-pattern)" />

      {/* Blueprint Title Badge */}
      <g transform="translate(35, 24)">
        <rect width="380" height="28" rx="6" fill="#0F2449" />
        <text x="14" y="18" fill="#FFFFFF" fontSize="11" fontWeight="800" letterSpacing="0.05em">
          BLUEPRINT PLATINUM: SKEMA BENTANGAN 3 DINDING TEGAK
        </text>
      </g>

      {/* Ground Line */}
      <line x1="30" y1="475" x2="930" y2="475" stroke="#0F2449" strokeWidth="3" />
      <line x1="30" y1="480" x2="930" y2="480" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
      <text x="860" y="492" fill="#64748B" fontSize="9" fontWeight="700">GARIS LANTAI</text>

      {/* ===================================================================
          1. SISI KIRI (DINDING TEGAK 3,00 m x 2,50 m DENGAN 2 PANEL CETAK)
         =================================================================== */}
      <g
        className="transition-all duration-300"
        opacity={selectedZone && !isLeftHl ? 0.35 : 1}
      >
        {/* Wall Frame (Persegi Panjang Tegak) */}
        <rect
          x="50"
          y="205"
          width="260"
          height="270"
          fill={isLeftHl ? '#EFF6FF' : '#FFFFFF'}
          stroke={isLeftHl ? '#0066E0' : '#0F2449'}
          strokeWidth={isLeftHl ? 3.5 : 2}
          rx="3"
        />

        {/* 2 Print Panels on Top of Left Wall (85 cm x 1,00 m each) */}
        <g transform="translate(65, 220)">
          {/* Panel 1 */}
          <rect
            x="10"
            y="0"
            width="100"
            height="115"
            rx="4"
            fill={isLeftHl ? '#DCFCE7' : '#F1F5F9'}
            stroke={isLeftHl ? '#16A34A' : '#0066E0'}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text x="60" y="45" textAnchor="middle" fill="#0F2449" fontSize="10" fontWeight="800">
            PANEL CETAK 1
          </text>
          <text x="60" y="65" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="900">
            85 cm x 1,00 m
          </text>
          <text x="60" y="82" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
            (Area Desain Produk)
          </text>

          {/* Panel 2 */}
          <rect
            x="120"
            y="0"
            width="100"
            height="115"
            rx="4"
            fill={isLeftHl ? '#DCFCE7' : '#F1F5F9'}
            stroke={isLeftHl ? '#16A34A' : '#0066E0'}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text x="170" y="45" textAnchor="middle" fill="#0F2449" fontSize="10" fontWeight="800">
            PANEL CETAK 2
          </text>
          <text x="170" y="65" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="900">
            85 cm x 1,00 m
          </text>
          <text x="170" y="82" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="600">
            (Area Desain Produk)
          </text>
        </g>

        {/* Lower Graphic Background Area */}
        <rect x="75" y="355" width="210" height="95" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
        <text x="180" y="395" textAnchor="middle" fill="#0F2449" fontSize="11" fontWeight="800">
          SISI KIRI (3,00 m x 2,50 m)
        </text>
        <text x="180" y="415" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
          Design Background Dinding Penuh
        </text>

        {/* Width Dimension */}
        <line x1="50" y1="495" x2="310" y2="495" stroke="#0066E0" strokeWidth="1.5" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
        <text x="180" y="510" textAnchor="middle" fill="#0066E0" fontSize="10" fontWeight="900">
          LEBAR 3,00 M
        </text>
      </g>

      {/* ===================================================================
          2. SISI TENGAH + MAHKOTA ATAS + KANOPI MELENGKUNG SUDUT
         =================================================================== */}
      <g
        className="transition-all duration-300"
        opacity={selectedZone && !isBackdropHl && !isCrownHl && !isHeaderHl ? 0.35 : 1}
      >
        {/* Sisi Tengah (Backdrop Utama 3,00 m x 2,50 m) */}
        <rect
          x="350"
          y="205"
          width="260"
          height="270"
          fill={isBackdropHl ? '#FEF2F2' : '#FFFFFF'}
          stroke={isBackdropHl ? '#E02424' : '#0F2449'}
          strokeWidth={isBackdropHl ? 3.5 : 2}
          rx="3"
        />

        {/* Effective Print Area Indicator */}
        <rect
          x="365"
          y="220"
          width="230"
          height="240"
          fill={isBackdropHl ? '#FEE2E2' : '#F8FAFC'}
          stroke={isBackdropHl ? '#DC2626' : '#E02424'}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          rx="3"
        />

        <text x="480" y="315" textAnchor="middle" fill="#0F2449" fontSize="14" fontWeight="900">
          SISI TENGAH (BACKDROP)
        </text>
        <text x="480" y="340" textAnchor="middle" fill="#E02424" fontSize="13" fontWeight="900">
          AREA CETAK: 3,00 m x 2,50 m
        </text>
        <text x="480" y="360" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="600">
          Opsi 1: Desain Penuh / Opsi 2: Diagonal + Logo
        </text>

        {/* Mock Stage Display / Logo Box */}
        <rect x="410" y="380" width="140" height="45" rx="5" fill="#0066E0" opacity="0.12" stroke="#0066E0" strokeWidth="1" strokeDasharray="3 3" />
        <text x="480" y="407" textAnchor="middle" fill="#0066E0" fontSize="9" fontWeight="800">
          LOGO &amp; DISPLAY MEDIA
        </text>

        {/* Carpet Strip */}
        <rect x="350" y="465" width="260" height="10" fill="#E02424" opacity="0.9" />

        {/* Width Dimension Tengah */}
        <line x1="350" y1="495" x2="610" y2="495" stroke="#E02424" strokeWidth="1.5" markerStart="url(#bp-arr-start-red)" markerEnd="url(#bp-arr-end-red)" />
        <text x="480" y="510" textAnchor="middle" fill="#E02424" fontSize="10" fontWeight="900">
          LEBAR 3,00 M
        </text>
      </g>

      {/* MAHKOTA LOGO ATAS (TRAPESIUM: 3,00 m bawah x 2,50 m atas x 50 cm kiri / 30 cm kanan) */}
      <g
        className="transition-all duration-300"
        opacity={selectedZone && !isCrownHl ? 0.35 : 1}
      >
        <polygon
          points="350,205 350,145 570,170 610,205"
          fill={isCrownHl ? '#FEF3C7' : '#0F2449'}
          stroke={isCrownHl ? '#D97706' : '#0F2449'}
          strokeWidth={isCrownHl ? 3 : 1.5}
          strokeLinejoin="round"
        />

        {/* Logo 3D Box on Crown (1,00 m x 30 cm) */}
        <rect
          x="375"
          y="155"
          width="135"
          height="38"
          rx="4"
          fill={isCrownHl ? '#FFFFFF' : '#FFFFFF'}
          stroke={isCrownHl ? '#D97706' : '#E02424'}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <text x="442" y="174" textAnchor="middle" fill="#0F2449" fontSize="9" fontWeight="900">
          LOGO 3D / TIMBUL
        </text>
        <text x="442" y="186" textAnchor="middle" fill="#E02424" fontSize="8" fontWeight="800">
          Area: 1,00 m x 30 cm
        </text>

        {/* Crown Dimension Callout */}
        <text x="480" y="130" textAnchor="middle" fill="#D97706" fontSize="9.5" fontWeight="900">
          MAHKOTA ATAS (3,00 m x 50/30 cm)
        </text>
        <line x1="335" y1="205" x2="335" y2="145" stroke="#D97706" strokeWidth="1.2" markerStart="url(#bp-arr-start-dark)" markerEnd="url(#bp-arr-end-dark)" />
        <text x="325" y="175" textAnchor="end" fill="#D97706" fontSize="8.5" fontWeight="800">50 cm</text>
      </g>

      {/* HEADER KANOPI MELENGKUNG (FASCIA SUDUT KIRI-TENGAH: 2,40 m x 25 cm) */}
      <g
        className="transition-all duration-300"
        opacity={selectedZone && !isHeaderHl ? 0.35 : 1}
      >
        {/* Curved ribbon banner bridging left-middle top corner */}
        <path
          d="M 230,120 Q 340,95 440,115 L 440,145 Q 340,125 230,150 Z"
          fill={isHeaderHl ? '#DCFCE7' : '#0066E0'}
          stroke={isHeaderHl ? '#16A34A' : '#0F2449'}
          strokeWidth={isHeaderHl ? 3 : 1.5}
        />
        <text x="335" y="136" textAnchor="middle" fill={isHeaderHl ? '#0F2449' : '#FFFFFF'} fontSize="9.5" fontWeight="900" letterSpacing="0.05em">
          HEADER KANOPI SUDUT (2,40 m x 25 cm)
        </text>
        <text x="335" y="80" textAnchor="middle" fill="#0066E0" fontSize="8.5" fontWeight="700">
          Tampak Atas: 2,25 m x 1,00 m (Ujung 10 cm)
        </text>
        <line x1="335" y1="88" x2="335" y2="108" stroke="#0066E0" strokeWidth="1" strokeDasharray="2 2" />
      </g>

      {/* ===================================================================
          3. SISI KANAN (DINDING TEGAK 3,00 m x 2,50 m CETAK PENUH)
         =================================================================== */}
      <g
        className="transition-all duration-300"
        opacity={selectedZone && !isRightHl ? 0.35 : 1}
      >
        <rect
          x="650"
          y="205"
          width="260"
          height="270"
          fill={isRightHl ? '#EFF6FF' : '#FFFFFF'}
          stroke={isRightHl ? '#0066E0' : '#0F2449'}
          strokeWidth={isRightHl ? 3.5 : 2}
          rx="3"
        />

        {/* Full Print Area */}
        <rect
          x="665"
          y="220"
          width="230"
          height="240"
          fill={isRightHl ? '#DBEAFE' : '#F8FAFC'}
          stroke={isRightHl ? '#0066E0' : '#64748B'}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          rx="3"
        />

        <text x="780" y="315" textAnchor="middle" fill="#0F2449" fontSize="14" fontWeight="900">
          SISI KANAN
        </text>
        <text x="780" y="340" textAnchor="middle" fill="#0066E0" fontSize="13" fontWeight="900">
          AREA CETAK: 3,00 m x 2,50 m
        </text>
        <text x="780" y="360" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="600">
          Design Background &amp; Logo/Text Penuh
        </text>
        <text x="780" y="378" textAnchor="middle" fill="#15803D" fontSize="8.5" fontWeight="700">
          (Satu Kesatuan Cetak Tanpa Sekat Panel)
        </text>

        {/* Width Dimension */}
        <line x1="650" y1="495" x2="910" y2="495" stroke="#0066E0" strokeWidth="1.5" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
        <text x="780" y="510" textAnchor="middle" fill="#0066E0" fontSize="10" fontWeight="900">
          LEBAR 3,00 M
        </text>
      </g>

      {/* Height Dimension (2,50 m Full Wall Height) */}
      <line x1="935" y1="205" x2="935" y2="475" stroke="#0F2449" strokeWidth="2" markerStart="url(#bp-arr-start-dark)" markerEnd="url(#bp-arr-end-dark)" />
      <g transform="translate(945, 340) rotate(90)">
        <text x="0" y="0" textAnchor="middle" fill="#0F2449" fontSize="11" fontWeight="900">
          TINGGI DINDING: 2,50 M
        </text>
      </g>
    </svg>
  );
}

// =========================================================================
// 2. PLATINUM COUNTER TABLE SVG (104 x 40 x 85 cm, TOTAL WRAP 218 x 85 cm)
// =========================================================================

function CounterTablePlatinumSVG({ selectedZone }: { selectedZone: BlueprintZone }) {
  const isTableHl = selectedZone === 'table';

  return (
    <svg viewBox="0 0 920 520" className="w-full h-auto select-none font-sans">
      <BlueprintDefs />
      <rect width="920" height="520" fill="#F8FAFC" />
      <rect width="920" height="520" fill="url(#bp-grid-pattern)" />

      {/* Blueprint Title */}
      <g transform="translate(35, 24)">
        <rect width="360" height="28" rx="6" fill="#0F2449" />
        <text x="14" y="18" fill="#FFFFFF" fontSize="11" fontWeight="800" letterSpacing="0.05em">
          BLUEPRINT: MEJA COUNTER PLATINUM (OVAL 104x40x85 cm)
        </text>
      </g>

      {/* PANEL KIRI: FISIK MEJA (TOP VIEW & FRONT VIEW) */}
      <g transform="translate(40, 70)">
        <rect width="360" height="420" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <text x="20" y="30" fill="#0F2449" fontSize="12" fontWeight="900">
          1. DIMENSI FISIK MEJA
        </text>
        <text x="20" y="46" fill="#64748B" fontSize="9.5" fontWeight="600">
          Tampak Atas (Top View) &amp; Tampak Depan (Front View)
        </text>

        {/* TOP VIEW OVAL/PEANUT */}
        <g transform="translate(60, 65)">
          {/* Oval Stadium Shape: 104 cm x 40 cm */}
          <rect x="20" y="10" width="200" height="65" rx="32" fill="#EFF6FF" stroke="#0066E0" strokeWidth="2.5" />
          <text x="120" y="45" textAnchor="middle" fill="#0066E0" fontSize="11" fontWeight="800">
            TOP VIEW (104 cm x 40 cm)
          </text>
          <line x1="20" y1="2" x2="220" y2="2" stroke="#0F2449" strokeWidth="1.5" markerStart="url(#bp-arr-start-dark)" markerEnd="url(#bp-arr-end-dark)" />
          <text x="120" y="-3" textAnchor="middle" fill="#0F2449" fontSize="9.5" fontWeight="800">
            PANJANG: 104 CM
          </text>
          <line x1="230" y1="10" x2="230" y2="75" stroke="#0066E0" strokeWidth="1.2" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
          <text x="240" y="46" fill="#0066E0" fontSize="9" fontWeight="800">40 CM</text>
        </g>

        {/* FRONT VIEW */}
        <g transform="translate(60, 180)">
          {/* Table Front Body: 104 cm x 85 cm */}
          <rect
            x="20"
            y="25"
            width="200"
            height="160"
            rx="8"
            fill={isTableHl ? '#DCFCE7' : '#FFFFFF'}
            stroke={isTableHl ? '#16A34A' : '#0F2449'}
            strokeWidth={isTableHl ? 3 : 2}
          />
          {/* Top & Bottom Rim */}
          <rect x="12" y="15" width="216" height="14" rx="4" fill="#0F2449" />
          <rect x="16" y="185" width="208" height="10" rx="3" fill="#0F2449" />

          {/* Logo Placeholder */}
          <rect x="45" y="70" width="150" height="60" rx="6" fill="#0066E0" opacity="0.12" stroke="#0066E0" strokeWidth="1" strokeDasharray="3 3" />
          <text x="120" y="100" textAnchor="middle" fill="#0F2449" fontSize="12" fontWeight="900">
            LOGO SPONSOR
          </text>
          <text x="120" y="117" textAnchor="middle" fill="#0066E0" fontSize="9.5" fontWeight="800">
            TAMPAK DEPAN: 104 x 85 cm
          </text>

          {/* Width & Height Dimensions */}
          <line x1="20" y1="210" x2="220" y2="210" stroke="#E02424" strokeWidth="1.5" markerStart="url(#bp-arr-start-red)" markerEnd="url(#bp-arr-end-red)" />
          <text x="120" y="225" textAnchor="middle" fill="#E02424" fontSize="10" fontWeight="900">
            LEBAR DEPAN: 104 CM
          </text>
          <line x1="235" y1="25" x2="235" y2="185" stroke="#0066E0" strokeWidth="1.5" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
          <text x="245" y="110" textAnchor="middle" fill="#0066E0" fontSize="10" fontWeight="900" transform="rotate(90 245 110)">
            TINGGI: 85 CM
          </text>
        </g>
      </g>

      {/* PANEL KANAN: BENTANGAN AREA CETAK STIKER (WRAPPING 218 x 85 cm) */}
      <g transform="translate(430, 70)">
        <rect width="450" height="420" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <text x="20" y="30" fill="#0F2449" fontSize="12" fontWeight="900">
          2. BENTANGAN AREA CETAK MEJA (WRAPPING)
        </text>
        <text x="20" y="46" fill="#64748B" fontSize="9.5" fontWeight="600">
          Total Wrapping Area: 218 cm x 85 cm (Stiker Vinyl + Laminasi Doff)
        </text>

        {/* Flat Layout Graphic */}
        <g transform="translate(25, 80)">
          {/* Total Wrap Boundary */}
          <rect
            x="0"
            y="25"
            width="400"
            height="185"
            rx="6"
            fill={isTableHl ? '#F0FDF4' : '#F8FAFC'}
            stroke={isTableHl ? '#16A34A' : '#0066E0'}
            strokeWidth={isTableHl ? 3 : 2}
          />

          {/* Center Front Area (104 cm) */}
          <rect
            x="105"
            y="25"
            width="190"
            height="185"
            fill={isTableHl ? '#DCFCE7' : '#DBEAFE'}
            stroke="#0066E0"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Left Wing / Wrap Fold (57 cm) */}
          <text x="52" y="110" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="800">
            SISI KIRI
          </text>
          <text x="52" y="125" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontWeight="600">
            (57 cm)
          </text>

          {/* Front Face Focus */}
          <text x="200" y="105" textAnchor="middle" fill="#0F2449" fontSize="14" fontWeight="900">
            AREA MUKA DEPAN
          </text>
          <text x="200" y="125" textAnchor="middle" fill="#0066E0" fontSize="12" fontWeight="900">
            104 cm x 85 cm
          </text>
          <text x="200" y="142" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="800">
            FOKUS LOGO &amp; TEKS SPONSOR DI SINI
          </text>

          {/* Right Wing / Wrap Fold (57 cm) */}
          <text x="347" y="110" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="800">
            SISI KANAN
          </text>
          <text x="347" y="125" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontWeight="600">
            (57 cm)
          </text>

          {/* Total Width Dimension */}
          <line x1="0" y1="10" x2="400" y2="10" stroke="#0F2449" strokeWidth="1.5" markerStart="url(#bp-arr-start-dark)" markerEnd="url(#bp-arr-end-dark)" />
          <rect x="135" y="-2" width="130" height="20" rx="4" fill="#0F2449" />
          <text x="200" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="900">
            TOTAL LEBAR: 218 CM
          </text>

          {/* Height Dimension */}
          <line x1="415" y1="25" x2="415" y2="210" stroke="#0066E0" strokeWidth="1.5" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
          <text x="425" y="120" textAnchor="middle" fill="#0066E0" fontSize="10" fontWeight="900" transform="rotate(90 425 120)">
            TINGGI: 85 CM
          </text>
        </g>

        {/* Notes */}
        <g transform="translate(25, 320)">
          <rect width="400" height="75" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <text x="15" y="22" fill="#0F2449" fontSize="10.5" fontWeight="800">
            PETUNJUK PRODUKSI STIKER MEJA PLATINUM:
          </text>
          <text x="15" y="40" fill="#475569" fontSize="9" fontWeight="600">
            • Lebar total 218 cm mencakup keliling permukaan lengkung meja hingga sisi belakang.
          </text>
          <text x="15" y="56" fill="#475569" fontSize="9" fontWeight="600">
            • Pastikan elemen teks dan logo utama berada pada zona tengah muka depan (104 cm).
          </text>
        </g>
      </g>
    </svg>
  );
}

// =========================================================================
// 3. GOLD BACKDROP SVG (BACKDROP 2x2m ROUNDED + SAYAP KANAN MELENGKUNG)
// =========================================================================

function GoldBackdropSVG({ selectedZone }: { selectedZone: BlueprintZone }) {
  const isBackdropHl = selectedZone === 'backdrop';
  const isSideHl = selectedZone === 'side';

  return (
    <svg viewBox="0 0 920 520" className="w-full h-auto select-none font-sans">
      <BlueprintDefs />
      <rect width="920" height="520" fill="#F8FAFC" />
      <rect width="920" height="520" fill="url(#bp-grid-pattern)" />

      {/* Blueprint Title */}
      <g transform="translate(35, 24)">
        <rect width="360" height="28" rx="6" fill="#0F2449" />
        <text x="14" y="18" fill="#FFFFFF" fontSize="11" fontWeight="800" letterSpacing="0.05em">
          BLUEPRINT GOLD: BACKDROP UTAMA &amp; SAYAP MELENGKUNG
        </text>
      </g>

      {/* Ground Line */}
      <line x1="50" y1="440" x2="870" y2="440" stroke="#0F2449" strokeWidth="3" />
      <line x1="50" y1="445" x2="870" y2="445" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
      <text x="810" y="458" fill="#64748B" fontSize="9" fontWeight="700">GARIS LANTAI</text>

      {/* 1. BACKDROP UTAMA (2,00 m x 2,00 m BINGKAI ROUNDED, AREA CETAK 1,70 m x 1,70 m) */}
      <g
        className="transition-all duration-300"
        opacity={selectedZone && !isBackdropHl ? 0.35 : 1}
      >
        {/* Outer Frame (2,00 m x 2,00 m) */}
        <rect
          x="120"
          y="100"
          width="340"
          height="340"
          rx="26"
          fill={isBackdropHl ? '#EFF6FF' : '#FFFFFF'}
          stroke={isBackdropHl ? '#0066E0' : '#0F2449'}
          strokeWidth={isBackdropHl ? 3.5 : 2.5}
        />

        {/* Live Print Area (1,70 m x 1,70 m) */}
        <rect
          x="145"
          y="125"
          width="290"
          height="290"
          rx="18"
          fill={isBackdropHl ? '#DBEAFE' : '#F8FAFC'}
          stroke={isBackdropHl ? '#0066E0' : '#3B82F6'}
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        <text x="290" y="210" textAnchor="middle" fill="#0F2449" fontSize="15" fontWeight="900">
          BACKDROP UTAMA GOLD
        </text>
        <text x="290" y="235" textAnchor="middle" fill="#0066E0" fontSize="13" fontWeight="900">
          AREA CETAK: 1,70 m x 1,70 m
        </text>
        <text x="290" y="255" textAnchor="middle" fill="#64748B" fontSize="9.5" fontWeight="600">
          Rangka Keseluruhan: 2,00 m x 2,00 m (Sudut Membulat)
        </text>

        <rect x="200" y="290" width="180" height="60" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <text x="290" y="325" textAnchor="middle" fill="#0F2449" fontSize="11" fontWeight="800">
          [ DESIGN BACKGROUND &amp; LOGO ]
        </text>

        {/* Blue Carpet Strip */}
        <rect x="120" y="428" width="340" height="12" rx="2" fill="#0066E0" opacity="0.9" />
        <text x="290" y="437" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800">
          KARPET BIRU RESMI GOLD
        </text>

        {/* Width Dimension */}
        <line x1="120" y1="465" x2="460" y2="465" stroke="#0066E0" strokeWidth="1.75" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
        <rect x="245" y="455" width="90" height="20" rx="4" fill="#FFFFFF" stroke="#0066E0" strokeWidth="1" />
        <text x="290" y="469" textAnchor="middle" fill="#0066E0" fontSize="10.5" fontWeight="900">
          LEBAR 2,00 M
        </text>
      </g>

      {/* 2. SAYAP SISI KANAN MELENGKUNG (2,00 m x 75 cm DENGAN AREA LOGO 50 cm x 40 cm) */}
      <g
        className="transition-all duration-300"
        opacity={selectedZone && !isSideHl ? 0.35 : 1}
      >
        {/* Curved Wing Outer Frame */}
        <path
          d="M 520,440 L 520,100 Q 660,100 660,240 L 660,440 Z"
          fill={isSideHl ? '#EFF6FF' : '#0F2449'}
          stroke={isSideHl ? '#0066E0' : '#0F2449'}
          strokeWidth={isSideHl ? 3 : 2}
        />

        {/* Logo Print Area on Wing (50 cm x 40 cm) */}
        <rect
          x="540"
          y="180"
          width="100"
          height="80"
          rx="6"
          fill={isSideHl ? '#DCFCE7' : '#FFFFFF'}
          stroke={isSideHl ? '#16A34A' : '#E02424'}
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <text x="590" y="215" textAnchor="middle" fill="#0F2449" fontSize="9.5" fontWeight="800">
          AREA LOGO
        </text>
        <text x="590" y="235" textAnchor="middle" fill="#E02424" fontSize="10.5" fontWeight="900">
          50 cm x 40 cm
        </text>

        <text x="590" y="340" textAnchor="middle" fill={isSideHl ? '#0F2449' : '#FFFFFF'} fontSize="11" fontWeight="800">
          SAYAP KANAN
        </text>
        <text x="590" y="360" textAnchor="middle" fill={isSideHl ? '#0066E0' : '#94A3B8'} fontSize="9.5" fontWeight="700">
          Lengkung 75 cm x 2,00 m
        </text>

        {/* Wing Width Dimension */}
        <line x1="520" y1="465" x2="660" y2="465" stroke="#E02424" strokeWidth="1.75" markerStart="url(#bp-arr-start-red)" markerEnd="url(#bp-arr-end-red)" />
        <rect x="560" y="455" width="60" height="20" rx="4" fill="#FFFFFF" stroke="#E02424" strokeWidth="1" />
        <text x="590" y="469" textAnchor="middle" fill="#E02424" fontSize="9.5" fontWeight="900">
          75 CM
        </text>
      </g>

      {/* Height Dimension (2,00 m) */}
      <line x1="700" y1="100" x2="700" y2="440" stroke="#0F2449" strokeWidth="2" markerStart="url(#bp-arr-start-dark)" markerEnd="url(#bp-arr-end-dark)" />
      <g transform="translate(710, 270) rotate(90)">
        <text x="0" y="0" textAnchor="middle" fill="#0F2449" fontSize="11" fontWeight="900">
          TINGGI RANGKA: 2,00 M
        </text>
      </g>
    </svg>
  );
}

// =========================================================================
// 4. GOLD & SILVER COUNTER TABLE SVG (81x39x76 cm, TOTAL WRAP 161x76 cm)
// =========================================================================

function CounterTableGoldSilverSVG({
  tier,
  selectedZone,
}: {
  tier: 'GOLD' | 'SILVER';
  selectedZone: BlueprintZone;
}) {
  const isTableHl = selectedZone === 'table';

  return (
    <svg viewBox="0 0 920 520" className="w-full h-auto select-none font-sans">
      <BlueprintDefs />
      <rect width="920" height="520" fill="#F8FAFC" />
      <rect width="920" height="520" fill="url(#bp-grid-pattern)" />

      {/* Blueprint Title */}
      <g transform="translate(35, 24)">
        <rect width="360" height="28" rx="6" fill="#0F2449" />
        <text x="14" y="18" fill="#FFFFFF" fontSize="11" fontWeight="800" letterSpacing="0.05em">
          BLUEPRINT: MEJA COUNTER {tier} (81x39x76 cm)
        </text>
      </g>

      {/* PANEL KIRI: FISIK MEJA (TOP VIEW & FRONT VIEW) */}
      <g transform="translate(40, 70)">
        <rect width="360" height="420" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <text x="20" y="30" fill="#0F2449" fontSize="12" fontWeight="900">
          1. DIMENSI FISIK MEJA
        </text>
        <text x="20" y="46" fill="#64748B" fontSize="9.5" fontWeight="600">
          Top View &amp; Front View Melengkung
        </text>

        {/* TOP VIEW TRAPEZOID */}
        <g transform="translate(60, 65)">
          <path d="M 25,15 L 195,15 L 180,65 L 40,65 Z" fill="#EFF6FF" stroke="#0066E0" strokeWidth="2.5" strokeLinejoin="round" />
          <text x="110" y="45" textAnchor="middle" fill="#0066E0" fontSize="10.5" fontWeight="800">
            TOP VIEW (81 cm x 39 cm)
          </text>
          <line x1="25" y1="2" x2="195" y2="2" stroke="#0F2449" strokeWidth="1.5" markerStart="url(#bp-arr-start-dark)" markerEnd="url(#bp-arr-end-dark)" />
          <text x="110" y="-3" textAnchor="middle" fill="#0F2449" fontSize="9.5" fontWeight="800">
            LEBAR DEPAN: 81 CM
          </text>
          <line x1="205" y1="15" x2="190" y2="65" stroke="#0066E0" strokeWidth="1.2" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
          <text x="215" y="46" fill="#0066E0" fontSize="8.5" fontWeight="800">38,5 cm</text>
        </g>

        {/* FRONT VIEW */}
        <g transform="translate(60, 185)">
          <rect
            x="25"
            y="25"
            width="170"
            height="150"
            rx="8"
            fill={isTableHl ? '#DCFCE7' : '#FFFFFF'}
            stroke={isTableHl ? '#16A34A' : '#0F2449'}
            strokeWidth={isTableHl ? 3 : 2}
          />
          <rect x="18" y="15" width="184" height="14" rx="4" fill="#0F2449" />
          <rect x="22" y="175" width="176" height="10" rx="3" fill="#0F2449" />

          {/* Logo Placeholder */}
          <rect x="45" y="65" width="130" height="55" rx="6" fill="#0066E0" opacity="0.12" stroke="#0066E0" strokeWidth="1" strokeDasharray="3 3" />
          <text x="110" y="93" textAnchor="middle" fill="#0F2449" fontSize="11" fontWeight="900">
            LOGO SPONSOR
          </text>
          <text x="110" y="109" textAnchor="middle" fill="#0066E0" fontSize="9" fontWeight="800">
            AREA MUKA: 78 x 76 cm
          </text>

          {/* Dimensions */}
          <line x1="25" y1="200" x2="195" y2="200" stroke="#E02424" strokeWidth="1.5" markerStart="url(#bp-arr-start-red)" markerEnd="url(#bp-arr-end-red)" />
          <text x="110" y="215" textAnchor="middle" fill="#E02424" fontSize="10" fontWeight="900">
            MUKA DEPAN: 78 CM
          </text>
          <line x1="210" y1="25" x2="210" y2="175" stroke="#0066E0" strokeWidth="1.5" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
          <text x="220" y="100" textAnchor="middle" fill="#0066E0" fontSize="10" fontWeight="900" transform="rotate(90 220 100)">
            TINGGI: 76 CM
          </text>
        </g>
      </g>

      {/* PANEL KANAN: BENTANGAN 3 PANEL TOTAL WRAPPING (161 cm x 76 cm) */}
      <g transform="translate(430, 70)">
        <rect width="450" height="420" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <text x="20" y="30" fill="#0F2449" fontSize="12" fontWeight="900">
          2. BENTANGAN 3 PANEL WRAPPING
        </text>
        <text x="20" y="46" fill="#64748B" fontSize="9.5" fontWeight="600">
          Total Area Cetak: 161 cm x 76 cm (Muka Depan 78 cm + 2 Sisi @38,5 cm)
        </text>

        {/* 3 Panels Layout */}
        <g transform="translate(25, 80)">
          {/* Total Outer Box */}
          <rect
            x="0"
            y="25"
            width="400"
            height="185"
            rx="6"
            fill={isTableHl ? '#F0FDF4' : '#F8FAFC'}
            stroke={isTableHl ? '#16A34A' : '#0066E0'}
            strokeWidth={isTableHl ? 3 : 2}
          />

          {/* Panel 1: Sisi Kiri (38,5 cm) */}
          <rect x="0" y="25" width="96" height="185" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <text x="48" y="110" textAnchor="middle" fill="#0F2449" fontSize="10" fontWeight="800">
            SISI KIRI
          </text>
          <text x="48" y="128" textAnchor="middle" fill="#0066E0" fontSize="9.5" fontWeight="900">
            38,5 x 76 cm
          </text>

          {/* Panel 2: Area Muka Depan (78 cm) */}
          <rect
            x="96"
            y="25"
            width="208"
            height="185"
            fill={isTableHl ? '#DCFCE7' : '#DBEAFE'}
            stroke="#0066E0"
            strokeWidth="2"
          />
          <text x="200" y="105" textAnchor="middle" fill="#0F2449" fontSize="14" fontWeight="900">
            AREA MUKA DEPAN
          </text>
          <text x="200" y="125" textAnchor="middle" fill="#0066E0" fontSize="12.5" fontWeight="900">
            78 cm x 76 cm
          </text>
          <text x="200" y="142" textAnchor="middle" fill="#15803D" fontSize="9" fontWeight="800">
            FOKUS LOGO UTAMA DI PANEL INI
          </text>

          {/* Panel 3: Sisi Kanan (38,5 cm) */}
          <rect x="304" y="25" width="96" height="185" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <text x="352" y="110" textAnchor="middle" fill="#0F2449" fontSize="10" fontWeight="800">
            SISI KANAN
          </text>
          <text x="352" y="128" textAnchor="middle" fill="#0066E0" fontSize="9.5" fontWeight="900">
            38,5 x 76 cm
          </text>

          {/* Total Width Dimension */}
          <line x1="0" y1="10" x2="400" y2="10" stroke="#0F2449" strokeWidth="1.5" markerStart="url(#bp-arr-start-dark)" markerEnd="url(#bp-arr-end-dark)" />
          <rect x="135" y="-2" width="130" height="20" rx="4" fill="#0F2449" />
          <text x="200" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="900">
            TOTAL LEBAR: 161 CM
          </text>

          {/* Height Dimension */}
          <line x1="415" y1="25" x2="415" y2="210" stroke="#0066E0" strokeWidth="1.5" markerStart="url(#bp-arr-start-blue)" markerEnd="url(#bp-arr-end-blue)" />
          <text x="425" y="120" textAnchor="middle" fill="#0066E0" fontSize="10" fontWeight="900" transform="rotate(90 425 120)">
            TINGGI: 76 CM
          </text>
        </g>

        {/* Production Notes */}
        <g transform="translate(25, 320)">
          <rect width="400" height="75" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <text x="15" y="22" fill="#0F2449" fontSize="10.5" fontWeight="800">
            PETUNJUK PRODUKSI STIKER MEJA {tier}:
          </text>
          <text x="15" y="40" fill="#475569" fontSize="9" fontWeight="600">
            • Cetak stiker dalam 1 lembar utuh ukuran 161 cm x 76 cm untuk membungkus 3 sisi meja.
          </text>
          <text x="15" y="56" fill="#475569" fontSize="9" fontWeight="600">
            • Garis batas 38,5 cm berfungsi sebagai lipatan alami pada sudut samping meja counter.
          </text>
        </g>
      </g>
    </svg>
  );
}

// Master Technical Blueprint Dispatcher
function TechnicalBlueprintSVG({
  tier,
  subTab,
  selectedZone,
}: {
  tier: BoothTierType;
  subTab: 'backdrop' | 'table';
  selectedZone: BlueprintZone;
}) {
  if (tier === 'SILVER') {
    return <CounterTableGoldSilverSVG tier="SILVER" selectedZone={selectedZone} />;
  }

  if (tier === 'PLATINUM') {
    return subTab === 'backdrop' ? (
      <PlatinumBackdropSVG selectedZone={selectedZone} />
    ) : (
      <CounterTablePlatinumSVG selectedZone={selectedZone} />
    );
  }

  // GOLD
  return subTab === 'backdrop' ? (
    <GoldBackdropSVG selectedZone={selectedZone} />
  ) : (
    <CounterTableGoldSilverSVG tier="GOLD" selectedZone={selectedZone} />
  );
}

// =========================================================================
// MAIN EXPORT COMPONENT
// =========================================================================

export default function BoothPrintingSpecs() {
  const [activeTier, setActiveTier] = useState<BoothTierType>('PLATINUM');
  const [subTab, setSubTab] = useState<'backdrop' | 'table'>('backdrop');
  const [selectedZone, setSelectedZone] = useState<BlueprintZone>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState<boolean>(false);

  // Synchronize with custom events (triggered from InteractiveBoothMap modal)
  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ tier?: string }>;
      const tierVal = customEvent.detail?.tier?.toUpperCase();
      if (tierVal && (tierVal === 'PLATINUM' || tierVal === 'GOLD' || tierVal === 'SILVER')) {
        setActiveTier(tierVal as BoothTierType);
        setSubTab('backdrop');
        setSelectedZone(null);
      }
    };

    window.addEventListener('select-booth-spec', handleCustomEvent);
    return () => {
      window.removeEventListener('select-booth-spec', handleCustomEvent);
    };
  }, []);

  // Keyboard shortcut for lightbox (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) setIsLightboxOpen(false);
        if (isImagePreviewOpen) setIsImagePreviewOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, isImagePreviewOpen]);

  const current = SPEC_DATA[activeTier];

  // Handle interaction from right cards
  const handleCardSelect = (row: SpecRow) => {
    setSelectedZone(row.zone);
    setSubTab(row.subTabTarget);
  };

  return (
    <section id="printing-specs" className="scroll-mt-32 pt-4">
      <div className="bg-white border border-itcg-gray rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        
        {/* Subtle Decorative Ambient Background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-itcg-blue/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-itcg-gray relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase mb-3 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/20 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
              <span>Panduan Teknis Produksi Visual • ITCG 2027</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-itcg-navy tracking-tight">
              Spesifikasi &amp; Ukuran Printing Booth
            </h2>

            <p className="text-sm sm:text-base text-itcg-navy/70 mt-2 leading-relaxed">
              Panduan teknis rincian dimensi rangka, area cetak efektif (live print area), dan layout meja counter untuk persiapan materi publikasi booth sponsor resmi IT Community Gathering 2027.
            </p>
          </div>

          {/* Download PDF Button */}
          <div className="shrink-0 flex items-center">
            <a
              href="/docs/detail-ukuran-printing-booth.pdf"
              download="detail-ukuran-printing-booth-itcg2027.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-heading font-bold text-white bg-itcg-navy hover:bg-[#153C8D] shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-itcg-blue" />
              <span>Unduh Panduan PDF</span>
            </a>
          </div>
        </div>

        {/* Tier Selector Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {(['PLATINUM', 'GOLD', 'SILVER'] as const).map((t) => {
            const isSelected = activeTier === t;
            let activeStyles = 'bg-white text-itcg-navy border-itcg-gray hover:bg-slate-50';
            if (isSelected) {
              if (t === 'PLATINUM') {
                activeStyles = 'bg-red-50 text-itcg-red border-itcg-red ring-2 ring-itcg-red/20 shadow-xs';
              } else if (t === 'GOLD') {
                activeStyles = 'bg-blue-50 text-itcg-blue border-itcg-blue ring-2 ring-itcg-blue/20 shadow-xs';
              } else {
                activeStyles = 'bg-slate-100 text-slate-800 border-slate-500 ring-2 ring-slate-400/20 shadow-xs';
              }
            }

            return (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setActiveTier(t);
                  setSubTab('backdrop');
                  setSelectedZone(null);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-black tracking-wide border-2 transition-all flex items-center gap-2 cursor-pointer ${activeStyles}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    t === 'PLATINUM'
                      ? 'bg-itcg-red'
                      : t === 'GOLD'
                      ? 'bg-itcg-blue'
                      : 'bg-slate-600'
                  }`}
                />
                <span>Booth {t}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="mt-6 pt-6 border-t border-itcg-gray/70">
          
          {/* Header Summary for Selected Tier */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-itcg-gray-light/60 p-4 rounded-2xl border border-itcg-gray">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${current.badgeBg} ${current.badgeBorder} ${current.badgeText}`}
                >
                  Kategori {current.tier}
                </span>
                <span className="text-xs font-bold text-itcg-navy">{current.dimensionsOverview}</span>
              </div>
              <p className="text-xs text-itcg-navy/75 mt-1 leading-relaxed">{current.tagline}</p>
            </div>

            <div className="shrink-0 text-left sm:text-right text-xs">
              <span className="text-itcg-gray-dark block text-[10px] uppercase font-bold">Alokasi Daya Listrik</span>
              <span className="font-heading font-extrabold text-itcg-navy">{current.powerSupply}</span>
            </div>
          </div>

          {/* 2-Column Grid: Technical Blueprint SVG (Left) and Dimensions Table (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Kolom Kiri: Diagram Teknis Blueprint SVG Interaktif */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              
              {/* Sub-tab Switcher (Inside Blueprint Box) */}
              <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-xl border border-itcg-gray">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSubTab('backdrop');
                      if (selectedZone === 'table') setSelectedZone(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                      subTab === 'backdrop'
                        ? 'bg-white text-itcg-navy shadow-xs border border-itcg-gray'
                        : 'text-itcg-navy/60 hover:text-itcg-navy'
                    }`}
                  >
                    <Layout className="w-3.5 h-3.5 text-itcg-blue" />
                    <span>
                      {activeTier === 'SILVER'
                        ? 'Skema Meja Counter Silver'
                        : '1. Rangka & Backdrop Booth'}
                    </span>
                  </button>

                  {activeTier !== 'SILVER' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSubTab('table');
                        setSelectedZone('table');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all flex items-center gap-1.5 ${
                        subTab === 'table'
                          ? 'bg-white text-itcg-navy shadow-xs border border-itcg-gray'
                          : 'text-itcg-navy/60 hover:text-itcg-navy'
                      }`}
                    >
                      <TableIcon className="w-3.5 h-3.5 text-itcg-red" />
                      <span>2. Meja Counter</span>
                    </button>
                  )}
                </div>

                {/* Lightbox Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-1.5 text-itcg-navy/70 hover:text-itcg-navy hover:bg-white rounded-lg transition-colors border border-transparent hover:border-itcg-gray shadow-2xs"
                  title="Perbesar Tampilan Blueprint"
                >
                  <Maximize2 className="w-4 h-4 text-itcg-blue" />
                </button>
              </div>

              {/* Main SVG Blueprint Display Box */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="group relative rounded-2xl border-2 border-itcg-gray bg-slate-50 p-2 sm:p-3 overflow-hidden cursor-zoom-in transition-all hover:border-itcg-blue/60 hover:shadow-md"
                title="Klik untuk memperbesar diagram teknis"
              >
                <div className="w-full bg-white rounded-xl overflow-hidden border border-itcg-gray/50 shadow-2xs">
                  <TechnicalBlueprintSVG
                    tier={activeTier}
                    subTab={subTab}
                    selectedZone={selectedZone}
                  />
                </div>

                {/* Subtle Hover Action Pill */}
                <div className="absolute right-5 bottom-5 px-3 py-1.5 bg-itcg-navy/90 backdrop-blur-xs text-white rounded-lg flex items-center gap-1.5 text-[11px] font-heading font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                  <Maximize2 className="w-3.5 h-3.5 text-itcg-blue" />
                  <span>Klik untuk Memperbesar</span>
                </div>
              </div>

              {/* Helper Legend Under Blueprint */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-itcg-gray-dark px-1 gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-itcg-blue shrink-0" />
                    <span>Garis Dimensi</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Area Cetak Efektif</span>
                  </span>
                </div>
                <span className="italic">Arahkan kursor pada kartu kanan untuk highlight panel</span>
              </div>

              {/* Reference Document & 3D Render Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-slate-50 border border-itcg-gray shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-itcg-blue/10 border border-itcg-blue/20 flex items-center justify-center shrink-0">
                    <ImageIcon className="w-4 h-4 text-itcg-blue" />
                  </div>
                  <div>
                    <span className="text-xs font-heading font-extrabold text-itcg-navy block leading-tight">
                      Dokumen Render 3D &amp; Layout Asli
                    </span>
                    <span className="text-[10px] text-itcg-gray-dark block leading-tight">
                      Format resmi panduan produksi booth {current.tier}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setIsImagePreviewOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-bold text-itcg-navy bg-white hover:bg-slate-100 border border-itcg-gray shadow-2xs transition-all active:scale-[0.98]"
                  >
                    <Eye className="w-3.5 h-3.5 text-itcg-blue" />
                    <span>Preview Render 3D &amp; Layout Asli</span>
                  </button>

                  <a
                    href={current.referenceImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-bold text-itcg-blue hover:text-white bg-blue-50 hover:bg-itcg-blue border border-blue-200 hover:border-itcg-blue shadow-2xs transition-all active:scale-[0.98]"
                    title="Buka Gambar di Tab Baru"
                  >
                    <span>Buka Gambar di Tab Baru</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Rincian Ukuran Cetak */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Table Container */}
              <div className="rounded-2xl border border-itcg-gray overflow-hidden shadow-2xs bg-white">
                <div className="px-4 py-3 bg-itcg-gray-light border-b border-itcg-gray flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-heading font-extrabold text-itcg-navy uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-itcg-blue" />
                    <span>Tabel Rincian Dimensi Cetak Booth {current.tier}</span>
                  </div>
                  <span className="text-[10px] text-itcg-gray-dark font-medium">Satuan: Meter (m) &amp; Sentimeter (cm)</span>
                </div>

                <div className="divide-y divide-itcg-gray/60">
                  {current.rows.map((row) => {
                    const isSelected = selectedZone === row.zone;
                    return (
                      <div
                        key={row.id}
                        onMouseEnter={() => handleCardSelect(row)}
                        onMouseLeave={() => setSelectedZone(null)}
                        onClick={() => handleCardSelect(row)}
                        className={`p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50/80 ring-2 ring-inset ring-itcg-blue/40'
                            : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                          <h4 className="text-xs sm:text-sm font-heading font-black text-itcg-navy flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full transition-transform ${
                                isSelected ? 'bg-itcg-blue scale-125' : 'bg-itcg-gray-dark'
                              }`}
                            />
                            <span>{row.element}</span>
                          </h4>
                          <span className="text-[11px] font-mono font-bold text-itcg-blue bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200/60 self-start sm:self-auto">
                            Rangka: {row.frameSize}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-200 mb-1.5">
                          <span className="font-bold">Area Cetak: </span>
                          <span>{row.printArea}</span>
                        </div>

                        <p className="text-[11px] text-itcg-navy/70 leading-relaxed">
                          {row.notes}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guidelines Card */}
              <div className="bg-slate-50 border border-itcg-gray rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-heading font-extrabold text-itcg-navy uppercase tracking-wider mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Petunjuk Format File &amp; Pengiriman Materi</span>
                </div>

                <ul className="space-y-2 text-xs text-itcg-navy/80">
                  {current.guidelines.map((guide, gIdx) => (
                    <li key={gIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-itcg-blue mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{guide}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-itcg-gray/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-itcg-navy/70">
                    <Info className="w-4 h-4 text-itcg-blue shrink-0" />
                    <span>Perlu bantuan penyesuaian layout?</span>
                  </div>
                  <a
                    href="https://wa.me/6281219884085?text=Halo%20Panitia%20ITCG%202027%2C%20mohon%20informasi%20mengenai%20ukuran%20printing%20booth."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading font-bold text-itcg-blue hover:text-itcg-navy transition-colors inline-flex items-center gap-1"
                  >
                    <span>Hubungi Tim Produksi Visual</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Modal for Technical Blueprint */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
          >
            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 border-b border-itcg-gray flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${current.badgeBg} ${current.badgeBorder} ${current.badgeText}`}
                >
                  {current.tier}
                </span>
                <h3 className="text-sm sm:text-base font-heading font-extrabold text-itcg-navy">
                  Diagram Teknis Vektor: {current.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 text-itcg-navy/70 hover:text-itcg-navy hover:bg-slate-200/80 rounded-xl transition-colors"
                  title="Tutup (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Switcher & Blueprint Canvas */}
            <div className="p-4 sm:p-6 flex-1 overflow-auto flex flex-col items-center justify-center bg-slate-100/60 min-h-[350px]">
              {activeTier !== 'SILVER' && (
                <div className="mb-4 flex items-center gap-2 bg-white p-1 rounded-xl border border-itcg-gray shadow-xs">
                  <button
                    type="button"
                    onClick={() => setSubTab('backdrop')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold ${
                      subTab === 'backdrop'
                        ? 'bg-itcg-navy text-white'
                        : 'text-itcg-navy hover:bg-slate-100'
                    }`}
                  >
                    1. Rangka &amp; Backdrop Booth
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubTab('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold ${
                      subTab === 'table'
                        ? 'bg-itcg-navy text-white'
                        : 'text-itcg-navy hover:bg-slate-100'
                    }`}
                  >
                    2. Meja Counter
                  </button>
                </div>
              )}

              <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-itcg-gray overflow-hidden">
                <TechnicalBlueprintSVG
                  tier={activeTier}
                  subTab={subTab}
                  selectedZone={selectedZone}
                />
              </div>
            </div>

            {/* Lightbox Footer */}
            <div className="p-3 sm:p-4 border-t border-itcg-gray bg-white flex flex-wrap items-center justify-between text-xs text-itcg-gray-dark gap-2">
              <span>{current.dimensionsOverview} • Vektor Presisi Skala Arsitektur</span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-itcg-navy text-white font-heading font-bold text-xs hover:bg-[#153C8D] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Original Reference Image (Render 3D & Layout Asli) */}
      {isImagePreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsImagePreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-itcg-gray flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 sm:gap-3">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${current.badgeBg} ${current.badgeBorder} ${current.badgeText}`}
                >
                  {current.tier}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-heading font-extrabold text-itcg-navy leading-tight">
                    Render 3D &amp; Dokumen Referensi Asli: Booth {current.tier}
                  </h3>
                  <span className="text-[11px] text-itcg-navy/60 block leading-tight">
                    {current.dimensionsOverview} • Panduan Produksi Resmi ITCG 2027
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={current.referenceImage}
                  download={`referensi-ukuran-booth-${current.tier.toLowerCase()}.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-itcg-navy/70 hover:text-itcg-navy hover:bg-slate-200/80 rounded-xl transition-colors"
                  title="Unduh Gambar Resolusi Penuh"
                >
                  <Download className="w-5 h-5 text-itcg-blue" />
                </a>
                <a
                  href={current.referenceImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-itcg-navy/70 hover:text-itcg-navy hover:bg-slate-200/80 rounded-xl transition-colors"
                  title="Buka di Tab Baru"
                >
                  <ExternalLink className="w-5 h-5 text-itcg-blue" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsImagePreviewOpen(false)}
                  className="p-2 text-itcg-navy/70 hover:text-itcg-navy hover:bg-slate-200/80 rounded-xl transition-colors"
                  title="Tutup (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <div className="p-4 sm:p-6 flex-1 overflow-auto flex items-center justify-center bg-slate-100/70 min-h-[300px]">
              <img
                src={current.referenceImage}
                alt={`Render 3D dan Dokumen Referensi Teknis Booth ${current.tier}`}
                className="max-h-[72vh] max-w-full object-contain drop-shadow-md rounded-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-itcg-gray bg-white flex flex-wrap items-center justify-between text-xs text-itcg-gray-dark gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-itcg-navy">Kategori: {current.tier}</span>
                <span>• Format PNG Resolusi Tinggi 150 DPI</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={current.referenceImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-itcg-gray bg-white text-itcg-navy font-heading font-bold text-xs hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Buka di Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsImagePreviewOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-itcg-navy text-white font-heading font-bold text-xs hover:bg-[#153C8D] transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
