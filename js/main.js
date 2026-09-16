/**
 * XL Satu - Frontend Rendering & Interactive UI (Luxury Edition)
 * Didukung oleh arif soft 082113842783
 */

let activeCategoryFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initLuxuryLandingPage();

    // Auto-format input nomor WhatsApp pendaftaran: jika ketik 0 otomatis berubah jadi 62
    const regPhoneInput = document.getElementById('reg-user-phone');
    if (regPhoneInput) {
        regPhoneInput.addEventListener('input', function() {
            let val = this.value;
            if (val.startsWith('0')) {
                this.value = '62' + val.substring(1);
            } else if (val.startsWith('+62')) {
                this.value = '62' + val.substring(3);
            }
        });
    }

    // Re-render jika ada perubahan data dari CMS Admin
    window.addEventListener('xlsatu_data_updated', () => {
        initLuxuryLandingPage();
    });
    window.addEventListener('storage', (e) => {
        if (e.key === 'xlsatu_site_data_v2' || e.key === 'xlsatu_site_data_v1') {
            initLuxuryLandingPage();
        }
    });
});

function initLuxuryLandingPage() {
    const data = window.SiteDB ? window.SiteDB.getData() : window.DEFAULT_SITE_DATA;
    if (!data) return;

    // Meta & Title
    document.title = data.settings.siteTitle || "XL Satu Fiber & Home Broadband - Wifi Rumah Terbaik";

    // Coverage Area Ticker
    const tickerEl = document.getElementById('ticker-coverage-text');
    if (tickerEl) {
        tickerEl.textContent = `Kini Telah Hadir di Seluruh Wilayah ${data.settings.coverageArea || 'Surabaya, Sidoarjo, Gresik'} • Dapatkan Promo Spesial Hari Ini!`;
    }

    // Hero Section
    const heroBadge = document.getElementById('hero-badge');
    const heroHeading = document.getElementById('hero-heading');
    const heroSubtext = document.getElementById('hero-subtext');
    const heroPriceGlow = document.getElementById('hero-price-glow');
    const heroFlyerImg = document.getElementById('hero-flyer-img');
    const heroPromoNote = document.getElementById('hero-promo-note');

    if (heroBadge) heroBadge.innerHTML = `<i class="bi bi-award-fill"></i> ${escapeHtml(data.hero.badge || 'JARINGAN #1 DI INDONESIA • TERCEPAT, TERLUAS, TERBAIK')}`;
    if (heroHeading) {
        heroHeading.innerHTML = `Wifi Rumah <span class="gradient-text">Terbaik</span>, Murah, Cepat & Amanah`;
    }
    if (heroSubtext) heroSubtext.textContent = data.hero.subtitle;
    if (heroPriceGlow) heroPriceGlow.textContent = data.hero.startingPrice || "Mulai Rp 180 rban";
    if (heroPromoNote) heroPromoNote.textContent = data.hero.promoNote;
    if (heroFlyerImg) {
        const heroImgSrc = (data.brochures && data.brochures[0]?.image) ? data.brochures[0].image : 'assets/images/hero-wifi-terbaik.jpeg';
        heroFlyerImg.src = heroImgSrc;
    }

    // Sales Representative Banner & WhatsApp Links
    const sales = data.salesRep || window.DEFAULT_SITE_DATA.salesRep;
    const waContacts = data.whatsappContacts || window.DEFAULT_SITE_DATA.whatsappContacts || {};
    const salesWaNumber = waContacts.sales || sales.phone || "085755836988";
    const cleanSalesWa = salesWaNumber.replace(/[^0-9]/g, '');

    const salesName = document.getElementById('sales-rep-name');
    const salesPhone = document.getElementById('sales-rep-phone');
    const salesBtn = document.getElementById('sales-rep-btn');
    const navBtnWa = document.getElementById('nav-btn-wa');
    const heroBtnWa = document.getElementById('hero-btn-wa');

    if (salesName) salesName.textContent = `${sales.name || 'ONES'} - ${sales.role || 'Official Sales Representative'}`;
    if (salesPhone) salesPhone.textContent = `WhatsApp: ${salesWaNumber}`;
    if (salesBtn) {
        salesBtn.href = `https://wa.me/${cleanSalesWa}?text=${encodeURIComponent(sales.messageText || 'Halo Mas ONES, saya mau konsultasi pasang XL Satu')}`;
    }
    if (navBtnWa) {
        navBtnWa.href = `https://wa.me/${cleanSalesWa}?text=${encodeURIComponent('Halo Mas ONES, saya mau tanya pendaftaran XL Satu')}`;
    }
    if (heroBtnWa) {
        heroBtnWa.href = `https://wa.me/${cleanSalesWa}?text=${encodeURIComponent('Halo Mas ONES, saya mau daftar pasang XL Satu')}`;
    }

    // Render Packages
    renderFilteredPackages(data.packages, sales, data.customerCare, cleanSalesWa);

    // Populate Registration Form Package Options
    populateRegistrationPackages(data.packages);

    // Render Reviews / Kata Mereka
    renderReviews(data.reviews || window.DEFAULT_SITE_DATA.reviews);

    // Render Brochures Gallery (Grid / Slider / Carousel Mode)
    renderBrochuresGallery(data.brochures || window.DEFAULT_SITE_DATA.brochures, data.settings?.brochureDisplayMode, data.settings?.brochureTemplate);

    // Render Customer Care Official Contacts
    renderCustomerCareCards(data.customerCare);

    // Render FAQ Accordion
    renderFaqs(data.faqs);

    // Floating Speed Dial
    const floatWa = document.getElementById('float-wa-sales');
    const floatCare = document.getElementById('float-care-call');
    if (floatWa) {
        floatWa.href = `https://wa.me/${cleanSalesWa}?text=Halo%20Mas%20ONES,%20saya%20tertarik%20dengan%20paket%20XL%20Satu`;
    }
    if (floatCare) {
        floatCare.href = `tel:${data.customerCare.xlUserPhone || '820'}`;
    }

    // Footer Supported by Arif Soft
    const footerSupportText = document.getElementById('footer-support-text');
    const footerSupportPhone = document.getElementById('footer-support-phone');
    const footerSupportBtn = document.getElementById('footer-support-btn');
    const arifPhone = waContacts.supportedDev || data.settings.supportedPhone || "082113842783";
    const arifWa = arifPhone.replace(/[^0-9]/g, '');

    if (footerSupportText) footerSupportText.textContent = `Supported by ${data.settings.supportedBy || 'arif soft 082113842783'}`;
    if (footerSupportPhone) footerSupportPhone.textContent = `Telp/WA: ${arifPhone}`;
    if (footerSupportBtn) {
        footerSupportBtn.href = `https://wa.me/${arifWa}?text=Halo%20Arif%20Soft,%20saya%20menghubungi%20dari%20website%20XL%20Satu`;
    }
}

