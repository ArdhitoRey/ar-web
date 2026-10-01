// Quiz AR Logic - Marker 8 MindAR Experience
// Mendukung Quiz 1, 2, 3, 4, 5 dengan alur dan fungsionalitas identik:
// - Sinkronisasi video ganda (Benar & Salah)
// - Pause presisi di detik 9.25 dengan transisi tombol instan (Zero animation/Zero clipping)
// - Pemutaran voiceover pertanyaan (berhenti di 9.25s) serta feedback suara benar dan salah
// - Penyesuaian tata letak kartu kiri/kanan dinamis per kuis
// - Penyesuaian shader chromakey (magenta vs green) per video kuis
// - Navigasi kuis berurutan (Kuis 1 -> 2 -> 3 -> 4 -> 5)

export const QUIZ_CONFIG = {
    1: {
        id: 1,
        title: "Kuis 1: Menjaga Kesehatan Gigi",
        questionText: "MANA CARA YANG BAIK MENJAGA KESEHATAN GIGI?",
        bannerImg: "./compressed_ultra-videos/chapter2/quiz/quiz1/pertanyaan.PNG",
        videoBenar: "./compressed_ultra-videos/chapter2/quiz/quiz1/video/benar.mp4",
        videoSalah: "./compressed_ultra-videos/chapter2/quiz/quiz1/video/salah.mp4",
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: "./compressed_ultra-videos/chapter2/quiz/quiz1/sound/pertanyaan.mp3",
        soundBenar: "./compressed_ultra-videos/chapter2/quiz/quiz1/sound/benar.mp3",
        soundSalah: "./compressed_ultra-videos/chapter2/quiz/quiz1/sound/salah.mp3",
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Sikat Gigi Pagi & Malam",
        labelRight: "Tidak Mau Sikat Gigi",
        promptStatusText: "👉 Ketuk jawabanmu: SIKAT GIGI PAGI & MALAM atau TIDAK MAU SIKAT GIGI!",
        statusBenar: "🎉 Hebat! Pilihanmu benar: Sikat Gigi Pagi dan Malam! ✨",
        statusSalah: "❌ Kurang tepat! Dengarkan penjelasannya... 💡",
        descBenar: "Jawabanmu benar! Kita harus menyikat gigi di pagi hari setelah sarapan dan malam hari sebelum tidur agar gigi tetap bersih dan sehat.",
        descSalah: "Jangan malas menyikat gigi ya! Tidak mau sikat gigi bisa membuat kuman berkembang biak dan merusak gigi hingga berlubang."
    },
    2: {
        id: 2,
        title: "Kuis 2: Cara Sikat Gigi yang Benar",
        questionText: "MANA CARA SIKAT GIGI YANG BENAR?",
        bannerImg: "./compressed_ultra-videos/chapter2/quiz/quiz2/pertanyaan.PNG",
        videoBenar: "./compressed_ultra-videos/chapter2/quiz/quiz2/video/benar.mp4",
        videoSalah: "./compressed_ultra-videos/chapter2/quiz/quiz2/video/salah.mp4",
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: "./compressed_ultra-videos/chapter2/quiz/quiz2/sound/pertanyaan.mp3",
        soundBenar: "./compressed_ultra-videos/chapter2/quiz/quiz2/sound/benar.mp3",
        soundSalah: "./compressed_ultra-videos/chapter2/quiz/quiz2/sound/salah.mp3",
        // Pada Kuis 2: Kartu kiri adalah Salah, Kartu kanan adalah Benar
        leftChoice: "salah",
        rightChoice: "benar",
        labelLeft: "Sikat Bagian Depan Saja",
        labelRight: "Sikat Semua Bagian Gigi",
        promptStatusText: "👉 Ketuk jawabanmu: SIKAT BAGIAN DEPAN SAJA atau SIKAT SEMUA BAGIAN GIGI!",
        statusBenar: "🎉 Hebat! Pilihanmu benar: Sikat Semua Bagian Gigi! ✨",
        statusSalah: "❌ Kurang tepat! Dengarkan penjelasannya... 💡",
        descBenar: "Jawabanmu benar! Sikat seluruh permukaan gigi mulai dari depan, samping, hingga bagian dalam dan permukaan kunyah agar bersih menyeluruh.",
        descSalah: "Menyikat bagian depan saja tidak cukup! Kuman dan sisa makanan bisa bersembunyi di sela-sela serta permukaan gigi bagian samping dan belakang."
    },
    3: {
        id: 3,
        title: "Kuis 3: Jadwal ke Dokter Gigi",
        questionText: "KAPAN KITA HARUS KE DOKTER GIGI?",
        bannerImg: "./compressed_ultra-videos/chapter2/quiz/quiz3/pertanyaan.PNG",
        videoBenar: "./compressed_ultra-videos/chapter2/quiz/quiz3/video/benar.mp4",
        videoSalah: "./compressed_ultra-videos/chapter2/quiz/quiz3/video/salah.mp4",
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-magenta", // Kuis 3 video salah berlatar magenta
        soundPertanyaan: "./compressed_ultra-videos/chapter2/quiz/quiz3/sound/pertanyaan.mp3",
        soundBenar: "./compressed_ultra-videos/chapter2/quiz/quiz3/sound/benar.mp3",
        soundSalah: "./compressed_ultra-videos/chapter2/quiz/quiz3/sound/salah.mp3",
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Setiap Enam Bulan Sekali",
        labelRight: "Tidak Pernah Karena Takut",
        promptStatusText: "👉 Ketuk jawabanmu: SETIAP ENAM BULAN SEKALI atau TIDAK PERNAH KARENA TAKUT!",
        statusBenar: "🎉 Hebat! Pilihanmu benar: Setiap Enam Bulan Sekali! ✨",
        statusSalah: "❌ Kurang tepat! Dengarkan penjelasannya... 💡",
        descBenar: "Jawabanmu benar! Kita harus rutin memeriksakan gigi ke dokter gigi setiap 6 bulan sekali agar gigi selalu terawat dan sehat.",
        descSalah: "Jangan takut ke dokter gigi ya! Dokter gigi adalah sahabat yang membantu kita merawat gigi agar terhindar dari sakit gigi."
    },
    4: {
        id: 4,
        title: "Kuis 4: Kebiasaan Setelah Makan",
        questionText: "SETELAH MAKAN KITA SEBAIKNYA?",
        bannerImg: "./compressed_ultra-videos/chapter2/quiz/quiz4/pertanyaan.PNG",
        videoBenar: "./compressed_ultra-videos/chapter2/quiz/quiz4/video/benar.mp4",
        videoSalah: "./compressed_ultra-videos/chapter2/quiz/quiz4/video/salah.mp4",
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-advanced",
        soundPertanyaan: "./compressed_ultra-videos/chapter2/quiz/quiz4/sound/pertanyaan.mp3",
        soundBenar: "./compressed_ultra-videos/chapter2/quiz/quiz4/sound/benar.mp3",
        soundSalah: "./compressed_ultra-videos/chapter2/quiz/quiz4/sound/salah.mp3",
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Berkumur",
        labelRight: "Langsung Tidur",
        promptStatusText: "👉 Ketuk jawabanmu: BERKUMUR atau LANGSUNG TIDUR!",
        statusBenar: "🎉 Hebat! Pilihanmu benar: Berkumur! ✨",
        statusSalah: "❌ Kurang tepat! Dengarkan penjelasannya... 💡",
        descBenar: "Jawabanmu benar! Berkumur setelah makan membantu membersihkan sisa-sisa makanan yang menempel di sela gigi.",
        descSalah: "Jangan langsung tidur setelah makan ya! Sisa makanan yang tertinggal akan menjadi makanan bagi kuman perusak gigi."
    },
    5: {
        id: 5,
        title: "Kuis 5: Teman Baik Gigi",
        questionText: "SIAPA YANG JADI TEMAN BAIK GIGI KITA?",
        bannerImg: "./compressed_ultra-videos/chapter2/quiz/quiz5/pertanyaan.PNG",
        videoBenar: "./compressed_ultra-videos/chapter2/quiz/quiz5/video/benar.mp4",
        videoSalah: "./compressed_ultra-videos/chapter2/quiz/quiz5/video/salah.mp4",
        shaderBenar: "chromakey-magenta",
        shaderSalah: "chromakey-magenta", // Kuis 5 video salah berlatar magenta
        soundPertanyaan: "./compressed_ultra-videos/chapter2/quiz/quiz5/sound/pertanyaan.mp3",
        soundBenar: "./compressed_ultra-videos/chapter2/quiz/quiz5/sound/benar.mp3",
        soundSalah: "./compressed_ultra-videos/chapter2/quiz/quiz5/sound/salah.mp3",
        leftChoice: "benar",
        rightChoice: "salah",
        labelLeft: "Bakteri Baik",
        labelRight: "Bakteri Jahat",
        promptStatusText: "👉 Ketuk jawabanmu: BAKTERI BAIK atau BAKTERI JAHAT!",
        statusBenar: "🎉 Hebat! Pilihanmu benar: Bakteri Baik! ✨",
        statusSalah: "❌ Kurang tepat! Dengarkan penjelasannya... 💡",
        descBenar: "Jawabanmu benar! Bakteri baik di dalam mulut membantu menjaga keseimbangan dan melindungi gigi dari kuman jahat.",
        descSalah: "Bakteri jahat adalah musuh gigi kita! Mereka menghasilkan asam dari sisa gula yang bisa membuat gigi berlubang."
    }
};

