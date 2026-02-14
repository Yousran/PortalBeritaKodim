import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { v2 as cloudinary } from 'cloudinary';
import { isDev } from '../../lib/db';

// Cloudinary configuration (only for production)
if (!isDev) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const UPLOAD_DIR = path.resolve('public/uploads');

// Pastikan folder uploads ada (untuk development)
if (isDev && !fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return new Response(JSON.stringify({ ok: false, error: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ ok: false, error: 'Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ ok: false, error: 'Ukuran file terlalu besar. Maksimal 5MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let publicUrl: string;

    // HYBRID MODE: Development = local folder, Production = Cloudinary
    if (isDev) {
      // === DEVELOPMENT: Save to local folder ===
      const timestamp = Date.now();
      const ext = path.extname(file.name);
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30);
      const filename = `${timestamp}-${sanitizedName}${ext}`;
      const filepath = path.join(UPLOAD_DIR, filename);

      fs.writeFileSync(filepath, buffer);
      publicUrl = `/uploads/${filename}`;
      
      console.log('✅ [DEV] Image saved locally:', publicUrl);
    } else {
      // === PRODUCTION: Upload to Cloudinary ===
      const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;
      
      const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: 'portal-berita-kodim',
        resource_type: 'image',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });

      publicUrl = uploadResult.secure_url;
      
      console.log('✅ [PROD] Image uploaded to Cloudinary:', publicUrl);
    }

    return new Response(JSON.stringify({ ok: true, url: publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('Upload error:', e);
    return new Response(JSON.stringify({ ok: false, error: 'Terjadi kesalahan saat upload file.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};