const BASE_URL = 'http://localhost:5000/api/products';

// Ambil Data
async function muatData() {
    const respon = await fetch(BASE_URL);
    const data = await respon.json();
    const tabel = document.getElementById('tabel-produk');
    tabel.innerHTML = '';

    data.forEach(p => {
       tabel.innerHTML += `
    <tr>
        <td><strong>${p.name}</strong></td>
        <td>Rp ${Number(p.price).toLocaleString('id-ID')}</td>
        <td><span class="stock-label">${p.stock} pcs</span></td>
        <td>
            <div class="action-buttons">
                <button class="btn-edit" onclick="siapkanEdit('${p.id}', '${p.name}', ${p.price}, ${p.stock})">Edit</button>
                <button class="btn-delete" onclick="hapusProduk('${p.id}')">Hapus</button>
            </div>
        </td>
    </tr>`;
    });
}

// Tambah Produk
async function simpanProduk() {
    const nama = document.getElementById('prod-name').value;
    const harga = document.getElementById('prod-price').value;
    const stok = document.getElementById('prod-stock').value;

    if(!nama || !harga || !stok) return alert("Lengkapi datanya dulu ya!");

    await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nama, price: harga, stock: stok })
    });

    bersihkanForm();
    muatData();
}

// Persiapan Edit (Data naik ke atas)
function siapkanEdit(id, name, price, stock) {
    document.getElementById('prod-name').value = name;
    document.getElementById('prod-price').value = price;
    document.getElementById('prod-stock').value = stock;

    const btn = document.getElementById('btn-save');
    btn.innerText = "Simpan Perubahan";
    btn.style.background = "#007bff";
    btn.onclick = function() { prosesEdit(id); };
}

// Eksekusi Edit ke API
async function prosesEdit(id) {
    const nama = document.getElementById('prod-name').value;
    const harga = document.getElementById('prod-price').value;
    const stok = document.getElementById('prod-stock').value;

    await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nama, price: harga, stock: stok })
    });

    const btn = document.getElementById('btn-save');
    btn.innerText = "+ Tambah Produk";
    btn.style.background = "#28a745";
    btn.onclick = simpanProduk;

    bersihkanForm();
    muatData();
}

// Hapus
async function hapusProduk(id) {
    if(confirm("Hapus produk ini?")) {
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        muatData();
    }
}

function bersihkanForm() {
    document.getElementById('prod-name').value = '';
    document.getElementById('prod-price').value = '';
    document.getElementById('prod-stock').value = '';
}

function logout() {
    alert("Logout berhasil!");
    window.location.href = "login.html";
}