// Deteksi kuis aktif dari URL parameter (?quiz=1..5)
const urlParams = new URLSearchParams(window.location.search);
let currentQuizId = parseInt(urlParams.get('quiz') || urlParams.get('id') || '1', 10);
if (isNaN(currentQuizId) || currentQuizId < 1 || currentQuizId > 5) {
    currentQuizId = 1;
}

const currentQuiz = QUIZ_CONFIG[currentQuizId];
const cacheBuster = Date.now();

console.log(`🔄 [Quiz AR] Inisialisasi ${currentQuiz.title} (Marker 8). Cache buster:`, cacheBuster);

// Video Elements
const vidBenar = document.getElementById('vid-quiz-benar');
const vidSalah = document.getElementById('vid-quiz-salah');

// Audio Elements
const soundPertanyaan = document.getElementById('sound-quiz-pertanyaan');
const soundBenar = document.getElementById('sound-quiz-benar');
const soundSalah = document.getElementById('sound-quiz-salah');

// Image Banner
const imgQuizPertanyaan = document.getElementById('img-quiz-pertanyaan');
const quizPertanyaanAframe = document.getElementById('quiz-pertanyaan');

// Set asset sources with cache buster
if (vidBenar) vidBenar.src = `${currentQuiz.videoBenar}?t=${cacheBuster}`;
if (vidSalah) vidSalah.src = `${currentQuiz.videoSalah}?t=${cacheBuster}`;

