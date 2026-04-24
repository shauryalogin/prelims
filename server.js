const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const FILE_DATA = {
  robots: {
    title: '/robots.txt',
    body: `User-agent: *
Disallow: /admin
Disallow: /.env
Disallow: /backup/
Disallow: /.git/
Disallow: /internal/
Disallow: /api/v1/internal
Disallow: /api/v1/internal/debug/flag
Disallow: /db/
Disallow: /phpinfo.php

# Staging server — do not index
# flag{r0b0ts_txt_tr34sur3_m4p}
# Internal wiki: /internal/wiki (default creds not rotated)

Sitemap: https://app.pulsara.io/sitemap.xml`
  },
  env: {
    title: '/.env — Exposed Configuration (PULS-SEC-98)',
    body: `# Pulsara Staging Configuration
# WARNING: This file should NOT be in the web root
# Ticket: PULS-SEC-98 (OPEN — fix scheduled 2026-05-15)

APP_ENV=staging
APP_DEBUG=true
APP_VERSION=2.3.1-staging
APP_KEY=base64:pls_4pp_k3y_xK9mZ3pQ7rT2vN8w

DATABASE_URL=postgresql://pulsara_db:Puls4r4DB_Pr0d!@10.0.1.8:5432/pulsara_staging
DB_HOST=10.0.1.8
DB_PORT=5432
DB_NAME=pulsara_staging
DB_USER=pulsara_db
DB_PASS=Puls4r4DB_Pr0d!

JWT_SECRET=pls_jwt_s3cr3t_2026_n3v3r_shar3
JWT_ALGORITHM=none
ADMIN_API_TOKEN=pls_master_9f4e2b1a

STRIPE_SECRET_KEY=sk_test_pls_9f4e2b1a7cKEY
SENDGRID_API_KEY=SG.pls_fake_sendgrid_key
SLACK_WEBHOOK=https://hooks.slack.com/services/T00/B00/pls_slack_wh

# Debug accounts (remove before prod)
ADMIN_EMAIL=admin@pulsara.io
ADMIN_PASS=Puls4r4@dm1n!
DEV_EMAIL=dev@pulsara.io
DEV_PASS=devpass123

# flag{3nv_f1l3_3xp0s3d_crit1cal}

SENTRY_DSN=https://abc@o1234.ingest.sentry.io/5678`
  },
  git: {
    title: '/.git/config',
    body: `[core]
  repositoryformatversion = 0
  filemode = true
  bare = false
  logallrefupdates = true

[remote "origin"]
  url = https://github.com/pulsara-internal/platform.git
  fetch = +refs/heads/*:refs/remotes/origin/*

[remote "staging"]
  url = https://deploy:D3pl0yK3y_Puls4r4!@staging.pulsara.io/git.git
  fetch = +refs/heads/*:refs/remotes/staging/*

[branch "main"]
  remote = origin
  merge = refs/heads/main

# flag{g1t_c0nf1g_d3pl0y_k3y_l34k}
# Deployment token in remote URL above

[user]
  email = devops@pulsara.io
  name = Pulsara DevOps`
  },
  backup: {
    title: '/backup/ — Directory Listing',
    body: `Index of /backup/

  Name                          Modified              Size
  ─────────────────────────────────────────────────────────
  pulsara_20260508.tar.gz       2026-05-08 09:00      4.1MB
  pulsara_20260507.tar.gz       2026-05-07 09:00      4.0MB
  db_dump_20260508.sql          2026-05-08 09:00      1.2MB
  .env.bak                      2026-05-07 14:22      2.1KB
  config_snapshot.json          2026-05-06 11:00      8.2KB

Preview of config_snapshot.json:
{
  "db_host": "10.0.1.8",
  "db_user": "pulsara_db",
  "db_pass": "Puls4r4DB_Pr0d!",
  "admin_pass": "Puls4r4@dm1n!",
  "jwt_secret": "pls_jwt_s3cr3t_2026_n3v3r_shar3",
  "flag": "flag{b4ckup_d1r_l1st1ng_l34k}"
}`
  },
  dbdump: {
    title: '/db/dump.sql — Database Dump',
    body: `-- Pulsara Staging DB Dump
-- Generated: 2026-05-08 09:00:01 UTC
-- Host: 10.0.1.8 | DB: pulsara_staging

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(200) NOT NULL,   -- plaintext in staging!
  role VARCHAR(30),
  plan VARCHAR(20),
  created_at TIMESTAMP
);

INSERT INTO accounts VALUES
(1,'admin@pulsara.io','Puls4r4@dm1n!','admin','enterprise','2024-01-01'),
(2,'dev@pulsara.io','devpass123','developer','growth','2024-06-01'),
(3,'guest@pulsara.io','guest2026','guest','starter','2025-01-01');

CREATE TABLE system_flags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  value VARCHAR(100)
);

INSERT INTO system_flags VALUES
(1,'source_flag','flag{y0u_1nsp3ct3d_th3_s0urc3}'),
(2,'sqli_flag','flag{sql_1nj3ct10n_r3p0rt_l34k}'),
(3,'db_dump_flag','flag{db_dump_cr3ds_3xp0s3d}'),
(4,'admin_flag','flag{4dm1n_l0g1n_4cc3ss_gr4nt3d}');`
  },
  security: {
    title: '/security.txt',
    body: `Contact: security@pulsara.io
Expires: 2027-01-01T00:00:00Z
Encryption: https://pulsara.io/pgp-public.asc
Policy: https://pulsara.io/security-policy

# Known open issues (do not report, we know):
# PULS-SEC-91: JWT alg=none in staging
# PULS-SEC-82: SQLi in /reports/search
# PULS-SEC-95: IDOR on /api/v1/users/{id}
# PULS-SEC-98: .env exposed in web root

Bounty: $500–$25,000 based on severity
Scope: app.pulsara.io, api.pulsara.io
Out of scope: CTFd platform, admin infrastructure`
  },
  privacy: {
    title: '/privacy-policy.txt (Summary)',
    body: `Pulsara Privacy Policy — Summary
Last updated: 2026-03-01

DATA WE COLLECT
  - Account info (email, name, payment)
  - Product analytics events you send us
  - Usage data for platform improvement

DATA WE DO NOT SELL
  - Your customer data is never sold or shared with advertisers
  - We are GDPR compliant and SOC2 Type II certified

RETENTION
  - Account data: until deletion request
  - Analytics events: 24 months rolling

CONTACT
  privacy@pulsara.io
  Pulsara Inc., 340 Pine Street, San Francisco CA 94104`
  }
};

