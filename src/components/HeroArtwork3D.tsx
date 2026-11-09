import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, Eye, RotateCw, Play, Pause } from 'lucide-react';

interface HeroArtwork3DProps {
  onExploreClick?: () => void;
}

export const HeroArtwork3D: React.FC<HeroArtwork3DProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const emblemGroupRef = useRef<THREE.Group | null>(null);
  const planetRef = useRef<THREE.Mesh | null>(null);
  const planetAtmosphereRef = useRef<THREE.Mesh | null>(null);
  const platformRef = useRef<THREE.Group | null>(null);
  const ringsRef = useRef<THREE.Group[]>([]);
  const trailParticlesRef = useRef<{ mesh: THREE.Points; count: number; angles: Float32Array; speeds: Float32Array; radii: Float32Array; tilts: { x: number; y: number } }[]>([]);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulaeRef = useRef<THREE.Points | null>(null);
  
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 650;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 2. STUDIO LIGHTING RIG
    const keyLight = new THREE.DirectionalLight(0x00f0ff, 4.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7928ca, 3.0);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 5.0);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0x00f0ff, 3.5, 6);
    bottomGlow.position.set(0, -1.2, 0.5);
    scene.add(bottomGlow);

    const ambientLight = new THREE.AmbientLight(0x06112a, 1.8);
    scene.add(ambientLight);

    // 3. BACKGROUND STARS & NEBULAE PARTICLES
    const starCount = 450;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 20;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    starsRef.current = stars;

    // Nebula dust particles
    const nebulaCount = 120;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    for (let i = 0; i < nebulaCount; i++) {
      nebulaPositions[i * 3] = (Math.random() - 0.5) * 12;
      nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      nebulaPositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    const nebulaGeo = new THREE.BufferGeometry();
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    const nebulaMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.16,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const nebulae = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulae);
    nebulaeRef.current = nebulae;

    // 4. GLOWING BLUE PLANETARY SPHERE BEHIND EMBLEM
    const planetGroup = new THREE.Group();
    planetGroup.position.set(0, 0.35, -2.6);
    scene.add(planetGroup);

    const planetGeo = new THREE.SphereGeometry(1.95, 48, 48);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x06285a,
      roughness: 0.45,
      metalness: 0.3,
      emissive: 0x003377,
      emissiveIntensity: 0.55,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planet);
    planetRef.current = planet;

    // Atmospheric Glowing Rim Haze
    const atmosphereGeo = new THREE.SphereGeometry(2.1, 48, 48);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.26,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    planetGroup.add(atmosphere);
    planetAtmosphereRef.current = atmosphere;

    // 5. 3D METALLIC AETHERTECH EMBLEM (TRIANGULAR A)
    const emblemGroup = new THREE.Group();
    emblemGroup.position.set(0, 0.12, 0);
    scene.add(emblemGroup);
    emblemGroupRef.current = emblemGroup;

    // Outer triangular frame
    const outerShape = new THREE.Shape();
    const topY = 1.48;
    const bottomY = -0.88;
    const halfWidth = 1.28;

    outerShape.moveTo(0, topY);
    outerShape.lineTo(halfWidth, bottomY);
    outerShape.lineTo(-halfWidth, bottomY);
    outerShape.closePath();

    // Triangular cutout
    const holePath = new THREE.Path();
    holePath.moveTo(0, topY - 0.72);
    holePath.lineTo(-halfWidth + 0.52, bottomY + 0.46);
    holePath.lineTo(halfWidth - 0.52, bottomY + 0.46);
    holePath.closePath();
    outerShape.holes.push(holePath);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.1,
    };

    const emblemGeometry = new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
    emblemGeometry.center();

    // Metallic chrome/titanium PBR material
    const metallicChromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9e6f7,
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.98,
    });
    const emblemMesh = new THREE.Mesh(emblemGeometry, metallicChromeMat);
    emblemGroup.add(emblemMesh);

    // Inner Glowing Cyan Beveled Core
    const innerShape = new THREE.Shape();
    innerShape.moveTo(0, topY - 0.16);
    innerShape.lineTo(halfWidth - 0.16, bottomY + 0.14);
    innerShape.lineTo(-halfWidth + 0.16, bottomY + 0.14);
    innerShape.closePath();

    const innerHole = new THREE.Path();
    innerHole.moveTo(0, topY - 0.56);
    innerHole.lineTo(-halfWidth + 0.38, bottomY + 0.38);
    innerHole.lineTo(halfWidth - 0.38, bottomY + 0.38);
    innerHole.closePath();
    innerShape.holes.push(innerHole);

    const innerGeo = new THREE.ExtrudeGeometry(innerShape, {
      depth: 0.36,
      bevelEnabled: false,
    });
    innerGeo.center();

    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    emblemGroup.add(innerMesh);

    // Crossbar for letter A
    const barGeo = new THREE.BoxGeometry(0.88, 0.18, 0.36);
    const barMat = new THREE.MeshPhysicalMaterial({
      color: 0xb0c4de,
      metalness: 0.92,
      roughness: 0.15,
      emissive: 0x0070f3,
      emissiveIntensity: 0.35,
    });
    const barMesh = new THREE.Mesh(barGeo, barMat);
    barMesh.position.set(0, -0.16, 0);
    emblemGroup.add(barMesh);

    // 6. MULTIPLE LUMINOUS ORBITAL RINGS & PARTICLE TRAILS
    const ringConfigs = [
      { radius: 2.15, tube: 0.024, color: 0x00f0ff, tiltX: Math.PI / 3.2, tiltY: Math.PI / 5.5, speed: 0.42 },
      { radius: 2.45, tube: 0.02, color: 0x38bdf8, tiltX: -Math.PI / 4, tiltY: -Math.PI / 4.5, speed: -0.3 },
      { radius: 1.88, tube: 0.016, color: 0x818cf8, tiltX: Math.PI / 2.2, tiltY: -Math.PI / 6, speed: 0.22 },
    ];

    const ringsList: THREE.Group[] = [];
    const trailList: { mesh: THREE.Points; count: number; angles: Float32Array; speeds: Float32Array; radii: Float32Array; tilts: { x: number; y: number } }[] = [];

    ringConfigs.forEach((cfg) => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.x = cfg.tiltX;
      ringGroup.rotation.y = cfg.tiltY;
      scene.add(ringGroup);
      ringsList.push(ringGroup);

      // Torus ring tube
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.88,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringGroup.add(ringMesh);

      // Luminous energy node travelling on the ring
      const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(cfg.radius, 0, 0);
      ringGroup.add(nodeMesh);

      // Particle Trail around the orbital ring
      const trailCount = 50;
      const trailPositions = new Float32Array(trailCount * 3);
      const trailAngles = new Float32Array(trailCount);
      const trailSpeeds = new Float32Array(trailCount);
      const trailRadii = new Float32Array(trailCount);

      for (let i = 0; i < trailCount; i++) {
        trailAngles[i] = (i / trailCount) * Math.PI * 2;
        trailSpeeds[i] = cfg.speed * (0.8 + Math.random() * 0.4);
        trailRadii[i] = cfg.radius + (Math.random() - 0.5) * 0.08;
      }

      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      const trailMat = new THREE.PointsMaterial({
        color: cfg.color,
        size: 0.06,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const trailPoints = new THREE.Points(trailGeo, trailMat);
      ringGroup.add(trailPoints);

      trailList.push({
        mesh: trailPoints,
        count: trailCount,
        angles: trailAngles,
        speeds: trailSpeeds,
        radii: trailRadii,
        tilts: { x: cfg.tiltX, y: cfg.tiltY },
      });
    });

    ringsRef.current = ringsList;
    trailParticlesRef.current = trailList;

    // 7. FUTURISTIC CIRCULAR PLATFORM
    const platformGroup = new THREE.Group();
    platformGroup.position.set(0, -1.6, 0);
    scene.add(platformGroup);
    platformRef.current = platformGroup;

    // Main dark metallic platform base
    const baseGeo = new THREE.CylinderGeometry(2.4, 2.65, 0.24, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x081328,
      roughness: 0.32,
      metalness: 0.9,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    platformGroup.add(baseMesh);

    // Glowing Neon Rings on Platform Surface
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
    });
    const neonRing1 = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.26, 64), ringMat);
    neonRing1.rotation.x = -Math.PI / 2;
    neonRing1.position.y = 0.125;
    platformGroup.add(neonRing1);

    const neonRing2 = new THREE.Mesh(new THREE.RingGeometry(1.9, 1.96, 64), ringMat);
    neonRing2.rotation.x = -Math.PI / 2;
    neonRing2.position.y = 0.125;
    platformGroup.add(neonRing2);

    // Pointer Move Handler for Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 700;
      const h = container.clientHeight || 650;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Three.js Clock
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth pointer damping
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      if (isPlaying) {
        // Floating bob and mouse tilt for 3D A emblem
        if (emblemGroupRef.current) {
          emblemGroupRef.current.position.y = 0.12 + Math.sin(elapsed * 1.6) * 0.09;
          emblemGroupRef.current.rotation.y = Math.sin(elapsed * 0.5) * 0.18 + mousePos.current.x * 0.45;
          emblemGroupRef.current.rotation.x = Math.cos(elapsed * 0.6) * 0.07 - mousePos.current.y * 0.3;
        }

        // Orbital rings rotation
        ringsRef.current.forEach((ring, idx) => {
          const speed = ringConfigs[idx]?.speed || 0.3;
          ring.rotation.z += delta * speed;
        });

        // Update trail particles along orbital trajectories
        trailParticlesRef.current.forEach((trail) => {
          const posAttr = trail.mesh.geometry.attributes.position as THREE.BufferAttribute;
          const posArr = posAttr.array as Float32Array;

          for (let i = 0; i < trail.count; i++) {
            trail.angles[i] += delta * trail.speeds[i];
            const angle = trail.angles[i];
            const r = trail.radii[i];
            posArr[i * 3] = Math.cos(angle) * r;
            posArr[i * 3 + 1] = Math.sin(angle) * r;
            posArr[i * 3 + 2] = (Math.sin(angle * 2) * 0.05);
          }
          posAttr.needsUpdate = true;
        });

        // Planet spin & atmosphere pulsing
        if (planetRef.current) {
          planetRef.current.rotation.y += delta * 0.035;
        }
        if (planetAtmosphereRef.current) {
          const scale = 1 + Math.sin(elapsed * 2) * 0.015;
          planetAtmosphereRef.current.scale.set(scale, scale, scale);
        }

        // Platform subtle spin
        if (platformRef.current) {
          platformRef.current.rotation.y += delta * 0.06;
        }

        // Stars drift
        if (starsRef.current) {
          starsRef.current.rotation.y = elapsed * 0.012 + mousePos.current.x * 0.04;
        }
        if (nebulaeRef.current) {
          nebulaeRef.current.rotation.y = elapsed * 0.018 - mousePos.current.x * 0.02;
        }
      }

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isPlaying]);

  return (
    <div
      className="relative w-full h-[520px] lg:h-[660px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial atmosphere seamlessly blending into hero home */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
        <img
          src="/src/assets/images/hero_emblem_artwork_1793976872205.jpg"
          alt="AetherTech 3D Futuristic Space Artwork"
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000 ease-out"
          style={{
            transform: isHovered ? 'scale(1.06)' : 'scale(1.01)',
            filter: 'brightness(1.08) contrast(1.15)',
          }}
          referrerPolicy="no-referrer"
        />
        {/* Soft radial overlay blending directly into deep space navy #030714 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030714] via-transparent to-[#030714]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030714] via-transparent to-[#030714]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#030714]/40 to-[#030714]" />
      </div>

      {/* Live Three.js WebGL Interactive Canvas Mount */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.4))',
        }}
      />

      {/* Optional controls remain available to keyboard and pointer users. */}
      <div className="absolute bottom-4 right-4 z-20 hidden items-center gap-2 rounded-full border border-cyan-500/35 bg-[#050e24]/90 px-3.5 py-1.5 text-xs text-slate-300 shadow-lg shadow-cyan-950/50 backdrop-blur-md sm:flex">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
          title={isPlaying ? 'Pause 3D rotation' : 'Resume 3D rotation'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
          <span>{isPlaying ? 'Live 3D Active' : 'Paused'}</span>
        </button>

        <span className="text-slate-600">|</span>

        <button
          onClick={() => {
            if (emblemGroupRef.current) {
              emblemGroupRef.current.rotation.set(0, 0, 0);
            }
          }}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
          title="Reset 3D camera angle"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Spec Marker */}
      <div className="absolute top-4 left-4 z-20 hidden items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-950/80 px-3.5 py-1.5 font-mono text-[11px] text-cyan-300/90 backdrop-blur-md xl:flex">
        <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span>AETHERTECH // PROCEDURAL 3D EMBLEM & ORBITAL MESH</span>
      </div>
    </div>
  );
};
