# PA-Project

## 1. Deskripsi
PA-Project adalah sebuah aplikasi backend berbasis **Hapi.js** yang terintegrasi dengan **PostgreSQL** untuk mengelola data pengguna dan keranjang belanja (shopping cart). Proyek ini dirancang dengan struktur modular (services, controllers, routes, dll) sehingga mudah untuk dikembangkan dan dipelihara.  

## 2. Tech Stack + Versi
- **Node.js**: v18.x atau lebih baru  
- **Hapi.js**: ^21.x  
- **PostgreSQL**: v14.x atau lebih baru  
- **pg (node-postgres)**: ^8.x  
- **npm**: v9.x atau lebih baru  
- **Migration Tool**: `node-pg-migrate`  

## 3. Requirements
Sebelum menjalankan proyek ini, pastikan sudah terinstal:  
- [Node.js](https://nodejs.org/) minimal versi 18  
- [PostgreSQL](https://www.postgresql.org/) minimal versi 14  
- [npm](https://www.npmjs.com/)  
- [Git](https://git-scm.com/)  

Pastikan juga sudah membuat **database** PostgreSQL dengan nama sesuai konfigurasi di file `.env`.  

## 4. Cara Migrate Database
1) Pastikan database sudah dibuat di PostgreSQL.
   CREATE DATABASE ecommerce;
2) Jalankan perintah migrate untuk membuat tabel:
   npm run migrate up
3) Jika ingin rollback:
   npm run migrate down
4) Untuk mengisi data dummy (jika tersedia seed):
   node seed-users.js

## 5. Cara Run dan Test
1) Jalankan Server
   node server.js
2) Jika berhasil, server akan berjalan di:
   http://localhost:3000
3) Testing API
   Gunakan Postman atau cURL untuk mengetes endpoint.
   Contoh:
   curl http://localhost:3000/users