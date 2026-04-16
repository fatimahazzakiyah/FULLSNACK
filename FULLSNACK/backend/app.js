JavaScript
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');

app.use(express.json()); // Middleware agar bisa baca body JSON
app.use('/api', apiRouter); // Mengarahkan semua endpoint ke file api.js

app.listen(3000, () => {
    console.log('Server FullSnack running on http://localhost:3000');
});