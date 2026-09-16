/**
 * XL Satu - CMS Data Store & State Management (V2 Luxury Edition)
 * Berisi seluruh data resmi dari 6 flyer gambar di folder iwan:
 * - Customer Care 820, Non-XL 08170123442, WA Care 08170010820
 * - Sales Representative: ONES 085755836988
 * - Area Jangkauan: Surabaya, Sidoarjo, Gresik
 * - Paket Kabel FTTH, Tanpa Kabel Wireless, dan Promo 4 Bulan Langsung
 * - Penghargaan Ookla Speedtest #1 Jaringan Terbaik & Tercepat
 * - Didukung oleh: arif soft 082113842783
 */

const DEFAULT_SITE_DATA = {
    settings: {
        siteTitle: "XL Satu Fiber & Home Broadband - Wifi Rumah Terbaik, Cepat, Murah & Amanah",
        siteTagline: "Wifi Rumah Terbaik Mulai Rp 180 Ribuan | Jaringan #1 Di Indonesia",
        brandName: "XL SATU",
        coverageArea: "Surabaya, Sidoarjo, Gresik & Seluruh Indonesia",
        supportedBy: "arif soft 6282113842783",
        supportedPhone: "6282113842783",
        supportedWhatsapp: "6282113842783",
        copyrightYear: 2026,
        brochureDisplayMode: "grid", // "grid" | "slider" | "carousel"
        brochureTemplate: {
            autoPlay: true,
            interval: 4000,
            cardTheme: "cyber",
            columns: 3
        }
    },
    salesRep: {
        name: "ONES",
        role: "Official Sales Representative XL Satu",
        phone: "6285755836988",
        phoneRaw: "6285755836988",
        messageText: "Halo Mas ONES, saya ingin konsultasi dan daftar pasang XL Satu",
        badge: "Pendaftaran Cukup 5 Menit dengan E-KYC"
    },
    customerCare: {
        title: "Media Customer Care Resmi XL Satu",
        subtitle: "Layanan bantuan pelanggan dan pengaduan resmi 24 jam setiap hari",
        xlUserPhone: "820",
        xlUserLabel: "Khusus Pengguna Kartu XL (Bebas Pulsa/Tarif Lokal)",
        nonXlPhone: "62817 0123 442",
        nonXlLabel: "Pengguna Non-XL & Telepon Rumah",
        whatsapp: "62817 0010 820",
        whatsappRaw: "628170010820",
        whatsappLabel: "Chat WhatsApp Resmi Customer Care 24 Jam",
        email: "xlsatucs@xlsmart.co.id",
        emailLabel: "Email Resmi Dukungan Pelanggan",
        workingHours: "24 Jam Non-Stop (Senin - Minggu)"
    },
    hero: {
        badge: "👑 JARINGAN #1 DI INDONESIA • TERCEPAT, TERLUAS, TERBAIK",
        title: "Wifi Rumah Terbaik, Murah, Cepat & Amanah",
        subtitle: "Solusi internet fiber optik dan broadband tanpa kabel terlengkap di Surabaya, Sidoarjo, & Gresik. Pendaftaran ga ribet, cukup 5 menit dengan E-KYC!",
        startingPrice: "Mulai Rp 180 rban",
        ctaPrimaryText: "Daftar Cepat via WhatsApp",
        ctaSecondaryText: "Lihat Brosur & Paket",
        promoNote: "✓ Bebas Biaya Pasang*  ✓ Gratis Sewa Alat Router  ✓ Bonus Vidio & Catchplay+ 3 Bulan"
    },
    // Galeri Brosur & Flyer Lengkap dari folder iwan
    brochures: [
        {
            id: "brochure-1",
            title: "Wifi Rumah Terbaik Mulai 180rb",
            tag: "Hero Promo",
            image: "assets/images/hero-wifi-terbaik.jpeg",
            desc: "Brosur utama paket kabel & tanpa kabel, pendaftaran 5 menit via E-KYC, Sales ONES 085755836988."
        },
        {
            id: "brochure-2",
            title: "Promo Hemat Bayar 4 Bulan Langsung",
            tag: "Special Promo",
            image: "assets/images/promo-4bulan-unlimited.jpeg",
            desc: "Speed up to 50 Mbps Rp 721.500 & 100 Mbps Rp 876.900 (termasuk PPN) + Bonus OTT 3 Bulan."
        },
        {
            id: "brochure-3",
            title: "Daftar Paket Kabel FTTH Surabaya-Sidoarjo-Gresik",
            tag: "Paket FTTH",
            image: "assets/images/daftar-paket-surabaya.jpeg",
            desc: "Paket lengkap Spark 100 hingga Spark Extrem 1 Gbps, plus paket hemat Basic Starter 20 Mbps."
        },
        {
            id: "brochure-4",
            title: "Wifi Rumah Tanpa Kabel (Home Broadband)",
            tag: "Wireless Router",
            image: "assets/images/wifi-tanpa-kabel.jpeg",
            desc: "Broadband tanpa kabel dengan router multi-antena, harga tetap & terjangkau garansi tidak berubah."
        },
        {
            id: "brochure-5",
            title: "Media Customer Care Resmi XL Satu",
            tag: "Official Support",
            image: "assets/images/customer-care-xlsatu.jpeg",
            desc: "Flyer resmi kontak CS: 820 (XL), 0817 0123 442 (Non-XL), WA 0817 0010 820, Email xlsatucs."
        },
        {
            id: "brochure-6",
            title: "Penghargaan Jaringan #1 Ookla Speedtest",
            tag: "Award & Prestise",
            image: "assets/images/xl-ultra-5g-award.jpeg",
            desc: "XL Ultra 5G+: Jaringan Terbaik, 5G Terbaik, dan 5G Tercepat versi Ookla Speedtest."
        }
    ],
    // Paket Internet Lengkap Sesuai Data Flyer (Bisa Tambah, Edit, Hapus)
    packages: [
        // KATEGORI 1: PROMO BAYAR 4 BULAN LANGSUNG
        {
            id: "pkg-promo-50",
            category: "promo4bln",
            name: "PROMO 4 BULAN 50 Mbps",
            speed: "50 Mbps Unlimited",
            price: "Rp 721.500",
            period: "untuk 4 bulan langsung",
            monthlyEquivalent: "Setara Rp 180.000 / bln",
            nextMonthPrice: "Bulan ke-5 dst: Rp 222.000 / bln",
            quotaHp: "Termasuk PPN 11%",
            familyMembers: "Instalasi Kabel / Tanpa Kabel",
            badge: "🔥 Super Hemat Bayar 4 Bulan",
            isPopular: true,
            features: [
                "Kecepatan Up to 50 Mbps Unlimited",
                "Tanpa Kuota FUP Menurun",
                "GRATIS Biaya Pemasangan",
                "GRATIS Sewa Perangkat Router",
                "BONUS OTT: Gratis 3 Bulan Vidio Lite & CATCHPLAY+",
                "Minimal Berlangganan 12 Bulan"
            ],
            ctaText: "Ambil Promo 50 Mbps"
        },
        {
            id: "pkg-promo-100",
            category: "promo4bln",
            name: "PROMO 4 BULAN 100 Mbps",
            speed: "100 Mbps Unlimited",
            price: "Rp 876.900",
            period: "untuk 4 bulan langsung",
            monthlyEquivalent: "Setara Rp 219.000 / bln",
            nextMonthPrice: "Bulan ke-5 dst: Rp 243.090 / bln",
            quotaHp: "Termasuk PPN 11%",
            familyMembers: "Instalasi Kabel / Tanpa Kabel",
            badge: "⚡ Best Value & Speed",
            isPopular: true,
            features: [
                "Kecepatan Up to 100 Mbps Unlimited",
                "Tanpa Kuota FUP Menurun",
                "GRATIS Biaya Pemasangan",
                "GRATIS Sewa Perangkat Router",
                "BONUS OTT: Gratis 3 Bulan Vidio Lite & CATCHPLAY+",
                "Minimal Berlangganan 12 Bulan"
            ],
            ctaText: "Ambil Promo 100 Mbps"
        },

        // KATEGORI 2: PAKET FTTH (KABEL FIBER OPTIK) SURABAYA - SIDOARJO - GRESIK
        {
            id: "pkg-basic-starter",
            category: "ftth",
            name: "BASIC STARTER",
            speed: "20 Mbps",
            price: "Rp 232.000",
            period: "/bulan",
            monthlyEquivalent: "Biaya Pasang 111rb",
            nextMonthPrice: "",
            quotaHp: "Bonus Kuota Bersama XL 8 GB/bln",
            familyMembers: "Gratis 2 Kartu Perdana XL",
            badge: "Paket Ekonomis",
            isPopular: false,
            features: [
                "Kecepatan Fiber 20 Mbps",
                "Bonus Kuota Bersama XL 8 GB/bln",
                "Gratis 2 Kartu Perdana XL",
                "Internet Rumah + Kuota Seluler",
                "Layanan Siaga 24 Jam"
            ],
            ctaText: "Pilih Basic Starter"
        },
        {
            id: "pkg-spark-starter",
            category: "ftth",
            name: "SPARK STARTER",
            speed: "20 Mbps",
            price: "Rp 205.000",
            period: "/bulan",
            monthlyEquivalent: "Biaya Pasang 111rb",
            nextMonthPrice: "",
            quotaHp: "Internet Only",
            familyMembers: "Paket Mandiri",
            badge: "Harga Paling Terjangkau",
            isPopular: false,
            features: [
                "Kecepatan Fiber 20 Mbps",
                "Unlimited Tanpa FUP",
                "Koneksi Stabil Kabel Fiber",
                "Termasuk Sewa Router Wi-Fi",
                "Customer Care 24 Jam"
            ],
            ctaText: "Pilih Spark Starter"
        },
        {
            id: "pkg-spark-100",
            category: "ftth",
            name: "SPARK 100",
            speed: "Up to 250 Mbps",
            price: "Rp 254.000",
            period: "/bulan",
            monthlyEquivalent: "Internet Only",
            nextMonthPrice: "",
            quotaHp: "Speed Booster 250 Mbps",
            familyMembers: "Keluarga Digital",
            badge: "Kecepatan Tinggi",
            isPopular: false,
            features: [
                "Speed Up to 250 Mbps",
                "100% True Fiber Optic",
                "Unlimited Tanpa FUP",
                "Cocok untuk Streaming HD & WFH",
                "Termasuk Router Wi-Fi Fiber"
            ],
            ctaText: "Pilih Spark 100"
        },
        {
            id: "pkg-spark-150",
            category: "ftth",
            name: "SPARK 150",
            speed: "Up to 350 Mbps",
            price: "Rp 309.000",
            period: "/bulan",
            monthlyEquivalent: "Internet Only",
            nextMonthPrice: "",
            quotaHp: "Speed Booster 350 Mbps",
            familyMembers: "Pilihan Utama Keluarga",
            badge: "⭐ FAVORIT KELUARGA",
            isPopular: true,
            features: [
                "Speed Up to 350 Mbps",
                "Paket Paling Diminati Pelanggan",
                "Anti-lag Gaming & Streaming 4K",
                "Unlimited Kuota Tanpa Penurunan Kecepatan",
                "Dukungan Teknisi Prioritas"
            ],
            ctaText: "Pilih Spark 150 (Favorit)"
        },
        {
            id: "pkg-spark-300",
            category: "ftth",
            name: "SPARK 300",
            speed: "Up to 400 Mbps",
            price: "Rp 332.000",
            period: "/bulan",
            monthlyEquivalent: "Internet Only",
            nextMonthPrice: "",
            quotaHp: "Speed Booster 400 Mbps",
            familyMembers: "Multi-Device Rumah Mewah",
            badge: "Super Fast",
            isPopular: false,
            features: [
                "Speed Up to 400 Mbps",
                "Mampu Tangani Puluhan Gadget Sekaligus",
                "Upload & Download Simetris Cepat",
                "Sangat Cocok untuk Rumah Bertingkat",
                "Router Wi-Fi Dual Band"
            ],
            ctaText: "Pilih Spark 300"
        },
        {
            id: "pkg-spark-ultra",
            category: "ftth",
            name: "SPARK ULTRA",
            speed: "Up to 600 Mbps",
            price: "Rp 555.000",
            period: "/bulan",
            monthlyEquivalent: "Internet Only",
            nextMonthPrice: "",
            quotaHp: "Speed Booster 600 Mbps",
            familyMembers: "Rumah & Content Creator",
            badge: "Ultra Fast Performance",
            isPopular: false,
            features: [
                "Speed Up to 600 Mbps",
                "Cocok untuk Content Creator & Live Streaming",
                "Ping Ultra Rendah untuk E-Sports",
                "Instalasi Jalur Khusus Fiber",
                "Customer Care VIP 24/7"
            ],
            ctaText: "Pilih Spark Ultra"
        },
        {
            id: "pkg-spark-extrem",
            category: "ftth",
            name: "SPARK EXTREM",
            speed: "Up to 1 Gbps (1000 Mbps)",
            price: "Rp 999.000",
            period: "/bulan",
            monthlyEquivalent: "Internet Only",
            nextMonthPrice: "",
            quotaHp: "Speed Maksimal 1 Gbps",
            familyMembers: "Ultimate High-End",
            badge: "👑 1 Gbps ULTIMATE",
            isPopular: false,
            features: [
                "Kecepatan Monster Hingga 1 Gbps",
                "Performa Puncak Tanpa Hambatan",
                "Ideal untuk Smart Home & Usaha Rumahan",
                "VIP Dedicated Bandwidth",
                "Prioritas Tertinggi Layanan Teknisi"
            ],
            ctaText: "Pilih Spark Extrem 1 Gbps"
        },

        // KATEGORI 3: WIFI TANPA KABEL (HOME BROADBAND WIRELESS)
        {
            id: "pkg-wireless-100-monthly",
            category: "wireless",
            name: "HOME BROADBAND 100 Mbps (NEW)",
            speed: "100 Mbps",
            price: "Rp 243.000",
            period: "/bulan",
            monthlyEquivalent: "Sudah Termasuk PPN",
            nextMonthPrice: "Harga Tetap & Terjangkau",
            quotaHp: "Tanpa Perlu Tarik Kabel",
            familyMembers: "Tinggal Colok Listrik Langsung Nyala",
            badge: "PRODUK BARU • WIRELESS",
            isPopular: true,
            features: [
                "Kecepatan 100 Mbps Tanpa Kabel",
                "Gratis Biaya Pasang & Sewa Alat",
                "Bonus Vidio Lite & CATCHPLAY+ 3 Bulan",
                "DIJAMIN HARGA TIDAK BERUBAH selama berlangganan",
                "Sangat Praktis, Router Modern 4 Antena"
            ],
            ctaText: "Pilih Wireless 100 Mbps"
        }
    ],
    // FAQ Komprehensif Sesuai Brosur
    faqs: [
        {
            id: "faq-1",
            question: "Bagaimana cara mendaftar pasang baru XL Satu secara cepat?",
            answer: "Pendaftaran sangat mudah dan ga pake lama, cukup 5 menit dengan sistem E-KYC! Anda dapat langsung menghubungi Sales Representative resmi kami (ONES: 085755836988) atau klik tombol WhatsApp di website ini."
        },
        {
            id: "faq-2",
            question: "Berapa harga promo termurah untuk XL Satu?",
            answer: "Melalui Promo Bayar 4 Bulan Langsung, Anda bisa menikmati internet kecepatan 50 Mbps seharga Rp 721.500 (setara Rp 180.000/bulan) atau 100 Mbps seharga Rp 876.900 (setara Rp 219.000/bulan) sudah termasuk PPN 11%, gratis sewa router, dan gratis biaya pasang!"
        },
        {
            id: "faq-3",
            question: "Wilayah mana saja yang sudah terjangkau jaringan ini?",
            answer: "Saat ini jaringan kabel FTTH dan Home Broadband Wireless XL Satu telah hadir di seluruh wilayah Surabaya, Sidoarjo, Gresik, serta berbagai kota besar lainnya di Indonesia."
        },
        {
            id: "faq-4",
            question: "Apa bedanya paket Kabel (FTTH) dan Tanpa Kabel (Home Broadband)?",
            answer: "Paket Kabel (FTTH) menggunakan sambungan kabel fiber optik langsung ke dalam rumah hingga kecepatan 1 Gbps. Sedangkan Wifi Rumah Tanpa Kabel menggunakan perangkat router wireless modern tanpa perlu penarikan kabel fisik, sangat praktis tinggal colok ke stopkontak listrik."
        },
        {
            id: "faq-5",
            question: "Bagaimana cara menghubungi Media Customer Care resmi?",
            answer: "Sesuai flyer resmi XL Satu, Customer Care dapat dihubungi melalui: Call Center 820 (Khusus pengguna nomor XL), 0817 0123 442 (Pengguna Non-XL & Telp Rumah), WhatsApp 0817 0010 820, dan email ke xlsatucs@xlsmart.co.id (Siaga 24 Jam)."
        },
        {
            id: "faq-6",
            question: "Siapa pengembang dan pendukung sistem website ini?",
            answer: "Website ini didukung, dirancang, dan dikembangkan secara profesional oleh Arif Soft (WhatsApp/Telepon: 082113842783)."
        }
    ],
    // Autentikasi Pengelola Admin CMS (Username & Password bisa diedit di Admin)
    auth: {
        username: "admin",
        password: "admin123"
    },
    // Kontak WhatsApp Terpadu yang bisa diedit di Admin CMS
    whatsappContacts: {
        sales: "6285755836988",
        registration: "6285755836988",
        customerCare: "62817 0010 820",
        supportedDev: "6282113842783"
    },
    // Ulasan / Testimoni Pelanggan (Review "Kata Mereka")
    reviews: [
        {
            id: "rev-1",
            name: "Budi Santoso",
            city: "Rungkut, Surabaya",
            packageName: "SPARK 150 (Up to 350 Mbps)",
            rating: 5,
            date: "12 September 2026",
            comment: "Pasang buat kebutuhan WFH dan streaming keluarga, sinyal kencang dan stabil banget. Sales Mas ONES responsif banget, pendaftaran 5 menit langsung diproses dan besoknya teknisi langsung pasang rapi!",
            avatar: "BS"
        },
        {
            id: "rev-2",
            name: "Ibu Dian Pratiwi",
            city: "Waru, Sidoarjo",
            packageName: "Promo 4 Bulan 100 Mbps",
            rating: 5,
            date: "08 September 2026",
            comment: "Promo bayar 4 bulan langsung sangat hemat, jatuhnya cuma sekitar 219rb/bulan dan sudah dapat bonus Vidio Catchplay+. Internetan lancar tanpa kuota habis, anak-anak sekolah online senang.",
            avatar: "DP"
        },
        {
            id: "rev-3",
            name: "Ahmad Faisal",
            city: "Kebomas, Gresik",
            packageName: "Home Broadband Wireless 100 Mbps",
            rating: 5,
            date: "01 September 2026",
            comment: "Rumah saya agak jauh dari tiang fiber, langsung disolusi dengan Wifi Rumah Tanpa Kabel XL Satu. Tinggal colok listrik langsung nyala ngebut. CS dan salesnya ramah serta amanah!",
            avatar: "AF"
        },
        {
            id: "rev-4",
            name: "dr. Hendra Gunawan",
            city: "Kertajaya, Surabaya",
            packageName: "SPARK 300 (Up to 400 Mbps)",
            rating: 5,
            date: "28 Agustus 2026",
            comment: "Keluarga kami banyak pakai gadget sekaligus, pakai Spark 300 dari lantai 1 sampai lantai 2 lancar jaya buat zoom meeting video call dan gaming. Sangat memuaskan.",
            avatar: "HG"
        }
    ],
    // Database Formulir Pendaftaran Masuk (Leads Pendaftar)
    registrations: []
};

