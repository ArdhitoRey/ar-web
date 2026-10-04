// Quiz AR Logic - Marker 8 MindAR Experience
// Mendukung Quiz 1, 2, 3, 4, 5 dan Final Score:
// - Sinkronisasi video ganda (Benar & Salah)
// - Pause presisi di detik 9.25 dengan transisi tombol instan (Zero animation/Zero clipping)
// - Pemutaran voiceover pertanyaan (berhenti di 9.25s) serta feedback suara benar dan salah
// - Penyesuaian tata letak kartu kiri/kanan dinamis per kuis
// - Penyesuaian shader chromakey (magenta vs green vs score lavender) per video kuis
// - Navigasi kuis berurutan (Kuis 1 -> 2 -> 3 -> 4 -> 5 -> Skor Akhir)

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
    },
    'score': {
        id: 'score',
        isFinalScore: true,
        title: "Skor Akhir: Petualangan Kuis AR",
        questionText: "SELAMAT! KAMU TELAH MENYELESAIKAN SEMUA KUIS!",
        bannerImg: "",
        videoScore: "./compressed_ultra-videos/chapter2/quiz/final-scores/video/score.mp4",
        soundScore: "./compressed_ultra-videos/chapter2/quiz/final-scores/sound/sound.mp3",
        shaderScore: "chromakey-score",
        promptStatusText: "🏆 Selamat! Simak pesan akhir dari Profesor Gurita... ✨",
        statusScore: "🎉 Selamat! Kamu telah menyelesaikan semua petualangan kuis! 🌟",
        descScore: "Luar biasa! Kamu telah mempelajari semua cara menjaga kesehatan gigi dan berhasil menyelesaikan seluruh tantangan kuis!"
    }
};

QUIZ_CONFIG[6] = QUIZ_CONFIG['score'];
QUIZ_CONFIG['final'] = QUIZ_CONFIG['score'];

// Deteksi kuis aktif dari URL parameter (?quiz=1..5 atau ?quiz=score)
const urlParams = new URLSearchParams(window.location.search);
const rawQuizParam = (urlParams.get('quiz') || urlParams.get('id') || '1').toLowerCase();
let currentQuizId;
if (rawQuizParam === 'score' || rawQuizParam === 'final' || rawQuizParam === '6') {
    currentQuizId = 'score';
} else {
    currentQuizId = parseInt(rawQuizParam, 10);
    if (isNaN(currentQuizId) || currentQuizId < 1 || currentQuizId > 5) {
        currentQuizId = 1;
    }
}

const currentQuiz = QUIZ_CONFIG[currentQuizId];
const isFinalScore = !!currentQuiz.isFinalScore;
const cacheBuster = Date.now();

console.log(`🔄 [Quiz AR] Inisialisasi ${currentQuiz.title} (Marker 8). Cache buster:`, cacheBuster);

// Video Elements
const vidBenar = document.getElementById('vid-quiz-benar');
const vidSalah = document.getElementById('vid-quiz-salah');
const vidScore = document.getElementById('vid-quiz-score');

// Audio Elements
const soundPertanyaan = document.getElementById('sound-quiz-pertanyaan');
const soundBenar = document.getElementById('sound-quiz-benar');
const soundSalah = document.getElementById('sound-quiz-salah');
const soundScore = document.getElementById('sound-quiz-score');

// Image Banner
const imgQuizPertanyaan = document.getElementById('img-quiz-pertanyaan');
const quizPertanyaanAframe = document.getElementById('quiz-pertanyaan');

// A-Frame video elements
const videoQuizBenar = document.getElementById('video-quiz-benar');
const videoQuizSalah = document.getElementById('video-quiz-salah');
const videoQuizScore = document.getElementById('video-quiz-score');

// Set asset sources with cache buster
const imgQuizNextBtn = document.getElementById('img-quiz-next-btn');
if (imgQuizNextBtn) imgQuizNextBtn.src = `./addon-image/quiz/next-button-crop.png?t=${cacheBuster}`;