// ==========================================================================
// RENDER PACKAGES WITH CATEGORY FILTER TABS
// ==========================================================================
window.filterPackages = function(category, buttonEl) {
    activeCategoryFilter = category;

    // Update active class on tab buttons
    document.querySelectorAll('.tab-pill').forEach(btn => btn.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    const data = window.SiteDB ? window.SiteDB.getData() : window.DEFAULT_SITE_DATA;
    const cleanSalesWa = (data.whatsappContacts?.sales || data.salesRep?.phone || "085755836988").replace(/[^0-9]/g, '');
    renderFilteredPackages(data.packages, data.salesRep, data.customerCare, cleanSalesWa);
};

function renderFilteredPackages(packages, salesRep, customerCare, cleanSalesWa) {
    const container = document.getElementById('packages-container');
    if (!container) return;

    let filtered = packages || [];
    if (activeCategoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategoryFilter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px; background: white; border-radius: 16px;">
                <p style="color: #64748b; font-size: 16px;">Tidak ada paket dalam kategori ini. Silakan tambahkan paket di <a href="admin.html#paket" style="color: #004ae8; font-weight: bold;">Dashboard Admin</a>.</p>
            </div>
        `;
        return;
    }

    const waNum = cleanSalesWa || (salesRep?.phone || "085755836988").replace(/[^0-9]/g, '');

    container.innerHTML = filtered.map(pkg => `
        <div class="card-luxury-package ${pkg.isPopular ? 'highlighted' : ''}">
            ${pkg.badge ? `<div class="pkg-top-badge">${escapeHtml(pkg.badge)}</div>` : ''}
            <div class="pkg-title">${escapeHtml(pkg.name)}</div>
            <div class="pkg-speed-display">${escapeHtml(pkg.speed)}</div>

            <div class="pkg-pricing-box">
                <div class="price-main">${escapeHtml(pkg.price)} <span class="price-tenor">${escapeHtml(pkg.period || '')}</span></div>
                ${pkg.monthlyEquivalent ? `<div class="price-monthly-hint"><i class="bi bi-tag-fill"></i> ${escapeHtml(pkg.monthlyEquivalent)}</div>` : ''}
                ${pkg.nextMonthPrice ? `<div style="font-size: 12px; color: #64748b; margin-top: 3px;">${escapeHtml(pkg.nextMonthPrice)}</div>` : ''}
            </div>

            ${(pkg.quotaHp || pkg.familyMembers) ? `
            <div class="pkg-bonus-strip">
                ${pkg.quotaHp ? `<div class="pkg-bonus-item"><i class="bi bi-phone-vibrate-fill"></i> ${escapeHtml(pkg.quotaHp)}</div>` : ''}
                ${pkg.familyMembers ? `<div class="pkg-bonus-item"><i class="bi bi-shield-fill-check"></i> ${escapeHtml(pkg.familyMembers)}</div>` : ''}
            </div>` : ''}

            <ul class="pkg-feature-list">
                ${(pkg.features || []).map(f => `<li><i class="bi bi-check-circle-fill"></i> ${escapeHtml(f)}</li>`).join('')}
            </ul>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 14px;">
                <button type="button" 
                        onclick="selectPackageAndRegister('${escapeHtml(pkg.name)} (${escapeHtml(pkg.speed)}) - ${escapeHtml(pkg.price)}')" 
                        class="btn-luxury ${pkg.isPopular ? 'btn-primary-luxury' : 'btn-outline-luxury'} pkg-cta-btn" 
                        style="width: 100%; justify-content: center;">
                    <i class="bi bi-clipboard2-check-fill"></i> ${escapeHtml(pkg.ctaText || 'Daftar Paket Ini')}
                </button>
                <a href="https://wa.me/${waNum}?text=Halo%20Mas%20ONES,%20saya%20ingin%20tanya%20dan%20daftar%20paket%20${encodeURIComponent(pkg.name)}%20(${encodeURIComponent(pkg.speed)})%20${encodeURIComponent(pkg.price)}" 
                   target="_blank" 
                   class="btn-luxury" 
                   style="background: #25D366; color: white; font-size: 12.5px; padding: 8px 14px; width: 100%; justify-content: center;">
                    <i class="bi bi-whatsapp"></i> Chat WhatsApp Langsung
                </a>
            </div>
        </div>
    `).join('');
}

// ==========================================================================
// FORMULIR PENDAFTARAN & WHATSAPP INTEGRATION
// ==========================================================================
function populateRegistrationPackages(packages) {
    const select = document.getElementById('reg-user-package');
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '<option value="">-- Pilih Paket Internet yang Diinginkan --</option>';

    (packages || []).forEach(pkg => {
        const optionLabel = `${pkg.name} [${pkg.speed}] - ${pkg.price} ${pkg.period || ''}`;
        const opt = document.createElement('option');
        opt.value = optionLabel;
        opt.textContent = optionLabel;
        select.appendChild(opt);
    });

    if (currentVal) {
        select.value = currentVal;
    }
}

window.selectPackageAndRegister = function(packageLabel) {
    const regSection = document.getElementById('formulir-pendaftaran');
    const select = document.getElementById('reg-user-package');
    const nameInput = document.getElementById('reg-user-name');

    if (select) {
        // Find matching option
        let found = false;
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.includes(packageLabel.split(' (')[0]) || select.options[i].value === packageLabel) {
                select.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found && select.options.length > 1) {
            select.options[1].selected = true;
        }
    }

    if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
    }
};

window.handleRegistrationSubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById('reg-user-name')?.value.trim();
    let rawPhone = document.getElementById('reg-user-phone')?.value.trim() || '';
    const email = document.getElementById('reg-user-email')?.value.trim();
    const packageName = document.getElementById('reg-user-package')?.value.trim();
    const address = document.getElementById('reg-user-address')?.value.trim();
    const notes = document.getElementById('reg-user-notes')?.value.trim() || '-';

    // Normalisasi Nomor WhatsApp agar SELALU diawali dengan 62 (bukan 0)
    let cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
        cleanPhone = '62' + cleanPhone.substring(1);
    } else if (cleanPhone && !cleanPhone.startsWith('62')) {
        cleanPhone = '62' + cleanPhone;
    }
    const phone = cleanPhone;

    if (!name || !phone || !email || !packageName || !address) {
        alert('Mohon lengkapi semua kolom formulir pendaftaran yang bertanda bintang (*).');
        return;
    }

    const data = window.SiteDB ? window.SiteDB.getData() : window.DEFAULT_SITE_DATA;
    const waContacts = data.whatsappContacts || {};
    const targetWa = (waContacts.registration || waContacts.sales || data.salesRep?.phone || '085755836988').replace(/[^0-9]/g, '');

    // Simpan Lead Pendaftaran ke Local/Supabase Database dengan awalan 62
    if (window.SiteDB && window.SiteDB.addRegistration) {
        window.SiteDB.addRegistration({
            name,
            phone,
            email,
            packageName,
            address,
            notes
        });
    }

    // Format Pesan WhatsApp Rapi & Profesional
    const message = 
`*FORMULIR PENDAFTARAN PASANG BARU XL SATU*
=======================================
👤 *Nama Lengkap:* ${name}
📱 *No. WhatsApp / HP:* ${phone}
📧 *Email:* ${email}
🏠 *Alamat Pemasangan:* ${address}
📦 *Pilihan Paket:* ${packageName}
📝 *Catatan / Patokan:* ${notes}
=======================================
Halo Admin/Sales Resmi XL Satu, saya telah mengisi formulir pendaftaran ini dan bermaksud mendaftar pasang baru. Mohon segera dicek jangkauan jaringan fiber dan jadwal teknisi. Terima kasih!`;

    const waUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(message)}`;
    
    // Buka WhatsApp
    window.open(waUrl, '_blank');

    alert(`Terima kasih, Bapak/Ibu ${name}!\nData formulir pendaftaran Anda telah disiapkan dan sedang dialihkan ke WhatsApp Sales Resmi kami (${targetWa}).\nTim kami akan segera memproses pengecekan jaringan.`);

    // Reset Form
    document.getElementById('form-register-user')?.reset();
};

// ==========================================================================
// RENDER REVIEWS & TESTIMONIALS ("KATA MEREKA")
// ==========================================================================
function renderReviews(reviews) {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    if (!reviews || reviews.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                Belum ada review. Jadilah yang pertama memberikan ulasan kepuasan internet XL Satu!
            </div>
        `;
        return;
    }

    container.innerHTML = reviews.map(r => {
        const starCount = parseInt(r.rating, 10) || 5;
        const starsHtml = Array(starCount).fill('<i class="bi bi-star-fill"></i>').join(' ') + 
                          Array(Math.max(0, 5 - starCount)).fill('<i class="bi bi-star" style="color: #475569;"></i>').join(' ');

        return `
            <div class="review-card">
                <div>
                    <div class="review-card-stars">
                        ${starsHtml}
                    </div>
                    <p class="review-comment">
                        "${escapeHtml(r.comment)}"
                    </p>
                </div>
                <div class="review-user-info">
                    <div class="review-avatar">
                        ${escapeHtml(r.avatar || (r.name ? r.name.slice(0,2).toUpperCase() : 'XL'))}
                    </div>
                    <div class="review-meta">
                        <h5>${escapeHtml(r.name)}</h5>
                        <p><i class="bi bi-geo-alt-fill" style="color: #00f0ff;"></i> ${escapeHtml(r.city || 'Surabaya')} • <span style="color: #10b981;">✓ Terverifikasi</span></p>
                        ${r.packageName ? `<div class="review-pkg-tag">${escapeHtml(r.packageName)}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Modal Review Handlers
window.openReviewModal = function() {
    const modal = document.getElementById('modal-add-review');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

window.closeReviewModal = function() {
    const modal = document.getElementById('modal-add-review');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

window.handleUserReviewSubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById('rev-input-name')?.value.trim();
    const city = document.getElementById('rev-input-city')?.value.trim();
    const packageName = document.getElementById('rev-input-package')?.value.trim() || 'XL Satu Fiber';
    const rating = document.getElementById('rev-input-rating')?.value || '5';
    const comment = document.getElementById('rev-input-comment')?.value.trim();

    if (!name || !city || !comment) {
        alert('Mohon isi nama, kota/area, dan testimoni Anda.');
        return;
    }

    if (window.SiteDB && window.SiteDB.addReview) {
        window.SiteDB.addReview({
            name,
            city,
            packageName,
            rating: parseInt(rating, 10),
            comment
        });
    }

    alert('Terima kasih banyak atas review Anda! Ulasan Anda kini telah tampil di halaman Kata Mereka.');
    closeReviewModal();
    document.getElementById('form-user-review')?.reset();

    // Re-render
    const updatedData = window.SiteDB ? window.SiteDB.getData() : window.DEFAULT_SITE_DATA;
    renderReviews(updatedData.reviews);
};

// ==========================================================================
// RENDER BROCHURES GALLERY (GRID / SLIDER / CAROUSEL DYNAMIC MODES)
// ==========================================================================
window._carouselState = {
    currentIndex: 0,
    timer: null,
    totalSlides: 0,
    autoPlay: true,
    interval: 4000
};

function renderBrochuresGallery(brochures, preferredMode, templateOpts) {
    const container = document.getElementById('brochures-gallery-container');
    if (!container) return;

    if (!Array.isArray(brochures) || brochures.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #94a3b8;">Belum ada flyer yang tersedia.</p>`;
        return;
    }

    const mode = window._currentFlyerDisplayMode || preferredMode || SiteDB.getBrochureDisplayMode() || 'grid';
    const tpl = templateOpts || SiteDB.getData().settings?.brochureTemplate || { autoPlay: true, interval: 4000 };

    // Update active toolbar button
    ['grid', 'slider', 'carousel'].forEach(m => {
        const btn = document.getElementById(`btn-mode-${m}`);
        if (btn) {
            btn.classList.toggle('active', m === mode);
        }
    });

    // Clear existing carousel auto-play timer
    if (window._carouselState.timer) {
        clearInterval(window._carouselState.timer);
        window._carouselState.timer = null;
    }

    // Helper card HTML
    const renderCardHtml = (b, extraClass = '') => `
        <div class="brochure-card ${extraClass}" onclick="openBrochureModal('${escapeHtml(b.image)}', '${escapeHtml(b.title)}', '${escapeHtml(b.desc)}')">
            <div class="brochure-thumb-wrap">
                <img src="${escapeHtml(b.image)}" alt="${escapeHtml(b.title)}" loading="lazy">
                <div class="brochure-tag-badge">${escapeHtml(b.tag || 'Brosur Resmi')}</div>
            </div>
            <div class="brochure-info">
                <div>
                    <h4>${escapeHtml(b.title)}</h4>
                    <p>${escapeHtml(b.desc)}</p>
                </div>
                <div class="btn-view-flyer">
                    <i class="bi bi-arrows-fullscreen"></i> Klik untuk Perbesar Brosur
                </div>
            </div>
        </div>
    `;

    // 1. MODE GRID
    if (mode === 'grid') {
        container.className = 'gallery-grid';
        container.innerHTML = brochures.map(b => renderCardHtml(b)).join('');
        return;
    }

    // 2. MODE SLIDER (Horizontal Touch / Arrow Drag)
    if (mode === 'slider') {
        container.className = '';
        container.innerHTML = `
            <div class="flyer-slider-wrapper">
                <button type="button" class="slider-arrow-btn prev" onclick="scrollFlyerSlider(-1)" aria-label="Geser ke kiri">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <div class="flyer-slider-track" id="flyer-slider-track">
                    ${brochures.map(b => renderCardHtml(b)).join('')}
                </div>
                <button type="button" class="slider-arrow-btn next" onclick="scrollFlyerSlider(1)" aria-label="Geser ke kanan">
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
        `;
        return;
    }

    // 3. MODE CAROUSEL (Rotasi Otomatis & Dot Navigasi)
    if (mode === 'carousel') {
        container.className = '';
        window._carouselState.totalSlides = brochures.length;
        window._carouselState.currentIndex = 0;
        window._carouselState.autoPlay = tpl.autoPlay !== false;
        window._carouselState.interval = parseInt(tpl.interval || 4000, 10);

        container.innerHTML = `
            <div class="flyer-carousel-wrapper" id="flyer-carousel-wrap">
                <div class="carousel-stage">
                    <button type="button" class="carousel-nav-btn prev" onclick="navigateFlyerCarousel(-1)" aria-label="Slide sebelumnya">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    <div class="carousel-track" id="carousel-track">
                        ${brochures.map((b, idx) => `
                            <div class="carousel-slide-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                                ${renderCardHtml(b)}
                            </div>
                        `).join('')}
                    </div>
                    <button type="button" class="carousel-nav-btn next" onclick="navigateFlyerCarousel(1)" aria-label="Slide berikutnya">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
                <div class="carousel-dots" id="carousel-dots-container">
                    ${brochures.map((_, idx) => `
                        <button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" onclick="setFlyerCarouselSlide(${idx})" aria-label="Slide ${idx + 1}"></button>
                    `).join('')}
                </div>
                <div class="carousel-counter" id="carousel-slide-counter">
                    Slide 1 dari ${brochures.length}
                </div>
            </div>
        `;

        // Start Auto Play if enabled
        if (window._carouselState.autoPlay && brochures.length > 1) {
            startFlyerCarouselTimer();
            const wrap = document.getElementById('flyer-carousel-wrap');
            if (wrap) {
                wrap.addEventListener('mouseenter', stopFlyerCarouselTimer);
                wrap.addEventListener('mouseleave', startFlyerCarouselTimer);
                wrap.addEventListener('touchstart', stopFlyerCarouselTimer, { passive: true });
                wrap.addEventListener('touchend', startFlyerCarouselTimer, { passive: true });
            }
        }
        return;
    }
}

// Handler Ganti Mode Tampilan Flyer dari Landing Page
window.switchPublicFlyerMode = function(mode) {
    window._currentFlyerDisplayMode = mode;
    const data = SiteDB.getData();
    renderBrochuresGallery(data.brochures || window.DEFAULT_SITE_DATA.brochures, mode, data.settings?.brochureTemplate);
};

// Navigasi Mode Slider
window.scrollFlyerSlider = function(direction) {
    const track = document.getElementById('flyer-slider-track');
    if (!track) return;
    const scrollAmount = 340 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

// Navigasi Mode Carousel
window.navigateFlyerCarousel = function(direction) {
    const total = window._carouselState.totalSlides;
    if (total <= 1) return;
    let nextIdx = window._carouselState.currentIndex + direction;
    if (nextIdx >= total) nextIdx = 0;
    if (nextIdx < 0) nextIdx = total - 1;
    window.setFlyerCarouselSlide(nextIdx);
};

window.setFlyerCarouselSlide = function(index) {
    const total = window._carouselState.totalSlides;
    if (index < 0 || index >= total) return;
    window._carouselState.currentIndex = index;

    const track = document.getElementById('carousel-track');
    if (track) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Update active slides
    const slides = document.querySelectorAll('.carousel-slide-item');
    slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === index);
    });

    // Update active dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === index);
    });

    // Update counter
    const counter = document.getElementById('carousel-slide-counter');
    if (counter) {
        counter.textContent = `Slide ${index + 1} dari ${total}`;
    }
};

