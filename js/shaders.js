// CHROMAKEY Shaders - Ultra Clean
AFRAME.registerShader('chromakey-advanced', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    float greenDominance = color.g - max(color.r, color.b);
                    float isGreen = 0.0;
                    if (color.g > 0.4 && color.g > color.r * 1.2 && color.g > color.b * 1.2) isGreen = 1.0;
                    if (color.g > 0.6 && greenDominance > 0.2) isGreen = 1.0;
                    if (greenDominance > 0.15 && color.g > 0.35) isGreen = 1.0;
                    
                    float alpha = 1.0 - isGreen;
                    if (greenDominance > 0.1 && greenDominance < 0.25 && color.g > 0.3) {
                        float smoothFactor = smoothstep(0.1, 0.25, greenDominance);
                        alpha = 1.0 - smoothFactor;
                    }
                    
                    vec3 finalColor = color.rgb;
                    if (alpha > 0.1 && alpha < 0.9 && greenDominance > 0.05) {
                        float despillStrength = (1.0 - alpha) * 0.7;
                        finalColor.g = mix(finalColor.g, (finalColor.r + finalColor.b) * 0.5, despillStrength);
                    }
                    if (alpha > 0.5 && greenDominance > 0.05) finalColor.g *= 0.9;
                    if (max(max(color.r, color.g), color.b) < 0.03) alpha = 0.0;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }
});

AFRAME.registerShader('chromakey-gentle', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    float greenDominance = color.g - max(color.r, color.b);
                    float isGreen = 0.0;
                    if (color.g > 0.5 && color.g > color.r * 1.4 && color.g > color.b * 1.4) isGreen = 1.0;
                    if (color.g > 0.7 && greenDominance > 0.3) isGreen = 1.0;
                    if (greenDominance > 0.2 && color.g > 0.45) isGreen = 1.0;
                    
                    float alpha = 1.0 - isGreen;
                    if (greenDominance > 0.15 && greenDominance < 0.3 && color.g > 0.4) {
                        float smoothFactor = smoothstep(0.15, 0.3, greenDominance);
                        alpha = 1.0 - smoothFactor;
                    }
                    
                    vec3 finalColor = color.rgb;
                    if (alpha > 0.2 && alpha < 0.9 && greenDominance > 0.1) {
                        float despillStrength = (1.0 - alpha) * 0.5;
                        finalColor.g = mix(finalColor.g, (finalColor.r + finalColor.b) * 0.5, despillStrength);
                    }
                    if (alpha > 0.6 && greenDominance > 0.08) finalColor.g *= 0.95;
                    if (max(max(color.r, color.g), color.b) < 0.03) alpha = 0.0;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }
});

AFRAME.registerShader('chromakey-bubble', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { 
                tex: {value: videoTexture},
                brightness: {value: 1.3}
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                uniform float brightness;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    float greenDominance = color.g - max(color.r, color.b);
                    float isGreen = 0.0;
                    if (color.g > 0.6 && color.g > color.r * 1.5 && color.g > color.b * 1.5) isGreen = 1.0;
                    if (color.g > 0.75 && greenDominance > 0.35) isGreen = 1.0;
                    
                    float alpha = 1.0 - isGreen;
                    if (greenDominance > 0.25 && greenDominance < 0.4 && color.g > 0.5) {
                        float smoothFactor = smoothstep(0.25, 0.4, greenDominance);
                        alpha = 1.0 - smoothFactor;
                    }
                    
                    vec3 finalColor = color.rgb;
                    if (alpha > 0.3 && alpha < 0.85 && greenDominance > 0.15) {
                        float despillStrength = (1.0 - alpha) * 0.3;
                        finalColor.g = mix(finalColor.g, (finalColor.r + finalColor.b) * 0.5, despillStrength);
                    }
                    if (alpha > 0.1) {
                        finalColor *= brightness;
                        finalColor = clamp(finalColor, 0.0, 1.0);
                    }
                    if (max(max(color.r, color.g), color.b) < 0.03) alpha = 0.0;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
    }
});

