# DESIGN.md

Aturan desain UI/UX untuk Game Top-Up Platform. Tujuannya satu: hasil
akhir tidak boleh terlihat seperti template generik atau "AI slop" —
harus terasa dirancang khusus untuk produk ini, bukan tempelan dari
starter kit manapun.

Dokumen ini mengikat untuk siapa pun yang mengerjakan UI di repo ini,
termasuk AI coding agent. Baca ini sebelum menyentuh styling, layout,
atau komponen visual apa pun.

---

## 1. Dasari desain dari subjeknya, bukan dari template

Subjek produk ini: **top-up game** — transaksi cepat, dipercaya, dan
akrab dengan dunia gaming (bukan dunia SaaS B2B atau fintech korporat).
Audiensnya kebanyakan pemain game, sering diakses dari HP, ingin proses
singkat dari "pilih nominal" sampai "bayar" tanpa gesekan.

Pilihan visual (warna, tipografi, layout) harus berangkat dari fakta itu
— bukan dari "desain web yang aman dan netral" yang bisa dipakai untuk
produk apa saja. Kalau sebuah keputusan desain bisa ditempel begitu saja
ke landing page SaaS lain tanpa terasa aneh, keputusan itu belum cukup
spesifik untuk produk ini.

---

## 2. Pola yang DILARANG dipakai tanpa alasan kuat

Ini pola yang paling sering muncul di hasil generate AI dan langsung
mengkhianati bahwa sebuah halaman dibuat tanpa arahan desain yang
sungguh-sungguh. Jangan pakai kecuali ada alasan spesifik yang sudah
dipertimbangkan dan dicatat:

- **Palet cream/off-white (sekitar `#F4F1EA`) dipasangkan dengan aksen
  terracotta/warm-clay (sekitar `#D97757`)** — ini kombinasi paling umum
  dihasilkan AI, dan karena mirip warna aksen Claude, langsung terbaca
  sebagai "dibuat AI tanpa arahan".
- **Background hampir hitam dengan satu aksen hijau-acid atau vermilion
  terang** — pola default kedua yang sama generiknya.
- **Semua konten dipotong jadi kartu-kartu seragam**: border-radius sama
  di semua elemen tanpa mempertimbangkan hierarki, shadow abu-abu lembut
  yang sama di bawah setiap kartu (`rgba(0,0,0,.1)`), gradient dekoratif
  tanpa fungsi.