function startFlyerCarouselTimer() {
    stopFlyerCarouselTimer();
    if (!window._carouselState.autoPlay || window._carouselState.totalSlides <= 1) return;
    window._carouselState.timer = setInterval(() => {
        window.navigateFlyerCarousel(1);
    }, window._carouselState.interval || 4000);
}

function stopFlyerCarouselTimer() {
    if (window._carouselState.timer) {
        clearInterval(window._carouselState.timer);
        window._carouselState.timer = null;
    }
}

// ==========================================================================
// RENDER CUSTOMER CARE CARDS (820, 08170123442, WA, EMAIL)
// ==========================================================================
function renderCustomerCareCards(cc) {
    const xlVal = document.getElementById('cc-val-xl');
    const nonXlVal = document.getElementById('cc-val-nonxl');
    const waVal = document.getElementById('cc-val-wa');
    const emailVal = document.getElementById('cc-val-email');

    const xlBtn = document.getElementById('cc-btn-xl');
    const nonXlBtn = document.getElementById('cc-btn-nonxl');
    const waBtn = document.getElementById('cc-btn-wa');
    const emailBtn = document.getElementById('cc-btn-email');

    if (xlVal) xlVal.textContent = cc.xlUserPhone || '820';
    if (nonXlVal) nonXlVal.textContent = cc.nonXlPhone || '0817 0123 442';
    if (waVal) waVal.textContent = cc.whatsapp || '0817 0010 820';
    if (emailVal) emailVal.textContent = cc.email || 'xlsatucs@xlsmart.co.id';

    if (xlBtn) xlBtn.href = `tel:${cc.xlUserPhone || '820'}`;
    if (nonXlBtn) nonXlBtn.href = `tel:${(cc.nonXlPhone || '08170123442').replace(/\s+/g, '')}`;
    
    const cleanWaCare = (cc.whatsappRaw || cc.whatsapp || '628170010820').replace(/[^0-9]/g, '');
    if (waBtn) waBtn.href = `https://wa.me/${cleanWaCare}?text=Halo%20Customer%20Care%20XL%20Satu,%20saya%20memerlukan%20bantuan`;
    if (emailBtn) emailBtn.href = `mailto:${cc.email || 'xlsatucs@xlsmart.co.id'}`;
}

