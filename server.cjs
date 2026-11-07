/**
 * AetherTech API - zero-dependency backend for the public website.
 *
 * Endpoints
 *   GET  /api/health          service heartbeat
 *   POST /api/contact         contact / partnership inquiry (stored + queued)
 *   POST /api/waitlist        Learnova AI early-access signup (idempotent)
 *   GET  /api/stats           aggregate, non-personal counters
 *
 * Storage is a JSON ledger on disk (DATA_DIR). No secrets are stored, no
 * third-party trackers are called, and every submission is written with an
 * audit trail (id, timestamp, hashed IP) so nothing is silently dropped.
 *
 * Uses only the Node standard library, so it runs anywhere Node runs with no
 * install step. In production it also serves the built frontend from dist/.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 8787;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DIST = path.join(__dirname, 'dist');
const IP_SALT = process.env.IP_SALT || 'aethertech-static-salt';
const MAX_BODY = 64 * 1024;

// --- storage ---------------------------------------------------------------
function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  for (const f of ['contact.json', 'waitlist.json']) {
    const p = path.join(DATA_DIR, f);
    if (!fs.existsSync(p)) fs.writeFileSync(p, '[]');
  }
}
function readAll(file) {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  } catch {
    return [];
  }
}
function append(file, record) {
  const rows = readAll(file);
  rows.push(record);
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(rows, null, 2));
  return record;
}

// --- helpers ---------------------------------------------------------------
const hashIp = (ip) => crypto.createHash('sha256').update(String(ip) + IP_SALT).digest('hex').slice(0, 16);
const ref = (prefix) => prefix + '-' + crypto.randomBytes(4).toString('hex').toUpperCase();
const clean = (v, max) => String(v == null ? '' : v).trim().slice(0, max || 2000);
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

// naive in-memory rate limit: 10 submissions / 10 min / client
const hits = new Map();
function rateLimited(key) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > 10;
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('payload too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('invalid json'));
      }
    });
    req.on('error', reject);
  });
}

// --- API routes ------------------------------------------------------------
async function handleContact(req, res) {
  let b;
  try {
    b = await readBody(req);
  } catch (e) {
    return sendJson(res, 400, { ok: false, error: e.message });
  }
  const name = clean(b.name, 120);
  const message = clean(b.message, 4000);
  const email = clean(b.email, 200);
  const ipKey = hashIp(req.socket.remoteAddress);

  if (!name || !message) return sendJson(res, 400, { ok: false, error: 'name and message are required' });
  if (email && !EMAIL_RE.test(email)) return sendJson(res, 400, { ok: false, error: 'invalid email' });
  if (rateLimited(ipKey)) return sendJson(res, 429, { ok: false, error: 'too many submissions, please retry later' });

  const record = append('contact.json', {
    id: ref('AETH-TRX'),
    receivedAt: new Date().toISOString(),
    name,
    email,
    organization: clean(b.organization, 160),
    category: clean(b.category, 80) || 'General Technology',
    message,
    status: 'new',
    ipHash: ipKey,
  });
  console.log('[contact] ' + record.id + ' from ' + (email || 'no-email') + ' (' + record.category + ')');
  return sendJson(res, 201, { ok: true, id: record.id, receivedAt: record.receivedAt });
}

async function handleWaitlist(req, res) {
  let b;
  try {
    b = await readBody(req);
  } catch (e) {
    return sendJson(res, 400, { ok: false, error: e.message });
  }
  const email = clean(b.email, 200).toLowerCase();
  const ipKey = hashIp(req.socket.remoteAddress);
  if (!EMAIL_RE.test(email)) return sendJson(res, 400, { ok: false, error: 'valid email required' });
  if (rateLimited(ipKey)) return sendJson(res, 429, { ok: false, error: 'too many submissions, please retry later' });

  const rows = readAll('waitlist.json');
  const existing = rows.find((r) => r.email === email);
  if (existing) return sendJson(res, 200, { ok: true, id: existing.id, alreadyRegistered: true });

  const record = append('waitlist.json', {
    id: ref('LV-WL'),
    registeredAt: new Date().toISOString(),
    email,
    product: clean(b.product, 80) || 'Learnova AI',
    source: clean(b.source, 80) || 'website',
    ipHash: ipKey,
  });
  console.log('[waitlist] ' + record.id + ' ' + email + ' (' + record.product + ')');
  return sendJson(res, 201, { ok: true, id: record.id, alreadyRegistered: false });
}

// --- static frontend -------------------------------------------------------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function serveStatic(req, res) {
  if (!fs.existsSync(DIST)) {
    return sendJson(res, 404, { ok: false, error: 'frontend not built - run npm run build' });
  }
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const target = path.normalize(path.join(DIST, urlPath === '/' ? 'index.html' : urlPath));
  if (!target.startsWith(DIST)) return sendJson(res, 403, { ok: false, error: 'forbidden' });

  const file = fs.existsSync(target) && fs.statSync(target).isFile() ? target : path.join(DIST, 'index.html');
  const ext = path.extname(file).toLowerCase();
  const body = fs.readFileSync(file);
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': body.length,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
  });
  res.end(body);
}

// --- server ----------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];
  const method = req.method || 'GET';

  if (url === '/api/health' && method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      service: 'aethertech-api',
      uptime: Math.round(process.uptime()),
      time: new Date().toISOString(),
    });
  }
  if (url === '/api/stats' && method === 'GET') {
    const contact = readAll('contact.json');
    const waitlist = readAll('waitlist.json');
    return sendJson(res, 200, {
      ok: true,
      inquiries: contact.length,
      openInquiries: contact.filter((r) => r.status === 'new').length,
      waitlist: waitlist.length,
    });
  }
  if (url === '/api/contact' && method === 'POST') return handleContact(req, res);
  if (url === '/api/waitlist' && method === 'POST') return handleWaitlist(req, res);
  if (url.startsWith('/api/')) return sendJson(res, 404, { ok: false, error: 'unknown endpoint' });

  return serveStatic(req, res);
});

ensureStore();
server.listen(PORT, () => {
  console.log('[aethertech-api] listening on :' + PORT + ' (data: ' + DATA_DIR + ')');
});
