const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// ==========================================
// PILIHAN 1: SQLite (Aktif secara Default)
// Cocok untuk testing lokal tanpa ribet setup
// ==========================================
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

/* 
// ==========================================
// PILIHAN 2: MySQL (Butuh Setup phpMyAdmin)
// Hapus komentar di bawah ini & matikan SQLite jika ingin pakai MySQL
// ==========================================
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_aspirasi'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi MySQL Gagal: ' + err.stack);
        return;
    }
    console.log('Koneksi MySQL Berhasil.');
});

module.exports = {
    all: (query, params, cb) => db.query(query, params, (err, res) => cb(err, res)),
    get: (query, params, cb) => db.query(query, params, (err, res) => cb(err, res ? res[0] : null)),
    run: (query, params, cb) => db.query(query, params, function(err, res) {
        cb.call({ lastID: res ? res.insertId : null }, err);
    }),
    prepare: (query) => {
        return {
            run: (params) => db.query(query, params),
            finalize: () => {}
        };
    },
    serialize: (cb) => cb()
};
*/

db.serialize(() => {
    // Table for Aspirations
    db.run(`CREATE TABLE IF NOT EXISTS aspirations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tiket TEXT UNIQUE,
        nama TEXT,
        nik TEXT,
        email TEXT,
        kategori TEXT,
        kabupaten TEXT,
        judul TEXT,
        isi TEXT,
        tanggal TEXT,
        status TEXT DEFAULT 'Baru'
    )`);

    // Table for Users
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        username TEXT UNIQUE,
        email TEXT,
        password TEXT,
        role TEXT,
        lastLogin TEXT
    )`);

    // Table for Activity Logs
    db.run(`CREATE TABLE IF NOT EXISTS activity_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT,
        action TEXT,
        time TEXT,
        icon TEXT,
        color TEXT
    )`);

    // Initialize default users if table is empty
    db.get("SELECT count(*) as count FROM users", (err, row) => {
        if (row && row.count === 0) {
            const initialUsers = [
                ['Admin Pusat', 'admin', 'admin@dprd.jt', '123', 'Super Admin', 'Baru saja'],
                ['Petugas Validasi 1', 'petugas1', 'val1@dprd.jt', '123', 'Petugas Validasi', '10 menit yang lalu'],
                ['Petugas Progres Jatim', 'petugas2', 'prog@dprd.jt', '123', 'Petugas Progres', '3 jam yang lalu']
            ];
            const stmt = db.prepare("INSERT INTO users (name, username, email, password, role, lastLogin) VALUES (?, ?, ?, ?, ?, ?)");
            initialUsers.forEach(user => stmt.run(user));
            stmt.finalize();
            console.log("Default users initialized.");
        }
    });

    // Initialize some dummy data for aspirations if empty (optional, but good for demo)
    db.get("SELECT count(*) as count FROM aspirations", (err, row) => {
        if (row && row.count === 0) {
            const dummyAspirasi = [
                ['#JTM-5962', 'Dwi insan pinayungan', '5125253412421524', 'ayongfams31@gmail.com', 'Pendidikan', 'Bojonegoro', 'Bantuan Beasiswa', 'Memohon bantuan beasiswa untuk mahasiswa berprestasi.', '11 Mar 2026, 11.15', 'Selesai'],
                ['#JTM-6750', 'Ahmad Ridwan', '3512345678901234', 'ahmad@mail.com', 'Infrastruktur', 'Surabaya', 'Perbaikan Jalan', 'Jalan di wilayah kami berlubang dan membayakan.', '11 Mar 2026, 08.46', 'Diproses']
            ];
            const stmt = db.prepare("INSERT INTO aspirations (tiket, nama, nik, email, kategori, kabupaten, judul, isi, tanggal, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            dummyAspirasi.forEach(a => stmt.run(a));
            stmt.finalize();
            console.log("Dummy aspirations initialized.");
        }
    });
});

module.exports = db;
