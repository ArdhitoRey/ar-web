// Quiz AR Logic - Marker 8 MindAR Experience
// Video sync, magenta chromakey, 9.25s pause with seamless instant button tap

const cacheBuster = Date.now();
console.log('🔄 [Quiz AR] Inisialisasi kuis AR dengan Marker 8. Cache buster:', cacheBuster);

// Video Elements
const vidBenar = document.getElementById('vid-quiz-benar');
const vidSalah = document.getElementById('vid-quiz-salah');

// Source paths
if (vidBenar) vidBenar.src = `./compressed_ultra-videos/chapter2/quiz/quiz1/video/benar.mp4?t=${cacheBuster}`;
if (vidSalah) vidSalah.src = `./compressed_ultra-videos/chapter2/quiz/quiz1/video/salah.mp4?t=${cacheBuster}`;

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingMessage = document.getElementById('loadingMessage');
const loadingDetail = document.getElementById('loadingDetail');
const loadingProgress = document.getElementById('loadingProgress');
const startButton = document.getElementById('startButton');

const statusBar = document.getElementById('statusBar');
const arScene = document.getElementById('arScene');
const targetQuiz = document.getElementById('targetQuiz');
const videoContainer = document.getElementById('video-container-quiz');

const videoQuizBenar = document.getElementById('video-quiz-benar');
const videoQuizSalah = document.getElementById('video-quiz-salah');

const btnChoiceBenar3D = document.getElementById('btn-choice-benar-3d');
const btnChoiceSalah3D = document.getElementById('btn-choice-salah-3d');

const quizTouchLayer = document.getElementById('quizTouchLayer');
const btnTouchBenar = document.getElementById('btnTouchBenar');
const btnTouchSalah = document.getElementById('btnTouchSalah');

const resultModal = document.getElementById('resultModal');
const resultCard = document.getElementById('resultCard');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultDesc = document.getElementById('resultDesc');
const btnReplayQuiz = document.getElementById('btnReplayQuiz');

// State Machine
// States: 'LOADING' | 'READY_WAIT_START' | 'WAIT_MARKER' | 'INTRO_PLAYING' | 'WAITING_CHOICE' | 'RESULT_PLAYING' | 'FINISHED'
let quizState = 'LOADING';
let isTargetFound = false;
let choiceHandled = false;
let audioCtx = null;

// Sound Synthesizer via Web Audio API for interactive feedback
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
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        } else {
            // Soft double low tone: G4 (392Hz) -> Eb4 (311Hz)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(392.00, now);
            osc.frequency.setValueAtTime(311.13, now + 0.12);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.4);
        }
    } catch (e) {
        console.warn('⚠️ Web Audio feedback unavailable:', e);
    }
}

// -----------------------------------------------------------------------------
// Pre-buffering & Start Button Activation
// -----------------------------------------------------------------------------
const allVideos = [vidBenar, vidSalah].filter(Boolean);
let bufferedCount = 0;

