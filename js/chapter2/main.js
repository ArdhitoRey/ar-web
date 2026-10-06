import { state, dom, allVideos, videos } from "./state.js";

// AREA IMPORT FUNGSI PART
import { playPart1, initPart1 } from './parts/part1.js';
import { playPart2, initPart2 } from './parts/part2.js';
import { playPart3, initPart3 } from './parts/part3.js';
import { playPart4, initPart4 } from "./parts/part4.js";
import { playPart5, initPart5 } from "./parts/part5.js";
import { playPart6, initPart6 } from "./parts/part6.js";
import { playPart7, initPart7 } from "./parts/part7.js";
import { playPart8, initPart8 } from "./parts/part8.js";

// IMPORT SEAMLESS QUIZ MODULE
import '../quiz.js';

const cacheBuster = Date.now();
console.log("🔄 Cache buster applied:", cacheBuster);

// Part 1
document.getElementById("vid-bakteri-part1-v1").src = `./compressed_ultra-videos/chapter2/part1/bakteri.mp4?t=${cacheBuster}`;
document.getElementById("vid-balon-bebek-part1-v1").src = `./compressed_ultra-videos/chapter2/part1/balon bebek.mp4?t=${cacheBuster}`;
document.getElementById("vid-kolam-renang-part1-v1").src = `./compressed_ultra-videos/chapter2/part1/kolam renang.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot-part1-v1").src = `./compressed_ultra-videos/chapter2/part1/mascot.mp4?t=${cacheBuster}`;
document.getElementById("vid-muntah-part1-v1").src = `./compressed_ultra-videos/chapter2/part1/muntah.mp4?t=${cacheBuster}`;
document.getElementById("vid-orang-gigi-part1-v1").src = `./compressed_ultra-videos/chapter2/part1/orang gigi.mp4?t=${cacheBuster}`;

// Part 2
document.getElementById("vid-muntah-part2-v1").src = `./compressed_ultra-videos/chapter2/part2/muntah.mp4?t=${cacheBuster}`;
document.getElementById("vid-orang-makan-part2-v1").src = `./compressed_ultra-videos/chapter2/part2/orang makan.mp4?t=${cacheBuster}`;
document.getElementById("vid-kue-part2-v1").src = `./compressed_ultra-videos/chapter2/part2/kue.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot-part2-v1").src = `./compressed_ultra-videos/chapter2/part2/mascot.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot-part2-v2").src = `./compressed_ultra-videos/chapter2/part2/mascot 2.mp4?t=${cacheBuster}`;

// Part 3
document.getElementById("vid-balon-bebek-part3-v1").src = `./compressed_ultra-videos/chapter2/part3/balon bebek.mp4?t=${cacheBuster}`;
document.getElementById("vid-badan-orang-part3-v1").src = `./compressed_ultra-videos/chapter2/part3/badan orang.mp4?t=${cacheBuster}`;
document.getElementById("vid-gigi-orang-part3-v1").src = `./compressed_ultra-videos/chapter2/part3/gigi orang.mp4?t=${cacheBuster}`;
document.getElementById("vid-tangan-part3-v1").src = `./compressed_ultra-videos/chapter2/part3/tangan.mp4?t=${cacheBuster}`;
document.getElementById("vid-kertas-biru-part3-v1").src = `./compressed_ultra-videos/chapter2/part3/kertas biru.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot-part3-v1").src = `./compressed_ultra-videos/chapter2/part3/mascot.mp4?t=${cacheBuster}`;

// Part 4
document.getElementById("vid-gigi-orang-part4-v1").src = `./compressed_ultra-videos/chapter2/part4/gigi orang.mp4?t=${cacheBuster}`;
document.getElementById("vid-bakteri-part4-v1").src = `./compressed_ultra-videos/chapter2/part4/bakteri.mp4?t=${cacheBuster}`;
document.getElementById("vid-bakteri-part4-v2").src = `./compressed_ultra-videos/chapter2/part4/bakteri2.mp4?t=${cacheBuster}`;

// Part 5
document.getElementById("vid-air-part5-v1").src = `./compressed_ultra-videos/chapter2/part5/air.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot-part5-v1").src = `./compressed_ultra-videos/chapter2/part5/mascot.mp4?t=${cacheBuster}`;
document.getElementById("vid-bola-part5-v1").src = `./compressed_ultra-videos/chapter2/part5/bola.mp4?t=${cacheBuster}`;
document.getElementById("vid-orang-naik-balon-part5-v1").src = `./compressed_ultra-videos/chapter2/part5/orang naik balon.mp4?t=${cacheBuster}`;