if (soundPertanyaan) soundPertanyaan.src = `${currentQuiz.soundPertanyaan}?t=${cacheBuster}`;
if (soundBenar) soundBenar.src = `${currentQuiz.soundBenar}?t=${cacheBuster}`;
if (soundSalah) soundSalah.src = `${currentQuiz.soundSalah}?t=${cacheBuster}`;

if (imgQuizPertanyaan) imgQuizPertanyaan.src = `${currentQuiz.bannerImg}?t=${cacheBuster}`;
if (quizPertanyaanAframe) quizPertanyaanAframe.setAttribute('src', `${currentQuiz.bannerImg}?t=${cacheBuster}`);

// A-Frame video elements
const videoQuizBenar = document.getElementById('video-quiz-benar');
const videoQuizSalah = document.getElementById('video-quiz-salah');

// Set shaders dynamically
if (videoQuizBenar) {
    videoQuizBenar.setAttribute('material', `shader: ${currentQuiz.shaderBenar}; src: #vid-quiz-benar; transparent: true; side: double`);
}
if (videoQuizSalah) {
    videoQuizSalah.setAttribute('material', `shader: ${currentQuiz.shaderSalah}; src: #vid-quiz-salah; transparent: true; side: double`);
}

const allSounds = [soundPertanyaan, soundBenar, soundSalah].filter(Boolean);
const allVideos = [vidBenar, vidSalah].filter(Boolean);

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingTitle = document.getElementById('loadingTitle');
const loadingMessage = document.getElementById('loadingMessage');
const loadingDetail = document.getElementById('loadingDetail');
const loadingProgress = document.getElementById('loadingProgress');
const startButton = document.getElementById('startButton');

const statusBar = document.getElementById('statusBar');
const arScene = document.getElementById('arScene');
const targetQuiz = document.getElementById('targetQuiz');
const videoContainer = document.getElementById('video-container-quiz');

// 3D Clickable Planes (Left & Right)
const btnChoiceLeft3D = document.getElementById('btn-choice-left-3d') || document.getElementById('btn-choice-benar-3d');
const btnChoiceRight3D = document.getElementById('btn-choice-right-3d') || document.getElementById('btn-choice-salah-3d');

