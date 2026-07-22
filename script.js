// ========== HILANGKAN LOADING SCREEN ==========
window.addEventListener('load', function () {
    const loading = document.getElementById('loading-screen');
    loading.classList.add('hidden');
});

// ========== TAHUN OTOMATIS DI FOOTER ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== FUNGSI UNTUK BUKA LINK ==========
// Ganti URL di bawah sesuai keinginan
const links = {
    btnMain: 'https://wa.me/6281997149736?text=Bang%20mau%20paid%20edit',
    btn2: 'https://whatsapp.com/channel/0029Vb8Ohq75vKAI4M7BdE0Y',
    btn3: 'https://www.tiktok.com/@foxxy_prst',
    btn4: 'https://www.website-anda.com',
    btn5: 'https://portofolio-anda.com'
};

// Pasang event listener ke setiap tombol
document.getElementById('btn-main').addEventListener('click', function (e) {
    e.preventDefault();
    window.open(links.btnMain, '_blank');
});
document.getElementById('btn-2').addEventListener('click', function (e) {
    e.preventDefault();
    window.open(links.btn2, '_blank');
});
document.getElementById('btn-3').addEventListener('click', function (e) {
    e.preventDefault();
    window.open(links.btn3, '_blank');
});
document.getElementById('btn-4').addEventListener('click', function (e) {
    e.preventDefault();
    window.open(links.btn4, '_blank');
});
document.getElementById('btn-5').addEventListener('click', function (e) {
    e.preventDefault();
    window.open(links.btn5, '_blank');
});

// ========== (OPSIONAL) SCROLL SMOOTH ==========
// Semua scrolling di halaman sudah halus secara default,
// tapi kita tambahkan perilaku smooth untuk anchor jika ada
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== EFEK GLOW BORDER (opsional, CSS sudah menangani) ==========
// Tidak perlu JS tambahan karena animasi CSS sudah berjalan.
// Jika ingin interaksi lebih, bisa ditambahkan di sini.
console.log('✅ LinkTree Pro siap!');