// Part 6
document.getElementById("vid-air-part6-v1").src = `./compressed_ultra-videos/chapter2/part6/air.mp4?t=${cacheBuster}`;
document.getElementById("vid-gigi-part6-v1").src = `./compressed_ultra-videos/chapter2/part6/gigi.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot-dan-orang-part6-v1").src = `./compressed_ultra-videos/chapter2/part6/mascot dan orang.mp4?t=${cacheBuster}`;

// Part 7
document.getElementById("vid-air-part7-v1").src = `./compressed_ultra-videos/chapter2/part7/air.mp4?t=${cacheBuster}`;
document.getElementById("vid-bebek-part7-v1").src = `./compressed_ultra-videos/chapter2/part7/bebek.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot-part7-v1").src = `./compressed_ultra-videos/chapter2/part7/mascot.mp4?t=${cacheBuster}`;
document.getElementById("vid-orang-part7-v1").src = `./compressed_ultra-videos/chapter2/part7/orang.mp4?t=${cacheBuster}`;

// Part 8
document.getElementById("vid-air-part8-v1").src = `./compressed_ultra-videos/chapter2/part8/air.mp4?t=${cacheBuster}`;
document.getElementById("vid-rumput-part8-v1").src = `./compressed_ultra-videos/chapter2/part8/rumput.mp4?t=${cacheBuster}`;
document.getElementById("vid-kerang-part8-v1").src = `./compressed_ultra-videos/chapter2/part8/kerang.mp4?t=${cacheBuster}`;
document.getElementById("vid-kapal-part8-v1").src = `./compressed_ultra-videos/chapter2/part8/kapal.mp4?t=${cacheBuster}`;
document.getElementById("vid-teks-quiz-part8-v1").src = `./compressed_ultra-videos/chapter2/part8/teks-quiz.mp4?t=${cacheBuster}`;

// LOAD AUDIO
[dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7, dom.soundV8].filter(Boolean).forEach((s) => {
    s.load();
    s.preload = "auto";
});

// Prioritaskan loading video Part 1
videos.part1.forEach((v) => {
    if (v) { v.load(); v.preload = "auto"; }
});

// Load sisa video part 2-8 di background
setTimeout(() => {
    [...videos.part2, ...videos.part3, ...videos.part4, ...videos.part5, ...videos.part6, ...videos.part7, ...videos.part8].forEach((v) => {
        if (v) { v.load(); v.preload = "auto"; }
    });
}, 300);

function unlockStartButton() {
    if (state.allFullyBuffered) return;
    state.allFullyBuffered = true;
    state.allReady = true;
    const barFill = document.getElementById('loadingBarFill');
    if (barFill) barFill.style.width = '100%';
    if (dom.loadingProgress) dom.loadingProgress.textContent = "100%";
    if (dom.startButton) {
        dom.startButton.disabled = false;
        dom.startButton.textContent = "Mulai";
        dom.startButton.classList.add("ready");
    }
}

// Buka tombol Mulai segera setelah Part 1 siap
let part1BufferedCount = 0;
videos.part1.forEach((video) => {
    if (!video) return;

    const onPart1Buffered = () => {
        part1BufferedCount++;
        const pct = Math.min(100, Math.round((part1BufferedCount / videos.part1.length) * 100));
        const barFill = document.getElementById('loadingBarFill');
        if (barFill) barFill.style.width = `${Math.max(25, pct)}%`;
        if (dom.loadingProgress) dom.loadingProgress.textContent = `${pct}%`;
        if (part1BufferedCount >= videos.part1.length) {
            unlockStartButton();
        }
    };

    if (video.readyState >= 3) {
        onPart1Buffered();
    } else {
        video.addEventListener("canplaythrough", onPart1Buffered, { once: true });
        video.addEventListener("loadeddata", onPart1Buffered, { once: true });
    }
});

// Safety fallback: Buka tombol Mulai setelah 1.8 detik jika lambat
setTimeout(() => {
    if (!state.allFullyBuffered) {
        console.log("⏱️ [Chapter 2] Fast-start timeout: Tombol Mulai siap.");
        unlockStartButton();
    }
}, 1800);

// Inisialisasi seluruh listener marker sejak awal
initPart1();
initPart2();
initPart3();
initPart4();
initPart5();
initPart6();
initPart7();
initPart8();

