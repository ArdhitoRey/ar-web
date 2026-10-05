import { state, dom, videos } from '../state.js';
import { fadeInContainer, fadeOutContainer, fadeAudioIn, hideAllContainersExcept, isContainerVisible } from '../utils.js';

let isPlayButtonActive = false;
let isNavigatingQuiz = false;

function showPlayPart8Button() {
    if (isPlayButtonActive) return;
    console.log('✨ [Part 8] Kerang terbuka di video! Memunculkan tombol Play 3D dengan animasi denyut...');
    isPlayButtonActive = true;
    isNavigatingQuiz = false;

    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.setAttribute('visible', true);
        dom.btnPlayPart8_3D.setAttribute('scale', '1 1 1');

        // Reset opacity to 0 before starting fade-in
        const mesh = dom.btnPlayPart8_3D.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0;
            }
        }

        setTimeout(() => {
            if (isPlayButtonActive && !isNavigatingQuiz) {
                dom.btnPlayPart8_3D.emit('play-fade-in', null, false);
            }
        }, 50);

        setTimeout(() => {
            if (isPlayButtonActive && !isNavigatingQuiz) {
                dom.btnPlayPart8_3D.emit('play-pulse-start', null, false);
            }
        }, 350);
    }

    if (dom.btnPlayPart8_Plane) {
        dom.btnPlayPart8_Plane.setAttribute('visible', true);
        const mesh = dom.btnPlayPart8_Plane.getObject3D('mesh');
        if (mesh) {
            mesh.visible = true;
            if (mesh.material) {
                mesh.material.depthWrite = false;
                mesh.material.transparent = true;
                mesh.material.opacity = 0.001;
            }
        }
    }

    const cameraEl = document.querySelector('a-camera');
    if (cameraEl && cameraEl.components && cameraEl.components.raycaster) {
        cameraEl.components.raycaster.refreshObjects();
    }
}

function hidePlayPart8Button() {
    isPlayButtonActive = false;
    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.setAttribute('visible', false);
        const mesh = dom.btnPlayPart8_3D.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
    if (dom.btnPlayPart8_Plane) {
        dom.btnPlayPart8_Plane.setAttribute('visible', false);
        const mesh = dom.btnPlayPart8_Plane.getObject3D('mesh');
        if (mesh) mesh.visible = false;
    }
}

function handleNavigateToQuiz() {
    if (isNavigatingQuiz) return;
    isNavigatingQuiz = true;

    console.log('🐚 [Part 8] Tombol Play pada kerang ditekan! Menuju kuis...');

    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.setAttribute('scale', '1.25 1.25 1.25');
    }

    if (dom.statusBar) {
        dom.statusBar.textContent = 'Menuju Kuis Bab 2...';
        dom.statusBar.classList.add('finished');
    }

    setTimeout(() => {
        window.location.href = './quiz.html';
    }, 250);
}