const imgQuizHomeBtn = document.getElementById('img-quiz-home-btn');
if (imgQuizHomeBtn) imgQuizHomeBtn.src = `./addon-image/quiz/home-button-crop.png?t=${cacheBuster}`;

if (isFinalScore) {
    if (vidScore) vidScore.src = `${currentQuiz.videoScore}?t=${cacheBuster}`;
    if (soundScore) soundScore.src = `${currentQuiz.soundScore}?t=${cacheBuster}`;

    if (quizPertanyaanAframe) quizPertanyaanAframe.setAttribute('visible', false);
    if (videoQuizBenar) videoQuizBenar.setAttribute('visible', false);
    if (videoQuizSalah) videoQuizSalah.setAttribute('visible', false);
    if (videoQuizScore) {
        videoQuizScore.setAttribute('material', `shader: ${currentQuiz.shaderScore}; src: #vid-quiz-score; transparent: true; side: double`);
    }
} else {
    if (vidBenar) vidBenar.src = `${currentQuiz.videoBenar}?t=${cacheBuster}`;
    if (vidSalah) vidSalah.src = `${currentQuiz.videoSalah}?t=${cacheBuster}`;

    if (soundPertanyaan) soundPertanyaan.src = `${currentQuiz.soundPertanyaan}?t=${cacheBuster}`;
    if (soundBenar) soundBenar.src = `${currentQuiz.soundBenar}?t=${cacheBuster}`;
    if (soundSalah) soundSalah.src = `${currentQuiz.soundSalah}?t=${cacheBuster}`;

    if (imgQuizPertanyaan) imgQuizPertanyaan.src = `${currentQuiz.bannerImg}?t=${cacheBuster}`;
    if (quizPertanyaanAframe) quizPertanyaanAframe.setAttribute('src', `${currentQuiz.bannerImg}?t=${cacheBuster}`);

    if (videoQuizBenar) {
        videoQuizBenar.setAttribute('material', `shader: ${currentQuiz.shaderBenar}; src: #vid-quiz-benar; transparent: true; side: double`);
    }
    if (videoQuizSalah) {
        videoQuizSalah.setAttribute('material', `shader: ${currentQuiz.shaderSalah}; src: #vid-quiz-salah; transparent: true; side: double`);
    }
    if (videoQuizScore) videoQuizScore.setAttribute('visible', false);
}

const allSounds = (isFinalScore ? [soundScore] : [soundPertanyaan, soundBenar, soundSalah]).filter(Boolean);
const allVideos = (isFinalScore ? [vidScore] : [vidBenar, vidSalah]).filter(Boolean);

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

// Next Button Elements (3D tracking on Marker 8)
const btnNextQuiz3D = document.getElementById('btn-next-quiz-3d');
const btnNextPlane3D = document.getElementById('btn-next-plane-3d');

// Home Button Elements for Final Score (3D tracking on clam/pearl in score.mp4)
const btnHomeScore3D = document.getElementById('btn-home-score-3d');
const btnHomeScorePlane = document.getElementById('btn-home-score-plane');

let isHomeButtonActive = false;
let isNavigatingHome = false;

// State Machine
// States: 'LOADING' | 'READY_WAIT_START' | 'WAIT_MARKER' | 'INTRO_PLAYING' | 'WAITING_CHOICE' | 'RESULT_PLAYING' | 'FINAL_SCORE_PLAYING' | 'FINISHED'
let quizState = 'LOADING';
let isTargetFound = false;
let choiceHandled = false;
let audioCtx = null;

