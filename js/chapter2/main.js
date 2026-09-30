import { state, dom, allVideos } from "./state.js";

// AREA IMPORT FUNGSI PART
import { playPart1, initPart1 } from './parts/part1.js';
import { playPart2, initPart2 } from './parts/part2.js';
import { playPart3, initPart3 } from './parts/part3.js';
import { playPart4, initPart4 } from "./parts/part4.js";
import { playPart5, initPart5 } from "./parts/part5.js";
import { playPart6, initPart6 } from "./parts/part6.js";
import { playPart7, initPart7 } from "./parts/part7.js";
import { playPart8, initPart8 } from "./parts/part8.js";


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

// part 4
document.getElementById("vid-gigi-orang-part4-v1").src = `./compressed_ultra-videos/chapter2/part4/gigi orang.mp4?t=${cacheBuster}`;
document.getElementById("vid-bakteri-part4-v1").src = `./compressed_ultra-videos/chapter2/part4/bakteri.mp4?t=${cacheBuster}`;
document.getElementById("vid-bakteri-part4-v2").src = `./compressed_ultra-videos/chapter2/part4/bakteri2.mp4?t=${cacheBuster}`;
document.getElementById("vid-wadah-putih-part4-v1").src = `./compressed_ultra-videos/chapter2/part4/wadah putih.mp4?t=${cacheBuster}`;

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

// FORCE LOAD AUDIO & VIDEO
[dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7, dom.soundV8].forEach((s) => {
    if (s) { s.load(); s.preload = "auto"; }
});

allVideos.forEach((v, index) => {
    if (v) { 
        v.load(); 
        v.preload = "auto";
    } else {
        console.error(`❌ ERROR: Video urutan ke-${index} di dalam allVideos bernilai NULL! Cek state.js kamu dan pastikan ID-nya ada di HTML.`);
    }
});

// SESUAIKAN JUMLAH VIDEO DARI SELURUH PART SECARA DINAMIS
const totalVideos = allVideos.length;

function unlockStartButton() {
    if (state.allFullyBuffered) return;
    state.allFullyBuffered = true;
    state.allReady = true;
    if (dom.loadingMessage) dom.loadingMessage.textContent = "Selesai!";
    if (dom.loadingDetail) dom.loadingDetail.textContent = "Silakan mulai pengalaman AR";
    if (dom.startButton) {
        dom.startButton.disabled = false;
        dom.startButton.textContent = "Mulai";
        dom.startButton.style.background = "#4caf50";
        dom.startButton.style.color = "white";
    }
}

allVideos.forEach((video) => {
    if (!video) return;

    const onBuffered = () => {
        state.videosBuffered++; 
        if (dom.loadingDetail) {
            dom.loadingDetail.textContent = state.videosBuffered >= totalVideos ? "Siap!" : "Harap bersabar sebentar";
        }
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
        if (dom.loadingProgress) {
            const dots = "●".repeat(Math.min(state.videosLoaded, totalVideos)) + "○".repeat(Math.max(0, totalVideos - state.videosLoaded));
            dom.loadingProgress.textContent = dots;
        }
    }, { once: true });
});

// Safety fallback: jika pre-buffer browser terhambat (misal di mobile), buka tombol Mulai setelah 3.5 detik
setTimeout(() => {
    if (!state.allFullyBuffered) {
        console.log("⏱️ [Chapter 2] Pre-buffer timeout: Tombol Mulai diaktifkan otomatis.");
        unlockStartButton();
    }
}, 3500);

dom.startButton.addEventListener("click", async () => {
    if (!state.allFullyBuffered) return;

    const sounds = [dom.soundV1, dom.soundV2, dom.soundV3, dom.soundV4, dom.soundV5, dom.soundV6, dom.soundV7, dom.soundV8].filter(Boolean);
    for (let sound of sounds) {
        try {
            sound.muted = true;
            await sound.play();
            sound.pause();
            sound.currentTime = 0;
            sound.muted = false;
        } catch (e) {
            console.warn("⚠️ Audio unlock warning untuk:", sound.id, e);
        }
    }
    state.audioEnabled = true;

    dom.loadingOverlay.classList.add("hidden");
    dom.arScene.classList.add("ready");

    initPart1(); 
    initPart2();
    initPart3(); 
    initPart4(); 
    initPart5(); 
    initPart6(); 
    initPart7();
    initPart8();
});

export function replayPart(partNumber) {
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
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3,
        dom.containerPart4, dom.containerPart5, dom.containerPart6,
        dom.containerPart7, dom.containerPart8
    ];
    allContainers.forEach((c) => { if (c) c.setAttribute("visible", false); });

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