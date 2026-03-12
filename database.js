const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Menggunakan database SQLite (Lokal).');

// Standardisasi Interface agar sama dengan MySQL (Wrapper untuk sqlite3)
module.exports = {
    all: (query, params, cb) => {
        db.all(query, params, (err, rows) => cb(err, rows));
    },
    get: (query, params, cb) => {
        db.get(query, params, (err, row) => cb(err, row));
    },
    run: (query, params, cb) => {
        db.run(query, params, function(err) {
            cb.call(this, err);
        });
    },
    prepare: (query) => {
        return db.prepare(query);
    },
    serialize: (cb) => {
        db.serialize(cb);
    }
};