// ==========================================================================
// SUPABASE CLOUD DATABASE CLIENT (PRIMARY CLOUD DATABASE FOR VERCEL)
// Connected to: https://yvvpbiwvouqinrbpvfnx.supabase.co
// Table: site_store
// Absolutely NO localStorage used
// ==========================================================================
const SupabaseClient = {
    URL: 'https://yvvpbiwvouqinrbpvfnx.supabase.co',
    KEY: 'sb_publishable_gvn532gjNoaWrJSKZeNHkg_RwOsdngR',
    _client: null,

    getClient: function() {
        if (this._client) return this._client;
        try {
            if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
                this._client = window.supabase.createClient(this.URL, this.KEY);
                return this._client;
            }
        } catch (e) {
            console.warn('[SupabaseClient] Gagal inisialisasi client:', e);
        }
        return null;
    },

    loadData: async function() {
        try {
            const client = this.getClient();
            if (!client) return null;
            const { data, error } = await client
                .from('site_store')
                .select('data')
                .eq('id', 'main_site_data')
                .maybeSingle();

            if (error) {
                console.warn('[SupabaseClient] Info loadData:', error.message);
                return null;
            }
            if (data && data.data) {
                console.log('[SupabaseClient] ✅ Data berhasil dimuat dari Supabase Cloud');
                return data.data;
            }
            return null;
        } catch (err) {
            console.warn('[SupabaseClient] Network error loadData:', err);
            return null;
        }
    },

    saveData: async function(siteData) {
        try {
            const client = this.getClient();
            if (!client) return false;
            const { error } = await client
                .from('site_store')
                .upsert({
                    id: 'main_site_data',
                    data: siteData,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (error) {
                console.warn('[SupabaseClient] Simpan ke Supabase dicek/gagal:', error.message);
                return false;
            }
            console.log('[SupabaseClient] 🚀 Berhasil tersimpan di Supabase Cloud!');
            return true;
        } catch (err) {
            console.warn('[SupabaseClient] Error saveData:', err);
            return false;
        }
    }
};

// ==========================================================================
// SQLITE DATABASE STORE (OFFLINE & LOCAL BACKUP)
// Database Engine: SQLite (xlsatu.db via node:sqlite + IndexedDB Client Backup)
// Absolutely NO localStorage used
// ==========================================================================
const SQLiteClient = {
    DB_NAME: 'xlsatu_sqlite_db',
    STORE_NAME: 'sqlite_store',
    _dbPromise: null,

    // Buka koneksi IndexedDB untuk SQLite binary/JSON store
    getDb: function() {
        if (this._dbPromise) return this._dbPromise;
        this._dbPromise = new Promise((resolve) => {
            if (typeof window === 'undefined' || !window.indexedDB) {
                resolve(null);
                return;
            }
            try {
                const req = indexedDB.open(this.DB_NAME, 1);
                req.onupgradeneeded = (e) => {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                        db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
                    }
                };
                req.onsuccess = (e) => resolve(e.target.result);
                req.onerror = () => resolve(null);
            } catch (err) {
                resolve(null);
            }
        });
        return this._dbPromise;
    },

    saveClient: async function(data) {
        try {
            const db = await this.getDb();
            if (!db) return false;
            return new Promise((resolve) => {
                const tx = db.transaction(this.STORE_NAME, 'readwrite');
                const store = tx.objectStore(this.STORE_NAME);
                store.put({ id: 'main_site_data', data: data, updated_at: new Date().toISOString() });
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    },

    loadClient: async function() {
        try {
            const db = await this.getDb();
            if (!db) return null;
            return new Promise((resolve) => {
                const tx = db.transaction(this.STORE_NAME, 'readonly');
                const store = tx.objectStore(this.STORE_NAME);
                const req = store.get('main_site_data');
                req.onsuccess = () => resolve(req.result ? req.result.data : null);
                req.onerror = () => resolve(null);
            });
        } catch (e) {
            return null;
        }
    },

    clearClient: async function() {
        try {
            const db = await this.getDb();
            if (!db) return false;
            return new Promise((resolve) => {
                const tx = db.transaction(this.STORE_NAME, 'readwrite');
                const store = tx.objectStore(this.STORE_NAME);
                store.delete('main_site_data');
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (e) {
            return false;
        }
    }
};

// Database Store Manager
const SiteDB = {
    _memoryData: null,
    _isInitialized: false,
    _engine: 'Supabase Cloud Database (PostgreSQL)',

    _sanitize: function(parsed) {
        if (!parsed || typeof parsed !== 'object') parsed = {};
        return {
            settings: { ...DEFAULT_SITE_DATA.settings, ...(parsed.settings || {}) },
            salesRep: { ...DEFAULT_SITE_DATA.salesRep, ...(parsed.salesRep || {}) },
            customerCare: { ...DEFAULT_SITE_DATA.customerCare, ...(parsed.customerCare || {}) },
            hero: { ...DEFAULT_SITE_DATA.hero, ...(parsed.hero || {}) },
            auth: { ...DEFAULT_SITE_DATA.auth, ...(parsed.auth || {}) },
            whatsappContacts: { ...DEFAULT_SITE_DATA.whatsappContacts, ...(parsed.whatsappContacts || {}) },
            brochures: Array.isArray(parsed.brochures) ? parsed.brochures : DEFAULT_SITE_DATA.brochures,
            packages: Array.isArray(parsed.packages) ? parsed.packages : DEFAULT_SITE_DATA.packages,
            faqs: Array.isArray(parsed.faqs) ? parsed.faqs : DEFAULT_SITE_DATA.faqs,
            reviews: Array.isArray(parsed.reviews) ? parsed.reviews : DEFAULT_SITE_DATA.reviews,
            registrations: Array.isArray(parsed.registrations) ? parsed.registrations : DEFAULT_SITE_DATA.registrations
        };
    },

    // Inisialisasi: Supabase Cloud -> SQLite API -> SQLite Client Store (IndexedDB)
    init: async function() {
        if (this._isInitialized) return;
        this._isInitialized = true;

        // Bersihkan sisa localStorage lama agar 100% bebas dari localStorage
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.removeItem('xlsatu_site_data_v2');
                window.localStorage.removeItem('xlsatu_site_data_v1');
            }
        } catch (e) {}

        // 1. Prioritas Utama: Load dari Supabase Cloud
        try {
            const cloudData = await SupabaseClient.loadData();
            if (cloudData && (cloudData.packages || cloudData.settings)) {
                this._memoryData = this._sanitize(cloudData);
                await SQLiteClient.saveClient(this._memoryData);
                window.dispatchEvent(new Event('xlsatu_data_updated'));
                console.log('[SiteDB] ✅ Sinkronisasi aktif dengan Supabase Cloud!');
                return;
            }
        } catch (e) {
            console.warn('[SiteDB] Supabase cloud belum siap / offline:', e);
        }

        // 2. Fallback: Load dari SQLite Server API (/api/data)
        try {
            const resp = await fetch('/api/data', { cache: 'no-store' });
            if (resp.ok) {
                const serverData = await resp.json();
                if (serverData && (serverData.packages || serverData.settings)) {
                    this._memoryData = this._sanitize(serverData);
                    await SQLiteClient.saveClient(this._memoryData);
                    window.dispatchEvent(new Event('xlsatu_data_updated'));
                    console.log('[SiteDB] Berhasil sinkronisasi dari SQLite server (xlsatu.db)');
                    // Coba upload ke Supabase jika server punya data terbaru
                    SupabaseClient.saveData(this._memoryData);
                    return;
                }
            }
        } catch (e) {
            // Server offline, lanjut ke SQLite client store
        }

        // 3. Fallback: Load dari SQLite Client Store (IndexedDB)
        const clientData = await SQLiteClient.loadClient();
        if (clientData) {
            this._memoryData = this._sanitize(clientData);
            window.dispatchEvent(new Event('xlsatu_data_updated'));
            console.log('[SiteDB] Data dimuat dari SQLite/IndexedDB client store');
            // Coba upload ke Supabase jika client punya data tersimpan
            SupabaseClient.saveData(this._memoryData);
        } else {
            this._memoryData = this._sanitize(DEFAULT_SITE_DATA);
            await SQLiteClient.saveClient(this._memoryData);
            SupabaseClient.saveData(this._memoryData);
        }
    },

    getData: function() {
        if (!this._memoryData) {
            this._memoryData = this._sanitize(DEFAULT_SITE_DATA);
            this.init();
        }
        return JSON.parse(JSON.stringify(this._memoryData));
    },

    saveData: function(data) {
        try {
            this._memoryData = this._sanitize(data);

            // 1. Simpan ke Supabase Cloud (Real-Time Cloud Persistence)
            SupabaseClient.saveData(this._memoryData);

            // 2. Simpan ke SQLite server API (xlsatu.db) jika ada
            if (typeof fetch !== 'undefined') {
                fetch('/api/data', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this._memoryData)
                }).catch(err => {
                    // silent fallback
                });
            }

            // 3. Simpan ke SQLite client store (IndexedDB)
            SQLiteClient.saveClient(this._memoryData);

            // 4. Emit event update
            window.dispatchEvent(new Event('xlsatu_data_updated'));
            return true;
        } catch (e) {
            console.error('[SiteDB] Gagal menyimpan data:', e);
            return false;
        }
    },

    resetToDefault: function() {
        try {
            this._memoryData = this._sanitize(DEFAULT_SITE_DATA);

            // Simpan default ke Supabase Cloud
            SupabaseClient.saveData(this._memoryData);

            // Panggil API reset server jika ada
            if (typeof fetch !== 'undefined') {
                fetch('/api/reset', { method: 'POST' }).catch(() => {});
            }

            SQLiteClient.clearClient();
            SQLiteClient.saveClient(this._memoryData);

            window.dispatchEvent(new Event('xlsatu_data_updated'));
            return this._memoryData;
        } catch (e) {
            console.error('[SiteDB] Gagal reset:', e);
            return null;
        }
    },

    // Mode Tampilan Flyer (Grid | Slider | Carousel)
    updateBrochureDisplayMode: function(mode, templateOptions) {
        const data = this.getData();
        if (!data.settings) data.settings = {};
        data.settings.brochureDisplayMode = mode || 'grid';
        if (templateOptions) {
            data.settings.brochureTemplate = {
                ...(data.settings.brochureTemplate || {}),
                ...templateOptions
            };
        }
        this.saveData(data);
        return data.settings.brochureDisplayMode;
    },

    getBrochureDisplayMode: function() {
        const data = this.getData();
        return data.settings?.brochureDisplayMode || 'grid';
    },

    getEngineInfo: function() {
        return {
            engine: this._engine,
            database: 'xlsatu.db',
            storage: 'SQLite Engine (node:sqlite + IndexedDB Fallback)',
            localStorageUsed: false
        };
    },

    // CRUD: Packages
    addPackage: function(pkg) {
        const data = this.getData();
        const newPkg = {
            id: 'pkg-' + Date.now(),
            category: pkg.category || 'ftth',
            name: pkg.name || 'Paket Baru',
            speed: pkg.speed || '50 Mbps',
            price: pkg.price || 'Rp 300.000',
            period: pkg.period || '/bulan',
            monthlyEquivalent: pkg.monthlyEquivalent || '',
            nextMonthPrice: pkg.nextMonthPrice || '',
            quotaHp: pkg.quotaHp || '',
            familyMembers: pkg.familyMembers || '',
            badge: pkg.badge || '',
            isPopular: !!pkg.isPopular,
            features: Array.isArray(pkg.features) ? pkg.features : ["Koneksi Stabil", "Layanan 24/7"],
            ctaText: pkg.ctaText || 'Pilih Paket'
        };
        data.packages.push(newPkg);
        this.saveData(data);
        return newPkg;
    },

    updatePackage: function(id, fields) {
        const data = this.getData();
        const index = data.packages.findIndex(p => p.id === id);
        if (index !== -1) {
            data.packages[index] = { ...data.packages[index], ...fields };
            this.saveData(data);
            return data.packages[index];
        }
        return null;
    },

    deletePackage: function(id) {
        const data = this.getData();
        const prev = data.packages.length;
        data.packages = data.packages.filter(p => p.id !== id);
        if (data.packages.length !== prev) {
            this.saveData(data);
            return true;
        }
        return false;
    },

    // CRUD: FAQ
    addFaq: function(newFaq) {
        const data = this.getData();
        const faq = {
            id: 'faq-' + Date.now(),
            question: newFaq.question || 'Pertanyaan?',
            answer: newFaq.answer || 'Jawaban.'
        };
        data.faqs.push(faq);
        this.saveData(data);
        return faq;
    },

    updateFaq: function(id, fields) {
        const data = this.getData();
        const index = data.faqs.findIndex(f => f.id === id);
        if (index !== -1) {
            data.faqs[index] = { ...data.faqs[index], ...fields };
            this.saveData(data);
            return data.faqs[index];
        }
        return null;
    },

    deleteFaq: function(id) {
        const data = this.getData();
        const prev = data.faqs.length;
        data.faqs = data.faqs.filter(f => f.id !== id);
        if (data.faqs.length !== prev) {
            this.saveData(data);
            return true;
        }
        return false;
    },

    exportJson: function() {
        const data = this.getData();
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `xlsatu_data_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // CRUD: REVIEWS ("KATA MEREKA")
    addReview: function(review) {
        const data = this.getData();
        const initials = (review.name || "Pelanggan")
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

        const newReview = {
            id: 'rev-' + Date.now(),
            name: review.name || 'Pelanggan XL Satu',
            city: review.city || 'Surabaya',
            packageName: review.packageName || 'XL Satu Fiber',
            rating: parseInt(review.rating, 10) || 5,
            date: review.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            comment: review.comment || 'Layanan memuaskan dan koneksi stabil.',
            avatar: initials || 'XL'
        };
        data.reviews.unshift(newReview);
        this.saveData(data);
        return newReview;
    },

    updateReview: function(id, fields) {
        const data = this.getData();
        const index = data.reviews.findIndex(r => r.id === id);
        if (index !== -1) {
            data.reviews[index] = { ...data.reviews[index], ...fields };
            this.saveData(data);
            return data.reviews[index];
        }
        return null;
    },

    deleteReview: function(id) {
        const data = this.getData();
        const prev = data.reviews.length;
        data.reviews = data.reviews.filter(r => r.id !== id);
        if (data.reviews.length !== prev) {
            this.saveData(data);
            return true;
        }
        return false;
    },

    // CRUD: REGISTRATIONS (PENDAFTARAN ONLINE)
    addRegistration: function(reg) {
        const data = this.getData();
        const now = new Date();
        const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' +
                        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        // Pastikan format nomor telepon/WhatsApp selalu diawali 62
        let p = (reg.phone || '').replace(/[^0-9]/g, '');
        if (p.startsWith('0')) {
            p = '62' + p.substring(1);
        } else if (p && !p.startsWith('62')) {
            p = '62' + p;
        }

        const newReg = {
            id: 'reg-' + Date.now(),
            name: reg.name || '',
            phone: p || reg.phone || '',
            email: reg.email || '',
            address: reg.address || '',
            packageName: reg.packageName || 'Belum Ditentukan',
            notes: reg.notes || '',
            date: dateStr,
            status: 'Baru'
        };
        data.registrations.unshift(newReg);
        this.saveData(data);
        return newReg;
    },

    deleteRegistration: function(id) {
        const data = this.getData();
        data.registrations = (data.registrations || []).filter(r => String(r.id) !== String(id));
        this.saveData(data);
        return true;
    },

    clearRegistrations: function() {
        const data = this.getData();
        data.registrations = [];
        this.saveData(data);
        return true;
    },

    // CRUD: BROCHURES / FLYERS INFO
    addBrochure: function(item) {
        const data = this.getData();
        const newBrochure = {
            id: 'brochure-' + Date.now(),
            title: item.title || 'Brosur Baru',
            tag: item.tag || 'Promo',
            image: item.image || 'assets/images/hero-wifi-terbaik.jpeg',
            desc: item.desc || 'Deskripsi informasi brosur.'
        };
        data.brochures.push(newBrochure);
        this.saveData(data);
        return newBrochure;
    },

    updateBrochure: function(id, fields) {
        const data = this.getData();
        const index = data.brochures.findIndex(b => b.id === id);
        if (index !== -1) {
            data.brochures[index] = { ...data.brochures[index], ...fields };
            this.saveData(data);
            return data.brochures[index];
        }
        return null;
    },

    deleteBrochure: function(id) {
        const data = this.getData();
        const prev = data.brochures.length;
        data.brochures = data.brochures.filter(b => b.id !== id);
        if (data.brochures.length !== prev) {
            this.saveData(data);
            return true;
        }
        return false;
    },

    // AUTH & CREDENTIALS MANAGEMENT
    checkAuth: function(username, password) {
        const data = this.getData();
        const auth = data.auth || DEFAULT_SITE_DATA.auth;
        return (username === auth.username && password === auth.password);
    },

    updateAuth: function(newUsername, newPassword) {
        const data = this.getData();
        data.auth = {
            username: newUsername.trim(),
            password: newPassword.trim()
        };
        this.saveData(data);
        return true;
    },

    // WHATSAPP CONTACTS MANAGEMENT
    updateWhatsappContacts: function(contacts) {
        const data = this.getData();
        data.whatsappContacts = {
            ...data.whatsappContacts,
            ...contacts
        };
        // Update also salesRep and customerCare to stay in perfect sync
        if (contacts.sales) {
            data.salesRep.phone = contacts.sales;
            data.salesRep.phoneRaw = contacts.sales.replace(/[^0-9]/g, '');
        }
        if (contacts.customerCare) {
            data.customerCare.whatsapp = contacts.customerCare;
            data.customerCare.whatsappRaw = contacts.customerCare.replace(/[^0-9]/g, '');
        }
        this.saveData(data);
        return true;
    },

    importJson: function(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (parsed && typeof parsed === 'object') {
                this.saveData(parsed);
                return { success: true };
            }
            return { success: false, error: "Format file JSON tidak valid." };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }
};

window.SiteDB = SiteDB;
window.DEFAULT_SITE_DATA = DEFAULT_SITE_DATA;

// Inisialisasi awal SQLite database
if (typeof window !== 'undefined') {
    SiteDB.init();
}