// 2D Touch Zones
const quizTouchLayer = document.getElementById('quizTouchLayer');
const btnTouchLeft = document.getElementById('btnTouchLeft') || document.getElementById('btnTouchBenar');
const btnTouchRight = document.getElementById('btnTouchRight') || document.getElementById('btnTouchSalah');

// Modal Elements
const resultModal = document.getElementById('resultModal');
const resultCard = document.getElementById('resultCard');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');
const btnReplayQuiz = document.getElementById('btnReplayQuiz');
const btnNextQuiz = document.getElementById('btnNextQuiz');

// State Machine
// States: 'LOADING' | 'READY_WAIT_START' | 'WAIT_MARKER' | 'INTRO_PLAYING' | 'WAITING_CHOICE' | 'RESULT_PLAYING' | 'FINISHED'
let quizState = 'LOADING';
let isTargetFound = false;
let choiceHandled = false;
let audioCtx = null;

// Update UI info
if (loadingTitle) loadingTitle.textContent = currentQuiz.title;
if (loadingDetail) loadingDetail.textContent = `Memuat aset kuis ${currentQuizId} & mempersiapkan AR...`;

// -----------------------------------------------------------------------------
// Force Load Video & Audio Assets
// -----------------------------------------------------------------------------
allSounds.forEach(s => {
    if (s) {
        s.load();
        s.preload = "auto";
    }
});

allVideos.forEach(v => {
    if (v) {
        v.load();
        v.preload = "auto";
    }
});

// Sound Synthesizer via Web Audio API for subtle tactile feedback
function playChime(isCorrect) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (isCorrect) {
            // Sweet ascending chime: C5 (523Hz) -> G5 (784Hz)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else {
            // Soft double low tone: G4 (392Hz) -> Eb4 (311Hz)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(392.00, now);
            osc.frequency.setValueAtTime(311.13, now + 0.12);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        }
    } catch (e) {
        console.warn('⚠️ Web Audio feedback unavailable:', e);
    }
}

// -----------------------------------------------------------------------------
// Pre-buffering & Start Button Activation
// -----------------------------------------------------------------------------
let bufferedCount = 0;

function unlockStartButton() {
    if (quizState !== 'LOADING') return;
    quizState = 'READY_WAIT_START';
    if (loadingMessage) loadingMessage.textContent = 'Siap Dimulai!';
    if (loadingDetail) loadingDetail.textContent = 'Ketuk Mulai Kuis untuk membuka kamera AR';
    if (startButton) {
        startButton.disabled = false;
        startButton.textContent = `Mulai Kuis ${currentQuizId} 🎮`;
        startButton.style.background = '#4caf50';
        startButton.style.color = '#ffffff';
    }
}

allVideos.forEach(v => {
    const onBuffer = () => {
        bufferedCount++;
        if (loadingProgress) {
            loadingProgress.textContent = '●'.repeat(bufferedCount) + '○'.repeat(Math.max(0, allVideos.length - bufferedCount));
        }
        if (bufferedCount >= allVideos.length) {
            unlockStartButton();
        }
    };

    if (v.readyState >= 3) {
        onBuffer();
    } else {
        v.addEventListener('canplaythrough', onBuffer, { once: true });
    }
});

// Pre-buffer timeout fallback (3.5s)
setTimeout(() => {
    if (quizState === 'LOADING') {
        console.log('⏱️ [Quiz AR] Pre-buffer timeout: Tombol Mulai diaktifkan otomatis.');
        unlockStartButton();
    }
}, 3500);

// Start button user gesture
if (startButton) {
    startButton.addEventListener('click', async () => {
        console.log(`🚀 [Quiz AR] Tombol Mulai Kuis ${currentQuizId} ditekan. Membuka AR dan audio context...`);

        // Prime audio context
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') await audioCtx.resume();
        } catch (e) {
            console.warn('⚠️ Audio context unlock warning:', e);
        }

        // Prime audio elements for iOS/Android autoplay policy compliance
        for (let s of allSounds) {
            try {
                s.muted = true;
                const p = s.play();
                if (p !== undefined) await p;
                s.pause();
                s.currentTime = 0;
                s.muted = false;
            } catch (e) {
                console.warn('⚠️ Sound element priming warning:', e);
            }
        }

        // Prime video elements without disrupting buffer pipeline
        for (let v of allVideos) {
            try {
                v.muted = true;
                const p = v.play();
                if (p !== undefined) await p;
                v.pause();
            } catch (e) {
                console.warn('⚠️ Video element priming warning:', e);
            }
        }

        // Hide overlay & reveal AR scene
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
        if (arScene) arScene.classList.add('ready');

        quizState = 'WAIT_MARKER';
        if (statusBar) {
            statusBar.textContent = '📷 Arahkan kamera ke Marker 8...';
            statusBar.classList.remove('tracking', 'finished');
        }

        // If marker was already acquired before start
        if (isTargetFound) {
            startQuizPlayback();
        }
    });
}

