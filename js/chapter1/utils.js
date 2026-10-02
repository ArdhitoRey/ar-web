import { dom } from './state.js';

export function fadeOutContainer(container, duration, callback) {
    if (!container) {
        if (callback) callback();
        return;
    }
    
    container.setAttribute('animation', {
        property: 'scale',
        from: '1 1 1',
        to: '0.8 0.8 0.8',
        dur: duration,
        easing: 'easeInQuad'
    });
    
    setTimeout(() => {
        container.setAttribute('visible', false);
        container.removeAttribute('animation');
        container.removeAttribute('animation__opacity');
        if (callback) callback();
    }, duration);
}

export function fadeInContainer(container, duration) {
    if (!container) return;
    container.setAttribute('visible', true);
    container.setAttribute('scale', '0.8 0.8 0.8');
    
    container.setAttribute('animation', {
        property: 'scale',
        from: '0.8 0.8 0.8',
        to: '1 1 1',
        dur: duration,
        easing: 'easeOutQuad'
    });
    
    setTimeout(() => {
        container.removeAttribute('animation');
        container.removeAttribute('animation__opacity');
    }, duration);
}

export function fadeAudioIn(audio, duration) {
    if (!audio) return;
    try {
        audio.muted = false;
        const steps = 20;
        const stepDuration = duration / steps;
        let currentStep = 0;
        try { audio.volume = 0.2; } catch (e) {}

        const fadeInterval = setInterval(() => {
            currentStep++;
            try {
                audio.volume = Math.min(0.2 + (currentStep / steps) * 0.8, 1.0);
            } catch (e) {}

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                try { audio.volume = 1.0; } catch (e) {}
            }
        }, stepDuration);
    } catch (e) {
        try { audio.volume = 1.0; } catch (err) {}
    }
}

export function fadeAudioOut(audio, duration) {
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = 1.0 / steps;
    let currentStep = steps;
    
    const fadeInterval = setInterval(() => {
        currentStep--;
        audio.volume = Math.max(currentStep * volumeStep, 0);
        
        if (currentStep <= 0) {
            clearInterval(fadeInterval);
            audio.volume = 0;
            audio.pause();
        }
    }, stepDuration);
}

export function hideAllContainersExcept(exceptContainer) {
    const allContainers = [
        dom.containerPart1, dom.containerPart2, dom.containerPart3, 
        dom.containerPart4, dom.containerPart5, dom.containerPart6, dom.containerPart7
    ];
    allContainers.forEach(container => {
        if (container !== exceptContainer) {
            container.setAttribute('visible', false);
        }
    });
}

// Helper: cek apakah container A-Frame sedang terlihat (visible attribute = true)
// A-Frame menyimpan attribute "visible" sebagai string "true"/"false" atau boolean.
export function isContainerVisible(container) {
    if (!container) return false;
    const v = container.getAttribute('visible');
    return v === true || v === 'true';
}