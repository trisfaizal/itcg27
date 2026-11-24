# KOMITKABE 6th IT Community Gathering 2027 (ITCG 2027)

Aplikasi web fullstack resmi **KOMITKABE 6th IT Community Gathering 2027 (ITCG 2027)** dengan konsep desain **Modular Geometric Identity: Hybrid & Layered** (30° slanted modular ribbons & chamfered interlocking cards) mengangkat filosofi *"Different Industries. Different People. One Community."*

---

## 🛠 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router, Standalone Output) + TypeScript
- **Styling & UI:** Tailwind CSS, Lucide React, Google Fonts (`Montserrat` & `Inter`)
- **Database & ORM:** MySQL 8.0 + Prisma ORM
- **Containerization:** Docker Multi-stage build & Docker Compose

---

## 🚀 Panduan Menjalankan Aplikasi via Docker

### 1. Prasyarat
- Docker Engine dan Docker Compose telah terpasang.

### 2. Salin Konfigurasi Environment
```bash
cp .env.example .env
```
Isi konfigurasi default pada `.env`:
```env
MYSQL_ROOT_PASSWORD="your_mysql_root_password_here"
MYSQL_DATABASE="itcg2027_db"
MYSQL_USER="itcg_user"
MYSQL_PASSWORD="your_db_password_here"
DATABASE_URL="mysql://itcg_user:your_db_password_here@localhost:3306/itcg2027_db"
ADMIN_PASSWORD="komitkabe_admin_2027"
NODE_ENV="production"
PORT=3000
```

### 3. Jalankan Aplikasi dengan Docker Compose
Jalankan satu perintah berikut di root repository:
```bash
docker compose up -d --build
```

Container `web` akan secara otomatis:
1. Menunggu container `db` (MySQL 8.0) siap dan sehat (*healthy*).
2. Menjalankan sinkronisasi skema basis data via `npx prisma db push`.
3. Menjalankan seed data awal otomatis (`prisma/seed.js`) mencakup tier kuota awal (Platinum 6, Gold 12, Silver 12), demo sponsor terkonfirmasi, dan warta live update.
4. Memulai server web Next.js pada port `3000`.

### 4. Akses Halaman Web
- **Halaman Utama (Beranda Publik & Live Showcase):**
  [http://localhost:3000](http://localhost:3000)
- **Halaman Khusus Sponsorship:**
  [http://localhost:3000/sponsors](http://localhost:3000/sponsors)
- **Portal Panitia / Admin Dashboard:**
  [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔐 Cara Mengakses Panel Admin Panitia (`/admin`)

1. Buka browser dan arahkan ke [http://localhost:3000/admin](http://localhost:3000/admin).
2. Jika belum masuk, Anda akan diarahkan ke halaman login [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
3. Masukkan password admin resmi:
   ```text
   komitkabe_admin_2027
   ```
   *(Password dapat disesuaikan melalui variabel `ADMIN_PASSWORD` di `.env`).*
4. Di dalam Dashboard Panitia, Anda dapat:
   - **Manajemen Sponsor:** Tambah, edit, hapus sponsor, pilih tier (`PLATINUM`, `GOLD`, `SILVER`), status (`CONFIRMED`, `RESERVED`), upload file logo langsung (tersimpan persisten di volume `./public/uploads`), dan atur nomor urut tampil.
   - **Manajemen Kuota Target:** Sesuaikan target kapasitas slot kuota per tier (default: 6, 12, 12). Sistem publik tetap fleksibel menampilkan seluruh sponsor terkonfirmasi bila kapasitas bertambah.
   - **Manajemen Live Update:** Tambah, perbarui, dan hapus warta progres persiapan acara di beranda publik secara real-time.

---

## 📂 Struktur Direktori Utama
```
├── docker-compose.yml          # Konfigurasi Docker multi-container (web + db)
├── Dockerfile                  # Multi-stage production build Next.js standalone
├── docker-entrypoint.sh        # Entrypoint otomatis prisma push + seed + start
├── prisma/
│   ├── schema.prisma           # Skema MySQL (SponsorTier, Sponsor, EventUpdate)
│   ├── seed.ts                 # Script seeding TypeScript
│   └── seed.js                 # Script seeding Node.js runtime
├── public/
│   ├── images/                 # Aset grafis resmi (itcg-logo.svg, komitkabe-logo.png, dll)
│   └── uploads/sponsors/       # Direktori penyimpanan logo sponsor (volume persisten)
└── src/
    ├── app/
    │   ├── page.tsx            # Beranda utama (Hero, Profil CONNECT, Live Update, Rundown, Denah, Callout)
    │   ├── sponsors/page.tsx   # Halaman kemitraan lengkap, daftar sponsor & form WhatsApp/Email
    │   ├── admin/page.tsx      # Dashboard panitia dengan proteksi cookie HTTP-only
    │   └── api/                # REST endpoints untuk CRUD sponsor, kuota tier, update & upload
    ├── components/             # Komponen visual modular & interaktif
    └── lib/                    # Prisma client, auth session helper, & fallback data
```

---

## 🏛 Identitas Acara
- **Acara:** KOMITKABE 6th IT Community Gathering 2027 (ITCG 2027)
- **Tema:** *INTELLIGENCE IN MOTION: Driving Smart Industry. Securing the Future.*
- **Waktu:** 16 - 17 Januari 2027 • 08:30 - 18:00 WIB
- **Venue:** Grand Ballroom Sutan Raja Hotel and Convention Centre, Soreang, Bandung
- **Kontak Resmi:** `official@komitkabe.id` • `partnership@komitkabe.id`