// -----------------------------------------------------------------------------
// Marker 8 Tracking
// -----------------------------------------------------------------------------
if (targetQuiz) {
    targetQuiz.addEventListener('targetFound', () => {
        console.log(`🎯 [Quiz AR] Marker 8 Terdeteksi untuk Kuis ${currentQuizId}!`);
        isTargetFound = true;

        if (quizState === 'WAIT_MARKER') {
            startQuizPlayback();
        } else if (quizState === 'INTRO_PLAYING') {
            if (statusBar) statusBar.textContent = `🎬 Kuis ${currentQuizId} dimulai! Simak pertanyaannya... 🎯`;
        } else if (quizState === 'WAITING_CHOICE') {
            if (statusBar) statusBar.textContent = currentQuiz.promptStatusText;
        }
    });

    targetQuiz.addEventListener('targetLost', () => {
        console.log('⏹️ [Quiz AR] Marker 8 Hilang dari pandangan kamera.');
        isTargetFound = false;
        if (quizState === 'WAIT_MARKER' && statusBar) {
            statusBar.textContent = '📷 Arahkan kamera ke Marker 8...';
        }
    });
}

// -----------------------------------------------------------------------------
// Start Quiz Playback (0s to 9.25s)
// -----------------------------------------------------------------------------
async function startQuizPlayback() {
    quizState = 'INTRO_PLAYING';
    choiceHandled = false;

    console.log(`🎬 [Quiz AR] Memulai pemutaran kuis ${currentQuizId} & audio pertanyaan...`);
    if (statusBar) {
        statusBar.textContent = `🎬 Kuis ${currentQuizId} dimulai! Simak pertanyaannya... 🎯`;
        statusBar.classList.add('tracking');
        statusBar.classList.remove('finished');
    }

    // Tampilkan container kuis dan kedua video
    if (videoContainer) videoContainer.setAttribute('visible', true);
    if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
    if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);

    // Pastikan tombol pilihan tersembunyi selama intro
    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
    if (quizTouchLayer) quizTouchLayer.classList.remove('active');

    // Reset dan mulai kedua video dari 0s
    if (vidBenar) {
        vidBenar.muted = true;
        if (vidBenar.currentTime !== 0) {
            try { vidBenar.currentTime = 0; } catch (e) {}
        }
    }
    if (vidSalah) {
        vidSalah.muted = true;
        if (vidSalah.currentTime !== 0) {
            try { vidSalah.currentTime = 0; } catch (e) {}
        }
    }

    // Reset audio feedback jika ada yang sedang berjalan
    if (soundBenar) {
        soundBenar.pause();
        soundBenar.currentTime = 0;
    }
    if (soundSalah) {
        soundSalah.pause();
        soundSalah.currentTime = 0;
    }

    // Putar audio pertanyaan dari 0s
    if (soundPertanyaan) {
        soundPertanyaan.pause();
        soundPertanyaan.currentTime = 0;
        soundPertanyaan.muted = false;
        soundPertanyaan.play().catch(e => console.warn('⚠️ Gagal memutar audio pertanyaan:', e));
    }

    const playPromises = allVideos.map(v => {
        return v.play().catch(e => {
            console.warn('⚠️ Play retry untuk:', v.id, e);
            return v.play().catch(err => console.error('❌ Play final error:', v.id, err));
        });
    });
    await Promise.all(playPromises);

    // Monitor waktu hingga mencapai 9.25s
    startTimelineMonitor();
}

// -----------------------------------------------------------------------------
// Timeline Monitor: Deteksi 9.25s secara presisi
// -----------------------------------------------------------------------------
let monitorRaf = null;

