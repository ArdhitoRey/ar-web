import { state, dom, allVideos } from "./state.js";

// AREA IMPORT FUNGSI PART
import { playPart1, initPart1 } from './parts/part1.js';
import { playPart2, initPart2 } from './parts/part2.js';
import { playPart3, initPart3, resumePart3 } from './parts/part3.js';
import { playPart4, initPart4 } from './parts/part4.js';
import { playPart5, initPart5 } from './parts/part5.js';
import { playPart6, initPart6 } from './parts/part6.js';
import { playPart7, initPart7 } from './parts/part7.js';

import { initNextButton, hideNextButton } from './nextButton.js';

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

// 2. DYNAMIC CACHE BUSTING & FORCE LOAD AUDIO & VIDEO
[
    { el: dom.soundV1, id: 'sound-v1' },
    { el: dom.soundV2, id: 'sound-v2' },
    { el: dom.soundV3, id: 'sound-v3' },
    { el: dom.soundV4, id: 'sound-v4' },
    { el: dom.soundV5, id: 'sound-v5' },
    { el: dom.soundV6, id: 'sound-v6' },
    { el: dom.soundV7, id: 'sound-v7' }
].forEach(item => {
    if (item.el) {
        item.el.src = `./sounds/chapter1/output-sounds/${item.id}.MP3?t=${cacheBuster}`;
        item.el.load();
        item.el.preload = "auto";
    }
});

allVideos.forEach((v) => {
    v.load(); v.preload = "auto";
});

const totalVideos = allVideos.length;

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

// 3. LOADING SCREEN SYSTEM
allVideos.forEach((video) => {
    if (!video) return;

    const onBuffered = () => {
        state.videosBuffered++;
        if (state.videosBuffered >= totalVideos) {
            unlockStartButton();
        }
    };

    if (video.readyState >= 3) {
        onBuffered();
    } else {
        video.addEventListener("canplaythrough", onBuffered, { once: true });
    }

    video.addEventListener("loadeddata", () => {
        state.videosLoaded++;
        if (state.allFullyBuffered) return;
        const pct = Math.round((state.videosLoaded / totalVideos) * 100);
        const barFill = document.getElementById('loadingBarFill');
        if (barFill) barFill.style.width = `${Math.max(15, pct)}%`;
        if (dom.loadingProgress) {
            dom.loadingProgress.textContent = `${pct}%`;
        }
    }, { once: true });
});

// Safety fallback: jika pre-buffer browser terhambat (misal di mobile), buka tombol Mulai setelah 3.5 detik
setTimeout(() => {
    if (!state.allFullyBuffered) {
        console.log("⏱️ [Chapter 1] Pre-buffer timeout: Tombol Mulai diaktifkan otomatis.");
        unlockStartButton();
    }
}, 3500);

// Inisialisasi seluruh listener marker dan UI sejak awal agar targetFound tidak terlewat
initPart1(); initPart2(); initPart3(); initPart4(); initPart5(); initPart6(); initPart7();
initNextButton();

function checkAndTriggerActiveMarker() {
    // 1. Cek apakah ada marker yang sudah terdeteksi saat overlay loading aktif
    if (state.pendingPart) {
        const p = state.pendingPart;
        state.pendingPart = null;
        if (p === 1 && !state.part1Finished && !state.isPlaying && !state.isTransitioning) {
            playPart1();
            return;
        }
    }
    // 2. Cek apakah target 1 sedang terlihat di kamera (object3D.visible = true)
    if (dom.target1 && dom.target1.object3D && dom.target1.object3D.visible) {
        if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
            playPart1();
            return;
        }
    }
    // 3. Cek flag isTargetInView untuk Part 1
    if (state.isTargetInView && state.isTargetInView[1]) {
        if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
            playPart1();
        }
    }
}

