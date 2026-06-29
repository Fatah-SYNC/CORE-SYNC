let siap = false;
let berkasDibaca = 0;
let waktuMulai = null;
let favorit = JSON.parse(localStorage.getItem('favorit')) || [];
let audioOn = true;

function tandaSiap() {
    if (typeof BERKAS !== 'undefined') {
        siap = true;
        document.getElementById('logSistem').textContent = '✅ DATABASE TERMUAT — SIAP BACA SEMUA BERKAS! 🟢';
    } else {
        document.getElementById('logSistem').textContent = '❌ GAGAL MEMUAT DATA — CEK BERKAS database.js!';
    }
}

function bukaTutup(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function bukaBerkas(id) {
    if (!siap || typeof BERKAS === 'undefined') {
        document.getElementById('logSistem').textContent = '⏳ MASIH MENUNGGU VAULT... COBA LAGI';
        setTimeout(() => bukaBerkas(id), 400);
        return;
    }
    if (!BERKAS[id]) {
        document.getElementById('logSistem').textContent = '❌ ID BERKAS TIDAK ADA: ' + id;
        return;
    }
    
    document.getElementById('logSistem').textContent = '🔓 DECRYPTING...';
    
    // === BUKA POPUP DULU (KOSONG) ===
    var popup = document.getElementById('kotakPopup');
    popup.style.display = 'flex';
    popup.style.overflowY = 'auto';
    popup.style.alignItems = 'flex-start';
    popup.style.paddingTop = '30px';
    popup.style.paddingBottom = '30px';
    
    document.getElementById('judulKasus').textContent = '';
    document.getElementById('isiKasus').textContent = '';
    
    // === SCRAMBLE TEXT FUNCTION ===
    function scrambleText(el, finalText, duration) {
        var chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var startTime = Date.now();
        var interval = setInterval(function() {
            var elapsed = Date.now() - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var scrambled = '';
            for (var i = 0; i < finalText.length; i++) {
                if (Math.random() < progress) {
                    scrambled += finalText[i];
                } else {
                    scrambled += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            el.textContent = scrambled;
            if (progress >= 1) {
                clearInterval(interval);
                el.textContent = finalText;
            }
        }, 40);
    }
    
    // === GLITCH EFFECT ENHANCED ===
    var bingkai = document.querySelector('.bingkaiArsip');
    var isiTeks = BERKAS[id].isi.toUpperCase();
    
    if (isiTeks.includes('SANGAT RAHASIA') || isiTeks.includes('DARAH') || isiTeks.includes('PEMBANTAIAN') || isiTeks.includes('SADIS') || isiTeks.includes('MUTILASI') || isiTeks.includes('KANIBAL')) {
        bingkai.classList.add('glitch-maksimal');
        bingkai.classList.add('flicker');
        bingkai.classList.add('screen-tear');
        popup.classList.add('flash-merah');
        
        var scan = document.createElement('div');
        scan.className = 'scan-line';
        scan.id = 'scanSementara';
        document.body.appendChild(scan);
        
        var noise = document.createElement('div');
        noise.className = 'noise-overlay';
        noise.id = 'noiseSementara';
        document.body.appendChild(noise);
        
        setTimeout(function() {
            bingkai.classList.remove('glitch-maksimal');
            bingkai.classList.remove('flicker');
            bingkai.classList.remove('screen-tear');
            popup.classList.remove('flash-merah');
            var s = document.getElementById('scanSementara');
            var n = document.getElementById('noiseSementara');
            if (s) s.remove();
            if (n) n.remove();
        }, 900);
        
    } else if (isiTeks.includes('RAHASIA') || isiTeks.includes('SANGAT') || isiTeks.includes('MENGERIKAN')) {
        bingkai.classList.add('glitch-sedang');
        bingkai.classList.add('flicker');
        
        setTimeout(function() {
            bingkai.classList.remove('glitch-sedang');
            bingkai.classList.remove('flicker');
        }, 600);
        
    } else {
        bingkai.classList.add('glitch-ringan');
        setTimeout(function() {
            bingkai.classList.remove('glitch-ringan');
        }, 350);
    }
    
    // Scramble judul
    var judulEl = document.getElementById('judulKasus');
    scrambleText(judulEl, BERKAS[id].judul, 600);
    
    // Isi muncul setelah delay
    setTimeout(function() {
        document.getElementById('isiKasus').textContent = BERKAS[id].isi;
    }, 250);
    
    berkasDibaca++;
    if (!waktuMulai) waktuMulai = Date.now();
    updateStats();
    
    // Set isi scroll
    var isi = document.getElementById('isiKasus');
    isi.style.overflowY = 'auto';
    isi.style.overflowX = 'hidden';
    isi.style.maxHeight = '50vh';
    isi.style.paddingRight = '6px';
    isi.style.whiteSpace = 'pre-wrap';
    isi.style.overflowWrap = 'break-word';
    isi.style.wordBreak = 'break-all';
    isi.style.maxWidth = '100%';
    isi.style.boxSizing = 'border-box';
    
    // Set bingkai
    bingkai.style.maxHeight = '85vh';
    bingkai.style.overflowY = 'auto';
    bingkai.style.overflowX = 'hidden';
    bingkai.style.display = 'flex';
    bingkai.style.flexDirection = 'column';
    bingkai.style.maxWidth = '620px';
    bingkai.style.boxSizing = 'border-box';
    
    // Set tombol close
    var tombol = document.querySelector('.bingkaiArsip button');
    if (tombol) {
        tombol.style.position = 'sticky';
        tombol.style.bottom = '0';
        tombol.style.zIndex = '10';
        tombol.style.flexShrink = '0';
    }
    
    // Set judul
    var judul = document.getElementById('judulKasus');
    judul.style.overflowX = 'hidden';
    judul.style.wordBreak = 'break-word';
    judul.style.maxWidth = '100%';
    judul.style.boxSizing = 'border-box';
    
    document.getElementById('logSistem').textContent = '📂 DIBUKA: ' + BERKAS[id].judul;
    
    setTimeout(() => {
        document.getElementById('isiKasus').scrollTop = 0;
    }, 300);
    
    updateBackToTop();
}

function tutupPopup() {
    var popup = document.getElementById('kotakPopup');
    popup.style.display = 'none';
    popup.style.overflowY = '';
    popup.style.alignItems = '';
    popup.style.paddingTop = '';
    popup.style.paddingBottom = '';
    document.getElementById('logSistem').textContent = '🔒 BERKAS DITUTUP KEMBALI';
}

function playAudio() {
    var audio = document.getElementById('audioUtama');
    if (audio && audioOn) {
        audio.play().catch(function(e) {
            console.warn('⚠️ Audio gagal diputar:', e);
        });
    }
}

function toggleAudio() {
    audioOn = !audioOn;
    var audio = document.getElementById('audioUtama');
    var atmosfer = document.getElementById('audioAtmosfer');
    var btn = document.getElementById('tombolAudio');
    
    if (audioOn) {
        audio.play().catch(() => {});
        if (atmosfer) atmosfer.play().catch(() => {});
        btn.textContent = '🔊';
        btn.style.color = '';
        document.getElementById('logSistem').textContent = '🔊 AUDIO — ON';
    } else {
        audio.pause();
        if (atmosfer) atmosfer.pause();
        btn.textContent = '🔇';
        btn.style.color = '#ff4444';
        document.getElementById('logSistem').textContent = '🔇 AUDIO — OFF';
    }
}

function toggleFullscreen() {
    var btn = document.getElementById('tombolFullscreen');
    
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            document.body.classList.add('fullscreen-mode');
            btn.textContent = '✕';
            btn.style.color = '#ff4444';
            document.getElementById('logSistem').textContent = '📺 FULLSCREEN — AKTIF';
        }).catch(() => {
            document.body.classList.add('fullscreen-mode');
            btn.textContent = '✕';
            btn.style.color = '#ff4444';
            document.getElementById('logSistem').textContent = '📺 FULLSCREEN — AKTIF';
        });
    } else {
        document.exitFullscreen().then(() => {
            document.body.classList.remove('fullscreen-mode');
            btn.textContent = '⛶';
            btn.style.color = '';
            document.getElementById('logSistem').textContent = '📺 FULLSCREEN — NONAKTIF';
        }).catch(() => {
            document.body.classList.remove('fullscreen-mode');
            btn.textContent = '⛶';
            btn.style.color = '';
            document.getElementById('logSistem').textContent = '📺 FULLSCREEN — NONAKTIF';
        });
    }
}

