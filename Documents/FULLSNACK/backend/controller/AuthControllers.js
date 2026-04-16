// Data user sementara (Array)
let users = [];

class AuthController {
    // Fitur Register
    static register(req, res) {
        // Mengambil data dari body request (Sesuai Pertemuan 3)
        const { username, email, password } = req.body;

        // Validasi sederhana (Pastikan semua data diisi)
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Semua data (username, email, password) wajib diisi!"
            });
        }

        // Simpan ke array users
        const newUser = { username, email, password };
        users.push(newUser);

        // Kirim response JSON (Sesuai Pertemuan 3)
        res.status(201).json({
            message: "User berhasil terdaftar!",
            data: {
                username: username,
                email: email
            }
        });
    }

    // Fungsi login kosong dulu (ini jatah Anggota 4)
    static login(req, res) {
        res.status(501).json({ message: "Fitur login sedang dikerjakan Anggota 4" });
    }
}

module.exports = AuthController;