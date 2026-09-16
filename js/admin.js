/**
 * XL Satu - Admin Dashboard Controller (V3 Complete CMS)
 * Mendukung Login Admin, CRUD Paket, CRUD Review Kata Mereka,
 * Edit & Upload Brosur Flyer Info, Pengaturan Kontak WhatsApp,
 * Leads Pendaftaran Online Masuk, dan Manajemen Akun Admin.
 */

document.addEventListener('DOMContentLoaded', async () => {
    checkAdminSession();
    initAdminTabs();
    loadAllAdminData();

    // Tunggu inisialisasi cloud database Supabase selesai, lalu render ulang data terbaru
    if (window.SiteDB) {
        await window.SiteDB.init();
        loadAllAdminData();
    }

    if (window.location.hash) {
        const tabKey = window.location.hash.replace('#', '');
        switchTab(tabKey);
    }
});

// Listener saat data dari Supabase selesai disinkronkan di background
window.addEventListener('xlsatu_data_updated', () => {
    loadAllAdminData();
});

// ==========================================================================
// 1. AUTHENTICATION & LOGIN GATE
// ==========================================================================
function checkAdminSession() {
    const isLogged = sessionStorage.getItem('xlsatu_admin_logged') === 'true';
    const loginScreen = document.getElementById('admin-login-screen');
    if (loginScreen) {
        loginScreen.style.display = isLogged ? 'none' : 'flex';
    }
}

window.handleAdminLogin = function(e) {
    e.preventDefault();
    const user = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value.trim();
    const errorEl = document.getElementById('login-error-msg');

    if (SiteDB.checkAuth(user, pass)) {
        sessionStorage.setItem('xlsatu_admin_logged', 'true');
        if (errorEl) errorEl.style.display = 'none';
        const loginScreen = document.getElementById('admin-login-screen');
        if (loginScreen) loginScreen.style.display = 'none';
        showToast('Login berhasil! Selamat datang di CMS XL Satu.');
        loadAllAdminData();
    } else {
        if (errorEl) {
            errorEl.style.display = 'block';
            errorEl.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i> Username atau password salah!';
        }
    }
};

window.logoutAdmin = function() {
    if (confirm('Apakah Anda yakin ingin keluar (logout) dari Dashboard CMS?')) {
        sessionStorage.removeItem('xlsatu_admin_logged');
        const loginScreen = document.getElementById('admin-login-screen');
        if (loginScreen) {
            loginScreen.style.display = 'flex';
            document.getElementById('form-admin-login')?.reset();
        }
        showToast('Anda telah logout.');
    }
};

// ==========================================================================
// 2. TAB NAVIGATION
// ==========================================================================
function initAdminTabs() {
    const navItems = document.querySelectorAll('.admin-nav li[data-tab]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabKey = item.getAttribute('data-tab');
            switchTab(tabKey);
        });
    });
}

function switchTab(tabKey) {
    const targetSection = document.getElementById(`section-${tabKey}`);
    if (!targetSection) return;

    document.querySelectorAll('.admin-nav li[data-tab]').forEach(li => {
        if (li.getAttribute('data-tab') === tabKey) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.style.display = 'none';
    });
    targetSection.style.display = 'block';

    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) sidebar.classList.remove('open');
}

window.toggleSidebar = function() {
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar) sidebar.classList.toggle('open');
};

