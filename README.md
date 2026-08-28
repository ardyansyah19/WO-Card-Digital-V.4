# 💍 Wedding Invitation — Aryan & Yasmin

wedding-invitation/
├── index.html        ← Halaman utama
├── style.css         ← Semua styling & animasi
├── script.js         ← Semua fitur interaktif (24 modul)
├── README.md         ← Panduan ini
└── assets/
    ├── cover.jpg     ← Foto pasangan (cover)
    ├── groom.jpg     ← Foto mempelai pria
    ├── bride.jpg     ← Foto mempelai wanita
    └── hero.jpg      ← Foto background hero
```

---

## 🎨 Tema & Warna

| Komponen | Warna |
|----------|-------|
| Background Utama | Emerald Dark `#0d2b1e` |
| Aksen Gold | `#c9a84c` → `#e2c87a` |
| Background Cream | `#faf7f2` |
| Font Script | Cormorant Garamond Italic |
| Font Dekoratif | Cinzel Decorative |

---

## ✨ Fitur Lengkap

### 🎬 Animasi & Visual
- **Loading Screen** — Ring spinner + progress bar animasi
- **Canvas Petal Rain** — Partikel emas melayang di cover
- **Parallax Hero** — Efek kedalaman saat scroll
- **Flip Countdown** — Timer animasi flip seperti papan skor
- **Shimmer Effect** — Kilau cahaya di semua foto
- **Sparkle Particles** — Bintang animasi di section Qur'an
- **Footer Petals** — Daun/kelopak mengambang naik
- **Hero Particles** — Partikel ambient di hero section
- **Cursor Glow** — Cahaya mengikuti kursor (desktop)
- **Reveal on Scroll** — Setiap elemen muncul saat digulir
- **Typing Effect** — Teks mengetik di hero subtitle
- **3D Tilt Cards** — Kartu miring mengikuti mouse

### 📱 UI/UX
- **Loading Screen** animasi sebelum konten tampil
- **Cover Gate** dengan frame foto melengkung elegan
- **Navigation Dots** — Indikator posisi scroll di kanan
- **Progress Bar** — Garis progress di atas halaman
- **Floating FABs** — Tombol musik & kembali ke atas
- **Gallery Lightbox** — Foto fullscreen + swipe + keyboard
- **RSVP Form** — Validasi + counter karakter
- **Wishes Live** — Ucapan muncul langsung tanpa reload
- **Copy Rekening** — Satu klik salin nomor
- **Add to Calendar** — Export ke Google Calendar
- **Toast Notification** — Popup konfirmasi aksi

### 🔗 Fitur Teknis
- **URL Personalisasi**: `?to=NamaTamu`
- **Background Music** player dengan toggle
- **Responsive** mobile-first
- **Accessibility** (ARIA, keyboard nav)
- **prefers-reduced-motion** untuk aksesibilitas

---

## 🚀 Cara Penggunaan

### Buka Langsung
Buka `index.html` di browser mana saja — tidak perlu server!

### Personalisasi Nama Tamu
Tambahkan parameter URL:
```
index.html?to=Bapak+Ahmad+dan+Ibu+Sari
```

### Deploy ke Internet (Gratis)
1. **Netlify Drop** → drag & drop folder ke [netlify.com/drop](https://netlify.com/drop)
2. **GitHub Pages** → upload ke GitHub repo, aktifkan Pages
3. **Vercel** → import dari GitHub

---

## ✏️ Cara Kustomisasi

### Ganti Nama Pasangan
Cari `Aryan` dan `Yasmin` di `index.html` → ganti dengan nama klien

### Ganti Tanggal
- `index.html`: Cari `15 Maret 2026`
- `script.js` baris ~114: `new Date('2026-03-15T08:00:00+07:00')`

### Ganti Foto
Letakkan foto baru di folder `assets/` dengan nama sama:
- `cover.jpg` — foto berdua (rasio 3:4)
- `groom.jpg` — foto pria (rasio 1:1)
- `bride.jpg` — foto wanita (rasio 1:1)
- `hero.jpg` — foto venue/background (rasio 16:9)

### Ganti Lokasi Acara
Cari `Masjid Al-Ikhlas` dan `The Botanical Grand Ballroom` di `index.html`

### Ganti Nomor Rekening
- `index.html`: Teks rekening yang tampil
- `script.js`: Nomor yang disalin (tanpa spasi)

### Ganti Musik
Ganti URL audio di `index.html`:
```html
<source src="URL_MUSIK_ANDA.mp3" type="audio/mpeg">
```

---

## 📞 Dukungan

Website ini dibuat khusus untuk Aryan & Yasmin.
Untuk kustomisasi lebih lanjut, hubungi Wedding Organizer kami.

---
*Dibuat dengan ❤ — Wedding Invitation v2.0 Premium*
