# PULSARA CTF — ORGANIZER FLAGS GUIDE
## National Level Event | May 8, 2026

---

## SCORING SUMMARY

| Level    | Points | First Blood Bonus |
|----------|--------|-------------------|
| Easy     | 50 pts | +25 pts           |
| Medium   | 100 pts| +50 pts           |
| Hard     | 150 pts| +75 pts           |

**Total flags: 20 | Max points possible: 1,750 (+ 875 first blood)**

---

## ━━━ LEVEL 1 — EASY (50 pts each) ━━━
*Surface recon: HTML comments, source code, visible text, browser tools*

---

### FLAG 01 — Source Code Comment
**Flag:** `flag{y0u_1nsp3ct3d_th3_s0urc3}`
**How to find:**
Right-click the page → "View Page Source" (or Ctrl+U).
Near the top `<head>` section, inside an HTML comment:
```
<!-- flag{y0u_1nsp3ct3d_th3_s0urc3} -->
```
Also stored in the `/db/dump.sql` file (footer Debug section → `/db/dump.sql`).

---

### FLAG 02 — Browser Console
**Flag:** `flag{c0ns0l3_h1nt_r34d3r_g00d_3y3s}`
**How to find:**
Open browser DevTools → Console tab (F12 → Console).
The flag is printed directly in green text among the startup logs.

---

### FLAG 03 — robots.txt
**Flag:** `flag{r0b0ts_txt_tr34sur3_m4p}`
**How to find:**
Footer → "Debug ⚠" column → click **robots.txt**.
Inside the file content, there is a comment line:
```
# flag{r0b0ts_txt_tr34sur3_m4p}
```

---

### FLAG 04 — Integrations Page HTML Comment
**Flag:** `flag{1nt3gr4t10ns_c0mm3nt_f0und}`
**How to find:**
Navigate to the **Integrations** page.
View page source and search for `flag{` — it's in an HTML comment:
```html
<!-- flag{1nt3gr4t10ns_c0mm3nt_f0und} -->
```

---

### FLAG 05 — About Page HTML Comment
**Flag:** `flag{4b0ut_p4g3_html_c0mm3nt}`
**How to find:**
Navigate to **Company** page.
View page source — inside the About section, an HTML comment in the alert div:
```html
<!-- flag{4b0ut_p4g3_html_c0mm3nt} -->
```

---

### FLAG 06 — Changelog HTML Comment
**Flag:** `flag{ch4ng3l0g_c0mm3nt_d1sc0v3r3d}`
**How to find:**
Navigate to **Changelog** page.
View page source — inside the v2.3.1-beta entry block, hidden in an HTML comment:
```html
<!-- flag{ch4ng3l0g_c0mm3nt_d1sc0v3r3d} -->
```

---

### FLAG 07 — Hidden Meta Header Comment
**Flag:** `flag{h1dd3n_m3t4_h34d3r_f0und}`
**How to find:**
View page source → scroll to the very top `<head>` section.
After the standard meta tags, there is:
```html
<!-- X-Internal-Token: pls_hdr_t0k3n_7f2e9d -->
<!-- flag{h1dd3n_m3t4_h34d3r_f0und} -->
```

---

## ━━━ LEVEL 2 — MEDIUM (100 pts each) ━━━
*Exploit execution: Active interaction, credential use, injection attempts*

---

### FLAG 08 — Login with Admin Credentials
**Flag:** `flag{4dm1n_l0g1n_4cc3ss_gr4nt3d}`
**How to find:**
1. Find credentials from source code / login page HTML comments:
   `admin@pulsara.io` / `Puls4r4@dm1n!`
2. Navigate to **Sign in** page
3. Enter credentials and click Continue
4. After login, a notification pops up with the flag, AND it appears on the Overview dashboard

---

### FLAG 09 — Dashboard Access (any login)
**Flag:** `flag{d4shb04rd_4cc3ss_gr4nt3d}`
**How to find:**
Log in with any account (even `guest@pulsara.io` / `guest2026`).
Navigate to **Dashboard → Overview**.
The flag is shown in the blue "Challenge Flag Unlocked" box.

---

### FLAG 10 — SQL Injection — Reports Search
**Flag:** `flag{sql_1nj3ct10n_r3p0rt_l34k}`
**How to find:**
1. Log in to access dashboard
2. Go to **Dashboard → Reports**
3. In the search box, type: `' OR '1'='1` and click Search
4. The simulated SQL error dumps all records including the hidden `flag{...}` entry (row ID 99)

Also accessible via **Docs → Reports → Try it** button (no login required).

---

### FLAG 11 — Exposed .env File
**Flag:** `flag{3nv_f1l3_3xp0s3d_crit1cal}`
**How to find:**
Footer → "Debug ⚠" → click **.env (exposed)**.
Inside the file, a comment line contains the flag:
```
# flag{3nv_f1l3_3xp0s3d_crit1cal}
```

