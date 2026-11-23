# Gojek GoRide - Fitur Pemilihan Tarif Berkeadilan (Hi-Fi Interactive Prototype)

[![Prototype Status](https://img.shields.io/badge/Prototype-Hi--Fi%20Interactive-0B6E4F?style=for-the-badge)](https://yuizhi23.github.io/gojek-goride-fare-selection/)
[![WCAG 2.1](https://img.shields.io/badge/Accessibility-WCAG%20AAA-success?style=for-the-badge)](#audit-aksesibilitas)
[![Figma Ready](https://img.shields.io/badge/Figma-Variables%20%26%20Tokens-F24E1E?style=for-the-badge&logo=figma)](./figma)

Prototipe antarmuka mobile Hi-Fi interaktif untuk fitur pemilihan opsi tarif GoRide (Cepat vs. Hemat) pada aplikasi Gojek, dirancang khusus dengan target resolusi **360 × 800 dp** (portrait, Bahasa Indonesia).

---

## 🎯 Latar Belakang & Persona

- **Persona**: **Raka**, 21 tahun, mahasiswa aktif.
- **Masalah Pengguna**: Sering memesan ojek online di pagi hari dalam kondisi terburu-buru mengejar jadwal kuliah pagi sambil memegang ponsel dengan **satu tangan (*one-handed thumb zone*)**.
- **Masalah Desain Konvensional**: Kartu tarif "Cepat" yang otomatis terpilih (*pre-selected*) dengan hierarki visual yang lebih mencolok (warna/ukuran) menyebabkan pengguna melewatkan opsi "Hemat" yang lebih ekonomis dan hanya berselisih waktu jemput 2 menit.
- **Solusi Desain**:
  1. **Dua Kartu Sejajar (*Equal Visual Weight*)**: Kartu Cepat & Hemat memiliki lebar 50-50, ukuran font sama, warna teks sama, dan latar surface putih netral yang sama.
  2. **Status Terpilih Non-Warna**: Menggunakan **border 2dp primary (#0B6E4F)** dan radio button checked (BUKAN latar belakang hijau penuh), menjaga kontras teks terhadap latar tetap pada level **16.1:1** (WCAG AAA).
  3. **Strip Selisih Transparan**: Ringkasan satu baris perbandingan harga dan waktu jemput (*"Hemat Rp4.500, jemput +2 menit"*).
  4. **Preferensi Tarif Tersimpan**: Opsi pengaturan bawaan di menu Profil dan batas toleransi jemput (0 s.d. +10 mnt, default +3 mnt).
  5. **Zona Jempol (*Thumb Zone*)**: Seluruh kontrol pemilihan dan konfirmasi berada di sepertiga bawah layar.

---

## 🎨 Design System Tokens

Semua komponen dikembangkan menggunakan CSS Variables terpusat tanpa *hardcoded value*:

| Token Name | Nilai Hex | Peran Desain | Rasio Kontras |
| :--- | :--- | :--- | :---: |
| `--primary` | `#0B6E4F` | Tombol primary, border 2dp kartu aktif, radio aktif | 5.8:1 (AA) |
| `--primary-subtle` | `#E8F3EE` | Latar strip selisih normal, badge "Sesuai preferensi" | - |
| `--text-primary` | `#1A1A1A` | Teks judul, harga, label utama | **16.1:1 (AAA)** |
| `--text-secondary` | `#5F6368` | Teks estimasi waktu jemput, subjudul, ikon sekunder | **4.6:1 (AA)** |
| `--surface` | `#FFFFFF` | Latar belakang dasar dan kartu tarif | - |
| `--surface-muted` | `#F3F4F6` | Skeleton shimmer, divider, latar input | - |
| `--border` | `#8D949E` | Border kartu default / unselected | 3.1:1 (AA) |
| `--warning-bg` | `#FFF4E0` | Latar peringatan Edge Case E1 | - |
| `--warning-text` | `#8A5A00` | Teks peringatan Edge Case E1 | **5.2:1 (AAA)** |
| `--error` | `#B3261E` | Indikator error dan koneksi gagal | 4.8:1 (AA) |

### Tipografi (Font Inter)
- `title`: 24px / line-height 32px Bold (700)
- `price`: 20px / line-height 28px SemiBold (600)
- `body-strong`: 16px / line-height 24px SemiBold (600)
- `body`: 16px / line-height 24px Regular (400)
- `small`: 14px / line-height 20px Regular (400)
- `caption`: 12px / line-height 16px Medium (500)

### Spasi & Dimensi (8pt Grid)
- **Spasi**: `4px, 8px, 16px, 24px, 32px, 48px`
- **Margin Layar & Gutter**: `16px` (4-Kolom Layout Grid)
- **Radius**: `4px` (badge), `8px` (kartu, input, tombol), `16px` (sudut atas bottom sheet), `999px` (pill)
- **Area Sentuh (*Tap Target*)**: Minimal `44 × 44 dp`
- **Tinggi Elemen Utama**: Minimal `48 dp` (tombol, input, kartu tarif, baris riwayat)

---

## 📱 Alur Layar (Happy Path & State Tambahan)

1. **Layar 1: Beranda**
   - Penanda *"Preferensi Hemat aktif (Maks. +3 mnt jemput)"*.
   - Kolom pencarian pill, ikon layanan 4 per baris, dan bottom navigation 4 tab.
2. **Layar 2: Preferensi Tarif**
   - Segmented control Cepat/Hemat untuk GoRide, GoCar, GoSend, dan GoFood.
   - Slider batas tambahan waktu jemput (0 s.d. +10 menit, default +3 mnt).
   - Toast notification *"Preferensi tersimpan"*.
3. **Layar 3: Pilih Tujuan**
   - Input tujuan dan daftar riwayat, dengan lokasi favorit *"Kampus Universitas"* di posisi teratas (1 ketukan).
4. **Layar 4: Pilih Tarif (Panel Pemilihan Tarif)**
   - Peta interaktif dengan simulasi rute dan pin lokasi.
   - Kartu Hemat Rp7.000 (jemput 6 menit) terpilih otomatis sesuai preferensi.
   - Kartu Cepat Rp11.500 (jemput 4 menit).
   - Strip selisih *"Hemat Rp4.500, jemput +2 menit"*.
   - Tombol primer *"Pesan GoRide Hemat"*.
5. **Layar 5: Driver Ditemukan**
   - Kartu pengemudi (Pak Budi Santoso, rating 4.9, Honda Vario 125, Plat B 1234 GJK).
   - Banner apresiasi: *"Kamu hemat Rp4.500 di perjalanan ini dan Rp36.000 bulan ini"*.
   - Dua tombol aksi: *Hubungi* (secondary) dan *Lacak* (primary).

### State Tambahan
- **Loading Skeleton**: Shimmer animation pada kartu tarif dengan tombol pesan disabled.
- **Edge Case E1 ("Hemat Ramai")**: Estimasi jemput Hemat 12 menit melebihi batas +3 menit pengguna; sistem otomatis mengalihkan pilihan default ke kartu Cepat disertai banner informatif kuning. Pengguna tetap dapat memilih Hemat jika diinginkan.
- **State Error**: Tampilan kegagalan koneksi *"Harga belum bisa dimuat. Periksa sinyal, lalu coba lagi."* dengan tombol *"Coba lagi"*.

---

## 🧩 Komponen React & Figma Code Connect

Komponen kode React dengan animasi motion (`framer-motion`) tersedia di:
- `src/GoRideFareSelection.tsx`
- `src/components/Button.tsx`
- `src/components/Button.figma.ts` (Figma Code Connect Template)
- `figma/screens/` (Vector SVG screens siap drag & drop ke Figma)
- `figma/figma-variables.json` (Design Tokens Variables import)

---

## 🚀 Menjalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/yuizhi23/gojek-goride-fare-selection.git
cd gojek-goride-fare-selection

# Jalankan server lokal
python3 -m http.server 8080

# Buka di browser
# http://localhost:8080
```
