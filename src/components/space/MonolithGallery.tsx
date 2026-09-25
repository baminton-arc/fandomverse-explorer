import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Html, Sparkles } from "@react-three/drei";
import { useNavigate } from "@tanstack/react-router";
import { categories, type Category } from "@/data/categories";
import animeImg from "@/assets/monolith/anime.jpg";
import gamingImg from "@/assets/monolith/gaming.jpg";
import moviesImg from "@/assets/monolith/movies.jpg";
import tvImg from "@/assets/monolith/tv-shows.jpg";
import kpopImg from "@/assets/monolith/k-pop.jpg";
import comicsImg from "@/assets/monolith/comics.jpg";
import mangaImg from "@/assets/monolith/manga.jpg";

const panelImages: Record<string, string> = {
  anime: animeImg,
  gaming: gamingImg,
  movies: moviesImg,
  "tv-shows": tvImg,
  "k-pop": kpopImg,
  comics: comicsImg,
  manga: mangaImg,
};

const SPACING = 4.2;
const W = 2.6;
const H = 5.6;
const TOTAL = categories.length * SPACING;

/* ---------- Genre picture shown inside each monolith ---------- */
function useLiveTexture(cat: Category) {
  const [tex] = React.useState(() => {
    const url = panelImages[cat.slug];
    const t = new THREE.Texture();
    t.colorSpace = THREE.SRGBColorSpace;
    if (url) {
      const img = new Image();
      img.onload = () => {
        t.image = img;
        // cover-fit into the tall panel
        const panel = (W - 0.12) / (H - 0.12);
        const ratio = img.width / img.height;
        if (ratio > panel) {
          t.repeat.set(panel / ratio, 1);
          t.offset.set((1 - panel / ratio) / 2, 0);
        } else {
          t.repeat.set(1, ratio / panel);
          t.offset.set(0, (1 - ratio / panel) / 2);
        }
        t.needsUpdate = true;
      };
      img.src = url;
    }
    return t;
  });
  return tex;
}

/* ---------- Monolith ---------- */
function Monolith({
  cat,
  index,
  scroll,
  selected,
  onPick,
}: {
  cat: Category;
  index: number;
  scroll: React.MutableRefObject<number>;
  selected: number | null;
  onPick: (i: number, pos: THREE.Vector3) => void;
}) {
  const group = React.useRef<THREE.Group>(null);
  const glass = React.useRef<THREE.MeshPhysicalMaterial>(null);
  const screen = React.useRef<THREE.MeshBasicMaterial>(null);
  const [hover, setHover] = React.useState(false);
  const tex = useLiveTexture(cat);

  useFrame((s, d) => {
    const g = group.current;
    if (!g) return;
    let x = index * SPACING - scroll.current;
    x = ((((x + TOTAL / 2) % TOTAL) + TOTAL) % TOTAL) - TOTAL / 2;
    g.position.x = x;
    g.position.z = -Math.abs(x) * 0.35;
    g.rotation.y = -x * 0.08;
    g.position.y = Math.sin(s.clock.elapsedTime * 0.8 + index) * 0.15;
    const target = hover ? 1.05 : 1;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, target, 8, d));
    if (selected === index && screen.current) {
      screen.current.opacity = Math.max(0, screen.current.opacity - d * 1.4);
      if (glass.current) glass.current.opacity = Math.max(0, glass.current.opacity - d * 1.4);
    }
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (selected === null && group.current) onPick(index, group.current.getWorldPosition(new THREE.Vector3()));
      }}
    >
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[W - 0.12, H - 0.12]} />
        <meshBasicMaterial ref={screen} map={tex} color="#b8b3c8" transparent opacity={0.6} toneMapped={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[W, H, 0.18]} />
        <meshPhysicalMaterial
          ref={glass}
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          color={cat.color}
          emissive={cat.color}
          emissiveIntensity={hover ? 0.35 : 0.12}
        />
      </mesh>
      <mesh position={[0, -H / 2 - 0.35, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color={cat.color} transparent opacity={hover ? 0.35 : 0.15} />
      </mesh>
      <Html center position={[0, -H / 2 - 0.8, 0.2]} distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className="font-display text-sm font-bold tracking-[0.3em] whitespace-nowrap text-foreground uppercase">{cat.name}</div>
      </Html>
    </group>
  );
}

