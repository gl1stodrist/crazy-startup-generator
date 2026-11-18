// Three.js 3D Web3 Interactive Scene with 3D Models & Mouse Tracking
class Cyber3DScene {
    constructor(canvasContainerId) {
        this.container = document.getElementById(canvasContainerId);
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        // 3D Objects
        this.coreGroup = null;
        this.outerTorus = null;
        this.innerCrystal = null;
        this.wireCore = null;
        this.satellites = [];
        this.particles = null;

        // Mouse Tracking
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        // Animation state
        this.clock = new THREE.Clock();
        this.boostSpeed = 1;
        this.targetBoost = 1;

        this.init();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x060814, 0.0018);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 85;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x101530, 2.5);
        this.scene.add(ambientLight);

        // Cyan Main Point Light
        this.cyanLight = new THREE.PointLight(0x00f0ff, 4, 150);
        this.cyanLight.position.set(30, 25, 40);
        this.scene.add(this.cyanLight);

        // Magenta Secondary Point Light
        this.pinkLight = new THREE.PointLight(0xff007a, 3.5, 150);
        this.pinkLight.position.set(-35, -20, 30);
        this.scene.add(this.pinkLight);

        // Purple Accent Rim Light
        this.purpleLight = new THREE.PointLight(0x7928ca, 4, 120);
        this.purpleLight.position.set(0, -35, -20);
        this.scene.add(this.purpleLight);

        // Group for Core 3D Models
        this.coreGroup = new THREE.Group();
        this.coreGroup.position.set(0, 4, 0);
        this.scene.add(this.coreGroup);

        this.createCoreCrystal();
        this.createTorusKnot();
        this.createGyroscopicRings();
        this.createSatellites();
        this.createParticleField();

        // Event Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    }

    createCoreCrystal() {
        // Inner Octahedron / Diamond (Ethereum Web3 Vibe)
        const crystalGeo = new THREE.OctahedronGeometry(13, 0);
        const crystalMat = new THREE.MeshPhysicalMaterial({
            color: 0x0a192f,
            emissive: 0x0047ff,
            emissiveIntensity: 0.35,
            roughness: 0.1,
            metalness: 0.85,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: false,
            flatShading: true
        });
        this.innerCrystal = new THREE.Mesh(crystalGeo, crystalMat);
        this.coreGroup.add(this.innerCrystal);

        // Outer Wireframe Shell with Glow
        const wireGeo = new THREE.OctahedronGeometry(14.5, 1);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.45
        });
        this.wireCore = new THREE.Mesh(wireGeo, wireMat);
        this.coreGroup.add(this.wireCore);
    }

    createTorusKnot() {
        // Futuristic Cyber Torus Knot wrapping around the crystal
        const torusGeo = new THREE.TorusKnotGeometry(21, 1.8, 120, 16, 2, 3);
        const torusMat = new THREE.MeshStandardMaterial({
            color: 0x11052C,
            emissive: 0x9d4edd,
            emissiveIntensity: 0.6,
            roughness: 0.25,
            metalness: 0.9,
            wireframe: false
        });
        this.outerTorus = new THREE.Mesh(torusGeo, torusMat);
        this.coreGroup.add(this.outerTorus);

        // Accent wireframe for the Torus
        const torusWireMat = new THREE.MeshBasicMaterial({
            color: 0xff007a,
            wireframe: true,
            transparent: true,
            opacity: 0.25
        });
        const torusWire = new THREE.Mesh(torusGeo, torusWireMat);
        this.outerTorus.add(torusWire);
    }

    createGyroscopicRings() {
        this.rings = [];
        const ringConfigs = [
            { radius: 26, tube: 0.3, color: 0x00f0ff, rotX: Math.PI / 4, rotY: 0 },
            { radius: 30, tube: 0.3, color: 0xff007a, rotX: -Math.PI / 3, rotY: Math.PI / 6 },
            { radius: 34, tube: 0.25, color: 0x00ff88, rotX: Math.PI / 2, rotY: Math.PI / 3 }
        ];

        ringConfigs.forEach(cfg => {
            const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
            const mat = new THREE.MeshBasicMaterial({
                color: cfg.color,
                transparent: true,
                opacity: 0.55
            });
            const ring = new THREE.Mesh(geo, mat);
            ring.rotation.x = cfg.rotX;
            ring.rotation.y = cfg.rotY;
            this.coreGroup.add(ring);
            this.rings.push({ mesh: ring, speedX: 0.005 + Math.random() * 0.005, speedY: 0.004 });
        });
    }

    createSatellites() {
        // Orbiting decentralized node cubes
        const numSatellites = 6;
        for (let i = 0; i < numSatellites; i++) {
            const geo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
            const mat = new THREE.MeshStandardMaterial({
                color: 0x050515,
                emissive: i % 2 === 0 ? 0x00f0ff : 0xff007a,
                emissiveIntensity: 0.8,
                metalness: 0.9,
                roughness: 0.1
            });
            const cube = new THREE.Mesh(geo, mat);

            // Add subtle wireframe
            const wire = new THREE.Mesh(
                geo,
                new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.6 })
            );
            cube.add(wire);

            const orbitRadius = 38 + (i * 3.5);
            const orbitSpeed = (0.3 + (i * 0.15)) * (i % 2 === 0 ? 1 : -1);
            const orbitAngle = (i / numSatellites) * Math.PI * 2;
            const tilt = (i - numSatellites / 2) * 0.3;

            this.coreGroup.add(cube);
            this.satellites.push({
                mesh: cube,
                radius: orbitRadius,
                speed: orbitSpeed,
                angle: orbitAngle,
                tilt: tilt,
                rotSpeed: 0.02 + Math.random() * 0.03
            });
        }
    }

    createParticleField() {
        const particleCount = 1200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0x00f0ff);
        const color2 = new THREE.Color(0x9d4edd);
        const color3 = new THREE.Color(0xff007a);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 220;
            positions[i3 + 1] = (Math.random() - 0.5) * 220;
            positions[i3 + 2] = (Math.random() - 0.5) * 160;

            const choice = Math.random();
            let c = choice < 0.4 ? color1 : (choice < 0.8 ? color2 : color3);
            colors[i3] = c.r;
            colors[i3 + 1] = c.g;
            colors[i3 + 2] = c.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create rounded particle texture in memory
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);

        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 1.6,
            vertexColors: true,
            map: texture,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    onMouseMove(event) {
        this.mouse.targetX = (event.clientX - this.windowHalfX) * 0.0012;
        this.mouse.targetY = (event.clientY - this.windowHalfY) * 0.0012;
    }

    onTouchMove(event) {
        if (event.touches.length > 0) {
            this.mouse.targetX = (event.touches[0].clientX - this.windowHalfX) * 0.0012;
            this.mouse.targetY = (event.touches[0].clientY - this.windowHalfY) * 0.0012;
        }
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    triggerBoost() {
        this.boostSpeed = 4.5;
        this.targetBoost = 1;

        if (this.innerCrystal) {
            this.innerCrystal.scale.set(1.35, 1.35, 1.35);
        }
        if (this.wireCore) {
            this.wireCore.scale.set(1.4, 1.4, 1.4);
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const delta = this.clock.getDelta();
        const time = this.clock.getElapsedTime();

        // Smooth mouse damping (Lerp)
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // Boost recovery
        this.boostSpeed += (this.targetBoost - this.boostSpeed) * 0.04;

        if (this.innerCrystal) {
            this.innerCrystal.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
            this.innerCrystal.rotation.x += 0.004 * this.boostSpeed;
            this.innerCrystal.rotation.y += 0.008 * this.boostSpeed;
        }

        if (this.wireCore) {
            this.wireCore.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
            this.wireCore.rotation.x -= 0.006 * this.boostSpeed;
            this.wireCore.rotation.y -= 0.007 * this.boostSpeed;
        }

        if (this.outerTorus) {
            this.outerTorus.rotation.x += 0.009 * this.boostSpeed;
            this.outerTorus.rotation.y += 0.012 * this.boostSpeed;
        }

        // Gyro rings
        if (this.rings) {
            this.rings.forEach((r, idx) => {
                r.mesh.rotation.x += r.speedX * this.boostSpeed;
                r.mesh.rotation.y += r.speedY * this.boostSpeed;
            });
        }

        // Orbiting Satellites
        if (this.satellites) {
            this.satellites.forEach(sat => {
                sat.angle += sat.speed * 0.015 * this.boostSpeed;
                sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
                sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
                sat.mesh.position.y = Math.sin(sat.angle * 2) * 8 + sat.tilt * 10;
                sat.mesh.rotation.x += sat.rotSpeed;
                sat.mesh.rotation.y += sat.rotSpeed;
            });
        }

        // Particle field rotation and slow drift
        if (this.particles) {
            this.particles.rotation.y = time * 0.025;
            this.particles.rotation.x = time * 0.015;
        }

        // Dynamic light hovering
        if (this.cyanLight) {
            this.cyanLight.position.x = Math.sin(time * 0.8) * 45;
            this.cyanLight.position.y = Math.cos(time * 0.6) * 35;
        }
        if (this.pinkLight) {
            this.pinkLight.position.x = Math.cos(time * 0.7) * 45;
            this.pinkLight.position.y = Math.sin(time * 0.9) * 35;
        }

        // Parallax Core Rotation with Mouse
        if (this.coreGroup) {
            this.coreGroup.rotation.y = this.mouse.x * 1.5;
            this.coreGroup.rotation.x = this.mouse.y * 1.5;
            this.coreGroup.position.x = this.mouse.x * 18;
            this.coreGroup.position.y = 4 - this.mouse.y * 14;
        }

        // Gentle camera tilt
        this.camera.position.x = this.mouse.x * 10;
        this.camera.position.y = -this.mouse.y * 8;
        this.camera.lookAt(0, 2, 0);

        this.renderer.render(this.scene, this.camera);
    }
}

window.Cyber3DScene = Cyber3DScene;