function startTimelineMonitor() {
    if (monitorRaf) cancelAnimationFrame(monitorRaf);

    const checkTime = () => {
        if (quizState !== 'INTRO_PLAYING') return;

        const currentVidT = vidBenar ? vidBenar.currentTime : (vidSalah ? vidSalah.currentTime : 0);
        const currentSoundT = soundPertanyaan ? soundPertanyaan.currentTime : 0;

        // Berhenti jika video atau audio pertanyaan mencapai 9.25 detik
        if (currentVidT >= 9.25 || currentSoundT >= 9.25) {
            reachDecisionPoint();
            return;
        }

        monitorRaf = requestAnimationFrame(checkTime);
    };

    monitorRaf = requestAnimationFrame(checkTime);
}

// Dipanggil tepat pada detik 9.25
function reachDecisionPoint() {
    if (quizState !== 'INTRO_PLAYING') return;
    console.log(`⏸️ [Quiz AR] Kuis ${currentQuizId}: Mencapai detik 9.25! Menjeda video dan audio pertanyaan...`);
    quizState = 'WAITING_CHOICE';

    if (monitorRaf) {
        cancelAnimationFrame(monitorRaf);
        monitorRaf = null;
    }

    // Jeda kedua video tepat di detik 9.25
    if (vidBenar) {
        vidBenar.pause();
        if (Math.abs(vidBenar.currentTime - 9.25) > 0.4) {
            try { vidBenar.currentTime = 9.25; } catch (e) {}
        }
    }
    if (vidSalah) {
        vidSalah.pause();
        if (Math.abs(vidSalah.currentTime - 9.25) > 0.4) {
            try { vidSalah.currentTime = 9.25; } catch (e) {}
        }
    }

    // Hentikan pertanyaan.mp3 tepat di detik 9.25 sesuai alur Quiz 1
    if (soundPertanyaan) {
        soundPertanyaan.pause();
        soundPertanyaan.currentTime = 9.25;
    }

    // AKTIFKAN TOMBOL PILIHAN DENGAN ZERO EFEK/ANIMASI
    // Tombol muncul instan menyatu dengan video tanpa clipping (depthWrite: false)
    if (btnChoiceLeft3D) {
        btnChoiceLeft3D.setAttribute('visible', true);
        const mesh = btnChoiceLeft3D.getObject3D('mesh');
        if (mesh && mesh.material) mesh.material.depthWrite = false;
    }
    if (btnChoiceRight3D) {
        btnChoiceRight3D.setAttribute('visible', true);
        const mesh = btnChoiceRight3D.getObject3D('mesh');
        if (mesh && mesh.material) mesh.material.depthWrite = false;
    }

    // Aktifkan juga overlay 2D touch transparan untuk kemudahan interaksi di layar HP
    if (quizTouchLayer) quizTouchLayer.classList.add('active');

    if (statusBar) {
        statusBar.textContent = currentQuiz.promptStatusText;
        statusBar.classList.remove('tracking');
        statusBar.classList.add('finished');
    }
}

