// ========== HILANGKAN LOADING SCREEN ==========
window.addEventListener('load', function () {
    const loading = document.getElementById('loading-screen');
    loading.classList.add('hidden');
});

// ========== TAHUN OTOMATIS DI FOOTER ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== FUNGSI UNTUK BUKA LINK ==========
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

// ========== SCROLL SMOOTH (untuk anchor) ==========
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

// ========== PASTIKAN VIDEO BERPUTAR (tanpa blur) ==========
const video = document.getElementById('bg-video');

// Fungsi untuk memutar video dengan handling error
function playVideo() {
    video.play().catch(() => {
        // Jika gagal, kita pasang listener sekali untuk interaksi user
        const resumeVideo = () => {
            video.play().catch(e => console.warn('Video tetap tidak bisa diputar:', e));
            document.removeEventListener('click', resumeVideo);
            document.removeEventListener('touchstart', resumeVideo);
        };
        document.addEventListener('click', resumeVideo, { once: true });
        document.addEventListener('touchstart', resumeVideo, { once: true });
    });
}

// Coba putar saat halaman dimuat
playVideo();

// Jika video berhenti karena tab tidak aktif, putar lagi saat kembali
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        playVideo();
    }
});

console.log('✅ LinkTree Pro siap!');