function checkPlayButtonInteraction(clientX, clientY) {
    if (!isPlayButtonActive || isNavigatingQuiz) return false;
    if (!dom.btnPlayPart8_3D || !dom.arScene) return false;

    const camera = dom.arScene.camera;
    if (!camera) return false;

    try {
        const btnWorldPos = new THREE.Vector3();
        dom.btnPlayPart8_3D.object3D.getWorldPosition(btnWorldPos);

        const screenPos = btnWorldPos.clone().project(camera);
        if (screenPos.z < 1) {
            const screenX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const screenY = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
            const dist = Math.hypot(clientX - screenX, clientY - screenY);

            if (dist < 120) {
                console.log(`🎯 [Touch Target Match] Screen-space tap on Part 8 Play Button! dist=${dist.toFixed(1)}px`);
                handleNavigateToQuiz();
                return true;
            }
        }
    } catch (err) {
        console.warn('Play button screen projection check warning:', err);
    }

    try {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);

        const targetObjects = [];
        if (dom.btnPlayPart8_3D && dom.btnPlayPart8_3D.object3D) targetObjects.push(dom.btnPlayPart8_3D.object3D);
        if (dom.btnPlayPart8_Plane && dom.btnPlayPart8_Plane.object3D) targetObjects.push(dom.btnPlayPart8_Plane.object3D);

        const intersects = raycaster.intersectObjects(targetObjects, true);
        if (intersects && intersects.length > 0) {
            console.log('🎯 [Three.js Raycaster Match] Intersected Part 8 Play Button object!');
            handleNavigateToQuiz();
            return true;
        }
    } catch (err) {
        console.warn('Play button raycaster check warning:', err);
    }

    return false;
}

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
    hidePlayPart8Button();
    
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
    
    dom.statusBar.textContent = 'Part 8 diputar';
    dom.statusBar.classList.add('tracking');
    dom.statusBar.classList.remove('finished');
    
    console.log(`📋 [Part 8] Memeriksa daftar video (Total: ${videos.part8.length} video):`);
    
    // Reset video ke awal & sembunyikan tombol play 3D
    hidePlayPart8Button();

    videos.part8.forEach((v, idx) => { 
        if (v) {
            v.pause(); 
            v.currentTime = 0; 
            console.log(`   [${idx + 1}/${videos.part8.length}] Resetting: #${v.id} (src: ${v.src})`);
        } else {
            console.warn(`   ⚠️ [${idx + 1}/${videos.part8.length}] Elemen video bernilai NULL! Cek ID di HTML.`);
        }
    });
    
    const playPromises = videos.part8.map(async (v, idx) => {
        if (!v) return;
        try {
            await v.play();
            console.log(`   ▶️ [Part 8 Video OK] #${v.id} sedang berjalan (durasi: ${v.duration ? v.duration.toFixed(2) + 's' : 'loading...'})`);
        } catch (e) {
            console.error(`   ❌ [Part 8 Video ERROR] Gagal memutar #${v.id}:`, e);
        }
    });
    await Promise.all(playPromises);
    console.log('📹 [Part 8] Seluruh video Part 8 telah dimulai.');
    
    // SINKRONISASI TOMBOL PLAY 3D & FREEZE FRAME
    videos.part8.forEach(v => {
        if (!v) return;
        
        // Cek video kerang untuk sinkronisasi kemunculan tombol play 3D di detik 2.7s saat mutiara mencapai ukuran penuh
        if (v.id === 'vid-kerang-part8-v1') {
            const kerangTimeHandler = function () {
                if (this.currentTime >= 2.7 && !isPlayButtonActive && !isNavigatingQuiz) {
                    console.log('✨ [Part 8] Detik 2.7s: Mutiara kerang mencapai ukuran penuh di video! Memunculkan tombol Play 3D...');
                    showPlayPart8Button();
                    this.removeEventListener('timeupdate', kerangTimeHandler);
                }
            };
            v.addEventListener('timeupdate', kerangTimeHandler);
        }

        v.addEventListener('timeupdate', function preventBlackScreen() {
            if (this.duration && (this.duration - this.currentTime <= 0.5)) {
                this.pause();
                console.log(`⏸️ [Part 8 Freeze Frame] #${this.id} di-freeze pada detik ${this.currentTime.toFixed(2)}s`);
                this.removeEventListener('timeupdate', preventBlackScreen);
            }
        });
    });
    
    await new Promise(r => setTimeout(r, 150));
    if (dom.containerPart8 && !wasVisible) fadeInContainer(dom.containerPart8, 400);
    else if (dom.containerPart8) dom.containerPart8.setAttribute('visible', true);
    
    state.isTransitioning = false;

    let hasFinished = false;
    let safetyTimer = null;
    const finishPart8 = () => {
        if (hasFinished) return;
        hasFinished = true;
        if (safetyTimer) clearTimeout(safetyTimer);

        console.log('✅ [Part 8] Selesai! Video frozen di frame terakhir.');
        state.isPlaying = false;
        state.part8Finished = true;
        
        // Biarkan video kerang tetap terlihat di frame terakhir (tombol play terbuka pada kerang)
        if (dom.containerPart8) {
            dom.containerPart8.setAttribute('visible', true);
        }
        
        // Pastikan tombol Play 3D aktif jika belum sempat terpicu
        if (!isPlayButtonActive) {
            showPlayPart8Button();
        }

        state.isMarkerLocked = false;
        state.lockedMarker = null;
        console.log('🔓 [Part 8] Marker UNLOCKED');
        
        dom.statusBar.textContent = 'Tap untuk ulang, atau mulai Kuis';
        dom.statusBar.classList.remove('tracking');
        dom.statusBar.classList.add('finished');
        dom.statusBar.style.cursor = 'pointer';
        dom.statusBar.onclick = () => {
            handleNavigateToQuiz();
        };
    };

    if (dom.soundV8) {
        dom.soundV8.onended = finishPart8;
    }
    
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
            }
        } else {
            console.warn('⚠️ [Part 8] Audio tidak jalan atau belum diaktifkan.');
        }
    } catch (e) { 
        console.warn('⚠️ [Part 8] Audio error:', e); 
    }

    const fallbackDuration = Math.max((dom.soundV8 && dom.soundV8.duration) || 0, ...videos.part8.map(v => (v && v.duration) || 0), 19.5);
    safetyTimer = setTimeout(finishPart8, (fallbackDuration + 0.5) * 1000);
}

