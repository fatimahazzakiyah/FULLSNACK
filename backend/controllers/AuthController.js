// Data user sementara (Array) - Wajib ada di paling atas
let users = [];

class AuthController {
    static register(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Data tidak lengkap" });
        }
        users.push({ username, email, password });
        res.status(201).json({ message: "Berhasil Register", user: { username, email } });
    }

    static login(req, res) {
        const { email, password } = req.body;
        
        const userFound = users.find(u => u.email === email && u.password === password);

        if (userFound) {
            return res.status(200).json({
                message: "Login Berhasil!",
                user: { username: userFound.username, email: userFound.email }
            });
        }

        res.status(401).json({ message: "Email atau Password salah!" });
    }
}

module.exports = AuthController;