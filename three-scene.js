// Architectural Kinetic Sculpture in Loft Gallery Style (Three.js)
// Warm bronze, brushed titanium, slate textures, and ambient gallery lighting

class LoftGalleryScene {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        // 3D Objects
        this.sculptureGroup = null;
        this.innerPolyhedron = null;
        this.wireframeCage = null;
        this.gimbalRings = [];
        this.monoliths = [];
        this.dustParticles = null;

        // Mouse Parallax
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.clock = new THREE.Clock();
        this.boostSpeed = 1;
        this.targetBoost = 1;

        this.init();
        this.animate();
    }

    init() {
        // Scene with subtle deep graphite fog
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0e0f13, 0.002);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 82;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.05;
        this.container.appendChild(this.renderer.domElement);

        // Gallery Lighting Setup (Warm architectural studio lights)
        const ambientLight = new THREE.AmbientLight(0x181920, 3.0);
        this.scene.add(ambientLight);

        // Key Light: Warm Champagne / Bronze Spotlight
        this.keyLight = new THREE.DirectionalLight(0xe0b589, 2.5);
        this.keyLight.position.set(40, 50, 45);
        this.scene.add(this.keyLight);

        // Secondary Soft Slate Light
        this.fillLight = new THREE.PointLight(0xa5b4cb, 1.8, 140);
        this.fillLight.position.set(-35, -30, 30);
        this.scene.add(this.fillLight);

        // Accent Warm Rim Light
        this.rimLight = new THREE.PointLight(0xc89666, 2.8, 120);
        this.rimLight.position.set(0, -40, -15);
        this.scene.add(this.rimLight);

        // Central Sculpture Group
        this.sculptureGroup = new THREE.Group();
        this.sculptureGroup.position.set(0, 3, 0);
        this.scene.add(this.sculptureGroup);

        this.createPolyhedronCore();
        this.createGimbalRings();
        this.createFloatingMonoliths();
        this.createGalleryDust();

        // Window Events
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    }

    createPolyhedronCore() {
        // Faceted Dodecahedron in brushed bronze & matte slate
        const coreGeo = new THREE.DodecahedronGeometry(13.5, 0);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x1f2026,
            roughness: 0.35,
            metalness: 0.85,
            flatShading: true
        });
        this.innerPolyhedron = new THREE.Mesh(coreGeo, coreMat);
        this.sculptureGroup.add(this.innerPolyhedron);

        // Architectural Fine Wireframe Cage in warm gold/bronze
        const wireGeo = new THREE.IcosahedronGeometry(16.5, 1);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xc89666,
            wireframe: true,
            transparent: true,
            opacity: 0.32
        });
        this.wireframeCage = new THREE.Mesh(wireGeo, wireMat);
        this.sculptureGroup.add(this.wireframeCage);
    }

    createGimbalRings() {
        // 3 Elegant Minimalist Kinetic Rings (Brushed brass / titanium tourbillon)
        const ringConfigs = [
            { radius: 25, tube: 0.28, color: 0xe0b589, rotX: Math.PI / 4, rotY: 0, speed: 0.004 },
            { radius: 29, tube: 0.24, color: 0x8b9bb4, rotX: -Math.PI / 3, rotY: Math.PI / 6, speed: -0.005 },
            { radius: 33, tube: 0.22, color: 0xc89666, rotX: Math.PI / 2, rotY: Math.PI / 3, speed: 0.0035 }
        ];

        ringConfigs.forEach(cfg => {
            const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 120);
            const mat = new THREE.MeshStandardMaterial({
                color: cfg.color,
                metalness: 0.9,
                roughness: 0.25
            });
            const ring = new THREE.Mesh(geo, mat);
            ring.rotation.x = cfg.rotX;
            ring.rotation.y = cfg.rotY;
            this.sculptureGroup.add(ring);
            this.gimbalRings.push({ mesh: ring, speed: cfg.speed });
        });
    }

    createFloatingMonoliths() {
        // Floating architectural minimalist monoliths orbiting
        const count = 5;
        for (let i = 0; i < count; i++) {
            const geo = new THREE.BoxGeometry(2.2, 4.4, 1.8);
            const mat = new THREE.MeshStandardMaterial({
                color: 0x242630,
                roughness: 0.4,
                metalness: 0.8
            });
            const monolith = new THREE.Mesh(geo, mat);

            // Subtle bronze border outline
            const wire = new THREE.Mesh(
                geo,
                new THREE.MeshBasicMaterial({ color: 0xe0b589, wireframe: true, transparent: true, opacity: 0.4 })
            );
            monolith.add(wire);

            const radius = 37 + i * 4;
            const angle = (i / count) * Math.PI * 2;
            const speed = (0.2 + i * 0.1) * (i % 2 === 0 ? 1 : -1);

            this.sculptureGroup.add(monolith);
            this.monoliths.push({
                mesh: monolith,
                radius: radius,
                angle: angle,
                speed: speed,
                rotSpeed: 0.015 + Math.random() * 0.01
            });
        }
    }

    createGalleryDust() {
        // Subtle floating champagne particles (ambient loft atmosphere)
        const count = 700;
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const gold = new THREE.Color(0xe0b589);
        const slate = new THREE.Color(0x8892b0);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 140;

            const c = Math.random() > 0.5 ? gold : slate;
            colors[i3] = c.r;
            colors[i3 + 1] = c.g;
            colors[i3 + 2] = c.b;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({
            size: 1.4,
            vertexColors: true,
            transparent: true,
            opacity: 0.55,
            depthWrite: false
        });

        this.dustParticles = new THREE.Points(geo, mat);
        this.scene.add(this.dustParticles);
    }

    onMouseMove(event) {
        this.mouse.targetX = (event.clientX - this.windowHalfX) * 0.0009;
        this.mouse.targetY = (event.clientY - this.windowHalfY) * 0.0009;
    }

    onTouchMove(event) {
        if (event.touches.length > 0) {
            this.mouse.targetX = (event.touches[0].clientX - this.windowHalfX) * 0.0009;
            this.mouse.targetY = (event.touches[0].clientY - this.windowHalfY) * 0.0009;
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
        this.boostSpeed = 3.5;
        this.targetBoost = 1;
        if (this.innerPolyhedron) {
            this.innerPolyhedron.scale.set(1.18, 1.18, 1.18);
        }
        if (this.wireframeCage) {
            this.wireframeCage.scale.set(1.22, 1.22, 1.22);
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = this.clock.getElapsedTime();

        // Smooth Mouse Damping
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;

        this.boostSpeed += (this.targetBoost - this.boostSpeed) * 0.04;

        if (this.innerPolyhedron) {
            this.innerPolyhedron.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
            this.innerPolyhedron.rotation.x += 0.003 * this.boostSpeed;
            this.innerPolyhedron.rotation.y += 0.005 * this.boostSpeed;
        }

        if (this.wireframeCage) {
            this.wireframeCage.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
            this.wireframeCage.rotation.x -= 0.004 * this.boostSpeed;
            this.wireframeCage.rotation.y -= 0.006 * this.boostSpeed;
        }

        // Gimbal Rings
        this.gimbalRings.forEach(r => {
            r.mesh.rotation.x += r.speed * this.boostSpeed;
            r.mesh.rotation.y += (r.speed * 0.8) * this.boostSpeed;
        });

        // Floating Monoliths
        this.monoliths.forEach((m, idx) => {
            m.angle += m.speed * 0.01 * this.boostSpeed;
            m.mesh.position.x = Math.cos(m.angle) * m.radius;
            m.mesh.position.z = Math.sin(m.angle) * m.radius;
            m.mesh.position.y = Math.sin(time * 0.8 + idx) * 5;
            m.mesh.rotation.x += m.rotSpeed;
            m.mesh.rotation.y += m.rotSpeed;
        });

        // Gallery Dust
        if (this.dustParticles) {
            this.dustParticles.rotation.y = time * 0.015;
            this.dustParticles.rotation.x = time * 0.008;
        }

        // Parallax Movement
        if (this.sculptureGroup) {
            this.sculptureGroup.rotation.y = this.mouse.x * 1.1;
            this.sculptureGroup.rotation.x = this.mouse.y * 1.1;
            this.sculptureGroup.position.x = this.mouse.x * 14;
            this.sculptureGroup.position.y = 3 - this.mouse.y * 10;
        }

        this.camera.position.x = this.mouse.x * 8;
        this.camera.position.y = -this.mouse.y * 6;
        this.camera.lookAt(0, 2, 0);

        this.renderer.render(this.scene, this.camera);
    }
}

window.LoftGalleryScene = LoftGalleryScene;