// 4. START BUTTON (UNLOCK AUDIO CONTEXT & ACTIVATE AR)
dom.startButton.addEventListener("click", () => {
    state.hasStarted = true;
    state.audioEnabled = true;

    // Buka kunci audio untuk semua sound secara paralel & non-blocking
    const sounds = [dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7].filter(Boolean);
    sounds.forEach(async (sound) => {
        try {
            sound.muted = true;
            const p = sound.play();
            if (p !== undefined) await p;
            sound.pause();
            sound.currentTime = 0;
        } catch (e) {
            console.warn("⚠️ Audio unlock warning untuk:", sound.id, e);
        } finally {
            sound.muted = false;
        }
    });

    dom.loadingOverlay.classList.add("hidden");
    dom.arScene.classList.add("ready");

    // Langsung putar Part 1 jika marker sudah berada di depan kamera
    checkAndTriggerActiveMarker();
});

// 5. GLOBAL CONTROL LOGIC
export function replayPart(partNumber) {
    if (partNumber !== state.currentPart) {
        dom.statusBar.textContent = "⚠️ Tidak bisa kembali ke Part sebelumnya";
        state.lastScannedMarker = 0;
        return;
    }

    state.lastScannedMarker = 0;
    const playActions = { 1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4, 5: playPart5, 6: playPart6, 7: playPart7 };
    const stateKeys = { 1: 'part1Finished', 2: 'part2Finished', 3: 'part3Finished', 4: 'part4Finished', 5: 'part5Finished', 6: 'part6Finished', 7: 'part7Finished' };

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
    const allContainers = [ dom.containerPart1, dom.containerPart2, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7 ];
    allContainers.forEach((c) => c.setAttribute("visible", false));

    allVideos.forEach((v) => { v.pause(); v.currentTime = 0; });

    state.currentPart = 0;
    state.part1Finished = false; state.part2Finished = false; state.part3Finished = false;
    state.part3Paused = false; state.part4Finished = false; state.part5Finished = false;
    state.part6Finished = false; state.part7Finished = false;
    state.isPlaying = false;
    state.lastScannedMarker = 0;

    dom.statusBar.classList.remove("finished");
    dom.statusBar.textContent = "Mencari marker...";

    hideNextButton();
}

// 6. EVENT LISTENERS
const handleInteraction = (e) => {
    if (e.type === "touchend") e.preventDefault();
    if (!state.isPlaying) {
        if (state.currentPart === 3 && state.part3Paused && !state.part3Finished) {
            resumePart3();
        } else if (state.lastScannedMarker > 0 && state.lastScannedMarker === state.currentPart) {
            replayPart(state.lastScannedMarker);
        } else if (state.currentPart >= 1 && state.currentPart <= 7 && state[`part${state.currentPart}Finished`]) {
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

// 7. TESTING & DIRECT JUMP UTILITIES
export function jumpToPart(partNumber) {
    if (partNumber < 1 || partNumber > 7) return;
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
    [dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7].forEach(s => {
        if (s) { s.pause(); s.currentTime = 0; s.muted = false; }
    });
    allVideos.forEach(v => {
        if (v) { v.pause(); v.currentTime = 0; }
    });

    // Sembunyikan kontainer lainnya
    const allContainers = [ dom.containerPart1, dom.containerPart2, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7 ];
    allContainers.forEach((c, idx) => {
        if (c && idx + 1 !== partNumber) c.setAttribute("visible", false);
    });

    const playActions = { 1: playPart1, 2: playPart2, 3: playPart3, 4: playPart4, 5: playPart5, 6: playPart6, 7: playPart7 };
    if (playActions[partNumber]) {
        playActions[partNumber]();
    }
}
window.jumpToPart = jumpToPart;

export function unlockAllParts() {
    console.log("🔓 [Test] Membuka semua marker Chapter 1...");
    for (let i = 1; i <= 7; i++) {
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
if (jumpTarget && jumpTarget >= 1 && jumpTarget <= 7) {
    const doAutoJump = () => {
        setTimeout(() => jumpToPart(jumpTarget), 400);
    };
    if (dom.arScene && dom.arScene.classList.contains('ready')) {
        doAutoJump();
    } else if (dom.startButton) {
        dom.startButton.addEventListener('click', doAutoJump, { once: true });
    }
}