// CHROMAKEY Shader - Khusus Blue Screen
AFRAME.registerShader('chromakey-blue', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    
                    // Dominasi warna biru terhadap merah dan hijau
                    float blueDominance = color.b - max(color.r, color.g);
                    
                    // Kalibrasi presisi blue screen (#083EF6 / #093DF4):
                    // - Blue screen asli: B >= 0.94, R <= 0.045, G <= 0.28, blueDominance > 0.67
                    // - Objek seperti permen lolipop & pola pada baju: R >= 0.05 atau B < 0.92 atau blueDominance < 0.62
                    float domFactor = smoothstep(0.62, 0.69, blueDominance);
                    float rFactor = 1.0 - smoothstep(0.035, 0.065, color.r);
                    float bFactor = smoothstep(0.90, 0.94, color.b);
                    
                    float isBlue = domFactor * rFactor * bFactor;
                    
                    // Hard-cut pengaman untuk piksel blue screen murni
                    if (color.b > 0.935 && blueDominance > 0.67 && color.r < 0.045) {
                        isBlue = 1.0;
                    }
                    
                    float alpha = 1.0 - isBlue;
                    
                    // Despill lembut hanya pada tepian semi-transparan untuk hilangkan pantulan biru
                    vec3 finalColor = color.rgb;
                    if (alpha > 0.05 && alpha < 0.95 && blueDominance > 0.1) {
                        float despillStrength = (1.0 - alpha) * 0.7;
                        float maxRG = max(finalColor.r, finalColor.g);
                        finalColor.b = mix(finalColor.b, maxRG, despillStrength);
                    }
                    
                    if (max(max(color.r, color.g), color.b) < 0.03) alpha = 0.0;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }
});

AFRAME.registerShader('blackkey-advanced', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    
                    // Cari nilai warna paling terang dari RGB (Mencari tingkat kecerahan/Luminance)
                    float brightness = max(max(color.r, color.g), color.b);
                    
                    // PENGATURAN TOLERANSI HITAM
                    // threshold: Batas di mana warna dianggap "Hitam BG" (0.05 = hampir hitam pekat)
                    // smoothing: Tingkat kehalusan pinggiran objek agar tidak bergerigi
                    float threshold = 0.06;
                    float smoothing = 0.15;
                    
                    // Smoothstep akan membuat alpha 0.0 jika brightness di bawah threshold,
                    // dan perlahan naik ke 1.0 pada area smoothing.
                    float alpha = smoothstep(threshold, threshold + smoothing, brightness);
                    
                    // Opsional: Untuk mencegah pinggiran objek terlihat kotor/gosong,
                    // kita bisa menaikkan sedikit kecerahan di area pinggiran transparan
                    vec3 finalColor = color.rgb;
                    if (alpha > 0.0 && alpha < 1.0) {
                        finalColor = finalColor + vec3(0.05); // Tambah sedikit cahaya di pinggiran
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }
});

AFRAME.registerShader('chromakey-bakteri', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;
        
        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;
                
                void main() {
                    vec4 color = texture2D(tex, vUv);
                    
                    // Hitung seberapa dominan warna hijau dibanding merah dan biru
                    float greenDominance = color.g - max(color.r, color.b);
                    
                    // Latar belakang neon green memiliki greenDominance tinggi (mendekati 1.0)
                    // Bakteri hijau gelap memiliki greenDominance rendah (di bawah 0.3)
                    // threshold 0.35 - 0.55 memastikan hanya hijau murni yang tembus pandang
                    float alpha = 1.0 - smoothstep(0.35, 0.55, greenDominance);
                    
                    vec3 finalColor = color.rgb;
                    
                    // Despill: Membersihkan sisa pantulan hijau (halo effect) di pinggiran bakteri
                    if (alpha > 0.0 && alpha < 1.0) {
                        finalColor.g = min(finalColor.g, (finalColor.r + finalColor.b) * 0.6);
                    }
                    if (max(max(color.r, color.g), color.b) < 0.03) alpha = 0.0;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }
});

// CHROMAKEY Shader - Khusus Cyan Screen (Background biru-hijau toska seperti #2DEBE7)
// Latar cyan punya G dan B sama-sama tinggi, R rendah. Kita deteksi cyan dengan
// (min(G,B) - R) -> dominasi cyan, sekaligus memastikan G ≈ B (gbBalance).
AFRAME.registerShader('chromakey-cyan', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    float gb = min(color.g, color.b);
                    float cyanDominance = gb - color.r;             // dominasi cyan vs red
                    float gbBalance = 1.0 - abs(color.g - color.b); // 1.0 saat G == B (cyan murni)

                    // Smoothstep agar pinggiran objek halus
                    float alpha = 1.0 - smoothstep(0.20, 0.45, cyanDominance) * smoothstep(0.7, 0.95, gbBalance);

                    // Pengaman: pixel jelas-jelas cyan terang -> paksa transparan
                    if (color.r < 0.5 && color.g > 0.55 && color.b > 0.55 && cyanDominance > 0.3 && gbBalance > 0.85) {
                        alpha = 0.0;
                    }

                    vec3 finalColor = color.rgb;

                    // Despill: kurangi pantulan cyan di tepi objek
                    if (alpha > 0.0 && alpha < 1.0 && cyanDominance > 0.05) {
                        float despillStrength = (1.0 - alpha) * 0.6;
                        float avgRG = (finalColor.r + finalColor.g) * 0.5;
                        finalColor.b = mix(finalColor.b, min(finalColor.b, avgRG), despillStrength);
                        finalColor.g = mix(finalColor.g, min(finalColor.g, (finalColor.r + finalColor.b) * 0.5), despillStrength * 0.5);
                    }
                    if (max(max(color.r, color.g), color.b) < 0.03) alpha = 0.0;

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
    }
});

