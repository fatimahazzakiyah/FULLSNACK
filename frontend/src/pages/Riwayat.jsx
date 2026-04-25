import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Riwayat = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data riwayat belanja dari database berdasarkan ID User
    // Pastikan Revani sudah buat endpoint ini ya!
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Gagal ambil riwayat", err);
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Lagi loading... sabar yaa ✨</p>;
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2 className="section-title" style={{ color: '#ff85a2', textAlign: 'center' }}>
        Riwayat Belanja 🍿
      </h2>
      
      <div className="table-container">
        {orders.length > 0 ? (
          <table className="cart-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#ffe4e1' }}>
                <th style={{ padding: '10px', borderBottom: '2px solid #ffb6c1' }}>Tanggal</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #ffb6c1' }}>Total Belanja</th>
                <th style={{ padding: '10px', borderBottom: '2px solid #ffb6c1' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id} style={{ textAlign: 'center' }}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                    Rp {item.total_harga ? item.total_harga.toLocaleString() : '0'}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    borderBottom: '1px solid #eee',
                    color: '#2ecc71', 
                    fontWeight: 'bold' 
                  }}>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#ffb6c1' }}>Belum ada transaksi nih. Yuk jajan dulu! ✨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Riwayat;