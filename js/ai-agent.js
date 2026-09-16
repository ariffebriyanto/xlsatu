/**
 * XL Satu - Maya AI Agent Controller (Luxury 24/7 Smart Assistant)
 * Menggunakan dynamic context dari SiteDB.
 * Mampu menjawab seluruh paket, promo 4 bulan, wifi tanpa kabel, area jangkauan,
 * cara daftar, dan otomatis mengalihkan ke Customer Service resmi jika bingung/kendala teknis.
 */

(function() {
    let chatHistory = [];
    let isInitialized = false;

    // Greeting pembuka
    const INITIAL_BOT_MESSAGE = 
        `Halo! 👋 Saya **Maya**, Asisten AI resmi XL Satu Fiber & Home Broadband.\n\n` +
        `Ada yang bisa saya bantu hari ini? Anda bisa menanyakan promo paket hemat, wifi tanpa kabel, cara daftar 5 menit, atau jika ada kendala, saya siap mengalihkan langsung ke Customer Service resmi XL!`;

    const DEFAULT_SUGGESTIONS = [
        "🔥 Promo Bayar 4 Bulan",
        "📶 Wifi Tanpa Kabel 100 Mbps",
        "🚀 Paket Fiber Tercepat",
        "📍 Cek Area Jangkauan",
        "📝 Cara Daftar 5 Menit",
        "📞 Hubungi Customer Service"
    ];

    // Buka/Tutup Chat Widget
    window.toggleAIChat = function() {
        const widget = document.getElementById('ai-chat-widget');
        if (!widget) return;
        const isActive = widget.classList.contains('active');
        if (isActive) {
            widget.classList.remove('active');
        } else {
            widget.classList.add('active');
            if (!isInitialized) {
                initChatSession();
            }
            setTimeout(() => {
                document.getElementById('ai-chat-input')?.focus();
            }, 300);
        }
    };

    window.closeAIChat = function() {
        const widget = document.getElementById('ai-chat-widget');
        if (widget) widget.classList.remove('active');
    };

    window.clearAIChat = function() {
        chatHistory = [];
        const container = document.getElementById('ai-chat-messages');
        if (container) container.innerHTML = '';
        renderBotMessage(INITIAL_BOT_MESSAGE, DEFAULT_SUGGESTIONS);
    };

    function initChatSession() {
        isInitialized = true;
        renderBotMessage(INITIAL_BOT_MESSAGE, DEFAULT_SUGGESTIONS);
    }

    // Render pesan User
    function renderUserMessage(text) {
        const container = document.getElementById('ai-chat-messages');
        if (!container) return;

        const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const div = document.createElement('div');
        div.className = 'ai-msg user';
        div.innerHTML = `
            <div class="ai-msg-bubble">${escapeHtml(text)}</div>
            <div class="ai-msg-time">${time}</div>
        `;
        container.appendChild(div);
        scrollToBottom();
    }

    // Render pesan Bot Maya AI
    function renderBotMessage(text, suggestions = [], csHandoff = null) {
        const container = document.getElementById('ai-chat-messages');
        if (!container) return;

        const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const div = document.createElement('div');
        div.className = 'ai-msg bot';

        // Format Markdown sederhana (bold, list, newline)
        let formattedText = escapeHtml(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');

        let chipsHtml = '';
        if (suggestions && suggestions.length > 0) {
            chipsHtml = `
                <div class="ai-chips-wrapper">
                    ${suggestions.map(s => `<button type="button" class="ai-chip" onclick="handleChipClick('${escapeAttr(s)}')">${s}</button>`).join('')}
                </div>
            `;
        }

        let handoffHtml = '';
        if (csHandoff) {
            handoffHtml = renderHandoffButtons(csHandoff);
        }

        div.innerHTML = `
            <div class="ai-msg-bubble">
                ${formattedText}
                ${handoffHtml}
            </div>
            ${chipsHtml}
            <div class="ai-msg-time">Maya AI • ${time}</div>
        `;

        container.appendChild(div);
        scrollToBottom();
    }

    // Helper format nomor agar SELALU diawali 62
    function formatTo62(rawPhone) {
        if (!rawPhone) return '';
        let clean = String(rawPhone).replace(/[^0-9]/g, '');
        if (clean.startsWith('0')) {
            clean = '62' + clean.substring(1);
        } else if (clean && !clean.startsWith('62')) {
            clean = '62' + clean;
        }
        return clean;
    }

    // Kotak tombol pengalihan ke Customer Service resmi
    function renderHandoffButtons(opts = {}) {
        const data = window.SiteDB ? window.SiteDB.getData() : window.DEFAULT_SITE_DATA;
        const cc = data.customerCare || {};
        const waContacts = data.whatsappContacts || {};
        const sales = data.salesRep || {};

        const csWa = formatTo62(waContacts.customerCare || cc.whatsapp || '628170010820');
        const salesWa = formatTo62(waContacts.sales || waContacts.registration || sales.phone || '6285755836988');
        const xlPhone = cc.xlUserPhone || '820';
        const nonXlPhone = formatTo62(cc.nonXlPhone || '628170123442');

        const inquiryText = encodeURIComponent(opts.inquiry ? `Halo CS XL Satu, saya ada pertanyaan/kendala: "${opts.inquiry}"` : 'Halo CS Resmi XL Satu, saya membutuhkan bantuan');

        return `
            <div class="ai-cs-handoff-box">
                <div class="ai-cs-handoff-title">
                    <i class="bi bi-headset"></i> Saluran Customer Service Resmi XL Satu:
                </div>
                <div class="ai-cs-buttons">
                    <a href="https://wa.me/${csWa}?text=${inquiryText}" target="_blank" class="ai-cs-btn wa">
                        <i class="bi bi-whatsapp"></i> Chat WhatsApp CS (${csWa})
                    </a>
                    <a href="tel:${xlPhone}" class="ai-cs-btn call-xl">
                        <i class="bi bi-telephone-fill"></i> Call 820 (Bebas Pulsa Khusus Kartu XL)
                    </a>
                    <a href="tel:${nonXlPhone}" class="ai-cs-btn call-xl" style="background: #334155;">
                        <i class="bi bi-telephone-outbound"></i> Call PSTN / Non-XL (${nonXlPhone})
                    </a>
                    <a href="https://wa.me/${salesWa}?text=Halo%20Mas%20ONES,%20saya%20ingin%20konsultasi%20daftar%20XL%20Satu" target="_blank" class="ai-cs-btn sales">
                        <i class="bi bi-person-badge-fill"></i> Hubungi Sales ONES (${salesWa})
                    </a>
                </div>
            </div>
        `;
    }

    window.handleChipClick = function(chipText) {
        // Hilangkan icon jika ada
        const clean = chipText.replace(/^[\uD800-\uDBFF\uDC00-\uDFFF\s]+/g, '').trim();
        processUserInput(clean);
    };

    window.handleAIChatSubmit = function(e) {
        e.preventDefault();
        const input = document.getElementById('ai-chat-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        processUserInput(text);
    };

    // Proses pertanyaan pengunjung dengan NLP Engine
    function processUserInput(query) {
        renderUserMessage(query);
        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator();
            const response = generateAIResponse(query);
            renderBotMessage(response.text, response.suggestions, response.csHandoff);
        }, 500 + Math.random() * 400); // Simulasi waktu berpikir AI yang natural
    }

    // =========================================================================
    // INTELLIGENT KNOWLEDGE RETRIEVER & FALLBACK TO CS
    // =========================================================================
    function generateAIResponse(query) {
        const q = query.toLowerCase().trim();
        const data = window.SiteDB ? window.SiteDB.getData() : window.DEFAULT_SITE_DATA;

        // 1. KENDALA TEKNIS / GANGGUAN / KOMPLAIN -> Langsung alihkan ke CS
        if (
            q.includes('gangguan') || q.includes('mati') || q.includes('lemot') ||
            q.includes('rusak') || q.includes('putus') || q.includes('merah') ||
            q.includes('los') || q.includes('komplain') || q.includes('lapor') ||
            q.includes('error') || q.includes('benerin') || q.includes('teknisi datang') ||
            q.includes('tagihan salah') || q.includes('kendala')
        ) {
            return {
                text: `Mohon maaf atas ketidaknyamanan yang Anda alami. 😔\n\nUntuk kendala teknis atau gangguan koneksi, penanganan memerlukan pengecekan langsung pada ID Pelanggan dan perangkat modem Anda. Saya alihkan Anda langsung ke tim **Customer Service Resmi XL Satu (Siaga 24 Jam)** di bawah ini agar segera dibantu:`,
                suggestions: ["📞 Tanya Nomor CS Lainnya", "📝 Daftar Pasang Baru"],
                csHandoff: { inquiry: query }
            };
        }

        // 2. INGIN BICARA DENGAN CS / MANUSIA
        if (
            q.includes('cs') || q.includes('customer service') || q.includes('customer care') ||
            q.includes('operator') || q.includes('manusia') || q.includes('orang') ||
            q.includes('call center') || q.includes('hubungi cs') || q.includes('nomor cs')
        ) {
            return {
                text: `Tentu! Berikut adalah kontak resmi **Media Customer Care XL Satu** yang siaga 24 jam setiap hari:\n\n• **Call Center 820**: Khusus pengguna kartu XL (Bebas Pulsa/Tarif Lokal)\n• **Telepon 628170123442**: Untuk pengguna Non-XL & Telepon Rumah\n• **WhatsApp Customer Care**: 628170010820\n• **Email**: xlsatucs@xlsmart.co.id\n\nSilakan klik salah satu tombol cepat di bawah ini untuk langsung terhubung:`,
                suggestions: ["🔥 Promo 4 Bulan", "🚀 Paket Fiber Tercepat", "📶 Wifi Tanpa Kabel"],
                csHandoff: { inquiry: 'Bantuan Customer Care' }
            };
        }

        // 3. PROMO BAYAR 4 BULAN
        if (q.includes('promo') || q.includes('4 bulan') || q.includes('bayar 4') || q.includes('180') || q.includes('hemat')) {
            return {
                text: `🎉 **PROMO HEMAT BAYAR 4 BULAN LANGSUNG** adalah pilihan paling diminati saat ini!\n\n` +
                      `1. **50 Mbps Unlimited**: Total **Rp 721.500** untuk 4 bulan (setara **Rp 180.000/bln**)\n` +
                      `2. **100 Mbps Unlimited**: Total **Rp 876.900** untuk 4 bulan (setara **Rp 219.000/bln**)\n\n` +
                      `🎁 **Bonus & Keuntungan:**\n` +
                      `• Sudah termasuk PPN 11%\n` +
                      `• GRATIS Biaya Pasang & GRATIS Sewa Router\n` +
                      `• BONUS 3 Bulan Vidio Lite & CATCHPLAY+\n` +
                      `• Pendaftaran cukup 5 menit via E-KYC KTP!`,
                suggestions: ["📝 Cara Daftar 5 Menit", "📶 Info Wifi Tanpa Kabel", "📍 Cek Area Jangkauan"]
            };
        }

        // 4. WIFI RUMAH TANPA KABEL (HOME BROADBAND WIRELESS)
        if (q.includes('tanpa kabel') || q.includes('wireless') || q.includes('colok') || q.includes('router') || q.includes('tiang')) {
            return {
                text: `📶 **WIFI RUMAH TANPA KABEL (HOME BROADBAND 100 Mbps)**\n\n` +
                      `Sangat cocok bagi Anda yang rumahnya jauh dari tiang fiber optik atau ingin serba praktis:\n\n` +
                      `• **Kecepatan**: 100 Mbps Wireless\n` +
                      `• **Biaya**: **Rp 243.000 / bulan** (Sudah termasuk PPN)\n` +
                      `• **Kepraktisan**: Tinggal colok ke stopkontak listrik langsung aktif!\n` +
                      `• **Garansi**: HARGA TETAP & TIDAK BERUBAH selama berlangganan\n` +
                      `• **Gratis**: Bebas biaya pasang & sewa alat router 4 antena modern.`,
                suggestions: ["📝 Mau Daftar Wireless Ini", "🔥 Promo 4 Bulan", "🚀 Paket Fiber FTTH"]
            };
        }

        // 5. DAFTAR PAKET FIBER FTTH (KABEL FIBER)
        if (q.includes('paket') || q.includes('harga') || q.includes('ftth') || q.includes('fiber') || q.includes('kecepatan') || q.includes('spark') || q.includes('1 gbps')) {
            const pkgs = data.packages || [];
            let pkgList = pkgs.slice(0, 5).map(p => `• **${p.name}** (${p.speed}): ${p.price} ${p.period}`).join('\n');
            return {
                text: `⚡ **PILIHAN PAKET INTERNET KABEL FIBER (FTTH):**\n\n${pkgList}\n\n` +
                      `⭐ **Paling Favorit Keluarga**: **SPARK 150 (Speed Up to 350 Mbps)** seharga **Rp 309.000/bln**.\n` +
                      `👑 **Speed Monster**: **SPARK EXTREM Up to 1 Gbps** seharga **Rp 999.000/bln**.\n\n` +
                      `Semua paket sudah unlimited tanpa FUP penurunan kecepatan!`,
                suggestions: ["🔥 Promo 4 Bulan 180rb", "📝 Mau Daftar Sekarang", "📍 Cek Jangkauan"]
            };
        }

        // 6. CARA DAFTAR / SYARAT / PROSES
        if (q.includes('daftar') || q.includes('registrasi') || q.includes('syarat') || q.includes('pasang baru') || q.includes('e-kyc') || q.includes('ktp') || q.includes('proses')) {
            return {
                text: `📝 **CARA DAFTAR PASANG BARU SANGAT MUDAH (CUKUP 5 MENIT):**\n\n` +
                      `1. Siapkan foto KTP Anda untuk proses sistem **E-KYC Resmi XL Axiata**.\n` +
                      `2. Isi **Formulir Pendaftaran** di halaman website ini (pastikan nomor WA diawali 62).\n` +
                      `3. Atau langsung chat Sales Representative resmi kami (**Mas ONES: 6285755836988**).\n` +
                      `4. Tim teknisi akan segera menghubungi Anda untuk penjadwalan pemasangan ke rumah!`,
                suggestions: ["🔥 Lihat Promo Termurah", "📞 Chat Mas ONES WhatsApp"]
            };
        }

        // 7. AREA COVERAGE / JANGKAUAN
        if (q.includes('area') || q.includes('jangkauan') || q.includes('surabaya') || q.includes('sidoarjo') || q.includes('gresik') || q.includes('wilayah') || q.includes('lokasi')) {
            return {
                text: `📍 **WILAYAH JANGKAUAN RESMI XL SATU:**\n\n` +
                      `Saat ini jaringan Fiber Optik dan Wireless Broadband XL Satu telah meng-cover penuh wilayah **Surabaya, Sidoarjo, Gresik**, serta kota-kota besar di seluruh Indonesia!\n\n` +
                      `Untuk memastikan titik rumah Anda sudah masuk jaringan tiang fiber terdekat, kirimkan alamat lengkap atau share live location ke Sales Mas ONES.`,
                suggestions: ["📝 Daftar Cek Titik Rumah", "🔥 Info Promo Hemat"]
            };
        }

        // 8. SALES ONES
        if (q.includes('sales') || q.includes('ones') || q.includes('mas ones') || q.includes('kontak sales')) {
            return {
                text: `👤 **SALES REPRESENTATIVE RESMI XL SATU:**\n\n` +
                      `• **Nama**: Mas ONES\n` +
                      `• **WhatsApp / Telepon**: **6285755836988**\n` +
                      `• **Layanan**: Pendaftaran Pasang Baru 5 Menit via E-KYC, Cek Jangkauan, Konsultasi Paket.\n\n` +
                      `Pendaftaran aman, cepat, dan amanah!`,
                suggestions: ["🔥 Promo 4 Bulan", "📝 Mau Daftar Sekarang"]
            };
        }

        // 9. DEVELOPER / PARTNER (ARIF SOFT)
        if (q.includes('arif soft') || q.includes('developer') || q.includes('pembuat') || q.includes('pembuat web') || q.includes('programmer')) {
            return {
                text: `💻 Website dan sistem manajemen CMS XL Satu ini dirancang, didukung, dan dikembangkan secara profesional oleh **Arif Soft** (WhatsApp/Telepon: **6282113842783**).`,
                suggestions: ["🔥 Promo 4 Bulan", "🚀 Paket Fiber", "📞 Hubungi CS"]
            };
        }

        // 10. SAPAAN (GREETING)
        if (q.includes('halo') || q.includes('hai') || q.includes('pagi') || q.includes('siang') || q.includes('sore') || q.includes('malam') || q.includes('assalamualaikum') || q.includes('test')) {
            return {
                text: `Halo! Selamat datang di layanan informasi resmi XL Satu Fiber & Broadband. 😊\n\nAda yang bisa saya bantu jelaskan? Anda bisa memilih salah satu topik di bawah atau tanyakan langsung:`,
                suggestions: ["🔥 Promo 4 Bulan 180rb", "📶 Wifi Tanpa Kabel", "🚀 Paket Fiber FTTH", "📞 Hubungi Customer Service"]
            };
        }

        // 11. UCAPAN TERIMA KASIH
        if (q.includes('terima kasih') || q.includes('makasih') || q.includes('thank') || q.includes('ok') || q.includes('oke') || q.includes('sip') || q.includes('baik')) {
            return {
                text: `Sama-sama! Senang bisa membantu Anda. Jika ada pertanyaan lain seputar internet XL Satu atau butuh bantuan lebih lanjut, jangan ragu untuk bertanya lagi ya. Semoga hari Anda menyenangkan! 🌟`,
                suggestions: ["🔥 Promo 4 Bulan", "📝 Cara Daftar 5 Menit", "📞 Hubungi CS Resmi"]
            };
        }

        // 12. CHECK CUSTOM FAQS IN DATABASE
        const faqs = data.faqs || [];
        for (let f of faqs) {
            const fq = (f.question || '').toLowerCase();
            const words = q.split(' ').filter(w => w.length > 3);
            const isMatch = words.some(w => fq.includes(w));
            if (isMatch) {
                return {
                    text: `💡 **${f.question}**\n\n${f.answer}`,
                    suggestions: ["🔥 Promo 4 Bulan", "📝 Cara Daftar 5 Menit", "📞 Hubungi CS Resmi"]
                };
            }
        }

        // 13. FALLBACK: BINGUNG MENJAWAB / TIDAK DITEMUKAN DI KNOWLEDGE BASE -> ALIKAN KE CS
        return {
            text: `Pertanyaan Anda belum tercakup dalam basis data otomatis saya. 🤔\n\nAgar Anda mendapatkan jawaban yang akurat dan tuntas, saya alihkan langsung ke **Customer Service resmi XL Satu** yang siaga membantu Anda 24 jam setiap hari:`,
            suggestions: ["🔥 Promo 4 Bulan 180rb", "🚀 Paket Fiber Tercepat", "📶 Wifi Tanpa Kabel"],
            csHandoff: { inquiry: query }
        };
    }

    function showTypingIndicator() {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.style.display = 'flex';
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.style.display = 'none';
    }

    function scrollToBottom() {
        const container = document.getElementById('ai-chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function escapeAttr(str) {
        if (!str) return '';
        return String(str).replace(/'/g, "\\'");
    }

})();