const DB_USERS = [
  {id:1,email:'admin@pulsara.io',role:'admin',plan:'enterprise',team:'Leadership',notes:'flag{1d0r_4dm1n_us3r_3xp0s3d}'},
  {id:2,email:'dev@pulsara.io',role:'developer',plan:'growth',team:'Engineering',notes:'Has access to staging DB credentials'},
  {id:3,email:'guest@pulsara.io',role:'guest',plan:'starter',team:'External',notes:'Temporary guest account — expires 2026-06-01'},
  {id:4,email:'nadia@pulsara.io',role:'ceo',plan:'enterprise',team:'Founders',notes:'CEO — has master admin token: pls_master_9f4e2b1a'},
  {id:5,email:'rohan@pulsara.io',role:'cto',plan:'enterprise',team:'Founders',notes:'CTO — DB superuser access'},
  {id:6,email:'svc-pipeline@pulsara.io',role:'service',plan:'internal',team:'Infra',notes:'Pipeline service account — key: svc_pipe_k3y_2026'},
  {id:7,email:'jamie@pulsara.io',role:'vp_product',plan:'enterprise',team:'Product',notes:'VP Product — flag{1d0r_us3r7_f0und}'},
  {id:8,email:'celine@pulsara.io',role:'vp_eng',plan:'enterprise',team:'Engineering',notes:'flag{1d0r_4ll_us3rs_3xp0s3d_gr34t_w0rk}'},
  {id:9,email:'billing@pulsara.io',role:'service',plan:'internal',team:'Finance',notes:'Stripe key: sk_test_pls_9f4e2b1a (staging)'},
  {id:10,email:'security@pulsara.io',role:'analyst',plan:'enterprise',team:'Security',notes:'Security team — report vulns here'},
];

