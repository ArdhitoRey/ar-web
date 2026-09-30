// Quiz 1 Logic - Seamless Video Sync & Magenta Chromakey
// Memenuhi kebutuhan:
// 1. Play kedua video (benar.mp4 & salah.mp4) bersamaan hingga detik 9.25
// 2. Pada detik 9.25, video otomatis berhenti
// 3. Tombol pilihan muncul TANPA efek/animasi apapun (seamless menyatu dengan video)
// 4. Jika user memilih 'Benar', hilangkan video salah, lanjutkan video benar hingga selesai
// 5. Jika user memilih 'Salah', hilangkan video benar, lanjutkan video salah hingga selesai
// 6. Tampilkan modal hasil interaktif saat video selesai

const dom = {
    canvas: document.getElementById('quizCanvas'),
    vidBenar: document.getElementById('vidBenar'),
    vidSalah: document.getElementById('vidSalah'),
    questionBanner: document.getElementById('questionBanner'),
    choicesLayer: document.getElementById('quizChoicesLayer'),
    btnChoiceBenar: document.getElementById('btnChoiceBenar'),
    btnChoiceSalah: document.getElementById('btnChoiceSalah'),
    statusGuide: document.getElementById('statusGuide'),
    startOverlay: document.getElementById('startOverlay'),
    btnStartQuiz: document.getElementById('btnStartQuiz'),
    resultModal: document.getElementById('resultModal'),
    resultCard: document.getElementById('resultCard'),
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultDesc: document.getElementById('resultDesc'),
    btnReplayQuiz: document.getElementById('btnReplayQuiz'),
    bubbleBg: document.getElementById('bubbleBg')
};

// State
const state = {
    showBenar: true,
    showSalah: true,
    hasStoppedAt925: false,
    userAnswer: null, // 'benar' | 'salah' | null
    isFinished: false,
    isReplaying: false,
    useWebGL: true,
    stopTimestamp: 9.25
};

// Web Audio API Synthesizer (Zero-dependency sound effects)
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playCorrectSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.2, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.4);
        });
    } catch (e) {
        console.warn('Audio play error:', e);
    }
}

function playWrongSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.35);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
    } catch (e) {
        console.warn('Audio play error:', e);
    }
}

// Generate animated bubbles in the background
function initBubbles() {
    if (!dom.bubbleBg) return;
    const bubbleCount = 14;
    for (let i = 0; i < bubbleCount; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        const size = Math.floor(Math.random() * 28) + 12; // 12px - 40px
        const left = Math.random() * 100; // 0 - 100%
        const duration = Math.random() * 6 + 6; // 6s - 12s
        const delay = Math.random() * 7; // 0s - 7s
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        b.style.left = `${left}%`;
        b.style.animationDuration = `${duration}s`;
        b.style.animationDelay = `${delay}s`;
        dom.bubbleBg.appendChild(b);
    }
}

// WebGL Chromakey Setup
let gl = null;
let glProgram = null;
let textureBenar = null;
let textureSalah = null;
let posBuffer = null;
let texCoordBuffer = null;
let ctx2D = null; // fallback

const vsSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
    }
`;

// Formula chromakey magenta dari shaders.js
const fsSource = `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;

    void main() {
        vec4 color = texture2D(u_image, v_texCoord);

        float rb = min(color.r, color.b);
        float rbAvg = (color.r + color.b) * 0.5;
        float magentaDominance = rb - color.g;
        float magentaLoose    = rbAvg - color.g;
        float rbBalance       = 1.0 - abs(color.r - color.b);

        // Alpha dari magenta-dominance
        float coreAlpha = 1.0 - smoothstep(0.05, 0.35, magentaDominance);
        float edgeAlpha = 1.0 - smoothstep(0.00, 0.20, magentaLoose) * smoothstep(0.5, 0.85, rbBalance);
        float alpha = min(coreAlpha, edgeAlpha);

        // Pengaman hard-cut magenta jelas
        if (color.g < 0.55 && color.r > 0.5 && color.b > 0.5 && magentaDominance > 0.20 && rbBalance > 0.78) {
            alpha = 0.0;
        }

        vec3 finalColor = color.rgb;

        // Despill agresif kontur ungu
        if (alpha > 0.0 && alpha < 0.95) {
            float despillStrength = (1.0 - alpha) * 0.85;
            float maxGB = max(finalColor.g, finalColor.b);
            finalColor.r = mix(finalColor.r, min(finalColor.r, maxGB), despillStrength);
            float avgRG = (finalColor.r + finalColor.g) * 0.5;
            finalColor.b = mix(finalColor.b, min(finalColor.b, avgRG), despillStrength * 0.7);
        }

        if (max(max(color.r, color.g), color.b) < 0.03) {
            alpha = 0.0;
        }

        gl_FragColor = vec4(finalColor, alpha);
    }
