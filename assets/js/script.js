// 1. Data 7 Menu RM Cahaya + Gambar
const daftarMenu = [
    {
        id: 1,
        nama: "Nasi Ayam Goreng",
        deskripsi: "Ayam goreng gurih renyah dengan nasi hangat dan sambal pedas.",
        harga: 15000,
        gambar: "assets/img/ayam goreng.png"
    },
    {
        id: 2,
        nama: "Nasi Goreng Spesial",
        deskripsi: "Nasi goreng bumbu rempah dengan telur dan suwiran ayam.",
        harga: 14000,
        gambar: "assets/img/nasi goreng.png"
    },
    {
        id: 3,
        nama: "Mie Goreng + Nasi",
        deskripsi: "Paket kenyang anak kos: mie goreng bumbu gurih lengkap dengan nasi putih.",
        harga: 12000,
        gambar: "assets/img/mie goreng + rice.png"
    },
    {
        id: 4,
        nama: "Pisang Susu Keju",
        deskripsi: "Camilan pisang goreng hangat dengan topping susu manis melimpah.",
        harga: 10000,
        gambar: "assets/img/pisang susu.png"
    },
    {
        id: 5,
        nama: "Es Teh Manis",
        deskripsi: "Es teh segar pelepas dahaga.",
        harga: 4000,
        gambar: "assets/img/es teh.png"
    },
    {
        id: 6,
        nama: "Es Kopi Susu",
        deskripsi: "Kopi susu gula aren dingin teman nugas.",
        harga: 8000,
        gambar: "assets/img/kopi susu.png"
    },
    {
        id: 7,
        nama: "Es Matcha Latte",
        deskripsi: "Minuman matcha creamy dingin yang segar.",
        harga: 10000,
        gambar: "assets/img/macha.png"
    }
];

let keranjang = [];

// 2. Fungsi Menampilkan Menu + Gambar
const menuListContainer = document.getElementById("menu-list");

function tampilkanMenu() {
    menuListContainer.innerHTML = "";

    daftarMenu.forEach((item) => {
        const card = document.createElement("div");
        card.className = "menu-card";

        card.innerHTML = `
            <div>
                <img src="${item.gambar}" alt="${item.nama}" class="menu-img">
                <h3>${item.nama}</h3>
                <p>${item.deskripsi}</p>
            </div>
            <div>
                <div class="price">Rp ${item.harga.toLocaleString("id-ID")}</div>
                <button class="add-btn" onclick="tambahKeKeranjang(${item.id})">
                    + Tambah ke Keranjang
                </button>
            </div>
        `;

        menuListContainer.appendChild(card);
    });
}

// 3. Fungsi Tambah ke Keranjang
function tambahKeKeranjang(idMenu) {
    const produk = daftarMenu.find((item) => item.id === idMenu);
    keranjang.push(produk);

    document.getElementById("cart-count").innerText = keranjang.length;
}

tampilkanMenu();

// 4. Logika Buka/Tutup Modal Keranjang
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");

cartBtn.addEventListener("click", () => {
    renderKeranjang();
    cartModal.style.display = "flex";
});

closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// 5. Render Isi Keranjang & Hitung Total
function renderKeranjang() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    if (keranjang.length === 0) {
        cartItemsContainer.innerHTML = "<p>Keranjang masih kosong.</p>";
        cartTotalElement.innerText = "Rp 0";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let totalHarga = 0;

    keranjang.forEach((item, index) => {
        totalHarga += item.harga;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <div>
                <strong>${item.nama}</strong><br>
                <small>Rp ${item.harga.toLocaleString("id-ID")}</small>
            </div>
            <button class="remove-btn" onclick="hapusItem(${index})">Hapus</button>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotalElement.innerText = "Rp " + totalHarga.toLocaleString("id-ID");
}

function hapusItem(index) {
    keranjang.splice(index, 1);
    document.getElementById("cart-count").innerText = keranjang.length;
    renderKeranjang();
}

// 6. Checkout ke WhatsApp
document.getElementById("checkout-wa").addEventListener("click", () => {
    if (keranjang.length === 0) {
        alert("Pilih menu dulu sebelum pesan!");
        return;
    }

    let pesan = "Halo RM Cahaya, saya mau pesan:\n\n";
    let total = 0;

    keranjang.forEach((item, i) => {
        pesan += `${i + 1}. ${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}\n`;
        total += item.harga;
    });

    pesan += `\n*Total: Rp ${total.toLocaleString("id-ID")}*`;

    // Ganti nomor WA tujuan di bawah ini (awali dengan 62)
    const nomorWA = "6282154240575";
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    
    window.open(urlWA, "_blank");
});