---

### FLAG 12 — Debug API Endpoint
**Flag:** `flag{d3bug_3ndp01nt_4ct1v3_1n_st4g1ng}`
**How to find:**
Navigate to **Docs** page.
Under "Internal Endpoints", click the `GET /internal/debug/flag` row to expand it.
Click **▶ Try it** — the response JSON contains the flag.

---

### FLAG 13 — API Config Endpoint
**Flag:** `flag{4p1_c0nf1g_3xp0s3d_cr1t1c4l}`
**How to find:**
Navigate to **Docs** page.
Under "Internal Endpoints", click the `GET /internal/config` row.
Click **▶ Try it (no auth needed)** — the JSON response contains the flag in the `"flag"` field.

---

### FLAG 14 — Inbox / Email Leak
**Flag:** `flag{1nb0x_r34d_m41l_l34k}`
**How to find:**
1. Log in with any account
2. Go to **Dashboard → Inbox**
3. Click the first message (from nadia@pulsara.io, subject "RE: Staging credentials")
4. Scroll through the message body — the flag appears near the bottom

---

### FLAG 15 — Database Dump
**Flag:** `flag{db_dump_cr3ds_3xp0s3d}`
**How to find:**
Footer → "Debug ⚠" → click **/db/dump.sql**.
Inside the SQL dump, in the `INSERT INTO system_flags` section:
`(3,'db_dump_flag','flag{db_dump_cr3ds_3xp0s3d}')`

---

## ━━━ LEVEL 3 — HARD (150 pts each) ━━━
*Chaining vulnerabilities, hidden DOM, undocumented paths, advanced exploitation*

---

### FLAG 16 — JWT alg=none Admin Bypass
**Flag:** `flag{jwt_4lg_n0n3_4dm1n_byp4ss}`
**How to find:**
1. Navigate to **Docs → Authentication → GET /auth/verify** — click to expand
2. Click **▶ Try alg=none exploit** — the response reveals the flag
   **OR (harder path):**
3. Go to **Dashboard → API Keys → JWT Token Inspector**
4. Craft a JWT manually:
   - Header (base64): `eyJhbGciOiJub25lIn0` = `{"alg":"none"}`
   - Payload (base64): `eyJlbWFpbCI6ImFkbWluQHB1bHNhcmEuaW8iLCJyb2xlIjoiYWRtaW4ifQ` = `{"email":"admin@pulsara.io","role":"admin"}`
   - Token: `eyJhbGciOiJub25lIn0.eyJlbWFpbCI6ImFkbWluQHB1bHNhcmEuaW8iLCJyb2xlIjoiYWRtaW4ifQ.`
5. Paste into the JWT Inspector box and click **Decode token**
6. The output shows the flag when the payload has `role: admin` and `alg: none`

---

### FLAG 17 — IDOR — Admin User Record
**Flag:** `flag{1d0r_4dm1n_us3r_3xp0s3d}`
**How to find:**
1. Log in (any account, even guest)
2. Go to **Dashboard → User Lookup**
3. Enter User ID `1` and click **Lookup**
4. The "Internal Notes" field for user 1 (admin) contains the flag

*(Also accessible via Docs → Users → Try it with ID=1)*

---

### FLAG 18 — IDOR — Full User Enumeration
**Flag:** `flag{1d0r_4ll_us3rs_3xp0s3d_gr34t_w0rk}`
**How to find:**
1. Log in, go to **Dashboard → User Lookup**
2. Enumerate user IDs 1 through 10 systematically
3. User ID **8** (celine@pulsara.io) has the flag in her "Internal Notes" field
   — this requires deliberately checking all IDs, not just 1

---

### FLAG 19 — Base64 Hidden DOM Attribute
**Flag:** `flag{b4s364_d4t4_4ttr1but3_h4ck3r}`
**How to find:**
1. Open browser DevTools → Console tab
2. The console prints a hint: `Try: atob(document.getElementById("__pls_internal").dataset.internal)`
3. Or directly inspect the DOM — there's a hidden `<div id="__pls_internal">` injected at the bottom of `<body>`
4. It has `data-internal` attribute set to a base64 string
5. Run in console: `atob(document.getElementById('__pls_internal').dataset.internal)`
6. Returns: `flag{b4s364_d4t4_4ttr1but3_h4ck3r}`

---

### FLAG 20 — Undocumented Endpoint in Docs Source
**Flag:** `flag{und0cum3nt3d_3ndp01nt_h4ck3r}`
**How to find:**
1. Navigate to the **Docs** page
2. View page source (Ctrl+U) and search for `UNDOCUMENTED`
3. Find the hidden HTML comment inside the docs page:
```html
<!--
  UNDOCUMENTED ENDPOINT:
  GET /internal/admin/export?token=MASTER_TOKEN
  Returns: full user table + flag{und0cum3nt3d_3ndp01nt_h4ck3r}
  Master token: pls_master_9f4e2b1a
-->
```
4. The flag is embedded directly in the comment — teams must inspect source to find it