`;

function initWebGL() {
    try {
        gl = dom.canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ||
             dom.canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false });
    } catch (e) {
        gl = null;
    }

    if (!gl) {
        console.warn('⚠️ WebGL tidak didukung, menggunakan 2D canvas fallback.');
        state.useWebGL = false;
        ctx2D = dom.canvas.getContext('2d');
        return;
    }

    const compileShader = (src, type) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(s));
            gl.deleteShader(s);
            return null;
        }
        return s;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
        state.useWebGL = false;
        ctx2D = dom.canvas.getContext('2d');
        return;
    }

    glProgram = gl.createProgram();
    gl.attachShader(glProgram, vs);
    gl.attachShader(glProgram, fs);
    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(glProgram));
        state.useWebGL = false;
        ctx2D = dom.canvas.getContext('2d');
        return;
    }

    gl.useProgram(glProgram);

    // Quad geometry [-1, -1] -> [1, 1]
    const positions = new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
         1.0,  1.0
    ]);
    posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(glProgram, 'a_position');
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    // UV coordinates (flipped Y for HTML5 video standard)
    const texCoords = new Float32Array([
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ]);
    texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const texCoordLocation = gl.getAttribLocation(glProgram, 'a_texCoord');
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Setup Textures
    const createVideoTexture = () => {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        return tex;
    };

    textureBenar = createVideoTexture();
    textureSalah = createVideoTexture();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    console.log('✅ [Quiz] WebGL Chromakey Pipeline siap.');
}

// Render a single video onto the WebGL canvas with chromakey
function renderWebGLVideo(videoEl, texture) {
    if (!videoEl || videoEl.readyState < 2) return;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, videoEl);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

// 2D Canvas Fallback with pixel loop
function render2DVideo(videoEl) {
    if (!videoEl || videoEl.readyState < 2) return;
    const w = dom.canvas.width;
    const h = dom.canvas.height;
    ctx2D.drawImage(videoEl, 0, 0, w, h);
    const imgData = ctx2D.getImageData(0, 0, w, h);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rb = Math.min(r, b);
        if (g < 140 && r > 128 && b > 128 && (rb - g) > 40) {
            data[i + 3] = 0; // Transparan
        }
    }
    ctx2D.putImageData(imgData, 0, 0);
}

// Main Animation & Render Loop
function renderLoop() {
    if (state.useWebGL && gl) {
        gl.viewport(0, 0, dom.canvas.width, dom.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Render Benar video jika aktif
        if (state.showBenar) {
            renderWebGLVideo(dom.vidBenar, textureBenar);
        }

        // Render Salah video jika aktif
        if (state.showSalah) {
            renderWebGLVideo(dom.vidSalah, textureSalah);
        }
    } else if (ctx2D) {
        ctx2D.clearRect(0, 0, dom.canvas.width, dom.canvas.height);
        if (state.showBenar) render2DVideo(dom.vidBenar);
        if (state.showSalah) render2DVideo(dom.vidSalah);
    }

    // Sinkronisasi pemutaran sebelum menitik 9.25s
    if (!state.hasStoppedAt925 && state.showBenar && state.showSalah) {
        const tBenar = dom.vidBenar.currentTime || 0;
        const tSalah = dom.vidSalah.currentTime || 0;

        // Auto drift-correction jika beda lebih dari 0.07 detik
        if (Math.abs(tBenar - tSalah) > 0.07) {
            dom.vidSalah.currentTime = tBenar;
        }

        // Cek apakah sudah mencapai detik 9.25
        if (tBenar >= state.stopTimestamp || tSalah >= state.stopTimestamp) {
            onReachStopPoint();
        }
    }

    // Cek durasi akhir video setelah pilihan dibuat
    if (state.userAnswer && !state.isFinished) {
        const activeVid = state.userAnswer === 'benar' ? dom.vidBenar : dom.vidSalah;
        if (activeVid) {
            if (activeVid.ended || (activeVid.duration && activeVid.currentTime >= activeVid.duration - 0.35)) {
                onVideoFinished();
            }
        }
    }

    requestAnimationFrame(renderLoop);
}

// Dipanggil saat kedua video mencapai detik 9.25
function onReachStopPoint() {
    if (state.hasStoppedAt925) return;
    state.hasStoppedAt925 = true;

    console.log('🛑 [Quiz] Mencapai detik 9.25. Pause kedua video & aktifkan tombol pilihan.');

    dom.vidBenar.pause();
    dom.vidSalah.pause();
    dom.vidBenar.currentTime = state.stopTimestamp;
    dom.vidSalah.currentTime = state.stopTimestamp;

    // Munculkan layer tombol pilihan TANPA EFEK APAPUN (langsung aktif)
    // Sesuai permintaan user: "tapi jangan ada efek apapun saat buttonnya muncul,
    // karena saya mau seolah olah nyambung dengan videonya"
    dom.choicesLayer.classList.add('active');

    dom.statusGuide.textContent = '🤔 Kapan kita sikat gigi? Tap salah satu kartu!';
    dom.statusGuide.className = 'quiz-status-guide prompt';
}

// User memilih salah satu kartu
function handleUserChoice(choice) {
    if (state.userAnswer) return; // Mencegah dobel tap
    state.userAnswer = choice;

    // Langsung sembunyikan tombol pilihan
    dom.choicesLayer.classList.remove('active');

    console.log(`👉 [Quiz] User memilih: ${choice.toUpperCase()}`);

    if (choice === 'benar') {
        // "jika user memilih benar, maka video salah itu hilangkan"
        state.showSalah = false;
        dom.vidSalah.pause();

        playCorrectSound();

        dom.statusGuide.textContent = '✅ Pilihanmu: Sikat Gigi Pagi dan Malam! (Benar)';
        dom.statusGuide.className = 'quiz-status-guide correct';

        // Lanjutkan video Benar sampai selesai
        dom.vidBenar.play().catch(e => console.warn('Play error:', e));
    } else {
        // "jika user memilih salah maka video benar itu hilangkan"
        state.showBenar = false;
        dom.vidBenar.pause();

        playWrongSound();

        dom.statusGuide.textContent = '❌ Pilihanmu: Tidak Mau Sikat Gigi! (Salah)';
        dom.statusGuide.className = 'quiz-status-guide wrong';

        // Lanjutkan video Salah sampai selesai
        dom.vidSalah.play().catch(e => console.warn('Play error:', e));
    }
}

// Dipanggil saat video akhir selesai diputar
function onVideoFinished() {
    if (state.isFinished) return;
    state.isFinished = true;

    console.log('🏁 [Quiz] Video selesai diputar. Tampilkan feedback modal.');

    // Freeze video terakhir
    const activeVid = state.userAnswer === 'benar' ? dom.vidBenar : dom.vidSalah;
    if (activeVid) activeVid.pause();

    if (state.userAnswer === 'benar') {
        dom.resultCard.className = 'result-card card-correct';
        dom.resultIcon.textContent = '🎉';
        dom.resultTitle.textContent = 'Hebat Sekali! Jawabanmu Benar!';
        dom.resultDesc.textContent = 'Kita harus menyikat gigi di pagi hari setelah sarapan dan malam hari sebelum tidur agar kuman tidak merusak gigi.';
        dom.btnReplayQuiz.textContent = '🔄 Ulangi Kuis';
    } else {
        dom.resultCard.className = 'result-card card-wrong';
        dom.resultIcon.textContent = '💡';
        dom.resultTitle.textContent = 'Ups! Kurang Tepat';
        dom.resultDesc.textContent = 'Tidak mau sikat gigi bisa membuat bakteri berkembang biak dan gigi menjadi berlubang. Yuk, coba pilih lagi!';
        dom.btnReplayQuiz.textContent = '🔄 Coba Lagi';
    }

    setTimeout(() => {
        dom.resultModal.classList.add('active');
    }, 400);
}

// Ulangi kuis dari awal
function resetQuiz() {
    console.log('🔄 [Quiz] Mengulang kuis dari awal...');
    dom.resultModal.classList.remove('active');
    dom.choicesLayer.classList.remove('active');

    state.showBenar = true;
    state.showSalah = true;
    state.hasStoppedAt925 = false;
    state.userAnswer = null;
    state.isFinished = false;

    dom.statusGuide.textContent = '🎬 Menonton kuis...';
    dom.statusGuide.className = 'quiz-status-guide prompt';

    dom.vidBenar.pause();
    dom.vidSalah.pause();
    dom.vidBenar.currentTime = 0;
    dom.vidSalah.currentTime = 0;

    startQuizPlayback();
}

// Mulai pemutaran kedua video secara serentak
async function startQuizPlayback() {
    dom.startOverlay.classList.add('hidden');
    dom.statusGuide.textContent = '🎬 Kuis sedang berlangsung... Simak videonya!';
    dom.statusGuide.className = 'quiz-status-guide prompt';

    try {
        dom.vidBenar.currentTime = 0;
        dom.vidSalah.currentTime = 0;
        await Promise.all([
            dom.vidBenar.play(),
            dom.vidSalah.play()
        ]);
        console.log('▶️ [Quiz] Kedua video mulai diputar serentak!');
    } catch (err) {
        console.warn('⚠️ [Quiz] Autoplay diblokir oleh browser, tampilkan overlay tombol mulai:', err);
        dom.startOverlay.classList.remove('hidden');
        dom.statusGuide.textContent = '👉 Ketuk "Mulai Kuis" untuk menjalankan kuis!';
    }
}

// Inisialisasi Event Handlers
function bindEvents() {
    // Tombol Pilihan BENAR (Kartu Kiri)
    dom.btnChoiceBenar.addEventListener('click', (e) => {
        e.stopPropagation();
        handleUserChoice('benar');
    });
    dom.btnChoiceBenar.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleUserChoice('benar');
    });

    // Tombol Pilihan SALAH (Kartu Kanan)
    dom.btnChoiceSalah.addEventListener('click', (e) => {
        e.stopPropagation();
        handleUserChoice('salah');
    });
    dom.btnChoiceSalah.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleUserChoice('salah');
    });

    // Tombol Mulai (jika autoplay dibatasi browser)
    dom.btnStartQuiz.addEventListener('click', () => {
        getAudioContext();
        startQuizPlayback();
    });

    // Tombol Ulangi Kuis
    dom.btnReplayQuiz.addEventListener('click', () => {
        resetQuiz();
    });
}

// Bootstrapping saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    initBubbles();
    initWebGL();
    bindEvents();

    // Tunggu video siap dimainkan
    let readyCount = 0;
    const checkReady = () => {
        readyCount++;
        if (readyCount >= 2) {
            console.log('🎬 [Quiz] Kedua video siap.');
            startQuizPlayback();
        }
    };

    if (dom.vidBenar.readyState >= 2) checkReady();
    else dom.vidBenar.addEventListener('canplay', checkReady, { once: true });

    if (dom.vidSalah.readyState >= 2) checkReady();
    else dom.vidSalah.addEventListener('canplay', checkReady, { once: true });

    // Safety timeout: jika canplay lama, tetap coba jalankan setelah 1.5 detik
    setTimeout(() => {
        if (readyCount < 2) {
            console.log('⏱️ [Quiz] Safety timeout: Memulai video...');
            startQuizPlayback();
        }
    }, 1500);

    // Mulai render loop WebGL
    requestAnimationFrame(renderLoop);
});