// ==========================================================================
// 3. LOAD ALL DATA
// ==========================================================================
function loadAllAdminData() {
    const data = window.SiteDB ? window.SiteDB.getData() : window.DEFAULT_SITE_DATA;
    if (!data) return;

    // Admin Username Display
    const adminUser = data.auth?.username || 'admin';
    const sidebarUserEl = document.getElementById('sidebar-admin-user');
    if (sidebarUserEl) sidebarUserEl.textContent = adminUser;
    const inputAdminUser = document.getElementById('input-admin-user');
    if (inputAdminUser) inputAdminUser.value = adminUser;

    // Stats Overview
    const totalPkgEl = document.getElementById('stat-total-packages');
    if (totalPkgEl) totalPkgEl.textContent = `${data.packages.length} Paket`;

    const totalLeadsEl = document.getElementById('stat-total-leads');
    const leadsSidebarCount = document.getElementById('leads-sidebar-count');
    const leadsCount = (data.registrations || []).length;
    if (totalLeadsEl) totalLeadsEl.textContent = `${leadsCount} Leads`;
    if (leadsSidebarCount) leadsSidebarCount.textContent = leadsCount;

    const totalReviewsEl = document.getElementById('stat-total-reviews');
    if (totalReviewsEl) totalReviewsEl.textContent = `${(data.reviews || []).length} Ulasan`;

    const totalFlyersEl = document.getElementById('stat-total-flyers');
    if (totalFlyersEl) totalFlyersEl.textContent = `${(data.brochures || []).length} Flyer`;

    // Quick Dashboard Overview Phone Numbers
    const waContacts = data.whatsappContacts || {};
    const dashSalesPhone = document.getElementById('dash-sales-phone');
    const dashXlPhone = document.getElementById('dash-xl-phone');
    const dashNonxlPhone = document.getElementById('dash-nonxl-phone');
    const dashWaPhone = document.getElementById('dash-wa-phone');

    if (dashSalesPhone) dashSalesPhone.textContent = waContacts.registration || waContacts.sales || data.salesRep?.phone || '085755836988';
    if (dashXlPhone) dashXlPhone.textContent = data.customerCare.xlUserPhone || '820';
    if (dashNonxlPhone) dashNonxlPhone.textContent = data.customerCare.nonXlPhone || '0817 0123 442';
    if (dashWaPhone) dashWaPhone.textContent = waContacts.customerCare || data.customerCare.whatsapp || '0817 0010 820';

    // Render Tables & Lists
    renderLeadsTable(data.registrations || []);
    renderPackagesTable(data.packages);
    renderReviewsTable(data.reviews || []);
    renderBrochuresAdminList(data.brochures);
    renderFaqTable(data.faqs);

    // Populate WhatsApp Form
    document.getElementById('input-wa-sales').value = waContacts.sales || data.salesRep?.phone || '085755836988';
    document.getElementById('input-wa-reg').value = waContacts.registration || '085755836988';
    document.getElementById('input-wa-care').value = waContacts.customerCare || data.customerCare.whatsapp || '08170010820';
    document.getElementById('input-wa-dev').value = waContacts.supportedDev || data.settings.supportedPhone || '082113842783';

    // Populate Sales Form
    const sales = data.salesRep || window.DEFAULT_SITE_DATA.salesRep;
    document.getElementById('input-sales-name').value = sales.name || '';
    document.getElementById('input-sales-phone').value = sales.phone || '';
    document.getElementById('input-sales-role').value = sales.role || '';
    document.getElementById('input-sales-msg').value = sales.messageText || '';

    // Populate Customer Care Form
    document.getElementById('input-xl-phone').value = data.customerCare.xlUserPhone || '';
    document.getElementById('input-nonxl-phone').value = data.customerCare.nonXlPhone || '';
    document.getElementById('input-wa-phone').value = data.customerCare.whatsapp || '';
    document.getElementById('input-email').value = data.customerCare.email || '';

    // Populate Hero Form
    document.getElementById('input-coverage-area').value = data.settings.coverageArea || '';
    document.getElementById('input-hero-badge').value = data.hero.badge || '';
    document.getElementById('input-hero-price').value = data.hero.startingPrice || '';
    document.getElementById('input-hero-subtitle').value = data.hero.subtitle || '';
    document.getElementById('input-hero-promo').value = data.hero.promoNote || '';

    // Populate Site Settings & Supported by Arif Soft
    document.getElementById('input-site-title').value = data.settings.siteTitle || '';
    document.getElementById('input-brand-name').value = data.settings.brandName || '';
    document.getElementById('input-supported-by').value = data.settings.supportedBy || 'arif soft 082113842783';
    document.getElementById('input-supported-phone').value = data.settings.supportedPhone || '082113842783';

    // Populate Flyer Template & Display Mode
    renderFlyerTemplateAdminSettings(data.settings || {});
}

