const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT // ← WAJIB ADA INI
});

connection.connect((err) => {
    if (err) {
        console.error('Gagal koneksi database: ' + err.stack);
        return;
    }
    console.log('Berhasil terhubung ke database MySQL!');
});

module.exports = connection;