document.addEventListener('fullscreenchange', function() {
    var btn = document.getElementById('tombolFullscreen');
    if (!document.fullscreenElement) {
        document.body.classList.remove('fullscreen-mode');
        btn.textContent = '⛶';
        btn.style.color = '';
        document.getElementById('logSistem').textContent = '📺 FULLSCREEN — NONAKTIF';
    }
});

function cariBerkas() {
    var keyword = document.getElementById('searchInput').value.toLowerCase();
    var results = document.getElementById('searchResults');
    results.innerHTML = '';
    
    if (keyword.length < 2) {
        results.style.display = 'none';
        return;
    }
    
    var ditemukan = [];
    for (var id in BERKAS) {
        if (BERKAS[id].judul.toLowerCase().includes(keyword)) {
            ditemukan.push({id: id, judul: BERKAS[id].judul});
        }
    }
    
    if (ditemukan.length > 0) {
        results.style.display = 'block';
        ditemukan.forEach(function(b) {
            var div = document.createElement('div');
            div.className = 'item';
            div.textContent = b.judul;
            div.onclick = function() {
                bukaBerkas(b.id);
                results.style.display = 'none';
                document.getElementById('searchInput').value = '';
            };
            results.appendChild(div);
        });
    } else {
        results.style.display = 'none';
    }
}