// -----------------------------------------------------------------------------
// Kamera Streaming Helper (Cegah Black Screen & Suara Memulai Duluan)
// -----------------------------------------------------------------------------
function isCameraActive() {
    const video = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (!video) return false;
    return video.readyState >= 2 && video.videoWidth > 0 && !video.paused;
}

function waitForCameraActive(callback) {
    if (isCameraActive()) {
        callback();
        return;
    }
    const checkInterval = setInterval(() => {
        if (isCameraActive()) {
            clearInterval(checkInterval);
            callback();
        }
    }, 100);

    const video = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (video) {
        video.addEventListener('playing', () => {
            clearInterval(checkInterval);
            callback();
        }, { once: true });
    }

    setTimeout(() => {
        clearInterval(checkInterval);
        callback();
    }, 3500);
}

// -----------------------------------------------------------------------------
// MindAR Camera Readiness Tracking
// -----------------------------------------------------------------------------
let isArReady = false;

if (dom.arScene) {
    dom.arScene.addEventListener('arReady', () => {
        console.log('📷 [Chapter 2] MindAR Camera stream & AR Scene telah siap!');
        isArReady = true;
    });
    dom.arScene.addEventListener('arError', (err) => {
        console.warn('⚠️ [Chapter 2] MindAR Camera error:', err);
        isArReady = true;
    });
}

function executeStartChapter2() {
    state.hasStarted = true;
    state.audioEnabled = true;

    // Tutup loading overlay seketika agar kamera langsung terlihat tanpa jeda
    if (dom.loadingOverlay) {
        dom.loadingOverlay.classList.add("hidden");
        setTimeout(() => {
            dom.loadingOverlay.style.display = "none";
        }, 250);
    }
    if (dom.arScene) dom.arScene.classList.add("ready");

    if (dom.statusBar) {
        dom.statusBar.textContent = "Membuka kamera...";
        dom.statusBar.classList.remove("tracking", "finished");
    }

    // Buka kunci audio untuk semua sound secara paralel & non-blocking
    const sounds = [dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7, dom.soundV8].filter(Boolean);
    sounds.forEach(async (sound) => {
        try {
            sound.muted = true;
            const p = sound.play();
            if (p !== undefined) await p;
            sound.pause();
            sound.currentTime = 0;
        } catch (e) {
        } finally {
            sound.muted = false;
        }
    });

    // Tunggu kamera aktif & streaming frame nyata sebelum menjalankan sound / AR Part 1
    waitForCameraActive(() => {
        console.log('📷 [Chapter 2] Kamera aktif dan streaming!');
        state.cameraReady = true;
        if (dom.statusBar && !state.isPlaying) {
            dom.statusBar.textContent = "Arahkan kamera ke Marker 1";
        }
        // Jika Marker 1 sudah terdeteksi di depan kamera, jalankan Part 1 sekarang
        if (state.pendingPart === 1) {
            state.pendingPart = null;
            if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
                playPart1();
            }
        }
    });
}

if (dom.startButton) {
    dom.startButton.addEventListener("click", () => {
        if (state.hasStarted) return;
        executeStartChapter2();
    });
}

export function replayPart(partNumber) {
    if (partNumber !== state.currentPart) {
        dom.statusBar.textContent = "Tidak bisa kembali ke Part sebelumnya";
        state.lastScannedMarker = 0;
        return;
    }

    state.lastScannedMarker = 0;
    const playActions = { 1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4, 5: playPart5, 6: playPart6, 7: playPart7, 8: playPart8 };
    const stateKeys = { 1: 'part1Finished', 2: 'part2Finished', 3: 'part3Finished', 4: 'part4Finished', 5: 'part5Finished', 6: 'part6Finished', 7: 'part7Finished', 8: 'part8Finished' };

    const stateKey = stateKeys[partNumber];
    const wasFinished = state[stateKey];
    state[stateKey] = false;

    if (partNumber === 1) state.currentPart = 0;

    playActions[partNumber]();

    setTimeout(() => {
        if (!state.isPlaying) {
            state[stateKey] = wasFinished;
            if (partNumber === 1) state.currentPart = 1;
        }
    }, 100);
}