const REPORTS_DB = [
  {id:1,name:'Monthly MRR Summary',owner:'admin@pulsara.io',schedule:'monthly'},
  {id:2,name:'Churn Risk Digest',owner:'admin@pulsara.io',schedule:'weekly'},
  {id:3,name:'Activation Funnel',owner:'dev@pulsara.io',schedule:'manual'},
  {id:99,name:"flag{sql_1nj3ct10n_r3p0rt_l34k}",owner:'system',schedule:'none'},
  {id:100,name:"DB_PASS=Puls4r4DB_Pr0d!",owner:'system',schedule:'none'},
];

const MESSAGES_DATA = [
  {
    from:'nadia@pulsara.io', date:'2026-05-08 09:02', subject:'RE: Staging credentials — please rotate after CTF',
    body:`Hi team,\\n\\nAs discussed, here are the staging credentials for the CTF window. Please rotate immediately after.\\n\\nPortal logins:\\n  admin@pulsara.io / Puls4r4@dm1n!\\n  dev@pulsara.io / devpass123\\n  guest@pulsara.io / guest2026\\n\\nDatabase (staging):\\n  Host: 10.0.1.8:5432\\n  Name: pulsara_staging\\n  User: pulsara_db\\n  Pass: Puls4r4DB_Pr0d!\\n\\nJWT secret (DO NOT SHARE): pls_jwt_s3cr3t_2026_n3v3r_shar3\\n\\nflag{1nb0x_r34d_m41l_l34k}\\n\\n— Nadia`
  },
  {
    from:'rohan@pulsara.io', date:'2026-05-07 16:44', subject:'URGENT: .env exposed on staging server',
    body:`Team,\\n\\nOur deployment pipeline pushed .env to the web root on the staging server again (PULS-SEC-98). The file is publicly accessible.\\n\\nExposed data includes:\\n- DB credentials\\n- JWT signing secret\\n- Stripe API key (test mode)\\n- Admin API token\\n\\nI've opened a P1 ticket. This is the second time this quarter.\\n\\n— Rohan`
  },
  {
    from:'security@pulsara.io', date:'2026-05-06 11:20', subject:'Security Audit Findings — Q2 2026',
    body:`Team,\\n\\nOur Q2 internal audit found the following open issues:\\n\\n[CRITICAL] PULS-SEC-91 — JWT alg=none in staging auth endpoint\\n[CRITICAL] PULS-SEC-98 — .env exposed in web root\\n[HIGH]     PULS-SEC-82 — SQL injection in /reports/search\\n[HIGH]     PULS-SEC-95 — IDOR on /api/v1/users/{id}\\n[MEDIUM]   PULS-DEV-441 — Debug endpoints active in staging\\n\\nAdmin panel password for audit account: Puls4r4@dm1n!\\n\\nPlease prioritize remediation before the June go-live date.\\n\\n— Security Team`
  }
];

