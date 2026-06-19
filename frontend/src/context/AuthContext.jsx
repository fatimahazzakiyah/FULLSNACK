import { createContext, useState, useEffect } from "react";

// 1. Membuat boks context global untuk autentikasi
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mengambil token awal dari localStorage jika user sebelumnya sudah pernah login
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validasi atau sinkronisasi token saat aplikasi pertama kali dimuat
  useEffect(() => {
    if (token) {
      // Di sini bisa ditambahkan logic verifikasi ke backend jika diperlukan
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  // 2. Fungsi Login: Menyimpan token ke localStorage dan memperbarui state global
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (userData) setUser(userData);
  };

  // 3. Fungsi Logout: Menghapus token dari storage dan mengosongkan state global
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    // Membagikan token dan fungsi kontrol agar bisa diintip oleh komponen milik Revani, Aura, Tiya, dan Maulidya
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
