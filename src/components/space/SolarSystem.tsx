import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, Stars, Html } from "@react-three/drei";
import { useNavigate } from "@tanstack/react-router";
import { categories, type Category } from "@/data/categories";

function Sun({ onSelect }: { onSelect: () => void }) {
  const core = React.useRef<THREE.Mesh>(null);
  const halo = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (core.current) core.current.rotation.y += delta * 0.12;
    if (halo.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.035;
      halo.current.scale.setScalar(s);
    }
  });

  return (
    <group onClick={onSelect}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.5, 6]} />
        <meshStandardMaterial
          color="#f5d97a"
          emissive="#ffb347"
          emissiveIntensity={2.2}
          roughness={0.35}
        />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial color="#ff9f43" transparent opacity={0.13} side={THREE.BackSide} />
      </mesh>
      <pointLight intensity={180} distance={60} decay={2} color="#ffd08a" />
      <Html center distanceFactor={14} position={[0, -2.6, 0]}>
        <div className="pointer-events-none font-display text-[13px] font-bold tracking-[0.35em] whitespace-nowrap text-star uppercase">
          FandomVerse
        </div>
      </Html>
    </group>
  );
}

function OrbitRing({ radius, tilt }: { radius: number; tilt: number }) {
  return (
    <mesh rotation={[-Math.PI / 2 + tilt, 0, 0]}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 128]} />
      <meshBasicMaterial color="#8b7fd4" transparent opacity={0.18} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Planet({
  category,
  index,
  hovered,
  setHovered,
  onSelect,
}: {
  category: Category;
  index: number;
  hovered: string | null;
  setHovered: (slug: string | null) => void;
  onSelect: (slug: string) => void;
}) {
  const pivot = React.useRef<THREE.Group>(null);
  const body = React.useRef<THREE.Mesh>(null);
  const isHot = hovered === category.slug;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (pivot.current) pivot.current.rotation.y += dt * category.speed;
    if (body.current) {
      body.current.rotation.y += dt * 0.5;
      const target = isHot ? 1.35 : 1;
      const k = 1 - Math.exp(-8 * dt);
      body.current.scale.lerp(new THREE.Vector3(target, target, target), k);
    }
    void state;
  });

  return (
    <group rotation={[category.tilt, (index / categories.length) * Math.PI * 2, 0]}>
      <group ref={pivot}>
        <group position={[category.orbit, 0, 0]}>
          <mesh
            ref={body}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(category.slug);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHovered(null);
              document.body.style.cursor = "auto";
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(category.slug);
            }}
          >
            <icosahedronGeometry args={[category.size, 4]} />
            <meshStandardMaterial
              color={category.color}
              emissive={category.color}
              emissiveIntensity={isHot ? 0.9 : 0.35}
              roughness={0.45}
              metalness={0.25}
              flatShading
            />
          </mesh>

          <mesh scale={1.22}>
            <sphereGeometry args={[category.size, 24, 24]} />
            <meshBasicMaterial
              color={category.color}
              transparent
              opacity={isHot ? 0.22 : 0.1}
              side={THREE.BackSide}
            />
          </mesh>

          {category.ring && (
            <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
              <ringGeometry args={[category.size * 1.5, category.size * 2.1, 64]} />
              <meshBasicMaterial
                color={category.color}
                transparent
                opacity={0.45}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}

          <Html center distanceFactor={16} position={[0, category.size + 0.75, 0]}>
            <div
              className="pointer-events-none rounded-full border px-3 py-1 text-[12px] font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                borderColor: category.color,
                color: category.color,
                backgroundColor: "rgba(10,10,25,0.72)",
                opacity: isHot ? 1 : 0.55,
                transform: `scale(${isHot ? 1.08 : 0.92})`,
              }}
            >
              {category.name}
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

function SceneRig({ zoomTarget }: { zoomTarget: number }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const dir = camera.position.clone().normalize();
    const current = camera.position.length();
    const next = current + (zoomTarget - current) * (1 - Math.exp(-3 * dt));
    camera.position.copy(dir.multiplyScalar(next));
  });
  return null;
}

function Scene({ onSelect }: { onSelect: (slug: string) => void }) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <>
      <color attach="background" args={["#0a0a18"]} />
      <fog attach="fog" args={["#0a0a18", 26, 46]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 12, 6]} intensity={0.7} />
      <Environment>
        <Lightformer intensity={1.6} position={[0, 8, 0]} scale={[14, 14, 1]} color="#b6a8ff" />
        <Lightformer
          intensity={0.9}
          color="#5ad0ff"
          position={[-10, 1, -2]}
          rotation-y={Math.PI / 2}
          scale={[24, 2, 1]}
        />
      </Environment>
      <Stars radius={90} depth={50} count={2600} factor={4} saturation={0} fade speed={0.6} />
      <Sun onSelect={() => onSelect("anime")} />
      {categories.map((c, i) => (
        <React.Fragment key={c.slug}>
          <OrbitRing radius={c.orbit} tilt={c.tilt} />
          <Planet
            category={c}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            onSelect={onSelect}
          />
        </React.Fragment>
      ))}
    </>
  );
}

export default function SolarSystem() {
  const navigate = useNavigate();
  const [zoom, setZoom] = React.useState(24);

  const handleSelect = (slug: string) => {
    setZoom(11);
    window.setTimeout(() => {
      void navigate({ to: "/category/$slug", params: { slug } });
    }, 550);
  };

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 9, 22], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <React.Suspense fallback={null}>
        <Scene onSelect={handleSelect} />
      </React.Suspense>
      <SceneRig zoomTarget={zoom} />
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={9}
        maxDistance={34}
        maxPolarAngle={Math.PI / 1.85}
        minPolarAngle={0.25}
        autoRotate
        autoRotateSpeed={0.35}
        onChange={(e) => {
          const cam = e?.target?.object as THREE.Camera | undefined;
          if (cam) setZoom(cam.position.length());
        }}
      />
    </Canvas>
  );
}
