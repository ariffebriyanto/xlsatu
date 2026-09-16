/**
 * XL SATU FIBER - SQLite BACKEND SERVER & CMS API
 * Menggunakan built-in node:sqlite (DatabaseSync) pada Node.js
 * Database File: xlsatu.db
 * Supported by arif soft 082113842783
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'xlsatu.db');

// Inisialisasi Database SQLite
let db;
try {
    db = new DatabaseSync(DB_FILE);
    console.log(`[SQLite] Database terhubung: ${DB_FILE}`);

    // Buat tabel utama jika belum ada
    db.exec(`
        CREATE TABLE IF NOT EXISTS site_store (
            id TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            action TEXT NOT NULL,
            details TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
} catch (err) {
    console.error('[SQLite] Gagal inisialisasi database:', err);
    process.exit(1);
}

// Helper untuk membaca file data bawaan (fallback initial seed)
function getInitialSeedData() {
    try {
        const dataJsPath = path.join(__dirname, 'js', 'data.js');
        const content = fs.readFileSync(dataJsPath, 'utf8');
        const match = content.match(/const DEFAULT_SITE_DATA\s*=\s*(\{[\s\S]*?\n\};)/);
        if (match) {
            // Evaluasi aman dari object
            const fn = new Function(`return ${match[1].replace(/;\s*$/, '')}`);
            return fn();
        }
    } catch (e) {
        console.warn('[Seed] Menggunakan fallback seed minimal:', e.message);
    }
    return null;
}

// Inisialisasi seed jika tabel kosong
function ensureInitialData() {
    try {
        const query = db.prepare('SELECT data FROM site_store WHERE id = ?');
        const row = query.get('main_site_data');
        if (!row) {
            const seed = getInitialSeedData();
            if (seed) {
                // Pastikan konfigurasi brochureDisplayMode tersedia
                if (!seed.settings) seed.settings = {};
                if (!seed.settings.brochureDisplayMode) seed.settings.brochureDisplayMode = 'grid';
                if (!seed.settings.brochureTemplate) {
                    seed.settings.brochureTemplate = {
                        autoPlay: true,
                        interval: 4000,
                        cardTheme: 'cyber',
                        columns: 3
                    };
                }

                const insert = db.prepare('INSERT INTO site_store (id, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
                insert.run('main_site_data', JSON.stringify(seed));
                console.log('[SQLite] Seed data awal berhasil dimasukkan ke xlsatu.db');
            }
        }
    } catch (err) {
        console.error('[SQLite] Gagal seed data:', err);
    }
}
ensureInitialData();

// Helper MIME Types
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.mp4': 'video/mp4'
};

// Buat Server HTTP
const server = http.createServer((req, res) => {
    // Parsing URL
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // Set CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // ==========================================
    // REST API ENDPOINTS (SQLITE DATABASE)
    // ==========================================

    // 1. GET /api/data -> Ambil seluruh data dari SQLite
    if (pathname === '/api/data' && req.method === 'GET') {
        try {
            const query = db.prepare('SELECT data, updated_at FROM site_store WHERE id = ?');
            const row = query.get('main_site_data');
            if (row && row.data) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(row.data);
            } else {
                const seed = getInitialSeedData() || {};
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(seed));
            }
        } catch (err) {
            console.error('[API] Error GET /api/data:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message, status: 'error' }));
        }
        return;
    }

    // 2. POST /api/data -> Simpan seluruh data ke SQLite
    if (pathname === '/api/data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                const stmt = db.prepare(`
                    INSERT INTO site_store (id, data, updated_at)
                    VALUES (?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP
                `);
                stmt.run('main_site_data', JSON.stringify(parsed));

                // Catat log
                try {
                    const logStmt = db.prepare('INSERT INTO audit_logs (action, details) VALUES (?, ?)');
                    logStmt.run('SAVE_DATA', `Update site data at ${new Date().toISOString()}`);
                } catch (e) {}

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Data berhasil disimpan ke SQLite (xlsatu.db)' }));
            } catch (err) {
                console.error('[API] Error POST /api/data:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // 3. POST /api/reset -> Reset SQLite ke data awal
    if (pathname === '/api/reset' && req.method === 'POST') {
        try {
            const seed = getInitialSeedData();
            if (seed) {
                const stmt = db.prepare(`
                    INSERT INTO site_store (id, data, updated_at)
                    VALUES (?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP
                `);
                stmt.run('main_site_data', JSON.stringify(seed));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Database SQLite berhasil direset ke nilai awal' }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
    }

    // 4. GET /api/db-info -> Info database SQLite
    if (pathname === '/api/db-info' && req.method === 'GET') {
        try {
            let fileSize = 0;
            if (fs.existsSync(DB_FILE)) {
                fileSize = fs.statSync(DB_FILE).size;
            }
            const countRow = db.prepare('SELECT COUNT(*) as count FROM site_store').get();
            const lastUpdateRow = db.prepare('SELECT updated_at FROM site_store WHERE id = ?').get('main_site_data');

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                engine: 'SQLite (node:sqlite)',
                dbFile: 'xlsatu.db',
                fileSizeBytes: fileSize,
                fileSizeFormatted: `${(fileSize / 1024).toFixed(1)} KB`,
                records: countRow?.count || 0,
                lastUpdated: lastUpdateRow?.updated_at || null,
                status: 'connected'
            }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // ==========================================
    // STATIC FILE SERVER
    // ==========================================
    let filePath = pathname === '/' ? '/index.html' : pathname;
    if (filePath === '/admin') filePath = '/admin.html';

    const safePath = path.normalize(path.join(__dirname, filePath));

    // Cegah path traversal
    if (!safePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('Akses ditolak');
        return;
    }

    fs.stat(safePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Jika tidak ditemukan, coba cari .html
            const fallbackHtml = safePath + '.html';
            if (fs.existsSync(fallbackHtml) && fs.statSync(fallbackHtml).isFile()) {
                serveFile(fallbackHtml, res);
                return;
            }
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
        }

        serveFile(safePath, res);
    });
});

function serveFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Gagal membaca file');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Jalankan Server
server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 XL SATU FIBER Server Aktif dengan SQLite!`);
    console.log(`📍 Web Landing Page : http://localhost:${PORT}`);
    console.log(`📍 Dashboard CMS    : http://localhost:${PORT}/admin.html`);
    console.log(`💾 Database SQLite  : ${DB_FILE}`);
    console.log(`====================================================`);
});