// -----------------------------------------------------------------------------
// Choice Handling: Benar vs Salah
// -----------------------------------------------------------------------------
function selectChoice(choice) {
    if (quizState !== 'WAITING_CHOICE' || choiceHandled) return;
    choiceHandled = true;
    quizState = 'RESULT_PLAYING';

    console.log(`✨ [Quiz AR] Kuis ${currentQuizId}: Pengguna memilih: ${choice.toUpperCase()}`);

    // Pastikan audio pertanyaan benar-benar mati
    if (soundPertanyaan) {
        soundPertanyaan.pause();
    }

    // Sembunyikan target pilihan
    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
    if (quizTouchLayer) quizTouchLayer.classList.remove('active');

    const isBenar = (choice === 'benar');
    playChime(isBenar);

    if (isBenar) {
        // User memilih BENAR:
        // Hentikan dan sembunyikan video/sound Salah
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', false);
        if (vidSalah) vidSalah.pause();
        if (soundSalah) {
            soundSalah.pause();
            soundSalah.currentTime = 0;
        }

        // Tampilkan video Benar dan mulai audio Benar
        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
        if (vidBenar) {
            vidBenar.muted = true;
            if (vidBenar.currentTime < 9.0 || vidBenar.currentTime > 9.5) {
                try { vidBenar.currentTime = 9.25; } catch (e) {}
            }
            const p = vidBenar.play();
            if (p !== undefined) {
                p.catch(e => {
                    console.warn('⚠️ Play Benar retry:', e);
                    setTimeout(() => vidBenar.play().catch(err => console.error('❌ Play Benar error:', err)), 100);
                });
            }
        }

        if (soundBenar) {
            soundBenar.pause();
            soundBenar.currentTime = 0;
            soundBenar.muted = false;
            soundBenar.play().catch(e => console.error('Play sound Benar error:', e));
        }

        if (statusBar) {
            statusBar.textContent = currentQuiz.statusBenar;
            statusBar.classList.add('tracking');
        }

        waitForQuizCompletion(vidBenar, soundBenar, true);

    } else {
        // User memilih SALAH:
        // Hentikan dan sembunyikan video/sound Benar
        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', false);
        if (vidBenar) vidBenar.pause();
        if (soundBenar) {
            soundBenar.pause();
            soundBenar.currentTime = 0;
        }

        // Tampilkan video Salah dan mulai audio Salah
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);
        if (vidSalah) {
            vidSalah.muted = true;
            if (vidSalah.currentTime < 9.0 || vidSalah.currentTime > 9.5) {
                try { vidSalah.currentTime = 9.25; } catch (e) {}
            }
            const p = vidSalah.play();
            if (p !== undefined) {
                p.catch(e => {
                    console.warn('⚠️ Play Salah retry:', e);
                    setTimeout(() => vidSalah.play().catch(err => console.error('❌ Play Salah error:', err)), 100);
                });
            }
        }

        if (soundSalah) {
            soundSalah.pause();
            soundSalah.currentTime = 0;
            soundSalah.muted = false;
            soundSalah.play().catch(e => console.error('Play sound Salah error:', e));
        }

        if (statusBar) {
            statusBar.textContent = currentQuiz.statusSalah;
            statusBar.classList.add('finished');
        }

        waitForQuizCompletion(vidSalah, soundSalah, false);
    }
}

// Monitor penyelesaian video & audio hasil kuis
function waitForQuizCompletion(videoEl, soundEl, isCorrect) {
    let hasEnded = false;
    let videoDone = false;
    let soundDone = false;

    const onAllDone = () => {
        if (hasEnded) return;
        hasEnded = true;

        console.log(`🏁 [Quiz AR] Penjelasan Kuis ${currentQuizId} selesai (${isCorrect ? 'Benar' : 'Salah'}).`);
        if (videoEl) videoEl.pause();
        if (soundEl) soundEl.pause();
        quizState = 'FINISHED';
        showResultModal(isCorrect);
    };

    const tryFinish = () => {
        if (videoDone && soundDone) {
            onAllDone();
        }
    };

    // Video handler: freeze frame ~0.4 detik sebelum akhir untuk mencegah black screen
    const videoTimeHandler = function () {
        if (this.duration && (this.duration - this.currentTime <= 0.4)) {
            this.removeEventListener('timeupdate', videoTimeHandler);
            this.pause();
            videoDone = true;
            tryFinish();
        }
    };

    if (videoEl) {
        videoEl.addEventListener('timeupdate', videoTimeHandler);
        videoEl.addEventListener('ended', () => {
            videoDone = true;
            tryFinish();
        }, { once: true });
    } else {
        videoDone = true;
    }

    if (soundEl) {
        soundEl.addEventListener('ended', () => {
            soundDone = true;
            tryFinish();
        }, { once: true });
    } else {
        soundDone = true;
    }

    // Safety fallback timeout: jika ada lag/stall, maksimal 13 detik
    setTimeout(() => {
        if (!hasEnded) {
            videoDone = true;
            soundDone = true;
            onAllDone();
        }
    }, 13000);
}