---

## BONUS FLAGS (Optional — for tiebreakers)

### BONUS 01 — .git/config Deployment Key
**Flag:** `flag{g1t_c0nf1g_d3pl0y_k3y_l34k}`
Footer → .git/config → inside the file, a comment after the staging remote URL

### BONUS 02 — Backup Directory Leak
**Flag:** `flag{b4ckup_d1r_l1st1ng_l34k}`
Footer → /backup/ → inside the preview of `config_snapshot.json`

### BONUS 03 — IDOR User 7
**Flag:** `flag{1d0r_us3r7_f0und}`
User Lookup → ID 7 → Internal Notes field

---

## QUICK REFERENCE TABLE

| # | Flag Value | Level | Location |
|---|-----------|-------|----------|
| 01 | `flag{y0u_1nsp3ct3d_th3_s0urc3}` | Easy | `<head>` HTML comment |
| 02 | `flag{c0ns0l3_h1nt_r34d3r_g00d_3y3s}` | Easy | Browser console |
| 03 | `flag{r0b0ts_txt_tr34sur3_m4p}` | Easy | Footer → robots.txt |
| 04 | `flag{1nt3gr4t10ns_c0mm3nt_f0und}` | Easy | Integrations page source |
| 05 | `flag{4b0ut_p4g3_html_c0mm3nt}` | Easy | About page source |
| 06 | `flag{ch4ng3l0g_c0mm3nt_d1sc0v3r3d}` | Easy | Changelog page source |
| 07 | `flag{h1dd3n_m3t4_h34d3r_f0und}` | Easy | `<head>` meta comment |
| 08 | `flag{4dm1n_l0g1n_4cc3ss_gr4nt3d}` | Medium | Login as admin |
| 09 | `flag{d4shb04rd_4cc3ss_gr4nt3d}` | Medium | Dashboard overview box |
| 10 | `flag{sql_1nj3ct10n_r3p0rt_l34k}` | Medium | Reports SQLi |
| 11 | `flag{3nv_f1l3_3xp0s3d_crit1cal}` | Medium | Footer → .env |
| 12 | `flag{d3bug_3ndp01nt_4ct1v3_1n_st4g1ng}` | Medium | Docs → /internal/debug/flag |
| 13 | `flag{4p1_c0nf1g_3xp0s3d_cr1t1c4l}` | Medium | Docs → /internal/config |
| 14 | `flag{1nb0x_r34d_m41l_l34k}` | Medium | Dashboard → Inbox → msg 1 |
| 15 | `flag{db_dump_cr3ds_3xp0s3d}` | Medium | Footer → /db/dump.sql |
| 16 | `flag{jwt_4lg_n0n3_4dm1n_byp4ss}` | Hard | JWT alg=none exploit |
| 17 | `flag{1d0r_4dm1n_us3r_3xp0s3d}` | Hard | IDOR User ID=1 |
| 18 | `flag{1d0r_4ll_us3rs_3xp0s3d_gr34t_w0rk}` | Hard | IDOR User ID=8 |
| 19 | `flag{b4s364_d4t4_4ttr1but3_h4ck3r}` | Hard | DOM `data-internal` atob() |
| 20 | `flag{und0cum3nt3d_3ndp01nt_h4ck3r}` | Hard | Docs page source comment |
| B1 | `flag{g1t_c0nf1g_d3pl0y_k3y_l34k}` | Bonus | Footer → .git/config |
| B2 | `flag{b4ckup_d1r_l1st1ng_l34k}` | Bonus | Footer → /backup/ |
| B3 | `flag{1d0r_us3r7_f0und}` | Bonus | IDOR User ID=7 |

---

## DIFFICULTY BREAKDOWN

**Why are Hard flags actually hard?**

- **Flag 16 (JWT):** Requires understanding JWT structure, crafting tokens manually or knowing to use the JWT inspector with the right payload. Most teams won't think to try `alg=none`.
- **Flag 17-18 (IDOR):** Requires logging in first, then systematically enumerating IDs 1–10. Flag 18 specifically requires checking ID 8 — not obvious.
- **Flag 19 (Base64 DOM):** Requires either reading the console hint carefully AND knowing what `atob()` does, or inspecting the DOM directly to find `__pls_internal`. Most teams will miss this.
- **Flag 20 (Undocumented endpoint):** Requires viewing source of the Docs page specifically (not home or other pages), then searching for `UNDOCUMENTED` — the flag is buried in a code comment not visible in the rendered UI.

---

*This document is for organizers only. Do not distribute to participants.*