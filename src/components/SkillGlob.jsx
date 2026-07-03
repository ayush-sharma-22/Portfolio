import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// ─── Skill data with devicon CDN URLs ───────────────────────────────────────
// Falls back to a styled letter badge if the image fails to load
const skillData = [
  { name: 'Java',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',                     color: '#f97316', bg: '#fff3ec' },
  { name: 'Spring',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',                  color: '#4ade80', bg: '#ecfdf5' },
  { name: 'Kafka',       icon: null,                                                                                             color: '#22d3ee', bg: '#ecfeff', letter: 'K' },
  { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',                  color: '#22d3ee', bg: '#ecfeff' },
  { name: 'MySQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',                    color: '#f59e0b', bg: '#fefce8' },
  { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',                    color: '#22d3ee', bg: '#ecfeff' },
  { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',                color: '#4ade80', bg: '#ecfdf5' },
  { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',                       color: '#f97316', bg: '#fff3ec' },
  { name: 'GitHub',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',                 color: '#e6edf3', bg: '#1a1a2e' },
  { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',         color: '#f59e0b', bg: '#fefce8' },
  { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',                  color: '#4ade80', bg: '#ecfdf5' },
  { name: 'Postman',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',                color: '#f97316', bg: '#fff3ec' },
  { name: 'AWS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', color: '#f59e0b', bg: '#fefce8' },
  { name: 'Linux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',                   color: '#f59e0b', bg: '#fefce8' },
  { name: 'Hibernate',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg',           color: '#f97316', bg: '#fff3ec' },
  { name: 'Redis',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',                   color: '#f87171', bg: '#fff1f2' },
];

// ─── Fibonacci sphere distribution ──────────────────────────────────────────
function fibonacciSphere(n, radius) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    return new THREE.Vector3(r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius);
  });
}

// ─── Wireframe icosahedron shell ─────────────────────────────────────────────
function WireframeSphere() {
  const ref = useRef();
  // Pulse the glow over time
  useFrame(({ clock }) => {
    if (ref.current?.material) {
      ref.current.material.opacity = 0.12 + Math.sin(clock.elapsedTime * 0.8) * 0.04;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[3.4, 2]} />
      <meshBasicMaterial
        color="#f97316"
        wireframe
        transparent
        opacity={0.14}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Single icon billboard ───────────────────────────────────────────────────
function SkillIcon({ skill, position, groupRef }) {
  const htmlRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const posVec = useMemo(() => position.clone(), [position]);

  useFrame(() => {
    if (!htmlRef.current || !groupRef.current) return;
    // Compute world-space position after group rotation
    const world = posVec.clone().applyMatrix4(groupRef.current.matrixWorld);
    // Camera is at z ≈ 9 → world.z in [-3.5, 3.5] range
    const t = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(world.z, -3.6, 3.6, 0, 1), 0, 1);
    htmlRef.current.style.opacity = THREE.MathUtils.lerp(0.15, 1, t);
    const s = THREE.MathUtils.lerp(0.65, 1, t);
    htmlRef.current.style.transform = `scale(${s})`;
    htmlRef.current.style.pointerEvents = world.z > -1 ? 'auto' : 'none';
  });

  return (
    <Html position={[position.x, position.y, position.z]} center zIndexRange={[0, 10]}>
      <div
        ref={htmlRef}
        className="flex flex-col items-center gap-1 select-none"
        style={{ willChange: 'opacity, transform', transition: 'none' }}
        title={skill.name}
      >
        {/* Icon container */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg border border-white/10"
          style={{ background: skill.bg }}
        >
          {skill.icon && !imgError ? (
            <img
              src={skill.icon}
              alt={skill.name}
              width={44}
              height={44}
              onError={() => setImgError(true)}
              draggable={false}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <span
              className="text-sm font-bold"
              style={{ color: skill.color, fontFamily: 'JetBrains Mono, monospace' }}
            >
              {skill.letter || skill.name.slice(0, 2)}
            </span>
          )}
        </div>
        {/* Label */}
        <span
          className="text-[9px] font-medium whitespace-nowrap"
          style={{
            color: '#8b949e',
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          {skill.name}
        </span>
      </div>
    </Html>
  );
}

// ─── Main scene ──────────────────────────────────────────────────────────────
function GlobScene({ autoRotate, setAutoRotate }) {
  const groupRef = useRef();
  const idleTimer = useRef(null);
  const RADIUS = 3.4;

  const positions = useMemo(() => fibonacciSphere(skillData.length, RADIUS), []);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  const handleStart = () => {
    setAutoRotate(false);
    clearTimeout(idleTimer.current);
  };
  const handleEnd = () => {
    idleTimer.current = setTimeout(() => setAutoRotate(true), 2000);
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]}  intensity={1.2} color="#f97316" />
      <pointLight position={[-8, -4, -8]} intensity={0.6} color="#22d3ee" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        onStart={handleStart}
        onEnd={handleEnd}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.85}
      />

      <group ref={groupRef}>
        <WireframeSphere />
        {skillData.map((skill, i) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            position={positions[i]}
            groupRef={groupRef}
          />
        ))}
      </group>
    </>
  );
}

// ─── Static fallback ─────────────────────────────────────────────────────────
function GlobFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-56 h-56">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-orange/20 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full bg-gradient-radial from-accent-orange/15 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold gradient-text text-display">Skills</span>
        </div>
      </div>
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function SkillGlob({ autoRotate, setAutoRotate }) {
  return (
    <div
      className="w-full h-full"
      role="img"
      aria-label="Interactive 3D skill globe — drag to rotate, showing Java, Spring Boot, Kafka, Docker and more"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <GlobScene autoRotate={autoRotate} setAutoRotate={setAutoRotate} />
        </Suspense>
      </Canvas>
    </div>
  );
}
