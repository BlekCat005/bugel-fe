# Bugel Info Hub

Monorepo ringan untuk frontend (Vite + React + TypeScript) dan backend (Express + MongoDB) yang sekarang dipisah folder supaya bisa di-deploy terpisah ke Vercel.

## Struktur
- Frontend: akar repo (Vite). Entrypoint Vite ada di [src/main.tsx](src/main.tsx).
- Backend: folder [backend](backend). Entrypoint API ada di [backend/index.js](backend/index.js).

## Prasyarat
- Node.js 18+ dan npm.
- MongoDB URL untuk backend.

## Menjalankan lokal
### Frontend
```sh
npm install
npm run dev
```

### Backend
```sh
cd backend
npm install
npm run dev
```
Backend membaca konfigurasi dari berkas [.env](backend/.env) dengan variabel `DATABASE_URL`, `DB_NAME`, dan opsional `PORT` (default 4000).

## Deploy ke Vercel
1. Buat dua project terpisah di Vercel.
2. Frontend: pilih root repo sebagai Project Root, jalankan build command `npm run build` dan output `dist` (default Vite).
3. Backend: pilih folder `backend` sebagai Project Root, set Environment Variables (`DATABASE_URL`, `DB_NAME`, `PORT` jika perlu) dan start command `npm run start`.
4. Atur `VITE_API_URL` di environment frontend agar menunjuk ke URL backend di Vercel.

## Catatan lain
- Upload file disimpan sementara di memori (multer memory storage) lalu disimpan di database dalam bentuk data URI.
- Pastikan MongoDB cluster dapat diakses dari lingkungan Vercel yang digunakan.
