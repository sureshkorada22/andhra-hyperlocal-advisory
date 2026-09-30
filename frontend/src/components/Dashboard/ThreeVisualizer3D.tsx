import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CompetitorStats, CompetitorItem, LocationItem, Language, OpportunityFactor } from '../../types';
import { translations } from '../../i18n/translations';
import { RotateCw, Compass, Eye, Maximize2, Layers, Info, CheckCircle2 } from 'lucide-react';

interface ThreeVisualizer3DProps {
  language: Language;
  location: LocationItem;
  radiusKm: number;
  competitors: CompetitorStats;
  factors: OpportunityFactor[];
  opportunityScore: number;
  businessTitle: string;
}

interface HoveredItem {
  type: 'enterprise' | 'competitor' | 'factor';
  name: string;
  detail: string;
  distance?: number;
  score?: number;
  classification?: string;
  x: number;
  y: number;
}

export const ThreeVisualizer3D: React.FC<ThreeVisualizer3DProps> = ({
  language,
  location,
  radiusKm,
  competitors,
  factors,
  opportunityScore,
  businessTitle,
}) => {
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // View state
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeView, setActiveView] = useState<'isometric' | 'topdown' | 'pillars'>('isometric');
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);
  const [showCompetitorPins, setShowCompetitorPins] = useState(true);
  const [showFactorPillars, setShowFactorPillars] = useState(true);
  const [showCatchmentParticles, setShowCatchmentParticles] = useState(true);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const interactableObjects = useRef<THREE.Object3D[]>([]);
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  // Camera animation targets
  const targetCamPos = useRef(new THREE.Vector3(20, 22, 24));
  const targetLookAt = useRef(new THREE.Vector3(0, 3, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 3, 0));

  // Mouse orbit state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const sphericalCoords = useRef({ radius: 36, theta: Math.PI / 4, phi: Math.PI / 3 });

  // Camera presets
  const applyViewPreset = useCallback((view: 'isometric' | 'topdown' | 'pillars') => {
    setActiveView(view);
    if (view === 'isometric') {
      targetCamPos.current.set(20, 22, 24);
      targetLookAt.current.set(0, 2, 0);
      sphericalCoords.current = { radius: 36, theta: Math.PI / 4, phi: Math.PI / 3.2 };
    } else if (view === 'topdown') {
      targetCamPos.current.set(0, 38, 0.01);
      targetLookAt.current.set(0, 0, 0);
      sphericalCoords.current = { radius: 38, theta: 0, phi: 0.01 };
    } else if (view === 'pillars') {
      targetCamPos.current.set(-16, 15, 20);
      targetLookAt.current.set(-10, 4, 0);
      sphericalCoords.current = { radius: 28, theta: (5 * Math.PI) / 4, phi: Math.PI / 3.5 };
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 800;
    const height = Math.max(container.clientHeight, 480);

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060f17);
    scene.fog = new THREE.FogExp2(0x060f17, 0.012);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 300);
    camera.position.set(20, 22, 24);
    camera.lookAt(0, 3, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xa7f3d0, 1.4);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 1.8, 80);
    blueLight.position.set(-15, 18, -15);
    scene.add(blueLight);

    const centerGlow = new THREE.PointLight(0x10b981, 2.5, 40);
    centerGlow.position.set(0, 6, 0);
    scene.add(centerGlow);

    // 5. Ground Grid & Coordinate Disk
    const SCENE_RADIUS = 16; // visual unit radius representing radiusKm
    const gridHelper = new THREE.GridHelper(SCENE_RADIUS * 2.4, 28, 0x059669, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Ground circle disk
    const groundGeom = new THREE.CircleGeometry(SCENE_RADIUS * 1.15, 64);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x071521,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const groundMesh = new THREE.Mesh(groundGeom, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.1;
    scene.add(groundMesh);

    // Concentric Catchment Radius Rings
    const ringRadii = [0.33, 0.66, 1.0];
    ringRadii.forEach((factor, idx) => {
      const ringGeom = new THREE.RingGeometry(
        SCENE_RADIUS * factor - 0.07,
        SCENE_RADIUS * factor + 0.07,
        64
      );
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 2 ? 0x10b981 : 0x0284c7,
        transparent: true,
        opacity: idx === 2 ? 0.75 : 0.35,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.02;
      scene.add(ringMesh);
    });

    // 6. Central Enterprise Beacon (Proposed Location)
    const spireGroup = new THREE.Group();
    spireGroup.name = 'enterprise_beacon';

    // Base glowing platform
    const baseGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.3, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x047857,
      emissive: 0x065f46,
      roughness: 0.2,
      metalness: 0.8,
    });
    const baseMesh = new THREE.Mesh(baseGeom, baseMat);
    baseMesh.position.y = 0.15;
    spireGroup.add(baseMesh);

    // Vertical crystalline spire
    const spireGeom = new THREE.ConeGeometry(0.8, 5.5, 6);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9,
      roughness: 0.1,
    });
    const spireMesh = new THREE.Mesh(spireGeom, spireMat);
    spireMesh.position.y = 3.0;
    spireGroup.add(spireMesh);

    // Inverted tip crystal
    const tipGeom = new THREE.OctahedronGeometry(0.7, 0);
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0xa7f3d0,
      emissive: 0x10b981,
      emissiveIntensity: 0.9,
    });
    const tipMesh = new THREE.Mesh(tipGeom, tipMat);
    tipMesh.position.y = 6.2;
    spireGroup.add(tipMesh);

    // Pulsing radar ripple ring
    const rippleGeom = new THREE.RingGeometry(0.4, 0.6, 32);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const rippleMesh = new THREE.Mesh(rippleGeom, rippleMat);
    rippleMesh.rotation.x = -Math.PI / 2;
    rippleMesh.position.y = 0.05;
    spireGroup.add(rippleMesh);

    spireGroup.userData = {
      type: 'enterprise',
      name: businessTitle,
      detail: `${location.village_or_town || location.resolved_name.split(',')[0]} (${radiusKm} km radius)`,
      score: opportunityScore,
    };
    scene.add(spireGroup);
    interactableObjects.current.push(spireMesh, tipMesh);

    // 7. Catchment Flow Particles (Household / Customer Circulation)
    const particleCount = 450;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];
    const particleRadii: number[] = [];
    const particleAngles: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pRad = 2.0 + Math.random() * (SCENE_RADIUS * 0.95);
      const pAng = Math.random() * Math.PI * 2;
      const pHeight = 0.2 + Math.random() * 2.8;

      particlePositions[i * 3] = Math.cos(pAng) * pRad;
      particlePositions[i * 3 + 1] = pHeight;
      particlePositions[i * 3 + 2] = Math.sin(pAng) * pRad;

      particleRadii.push(pRad);
      particleAngles.push(pAng);
      particleSpeeds.push(0.003 + Math.random() * 0.007);
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.24,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    particleSystem.visible = showCatchmentParticles;
    scene.add(particleSystem);

    // 8. Competitor 3D Markers (Direct and Indirect)
    const competitorGroup = new THREE.Group();
    competitorGroup.name = 'competitors';

    const allCompetitors: CompetitorItem[] = [
      ...competitors.direct_competitors.map((c) => ({ ...c, classification: 'direct' as const })),
      ...competitors.indirect_competitors.map((c) => ({ ...c, classification: 'indirect' as const })),
    ];

    const centerLat = location.latitude;
    const centerLng = location.longitude;
    const latKm = 110.574;
    const lngKm = 111.32 * Math.cos((centerLat * Math.PI) / 180);

    allCompetitors.forEach((comp, idx) => {
      const dxKm = (comp.longitude - centerLng) * lngKm;
      const dzKm = -(comp.latitude - centerLat) * latKm;

      // Map to 3D scene units
      const sceneX = (dxKm / Math.max(radiusKm, 1)) * SCENE_RADIUS;
      const sceneZ = (dzKm / Math.max(radiusKm, 1)) * SCENE_RADIUS;

      // Clamp within visual bounds
      const distFromCenter = Math.sqrt(sceneX * sceneX + sceneZ * sceneZ);
      if (distFromCenter > SCENE_RADIUS * 1.1) return;

      const isDirect = comp.classification === 'direct';
      const pinColor = isDirect ? 0xf43f5e : 0xf59e0b;
      const pinEmissive = isDirect ? 0xbe123c : 0xb45309;

      const pinHolder = new THREE.Group();
      pinHolder.position.set(sceneX, 0, sceneZ);

      // Vertical laser line from ground to pin
      const pinHeight = isDirect ? 3.8 : 2.8;
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, pinHeight, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: pinColor,
        transparent: true,
        opacity: 0.6,
      });
      const pinLine = new THREE.Line(lineGeom, lineMat);
      pinHolder.add(pinLine);

      // Ground locator ring
      const groundRingGeom = new THREE.RingGeometry(0.3, 0.42, 24);
      const groundRingMat = new THREE.MeshBasicMaterial({
        color: pinColor,
        side: THREE.DoubleSide,
      });
      const groundRing = new THREE.Mesh(groundRingGeom, groundRingMat);
      groundRing.rotation.x = -Math.PI / 2;
      groundRing.position.y = 0.02;
      pinHolder.add(groundRing);

      // 3D Floating Pin Head (Pyramid for Direct, Diamond for Indirect)
      let headMesh: THREE.Mesh;
      if (isDirect) {
        const headGeom = new THREE.ConeGeometry(0.55, 1.2, 4);
        headGeom.rotateX(Math.PI); // inverted cone pointing down
        const headMat = new THREE.MeshStandardMaterial({
          color: pinColor,
          emissive: pinEmissive,
          emissiveIntensity: 0.8,
          metalness: 0.3,
          roughness: 0.2,
        });
        headMesh = new THREE.Mesh(headGeom, headMat);
        headMesh.position.y = pinHeight + 0.6;
      } else {
        const headGeom = new THREE.OctahedronGeometry(0.48, 0);
        const headMat = new THREE.MeshStandardMaterial({
          color: pinColor,
          emissive: pinEmissive,
          emissiveIntensity: 0.7,
        });
        headMesh = new THREE.Mesh(headGeom, headMat);
        headMesh.position.y = pinHeight + 0.5;
      }

      headMesh.userData = {
        type: 'competitor',
        name: comp.name || (isDirect ? t.directCompetitors : t.indirectCompetitors),
        classification: isDirect ? 'Direct Competitor' : 'Indirect Competitor',
        distance: comp.distance_km,
        detail: comp.address || comp.source,
      };

      pinHolder.add(headMesh);
      competitorGroup.add(pinHolder);
      interactableObjects.current.push(headMesh);
    });

    scene.add(competitorGroup);

    // 9. 3D Deterministic Factor Score Towers (Pillars)
    const factorGroup = new THREE.Group();
    factorGroup.name = 'factor_pillars';

    // Position the 6 pillars in an orderly arc along the western flank
    const pillarFactorList = factors.slice(0, 6);
    const arcRadius = SCENE_RADIUS * 1.12;
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 1.25;

    pillarFactorList.forEach((f, idx) => {
      const tProgress = idx / Math.max(pillarFactorList.length - 1, 1);
      const angle = startAngle + tProgress * (endAngle - startAngle);
      const px = Math.cos(angle) * arcRadius;
      const pz = Math.sin(angle) * arcRadius;

      const factorScore = Math.min(Math.max(f.score, 5), 100);
      const towerHeight = (factorScore / 100) * 8.5 + 0.5;

      // Color coding based on score
      let towerColor = 0x10b981; // emerald
      let towerEmissive = 0x059669;
      if (factorScore < 50) {
        towerColor = 0xf43f5e;
        towerEmissive = 0x9f1239;
      } else if (factorScore < 70) {
        towerColor = 0xf59e0b;
        towerEmissive = 0xb45309;
      }

      const towerHolder = new THREE.Group();
      towerHolder.position.set(px, 0, pz);

      // Tower geometry (Hexagonal column)
      const towerGeom = new THREE.CylinderGeometry(0.7, 0.7, towerHeight, 6);
      const towerMat = new THREE.MeshStandardMaterial({
        color: towerColor,
        emissive: towerEmissive,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.82,
        roughness: 0.2,
      });
      const towerMesh = new THREE.Mesh(towerGeom, towerMat);
      towerMesh.position.y = towerHeight / 2;

      // Top glowing indicator cap
      const capGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.15, 6);
      const capMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const capMesh = new THREE.Mesh(capGeom, capMat);
      capMesh.position.y = towerHeight + 0.08;

      towerMesh.userData = {
        type: 'factor',
        name: f.factor,
        score: f.score,
        detail: `Deterministic Weight: ${f.weight}%`,
      };

      towerHolder.add(towerMesh);
      towerHolder.add(capMesh);
      factorGroup.add(towerHolder);
      interactableObjects.current.push(towerMesh);
    });

    scene.add(factorGroup);

    // 10. Raycasting for Tooltips
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactableObjects.current, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.type) {
          setHoveredItem({
            type: hit.userData.type,
            name: hit.userData.name,
            detail: hit.userData.detail,
            distance: hit.userData.distance,
            score: hit.userData.score,
            classification: hit.userData.classification,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
          return;
        }
      }
      setHoveredItem(null);
    };

    canvas.addEventListener('mousemove', handlePointerMove);

    // 11. Mouse Drag to Orbit Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      sphericalCoords.current.theta -= deltaX * 0.008;
      sphericalCoords.current.phi = Math.max(
        0.05,
        Math.min(Math.PI / 2 - 0.05, sphericalCoords.current.phi + deltaY * 0.008)
      );

      const r = sphericalCoords.current.radius;
      targetCamPos.current.x = r * Math.sin(sphericalCoords.current.phi) * Math.sin(sphericalCoords.current.theta);
      targetCamPos.current.y = r * Math.cos(sphericalCoords.current.phi);
      targetCamPos.current.z = r * Math.sin(sphericalCoords.current.phi) * Math.cos(sphericalCoords.current.theta);

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.03;
      sphericalCoords.current.radius = Math.max(12, Math.min(65, sphericalCoords.current.radius + zoomDelta));
      const r = sphericalCoords.current.radius;
      targetCamPos.current.x = r * Math.sin(sphericalCoords.current.phi) * Math.sin(sphericalCoords.current.theta);
      targetCamPos.current.y = r * Math.cos(sphericalCoords.current.phi);
      targetCamPos.current.z = r * Math.sin(sphericalCoords.current.phi) * Math.cos(sphericalCoords.current.theta);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // 12. Touch Orbit Support for Mobile / Tablet
    let touchStartPos = { x: 0, y: 0 };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartPos.x;
        const deltaY = e.touches[0].clientY - touchStartPos.y;
        sphericalCoords.current.theta -= deltaX * 0.01;
        sphericalCoords.current.phi = Math.max(
          0.1,
          Math.min(Math.PI / 2 - 0.1, sphericalCoords.current.phi + deltaY * 0.01)
        );
        const r = sphericalCoords.current.radius;
        targetCamPos.current.x = r * Math.sin(sphericalCoords.current.phi) * Math.sin(sphericalCoords.current.theta);
        targetCamPos.current.y = r * Math.cos(sphericalCoords.current.phi);
        targetCamPos.current.z = r * Math.sin(sphericalCoords.current.phi) * Math.cos(sphericalCoords.current.theta);
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 13. Window / Container Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = Math.max(entry.contentRect.height, 480);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 14. Main Animation Loop
    let clock = new THREE.Clock();
    let rippleScale = 1.0;

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera movement towards target
      camera.position.lerp(targetCamPos.current, 0.08);
      currentLookAt.current.lerp(targetLookAt.current, 0.08);
      camera.lookAt(currentLookAt.current);

      // Auto rotation
      if (autoRotateRef.current && !isDragging.current) {
        sphericalCoords.current.theta += delta * 0.18;
        const r = sphericalCoords.current.radius;
        targetCamPos.current.x = r * Math.sin(sphericalCoords.current.phi) * Math.sin(sphericalCoords.current.theta);
        targetCamPos.current.z = r * Math.sin(sphericalCoords.current.phi) * Math.cos(sphericalCoords.current.theta);
      }

      // Pulse ripple on central enterprise
      rippleScale += delta * 1.4;
      if (rippleScale > 4.5) rippleScale = 1.0;
      rippleMesh.scale.set(rippleScale, rippleScale, 1);
      (rippleMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - rippleScale / 4.5);

      // Central crystal rotation
      tipMesh.rotation.y += delta * 1.2;
      tipMesh.rotation.x = Math.sin(elapsedTime * 2) * 0.15;

      // Competitor pins slight hovering / breathing
      competitorGroup.children.forEach((holder, idx) => {
        const head = holder.children[2];
        if (head) {
          head.rotation.y += delta * (0.8 + (idx % 3) * 0.3);
          head.position.y += Math.sin(elapsedTime * 2.5 + idx) * 0.003;
        }
      });

      // Animate catchment particles flow
      const posAttr = particleGeom.attributes.position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += particleSpeeds[i];
        positions[i * 3] = Math.cos(particleAngles[i]) * particleRadii[i];
        positions[i * 3 + 2] = Math.sin(particleAngles[i]) * particleRadii[i];
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 15. Cleanup on Unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);

      // Dispose 3D resources
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [
    businessTitle,
    location,
    radiusKm,
    competitors,
    factors,
    opportunityScore,
    t.directCompetitors,
    t.indirectCompetitors,
  ]);

  return (
    <div className="card-dark card-3d overflow-hidden relative shadow-2xl border border-emerald-500/30 rounded-3xl">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/40 shadow-inner">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                {t.vis3DTitle || '3D Catchment & Digital Twin'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-2xs font-extrabold bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 uppercase tracking-wider">
                WebGL 3D
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {t.vis3DSubtitle || 'Interactive 3D environment with Enterprise Spire, Competitor Pins, and Score Towers'}
            </p>
          </div>
        </div>

        {/* View Controls & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Presets */}
          <div className="inline-flex rounded-xl bg-slate-900/90 p-1 border border-slate-700/80 shadow-inner">
            <button
              onClick={() => applyViewPreset('isometric')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'isometric'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.viewIsometric || '3D Isometric'}
            </button>
            <button
              onClick={() => applyViewPreset('topdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'topdown'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.viewTopDown || '2D Radar'}
            </button>
            <button
              onClick={() => applyViewPreset('pillars')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'pillars'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.viewPillars || 'Score Towers'}
            </button>
          </div>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              autoRotate
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-xs'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle Auto Orbit Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{t.btnAutoRotate || 'Auto-Rotate'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div ref={containerRef} className="relative w-full h-[480px] sm:h-[540px] bg-slate-950 cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Floating Tooltip when hovering 3D elements */}
        {hoveredItem && (
          <div
            className="absolute z-30 pointer-events-none p-3 rounded-xl bg-slate-900/95 border border-emerald-400/60 shadow-2xl backdrop-blur-md text-white min-w-[200px] max-w-[280px] animate-in fade-in zoom-in-95 duration-150"
            style={{
              left: Math.min(hoveredItem.x + 15, (containerRef.current?.clientWidth || 600) - 220),
              top: Math.max(hoveredItem.y - 80, 20),
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span
                className={`text-2xs uppercase tracking-widest font-black px-2 py-0.5 rounded-full ${
                  hoveredItem.type === 'enterprise'
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                    : hoveredItem.classification?.includes('Direct')
                    ? 'bg-rose-500/30 text-rose-300 border border-rose-400/40'
                    : hoveredItem.type === 'factor'
                    ? 'bg-teal-500/30 text-teal-300 border border-teal-400/40'
                    : 'bg-amber-500/30 text-amber-300 border border-amber-400/40'
                }`}
              >
                {hoveredItem.type === 'enterprise'
                  ? 'Proposed Business'
                  : hoveredItem.classification || hoveredItem.type}
              </span>
              {hoveredItem.score !== undefined && (
                <span className="text-xs font-mono font-black text-emerald-400">
                  {hoveredItem.score.toFixed(0)}/100
                </span>
              )}
            </div>

            <div className="text-sm font-black text-white tracking-tight">{hoveredItem.name}</div>

            {hoveredItem.distance !== undefined && (
              <div className="text-xs font-semibold text-emerald-300 mt-0.5">
                Distance: {hoveredItem.distance} km
              </div>
            )}

            <div className="text-xs text-slate-300 font-medium mt-1 leading-snug">
              {hoveredItem.detail}
            </div>
          </div>
        )}

        {/* Orbit Hint Watermark */}
        <div className="absolute bottom-3 left-4 pointer-events-none z-10 text-2xs sm:text-xs text-slate-400 font-semibold bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/60 backdrop-blur-xs flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{t.dragToOrbit || 'Drag to rotate in 3D • Scroll to zoom'}</span>
        </div>

        {/* Live 3D Legend Pill */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex flex-col gap-1.5 bg-slate-900/90 p-3 rounded-2xl border border-slate-700/70 backdrop-blur-md shadow-xl text-2xs font-semibold text-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-emerald-400 shadow-sm shadow-emerald-400"></span>
            <span>{t.legendEnterprise || 'Enterprise Spire (Center)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-rose-500 shadow-sm shadow-rose-500"></span>
            <span>{t.layerDirect} ({competitors.direct_count})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-amber-500 shadow-sm shadow-amber-500"></span>
            <span>{t.layerIndirect} ({competitors.indirect_count})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-sky-400 shadow-sm shadow-sky-400"></span>
            <span>{t.legendCustomerFlow || 'Catchment Customer Flow'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-emerald-600 border border-emerald-300"></span>
            <span>{t.legendPillars || '3D Factor Score Towers'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
