# ⚡ Quick Start - Portal Berita Kodim

## 🏃 Cara Cepat Mulai

### 1️⃣ Development Lokal (Seperti Biasa)
```bash
npm run dev
```
✅ Tetap pakai JSON file dan folder lokal
✅ Tidak perlu setup database/Cloudinary
✅ Bekerja offline

---

### 2️⃣ Deploy ke Vercel (Pertama Kali)

#### A. Setup Neon Database
1. Buka [vercel.com](https://vercel.com) → Project Anda
2. Tab **Storage** → **Create Database** → Pilih **Neon**
3. Copy `DATABASE_URL` yang diberikan

#### B. Setup Cloudinary
1. Daftar di [cloudinary.com](https://cloudinary.com) (gratis)
2. Dashboard → Copy credentials:
   - Cloud Name
   - API Key
   - API Secret

#### C. Set Environment Variables di Vercel
Go to: **Settings** → **Environment Variables**

Tambahkan:
```env
CLOUDINARY_CLOUD_NAME=isi_dari_cloudinary_dashboard
CLOUDINARY_API_KEY=isi_dari_cloudinary_dashboard
CLOUDINARY_API_SECRET=isi_dari_cloudinary_dashboard
ADMIN_USERNAME=username_pilihan_anda
ADMIN_PASSWORD=password_yang_kuat_dan_aman
```

> **⚠️ PENTING**: Ganti semua nilai dengan credentials asli Anda. Jangan gunakan contoh di atas!

#### D. Migrate Data ke Database
Di terminal lokal:
```bash
# Windows PowerShell
$env:DATABASE_URL="postgres://your-neon-url-from-vercel"
npm run db:migrate
```

#### E. Deploy
```bash
git add .
git commit -m "Setup cloud database"
git push
```

Vercel akan auto-deploy! 🚀

---

## 🔄 Update Setelah Setup Awal

Setelah database sudah setup, untuk update berita cukup:

1. **Edit di Admin Panel** (lokal atau production)
2. **Data otomatis sync** ke database production
3. Tidak perlu migrate lagi

---

## 📊 Mode Kerja

| Aspek | Development (Lokal) | Production (Vercel) |
|-------|-------------------|-------------------|
| Database | `data/cms.json` | Neon Postgres |
| Upload Gambar | `public/uploads/` | Cloudinary |
| Speed | ⚡ Instant | 🌐 Fast |
| Internet | ❌ Not required | ✅ Required |

---

## ❓ FAQ

### Q: Gambar yang sudah di-upload lokal hilang setelah deploy?
**A**: Ya, gambar lokal di `public/uploads/` tidak ter-deploy. Upload ulang melalui admin panel production (akan tersimpan di Cloudinary).

### Q: Harus migrate data setiap kali deploy?
**A**: Tidak! Migrate hanya sekali saja saat pertama setup. Setelah itu data langsung tersimpan di database cloud.

### Q: Bisa test database cloud di lokal?
**A**: Ya! Set `DATABASE_URL` di file `.env` lokal dengan connection string dari Vercel.

### Q: Credentials apa saja yang harus di-setup?
**A**: 
- Cloudinary: Cloud Name, API Key, API Secret
- Admin: Username dan Password (pilih yang kuat)
- Database: Otomatis dari Vercel (DATABASE_URL)

---

## 🆘 Troubleshooting Cepat

### Upload gambar error di production
```bash
# Cek environment variables di Vercel
# Pastikan CLOUDINARY_* sudah diset dengan benar
```

### Data berita tidak muncul di production
```bash
# Jalankan migrate lagi
$env:DATABASE_URL="your-connection-string"
npm run db:migrate
```

### Error "Database not configured"
```bash
# Pastikan DATABASE_URL sudah di environment variables Vercel
# Redeploy setelah set environment variables
```

### Admin login tidak bisa
```bash
# Cek ADMIN_USERNAME dan ADMIN_PASSWORD di Vercel environment variables
# Pastikan sesuai dengan yang Anda set
```

---

## 🔒 Keamanan

### ⚠️ JANGAN:
- ❌ Share credentials Cloudinary
- ❌ Commit file `.env` ke Git
- ❌ Gunakan password admin yang lemah
- ❌ Share DATABASE_URL di publik

### ✅ LAKUKAN:
- ✅ Gunakan password admin yang kuat
- ✅ Simpan credentials di tempat aman
- ✅ Update password secara berkala
- ✅ Gunakan `.env.example` sebagai template

---

## 📚 Dokumentasi Lengkap

Baca [DEPLOYMENT.md](DEPLOYMENT.md) untuk tutorial detail.

---

Made with ❤️ for Kodim 1408/Makassar