/* ---------- Shatter particles ---------- */
function Shards({ origin, color }: { origin: THREE.Vector3; color: string }) {
  const N = 900;
  const ref = React.useRef<THREE.Points>(null);
  const [data] = React.useState(() => {
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = origin.x + (Math.random() - 0.5) * W;
      pos[i * 3 + 1] = origin.y + (Math.random() - 0.5) * H;
      pos[i * 3 + 2] = origin.z;
      vel[i * 3] = (Math.random() - 0.5) * 6;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 6;
      vel[i * 3 + 2] = 2 + Math.random() * 8;
    }
    return { pos, vel };
  });
  useFrame((_, raw) => {
    const d = Math.min(raw, 0.05);
    const p = ref.current;
    if (!p) return;
    const a = p.geometry.attributes['position'] as THREE.BufferAttribute;
    for (let i = 0; i < N * 3; i++) data.pos[i]! += data.vel[i]! * d;
    a.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.07} transparent opacity={0.95} blending={THREE.AdditiveBlending} toneMapped={false} />
    </points>
  );
}

/* ---------- Camera + input ---------- */
function Rig({
  scroll,
  velocity,
  flyTo,
}: {
  scroll: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
  flyTo: THREE.Vector3 | null;
}) {
  const { camera, pointer } = useThree();
  useFrame((_, raw) => {
    const d = Math.min(raw, 0.05);
    if (flyTo) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, flyTo.x, 3, d);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, flyTo.y, 3, d);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, flyTo.z - 3, 1.8, d);
      camera.lookAt(flyTo.x, flyTo.y, flyTo.z - 10);
      return;
    }
    scroll.current += velocity.current * d;
    velocity.current *= Math.exp(-3 * d);
    if (Math.abs(velocity.current) < 0.05) {
      // gentle idle drift + snap
      const snap = Math.round(scroll.current / SPACING) * SPACING;
      scroll.current = THREE.MathUtils.damp(scroll.current, snap, 2, d);
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 3, d);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.3 + pointer.y * 0.4, 3, d);
    camera.lookAt(0, 0, -2);
  });
  return null;
}

export default function MonolithGallery({ onTransition }: { onTransition?: (color: string | null) => void }) {
  const navigate = useNavigate();
  const scroll = React.useRef(0);
  const velocity = React.useRef(0);
  const drag = React.useRef<{ x: number; moved: number } | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [flyTo, setFlyTo] = React.useState<THREE.Vector3 | null>(null);

  const pick = (i: number, pos: THREE.Vector3) => {
    if (drag.current && drag.current.moved > 6) return;
    const cat = categories[i]!;
    setSelected(i);
    setFlyTo(pos.clone());
    setTimeout(() => onTransition?.(cat.color), 750);
    setTimeout(() => {
      navigate({ to: "/category/$slug", params: { slug: cat.slug } });
      onTransition?.(null);
    }, 1350);
  };

  React.useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") velocity.current += 8;
      if (e.key === "ArrowLeft") velocity.current -= 8;
    };
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div
      className="h-full w-full touch-pan-y select-none"
      onWheel={(e) => (velocity.current += (e.deltaY + e.deltaX) * 0.02)}
      onPointerDown={(e) => (drag.current = { x: e.clientX, moved: 0 })}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.x;
        drag.current.x = e.clientX;
        drag.current.moved += Math.abs(dx);
        scroll.current -= dx * 0.012;
        velocity.current = -dx * 0.6;
      }}
      onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
      onPointerLeave={() => (drag.current = null)}
    >
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.3, 9], fov: 50 }}>
        <color attach="background" args={["#07060f"]} />
        <fog attach="fog" args={["#07060f", 10, 24]} />
        <ambientLight intensity={0.6} />
        <Environment resolution={64}>
          <Lightformer intensity={2} position={[0, 5, 5]} scale={[10, 10, 1]} />
          <Lightformer intensity={1} color="#a98bff" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        </Environment>
        <Sparkles count={120} scale={[24, 10, 10]} size={2} speed={0.3} color="#bba8ff" />
        <mesh position={[0, -3.6, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[80, 40]} />
          <meshStandardMaterial color="#0d0b1c" roughness={0.3} metalness={0.6} />
        </mesh>
        {categories.map((c, i) => (
          <Monolith key={c.slug} cat={c} index={i} scroll={scroll} selected={selected} onPick={pick} />
        ))}
        {selected !== null && flyTo && <Shards origin={flyTo} color={categories[selected]!.color} />}
        <Rig scroll={scroll} velocity={velocity} flyTo={flyTo} />
      </Canvas>
    </div>
  );
}
