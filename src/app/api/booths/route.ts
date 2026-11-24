import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isUserAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const DEFAULT_BOOTHS = [
  // PLATINUM (6 Slots: P-01..P-03 TOP, P-04..P-06 BOTTOM)
  {
    boothNumber: 'P-01',
    tier: 'PLATINUM',
    positionZone: 'TOP',
    status: 'BOOKED',
    sponsorName: 'Nusantara Cloud Systems',
    logoUrl: '/images/sponsors/nusantara-cloud.svg',
    description: 'Booth Platinum sayap atas, posisi terdepan dekat panggung utama dan videotron.',
    displayOrder: 1,
  },
  {
    boothNumber: 'P-02',
    tier: 'PLATINUM',
    positionZone: 'TOP',
    status: 'BOOKED',
    sponsorName: 'Quantum Industrial AI',
    logoUrl: '/images/sponsors/quantum-ai.svg',
    description: 'Booth Platinum sayap atas, visibilitas langsung dari area meja bundar peserta.',
    displayOrder: 2,
  },
  {
    boothNumber: 'P-03',
    tier: 'PLATINUM',
    positionZone: 'TOP',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Platinum sayap atas, akses terdekat ke koridor panggung dan ruang VIP.',
    displayOrder: 3,
  },
  {
    boothNumber: 'P-04',
    tier: 'PLATINUM',
    positionZone: 'BOTTOM',
    status: 'BOOKED',
    sponsorName: 'Astra Tech Solutions',
    logoUrl: '/images/sponsors/astra-tech.svg',
    description: 'Booth Platinum sayap bawah, posisi terdepan dekat panggung utama dan sound system.',
    displayOrder: 4,
  },
  {
    boothNumber: 'P-05',
    tier: 'PLATINUM',
    positionZone: 'BOTTOM',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Platinum sayap bawah, sudut pandang optimal dari seluruh meja peserta.',
    displayOrder: 5,
  },
  {
    boothNumber: 'P-06',
    tier: 'PLATINUM',
    positionZone: 'BOTTOM',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Platinum sayap bawah, akses cepat ke pintu samping dan panggung.',
    displayOrder: 6,
  },

  // GOLD (12 Slots: G-01..G-06 TOP, G-07..G-12 BOTTOM)
  {
    boothNumber: 'G-01',
    tier: 'GOLD',
    positionZone: 'TOP',
    status: 'BOOKED',
    sponsorName: 'Cikarang Digital Network',
    logoUrl: '/images/sponsors/cikarang-digital.svg',
    description: 'Booth Gold sayap atas, dekat pintu masuk atas dengan arus sirkulasi tinggi.',
    displayOrder: 7,
  },
  {
    boothNumber: 'G-02',
    tier: 'GOLD',
    positionZone: 'TOP',
    status: 'BOOKED',
    sponsorName: 'CyberShield Industrial',
    logoUrl: '/images/sponsors/cybershield.svg',
    description: 'Booth Gold sayap atas, koridor tengah alur peserta.',
    displayOrder: 8,
  },
  {
    boothNumber: 'G-03',
    tier: 'GOLD',
    positionZone: 'TOP',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Gold sayap atas, menghadap barisan meja peserta.',
    displayOrder: 9,
  },
  {
    boothNumber: 'G-04',
    tier: 'GOLD',
    positionZone: 'TOP',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Gold sayap atas, posisi strategis menuju zona Platinum.',
    displayOrder: 10,
  },
  {
    boothNumber: 'G-05',
    tier: 'GOLD',
    positionZone: 'TOP',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Gold sayap atas, akses interaksi bisnis luas.',
    displayOrder: 11,
  },
  {
    boothNumber: 'G-06',
    tier: 'GOLD',
    positionZone: 'TOP',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Gold sayap atas, berdampingan langsung dengan zona Platinum.',
    displayOrder: 12,
  },
  {
    boothNumber: 'G-07',
    tier: 'GOLD',
    positionZone: 'BOTTOM',
    status: 'BOOKED',
    sponsorName: 'Smart Factory Automation',
    logoUrl: '/images/sponsors/smart-factory.svg',
    description: 'Booth Gold sayap bawah, dekat pintu masuk bawah dengan arus registrasi.',
    displayOrder: 13,
  },
  {
    boothNumber: 'G-08',
    tier: 'GOLD',
    positionZone: 'BOTTOM',
    status: 'BOOKED',
    sponsorName: 'Lippo Logistics Tech',
    logoUrl: '/images/sponsors/lippo-logistics.svg',
    description: 'Booth Gold sayap bawah, posisi strategis sirkulasi peserta.',
    displayOrder: 14,
  },
  {
    boothNumber: 'G-09',
    tier: 'GOLD',
    positionZone: 'BOTTOM',
    status: 'BOOKED',
    sponsorName: 'Apex Robotic Vision',
    logoUrl: '/images/sponsors/apex-robotic.svg',
    description: 'Booth Gold sayap bawah, koridor interaksi delegasi pabrik.',
    displayOrder: 15,
  },
  {
    boothNumber: 'G-10',
    tier: 'GOLD',
    positionZone: 'BOTTOM',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Gold sayap bawah, daya listrik terdedikasi 1.300 Watt.',
    displayOrder: 16,
  },
  {
    boothNumber: 'G-11',
    tier: 'GOLD',
    positionZone: 'BOTTOM',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Gold sayap bawah, visibilitas langsung meja banquet.',
    displayOrder: 17,
  },
  {
    boothNumber: 'G-12',
    tier: 'GOLD',
    positionZone: 'BOTTOM',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Gold sayap bawah, berdampingan langsung dengan zona Platinum.',
    displayOrder: 18,
  },

  // SILVER (6 Slots: S-01..S-06 LEFT, Between 2 Entrance Doors)
  {
    boothNumber: 'S-01',
    tier: 'SILVER',
    positionZone: 'LEFT',
    status: 'BOOKED',
    sponsorName: 'SecureID Authentication',
    logoUrl: '/images/sponsors/secureid.svg',
    description: 'Booth Silver dinding belakang, dekat akses Pintu Masuk Atas.',
    displayOrder: 19,
  },
  {
    boothNumber: 'S-02',
    tier: 'SILVER',
    positionZone: 'LEFT',
    status: 'BOOKED',
    sponsorName: 'Industrial Edge Devices',
    logoUrl: '/images/sponsors/industrial-edge.svg',
    description: 'Booth Silver dinding belakang, barisan meja promosi display.',
    displayOrder: 20,
  },
  {
    boothNumber: 'S-03',
    tier: 'SILVER',
    positionZone: 'LEFT',
    status: 'BOOKED',
    sponsorName: 'Databox Analytics',
    logoUrl: '/images/sponsors/databox.svg',
    description: 'Booth Silver dinding belakang, pusat sirkulasi pintu masuk.',
    displayOrder: 21,
  },
  {
    boothNumber: 'S-04',
    tier: 'SILVER',
    positionZone: 'LEFT',
    status: 'BOOKED',
    sponsorName: 'Cikarang Fiber Optic',
    logoUrl: '/images/sponsors/cikarang-fiber.svg',
    description: 'Booth Silver dinding belakang, area pameran produk perangkat.',
    displayOrder: 22,
  },
  {
    boothNumber: 'S-05',
    tier: 'SILVER',
    positionZone: 'LEFT',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Silver dinding belakang, meja promosi dan display brosur.',
    displayOrder: 23,
  },
  {
    boothNumber: 'S-06',
    tier: 'SILVER',
    positionZone: 'LEFT',
    status: 'AVAILABLE',
    sponsorName: null,
    logoUrl: null,
    description: 'Booth Silver dinding belakang, dekat akses Pintu Masuk Bawah.',
    displayOrder: 24,
  },
];

export async function GET() {
  try {
    let count = 0;
    try {
      count = await prisma.booth.count();
    } catch {
      count = 0;
    }

    if (count === 0) {
      for (const b of DEFAULT_BOOTHS) {
        await prisma.booth.upsert({
          where: { boothNumber: b.boothNumber },
          update: b,
          create: b,
        });
      }
    }

    const booths = await prisma.booth.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json(booths);
  } catch (error) {
    console.error('Error fetching booths:', error);
    // Return fallback data if database is temporarily unavailable during initial build
    return NextResponse.json(DEFAULT_BOOTHS);
  }
}