// CHROMAKEY Shader - Khusus Magenta/Ungu Screen (#B200B8 & #D201D9)
AFRAME.registerShader('chromakey-magenta', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    // Deteksi warna Magenta/Ungu (#B200B8 & #D201D9):
                    // - Latar ungu: R tinggi, B tinggi, G mendekati 0.0, selisih |R - B| sangat kecil
                    // - Karakter / corak baju: G >= 0.22 atau R jauh lebih tinggi dari B (rbBalance rendah)
                    float rb = min(color.r, color.b);
                    float magentaDominance = rb - color.g;
                    float rbBalance = 1.0 - abs(color.r - color.b);

                    // Transisi halus presisi:
                    // 1) domFactor: dominasi magenta terhadap green (0.15 - 0.28)
                    float domFactor = smoothstep(0.15, 0.28, magentaDominance);
                    // 2) balFactor: memastikan R dan B seimbang (khas ungu murni)
                    float balFactor = smoothstep(0.74, 0.84, rbBalance);
                    // 3) rbFactor: intensitas R dan B mencukupi
                    float rbFactor  = smoothstep(0.22, 0.32, rb);

                    float isMagenta = domFactor * balFactor * rbFactor;

                    // Hard-cut pengaman untuk piksel latar belakang ungu murni & border samping gambar
                    if (magentaDominance > 0.25 && rbBalance > 0.78 && rb > 0.28) {
                        isMagenta = 1.0;
                    }
                    if (color.g < 0.06 && rb > 0.30 && rbBalance > 0.80) {
                        isMagenta = 1.0;
                    }

                    float alpha = 1.0 - isMagenta;

                    vec3 finalColor = color.rgb;

                    // Despill lembut di tepian semi-transparan untuk hilangkan sisa halo ungu
                    if (alpha > 0.0 && alpha < 0.99 && rbBalance > 0.70) {
                        float despillStrength = (1.0 - alpha) * 0.95;
                        float maxGB = max(finalColor.g, finalColor.b);
                        finalColor.r = mix(finalColor.r, min(finalColor.r, maxGB), despillStrength);
                        float avgRG = (finalColor.r + finalColor.g) * 0.5;
                        finalColor.b = mix(finalColor.b, min(finalColor.b, avgRG), despillStrength * 0.8);
                    }

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
    }
});

// CHROMAKEY Shader - Khusus Neon Lime / Yellow-Green Screen (#C6F439 / #CFF35E / RGB: ~198-208, ~240-245, ~57-105)
AFRAME.registerShader('chromakey-neon', {
    schema: { src: {type: 'map'} },
    init: function(data) {
        const videoTexture = new THREE.VideoTexture(data.src);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.generateMipmaps = false;
        videoTexture.wrapS = THREE.ClampToEdgeWrapping;
        videoTexture.wrapT = THREE.ClampToEdgeWrapping;

        this.material = new THREE.ShaderMaterial({
            uniforms: { tex: {value: videoTexture} },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex;
                varying vec2 vUv;

                void main() {
                    vec4 color = texture2D(tex, vUv);

                    // Deteksi warna Neon Lime/Yellow-Green (#C6F439 / #CFF35E):
                    // - Karakteristik neon: G sangat tinggi (> 0.80), R cukup tinggi (> 0.60), B rendah (< 0.55)
                    // - G selalu lebih tinggi dari R (grDiff: 0.05 - 0.20) dan jauh lebih tinggi dari B (gbDiff: 0.35 - 0.75)
                    float gbDiff = color.g - color.b;
                    float grDiff = color.g - color.r;

                    // Transisi halus presisi & toleran terhadap variasi kompresi H.264
                    float isNeon = smoothstep(0.03, 0.08, grDiff) * smoothstep(0.30, 0.45, gbDiff) * smoothstep(0.70, 0.85, color.g);

                    // Hard-cut pengaman untuk mengeliminasi kedipan bintik sisa macroblock neon
                    if (grDiff > 0.05 && gbDiff > 0.38 && color.g > 0.80 && color.r > 0.60 && color.b < 0.55) {
                        isNeon = 1.0;
                    }

                    float alpha = 1.0 - isNeon;

                    vec3 finalColor = color.rgb;

                    // Despill lembut di tepian objek agar tidak ada pantulan cahaya neon kuning-hijau
                    if (alpha > 0.0 && alpha < 0.95 && isNeon > 0.05) {
                        float despillStrength = (1.0 - alpha) * 0.9;
                        finalColor.g = mix(finalColor.g, (finalColor.r + finalColor.b) * 0.5, despillStrength);
                    }

                    if (max(max(color.r, color.g), color.b) < 0.03) alpha = 0.0;

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.NormalBlending
        });
    }
});