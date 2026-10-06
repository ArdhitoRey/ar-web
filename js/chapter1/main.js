import { state, dom, allVideos, videos } from "./state.js";

// AREA IMPORT FUNGSI PART
import { playPart1, initPart1 } from './parts/part1.js';
import { playPart2, initPart2 } from './parts/part2.js';
import { playPart3, initPart3, resumePart3 } from './parts/part3.js';
import { playPart4, initPart4 } from './parts/part4.js';
import { playPart5, initPart5 } from './parts/part5.js';
import { playPart6, initPart6 } from './parts/part6.js';
import { playPart7, initPart7 } from './parts/part7.js';
import { playPart8, initPart8, handleNavigateToQuiz } from './parts/part8.js';

// IMPORT SEAMLESS QUIZ MODULE
import '../quiz.js';

// 1. DYNAMIC CACHE BUSTING
const cacheBuster = Date.now();
console.log("🔄 Cache buster applied:", cacheBuster);

// BAGIAN 1 - SETTING PATH KE SUB-FOLDER
// Part 1
document.getElementById("vid-laut").src = `./compressed_ultra-videos/chapter1/part1/LAUT-v1.mp4?t=${cacheBuster}`;
document.getElementById("vid-batu").src = `./compressed_ultra-videos/chapter1/part1/BATU SEAWEED-v1.mp4?t=${cacheBuster}`;
document.getElementById("vid-gelembung").src = `./compressed_ultra-videos/chapter1/part1/GELEMBUNG-v1.mp4?t=${cacheBuster}`;
document.getElementById("vid-kapal").src = `./compressed_ultra-videos/chapter1/part1/KAPAL SELAM-v1.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot").src = `./compressed_ultra-videos/chapter1/part1/MASCOT-v1.mp4?t=${cacheBuster}`;

// Part 2
document.getElementById("vid-batu2").src = `./compressed_ultra-videos/chapter1/part2/BATU SEAWEED-v2.mp4?t=${cacheBuster}`;
document.getElementById("vid-gelembung2").src = `./compressed_ultra-videos/chapter1/part2/GELEMBUNG-v2.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot2").src = `./compressed_ultra-videos/chapter1/part2/MASCOT-v2.mp4?t=${cacheBuster}`;
document.getElementById("vid-gosok").src = `./compressed_ultra-videos/chapter1/part2/GOSOK GIGI-v2.mp4?t=${cacheBuster}`;
document.getElementById("vid-orang").src = `./compressed_ultra-videos/chapter1/part2/ORANG-v2.mp4?t=${cacheBuster}`;
document.getElementById("vid-text2").src = `./compressed_ultra-videos/chapter1/part2/TEXT_v2.mp4?t=${cacheBuster}`;

// Part 3
document.getElementById("vid-kapal3").src = `./compressed_ultra-videos/chapter1/part3/KAPAL SELAM-v3.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot3").src = `./compressed_ultra-videos/chapter1/part3/MASCOT-v3.mp4?t=${cacheBuster}`;
document.getElementById("vid-sikat").src = `./compressed_ultra-videos/chapter1/part3/SIKAT GIGI-v3.mp4?t=${cacheBuster}`;
document.getElementById("vid-teks-part3").src = `./compressed_ultra-videos/chapter1/part3/teks-part3.mp4?t=${cacheBuster}`;

// Part 4
document.getElementById("vid-kapal4").src = `./compressed_ultra-videos/chapter1/part4/KAPAL SELAM-v4.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot4").src = `./compressed_ultra-videos/chapter1/part4/MASCOT-v4.mp4?t=${cacheBuster}`;
document.getElementById("vid-sikat4").src = `./compressed_ultra-videos/chapter1/part4/SIKAT GIGI-v4.mp4?t=${cacheBuster}`;
document.getElementById("vid-teks-part4").src = `./compressed_ultra-videos/chapter1/part4/teks-part4.mp4?t=${cacheBuster}`;

// Part 5
document.getElementById("vid-orang5").src = `./compressed_ultra-videos/chapter1/part5/ORANG-v5.mp4?t=${cacheBuster}`;
document.getElementById("vid-tangan").src = `./compressed_ultra-videos/chapter1/part5/TANGAN-v5.mp4?t=${cacheBuster}`;
document.getElementById("vid-teks-part5").src = `./compressed_ultra-videos/chapter1/part5/teks-part5.mp4?t=${cacheBuster}`;