// Update UI info
if (loadingTitle) loadingTitle.textContent = currentQuiz.title;
if (loadingDetail) loadingDetail.textContent = isFinalScore ? 'Memuat video skor akhir & mempersiapkan AR...' : `Memuat aset kuis ${currentQuizId} & mempersiapkan AR...`;

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
    if (loadingDetail) loadingDetail.textContent = isFinalScore ? 'Ketuk tombol untuk melihat skor akhir petualangan' : 'Ketuk Mulai Kuis untuk membuka kamera AR';
    if (startButton) {
        startButton.disabled = false;
        startButton.textContent = isFinalScore ? 'Buka Skor Akhir 🏆' : `Mulai Kuis ${currentQuizId} 🎮`;
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
        console.log(`🚀 [Quiz AR] Tombol Mulai ${isFinalScore ? 'Skor Akhir' : 'Kuis ' + currentQuizId} ditekan. Membuka AR dan audio context...`);

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
        console.log(`🎯 [Quiz AR] Marker 8 Terdeteksi untuk ${isFinalScore ? 'Skor Akhir' : 'Kuis ' + currentQuizId}!`);
        isTargetFound = true;

        if (quizState === 'WAIT_MARKER') {
            startQuizPlayback();
        } else if (quizState === 'INTRO_PLAYING') {
            if (statusBar) statusBar.textContent = `🎬 Kuis ${currentQuizId} dimulai! Simak pertanyaannya... 🎯`;
        } else if (quizState === 'FINAL_SCORE_PLAYING') {
            if (statusBar) statusBar.textContent = currentQuiz.promptStatusText;
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
// -----------------------------------------------------------------------------
// Start Quiz Playback (0s to 9.25s atau Final Score)
// -----------------------------------------------------------------------------
let introStartTime = 0;

async function startQuizPlayback() {
    choiceHandled = false;
    introStartTime = performance.now();

    // Mode Khusus: Pemutaran Final Score (Skor Akhir)
    if (isFinalScore) {
        quizState = 'FINAL_SCORE_PLAYING';
        console.log('🏆 [Quiz AR] Memulai pemutaran Video & Audio Final Score pada Marker 8...');
        if (statusBar) {
            statusBar.textContent = currentQuiz.promptStatusText;
            statusBar.classList.add('tracking');
            statusBar.classList.remove('finished');
        }

        // Tampilkan container kuis dan video score, sembunyikan elemen kuis lainnya
        if (videoContainer) videoContainer.setAttribute('visible', true);
        if (quizPertanyaanAframe) quizPertanyaanAframe.setAttribute('visible', false);
        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', false);
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', false);
        if (videoQuizScore) videoQuizScore.setAttribute('visible', true);

        if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
        if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
        if (quizTouchLayer) quizTouchLayer.classList.remove('active');
        hideNextButton();
        hideHomeScoreButton();

        if (vidScore) {
            vidScore.muted = true;
            try { vidScore.currentTime = 0; } catch (e) {}
            const p = vidScore.play();
            if (p !== undefined) {
                p.catch(e => {
                    console.warn('⚠️ Play vidScore retry:', e);
                    setTimeout(() => vidScore.play().catch(err => console.error('❌ Play vidScore error:', err)), 100);
                });
            }
        }

        if (soundScore) {
            soundScore.pause();
            soundScore.currentTime = 0;
            soundScore.muted = false;
            soundScore.play().catch(e => console.error('Play soundScore error:', e));
        }

        waitForFinalScoreCompletion(vidScore, soundScore);
        return;
    }

    quizState = 'INTRO_PLAYING';
    console.log(`🎬 [Quiz AR] Memulai pemutaran kuis ${currentQuizId} & audio pertanyaan...`);
    if (statusBar) {
        statusBar.textContent = `🎬 Kuis ${currentQuizId} dimulai! Simak pertanyaannya... 🎯`;
        statusBar.classList.add('tracking');
        statusBar.classList.remove('finished');
    }

    // Tampilkan container kuis dan kedua video
    if (videoContainer) videoContainer.setAttribute('visible', true);
    if (videoQuizScore) videoQuizScore.setAttribute('visible', false);
    if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
    if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);

    // Pastikan tombol pilihan dan tombol next tersembunyi selama intro
    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
    if (quizTouchLayer) quizTouchLayer.classList.remove('active');
    hideNextButton();
    hideHomeScoreButton();

    // Reset dan mulai kedua video dari 0s
    if (vidBenar) {
        vidBenar.muted = true;
        try { vidBenar.currentTime = 0; } catch (e) {}
    }
    if (vidSalah) {
        vidSalah.muted = true;
        try { vidSalah.currentTime = 0; } catch (e) {}
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

        // Ambil waktu dari video yang berjalan (cek kedua video agar sinkron)
        const tBenar = (vidBenar && !isNaN(vidBenar.currentTime)) ? vidBenar.currentTime : 0;
        const tSalah = (vidSalah && !isNaN(vidSalah.currentTime)) ? vidSalah.currentTime : 0;
        const maxVidT = Math.max(tBenar, tSalah);
        const currentSoundT = (soundPertanyaan && !isNaN(soundPertanyaan.currentTime)) ? soundPertanyaan.currentTime : 0;

        // Safety guard: pastikan intro sudah berjalan minimal 1.5 detik
        // Mencegah premature trigger akibat latency seeking asinkron saat reset
        const elapsedSinceStart = (performance.now() - introStartTime) / 1000;

        if (elapsedSinceStart >= 1.5 && (maxVidT >= 9.25 || currentSoundT >= 9.25)) {
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
        // Hanya re-seek jika posisi jeda jauh dari 9.25s (> 0.8s) agar tidak memicu decoding stall
        if (Math.abs(vidBenar.currentTime - 9.25) > 0.8) {
            try { vidBenar.currentTime = 9.25; } catch (e) {}
        }
    }
    if (vidSalah) {
        vidSalah.pause();
        if (Math.abs(vidSalah.currentTime - 9.25) > 0.8) {
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
// -----------------------------------------------------------------------------
// Choice Handling: Benar vs Salah & Next Button Display
// -----------------------------------------------------------------------------
let isNextButtonActive = false;
let isNavigatingNext = false;

function showNextButton() {
    console.log(`✨ [Quiz AR] Video & Audio penjelasan selesai! Memunculkan tombol 3D Next pada Marker 8 dengan animasi Fade In...`);
    isNextButtonActive = true;
    isNavigatingNext = false;

    if (btnNextQuiz3D) {
        btnNextQuiz3D.setAttribute('visible', true);
        btnNextQuiz3D.setAttribute('scale', '0.2 0.2 0.2');
        
        // Reset material opacity to 0 before fading in
        const mesh = btnNextQuiz3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0;
            }
        }
        
        // Trigger fade in & scale pop animation
        setTimeout(() => {
            if (isNextButtonActive && !isNavigatingNext) {
                btnNextQuiz3D.emit('trigger-fade-in', null, false);
            }
        }, 50);

        // After fade-in and scale pop (700ms), start continuous gentle pulse
        setTimeout(() => {
            if (isNextButtonActive && !isNavigatingNext) {
                btnNextQuiz3D.emit('trigger-pulse-start', null, false);
            }
        }, 700);
    }

    if (btnNextPlane3D) {
        btnNextPlane3D.setAttribute('visible', true);
        const mesh = btnNextPlane3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0.001;
            }
        }
    }

    // Refresh A-Frame Raycaster
    const cameraEl = document.querySelector('a-camera');
    if (cameraEl && cameraEl.components && cameraEl.components.raycaster) {
        cameraEl.components.raycaster.refreshObjects();
    }
}

function hideNextButton() {
    isNextButtonActive = false;
    if (btnNextQuiz3D) {
        btnNextQuiz3D.setAttribute('visible', false);
        const mesh = btnNextQuiz3D.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
    if (btnNextPlane3D) {
        btnNextPlane3D.setAttribute('visible', false);
        const mesh = btnNextPlane3D.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
}

function handleNextQuizNavigation() {
    if (isNavigatingNext) return;
    isNavigatingNext = true;

    // Haptic / tactile audio feedback
    playChime(true);

    // Visual feedback on 3D button
    if (btnNextQuiz3D) {
        btnNextQuiz3D.setAttribute('scale', '1.25 1.25 1.25');
    }

    if (currentQuizId < 5) {
        const nextQuizId = currentQuizId + 1;
        console.log(`➡️ [Quiz AR] Navigasi ke Kuis ${nextQuizId}...`);
        if (statusBar) {
            statusBar.textContent = `🚀 Membuka Kuis ${nextQuizId}...`;
            statusBar.classList.add('finished');
        }
        setTimeout(() => {
            window.location.href = `./quiz.html?quiz=${nextQuizId}`;
        }, 250);
    } else if (currentQuizId === 5) {
        console.log(`🏆 [Quiz AR] Kuis 5 Selesai! Membuka Final Score...`);
        if (statusBar) {
            statusBar.textContent = `🏆 Membuka Skor Akhir Petualangan... ✨`;
            statusBar.classList.add('finished');
        }
        setTimeout(() => {
            window.location.href = `./quiz.html?quiz=score`;
        }, 250);
    } else {
        console.log('🏆 [Quiz AR] Semua Kuis Selesai! Kembali ke Chapter 2...');
        if (statusBar) {
            statusBar.textContent = `🏆 Hebat! Semua Kuis Selesai! Kembali ke Cerita...`;
            statusBar.classList.add('finished');
        }
        setTimeout(() => {
            window.location.href = './chapter2.html';
        }, 350);
    }
}

window.__triggerNextQuiz = handleNextQuizNavigation;

// -----------------------------------------------------------------------------
// Home Button Display & Navigation for Final Score
// -----------------------------------------------------------------------------
function showHomeScoreButton() {
    if (isHomeButtonActive) {
        // Tombol sudah aktif dan sedang berdenyut dari sinkronisasi video (detik 4.3s), jangan restart animasi muncul
        return;
    }
    console.log('✨ [Quiz AR] Memunculkan 3D Home Button di kerang dengan animasi denyut...');
    isHomeButtonActive = true;
    isNavigatingHome = false;

    if (btnHomeScore3D) {
        btnHomeScore3D.setAttribute('visible', true);
        btnHomeScore3D.setAttribute('scale', '0.2 0.2 0.2');

        // Reset opacity to 0 before starting fade-in
        const mesh = btnHomeScore3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0;
            }
        }

        setTimeout(() => {
            if (isHomeButtonActive && !isNavigatingHome) {
                btnHomeScore3D.emit('home-fade-in', null, false);
            }
        }, 50);

        setTimeout(() => {
            if (isHomeButtonActive && !isNavigatingHome) {
                btnHomeScore3D.emit('home-pulse-start', null, false);
            }
        }, 650);
    }

    if (btnHomeScorePlane) {
        btnHomeScorePlane.setAttribute('visible', true);
        const mesh = btnHomeScorePlane.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0.001;
            }
        }
    }

    // Refresh A-Frame Raycaster
    const cameraEl = document.querySelector('a-camera');
    if (cameraEl && cameraEl.components && cameraEl.components.raycaster) {
        cameraEl.components.raycaster.refreshObjects();
    }
}

