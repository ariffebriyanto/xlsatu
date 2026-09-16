# 🌐 XL Satu Fiber & Home Broadband - Website & CMS Portal

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://github.com/ariffebriyanto/xlsatu)
[![Author](https://img.shields.io/badge/Supported%20By-Arif%20Soft%20082113842783-004ae8)](https://wa.me/6282113842783)

Website resmi promosi paket internet rumah **XL Satu Fiber** (Kabel FTTH) dan **Home Broadband** (Wireless Router) untuk wilayah Surabaya, Sidoarjo, Gresik, dan seluruh Indonesia. Dilengkapi dengan **Portal CMS Admin Lengkap (Full CRUD)** berdesain modern *WordPress-inspired* untuk mengelola paket, data pendaftar (leads), review pelanggan, brosur flyer, kontak WhatsApp, dan akun admin.

---

## ✨ Fitur Utama Website

### 1. 🏠 Landing Page Publik (`index.html`)
- **Luxury Telecom Design:** Estetika antarmuka modern dengan tipografi elegan, gradien biru cyan, dark mode accents, dan animasi interaktif.
- **Katalog Pilihan Paket (Filter Kategori):**
  - 🔥 *Promo Bayar 4 Bulan Langsung* (Setara mulai Rp 180.000 / bln)
  - ⚡ *Paket Kabel FTTH Fiber Optik* (20 Mbps hingga monster 1 Gbps)
  - 📶 *Wifi Rumah Tanpa Kabel (Home Broadband Wireless Router)*
- **📋 Formulir Pendaftaran Online (Kirim ke WhatsApp):**
  - Form input: Nama, No HP/WA, Email, Pilihan Paket, Alamat Lengkap Pemasangan, dan Catatan.
  - Mengirim rekap data pendaftaran otomatis yang rapi ke WhatsApp Sales Resmi.
  - Data pendaftar otomatis tersimpan ke tabel Leads di Dashboard Admin.
- **⭐ Kata Mereka (Review & Testimoni Pelanggan):**
  - Menampilkan ulasan terverifikasi pelanggan Surabaya, Sidoarjo, & Gresik.
  - Pengunjung dapat mengirimkan ulasan secara langsung melalui formulir pop-up.
- **🖼️ Galeri 6 Brosur Flyer Resmi:** Lightbox modal interaktif untuk melihat dan mengunduh flyer resolusi penuh.
- **📞 Media Customer Care Resmi 24 Jam:**
  - Call Center 820 (Khusus Pengguna XL)
  - 0817 0123 442 (Pengguna Non-XL & Telepon Rumah)
  - WhatsApp CS 0817 0010 820
  - Email Dukungan: xlsatucs@xlsmart.co.id
- **🏆 Penghargaan Jaringan #1 Ookla Speedtest:** Sertifikat resmi jaringan terbaik, 5G terbaik, dan 5G tercepat.
- **❓ Tanya Jawab (FAQ) Accordion.**
- **🟢 Floating Speed Dial:** Tombol cepat WhatsApp Sales (ONES: 085755836988) dan Call Center 820.

---

### 2. ⚙️ Dashboard Admin CMS (`admin.html`)
- **🔐 Login Gate & Keamanan:** Dilindungi login username & password.
- **👥 Pendaftaran Masuk (Leads):** Tabel daftar pemohon pasang baru dengan fitur langsung *Chat WhatsApp* atau hapus lead.
- **📦 Kelola Paket Internet (CRUD):** Tambah, edit harga/kecepatan/kategori/fitur, dan hapus paket internet.
- **⭐ Kelola Review Pelanggan (CRUD):** Tambah testimoni baru, ubah ulasan, atau hapus review.
- **🖼️ Kelola Brosur & Flyer Info & Template Mode:** Edit judul, tag, ganti URL gambar, upload file gambar langsung dari komputer, serta pilih mode tampilan flyer di website: **Grid (Galeri)**, **Slider (Geser Horizontal)**, atau **Carousel (Panggung Putar Otomatis)**.
- **💾 Database SQLite (xlsatu.db):** Menggunakan engine database SQLite nyata berbasis Node.js bawaan (`node:sqlite`), menggantikan LocalStorage sepenuhnya dengan performa handal dan backup terintegrasi.
- **📱 Pengaturan Kontak WhatsApp Terpadu:** Ubah nomor WA Sales, WA Pendaftaran, WA CS, dan WA Developer secara terpusat.
- **👤 Akun & Password Admin:** Ubah username dan password login admin dengan konfirmasi password.
- **💾 Backup & Restore JSON:** Ekspor seluruh data website ke file JSON dan impor data kembali kapan saja.

---

## 🔑 Kredensial Login Admin Bawaan

| Akun | Kredensial Default | Keterangan |
| :--- | :--- | :--- |
| **URL Admin** | `http://localhost:3000/admin.html` | Panel Kontrol CMS |
| **Username** | `admin` | Bisa diubah di menu Akun Admin |
| **Password** | `admin123` | Bisa diubah di menu Akun Admin |
| **Database** | `xlsatu.db` | SQLite Database di root project |

---

## 🚀 Cara Menjalankan Project

### Menggunakan Server SQLite (Direkomendasikan)
```bash
# Jalankan server SQLite lokal di port 3000
npm start
# atau
npm run dev
```
Buka browser di:
- Landing Page: **http://localhost:3000**
- CMS Admin: **http://localhost:3000/admin.html**
- Status Database: **http://localhost:3000/api/db-info**

---

## 📂 Struktur Folder

```text
├── server.js                # Server HTTP & API REST SQLite (node:sqlite)
├── xlsatu.db                # File database SQLite utama
├── assets/
│   └── images/              # 6 Brosur flyer asli resmi
├── css/
│   ├── style.css            # Stylesheet utama landing page (Grid, Slider, Carousel)
│   └── admin.css            # Stylesheet CMS admin dashboard & mobile modal
├── js/
│   ├── data.js              # Database client SQLite & state manager
│   ├── main.js              # Frontend rendering & mode interaksi flyer
│   └── admin.js             # Controller admin CMS & pemilihan template
├── index.html               # Halaman utama landing page & formulir
├── admin.html               # Halaman dashboard admin CMS
├── vercel.json              # Konfigurasi routing & cache Vercel
├── package.json             # NPM start & dev scripts
├── .gitignore               # File ignore git
└── README.md                # Dokumentasi lengkap project
```

---

## 👨‍💻 Pengembang & Dukungan Sistem

Website & CMS System ini didukung dan dikembangkan secara profesional oleh:
- **Pengembang:** Arif Soft
- **Telepon / WhatsApp:** [082113842783](https://wa.me/6282113842783)
- **Sales Representative Resmi:** ONES ([085755836988](https://wa.me/6285755836988))
- **Hak Cipta:** &copy; 2026 XL Satu Fiber. All rights reserved.