app.get('/api/flag', (req, res) => {
  const { type } = req.query;

  if (type === 'login_admin') {
    return res.json({ flag: 'flag{4dm1n_l0g1n_4cc3ss_gr4nt3d}' });
  }

  if (type === 'idor') {
    const id = parseInt(req.query.id);
    const u = DB_USERS.find(x => x.id === id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: u });
  }

  if (type === 'jwt') {
    const token = req.query.token;
    try {
      const [h,p,s] = token.split('.');
      const header  = JSON.parse(Buffer.from(h.replace(/-/g,'+').replace(/_/g,'/'), 'base64').toString());
      const payload = JSON.parse(Buffer.from(p.replace(/-/g,'+').replace(/_/g,'/'), 'base64').toString());
      let extra = '';
      if (header.alg === 'none' && (payload.role === 'admin' || payload.email === 'admin@pulsara.io')) {
        extra = '\\n\\n// 🚩 flag{jwt_4lg_n0n3_4dm1n_byp4ss}';
      }
      return res.json({ header, payload, signature: s || '(empty — not verified!)', extra });
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JWT format.' });
    }
  }

  if (type === 'sqli') {
    const q = req.query.q || '';
    const sqli = ["' or","or '1","union","1=1","--","/*","sleep(","'"];
    const isInj = sqli.some(p => q.toLowerCase().includes(p));
    if (isInj) {
      return res.json({ error: 'DB Error: Unhandled exception', data: REPORTS_DB });
    } else {
      const found = REPORTS_DB.filter(r => r.name.toLowerCase().includes(q.toLowerCase()) && r.id < 90);
      return res.json({ data: found });
    }
  }

  if (type === 'debug') {
    const cmd = req.query.cmd || '';
    const responses = {
      'env':     '{"APP_ENV":"staging","APP_DEBUG":true,"JWT_ALG":"none","note":"See .env file for full config"}',
      'version': '{"version":"2.3.1-staging","build":"2026-05-08T09:00:00Z","git_commit":"a4f2d93"}',
      'config':  '{"db_host":"10.0.1.8","jwt_alg":"none","admin_token":"pls_master_9f4e2b1a","note":"Full config via /internal/config endpoint"}',
      'users':   '{"count":10,"note":"Use User Lookup panel to enumerate user IDs"}',
      'flag':    '{"flag":"flag{d3bug_c0ns0l3_cmd_3x3cut3d}","note":"Well done finding the debug console."}',
    };
    if (responses[cmd]) {
      return res.json({ result: responses[cmd] });
    } else {
      return res.json({ result: `{"error":"Unknown command: \${cmd}","available":["env","config","version","flag","users"]}` });
    }
  }

  if (type === 'messages') {
    return res.json({ data: MESSAGES_DATA });
  }

  if (type === 'dashboard') {
    return res.json({ flag: 'flag{d4shb04rd_4cc3ss_gr4nt3d}' });
  }

  if (type === 'docs_login') {
    return res.json({ result: '200 OK\\n{\\n  "token": "eyJhbGciOiJub25lIn0.eyJlbWFpbCI6ImFkbWluQHB1bHNhcmEuaW8iLCJyb2xlIjoiYWRtaW4ifQ.",\\n  "role": "admin",\\n  "expires": "2026-05-09T00:00:00Z"\\n}' });
  }
  
  if (type === 'docs_verify') {
    return res.json({ result: '200 OK (⚠ alg=none — signature not verified)\\n{\\n  "header": {"alg":"none","typ":"JWT"},\\n  "payload": {"email":"admin@pulsara.io","role":"admin"},\\n  "valid": true,\\n  "warning": "Unsigned token accepted",\\n  "flag": "flag{jwt_4lg_n0n3_4dm1n_byp4ss}"\\n}' });
  }

  if (type === 'docs_config') {
    return res.json({ result: '200 OK (⚠ auth middleware disabled in staging)\\n{\\n  "env": "staging",\\n  "debug": true,\\n  "db_host": "10.0.1.8",\\n  "db_user": "pulsara_db",\\n  "db_pass": "Puls4r4DB_Pr0d!",\\n  "jwt_secret": "pls_jwt_s3cr3t_2026_n3v3r_shar3",\\n  "jwt_alg": "none",\\n  "admin_token": "pls_master_9f4e2b1a",\\n  "flag": "flag{4p1_c0nf1g_3xp0s3d_cr1t1c4l}"\\n}' });
  }

  if (type === 'docs_flag') {
    return res.json({ result: '200 OK\\n{\\n  "flag": "flag{d3bug_3ndp01nt_4ct1v3_1n_st4g1ng}",\\n  "note": "Remove this endpoint before production deployment.",\\n  "build": "v2.3.1-staging"\\n}' });
  }

  return res.status(400).json({ error: 'Invalid flag type' });
});

app.get('/api/files/:key', (req, res) => {
  const f = FILE_DATA[req.params.key];
  if (f) return res.json(f);
  return res.status(404).json({ error: 'File not found' });
});

app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});