export function restartFromBeginning() {
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3,
        dom.containerPart4, dom.containerPart5, dom.containerPart6,
        dom.containerPart7, dom.containerPart8
    ];
    allContainers.forEach((c) => { if (c) c.setAttribute("visible", false); });
    if (dom.btnPlayPart8_3D) dom.btnPlayPart8_3D.setAttribute("visible", false);
    if (dom.btnPlayPart8_Plane) dom.btnPlayPart8_Plane.setAttribute("visible", false);

    allVideos.forEach((v) => { if (v) { v.pause(); v.currentTime = 0; } });

    state.currentPart = 0;

    state.part1Finished = false; state.part2Finished = false; state.part3Finished = false;
    state.part4Finished = false; state.part5Finished = false; state.part6Finished = false;
    state.part7Finished = false; state.part8Finished = false;

    state.isPlaying = false;
    state.lastScannedMarker = 0;

    dom.statusBar.classList.remove("finished");
    dom.statusBar.textContent = "Mencari marker...";
}

const handleInteraction = (e) => {
    if (e.type === "touchend") e.preventDefault();
    if (!state.isPlaying) {
        if (state.part8Finished) {
            console.log('🐚 [Interaction] Part 8 selesai, tap layar menuju kuis...');
            window.location.href = './quiz.html';
            return;
        }
        if (state.lastScannedMarker > 0 && state.lastScannedMarker === state.currentPart) {
            replayPart(state.lastScannedMarker);
        } else if (state.currentPart >= 1 && state.currentPart <= 8 && state[`part${state.currentPart}Finished`]) {
            replayPart(state.currentPart);
        }
        else if (state.part8Finished && state.currentPart === 0) {
            restartFromBeginning();
        }
    }
};

dom.arScene.addEventListener("click", handleInteraction);
dom.arScene.addEventListener("touchend", handleInteraction);

const handleReset = (e) => {
    if (e.type === "touchend") e.preventDefault();
    if (confirm("Yakin ingin reset ke Part 1? Semua progress akan hilang.")) restartFromBeginning();
};

dom.resetButton.addEventListener("click", handleReset);
dom.resetButton.addEventListener("touchend", handleReset);

// 7. TESTING & DIRECT JUMP UTILITIES
export function jumpToPart(partNumber) {
    if (partNumber < 1 || partNumber > 8) return;
    console.log(`🧪 [Test] Langsung melompat ke Chapter 2 Part ${partNumber}...`);

    state.isPlaying = false;
    state.isTransitioning = false;
    state.isMarkerLocked = false;
    state.lockedMarker = null;

    // Buka semua part sebelum part tujuan
    for (let i = 1; i < partNumber; i++) {
        state[`part${i}Finished`] = true;
    }
    state[`part${partNumber}Finished`] = false;
    state.currentPart = partNumber - 1;

    // Matikan semua suara dan video
    [dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7, dom.soundV8].forEach(s => {
        if (s) { s.pause(); s.currentTime = 0; }
    });
    allVideos.forEach(v => {
        if (v) { v.pause(); v.currentTime = 0; }
    });

    // Sembunyikan kontainer lainnya
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3,
        dom.containerPart4, dom.containerPart5, dom.containerPart6,
        dom.containerPart7, dom.containerPart8
    ];
    allContainers.forEach((c, idx) => {
        if (c && idx + 1 !== partNumber) c.setAttribute("visible", false);
    });
    if (partNumber !== 8) {
        if (dom.btnPlayPart8_3D) dom.btnPlayPart8_3D.setAttribute("visible", false);
        if (dom.btnPlayPart8_Plane) dom.btnPlayPart8_Plane.setAttribute("visible", false);
    }

    const playActions = {
        1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4,
        5: playPart5, 6: playPart6, 7: playPart7, 8: playPart8
    };
    if (playActions[partNumber]) {
        playActions[partNumber]();
    }
}
window.jumpToPart = jumpToPart;

export function unlockAllParts() {
    console.log("🔓 [Test] Membuka semua marker Chapter 2...");
    for (let i = 1; i <= 8; i++) {
        state[`part${i}Finished`] = true;
    }
    state.isMarkerLocked = false;
    state.lockedMarker = null;
    dom.statusBar.textContent = "Semua marker terbuka. Anda bisa scan marker Part 1 s/d 8.";
}
window.unlockAllParts = unlockAllParts;

// Deteksi URL Query Param: ?jump=X atau ?part=X
const urlParams = new URLSearchParams(window.location.search);
const jumpTarget = parseInt(urlParams.get('jump') || urlParams.get('part'), 10);
if (jumpTarget && jumpTarget >= 1 && jumpTarget <= 8) {
    const doAutoJump = () => {
        setTimeout(() => jumpToPart(jumpTarget), 400);
    };
    if (dom.arScene && dom.arScene.classList.contains('ready')) {
        doAutoJump();
    } else if (dom.startButton) {
        dom.startButton.addEventListener('click', doAutoJump, { once: true });
    }
}