// ==========================================================================
// RENDER FAQS ACCORDION
// ==========================================================================
function renderFaqs(faqs) {
    const container = document.getElementById('faq-container');
    if (!container) return;

    container.innerHTML = faqs.map((f, i) => `
        <div class="faq-item ${i === 0 ? 'active' : ''}">
            <div class="faq-question" onclick="toggleFaq(this)">
                <span>${escapeHtml(f.question)}</span>
                <i class="bi bi-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${escapeHtml(f.answer)}</p>
            </div>
        </div>
    `).join('');
}

window.toggleFaq = function(el) {
    const item = el.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
};

// ==========================================================================
// MODAL LIGHTBOX FOR BROCHURES & FLYERS
// ==========================================================================
window.openBrochureModal = function(imageSrc, title, desc) {
    const modal = document.getElementById('luxury-brochure-modal');
    const modalImg = document.getElementById('modal-img-target');
    const modalTitle = document.getElementById('modal-title-target');
    const modalDesc = document.getElementById('modal-desc-target');
    const downloadBtn = document.getElementById('modal-download-btn');

    if (modal && modalImg) {
        modalImg.src = imageSrc;
        if (modalTitle) modalTitle.textContent = title || "Brosur Resmi XL Satu";
        if (modalDesc) modalDesc.textContent = desc || "";
        if (downloadBtn) {
            downloadBtn.href = imageSrc;
            downloadBtn.download = (title || "Brosur-XLSatu").replace(/\s+/g, '-') + ".jpeg";
        }
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

window.closeBrochureModal = function() {
    const modal = document.getElementById('luxury-brochure-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

// Mobile Nav Toggle
window.toggleMobileNav = function() {
    const nav = document.getElementById('nav-menu-list');
    if (nav) nav.classList.toggle('active');
};

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
