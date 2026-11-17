const NOMOR_WA = "6282161748965";

const daftarMenu = [
  { id: 1, nama: "Volcano Mentai Original", seri: "VOLCANO SERIES (ISI 6)", kategori: "volcano", label: "Klasik", harga: 18000, deskripsi: "Dimsum ayam lembut dengan saus mentai khas Jepang yang dibakar smoky.", gambar: "assets/original.jpg", jumlah: 1 },
  { id: 2, nama: "Volcano Mentai Nori", seri: "VOLCANO SERIES (ISI 6)", kategori: "volcano", label: "Favorit", harga: 20000, deskripsi: "Saus mentai smoky dengan taburan rumput laut kering (nori) gurih.", gambar: "assets/nori.jpg", jumlah: 1 },
  { id: 3, nama: "Volcano Spicy Lava", seri: "VOLCANO SERIES (ISI 6)", kategori: "volcano", label: "🔥 Pedas Nampol", harga: 22000, deskripsi: "Saus mentai cabai pilihan dengan taburan bubuk cabai pedas gurih.", gambar: "assets/spicy-lava.jpg", jumlah: 1 },
  { id: 4, nama: "Volcano Mentai Tobiko", seri: "VOLCANO SERIES (ISI 6)", kategori: "volcano", label: "✨ Spesial", harga: 24000, deskripsi: "Saus mentai creamy dengan taburan telur ikan tobiko yang segar.", gambar: "assets/tobiko.jpg", jumlah: 1 },
  { id: 5, nama: "Volcano Salted Egg", seri: "VOLCANO SERIES (ISI 6)", kategori: "volcano", label: "🥚 Creamy", harga: 25000, deskripsi: "Perpaduan saus mentai bakar dengan saus telur asin gurih.", gambar: "assets/salted-egg.jpg", jumlah: 1 },
  { id: 6, nama: "Volcano Mentai Keju", seri: "SPECIAL SERIES (ISI 8)", kategori: "spesial", label: "Best Seller", harga: 28000, deskripsi: "Porsi besar dengan saus mentai melimpah dan keju cheddar lumer.", gambar: "assets/keju.jpg", jumlah: 1 },
  { id: 7, nama: "Volcano Melt Mozzarella", seri: "SPECIAL SERIES (ISI 8)", kategori: "spesial", label: "🧀 Lumer", harga: 32000, deskripsi: "Dimsum ayam dengan lelehan keju mozzarella molor di atas saus mentai.", gambar: "assets/mozzarella.jpg", jumlah: 1 },
  { id: 8, nama: "Volcano Truffle Crab", seri: "SPECIAL SERIES (ISI 8)", kategori: "spesial", label: "🦀 Premium", harga: 34000, deskripsi: "Saus mentai aroma minyak truffle mewah dengan topping crabstick.", gambar: "assets/truffle-crab.jpg", jumlah: 1 },
  { id: 9, nama: "Paket Rame-Rame Volcano", seri: "PAKET HEMAT (ISI 16)", kategori: "spesial", label: "🎉 Paket Puas", harga: 50000, deskripsi: "Bebas pilih 2 varian rasa favorit dalam satu paket besar untuk sharing.", gambar: "assets/paket-rame.jpg", jumlah: 1 },
  { id: 10, nama: "Es Teh Leci Segar", seri: "MINUMAN PENDAMPING", kategori: "minuman", label: "🧊 Segar", harga: 8000, deskripsi: "Teh melati dingin dengan sirup dan buah leci manis menyegarkan.", gambar: "assets/es-leci.jpg", jumlah: 1 },
  { id: 11, nama: "Es Jeruk Peras Murni", seri: "MINUMAN PENDAMPING", kategori: "minuman", label: "🍊 Segar", harga: 7000, deskripsi: "Perasan jeruk asli dingin yang pas menemani santap dimsum hangat.", gambar: "assets/es-jeruk.jpg", jumlah: 1 },
  { id: 12, nama: "Es Lemon Tea Madu", seri: "MINUMAN PENDAMPING", kategori: "minuman", label: "🍋 Favorit", harga: 8000, deskripsi: "Teh dingin dengan perasan lemon segar dan sentuhan madu murni.", gambar: "assets/lemon-tea.jpg", jumlah: 1 }
];

let kategoriAktif = "all";
const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;
  const list = kategoriAktif === "all" ? daftarMenu : daftarMenu.filter(m => m.kategori === kategoriAktif);
  grid.innerHTML = list.map(item => `
    <div class="menu-card">
      <div>
        <span class="menu-badge">${item.label}</span>
        <div class="menu-img-wrap"><img src="${item.gambar}" alt="${item.nama}"></div>
        <span class="menu-series">${item.seri}</span>
        <h3 class="menu-title">${item.nama}</h3>
        <p class="menu-desc">${item.deskripsi}</p>
      </div>
      <div>
        <div class="menu-price-row">
          <span class="menu-price" id="price-${item.id}">${formatRp(item.harga * item.jumlah)}</span>
          <div class="qty-control">
            <button type="button" class="qty-btn" onclick="ubahJumlah(${item.id}, -1)">-</button>
            <span class="qty-val" id="qty-${item.id}">${item.jumlah}</span>
            <button type="button" class="qty-btn" onclick="ubahJumlah(${item.id}, 1)">+</button>
          </div>
        </div>
        <button type="button" class="btn-wa-order" onclick="pesanWhatsApp(${item.id})">💬 Order via WhatsApp</button>
      </div>
    </div>
  `).join("");
}

function ubahJumlah(id, delta) {
  const item = daftarMenu.find(m => m.id === id);
  if (!item) return;
  item.jumlah = Math.max(1, item.jumlah + delta);
  document.getElementById("qty-" + id).textContent = item.jumlah;
  document.getElementById("price-" + id).textContent = formatRp(item.harga * item.jumlah);
}

function pesanWhatsApp(id) {
  const item = daftarMenu.find(m => m.id === id);
  if (!item) return;
  const teks = `Halo *The Volcano Bay*, saya mau pesan:\n• Menu: *${item.nama}*\n• Jumlah: *${item.jumlah} porsi*\n• Total: *${formatRp(item.harga * item.jumlah)}*`;
  const url = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function filterKategori(kat, btn) {
  kategoriAktif = kat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderMenu();
}

document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("navLinks")?.classList.toggle("show");
});

function tutupNav() {
  document.getElementById("navLinks")?.classList.remove("show");
}

renderMenu();