export function initPart8() {
    if (!dom.target8) return; // Sabuk pengaman

    // Navigasi ke kuis saat tombol 3D / hit plane / video kerang ditekan
    const onTouchOrClick = (e) => {
        if (e) {
            e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        handleNavigateToQuiz();
    };

    if (dom.btnPlayPart8_3D) {
        dom.btnPlayPart8_3D.addEventListener('click', onTouchOrClick);
        dom.btnPlayPart8_3D.addEventListener('touchend', onTouchOrClick);
    }
    if (dom.btnPlayPart8_Plane) {
        dom.btnPlayPart8_Plane.addEventListener('click', onTouchOrClick);
        dom.btnPlayPart8_Plane.addEventListener('touchend', onTouchOrClick);
    }

    const kerangEl = document.getElementById('video-kerang-part8-v1');
    if (kerangEl) {
        kerangEl.addEventListener('click', onTouchOrClick);
        kerangEl.addEventListener('touchend', onTouchOrClick);
        kerangEl.addEventListener('mousedown', onTouchOrClick);
    }

    // Global touch/click interaction on window when in Part 8
    window.addEventListener('click', (e) => {
        if (state.currentPart === 8 && isPlayButtonActive && !isNavigatingQuiz) {
            checkPlayButtonInteraction(e.clientX, e.clientY);
        }
    }, true);

    window.addEventListener('touchend', (e) => {
        if (state.currentPart === 8 && isPlayButtonActive && !isNavigatingQuiz && e.changedTouches && e.changedTouches.length > 0) {
            const t = e.changedTouches[0];
            const handled = checkPlayButtonInteraction(t.clientX, t.clientY);
            if (handled) {
                e.preventDefault();
            }
        }
    }, { passive: false, capture: true });

    // Listener pada scene canvas sebagai fallback jika part8 selesai
    const sceneEl = document.getElementById('arScene');
    if (sceneEl) {
        sceneEl.addEventListener('click', () => {
            if (state.part8Finished && state.currentPart === 8) {
                console.log('🐚 [Part 8] Ketukan pada layar saat kerang terbuka! Menuju kuis...');
                handleNavigateToQuiz();
            }
        });
    }

    dom.target8.addEventListener('targetFound', () => {
        const now = Date.now();
        if (now < state.markerIgnoreUntil && state.activeMarkerDetection !== 8) return;
        
        if (state.isMarkerLocked && state.lockedMarker !== 8) {
            dom.statusBar.textContent = `Tunggu Part ${state.lockedMarker} selesai dulu`;
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
            dom.statusBar.textContent = 'Selesaikan Part 7 dulu';
        } else if (state.part8Finished && state.currentPart === 8 && !state.isPlaying) {
            dom.statusBar.textContent = 'Tap untuk ulang, atau mulai Kuis';
            state.lastScannedMarker = 8;
        }
    });
}
