require('dotenv').config();
const db = require('./config/database');

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const apiRouter = require('./routes/api');

app.use(cors());
app.use(express.json()); // Middleware agar bisa baca body JSON

app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Agar folder 'frontend' dapat diakses browser
app.use('/api', apiRouter); // Mengarahkan semua endpoint ke file api.js

app.listen(3000, () => {
    console.log('Server FullSnack running on http://localhost:3000');
});