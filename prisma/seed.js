"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed for KOMITKABE ITCG 2027...');
    // 1. Seed Sponsor Tiers
    const tiers = [
        {
            name: 'PLATINUM',
            label: 'Platinum Partner',
            targetQuota: 6,
            displayOrder: 1,
        },
        {
            name: 'GOLD',
            label: 'Gold Partner',
            targetQuota: 12,
            displayOrder: 2,
        },
        {
            name: 'SILVER',
            label: 'Silver Partner',
            targetQuota: 12,
            displayOrder: 3,
        },
    ];
    for (const tier of tiers) {
        await prisma.sponsorTier.upsert({
            where: { name: tier.name },
            update: {
                label: tier.label,
                targetQuota: tier.targetQuota,
                displayOrder: tier.displayOrder,
            },
            create: tier,
        });
    }
    console.log('✅ Sponsor Tiers seeded.');
    // 2. Seed Initial Sponsors (Only if table is empty)
    const existingSponsors = await prisma.sponsor.count();
    if (existingSponsors === 0) {
    const sponsorsData = [
        // PLATINUM (Target: 6)
        {
            companyName: 'Nusantara Cloud Systems',
            tier: 'PLATINUM',
            status: 'CONFIRMED',
            category: 'Cloud & Infrastructure',
            logoUrl: '/images/sponsors/nusantara-cloud.svg',
            websiteUrl: 'https://example.com/nusantara-cloud',
            shortDescription: 'Penyedia infrastruktur cloud berkecepatan tinggi dan data center tier-3 untuk industri manufaktur di koridor Karawang dan Bekasi.',
            displayOrder: 1,
        },
        {
            companyName: 'Quantum Industrial AI',
            tier: 'PLATINUM',
            status: 'CONFIRMED',
            category: 'AI & Data',
            logoUrl: '/images/sponsors/quantum-ai.svg',
            websiteUrl: 'https://example.com/quantum-ai',
            shortDescription: 'Solusi computer vision dan predictive maintenance berbasis AI mutakhir untuk lini produksi otomatis.',
            displayOrder: 2,
        },
        {
            companyName: 'CyberShield Indonesia',
            tier: 'PLATINUM',
            status: 'CONFIRMED',
            category: 'Cybersecurity',
            logoUrl: '/images/sponsors/cybershield.svg',
            websiteUrl: 'https://example.com/cybershield',
            shortDescription: 'Proteksi keamanan OT & IT, Next-Gen SIEM, dan zero-trust architecture untuk fasilitas industri kritikal.',
            displayOrder: 3,
        },
        {
            companyName: 'Smart Factory Automation Corp',
            tier: 'PLATINUM',
            status: 'CONFIRMED',
            category: 'Industrial IoT',
            logoUrl: '/images/sponsors/smart-factory.svg',
            websiteUrl: 'https://example.com/smart-factory',
            shortDescription: 'Integrator SCADA terkemuka, smart sensor edge, dan konvergensi PLC-to-Cloud terpercaya di Asia Tenggara.',
            displayOrder: 4,
        },
        {
            companyName: 'Synapse Enterprise Data',
            tier: 'PLATINUM',
            status: 'RESERVED',
            category: 'AI & Data',
            logoUrl: '/images/sponsors/synapse-data.svg',
            websiteUrl: 'https://example.com/synapse',
            shortDescription: 'Platform enterprise data pipeline and industrial real-time stream processing.',
            displayOrder: 5,
        },
        // GOLD (Target: 12)
        {
            companyName: 'Astra Tech Solutions',
            tier: 'GOLD',
            status: 'CONFIRMED',
            category: 'Industrial IoT',
            logoUrl: '/images/sponsors/astra-tech.svg',
            websiteUrl: 'https://example.com/astratech',
            shortDescription: 'Penyedia telemetri armada dan sensor tracking industri logistik terintegrasi.',
            displayOrder: 1,
        },
        {
            companyName: 'Telco Enterprise Connect',
            tier: 'GOLD',
            status: 'CONFIRMED',
            category: 'Cloud & Infrastructure',
            logoUrl: '/images/sponsors/telco-connect.svg',
            websiteUrl: 'https://example.com/telco-connect',
            shortDescription: 'Jaringan dedicated leased line, SD-WAN, dan konektivitas 5G Private Campus.',
            displayOrder: 2,
        },
        {
            companyName: 'Sentinel Guard Defense',
            tier: 'GOLD',
            status: 'CONFIRMED',
            category: 'Cybersecurity',
            logoUrl: '/images/sponsors/sentinel.svg',
            websiteUrl: 'https://example.com/sentinel',
            shortDescription: 'Layanan Managed SOC 24/7 dan incident response khusus sektor manufaktur.',
            displayOrder: 3,
        },
        {
            companyName: 'Lippo Smart Logistics',
            tier: 'GOLD',
            status: 'CONFIRMED',
            category: 'Industrial IoT',
            logoUrl: '/images/sponsors/lippo-logistics.svg',
            websiteUrl: 'https://example.com/lippo-logistics',
            shortDescription: 'Automated warehouse management dan RFID tracking berstandar internasional.',
            displayOrder: 4,
        },
        {
            companyName: 'Cikarang Digital Infra',
            tier: 'GOLD',
            status: 'CONFIRMED',
            category: 'Cloud & Infrastructure',
            logoUrl: '/images/sponsors/cikarang-digital.svg',
            websiteUrl: 'https://example.com/cikarang-digital',
            shortDescription: 'Colocation lokal dan private cloud interconnection koridor timur Jakarta.',
            displayOrder: 5,
        },
        {
            companyName: 'Apex Robotic Vision',
            tier: 'GOLD',
            status: 'CONFIRMED',
            category: 'AI & Data',
            logoUrl: '/images/sponsors/apex-robotic.svg',
            websiteUrl: 'https://example.com/apex-vision',
            shortDescription: 'High-speed automated optical inspection (AOI) untuk lini perakitan elektronik.',
            displayOrder: 6,
        },
        // SILVER (Target: 12)
        {
            companyName: 'SecureID Authentication',
            tier: 'SILVER',
            status: 'CONFIRMED',
            category: 'Cybersecurity',
            logoUrl: '/images/sponsors/secureid.svg',
            websiteUrl: 'https://example.com/secureid',
            shortDescription: 'Identity management dan multi-factor hardware key token enterprise.',
            displayOrder: 1,
        },
        {
            companyName: 'Industrial Edge Devices',
            tier: 'SILVER',
            status: 'CONFIRMED',
            category: 'Industrial IoT',
            logoUrl: '/images/sponsors/industrial-edge.svg',
            websiteUrl: 'https://example.com/edge-devices',
            shortDescription: 'Hardware gateway industri tahan suhu ekstrem bersertifikasi IP67.',
            displayOrder: 2,
        },
        {
            companyName: 'Databox Analytics',
            tier: 'SILVER',
            status: 'CONFIRMED',
            category: 'AI & Data',
            logoUrl: '/images/sponsors/databox.svg',
            websiteUrl: 'https://example.com/databox',
            shortDescription: 'Dashboard visualisasi KPI pabrik dan reporting otomatis manajemen.',
            displayOrder: 3,
        },
        {
            companyName: 'Cikarang Fiber Optic',
            tier: 'SILVER',
            status: 'CONFIRMED',
            category: 'Cloud & Infrastructure',
            logoUrl: '/images/sponsors/cikarang-fiber.svg',
            websiteUrl: 'https://example.com/fiber-optic',
            shortDescription: 'Kabel jaringan bawah tanah redundan kawasan industri GIIC dan MM2100.',
            displayOrder: 4,
        },
    ];
    for (const s of sponsorsData) {
        await prisma.sponsor.create({
            data: s,
        });
    }
    console.log(`✅ ${sponsorsData.length} Sponsors seeded.`);
    } else {
        console.log(`ℹ️ ${existingSponsors} Sponsors already exist, skipping sponsor seed.`);
    }

    // 3. Seed Live Updates (Only if empty)
    const existingUpdates = await prisma.eventUpdate.count();
    if (existingUpdates === 0) {
        const updatesData = [
            {
                title: 'Finalization of Sutan Raja Hotel Floor Plan & Booths',
                description: 'Denah 30 booth teknis (Platinum 3x3m, Gold 2x2m, Silver Area) dan panggung utama berukuran 16x6m dengan LED Videotron 8x4m telah difinalisasi bersama manajemen venue Sutan Raja Hotel and Convention Centre, Soreang, Bandung.',
                badgeStatus: 'Confirmed',
                publishedAt: new Date('2026-11-15T10:00:00Z'),
                isActive: true,
            },
            {
                title: 'Curation of Keynote Speeches & Platinum Sessions',
                description: 'Penyelarasan materi 5 sesi Platinum Presentation bertema AI in Manufacturing, OT/IT Convergence, dan Zero-Trust OT Security sedang berjalan bersama panel kurator KOMITKABE.',
                badgeStatus: 'In Progress',
                publishedAt: new Date('2026-11-10T14:30:00Z'),
                isActive: true,
            },
            {
                title: 'Opening of Sponsorship Partnership Reservations',
                description: 'Slot kemitraan Platinum, Gold, dan Silver resmi dibuka untuk vendor teknologi industri & enterprise. Sistem mengakomodasi penambahan mitra industri terkonfirmasi secara dinamis.',
                badgeStatus: 'Open',
                publishedAt: new Date('2026-11-01T09:00:00Z'),
                isActive: true,
            },
        ];
        for (const u of updatesData) {
            await prisma.eventUpdate.create({
                data: u,
            });
        }
        console.log('✅ Event Updates seeded.');
    } else {
        console.log(`ℹ️ ${existingUpdates} Event Updates already exist, skipping update seed.`);
    }

    // 4. Seed Schedule Sessions (11 initial sessions with 5 Platinum slots marked as TBA)
    const existingSessions = await prisma.scheduleSession.count();
    if (existingSessions === 0) {
        const scheduleData = [
            {
                order: 1,
                day: 'Day 1',
                timeSlot: '08:30 - 09:00 WIB',
                period: 'morning',
                category: 'OPENING',
                title: 'Registration, Welcome Coffee & Morning Networking',
                description: 'Registrasi peserta (±300 pimpinan & praktisi IT), penyerahan event kit, dan morning coffee di area foyer ballroom.',
                speakerName: 'Panitia ITCG & Tamu Kehormatan',
                speakerRole: 'Registration & Hospitality',
                companyName: 'KOMITKABE',
                stage: 'Foyer & Registration Desk',
                status: 'CONFIRMED',
            },
            {
                order: 2,
                day: 'Day 1',
                timeSlot: '09:00 - 10:10 WIB',
                period: 'morning',
                category: 'KEYNOTE_SPEECH',
                title: 'Opening Remarks & Keynote: Intelligence in Motion',
                description: 'Sambutan pembukaan resmi 6th IT Community Gathering 2027, refleksi 18+ tahun KOMITKABE, dan keynote arah integrasi teknologi manufaktur.',
                speakerName: 'Miswadi',
                speakerRole: 'Ketua / Tokoh Senior KOMITKABE',
                companyName: 'KOMITKABE',
                stage: 'Panggung Utama (16x6m)',
                status: 'CONFIRMED',
            },
            {
                order: 3,
                day: 'Day 1',
                timeSlot: '10:10 - 10:50 WIB',
                period: 'morning',
                category: 'PLATINUM_KEYNOTE',
                title: 'Platinum Partner Presentation I',
                description: 'Topik presentasi dan studi kasus teknologi akan segera diumumkan bersama Platinum Partner.',
                speakerName: 'To Be Announced',
                speakerRole: 'Platinum Technology Partner',
                companyName: 'Platinum Partner I',
                stage: 'Panggung Utama & LED 8x4m',
                status: 'TBA',
            },
            {
                order: 4,
                day: 'Day 1',
                timeSlot: '10:50 - 11:30 WIB',
                period: 'morning',
                category: 'PLATINUM_KEYNOTE',
                title: 'Platinum Partner Presentation II',
                description: 'Topik presentasi dan studi kasus teknologi akan segera diumumkan bersama Platinum Partner.',
                speakerName: 'To Be Announced',
                speakerRole: 'Platinum Technology Partner',
                companyName: 'Platinum Partner II',
                stage: 'Panggung Utama & LED 8x4m',
                status: 'TBA',
            },
            {
                order: 5,
                day: 'Day 1',
                timeSlot: '11:30 - 13:00 WIB',
                period: 'afternoon',
                category: 'NETWORKING',
                title: 'Executive Lunch, ISOMA & Interactive Exhibition Tour',
                description: 'Makan siang prasmanan eksekutif di Sutan Raja Hotel, ibadah sholat Dzuhur, dan tur interaktif ke area booth pameran mitra teknologi.',
                speakerName: 'Seluruh Peserta & Mitra Sponsor',
                speakerRole: 'Executive Dining & Exhibition',
                companyName: 'Sutan Raja Grand Ballroom',
                stage: 'Exhibition Area & Dining Hall',
                status: 'CONFIRMED',
            },
            {
                order: 6,
                day: 'Day 1',
                timeSlot: '13:00 - 13:40 WIB',
                period: 'afternoon',
                category: 'PLATINUM_KEYNOTE',
                title: 'Platinum Partner Presentation III',
                description: 'Topik presentasi dan studi kasus teknologi akan segera diumumkan bersama Platinum Partner.',
                speakerName: 'To Be Announced',
                speakerRole: 'Platinum Technology Partner',
                companyName: 'Platinum Partner III',
                stage: 'Panggung Utama & LED 8x4m',
                status: 'TBA',
            },
            {
                order: 7,
                day: 'Day 1',
                timeSlot: '13:40 - 14:20 WIB',
                period: 'afternoon',
                category: 'PLATINUM_KEYNOTE',
                title: 'Platinum Partner Presentation IV',
                description: 'Topik presentasi dan studi kasus teknologi akan segera diumumkan bersama Platinum Partner.',
                speakerName: 'To Be Announced',
                speakerRole: 'Platinum Technology Partner',
                companyName: 'Platinum Partner IV',
                stage: 'Panggung Utama & LED 8x4m',
                status: 'TBA',
            },
            {
                order: 8,
                day: 'Day 1',
                timeSlot: '14:20 - 15:00 WIB',
                period: 'afternoon',
                category: 'PLATINUM_KEYNOTE',
                title: 'Platinum Partner Presentation V',
                description: 'Topik presentasi dan studi kasus teknologi akan segera diumumkan bersama Platinum Partner.',
                speakerName: 'To Be Announced',
                speakerRole: 'Platinum Technology Partner',
                companyName: 'Platinum Partner V',
                stage: 'Panggung Utama & LED 8x4m',
                status: 'TBA',
            },
            {
                order: 9,
                day: 'Day 1',
                timeSlot: '15:00 - 15:45 WIB',
                period: 'afternoon',
                category: 'EXHIBITION',
                title: 'Afternoon Coffee Break & Hands-On Booth Showcase',
                description: 'Demo langsung teknologi pada booth mitra sponsor, sesi konsultasi teknis B2B one-on-one, serta hidangan kopi dan snack sore.',
                speakerName: 'Sponsor Booths & Peserta',
                speakerRole: 'Technology Showcase',
                companyName: 'Technology Partners Cluster',
                stage: 'Area Booth 30 Mitra',
                status: 'CONFIRMED',
            },
            {
                order: 10,
                day: 'Day 1',
                timeSlot: '15:45 - 17:00 WIB',
                period: 'afternoon',
                category: 'EXECUTIVE_PANEL',
                title: 'Grand Interactive Panel: The Future of Industrial IT 2027+',
                description: 'Diskusi panel interaktif pimpinan IT lintas sektor mengenai kesiapan regulasi, adopsi AI terpadu, dan pengembangan talenta digital industri.',
                speakerName: 'Panel Pimpinan IT & Moderator',
                speakerRole: 'CIO / IT Director Kawasan Industri',
                companyName: 'KOMITKABE Panel',
                stage: 'Panggung Utama (16x6m)',
                status: 'CONFIRMED',
            },
            {
                order: 11,
                day: 'Day 1',
                timeSlot: '17:00 - 18:00 WIB',
                period: 'closing',
                category: 'CLOSING',
                title: 'Closing Ceremony, Community Awards & Grand Doorprize',
                description: 'Apresiasi mitra sponsor, pengundian grand prize perangkat teknologi, perumusan agenda kolaborasi bersama, dan sesi foto keluarga besar KOMITKABE.',
                speakerName: 'Ketua Panitia Afriyanto & Pengurus KOMITKABE',
                speakerRole: 'Organizing Committee & Leadership',
                companyName: 'KOMITKABE',
                stage: 'Panggung Utama & Videotron',
                status: 'CONFIRMED',
            },
        ];
        for (const item of scheduleData) {
            await prisma.scheduleSession.create({
                data: item,
            });
        }
        console.log(`✅ ${scheduleData.length} Schedule Sessions seeded.`);
    } else {
        console.log(`ℹ️ ${existingSessions} Schedule Sessions already exist, skipping schedule seed.`);
    }
    console.log('🎉 Seed completed successfully!');
}
main()
    .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