function unlockStartButton() {
    if (quizState !== 'LOADING') return;
    quizState = 'READY_WAIT_START';
    if (loadingMessage) loadingMessage.textContent = 'Siap Dimulai!';
    if (loadingDetail) loadingDetail.textContent = 'Ketuk Mulai Kuis untuk membuka kamera AR';
    if (startButton) {
        startButton.disabled = false;
        startButton.textContent = 'Mulai Kuis 🎮';
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
        console.log('🚀 [Quiz AR] Tombol Mulai ditekan. Membuka AR dan audio context...');
        
        // Prime audio context
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') await audioCtx.resume();
        } catch (e) {
            console.warn('⚠️ Audio context unlock warning:', e);
        }

        // Prime video elements with play/pause
        for (let v of allVideos) {
            try {
                v.muted = true;
                const p = v.play();
                if (p !== undefined) await p;
                v.pause();
                v.currentTime = 0;
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
        console.log('🎯 [Quiz AR] Marker 8 Terdeteksi!');
        isTargetFound = true;

        if (quizState === 'WAIT_MARKER') {
            startQuizPlayback();
        } else if (quizState === 'INTRO_PLAYING') {
            if (statusBar) statusBar.textContent = '🎬 Kuis dimulai! Simak pertanyaannya... 🎯';
        } else if (quizState === 'WAITING_CHOICE') {
            if (statusBar) statusBar.textContent = '👉 Ketuk jawabanmu: SIKAT GIGI PAGI & MALAM atau TIDAK MAU SIKAT GIGI!';
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

    console.log('🎬 [Quiz AR] Memulai pemutaran video kuis (Benar & Salah) sinkron...');
    if (statusBar) {
        statusBar.textContent = '🎬 Kuis dimulai! Simak pertanyaannya... 🎯';
        statusBar.classList.add('tracking');
        statusBar.classList.remove('finished');
    }

    // Tampilkan container kuis dan kedua video
    if (videoContainer) videoContainer.setAttribute('visible', true);
    if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
    if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);

    // Pastikan tombol pilihan tersembunyi selama intro
    if (btnChoiceBenar3D) btnChoiceBenar3D.setAttribute('visible', false);
    if (btnChoiceSalah3D) btnChoiceSalah3D.setAttribute('visible', false);
    if (quizTouchLayer) quizTouchLayer.classList.remove('active');

    // Reset dan mulai kedua video dari 0s
    if (vidBenar) {
        vidBenar.pause();
        vidBenar.currentTime = 0;
        vidBenar.muted = false; // Audio aktif dari video Benar
    }
    if (vidSalah) {
        vidSalah.pause();
        vidSalah.currentTime = 0;
        vidSalah.muted = true;  // Mute video Salah agar audio tidak tumpang tindih
    }

    try {
        const p1 = vidBenar ? vidBenar.play() : Promise.resolve();
        const p2 = vidSalah ? vidSalah.play() : Promise.resolve();
        await Promise.all([p1, p2]);
    } catch (e) {
        console.error('❌ [Quiz AR] Error memulai video:', e);
    }

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

        const currentT = vidBenar ? vidBenar.currentTime : (vidSalah ? vidSalah.currentTime : 0);

        if (currentT >= 9.25) {
            reachDecisionPoint();
            return;
        }

        monitorRaf = requestAnimationFrame(checkTime);
    };

    monitorRaf = requestAnimationFrame(checkTime);
}

// Dipanggil tepat pada detik 9.25
function reachDecisionPoint() {
    console.log('⏸️ [Quiz AR] Mencapai detik 9.25! Menjeda video dan memunculkan tombol pilihan...');
    quizState = 'WAITING_CHOICE';

    // Jeda kedua video tepat di detik 9.25
    if (vidBenar) {
        vidBenar.pause();
        vidBenar.currentTime = 9.25;
    }
    if (vidSalah) {
        vidSalah.pause();
        vidSalah.currentTime = 9.25;
    }

    // AKTIFKAN TOMBOL PILIHAN DENGAN ZERO EFEK/ANIMASI
    // Sesuai permintaan user: "jangan ada efek apapun saat buttonnya muncul, karena saya mau seolah olah nyambung dengan videonya"
    if (btnChoiceBenar3D) btnChoiceBenar3D.setAttribute('visible', true);
    if (btnChoiceSalah3D) btnChoiceSalah3D.setAttribute('visible', true);

    // Aktifkan juga overlay 2D touch transparan untuk kemudahan klik di layar HP
    if (quizTouchLayer) quizTouchLayer.classList.add('active');

    if (statusBar) {
        statusBar.textContent = '👉 Ketuk jawabanmu: SIKAT GIGI PAGI & MALAM atau TIDAK MAU SIKAT GIGI!';
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

    console.log(`✨ [Quiz AR] Pengguna memilih: ${choice.toUpperCase()}`);

    // Sembunyikan target pilihan
    if (btnChoiceBenar3D) btnChoiceBenar3D.setAttribute('visible', false);
    if (btnChoiceSalah3D) btnChoiceSalah3D.setAttribute('visible', false);
    if (quizTouchLayer) quizTouchLayer.classList.remove('active');

    const isBenar = (choice === 'benar');
    playChime(isBenar);

    if (isBenar) {
        // User memilih BENAR:
        // Sembunyikan video Salah, lanjutkan video Benar
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', false);
        if (vidSalah) vidSalah.pause();

        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
        if (vidBenar) {
            vidBenar.muted = false;
            vidBenar.play().catch(e => console.error('Play Benar error:', e));
        }

        if (statusBar) {
            statusBar.textContent = '🎉 Hebat! Pilihanmu benar: Sikat Gigi Pagi dan Malam! ✨';
            statusBar.classList.add('tracking');
        }

        waitForVideoCompletion(vidBenar, true);

    } else {
        // User memilih SALAH:
        // Sembunyikan video Benar, lanjutkan video Salah
        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', false);
        if (vidBenar) vidBenar.pause();

        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);
        if (vidSalah) {
            vidSalah.muted = false;
            vidSalah.play().catch(e => console.error('Play Salah error:', e));
        }

        if (statusBar) {
            statusBar.textContent = '❌ Kurang tepat! Dengarkan penjelasannya... 💡';
            statusBar.classList.add('finished');
        }

        waitForVideoCompletion(vidSalah, false);
    }
}

// Monitor penyelesaian video hasil
function waitForVideoCompletion(videoEl, isCorrect) {
    if (!videoEl) return;

    let hasEnded = false;
    const onComplete = () => {
        if (hasEnded) return;
        hasEnded = true;

        console.log(`🏁 [Quiz AR] Video penjelasan selesai (${isCorrect ? 'Benar' : 'Salah'}).`);
        videoEl.pause();
        quizState = 'FINISHED';
        showResultModal(isCorrect);
    };

    const timeHandler = function() {
        // Freeze frame ~0.4 detik sebelum akhir untuk mencegah black screen
        if (this.duration && (this.duration - this.currentTime <= 0.4)) {
            this.removeEventListener('timeupdate', timeHandler);
            onComplete();
        }
    };

    videoEl.addEventListener('timeupdate', timeHandler);
    videoEl.addEventListener('ended', onComplete, { once: true });
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
            resultDesc.textContent = 'Jawabanmu benar! Kita harus menyikat gigi di pagi hari setelah sarapan dan malam hari sebelum tidur agar gigi tetap bersih dan sehat.';
        }
        if (statusBar) statusBar.textContent = '✅ Kuis selesai! Kamu menjawab dengan benar! 🏆';
    } else {
        if (resultCard) {
            resultCard.className = 'result-card card-wrong';
        }
        if (resultIcon) resultIcon.textContent = '😅';
        if (resultTitle) resultTitle.textContent = 'Yah, Masih Kurang Tepat!';
        if (resultDesc) {
            resultDesc.textContent = 'Jangan malas menyikat gigi ya! Tidak mau sikat gigi bisa membuat kuman berkembang biak dan merusak gigi hingga berlubang.';
        }
        if (statusBar) statusBar.textContent = '💡 Kuis selesai! Pelajari penjelasannya ya! 🌟';
    }

    resultModal.classList.add('active');
}