function updateStats() {
    document.getElementById('statsBerkas').textContent = '📂 ' + berkasDibaca + ' berkas';
    if (waktuMulai) {
        var menit = Math.floor((Date.now() - waktuMulai) / 60000);
        document.getElementById('statsWaktu').textContent = '⏱ ' + menit + ' menit';
    }
}

function toggleFavorit() {
    var list = document.getElementById('favoritList');
    if (list.style.display === 'block') {
        list.style.display = 'none';
    } else {
        list.style.display = 'block';
                updateFavoritList();
    }
}

function updateFavoritList() {
    var list = document.getElementById('favoritList');
    list.innerHTML = '';
    favorit.forEach(function(id) {
        if (BERKAS[id]) {
            var div = document.createElement('div');
            div.className = 'item';
            div.textContent = '⭐ ' + BERKAS[id].judul;
            div.onclick = function() { bukaBerkas(id); };
            list.appendChild(div);
        }
    });
}

function scrollToTop() {
    document.getElementById('isiKasus').scrollTop = 0;
}

function updateBackToTop() {
    var btn = document.getElementById('backToTop');
    var isi = document.getElementById('isiKasus');
    isi.addEventListener('scroll', function() {
        if (isi.scrollTop > 200) {
            btn.classList.add('tampil');
        } else {
            btn.classList.remove('tampil');
        }
    });
}

function bukaSistem() {
    document.getElementById('layarKunci').style.display = 'none';
    playAudio();
    mulaiPantau();
}

function mulaiPantau() {
    setInterval(() => {
        const s = ['> MONITORING KONEKSI...', '> KUNCI ENKRIPSI AKTIF', '> INTEGRITAS VAULT: 99.9% ✅', '> BEBAS JEJAK LUAR', '> PEMINDAIAN BERJALAN'];
        document.getElementById('logSistem').textContent = siap ? s[Math.floor(Math.random() * s.length)] : '⏳ MENUNGGU BERKAS DATA...';
        document.getElementById('cpuMeter').textContent = `> CPU LOAD: ${Math.floor(Math.random() * 40) + 55}% | VAULT: ${siap ? 'TERBUKA ✅' : 'TERKUNCI 🔒'}`;
    }, 3000);

    setInterval(() => {
        const wadah = document.getElementById('hujanKode');
        const t = document.createElement('div');
        t.className = 'tetesan';
        t.textContent = Math.random().toString(36).slice(2, 10).toUpperCase();
        t.style.left = Math.random() * 100 + '%';
        t.style.animationDuration = (Math.random() * 3 + 2) + 's';
        wadah.appendChild(t);
        setTimeout(() => t.remove(), 5500);
    }, 750);

    setInterval(() => {
        if (typeof BERKAS !== 'undefined' && !siap) {
            siap = true;
            document.getElementById('logSistem').textContent = '✅ VAULT TERHUBUNG KEMBALI!';
        }
    }, 1000);
}