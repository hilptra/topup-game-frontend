# Game Top-Up Platform — Frontend Requirements

Dokumen ini melengkapi `REQUIREMENTS.md` di repo backend, khusus membahas
bagian web frontend (Next.js). Backend sudah selesai dan menyediakan
seluruh endpoint yang dibutuhkan frontend ini.

---

## 1. Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | Next.js (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (Base UI, preset Nova — Lucide icons, Geist font) |
| Data Fetching/Cache | TanStack Query |
| HTTP Client | Axios |
| Form | React Hook Form + Zod |
| Auth | Token-based (Bearer token dari Laravel Sanctum), disimpan di `localStorage` |

---

## 2. Backend yang Dikonsumsi

Base URL diatur lewat env var `NEXT_PUBLIC_API_URL` (lokal:
`http://127.0.0.1:8000/api`).

Endpoint yang sudah tersedia di backend dan siap dikonsumsi:

```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /me
PUT    /profile
PUT    /profile/password
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /email/verify/{id}/{hash}
POST   /email/resend

GET    /games
GET    /games/{slug}
GET    /products

POST   /games/{game}/validate-account
GET    /orders
POST   /orders
GET    /orders/{order}

POST   /payments
POST   /webhooks/payment   (dipanggil Midtrans, bukan dari frontend)
```

Semua response sukses berbentuk `{ "data": ..., "message"?: ... }`.
Semua response error berbentuk `{ "message": ..., "errors"?: {...} }`
dengan status code sesuai (`401`, `403`, `404`, `422`, dst).

---

## 3. Scope MVP Frontend

### 3.1 Halaman yang dibangun

| Route | Deskripsi | Endpoint terkait |
|---|---|---|
| `/` | Home, daftar game | `GET /games` |
| `/games/[slug]` | Detail game + daftar produk | `GET /games/{slug}` |
| `/login` | Form login | `POST /auth/login` |
| `/register` | Form register | `POST /auth/register` |
| `/forgot-password` | Form minta reset password | `POST /auth/forgot-password` |
| `/reset-password` | Form set password baru (dari link email) | `POST /auth/reset-password` |
| `/checkout/[productId]` | Input User ID/Server ID, validasi, buat order | `POST /games/{game}/validate-account`, `POST /orders` |
| `/payment/[orderId]` | Trigger Snap popup | `POST /payments` |
| `/orders` | Riwayat transaksi (butuh login) | `GET /orders` |
| `/orders/[id]` | Detail satu transaksi | `GET /orders/{order}` |
| `/profile` | Lihat/update profil, ganti password | `GET /me`, `PUT /profile`, `PUT /profile/password` |

### 3.2 Di luar scope MVP frontend

- Halaman admin (kelola game/produk) — menyusul setelah backend admin
  endpoint selesai
- Dark mode toggle manual (ikut preferensi sistem saja)
- Notifikasi realtime status order (polling manual sudah cukup untuk MVP)
- Multi-bahasa

---

## 4. Alur Autentikasi

1. Login/register berhasil → simpan `token` dari response ke `localStorage`
2. Axios instance (`src/lib/axios.ts`) otomatis menempelkan header
   `Authorization: Bearer <token>` ke setiap request lewat interceptor
3. Route yang butuh login (`/orders`, `/profile`, `/checkout`, dst) dicek
   di client: kalau tidak ada token, redirect ke `/login`
4. Logout → panggil `POST /auth/logout`, lalu hapus token dari
   `localStorage` dan redirect ke `/`

---

## 5. Alur Pembayaran (Snap)

1. User submit checkout → `POST /orders` → dapat `order.id`
2. Redirect ke `/payment/[orderId]`
3. Halaman itu memanggil `POST /payments` dengan `order_id` → dapat
   `snap_token`
4. Load Midtrans Snap.js (`https://app.sandbox.midtrans.com/snap/snap.js`)
   dengan `data-client-key` dari `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY`
5. Panggil `window.snap.pay(snap_token, { onSuccess, onPending, onError })`
   untuk memunculkan popup pembayaran
6. Setelah user menyelesaikan/menutup popup, arahkan ke halaman riwayat
   order (`/orders/[id]`) — status final ditentukan oleh webhook di
   backend, bukan oleh callback Snap di frontend, karena callback Snap
   hanya mencerminkan status sisi client

---

## 6. Environment Variables

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=<client_key_sandbox>
```

`NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` ditambahkan saat halaman pembayaran
mulai dikerjakan. Client Key aman diekspos ke browser (bukan Server Key).

---

## 7. Struktur Folder

```
src/
├── app/                    → routes (App Router)
├── components/
│   ├── providers/          → QueryProvider, dll
│   └── ui/                 → komponen shadcn/ui
├── lib/
│   ├── axios.ts            → instance axios terpusat
│   └── utils.ts
└── types/                  → tipe TypeScript bersama (Game, Product, Order, dst)
```

---

## 8. Urutan Pengerjaan

1. Setup project, axios, TanStack Query (selesai)
2. Halaman Login & Register
3. Halaman Home (list game) & Detail Game (list produk)
4. Halaman Checkout (validasi akun + buat order)
5. Halaman Payment (Snap integration)
6. Halaman Riwayat Order
7. Halaman Profil
8. Polish: loading state, error handling, responsive