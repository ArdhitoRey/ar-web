import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept } from '../utils.js';

export async function playPart1() {
    // 1. Pengecekan guard yang ketat + status Transisi
    if (state.isPlaying || (state.currentPart !== 0 && state.currentPart !== 1) || state.isTransitioning) {
        console.log('⏹️ [Part 1] Dibatalkan: Sedang play, atau bukan urutannya.');
        return;
    }
    
    state.isMarkerLocked = true;
    state.lockedMarker = 1;
    state.isTransitioning = true;
    console.log('🔒 [Part 1] Marker LOCKED - Hanya Marker 1 yang aktif');
    
    hideAllContainersExcept(dom.containerPart1);
    
    // 2. Cari layar sebelumnya untuk ditutup secara halus
    const allContainers = [dom.containerPart2, dom.containerPart3, dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7]; 
    const previousContainer = allContainers.find(c => c && c.getAttribute('visible') === 'true');
    
    if (previousContainer) {
        console.log('🔄 [Part 1] Memudarkan adegan sebelumnya...');
        fadeOutContainer(previousContainer, 400, async () => { 
            await startPart1Videos(); 
        });
    } else {
        await startPart1Videos();
    }
}

async function startPart1Videos() {
    console.log('🎬 [Part 1] Memulai pemutaran video...');
    const wasVisible = dom.containerPart1 && (dom.containerPart1.getAttribute('visible') === true || dom.containerPart1.getAttribute('visible') === 'true');
    state.currentPart = 1;
    state.isPlaying = true;
    
    dom.statusBar.textContent = 'Part 1 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    videos.part1.forEach(v => { v.pause(); v.currentTime = 0; });
    
    // Tampilkan container AR langsung agar output visual tidak hilang/blank
    if (dom.containerPart1 && !wasVisible) fadeInContainer(dom.containerPart1, 300);
    else if (dom.containerPart1) dom.containerPart1.setAttribute('visible', true);
    
    const playPromises = videos.part1.map(v => v.play().catch(e => console.error('❌ [Part 1] Video play error:', e)));
    // Timeout aman agar video lambat tidak menggantung transisi selamanya
    await Promise.race([Promise.all(playPromises), new Promise(r => setTimeout(r, 600))]);
    
    // 3. TEKNIK FREEZE FRAME (Mencegah black screen di akhir video)
    videos.part1.forEach(v => {
        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause(); 
                this.removeEventListener('timeupdate', preventBlackScreen); 
            }
        });
    });
    
    try {
        if (dom.soundV1) {
            dom.soundV1.pause();
            dom.soundV1.currentTime = 0;
            dom.soundV1.muted = false;
            const p = dom.soundV1.play();
            if (p !== undefined) {
                p.then(() => fadeAudioIn(dom.soundV1, 400)).catch((err) => {
                    console.warn('⚠️ [Part 1] Audio play deferred:', err);
                });
            }
        } else {
            console.warn('⚠️ [Part 1] Audio tidak ditemukan.');
        }
    } catch (e) { 
        console.error('❌ [Part 1] Audio error:', e); 
    }
    
    state.isTransitioning = false;
    
    let hasFinished = false;
    const finishPart1 = () => {
        if (hasFinished) return;
        hasFinished = true;
        clearTimeout(safetyTimer);

        console.log('✅ [Part 1] Selesai! Video dibersihkan.');
        state.isPlaying = false;
        state.part1Finished = true;
        
        if (dom.containerPart1) {
            fadeOutContainer(dom.containerPart1, 250, () => {
                videos.part1.forEach(v => { 
                    try { 
                        v.pause(); 
                        v.currentTime = 0; 
                    } catch (e) {} 
                });
                console.log('🧹 Layar dibersihkan dan video dimatikan.');
            });
        }
        
        state.isMarkerLocked = false;
        state.lockedMarker = null;
        
        dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 2';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
    };

    if (dom.soundV1) {
        dom.soundV1.onended = finishPart1;
    }

    const fallbackDur = Math.max((dom.soundV1 && dom.soundV1.duration) || 0, ...videos.part1.map(v => (v && v.duration) || 0), 12);
    const safetyTimer = setTimeout(finishPart1, (fallbackDur + 0.5) * 1000);
}

export function initPart1() {
    if (!dom.target1) return;

    dom.target1.addEventListener('targetFound', () => {
        state.isTargetInView[1] = true;
        if (!state.hasStarted) {
            state.pendingPart = 1;
            return;
        }
        if (!state.cameraReady) {
            console.log('📷 [Part 1] Marker terdeteksi tapi kamera belum streaming, tunggu kamera aktif...');
            state.pendingPart = 1;
            return;
        }

        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 1) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 1) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
            return;
        }
        
        if (state.currentPart > 1) {
            dom.statusBar.textContent = 'Tidak bisa kembali ke Part sebelumnya. Tekan tombol Ulangi jika perlu.';
            if (dom.containerPart1) dom.containerPart1.setAttribute('visible', false);
            return;
        }
        
        if (!state.part1Finished && !state.isPlaying && !state.isTransitioning) {
            state.activeMarkerDetection = 1;
            state.markerIgnoreUntil = now + state.MARKER_IGNORE_DURATION;
            
            playPart1();
            
            setTimeout(() => {
                if (!state.isPlaying) {
                    state.activeMarkerDetection = null;
                }
            }, state.MARKER_IGNORE_DURATION);
            
        } else if (state.part1Finished && state.currentPart === 1 && !state.isPlaying) {
            dom.statusBar.textContent = 'Tap untuk ulang, atau scan Marker 2';
            state.lastScannedMarker = 1;
        }
    });

    dom.target1.addEventListener('targetLost', () => {
        state.isTargetInView[1] = false;
        if (state.pendingPart === 1) {
            state.pendingPart = null;
        }
    });
}