// -----------------------------------------------------------------------------
// Event Listeners untuk Interaksi Pemilihan
// -----------------------------------------------------------------------------
// 3D Planes
if (btnChoiceBenar3D) {
    btnChoiceBenar3D.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice('benar');
    });
}
if (btnChoiceSalah3D) {
    btnChoiceSalah3D.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice('salah');
    });
}

// Video planes fallback (jika mengklik langsung pada video)
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
if (btnTouchBenar) {
    btnTouchBenar.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice('benar');
    });
    btnTouchBenar.addEventListener('touchstart', (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        selectChoice('benar');
    }, { passive: false });
}

if (btnTouchSalah) {
    btnTouchSalah.addEventListener('click', (e) => {
        if (e) e.stopPropagation();
        selectChoice('salah');
    });
    btnTouchSalah.addEventListener('touchstart', (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        selectChoice('salah');
    }, { passive: false });
}

// Tombol Ulangi Kuis
if (btnReplayQuiz) {
    btnReplayQuiz.addEventListener('click', () => {
        console.log('🔄 [Quiz AR] Mengulangi kuis...');
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

        if (videoQuizBenar) videoQuizBenar.setAttribute('visible', true);
        if (videoQuizSalah) videoQuizSalah.setAttribute('visible', true);
        if (btnChoiceBenar3D) btnChoiceBenar3D.setAttribute('visible', false);
        if (btnChoiceSalah3D) btnChoiceSalah3D.setAttribute('visible', false);
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