// ==========================================================================
// 4. LEADS (PENDAFTARAN MASUK)
// ==========================================================================
function renderLeadsTable(leads) {
    const tbody = document.getElementById('leads-table-body');
    if (!tbody) return;

    if (!leads || leads.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: #888;">Belum ada pendaftaran masuk dari website.</td></tr>`;
        return;
    }

    tbody.innerHTML = leads.map(l => {
        const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
        const waLink = `https://wa.me/${cleanPhone}?text=Halo%20Bapak%2FIbu%20${encodeURIComponent(l.name)},%20kami%20dari%20XL%20Satu%20mengenai%20pendaftaran%20paket%20${encodeURIComponent(l.packageName || '')}`;

        return `
            <tr>
                <td style="font-size: 12px; color: #64748b; white-space: nowrap;">${escapeHtml(l.date || '-')}</td>
                <td>
                    <strong>${escapeHtml(l.name)}</strong>
                    <div style="font-size: 11.5px; color: #64748b;">${escapeHtml(l.email || '')}</div>
                </td>
                <td>
                    <span style="font-family: monospace; font-weight: 700; color: #16a34a;">${escapeHtml(l.phone)}</span>
                </td>
                <td><span class="wp-badge wp-badge-primary">${escapeHtml(l.packageName || '-')}</span></td>
                <td style="font-size: 12.5px; max-width: 250px;">${escapeHtml(l.address || '-')}</td>
                <td style="font-size: 12px; color: #64748b;">${escapeHtml(l.notes || '-')}</td>
                <td style="text-align: center;">
                    <div class="table-actions" style="justify-content: center;">
                        <a href="${waLink}" target="_blank" class="wp-btn wp-btn-success wp-btn-sm" title="Chat WhatsApp Pelanggan">
                            <i class="bi bi-whatsapp"></i> Chat
                        </a>
                        <button class="wp-btn wp-btn-danger wp-btn-sm" onclick="deleteLead('${l.id}')" title="Hapus">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

window.deleteLead = function(id) {
    if (confirm('Hapus data pendaftaran ini?')) {
        SiteDB.deleteRegistration(id);
        showToast('Data pendaftaran berhasil dihapus.');
        loadAllAdminData();
    }
};

window.confirmClearLeads = function() {
    if (confirm('Apakah Anda yakin ingin MENGHAPUS SEMUA data pendaftaran masuk?')) {
        SiteDB.clearRegistrations();
        showToast('Semua data pendaftaran telah dibersihkan.');
        loadAllAdminData();
    }
};

// ==========================================================================
// 5. CRUD: PAKET INTERNET
// ==========================================================================
function renderPackagesTable(packages) {
    const tbody = document.getElementById('packages-table-body');
    if (!tbody) return;

    if (!packages || packages.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 20px; color: #888;">Belum ada paket.</td></tr>`;
        return;
    }

    const catLabels = {
        'promo4bln': '<span class="wp-badge wp-badge-warning">Promo 4 Bulan</span>',
        'ftth': '<span class="wp-badge wp-badge-primary">Kabel FTTH</span>',
        'wireless': '<span class="wp-badge wp-badge-success">Tanpa Kabel</span>'
    };

    tbody.innerHTML = packages.map(pkg => `
        <tr>
            <td>
                <strong>${escapeHtml(pkg.name)}</strong>
                ${pkg.isPopular ? '<span class="wp-badge wp-badge-success" style="margin-left: 6px;">Featured</span>' : ''}
            </td>
            <td>${catLabels[pkg.category] || '<span class="wp-badge">Umum</span>'}</td>
            <td><strong style="color: #004ae8;">${escapeHtml(pkg.speed)}</strong></td>
            <td>
                <strong>${escapeHtml(pkg.price)}</strong>
                <div style="font-size: 11px; color: #64748b;">${escapeHtml(pkg.period || '')}</div>
            </td>
            <td>
                ${pkg.badge ? `<span class="wp-badge wp-badge-warning">${escapeHtml(pkg.badge)}</span>` : ''}
                ${pkg.monthlyEquivalent ? `<div style="font-size: 11px; color: #0284c7;">${escapeHtml(pkg.monthlyEquivalent)}</div>` : ''}
            </td>
            <td style="text-align: center;">
                <div class="table-actions" style="justify-content: center;">
                    <button class="wp-btn wp-btn-secondary wp-btn-sm" onclick="editPackage('${pkg.id}')">
                        <i class="bi bi-pencil-fill"></i> Edit
                    </button>
                    <button class="wp-btn wp-btn-danger wp-btn-sm" onclick="deletePackage('${pkg.id}', '${escapeHtml(pkg.name)}')">
                        <i class="bi bi-trash-fill"></i> Hapus
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.openPackageModal = function() {
    document.getElementById('modal-package-title').textContent = 'Tambah Paket Baru';
    document.getElementById('pkg-edit-id').value = '';
    document.getElementById('form-package-crud').reset();
    document.getElementById('modal-package').classList.add('show');
};

window.closePackageModal = function() {
    document.getElementById('modal-package').classList.remove('show');
};

window.editPackage = function(id) {
    const data = SiteDB.getData();
    const pkg = data.packages.find(p => p.id === id);
    if (!pkg) return;

    document.getElementById('modal-package-title').textContent = `Edit Paket: ${pkg.name}`;
    document.getElementById('pkg-edit-id').value = pkg.id;
    document.getElementById('pkg-name').value = pkg.name || '';
    document.getElementById('pkg-category').value = pkg.category || 'ftth';
    document.getElementById('pkg-speed').value = pkg.speed || '';
    document.getElementById('pkg-price').value = pkg.price || '';
    document.getElementById('pkg-period').value = pkg.period || '';
    document.getElementById('pkg-monthly-eq').value = pkg.monthlyEquivalent || '';
    document.getElementById('pkg-quota').value = pkg.quotaHp || '';
    document.getElementById('pkg-badge').value = pkg.badge || '';
    document.getElementById('pkg-is-popular').checked = !!pkg.isPopular;
    document.getElementById('pkg-features').value = (pkg.features || []).join('\n');

    document.getElementById('modal-package').classList.add('show');
};

window.handleSavePackage = function(e) {
    e.preventDefault();
    const id = document.getElementById('pkg-edit-id').value;
    const name = document.getElementById('pkg-name').value.trim();
    const category = document.getElementById('pkg-category').value;
    const speed = document.getElementById('pkg-speed').value.trim();
    const price = document.getElementById('pkg-price').value.trim();
    const period = document.getElementById('pkg-period').value.trim();
    const monthlyEquivalent = document.getElementById('pkg-monthly-eq').value.trim();
    const quotaHp = document.getElementById('pkg-quota').value.trim();
    const badge = document.getElementById('pkg-badge').value.trim();
    const isPopular = document.getElementById('pkg-is-popular').checked;
    const featuresRaw = document.getElementById('pkg-features').value;
    const features = featuresRaw.split('\n').map(f => f.trim()).filter(f => f.length > 0);

    const pkgData = {
        name,
        category,
        speed,
        price,
        period: period || '/bulan',
        monthlyEquivalent,
        quotaHp,
        badge,
        isPopular,
        features: features.length > 0 ? features : ["Koneksi Cepat & Stabil", "Layanan 24 Jam"],
        ctaText: 'Daftar Paket Ini'
    };

    if (id) {
        SiteDB.updatePackage(id, pkgData);
        showToast(`Paket "${name}" berhasil diperbarui!`);
    } else {
        SiteDB.addPackage(pkgData);
        showToast(`Paket baru "${name}" berhasil ditambahkan!`);
    }

    closePackageModal();
    loadAllAdminData();
};

window.deletePackage = function(id, name) {
    if (confirm(`Apakah Anda yakin ingin MENGHAPUS paket "${name}"?`)) {
        SiteDB.deletePackage(id);
        showToast(`Paket "${name}" telah dihapus.`);
        loadAllAdminData();
    }
};

// ==========================================================================
// 6. CRUD: REVIEW PELANGGAN ("KATA MEREKA")
// ==========================================================================
function renderReviewsTable(reviews) {
    const tbody = document.getElementById('reviews-table-body');
    if (!tbody) return;

    if (!reviews || reviews.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: #888;">Belum ada review.</td></tr>`;
        return;
    }

    tbody.innerHTML = reviews.map(r => `
        <tr>
            <td><strong>${escapeHtml(r.name)}</strong></td>
            <td>${escapeHtml(r.city || '-')}</td>
            <td><span class="wp-badge wp-badge-primary">${escapeHtml(r.packageName || '-')}</span></td>
            <td><span style="color: #d97706; font-weight: 700;">${'⭐'.repeat(r.rating || 5)} (${r.rating || 5})</span></td>
            <td style="font-size: 12.5px; max-width: 300px; color: #475569;">"${escapeHtml(r.comment)}"</td>
            <td style="font-size: 11.5px; color: #64748b; white-space: nowrap;">${escapeHtml(r.date || '-')}</td>
            <td style="text-align: center;">
                <div class="table-actions" style="justify-content: center;">
                    <button class="wp-btn wp-btn-secondary wp-btn-sm" onclick="editReviewAdmin('${r.id}')">
                        <i class="bi bi-pencil-fill"></i> Edit
                    </button>
                    <button class="wp-btn wp-btn-danger wp-btn-sm" onclick="deleteReviewAdmin('${r.id}', '${escapeHtml(r.name)}')">
                        <i class="bi bi-trash-fill"></i> Hapus
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.openReviewAdminModal = function() {
    document.getElementById('modal-review-title').textContent = 'Tambah Review Pelanggan';
    document.getElementById('review-edit-id').value = '';
    document.getElementById('form-review-crud').reset();
    document.getElementById('modal-review').classList.add('show');
};

window.closeReviewAdminModal = function() {
    document.getElementById('modal-review').classList.remove('show');
};

window.editReviewAdmin = function(id) {
    const data = SiteDB.getData();
    const rev = (data.reviews || []).find(r => r.id === id);
    if (!rev) return;

    document.getElementById('modal-review-title').textContent = `Edit Review: ${rev.name}`;
    document.getElementById('review-edit-id').value = rev.id;
    document.getElementById('admin-rev-name').value = rev.name || '';
    document.getElementById('admin-rev-city').value = rev.city || '';
    document.getElementById('admin-rev-package').value = rev.packageName || '';
    document.getElementById('admin-rev-rating').value = rev.rating || '5';
    document.getElementById('admin-rev-comment').value = rev.comment || '';

    document.getElementById('modal-review').classList.add('show');
};

window.handleSaveReviewAdmin = function(e) {
    e.preventDefault();
    const id = document.getElementById('review-edit-id').value;
    const name = document.getElementById('admin-rev-name').value.trim();
    const city = document.getElementById('admin-rev-city').value.trim();
    const packageName = document.getElementById('admin-rev-package').value.trim() || 'XL Satu Fiber';
    const rating = parseInt(document.getElementById('admin-rev-rating').value, 10) || 5;
    const comment = document.getElementById('admin-rev-comment').value.trim();

    if (id) {
        SiteDB.updateReview(id, { name, city, packageName, rating, comment });
        showToast(`Review dari "${name}" berhasil diperbarui!`);
    } else {
        SiteDB.addReview({ name, city, packageName, rating, comment });
        showToast(`Review baru dari "${name}" berhasil ditambahkan!`);
    }

    closeReviewAdminModal();
    loadAllAdminData();
};

window.deleteReviewAdmin = function(id, name) {
    if (confirm(`Hapus ulasan review dari "${name}"?`)) {
        SiteDB.deleteReview(id);
        showToast('Review berhasil dihapus.');
        loadAllAdminData();
    }
};

// ==========================================================================
// 7. BROSUR & FLYER INFO (EDIT JUDUL, INFO, GANTI GAMBAR & UPLOAD FILE)
// ==========================================================================
function renderBrochuresAdminList(brochures) {
    const container = document.getElementById('admin-brochures-list');
    if (!container) return;

    container.innerHTML = (brochures || []).map(b => `
        <div style="background: #ffffff; border: 1px solid #dcdcde; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <div style="aspect-ratio: 16/10; overflow: hidden; background: #000; position: relative;">
                <img src="${escapeHtml(b.image)}" alt="${escapeHtml(b.title)}" style="width: 100%; height: 100%; object-fit: cover;">
                <span class="wp-badge wp-badge-primary" style="position: absolute; top: 10px; left: 10px;">${escapeHtml(b.tag || 'Brosur')}</span>
            </div>
            <div style="padding: 16px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <h4 style="margin: 0 0 6px; font-size: 15px; color: #1e293b;">${escapeHtml(b.title)}</h4>
                    <p style="font-size: 12.5px; color: #64748b; line-height: 1.5;">${escapeHtml(b.desc)}</p>
                </div>
                <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #f1f5f9; display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="wp-btn wp-btn-secondary wp-btn-sm" onclick="editBrochureModal('${b.id}')">
                        <i class="bi bi-pencil-fill"></i> Edit Info & Gambar
                    </button>
                    <a href="${escapeHtml(b.image)}" target="_blank" class="wp-btn wp-btn-secondary wp-btn-sm" title="Lihat Resolusi Penuh">
                        <i class="bi bi-arrows-fullscreen"></i>
                    </a>
                    <button class="wp-btn wp-btn-danger wp-btn-sm" onclick="deleteBrochureItem('${b.id}', '${escapeHtml(b.title)}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.openBrochureModal = function() {
    document.getElementById('modal-brochure-title').textContent = 'Tambah Flyer / Info Baru';
    document.getElementById('brochure-edit-id').value = '';
    document.getElementById('form-brochure-crud').reset();
    document.getElementById('brochure-preview-box').style.display = 'none';
    document.getElementById('modal-brochure').classList.add('show');
};

window.closeBrochureModal = function() {
    document.getElementById('modal-brochure').classList.remove('show');
};

window.editBrochureModal = function(id) {
    const data = SiteDB.getData();
    const item = (data.brochures || []).find(b => b.id === id);
    if (!item) return;

    document.getElementById('modal-brochure-title').textContent = `Edit Info Flyer: ${item.title}`;
    document.getElementById('brochure-edit-id').value = item.id;
    document.getElementById('brochure-title').value = item.title || '';
    document.getElementById('brochure-tag').value = item.tag || '';
    document.getElementById('brochure-image-url').value = item.image || '';
    document.getElementById('brochure-desc').value = item.desc || '';

    const previewBox = document.getElementById('brochure-preview-box');
    const previewImg = document.getElementById('brochure-preview-img');
    if (previewBox && previewImg) {
        previewImg.src = item.image || '';
        previewBox.style.display = item.image ? 'block' : 'none';
    }

    document.getElementById('modal-brochure').classList.add('show');
};

window.previewBrochureFile = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            document.getElementById('brochure-image-url').value = dataUrl;
            const previewBox = document.getElementById('brochure-preview-box');
            const previewImg = document.getElementById('brochure-preview-img');
            if (previewBox && previewImg) {
                previewImg.src = dataUrl;
                previewBox.style.display = 'block';
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
};

window.handleSaveBrochure = function(e) {
    e.preventDefault();
    const id = document.getElementById('brochure-edit-id').value;
    const title = document.getElementById('brochure-title').value.trim();
    const tag = document.getElementById('brochure-tag').value.trim();
    const image = document.getElementById('brochure-image-url').value.trim();
    const desc = document.getElementById('brochure-desc').value.trim();

    if (id) {
        SiteDB.updateBrochure(id, { title, tag, image, desc });
        showToast(`Flyer "${title}" berhasil diperbarui!`);
    } else {
        SiteDB.addBrochure({ title, tag, image, desc });
        showToast(`Flyer baru "${title}" berhasil ditambahkan!`);
    }

    closeBrochureModal();
    loadAllAdminData();
};

window.deleteBrochureItem = function(id, title) {
    if (confirm(`Apakah Anda yakin ingin MENGHAPUS flyer "${title}"?`)) {
        SiteDB.deleteBrochure(id);
        showToast(`Flyer "${title}" telah dihapus.`);
        loadAllAdminData();
    }
};

// PENGATURAN TEMPLATE & MODE TAMPILAN FLYER (GRID / SLIDER / CAROUSEL)
function renderFlyerTemplateAdminSettings(settings) {
    const mode = settings.brochureDisplayMode || 'grid';
    const tpl = settings.brochureTemplate || {};
    window.selectFlyerMode(mode, true);

    const autoPlayEl = document.getElementById('input-flyer-autoplay');
    if (autoPlayEl) autoPlayEl.value = String(tpl.autoPlay !== false);

    const intervalEl = document.getElementById('input-flyer-interval');
    if (intervalEl) intervalEl.value = String(tpl.interval || 4000);

    const themeEl = document.getElementById('input-flyer-theme');
    if (themeEl) themeEl.value = tpl.cardTheme || 'cyber';
}

window.selectFlyerMode = function(mode, shouldUpdateRadio = true) {
    window._selectedFlyerMode = mode;

    ['grid', 'slider', 'carousel'].forEach(m => {
        const card = document.getElementById(`card-mode-${m}`);
        const radio = document.getElementById(`radio-mode-${m}`);
        if (card) {
            if (m === mode) {
                card.style.borderColor = '#2271b1';
                card.style.background = '#f0f7fc';
                card.style.boxShadow = '0 2px 8px rgba(34, 113, 177, 0.15)';
            } else {
                card.style.borderColor = '#dcdcde';
                card.style.background = '#ffffff';
                card.style.boxShadow = 'none';
            }
        }
        if (radio && shouldUpdateRadio) {
            radio.checked = (m === mode);
        }
    });

    const badge = document.getElementById('badge-active-mode-flyer');
    if (badge) {
        const labels = {
            grid: 'Aktif: Mode Grid',
            slider: 'Aktif: Mode Slider',
            carousel: 'Aktif: Mode Carousel'
        };
        badge.textContent = labels[mode] || `Aktif: Mode ${mode.toUpperCase()}`;
    }
};

window.saveFlyerTemplateMode = function(e) {
    if (e) e.preventDefault();
    const mode = window._selectedFlyerMode || 'grid';
    const autoPlay = document.getElementById('input-flyer-autoplay')?.value === 'true';
    const interval = parseInt(document.getElementById('input-flyer-interval')?.value || '4000', 10);
    const cardTheme = document.getElementById('input-flyer-theme')?.value || 'cyber';

    SiteDB.updateBrochureDisplayMode(mode, {
        autoPlay,
        interval,
        cardTheme
    });

    const modeLabels = {
        grid: 'Grid (Galeri Kartu)',
        slider: 'Slider (Geser Horizontal)',
        carousel: 'Carousel (Putar Otomatis)'
    };
    showToast(`Template flyer berhasil diubah ke mode ${modeLabels[mode]} dan disimpan ke SQLite!`);
    loadAllAdminData();
};

// ==========================================================================
// 8. PENGATURAN KONTAK WHATSAPP TERPADU
// ==========================================================================
window.saveWhatsappSettings = function(e) {
    e.preventDefault();
    const sales = document.getElementById('input-wa-sales').value.trim();
    const registration = document.getElementById('input-wa-reg').value.trim();
    const customerCare = document.getElementById('input-wa-care').value.trim();
    const supportedDev = document.getElementById('input-wa-dev').value.trim();

    SiteDB.updateWhatsappContacts({
        sales,
        registration,
        customerCare,
        supportedDev
    });

    showToast('Seluruh nomor WhatsApp berhasil diperbarui dan tersinkronisasi ke landing page!');
    loadAllAdminData();
};

// ==========================================================================
// 9. AKUN & PASSWORD ADMIN (USER & PASS BISA DIEDIT)
// ==========================================================================
window.saveAdminAuth = function(e) {
    e.preventDefault();
    const newUsername = document.getElementById('input-admin-user').value.trim();
    const newPassword = document.getElementById('input-admin-pass').value.trim();
    const confirmPass = document.getElementById('input-admin-pass-confirm').value.trim();

    if (newPassword.length < 4) {
        showToast('Password minimal 4 karakter!', true);
        return;
    }

    if (newPassword !== confirmPass) {
        showToast('Konfirmasi password tidak cocok!', true);
        return;
    }

    SiteDB.updateAuth(newUsername, newPassword);
    showToast(`Akun admin berhasil diubah! Username: ${newUsername}`);
    document.getElementById('input-admin-pass').value = '';
    document.getElementById('input-admin-pass-confirm').value = '';
    loadAllAdminData();
};

// ==========================================================================
// 10. CRUD: FAQ
// ==========================================================================
function renderFaqTable(faqs) {
    const tbody = document.getElementById('faq-table-body');
    if (!tbody) return;

    tbody.innerHTML = (faqs || []).map(f => `
        <tr>
            <td><strong>${escapeHtml(f.question)}</strong></td>
            <td style="font-size: 13px; color: #475569;">${escapeHtml(f.answer)}</td>
            <td style="text-align: center;">
                <div class="table-actions" style="justify-content: center;">
                    <button class="wp-btn wp-btn-secondary wp-btn-sm" onclick="editFaq('${f.id}')">
                        <i class="bi bi-pencil-fill"></i> Edit
                    </button>
                    <button class="wp-btn wp-btn-danger wp-btn-sm" onclick="deleteFaq('${f.id}')">
                        <i class="bi bi-trash-fill"></i> Hapus
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.openFaqModal = function() {
    document.getElementById('modal-faq-title').textContent = 'Tambah FAQ Baru';
    document.getElementById('faq-edit-id').value = '';
    document.getElementById('form-faq-crud').reset();
    document.getElementById('modal-faq').classList.add('show');
};

window.closeFaqModal = function() {
    document.getElementById('modal-faq').classList.remove('show');
};

window.editFaq = function(id) {
    const data = SiteDB.getData();
    const faq = (data.faqs || []).find(f => f.id === id);
    if (!faq) return;

    document.getElementById('modal-faq-title').textContent = 'Edit FAQ';
    document.getElementById('faq-edit-id').value = faq.id;
    document.getElementById('faq-question').value = faq.question || '';
    document.getElementById('faq-answer').value = faq.answer || '';
    document.getElementById('modal-faq').classList.add('show');
};

window.handleSaveFaq = function(e) {
    e.preventDefault();
    const id = document.getElementById('faq-edit-id').value;
    const question = document.getElementById('faq-question').value.trim();
    const answer = document.getElementById('faq-answer').value.trim();

    if (id) {
        SiteDB.updateFaq(id, { question, answer });
        showToast('FAQ berhasil diperbarui!');
    } else {
        SiteDB.addFaq({ question, answer });
        showToast('FAQ baru berhasil ditambahkan!');
    }

    closeFaqModal();
    loadAllAdminData();
};

window.deleteFaq = function(id) {
    if (confirm('Apakah Anda yakin ingin MENGHAPUS pertanyaan FAQ ini?')) {
        SiteDB.deleteFaq(id);
        showToast('FAQ berhasil dihapus.');
        loadAllAdminData();
    }
};

// ==========================================================================
// 11. FORM SUBMISSIONS: SALES, CC, HERO, SETTINGS
// ==========================================================================
window.saveSalesRep = function(e) {
    e.preventDefault();
    const data = SiteDB.getData();
    const phone = document.getElementById('input-sales-phone').value.trim();

    data.salesRep = {
        name: document.getElementById('input-sales-name').value.trim(),
        role: document.getElementById('input-sales-role').value.trim(),
        phone: phone,
        phoneRaw: phone.replace(/[^0-9]/g, ''),
        messageText: document.getElementById('input-sales-msg').value.trim()
    };
    if (data.whatsappContacts) {
        data.whatsappContacts.sales = phone;
    }

    SiteDB.saveData(data);
    showToast('Data Sales Representative (ONES) berhasil disimpan!');
    loadAllAdminData();
};

window.saveCustomerCare = function(e) {
    e.preventDefault();
    const data = SiteDB.getData();
    const wa = document.getElementById('input-wa-phone').value.trim();

    data.customerCare.xlUserPhone = document.getElementById('input-xl-phone').value.trim();
    data.customerCare.nonXlPhone = document.getElementById('input-nonxl-phone').value.trim();
    data.customerCare.whatsapp = wa;
    data.customerCare.whatsappRaw = wa.replace(/[^0-9]/g, '');
    data.customerCare.email = document.getElementById('input-email').value.trim();

    if (data.whatsappContacts) {
        data.whatsappContacts.customerCare = wa;
    }

    SiteDB.saveData(data);
    showToast('Kontak Customer Care berhasil disimpan!');
    loadAllAdminData();
};

window.saveHeroContent = function(e) {
    e.preventDefault();
    const data = SiteDB.getData();
    data.settings.coverageArea = document.getElementById('input-coverage-area').value.trim();
    data.hero.badge = document.getElementById('input-hero-badge').value.trim();
    data.hero.startingPrice = document.getElementById('input-hero-price').value.trim();
    data.hero.subtitle = document.getElementById('input-hero-subtitle').value.trim();
    data.hero.promoNote = document.getElementById('input-hero-promo').value.trim();

    SiteDB.saveData(data);
    showToast('Konten Hero dan Jangkauan berhasil disimpan!');
    loadAllAdminData();
};

window.saveSiteSettings = function(e) {
    e.preventDefault();
    const data = SiteDB.getData();
    data.settings.siteTitle = document.getElementById('input-site-title').value.trim();
    data.settings.brandName = document.getElementById('input-brand-name').value.trim();
    data.settings.supportedBy = document.getElementById('input-supported-by').value.trim();
    data.settings.supportedPhone = document.getElementById('input-supported-phone').value.trim();
    data.settings.supportedWhatsapp = data.settings.supportedPhone.replace(/[^0-9]/g, '');

    if (data.whatsappContacts) {
        data.whatsappContacts.supportedDev = data.settings.supportedPhone;
    }

    SiteDB.saveData(data);
    showToast('Pengaturan website & atribusi Arif Soft berhasil disimpan!');
    loadAllAdminData();
};

// ==========================================================================
// 12. BACKUP & RESTORE
// ==========================================================================
window.handleImportJson = function() {
    const fileInput = document.getElementById('import-json-file');
    if (!fileInput.files || fileInput.files.length === 0) {
        showToast('Pilih file JSON backup terlebih dahulu!', true);
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const res = SiteDB.importJson(e.target.result);
        if (res.success) {
            showToast('Data berhasil dipulihkan!');
            loadAllAdminData();
        } else {
            showToast(`Gagal: ${res.error}`, true);
        }
    };
    reader.readAsText(fileInput.files[0]);
};

window.confirmResetDefault = function() {
    const code = prompt('Ketik "RESET" untuk mengembalikan semua data ke setelan awal bawaan:');
    if (code === 'RESET') {
        SiteDB.resetToDefault();
        showToast('Data telah di-reset ke setelan awal pabrik!');
        loadAllAdminData();
    }
};

// ==========================================================================
// 13. TOAST NOTIFICATION & UTILS
// ==========================================================================
function showToast(msg, isError = false) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `wp-toast ${isError ? 'error' : ''}`;
    toast.innerHTML = `<i class="bi ${isError ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}" style="color: ${isError ? '#d63638' : '#00a32a'}; font-size: 18px;"></i> <span>${escapeHtml(msg)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
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