function hideHomeScoreButton() {
    isHomeButtonActive = false;
    if (btnHomeScore3D) {
        btnHomeScore3D.setAttribute('visible', false);
        const mesh = btnHomeScore3D.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
    if (btnHomeScorePlane) {
        btnHomeScorePlane.setAttribute('visible', false);
        const mesh = btnHomeScorePlane.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
}

function handleHomeScoreNavigation() {
    if (isNavigatingHome) return;
    isNavigatingHome = true;

    // Haptic & chime sound feedback
    playChime(true);

    if (btnHomeScore3D) {
        btnHomeScore3D.setAttribute('scale', '1.25 1.25 1.25');
    }

    console.log('🏠 [Quiz AR] Tombol Home pada Final Score diklik! Kembali ke Menu Utama...');
    if (statusBar) {
        statusBar.textContent = '🏠 Kembali ke Menu Utama... ✨';
        statusBar.classList.add('finished');
    }

    setTimeout(() => {
        window.location.href = './index.html';
    }, 300);
}

window.__triggerHomeFromScore = handleHomeScoreNavigation;

// -----------------------------------------------------------------------------
// Monitor Penyelesaian Video & Audio Final Score (Skor Akhir)
// -----------------------------------------------------------------------------
function waitForFinalScoreCompletion(videoEl, soundEl) {
    let hasEnded = false;
    let videoDone = false;
    let soundDone = false;

    const onAllDone = () => {
        if (hasEnded) return;
        hasEnded = true;

        console.log('🏁 [Quiz AR] Final Score selesai diputar! Membekukan frame dan memunculkan tombol Home pada kerang...');
        if (videoEl) videoEl.pause();
        if (soundEl) soundEl.pause();
        quizState = 'FINISHED';

        if (statusBar) {
            statusBar.textContent = `🏆 Selamat! Ketuk Mutiara Rumah di kerang untuk kembali ke Menu Utama! 🏠✨`;
            statusBar.classList.remove('tracking');
            statusBar.classList.add('finished');
        }

        // Pastikan tombol Home aktif jika belum sempat terpicu (fallback)
        if (!isHomeButtonActive) {
            showHomeScoreButton();
        }
    };

    const tryFinish = () => {
        if (videoDone && soundDone) {
            onAllDone();
        }
    };

    const videoTimeHandler = function () {
        // Sinkronisasi: Munculkan tombol 3D tepat di detik 4.3s saat mutiara kerang merekah di video score.mp4
        if (this.currentTime >= 4.3 && !isHomeButtonActive && !isNavigatingHome) {
            console.log('✨ [Quiz AR] Detik 4.3s: Mutiara kerang merekah di video score.mp4! Memunculkan tombol Home 3D secara sinkron...');
            showHomeScoreButton();
        }

        // Freeze frame pada akhir video
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

    // Safety fallback timeout: ~15 detik
    setTimeout(() => {
        if (!hasEnded) {
            videoDone = true;
            soundDone = true;
            onAllDone();
        }
    }, 15000);
}

// -----------------------------------------------------------------------------
// Multi-Layer Click & Touch Detection for 3D Next Button
// -----------------------------------------------------------------------------
function checkNextButtonInteraction(clientX, clientY) {
    if (!isNextButtonActive || isNavigatingNext) return false;
    if (!btnNextQuiz3D || !arScene) return false;

    const camera = arScene.camera;
    if (!camera) return false;

    // 1. Screen-Space Projection Distance Check (Sangat responsif di HP)
    try {
        const nextWorldPos = new THREE.Vector3();
        btnNextQuiz3D.object3D.getWorldPosition(nextWorldPos);

        const screenPos = nextWorldPos.clone().project(camera);
        
        // screenPos.z < 1 artinya objek berada di depan frustum kamera
        if (screenPos.z < 1) {
            const screenX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const screenY = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
            const dist = Math.hypot(clientX - screenX, clientY - screenY);

            // Radius sentuhan fleksibel (110 pixel)
            if (dist < 110) {
                console.log(`🎯 [Touch Target Match] Screen-space tap on 3D Next Button! dist=${dist.toFixed(1)}px`);
                handleNextQuizNavigation();
                return true;
            }
        }
    } catch (err) {
        console.warn('Screen projection check warning:', err);
    }

    // 2. Direct Three.js Raycaster Check
    try {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);

        const targetObjects = [];
        if (btnNextQuiz3D && btnNextQuiz3D.object3D) targetObjects.push(btnNextQuiz3D.object3D);
        if (btnNextPlane3D && btnNextPlane3D.object3D) targetObjects.push(btnNextPlane3D.object3D);

        const intersects = raycaster.intersectObjects(targetObjects, true);
        if (intersects && intersects.length > 0) {
            console.log('🎯 [Three.js Raycaster Match] Intersected 3D Next Button object!');
            handleNextQuizNavigation();
            return true;
        }
    } catch (err) {
        console.warn('Raycaster check warning:', err);
    }

    return false;
}

// -----------------------------------------------------------------------------
// Multi-Layer Click & Touch Detection for 3D Home Button (Final Score)
// -----------------------------------------------------------------------------
function checkHomeScoreInteraction(clientX, clientY) {
    if (!isHomeButtonActive || isNavigatingHome) return false;
    if (!btnHomeScore3D || !arScene) return false;

    const camera = arScene.camera;
    if (!camera) return false;

    // 1. Screen-Space Projection Distance Check (Sangat responsif di HP)
    try {
        const homeWorldPos = new THREE.Vector3();
        btnHomeScore3D.object3D.getWorldPosition(homeWorldPos);

        const screenPos = homeWorldPos.clone().project(camera);
        if (screenPos.z < 1) {
            const screenX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const screenY = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
            const dist = Math.hypot(clientX - screenX, clientY - screenY);

            if (dist < 110) {
                console.log(`🎯 [Touch Target Match] Screen-space tap on 3D Home Button! dist=${dist.toFixed(1)}px`);
                handleHomeScoreNavigation();
                return true;
            }
        }
    } catch (err) {
        console.warn('Home screen projection check warning:', err);
    }

    // 2. Direct Three.js Raycaster Check
    try {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);

        const targetObjects = [];
        if (btnHomeScore3D && btnHomeScore3D.object3D) targetObjects.push(btnHomeScore3D.object3D);
        if (btnHomeScorePlane && btnHomeScorePlane.object3D) targetObjects.push(btnHomeScorePlane.object3D);

        const intersects = raycaster.intersectObjects(targetObjects, true);
        if (intersects && intersects.length > 0) {
            console.log('🎯 [Three.js Raycaster Match] Intersected 3D Home Button object!');
            handleHomeScoreNavigation();
            return true;
        }
    } catch (err) {
        console.warn('Home raycaster check warning:', err);
    }

    return false;
}

// Global Touch & Click Listeners on window
window.addEventListener('click', (e) => {
    if (isNextButtonActive && !isNavigatingNext) {
        checkNextButtonInteraction(e.clientX, e.clientY);
    }
    if (isHomeButtonActive && !isNavigatingHome) {
        checkHomeScoreInteraction(e.clientX, e.clientY);
    }
}, true);

window.addEventListener('touchend', (e) => {
    if (isNextButtonActive && !isNavigatingNext && e.changedTouches && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        const handled = checkNextButtonInteraction(t.clientX, t.clientY);
        if (handled) {
            e.preventDefault();
        }
    }
    if (isHomeButtonActive && !isNavigatingHome && e.changedTouches && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        const handled = checkHomeScoreInteraction(t.clientX, t.clientY);
        if (handled) {
            e.preventDefault();
        }
    }
}, { passive: false, capture: true });

function selectChoice(choice) {
    if (quizState !== 'WAITING_CHOICE' && quizState !== 'RESULT_PLAYING') return;

    const isBenar = (choice === 'benar');
    console.log(`✨ [Quiz AR] Kuis ${currentQuizId}: Pengguna memilih: ${choice.toUpperCase()}`);

    // Pastikan audio pertanyaan benar-benar mati
    if (soundPertanyaan) {
        soundPertanyaan.pause();
    }

    playChime(isBenar);

    // Sembunyikan target pilihan selama video penjelasan diputar
    if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', false);
    if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', false);
    if (quizTouchLayer) quizTouchLayer.classList.remove('active');

    // Pastikan tombol Next tetap tersembunyi selama video penjelasan masih berdurasi
    hideNextButton();

    if (isBenar) {
        choiceHandled = true;
        quizState = 'RESULT_PLAYING';

        // KEDUA VIDEO TETAP TERLIHAT (Tidak ada yang di-hide)
        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);

        // Hentikan video & sound Salah
        if (vidSalah) vidSalah.pause();
        if (soundSalah) {
            soundSalah.pause();
            soundSalah.currentTime = 0;
        }

        // Tampilkan video Benar dan mulai audio Benar
        if (vidBenar) {
            vidBenar.muted = true;
            if (vidBenar.currentTime < 8.5 || vidBenar.currentTime > 10.5 || vidBenar.ended) {
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

        // Tombol Next AKAN MUNCUL di waitForQuizCompletion SETELAH video dan sound selesai habis durasinya
        waitForQuizCompletion(vidBenar, soundBenar, true);

    } else {
        // User memilih SALAH:
        // KEDUA VIDEO TETAP TERLIHAT (Tidak ada yang di-hide)
        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);

        // Hentikan video & sound Benar
        if (vidBenar) vidBenar.pause();
        if (soundBenar) {
            soundBenar.pause();
            soundBenar.currentTime = 0;
        }

        // Putar video Salah dan mulai audio Salah
        if (vidSalah) {
            vidSalah.muted = true;
            if (vidSalah.currentTime < 8.5 || vidSalah.currentTime > 10.5 || vidSalah.ended) {
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

// Monitor penyelesaian video & audio hasil kuis (Habis durasi)
function waitForQuizCompletion(videoEl, soundEl, isCorrect) {
    let hasEnded = false;
    let videoDone = false;
    let soundDone = false;

    const onAllDone = () => {
        if (hasEnded) return;
        hasEnded = true;

        console.log(`🏁 [Quiz AR] Penjelasan Kuis ${currentQuizId} selesai habis durasinya (${isCorrect ? 'Benar' : 'Salah'}).`);
        if (videoEl) videoEl.pause();
        if (soundEl) soundEl.pause();
        quizState = 'FINISHED';

        if (isCorrect) {
            if (statusBar) {
                statusBar.textContent = `🎉 Kuis ${currentQuizId} selesai! Ketuk tombol Next di bawah untuk lanjut ✨`;
            }
            // MUNCULKAN TOMBOL NEXT SETELAH VIDEO & SOUND SELESAI
            showNextButton();
        } else {
            if (statusBar) {
                statusBar.textContent = `💡 Dengarkan penjelasannya lalu ketuk pilihan yang Benar ya! 🌟`;
            }
            // Aktifkan kembali target pilihan agar user bisa memilih jawaban Benar
            if (btnChoiceLeft3D) btnChoiceLeft3D.setAttribute('visible', true);
            if (btnChoiceRight3D) btnChoiceRight3D.setAttribute('visible', true);
            if (quizTouchLayer) quizTouchLayer.classList.add('active');
            quizState = 'WAITING_CHOICE';
            choiceHandled = false;
        }
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
// Event Listeners untuk Interaksi Pemilihan & Navigasi Next
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

// 3D Next Button Click (Tracking on Marker 8)
if (btnNextQuiz3D) {
    btnNextQuiz3D.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        console.log(`🎯 [Quiz AR] Tombol 3D Next diklik pada Marker 8!`);
        handleNextQuizNavigation();
    });
}
if (btnNextPlane3D) {
    btnNextPlane3D.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        console.log(`🎯 [Quiz AR] Tombol 3D Next plane diklik pada Marker 8!`);
        handleNextQuizNavigation();
    });
}

// 3D Home Button Click on Final Score (Tracking on clam/pearl in score.mp4)
if (btnHomeScore3D) {
    btnHomeScore3D.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        console.log(`🎯 [Quiz AR] Tombol 3D Home diklik pada Marker 8!`);
        handleHomeScoreNavigation();
    });
}
if (btnHomeScorePlane) {
    btnHomeScorePlane.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        console.log(`🎯 [Quiz AR] Tombol 3D Home plane diklik pada Marker 8!`);
        handleHomeScoreNavigation();
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
        if (isFinalScore) {
            console.log('🔄 [Quiz AR] Mengulangi Final Score...');
            if (resultModal) resultModal.classList.remove('active');
            hideHomeScoreButton();
            if (vidScore) {
                vidScore.pause();
                vidScore.currentTime = 0;
            }
            if (soundScore) {
                soundScore.pause();
                soundScore.currentTime = 0;
            }
            if (isTargetFound) {
                startQuizPlayback();
            } else {
                quizState = 'WAIT_MARKER';
                if (statusBar) {
                    statusBar.textContent = '📷 Arahkan kamera ke Marker 8...';
                    statusBar.classList.remove('tracking', 'finished');
                }
            }
            return;
        }

        console.log(`🔄 [Quiz AR] Mengulangi Kuis ${currentQuizId}...`);
        if (resultModal) resultModal.classList.remove('active');
        hideNextButton();
        hideHomeScoreButton();

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