- **Label tracked-out ALL CAPS di atas setiap heading** ("eyebrow
  label"), terutama kalau dipakai di semua section tanpa kecuali.
- **Meta text yang disambung middle dot** (`A · B · C`) atau format
  `KATA — fragmen` dengan em dash berspasi.
- **Angka/urutan `01 / 02 / 03`** dipakai sebagai dekorasi — ini cuma
  sah kalau kontennya memang sebuah urutan/langkah (misal: alur checkout
  3 langkah), bukan untuk sekadar "menghias" daftar fitur.
- **Menambahkan tanda panah `→` di akhir teks tombol/link** sebagai
  kebiasaan, bukan karena memang menunjukkan navigasi ke tempat lain.
- **Font monospace untuk label data kecil** tanpa alasan (ini bukan
  dashboard developer).
- **Hitam yang di-tint** (`#0B0B0B`, `#111`) dipakai sebagai pengganti
  hitam asli tanpa keputusan sadar soal kenapa.
- **Animasi fade-and-slide-up di setiap section saat scroll**, dan
  transisi hover yang identik di semua kartu — ini default generator AI,
  bukan hasil pertimbangan desain.
- **Mengaksen satu kata di headline** (italic/bold/warna beda pada satu
  kata saja) sebagai kebiasaan dekoratif.

Semua pola di atas sah dipakai **kalau** memang itu pilihan paling tepat
untuk kebutuhan spesifik halaman ini — tapi itu harus jadi keputusan
sadar yang bisa dijelaskan, bukan default yang dipakai begitu saja
karena "biasanya begini".

---

## 3. Proses: rencana dulu, baru kode

Sebelum menulis komponen/styling baru, siapkan dulu plan singkat:

- **Warna**: 4–6 warna inti dalam hex, masing-masing dengan nama perannya
  (bukan cuma "primary/secondary" generik — misal "merah urgensi untuk
  status gagal", bukan sekadar "accent").
- **Tipografi**: pilih typeface secara sadar untuk nuansa produk ini
  (cepat, modern, akrab dengan gaming), bukan default yang dipakai di
  project lain. Satu atau dua typeface, kalau dua harus jelas beda
  perannya (display vs body).
- **Layout**: deskripsikan konsep layout tiap halaman dalam 1-2 kalimat,
  bisa disertai wireframe ASCII kalau membantu.
- **Prinsip**: 1-2 kalimat soal apa yang membuat halaman ini terasa khas
  milik produk ini, bukan produk lain.

Setelah plan itu dibuat, **cek ulang**: kalau sebuah bagian dari plan
terasa seperti hal yang akan dihasilkan untuk brief apa pun (bukan
khusus top-up game), revisi bagian itu dulu sebelum mulai menulis kode.

---

## 4. Prinsip tambahan

- **Hierarki lewat struktur, bukan dekorasi.** Garis, border, divider,
  dan label harus menyampaikan informasi (misal: ini batas antar section
  yang berbeda fungsinya), bukan sekadar hiasan.
- **Satu momen berani, sisanya tenang.** Jangan semua elemen berusaha
  menonjol sekaligus. Pilih satu titik fokus per halaman (misal: harga
  nominal top-up di halaman checkout), dan biarkan elemen lain mendukung
  dengan tenang.
- **Motion seperlunya.** Animasi yang menjawab aksi user (klik, buka,
  konfirmasi) boleh; animasi otomatis yang berjalan sendiri di banyak
  tempat sekaligus (entrance animation di tiap section) dihindari.
- **Line length dan readability.** Teks body idealnya di bawah ~80
  karakter per baris.
- **Baseline kualitas wajib, tanpa diumumkan**: responsif sampai layar
  HP kecil, fokus keyboard terlihat jelas, kontras warna cukup untuk
  dibaca, `prefers-reduced-motion` dihormati.

---

## 5. Copy / teks dalam UI

- Tulis dari sudut pandang pengguna, bukan dari sudut pandang sistem.
  "Pembayaran berhasil", bukan "Transaction status: SUCCESS".
- Tombol aksi memakai kata kerja yang jelas tentang apa yang terjadi:
  "Bayar sekarang", bukan "Submit" atau "Lanjutkan" yang generik.
- Nama aksi konsisten dari tombol sampai hasilnya: tombol "Buat Pesanan"
  diikuti pesan "Pesanan dibuat", bukan berubah jadi istilah lain di
  langkah berikutnya.
- Pesan error dan empty state ditulis dengan suara produk, jelas soal
  apa yang terjadi dan apa langkah berikutnya — bukan pesan generik
  seperti "Something went wrong" atau traceback teknis.
- Bahasa Indonesia yang natural dan santai (sesuai gaya project ini),
  hindari istilah teknis backend bocor ke UI (misal: jangan tampilkan
  `game_server_id` mentah sebagai label, tampilkan "Server ID").

---

## 6. Sebelum menganggap sebuah halaman selesai

- Ambil screenshot (atau jalankan di browser) dan lihat ulang: apakah
  ini terasa seperti halaman yang dibuat khusus untuk top-up game, atau
  bisa ditempel ke produk lain tanpa terasa aneh?
- Cek ulang terhadap daftar pola terlarang di bagian 2 — apakah ada yang
  kepakai tanpa alasan sadar?
- Kalau ragu, kurangi satu elemen dekoratif sebelum menambah yang baru.