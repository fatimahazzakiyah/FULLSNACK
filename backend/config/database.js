const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fullsnack' // <--- PASTIKAN NAMA INI SAMA DENGAN DI PHPMYADMIN
});

db.connect((err) => {
    if (err) {
        console.error('Gagal koneksi database:', err);
    } else {
        console.log('Berhasil terhubung ke database MySQL!');
    }
});

module.exports = db;