// Part 6
document.getElementById("vid-kapal6").src = `./compressed_ultra-videos/chapter1/part6/KAPAL SELAM-v6.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot2-6").src = `./compressed_ultra-videos/chapter1/part6/mascot2.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot6").src = `./compressed_ultra-videos/chapter1/part6/ORANG MASCOT-v6.mp4?t=${cacheBuster}`;

// Part 7
document.getElementById("vid-coral7").src = `./compressed_ultra-videos/chapter1/part7/CORAL-v7.mp4?t=${cacheBuster}`;
document.getElementById("vid-laut7").src = `./compressed_ultra-videos/chapter1/part7/LAUT-v7.mp4?t=${cacheBuster}`;
document.getElementById("vid-mascot7").src = `./compressed_ultra-videos/chapter1/part7/MASCOT-v7.mp4?t=${cacheBuster}`;
document.getElementById("vid-orang7").src = `./compressed_ultra-videos/chapter1/part7/ORANG-v7.mp4?t=${cacheBuster}`;
document.getElementById("vid-teks-part7").src = `./compressed_ultra-videos/chapter1/part7/teks-part7.mp4?t=${cacheBuster}`;

// Part 8
const vidAir8 = document.getElementById("vid-air-part8-v1");
if (vidAir8) vidAir8.src = `./compressed_ultra-videos/chapter1/part8/air.mp4?t=${cacheBuster}`;
const vidRumput8 = document.getElementById("vid-rumput-part8-v1");
if (vidRumput8) vidRumput8.src = `./compressed_ultra-videos/chapter1/part8/rumput.mp4?t=${cacheBuster}`;
const vidKapal8 = document.getElementById("vid-kapal-part8-v1");
if (vidKapal8) vidKapal8.src = `./compressed_ultra-videos/chapter1/part8/kapal.mp4?t=${cacheBuster}`;
const vidKerang8 = document.getElementById("vid-kerang-part8-v1");
if (vidKerang8) vidKerang8.src = `./compressed_ultra-videos/chapter1/part8/kerang.mp4?t=${cacheBuster}`;
const vidTeks8 = document.getElementById("vid-teks-quiz-part8-v1");
if (vidTeks8) vidTeks8.src = `./compressed_ultra-videos/chapter1/part8/teks-quiz.mp4?t=${cacheBuster}`;

// 2. DYNAMIC CACHE BUSTING & FORCE LOAD AUDIO & VIDEO
[
    { el: dom.soundV1, id: 'sound-v1' },
    { el: dom.soundV2, id: 'sound-v2' },
    { el: dom.soundV3, id: 'sound-v3' },
    { el: dom.soundV4, id: 'sound-v4' },
    { el: dom.soundV5, id: 'sound-v5' },
    { el: dom.soundV6, id: 'sound-v6' },
    { el: dom.soundV7, id: 'sound-v7' },
    { el: dom.soundV8, id: 'sound-v8', ext: 'mp3' }
].forEach(item => {
    if (item.el) {
        const ext = item.ext || 'MP3';
        item.el.src = `./sounds/chapter1/output-sounds/${item.id}.${ext}?t=${cacheBuster}`;
        item.el.load();
        item.el.preload = "auto";
    }
});

// Prioritaskan loading Part 1 terlebih dahulu
videos.part1.forEach((v) => {
    if (v) { v.load(); v.preload = "auto"; }
});

// Load sisa video part 2-8
setTimeout(() => {
    [...videos.part2, ...videos.part3, ...videos.part4, ...videos.part5, ...videos.part6, ...videos.part7, ...videos.part8].forEach((v) => {
        if (v) { v.load(); v.preload = "auto"; }
    });
}, 300);

// -----------------------------------------------------------------------------
// Kamera Streaming Helper (Cegah Black Screen & Suara Memulai Duluan)
// -----------------------------------------------------------------------------
function isCameraStreaming() {
    const video = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (!video) return false;
    return video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0 && !video.paused;
}

// -----------------------------------------------------------------------------
// Browser Page & Scene Readiness Tracking
// -----------------------------------------------------------------------------
let isWindowLoaded = (document.readyState === 'complete');
if (!isWindowLoaded) {
    window.addEventListener('load', () => {
        isWindowLoaded = true;
        checkAndUnlockIfReady();
    }, { once: true });
}

let isSceneLoaded = false;
if (dom.arScene) {
    if (dom.arScene.hasLoaded) {
        isSceneLoaded = true;
    } else {
        dom.arScene.addEventListener('loaded', () => {
            isSceneLoaded = true;
            checkAndUnlockIfReady();
        }, { once: true });
    }
}

