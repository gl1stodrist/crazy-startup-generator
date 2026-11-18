// Web Audio API Synthesizer for Cyberpunk / Web3 Sound Effects
// No external audio files needed!

class CyberAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch (e) {
            console.warn(e);
        }
    }

    playGenerate() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;

            // Frequency sweep (whoosh/energy)
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();

            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(140, now);
            osc1.frequency.exponentialRampToValueAtTime(950, now + 0.28);

            // Filter for cyberpunk resonant sound
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(400, now);
            filter.frequency.exponentialRampToValueAtTime(3200, now + 0.28);

            gain1.gain.setValueAtTime(0.15, now);
            gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.32);

            osc1.connect(filter);
            filter.connect(gain1);
            gain1.connect(this.ctx.destination);

            osc1.start(now);
            osc1.stop(now + 0.32);

            // High chime burst
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1400, now + 0.2);
            osc2.frequency.setValueAtTime(1750, now + 0.28);
            gain2.gain.setValueAtTime(0.1, now + 0.2);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

            osc2.connect(gain2);
            gain2.connect(this.ctx.destination);

            osc2.start(now + 0.2);
            osc2.stop(now + 0.45);
        } catch (e) {
            console.warn(e);
        }
    }

    playCash() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            [987.77, 1318.51, 1975.53].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + idx * 0.08;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.15, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + 0.35);
            });
        } catch (e) {
            console.warn(e);
        }
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + idx * 0.06;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.12, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + 0.25);
            });
        } catch (e) {
            console.warn(e);
        }
    }
}

window.cyberAudio = new CyberAudio();
