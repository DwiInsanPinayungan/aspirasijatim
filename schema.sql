-- 1. Buat Database (Jika belum ada)
CREATE DATABASE IF NOT EXISTS db_aspirasi;
USE db_aspirasi;

-- 2. Tabel Aspirasi
CREATE TABLE IF NOT EXISTS aspirations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tiket VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(100),
    nik VARCHAR(20),
    email VARCHAR(100),
    kategori VARCHAR(50),
    kabupaten VARCHAR(100),
    judul VARCHAR(255),
    isi TEXT,
    tanggal VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Baru'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabel Users (Admin)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100),
    password VARCHAR(255),
    role VARCHAR(50),
    lastLogin VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabel Log Aktivitas
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(100),
    action VARCHAR(255),
    time VARCHAR(50),
    icon VARCHAR(50),
    color VARCHAR(30)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Data Awal (Optional)
INSERT IGNORE INTO users (name, username, email, password, role, lastLogin) VALUES 
('Admin Pusat', 'admin', 'admin@dprd.jt', '123', 'Super Admin', 'Baru saja'),
('Petugas Validasi 1', 'petugas1', 'val1@dprd.jt', '123', 'Petugas Validasi', '10 menit yang lalu'),
('Petugas Progres Jatim', 'petugas2', 'prog@dprd.jt', '123', 'Petugas Progres', '3 jam yang lalu');

INSERT IGNORE INTO aspirations (tiket, nama, nik, email, kategori, kabupaten, judul, isi, tanggal, status) VALUES 
('#JTM-5962', 'Dwi insan pinayungan', '5125253412421524', 'ayongfams31@gmail.com', 'Pendidikan', 'Bojonegoro', 'Bantuan Beasiswa', 'Memohon bantuan beasiswa untuk mahasiswa berprestasi.', '11 Mar 2026, 11.15', 'Selesai'),
('#JTM-6750', 'Ahmad Ridwan', '3512345678901234', 'ahmad@mail.com', 'Infrastruktur', 'Surabaya', 'Perbaikan Jalan', 'Jalan di wilayah kami berlubang dan membahayakan.', '11 Mar 2026, 08.46', 'Diproses');