// -----------------------------------------------------------------------------
// MindAR Camera Readiness Tracking
// -----------------------------------------------------------------------------
let isArReady = false;

if (dom.arScene) {
    dom.arScene.addEventListener('arReady', () => {
        console.log('📷 [Chapter 1] MindAR Camera stream & AR Scene telah siap!');
        isArReady = true;
        checkAndUnlockIfReady();
    });
    dom.arScene.addEventListener('arError', (err) => {
        console.warn('⚠️ [Chapter 1] MindAR Camera error:', err);
        isArReady = true;
        checkAndUnlockIfReady();
    });
}

// -----------------------------------------------------------------------------
// 3. LOADING SCREEN SYSTEM
// Selesaikan seluruh pemuatan SEBELUM tombol Mulai dapat ditekan:
// - Pemuatan halaman browser tuntas (window load)
// - A-Frame scene & shaders siap (scene loaded)
// - Target MindAR telah ter-compile & siap (arReady)
// - Kamera aktif & streaming frame nyata (isCameraStreaming)
// - Seluruh video Part 1 telah siap (videos.part1 canplaythrough)
// Setelah tombol Mulai ditekan, kamera sudah streaming dan langsung tampil seketika!
// -----------------------------------------------------------------------------
let part1BufferedCount = 0;
let isStartUnlocked = false;

function checkAndUnlockIfReady() {
    if (isStartUnlocked) return;

    const cameraStreaming = isCameraStreaming();
    const totalPart1 = videos.part1.length;
    const videosReady = part1BufferedCount >= totalPart1;

    // Hitung progress gabungan:
    // - Browser Load: 15%
    // - Scene Load: 15%
    // - Video Part 1: 35%
    // - Kamera & MindAR: 35%
    let totalPct = 0;
    if (isWindowLoaded) totalPct += 15;
    if (isSceneLoaded) totalPct += 15;
    if (totalPart1 > 0) totalPct += Math.min(35, Math.round((part1BufferedCount / totalPart1) * 35));
    if (isArReady && cameraStreaming) totalPct += 35;
    else if (cameraStreaming) totalPct += 20;
    else if (isArReady) totalPct += 15;

    totalPct = Math.min(100, totalPct);
    const barFill = document.getElementById('loadingBarFill');
    if (barFill) barFill.style.width = `${Math.max(15, totalPct)}%`;
    if (dom.loadingProgress) dom.loadingProgress.textContent = `${totalPct}%`;

    // Tombol Mulai HANYA terbuka jika SEMUA pemuatan browser, AR, kamera, dan video tuntas!
    if (isWindowLoaded && isSceneLoaded && isArReady && cameraStreaming && videosReady) {
        unlockStartButton();
    }
}

function unlockStartButton() {
    if (isStartUnlocked) return;
    isStartUnlocked = true;
    state.allFullyBuffered = true;
    state.allReady = true;
    state.cameraReady = isCameraStreaming();

    const barFill = document.getElementById('loadingBarFill');
    if (barFill) barFill.style.width = '100%';
    if (dom.loadingProgress) dom.loadingProgress.textContent = "100%";
    if (dom.startButton) {
        dom.startButton.disabled = false;
        dom.startButton.textContent = "Mulai";
        dom.startButton.classList.add("ready");
    }
}

// Pantau buffering video Part 1
videos.part1.forEach((video) => {
    if (!video) return;
    const onPart1Buffered = () => {
        part1BufferedCount++;
        checkAndUnlockIfReady();
    };
    if (video.readyState >= 3) {
        onPart1Buffered();
    } else {
        video.addEventListener("canplaythrough", onPart1Buffered, { once: true });
        video.addEventListener("loadeddata", onPart1Buffered, { once: true });
    }
});

// Polling reguler untuk mendeteksi stream kamera dan kesiapan browser secara real-time
const cameraCheckInterval = setInterval(() => {
    if (isStartUnlocked) {
        clearInterval(cameraCheckInterval);
        return;
    }
    if (!isWindowLoaded && document.readyState === 'complete') {
        isWindowLoaded = true;
    }
    if (!isSceneLoaded && dom.arScene && dom.arScene.hasLoaded) {
        isSceneLoaded = true;
    }
    checkAndUnlockIfReady();
}, 150);

