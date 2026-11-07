# AetherTech — Innovation Beyond Limits

The official AetherTech website: a single-page experience covering our three
divisions (AetherAI, AetherSoft, AetherLabs), the founding team, the product
roadmap and the research pipeline — with a zero-dependency Node backend behind the
contact and waitlist forms so every submission is actually stored.

## Stack

| Layer    | Technology                                        |
| -------- | ------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 4      |
| 3D       | three.js (hero emblem, WebGL)                      |
| Motion   | motion, custom scroll-reveal hook                  |
| Backend  | Node standard library only, JSON ledger on disk    |

## Project layout

```
index.html                 document shell, fonts, SEO tags
src/
  App.tsx                  page composition + legal modals
  components/              Header, Hero, Divisions, About, Products,
                           Innovation, News, Contact, Footer, Modals, HeroArtwork3D
  data/content.ts          single source of truth for site copy
  hooks/useScrollReveal.ts scroll-triggered reveal animations
  lib/api.ts               typed client for the backend
  types/index.ts           shared content types
public/assets/images/      division artwork, founder portraits, hero assets
server.cjs                 Express API + static hosting of dist/
data/                      runtime ledger (contact.json, waitlist.json)
```

## Run locally

```bash
npm install

# terminal 1 — API on :8787
npm run server

# terminal 2 — Vite on :3000 (proxies /api → :8787)
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build      # emits dist/
npm run server     # serves dist/ and /api on $PORT (default 8787)
```

Environment variables: `PORT`, `DATA_DIR` (ledger location), `IP_SALT`
(salt for the hashed IPs used in rate limiting).

## API

No dependencies to install for the backend: `server.cjs` uses only the Node
standard library (http, fs, path, crypto) and serves `dist/` in production.


| Method | Path            | Purpose                                  |
| ------ | --------------- | ---------------------------------------- |
| GET    | `/api/health`   | service heartbeat                        |
| POST   | `/api/contact`  | partnership / general inquiry → ledger   |
| POST   | `/api/waitlist` | Learnova AI early access (idempotent)    |
| GET    | `/api/stats`    | aggregate, non-personal counters         |

Both write endpoints validate input, hash IPs (never stored raw) and are rate
limited to 10 submissions per 10 minutes per client.

## Editing content

All copy lives in `src/data/content.ts` — divisions, founders, products,
innovation pillars and news items. Adding an entry there is enough; the
sections render from the arrays.

## Divisions

- **AetherAI** — neural architectures, reasoning agents, cognitive models.
- **AetherSoft** — cloud-native platforms, developer frameworks, runtimes.
- **AetherLabs** — robotics, actuation, spatial perception, IoT telemetry.

## Security

No third-party analytics, no advertising trackers, no secrets in the bundle.
Credentials, if ever needed, belong in `.env` (git-ignored) and are read only
by the server process.

## License

Proprietary — © AetherTech. All rights reserved.
