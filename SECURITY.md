# 🔒 Security Guidelines - Portal Berita Kodim

## ⚠️ PENTING: Jangan Commit Data Sensitif!

File berikut **JANGAN PERNAH** di-commit ke Git:
- ❌ `.env` - Berisi credentials asli
- ❌ `.env.production` - Berisi credentials production
- ❌ File backup dengan credentials
- ❌ Screenshot yang menampilkan credentials

File `.gitignore` sudah dikonfigurasi untuk melindungi file-file di atas.

---

## 🔑 Credentials yang Harus Dijaga

### 1. Cloudinary Credentials
```env
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx  # ⚠️ RAHASIA!
```

**Risiko jika bocor:**
- Orang lain bisa upload gambar ke akun Anda
- Quota Cloudinary Anda bisa habis
- Bisa digunakan untuk spam/penyalahgunaan

### 2. Admin Password
```env
ADMIN_USERNAME=xxx
ADMIN_PASSWORD=xxx  # ⚠️ RAHASIA!
```

**Risiko jika bocor:**
- Orang lain bisa akses admin panel
- Bisa edit/hapus semua berita
- Bisa upload konten berbahaya

### 3. Database URL
```env
DATABASE_URL=postgres://xxx  # ⚠️ RAHASIA!
```

**Risiko jika bocor:**
- Akses penuh ke database
- Bisa hapus/ubah semua data
- Bisa extract data sensitif

---

## ✅ Best Practices

### 1. Setup Credentials dengan Aman

#### Di Lokal (.env):
```bash
# Simpan file .env di lokal saja
# JANGAN share atau commit!
```

#### Di Vercel:
```bash
# Set environment variables lewat dashboard Vercel
# Settings → Environment Variables
```

### 2. Gunakan Password yang Kuat

❌ **JANGAN:**
```
ADMIN_PASSWORD=admin
ADMIN_PASSWORD=12345
ADMIN_PASSWORD=password
```

✅ **GUNAKAN:**
```
ADMIN_PASSWORD=K0d!m2026$ecure#Pass
```

**Tips membuat password kuat:**
- Minimal 12 karakter
- Kombinasi huruf besar, kecil, angka, simbol
- Tidak menggunakan kata umum
- Unik untuk setiap sistem

### 3. Rotasi Credentials Berkala

Ganti credentials secara berkala:
- Admin password: Setiap 3-6 bulan
- Cloudinary API key: Jika ada indikasi kebocoran
- Database: Gunakan Vercel's automatic credential rotation

### 4. Verifikasi .gitignore

Pastikan `.gitignore` sudah benar:
```bash
# Cek file .gitignore
cat .gitignore | grep ".env"

# Output harus menampilkan:
.env
.env.production
```

### 5. Cek History Git

Jika tidak sengaja commit credentials:
```bash
# JANGAN hanya hapus di commit baru!
# Credentials tetap ada di history Git

# Solusi:
# 1. Ganti SEMUA credentials yang bocor
# 2. Update di Vercel environment variables
# 3. Rotate Cloudinary API keys
# 4. Ganti admin password
```

---

## 🚨 Jika Credentials Bocor

### Langkah Darurat:

#### 1. Cloudinary
1. Login ke [cloudinary.com](https://cloudinary.com)
2. Settings → Security
3. **Regenerate API Secret**
4. Update di Vercel environment variables
5. Redeploy aplikasi

#### 2. Admin Password
1. Update `.env` lokal dengan password baru
2. Update Vercel environment variables
3. Redeploy aplikasi

#### 3. Database
1. Di Vercel dashboard, rotate database credentials
2. Update `.env` lokal jika perlu
3. Redeploy aplikasi

---

## 📋 Checklist Keamanan

Sebelum push ke Git, pastikan:

- [ ] File `.env` ada di `.gitignore`
- [ ] Tidak ada credentials di kode
- [ ] Tidak ada hardcoded passwords
- [ ] Environment variables sudah di-set di Vercel
- [ ] Password admin sudah diganti dari default
- [ ] `.env.example` tidak berisi credentials asli

---

## 🔍 Cara Cek Credentials di Git

```bash
# Cek apakah .env pernah di-commit
git log --all --full-history -- .env

# Jika ada output, berarti pernah di-commit!
# Segera ganti semua credentials
```

---

## 📞 Jika Ada Pertanyaan

Jika ragu tentang keamanan:
1. Jangan share credentials lewat chat
2. Jangan screenshot file .env
3. Konsultasi dengan tim IT/security
4. Better safe than sorry!

---

## ✅ Template .env yang Aman

Gunakan `.env.example` sebagai template:
```env
# .env.example - AMAN untuk di-commit
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

File ini adalah **template** dan tidak berisi credentials asli.

---

**Remember**: Keamanan adalah tanggung jawab bersama! 🔒
