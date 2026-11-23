# Panduan Import ke Figma: Gojek GoRide Fare Selection

Folder ini berisi aset lengkap yang siap dimasukkan ke Figma dengan 3 metode termudah:

---

### Cara 1: Drag & Drop Langsung (Paling Cepat - 5 Detik)
Semua file layar di folder `screens/` dibuat dalam format Vector SVG standar ukuran **360 × 800 dp** dengan penamaan layer atomik (*Layar/Organism/Molekul/Atom*):
1. Buka Figma dan buat file baru (*New Design File*).
2. Buka folder [screens/](file:///Users/yukiekiyoshi/Downloads/desain%20interaksi/figma/screens).
3. **Pilih dan Drag & Drop** file berikut langsung ke atas canvas Figma:
   - `01_beranda.svg`
   - `02_preferensi_tarif.svg`
   - `04_pilih_tarif.svg` (Layar Inti Pemilihan Tarif)
   - `04b_pilih_tarif_edge1.svg` (Edge Case E1: Hemat Ramai)
   - `05_driver_ditemukan.svg`
4. Seluruh teks, warna hex, border, radio button, dan kartu akan langsung menjadi **native Figma vector frame & shapes** yang dapat diedit (*editable*).

---

### Cara 2: Import Otomatis Jadi Auto-Layout via Plugin "html.to.design"
Karena prototype sudah berjalan di server lokal (`http://localhost:8080`), Anda bisa mengonversinya menjadi **Figma Auto-Layout & Components**:
1. Buka Figma -> Klik kanan di canvas -> **Plugins** -> Cari **html.to.design**.
2. Masukkan URL: `http://localhost:8080`.
3. Pilih ukuran viewport: **Mobile (360 x 800)**.
4. Klik **Import**. Seluruh DOM HTML/CSS dan autolayout akan otomatis tersusun ke layer Figma.

---

### Cara 3: Import Design Tokens / Variables ke Figma
File token telah disiapkan di [figma-variables.json](file:///Users/yukiekiyoshi/Downloads/desain%20interaksi/figma/figma-variables.json):
1. Menggunakan plugin **Tokens Studio for Figma** atau **Variables Import**.
2. Pilih file `figma-variables.json` untuk otomatis membuat:
   - **Color Variables**: `color/primary (#0B6E4F)`, `color/primary-subtle (#E8F3EE)`, `color/text-primary (#1A1A1A)`, `color/warning-bg (#FFF4E0)`, dll.
   - **Spacing Variables**: 4, 8, 16, 24, 32, 48.
   - **Corner Radius Variables**: 4, 8, 16, 999.
   - **Text Styles**: Inter (Title, Price, Body, Small, Caption).