// Safety fallback maksimum (15 detik) jika ada aset eksternal non-kritis yang tertahan jaringan
setTimeout(() => {
    if (!isStartUnlocked) {
        console.log("⏱️ [Chapter 1] Timeout safety check (15s)...");
        isWindowLoaded = true;
        isSceneLoaded = true;
        if (isCameraStreaming()) {
            unlockStartButton();
        }
    }
}, 15000);

// Inisialisasi seluruh listener marker dan UI sejak awal agar targetFound tidak terlewat
initPart1(); initPart2(); initPart3(); initPart4(); initPart5(); initPart6(); initPart7(); initPart8();

function executeStartChapter1() {
    state.hasStarted = true;
    state.audioEnabled = true;
    state.cameraReady = true;

    // Pastikan background body transparan dan elemen kamera terlihat jelas tanpa black screen
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    const camVideo = document.querySelector('body > video') || document.querySelector('video:not([id])');
    if (camVideo) {
        camVideo.style.display = 'block';
        camVideo.style.visibility = 'visible';
        camVideo.style.opacity = '1';
    }

    // Tutup loading overlay seketika agar kamera langsung terlihat tanpa jeda
    if (dom.loadingOverlay) {
        dom.loadingOverlay.classList.add("hidden");
        setTimeout(() => {
            dom.loadingOverlay.style.display = "none";
        }, 200);
    }
    if (dom.arScene) dom.arScene.classList.add("ready");

    if (dom.statusBar && !state.isPlaying) {
        dom.statusBar.textContent = "Arahkan kamera ke Marker 1";
        dom.statusBar.classList.remove("tracking", "finished");
    }

    // Buka kunci WebAudio context secara senyap jika didukung browser
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
            if (!window.__globalAudioCtx) window.__globalAudioCtx = new AudioCtx();
            if (window.__globalAudioCtx.state === 'suspended') window.__globalAudioCtx.resume();
        }
    } catch (e) {}

    // Jika Marker 1 memang sudah terdeteksi nyata oleh kamera sebelum/saat tombol Mulai ditekan
    const isMarker1Detected = (state.pendingPart === 1) || (state.isTargetInView && state.isTargetInView[1]) || (dom.target1 && dom.target1.object3D && dom.target1.object3D.visible);

    if (isMarker1Detected) {
        state.pendingPart = null;
        if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
            playPart1();
        }
    }

    // Watcher: jika Marker 1 terdeteksi dalam jangkauan kamera sesaat setelah tombol Mulai ditekan (cegah butuh refresh)
    const marker1Watcher = setInterval(() => {
        if (state.part1Finished || state.isPlaying || state.currentPart > 0) {
            clearInterval(marker1Watcher);
            return;
        }
        if ((dom.target1 && dom.target1.object3D && dom.target1.object3D.visible) || (state.isTargetInView && state.isTargetInView[1])) {
            clearInterval(marker1Watcher);
            if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
                console.log("🎯 [Chapter 1] Marker 1 terdeteksi langsung oleh kamera!");
                playPart1();
            }
        }
    }, 150);
    setTimeout(() => clearInterval(marker1Watcher), 8000);
}

// 4. START BUTTON (LANGSUNG BUKA KAMERA TANPA DELAY)
if (dom.startButton) {
    dom.startButton.addEventListener("click", () => {
        executeStartChapter1();
    });
}

// 5. GLOBAL CONTROL LOGIC
export function replayPart(partNumber) {
    if (window.__quizActiveSeamless || state.currentPart === 'quiz') return;
    if (partNumber !== state.currentPart) {
        dom.statusBar.textContent = "⚠️ Tidak bisa kembali ke Part sebelumnya";
        state.lastScannedMarker = 0;
        return;
    }

    state.lastScannedMarker = 0;
    const playActions = { 1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4, 5: playPart5, 6: playPart6, 7: playPart7, 8: playPart8 };
    const stateKeys = { 1: 'part1Finished', 2: 'part2Finished', 3: 'part3Finished', 4: 'part4Finished', 5: 'part5Finished', 6: 'part6Finished', 7: 'part7Finished', 8: 'part8Finished' };

    const stateKey = stateKeys[partNumber];
    const wasFinished = state[stateKey];
    state[stateKey] = false;
    
    if(partNumber === 3) state.part4Finished = false; 
    if(partNumber === 1) state.currentPart = 0; 

    playActions[partNumber]();

    setTimeout(() => {
        if (!state.isPlaying) {
            state[stateKey] = wasFinished;
            if(partNumber === 1) state.currentPart = 1;
        }
    }, 100);
}