// -----------------------------------------------------------------------------
// Tampilkan Modal Hasil Akhir
// -----------------------------------------------------------------------------
function showResultModal(isCorrect) {
    if (!resultModal) return;

    if (isCorrect) {
        if (resultCard) {
            resultCard.className = 'result-card card-correct';
        }
        if (resultIcon) resultIcon.textContent = '🎉';
        if (resultTitle) resultTitle.textContent = 'Hebat Sekali!';
        if (resultDesc) {
            resultDesc.textContent = currentQuiz.descBenar;
        }
        if (statusBar) statusBar.textContent = `✅ Kuis ${currentQuizId} selesai! Kamu menjawab dengan benar! 🏆`;
    } else {
        if (resultCard) {
            resultCard.className = 'result-card card-wrong';
        }
        if (resultIcon) resultIcon.textContent = '😅';
        if (resultTitle) resultTitle.textContent = 'Yah, Masih Kurang Tepat!';
        if (resultDesc) {
            resultDesc.textContent = currentQuiz.descSalah;
        }
        if (statusBar) statusBar.textContent = `💡 Kuis ${currentQuizId} selesai! Pelajari penjelasannya ya! 🌟`;
    }

    // Tombol Kuis Selanjutnya
    if (btnNextQuiz) {
        if (currentQuizId < 5) {
            const nextQuizId = currentQuizId + 1;
            btnNextQuiz.style.display = 'flex';
            btnNextQuiz.textContent = `➡️ Lanjut ke Kuis ${nextQuizId}`;
            btnNextQuiz.onclick = () => {
                window.location.href = `./quiz.html?quiz=${nextQuizId}`;
            };
        } else {
            // Sudah kuis terakhir (Kuis 5)
            btnNextQuiz.style.display = 'flex';
            btnNextQuiz.style.background = 'linear-gradient(135deg, #ff007f 0%, #7928ca 100%)';
            btnNextQuiz.textContent = '🏆 Selesai Semua Kuis! (Ulangi dari Kuis 1)';
            btnNextQuiz.onclick = () => {
                window.location.href = './quiz.html?quiz=1';
            };
        }
    }

    if (btnReplayQuiz) {
        btnReplayQuiz.textContent = `🔄 Ulangi Kuis ${currentQuizId}`;
    }

    resultModal.classList.add('active');
}

// -----------------------------------------------------------------------------
// Event Listeners untuk Interaksi Pemilihan
// -----------------------------------------------------------------------------
// 3D Planes (Left & Right)
if (btnChoiceLeft3D) {
    btnChoiceLeft3D.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice(currentQuiz.leftChoice);
    });
}
if (btnChoiceRight3D) {
    btnChoiceRight3D.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice(currentQuiz.rightChoice);
    });
}

// Video planes fallback (jika mengklik langsung pada video entity)
if (videoQuizBenar) {
    videoQuizBenar.addEventListener('click', (e) => {
        if (quizState === 'WAITING_CHOICE') {
            if (e) e.stopPropagation();
            selectChoice('benar');
        }
    });
}
if (videoQuizSalah) {
    videoQuizSalah.addEventListener('click', (e) => {
        if (quizState === 'WAITING_CHOICE') {
            if (e) e.stopPropagation();
            selectChoice('salah');
        }
    });
}

// 2D Touch Zones (Layar sentuh HP)
if (btnTouchLeft) {
    btnTouchLeft.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice(currentQuiz.leftChoice);
    });
    btnTouchLeft.addEventListener('touchstart', (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        selectChoice(currentQuiz.leftChoice);
    }, { passive: false });
}

if (btnTouchRight) {
    btnTouchRight.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice(currentQuiz.rightChoice);
    });
    btnTouchRight.addEventListener('touchstart', (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        selectChoice(currentQuiz.rightChoice);
    }, { passive: false });
}

// Tombol Ulangi Kuis (Reset in-place tanpa reload seluruh halaman)
if (btnReplayQuiz) {
    btnReplayQuiz.addEventListener('click', () => {
        console.log(`🔄 [Quiz AR] Mengulangi Kuis ${currentQuizId}...`);
        if (resultModal) resultModal.classList.remove('active');

        // Reset video
        if (vidBenar) {
            vidBenar.pause();
            vidBenar.currentTime = 0;
        }
        if (vidSalah) {
            vidSalah.pause();
            vidSalah.currentTime = 0;
        }

        // Reset semua audio
        if (soundPertanyaan) {
            soundPertanyaan.pause();
            soundPertanyaan.currentTime = 0;
        }
        if (soundBenar) {
            soundBenar.pause();
            soundBenar.currentTime = 0;
        }
        if (soundSalah) {
            soundSalah.pause();
            soundSalah.currentTime = 0;
        }

        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);
        if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
        if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
        if (quizTouchLayer) quizTouchLayer.classList.remove('active');

        choiceHandled = false;

        if (isTargetFound) {
            startQuizPlayback();
        } else {
            quizState = 'WAIT_MARKER';
            if (statusBar) {
                statusBar.textContent = '📷 Arahkan kamera ke Marker 8...';
                statusBar.classList.remove('tracking', 'finished');
            }
        }
    });
}
