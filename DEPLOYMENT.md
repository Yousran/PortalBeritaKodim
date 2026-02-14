# 🚀 Tutorial Deploy Portal Berita Kodim ke Vercel

## 📋 Ringkasan Perubahan

Aplikasi Anda sekarang menggunakan **Hybrid Mode**:

### 🏠 Development (Lokal)
- **Database**: `data/cms.json` (file lokal)
- **Upload Gambar**: `public/uploads/` (folder lokal)
- ✅ Tidak perlu koneksi internet
- ✅ Cepat dan mudah testing

### ☁️ Production (Vercel)
- **Database**: Neon Postgres (cloud database)
- **Upload Gambar**: Cloudinary (cloud storage)
- ✅ Data persistent dan reliable
- ✅ Gambar tersimpan permanen

---

## 🛠️ Setup Cloudinary

### 1. Daftar Akun Cloudinary (Sudah Selesai ✅)
Credentials sudah tersimpan di `.env`:
```
CLOUDINARY_CLOUD_NAME=dbcznk1py
CLOUDINARY_API_KEY=535835757794837
CLOUDINARY_API_SECRET=jfqByQnxn0BkkZOv5NTZLBPjr34
```

### 2. Verifikasi Dashboard
1. Login ke [cloudinary.com](https://cloudinary.com)
2. Pastikan folder `portal-berita-kodim` akan otomatis dibuat saat upload pertama

---

## 🗄️ Setup Neon Postgres di Vercel

### 1. Buat Database di Vercel
1. Buka [vercel.com](https://vercel.com) dan login
2. Pilih project Anda: **PortalBeritaKodim**
3. Klik tab **Storage** (di menu atas)
4. Klik **Create Database**
5. Pilih **Neon (Postgres)**
6. Klik **Continue** → **Create**

### 2. Copy Database URL
Setelah database dibuat, Vercel akan menampilkan environment variables:
```
DATABASE_URL=postgres://...
```

Copy nilai `DATABASE_URL` ini.

### 3. Tambahkan ke .env Lokal (Optional - untuk testing)
Jika ingin test database di lokal, tambahkan ke file `.env`:
```bash
DATABASE_URL=postgres://your-connection-string-here
```

> **Catatan**: Untuk development lokal, biarkan `DATABASE_URL` kosong agar tetap pakai JSON file.

---

## 📊 Migrasi Data ke Database

Setelah setup Neon database dan punya `DATABASE_URL`:

### 1. Set Environment Variable
```bash
# Windows PowerShell
$env:DATABASE_URL="postgres://your-connection-string"
```

### 2. Jalankan Migrasi
```bash
npm run db:migrate
```

Script ini akan:
- ✅ Membuat tabel `news` dan `settings`
- ✅ Migrate semua data dari `cms.json` ke database
- ✅ Setup index untuk performa

### Output yang diharapkan:
```
🚀 Memulai migrasi data...
📋 Membuat tabel database...
✅ Tabel berhasil dibuat
📦 Membaca data dari cms.json...
✅ Ditemukan X berita
📝 Migrasi data berita...
✅ X berita berhasil dimigrasikan
⚙️  Migrasi settings...
✅ Settings berhasil dimigrasikan
🎉 Migrasi selesai! Database siap digunakan.
```

---

## 🚀 Deploy ke Vercel

### 1. Push Code ke Git
```bash
git add .
git commit -m "Add Neon + Cloudinary integration"
git push origin main
```

### 2. Deploy Otomatis
Vercel akan otomatis deploy setelah push.

### 3. Set Environment Variables di Vercel
Vercel Dashboard → Settings → Environment Variables → tambahkan:

```
CLOUDINARY_CLOUD_NAME=dbcznk1py
CLOUDINARY_API_KEY=535835757794837
CLOUDINARY_API_SECRET=jfqByQnxn0BkkZOv5NTZLBPjr34
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin12345
```

> **Penting**: `DATABASE_URL` sudah otomatis tersedia setelah buat Neon database, tidak perlu ditambahkan manual.

### 4. Redeploy
Setelah set environment variables, klik **Redeploy** di Vercel.

---

## ✅ Testing

### Development (Lokal)
```bash
npm run dev
```
- Upload gambar → tersimpan di `public/uploads/`
- Data berita → tersimpan di `data/cms.json`
- Cek console log: `✅ [DEV] Image saved locally`

### Production (Vercel)
Buka URL production Anda dan test:
- Upload gambar → tersimpan di Cloudinary
- Data berita → tersimpan di Neon database
- Cek Vercel logs: `✅ [PROD] Image uploaded to Cloudinary`

---

## 🔍 Troubleshooting

### Error: "Database not configured"
**Solusi**: Pastikan `DATABASE_URL` sudah diset di Vercel environment variables.

### Error: "Upload failed" di production
**Solusi**: 
1. Cek Cloudinary credentials di Vercel environment variables
2. Pastikan tidak ada typo di nama variable

### Gambar tidak muncul setelah deploy
**Solusi**:
- Lokal: Gambar lama di `public/uploads/` tidak ter-deploy. Upload ulang via admin panel.
- Production: Gambar tersimpan di Cloudinary dengan URL lengkap.

### Data berita hilang setelah deploy
**Solusi**: 
1. Pastikan sudah jalankan `npm run db:migrate` dengan `DATABASE_URL` yang benar
2. Cek Vercel logs untuk error database connection

---

## 📁 File yang Berubah

### File Baru:
- `src/lib/db.ts` - Database connection utility
- `database/schema.sql` - Database schema
- `database/migrate.ts` - Migration script
- `DEPLOYMENT.md` - Tutorial ini

### File yang Diupdate:
- `src/pages/api/cms.ts` - Hybrid database (JSON + Neon)
- `src/pages/api/upload.ts` - Hybrid upload (Local + Cloudinary)
- `package.json` - Tambah script `db:migrate`
- `.env` - Tambah Cloudinary & Database credentials

---

## 📞 Bantuan

Jika ada masalah:
1. Cek Vercel deployment logs
2. Cek Vercel function logs (Runtime Logs)
3. Cek browser console untuk error client-side

---

## 🎉 Selesai!

Sekarang aplikasi Anda:
- ✅ Bisa edit data dan upload gambar di production
- ✅ Data tersimpan permanent di Neon database
- ✅ Gambar tersimpan permanent di Cloudinary
- ✅ Development tetap cepat dengan JSON file lokal

**Selamat! Portal Berita Kodim sudah production-ready!** 🚀