export function restartFromBeginning() {
    const allContainers = [ dom.containerPart1, dom.containerPart2, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7, dom.containerPart8 ];
    allContainers.forEach((c) => { if (c) c.setAttribute("visible", false); });

    allVideos.forEach((v) => { if (v) { v.pause(); v.currentTime = 0; } });

    state.currentPart = 0;
    state.part1Finished = false; state.part2Finished = false; state.part3Finished = false;
    state.part3Paused = false; state.part4Finished = false; state.part5Finished = false;
    state.part6Finished = false; state.part7Finished = false; state.part8Finished = false;
    state.isPlaying = false;
    state.lastScannedMarker = 0;

    dom.statusBar.classList.remove("finished");
    dom.statusBar.textContent = "Mencari marker...";
}

// 6. EVENT LISTENERS
const handleInteraction = (e) => {
    if (e.type === "touchend") e.preventDefault();
    if (window.__quizActiveSeamless || state.currentPart === 'quiz') return;
    if (!state.isPlaying) {
        if (state.currentPart === 3 && state.part3Paused && !state.part3Finished) {
            resumePart3();
        } else if (state.lastScannedMarker > 0 && state.lastScannedMarker === state.currentPart) {
            replayPart(state.lastScannedMarker);
        } else if (state.currentPart >= 1 && state.currentPart <= 8 && state[`part${state.currentPart}Finished`]) {
            replayPart(state.currentPart);
        } else if (state.part7Finished && state.currentPart === 0) {
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

// Bersihkan kamera & media saat meninggalkan halaman (klik Home / navigasi / pagehide)
export function releaseCameraAndMedia() {
    try {
        document.querySelectorAll('video').forEach((v) => {
            if (v.srcObject && typeof v.srcObject.getTracks === 'function') {
                v.srcObject.getTracks().forEach((track) => track.stop());
                v.srcObject = null;
            }
            try { v.pause(); } catch (e) {}
        });
        const scene = document.querySelector('a-scene');
        if (scene && scene.systems && scene.systems['mindar-image-system']) {
            scene.systems['mindar-image-system'].stop();
        }
    } catch (e) {}
}

const homeBtn = document.getElementById('homeButton');
if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        releaseCameraAndMedia();
    });
}
window.addEventListener('pagehide', releaseCameraAndMedia);
window.addEventListener('beforeunload', releaseCameraAndMedia);

// 7. TESTING & DIRECT JUMP UTILITIES
export function jumpToPart(partNumber) {
    if (partNumber < 1 || partNumber > 8) return;
    console.log(`🧪 [Test] Langsung melompat ke Chapter 1 Part ${partNumber}...`);

    state.hasStarted = true;
    state.audioEnabled = true;
    state.isPlaying = false;
    state.isTransitioning = false;
    state.isMarkerLocked = false;
    state.lockedMarker = null;

    if (dom.loadingOverlay) dom.loadingOverlay.classList.add("hidden");
    if (dom.arScene) dom.arScene.classList.add("ready");

    // Buka semua status part sebelum part target
    for (let i = 1; i < partNumber; i++) {
        state[`part${i}Finished`] = true;
    }
    state[`part${partNumber}Finished`] = false;
    state.currentPart = partNumber - 1;

    // Matikan semua suara dan video
    [dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7, dom.soundV8].forEach(s => {
        if (s) { s.pause(); s.currentTime = 0; s.muted = false; }
    });
    allVideos.forEach(v => {
        if (v) { v.pause(); v.currentTime = 0; }
    });

    // Sembunyikan kontainer lainnya
    const allContainers = [ dom.containerPart1, dom.containerPart2, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7, dom.containerPart8 ];
    allContainers.forEach((c, idx) => {
        if (c && idx + 1 !== partNumber) c.setAttribute("visible", false);
    });

    const playActions = { 1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4, 5: playPart5, 6: playPart6, 7: playPart7, 8: playPart8 };
    if (playActions[partNumber]) {
        playActions[partNumber]();
    }
}
window.jumpToPart = jumpToPart;

export function unlockAllParts() {
    console.log("🔓 [Test] Membuka semua marker Chapter 1...");
    for (let i = 1; i <= 8; i++) {
        state[`part${i}Finished`] = true;
    }
    state.isMarkerLocked = false;
    state.lockedMarker = null;
    dom.statusBar.textContent = "🔓 Semua marker terbuka! Anda bisa scan marker apapun.";
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