import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept, isContainerVisible } from '../utils.js';

export async function playPart8() {
    // Pengecekan guard
    if (state.isPlaying || !state.part7Finished || (state.currentPart !== 7 && state.currentPart !== 8) || state.isTransitioning) {
        console.log('⏹️ [Part 8] Dibatalkan: Sedang play, Part 7 belum selesai, atau urutan salah.');
        return;
    }
    
    state.isMarkerLocked = true;
    state.lockedMarker = 8;
    state.isTransitioning = true;
    console.log('🔒 [Part 8] Marker LOCKED');
    
    hideAllContainersExcept(dom.containerPart8);
    
    // Cari layar sebelumnya yang mungkin masih menyala secara aman
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3,
        dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7
    ];
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 8] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart8Videos(); 
        });
    } else {
        await startPart8Videos();
    }
}

async function startPart8Videos() {
    console.log('🎬 [Part 8] Memulai pemutaran video...');
    const wasVisible = isContainerVisible(dom.containerPart8);
    state.currentPart = 8;
    state.isPlaying = true;
    
    dom.statusBar.textContent = '✅ Part 8 Playing! 🔊';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    // Reset video ke awal
    videos.part8.forEach(v => { 
        if (v) {
            v.pause(); 
            v.currentTime = 0; 
        }
    });
    
    const playPromises = videos.part8.map(v => v ? v.play().catch(e => console.error('❌ [Part 8] Video play error:', e)) : Promise.resolve());
    await Promise.all(playPromises);
    console.log('📹 [Part 8] Semua video berjalan.');
    
    // FREEZE FRAME
    videos.part8.forEach(v => {
        if (!v) return;
        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause();
                this.removeEventListener('timeupdate', preventBlackScreen);
            }
        });
    });
    
    await new Promise(r => setTimeout(r, 150));
    if (dom.containerPart8 && !wasVisible) fadeInContainer(dom.containerPart8, 400);
    else if (dom.containerPart8) dom.containerPart8.setAttribute('visible', true);
    
    state.isTransitioning = false;

    let hasFinished = false;
    const finishPart8 = () => {
        if (hasFinished) return;
        hasFinished = true;

        console.log('✅ [Part 8] Selesai! Video frozen di frame terakhir.');
        state.isPlaying = false;
        state.part8Finished = true;
        
        // Biarkan video kerang tetap terlihat di frame terakhir (tombol play terbuka pada kerang)
        if (dom.containerPart8) {
            dom.containerPart8.setAttribute('visible', true);
        }
        
        state.isMarkerLocked = false;
        state.lockedMarker = null;
        console.log('🔓 [Part 8] Marker UNLOCKED');
        
        dom.statusBar.textContent = '👉 Ketuk Kerang untuk Mulai Kuis! 🐚';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
        dom.statusBar.style.cursor = 'pointer';
        dom.statusBar.onclick = () => {
            console.log('🐚 [Part 8] Status bar ditekan! Menuju kuis...');
            window.location.href = './quiz.html';
        };
    };
    
    let audioPlayed = false;
    try {
        if (state.audioEnabled && dom.soundV8) {
            dom.soundV8.pause();
            dom.soundV8.currentTime = 0;
            dom.soundV8.volume = 0;
            const playPromise = dom.soundV8.play();
            if (playPromise !== undefined) {
                await playPromise;
                fadeAudioIn(dom.soundV8, 400);
                console.log('🔊 [Part 8] Audio sinkron!');
                audioPlayed = true;
                dom.soundV8.onended = finishPart8;
            }
        }
    } catch (e) { 
        console.warn('⚠️ [Part 8] Audio tidak jalan atau belum tersedia, beralih ke durasi video:', e); 
    }

    const fallbackDuration = Math.max((dom.soundV8 && dom.soundV8.duration) || 0, ...videos.part8.map(v => (v && v.duration) || 0), 19.5);
    setTimeout(finishPart8, (fallbackDuration + 0.5) * 1000);
}

export function initPart8() {
    if (!dom.target8) return; // Sabuk pengaman

    // Navigasi ke kuis saat video kerang / tombol play di kerang ditekan
    const navigateToQuiz = (e) => {
        if (e) {
            e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        console.log('🐚 [Part 8] Video kerang / tombol play ditekan! Menuju kuis...');
        window.location.href = './quiz.html';
    };

    const kerangEl = document.getElementById('video-kerang-part8-v1');
    if (kerangEl) {
        kerangEl.addEventListener('click', navigateToQuiz);
        kerangEl.addEventListener('touchend', navigateToQuiz);
        kerangEl.addEventListener('mousedown', navigateToQuiz);
    }

    // Listener pada scene canvas sebagai fallback jika part8 selesai
    const sceneEl = document.getElementById('arScene');
    if (sceneEl) {
        sceneEl.addEventListener('click', () => {
            if (state.part8Finished && state.currentPart === 8) {
                console.log('🐚 [Part 8] Ketukan pada layar saat kerang terbuka! Menuju kuis...');
                window.location.href = './quiz.html';
            }
        });
    }

    dom.target8.addEventListener('targetFound', () => {
        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 8) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 8) {
            dom.statusBar.textContent = `⚠️ Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        // Catatan: Part 8 adalah part terakhir sebelum kuis
        
        if (state.part7Finished && !state.part8Finished && !state.isPlaying && !state.isTransitioning) {
            console.log('🎯 [Part 8] Marker 8 Terdeteksi!');
            state.activeMarkerDetection = 8;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart8();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
            
        } else if (!state.part7Finished) {
            dom.statusBar.textContent = '⚠️ Selesaikan Part 7 dulu';
        } else if (state.part8Finished && state.currentPart === 8 && !state.isPlaying) {
            dom.statusBar.textContent = '👉 Tap tombol play di kerang untuk ke Quiz! 🐚';
            state.lastScannedMarker = 8;
        }
    });
}
