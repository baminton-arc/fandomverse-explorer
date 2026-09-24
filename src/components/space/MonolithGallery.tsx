import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Text, Sparkles } from "@react-three/drei";
import { useNavigate } from "@tanstack/react-router";
import { categories, type Category } from "@/data/categories";

const SPACING = 4.2;
const W = 2.6;
const H = 5.6;
const TOTAL = categories.length * SPACING;

/* ---------- Live category "window" scenes drawn on a canvas ---------- */
type Painter = (g: CanvasRenderingContext2D, t: number, c: string) => void;
const CW = 256;
const CH = 552;

const painters: Record<string, Painter> = {
  anime: (g, t, c) => {
    const sky = g.createLinearGradient(0, 0, 0, CH);
    sky.addColorStop(0, "#ffb3c7");
    sky.addColorStop(0.6, "#ff7a9c");
    sky.addColorStop(1, "#3b1d4a");
    g.fillStyle = sky;
    g.fillRect(0, 0, CW, CH);
    g.fillStyle = "#fff4d6";
    g.beginPath();
    g.arc(170, 170, 50, 0, Math.PI * 2);
    g.fill();
    for (let layer = 0; layer < 3; layer++) {
      g.fillStyle = ["#6b3a6e", "#4a2552", "#2a1433"][layer];
      const off = (t * (10 + layer * 18)) % 60;
      for (let x = -60; x < CW + 60; x += 30) {
        const h = 120 + ((x * 37 + layer * 91) % 110) + layer * 60;
        g.fillRect(x - off, CH - h, 26, h);
        g.strokeStyle = "#1a0a1f";
        g.lineWidth = 3;
        g.strokeRect(x - off, CH - h, 26, h);
      }
    }
    g.fillStyle = "rgba(255,255,255,0.8)";
    for (let i = 0; i < 25; i++) {
      const x = (i * 53 + t * 20) % CW;
      const y = (i * 97 + t * 40) % CH;
      g.fillRect(x, y, 3, 3);
    }
  },
  gaming: (g, t, c) => {
    g.fillStyle = "#070b1a";
    g.fillRect(0, 0, CW, CH);
    g.strokeStyle = c;
    g.lineWidth = 2;
    const hor = CH * 0.45;
    for (let i = 0; i < 14; i++) {
      const y = hor + Math.pow(((i + (t * 2) % 1) / 14), 2) * (CH - hor);
      g.globalAlpha = 0.3 + (y - hor) / (CH - hor);
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(CW, y);
      g.stroke();
    }
    for (let i = -8; i <= 8; i++) {
      g.beginPath();
      g.moveTo(CW / 2 + i * 8, hor);
      g.lineTo(CW / 2 + i * 60, CH);
      g.stroke();
    }
    g.globalAlpha = 1;
    for (let i = 0; i < 6; i++) {
      const y = 80 + i * 45 + Math.sin(t * 2 + i) * 10;
      const x = ((i * 70 + t * 60) % (CW + 40)) - 20;
      g.fillStyle = i % 2 ? c : "#9ef";
      g.fillRect(x, y, 14, 14);
    }
  },
  movies: (g, t) => {
    g.fillStyle = "#0b0906";
    g.fillRect(0, 0, CW, CH);
    const beam = g.createRadialGradient(CW / 2, 0, 10, CW / 2, 0, CH);
    beam.addColorStop(0, "rgba(255,220,150,0.9)");
    beam.addColorStop(1, "rgba(255,200,120,0)");
    g.fillStyle = beam;
    g.beginPath();
    const sw = Math.sin(t * 0.8) * 60;
    g.moveTo(CW / 2 - 10, 0);
    g.lineTo(CW / 2 - 110 + sw, CH);
    g.lineTo(CW / 2 + 110 + sw, CH);
    g.lineTo(CW / 2 + 10, 0);
    g.fill();
    g.fillStyle = "#1c1611";
    const off = (t * 120) % 40;
    for (const x of [0, CW - 26]) {
      g.fillRect(x, 0, 26, CH);
      g.fillStyle = "#e8d8b0";
      for (let y = -40; y < CH; y += 40) g.fillRect(x + 7, y + off, 12, 18);
      g.fillStyle = "#1c1611";
    }
  },
  "tv-shows": (g, t, c) => {
    g.fillStyle = "#101418";
    g.fillRect(0, 0, CW, CH);
    const img = g.getImageData(0, 0, CW, CH);
    for (let i = 0; i < img.data.length; i += 16) {
      const v = Math.random() * 90;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    const bars = ["#e0e0e0", "#e8e24a", "#4ae0e0", "#4ae04a", "#e04ae0", "#e04a4a", "#4a4ae0"];
    bars.forEach((b, i) => {
      g.fillStyle = b;
      g.globalAlpha = 0.75;
      g.fillRect((i * CW) / 7, CH * 0.3, CW / 7 + 1, CH * 0.3);
    });
    g.globalAlpha = 0.25;
    g.fillStyle = c;
    g.fillRect(0, ((t * 160) % (CH + 60)) - 60, CW, 50);
    g.globalAlpha = 1;
  },
  "k-pop": (g, t, c) => {
    g.fillStyle = "#12051c";
    g.fillRect(0, 0, CW, CH);
    g.globalCompositeOperation = "lighter";
    const cols = [c, "#5ad1ff", "#ffd35a", "#ff5ad8"];
    for (let i = 0; i < 4; i++) {
      const a = Math.sin(t * 1.3 + i * 1.7) * 0.6;
      const x0 = 30 + i * 65;
      const gr = g.createLinearGradient(x0, 0, x0 + Math.sin(a) * 300, CH);
      gr.addColorStop(0, cols[i]);
      gr.addColorStop(1, "transparent");
      g.fillStyle = gr;
      g.globalAlpha = 0.55;
      g.beginPath();
      g.moveTo(x0 - 6, 0);
      g.lineTo(x0 + Math.sin(a) * 300 - 60, CH);
      g.lineTo(x0 + Math.sin(a) * 300 + 60, CH);
      g.lineTo(x0 + 6, 0);
      g.fill();
    }
    g.globalCompositeOperation = "source-over";
    g.globalAlpha = 1;
    g.fillStyle = "#050108";
    for (let x = 0; x < CW; x += 14) {
      const h = 30 + Math.abs(Math.sin(x * 0.3 + t * 3)) * 25;
      g.beginPath();
      g.arc(x + 7, CH - h + 12, 9, 0, Math.PI * 2);
      g.fill();
      g.fillRect(x + 1, CH - h + 18, 12, h);
    }
  },
  comics: (g, t, c) => {
    g.fillStyle = "#fff6d8";
    g.fillRect(0, 0, CW, CH);
    const step = 14;
    for (let y = 0; y < CH; y += step)
      for (let x = 0; x < CW; x += step) {
        const d = Math.sin(x * 0.03 + t * 1.5) * Math.cos(y * 0.02 - t) * 0.5 + 0.5;
        g.fillStyle = (x + y) % 28 === 0 ? c : "#1a1a1a";
        g.beginPath();
        g.arc(x, y, d * 6, 0, Math.PI * 2);
        g.fill();
      }
    g.fillStyle = "#ffe14a";
    g.strokeStyle = "#111";
    g.lineWidth = 5;
    const s = 1 + Math.sin(t * 4) * 0.08;
    g.save();
    g.translate(CW / 2, CH / 2);
    g.scale(s, s);
    g.beginPath();
    for (let i = 0; i < 20; i++) {
      const r = i % 2 ? 50 : 95;
      const a = (i / 20) * Math.PI * 2;
      g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    g.closePath();
    g.fill();
    g.stroke();
    g.fillStyle = "#e0232e";
    g.font = "bold 44px sans-serif";
    g.textAlign = "center";
    g.fillText("POW!", 0, 16);
    g.restore();
  },
  manga: (g, t) => {
    g.fillStyle = "#f4f1ea";
    g.fillRect(0, 0, CW, CH);
    g.strokeStyle = "#111";
    const cx = CW / 2;
    const cy = CH / 2;
    for (let i = 0; i < 90; i++) {
      const a = (i / 90) * Math.PI * 2 + t * 0.2;
      const r0 = 40 + ((i * 13 + t * 200) % 60);
      g.lineWidth = (i % 3) + 0.5;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      g.lineTo(cx + Math.cos(a) * 400, cy + Math.sin(a) * 400);
      g.stroke();
    }
    g.lineWidth = 6;
    g.strokeRect(10, 10, CW - 20, CH - 20);
    g.beginPath();
    g.moveTo(10, CH * 0.62);
    g.lineTo(CW - 10, CH * 0.55);
    g.stroke();
  },
};

function useLiveTexture(cat: Category) {
  const [tex] = React.useState(() => {
    const cvs = document.createElement("canvas");
    cvs.width = CW;
    cvs.height = CH;
    const t = new THREE.CanvasTexture(cvs);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
  const acc = React.useRef(0);
  useFrame((s, d) => {
    acc.current += d;
    if (acc.current < 1 / 24) return; // ~24fps is plenty for a window
    acc.current = 0;
    const g = (tex.image as HTMLCanvasElement).getContext("2d")!;
    painters[cat.slug]?.(g, s.clock.elapsedTime, cat.color);
    tex.needsUpdate = true;
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
        <meshBasicMaterial ref={screen} map={tex} transparent toneMapped={false} />
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
      <Text position={[0, -H / 2 - 0.8, 0.2]} fontSize={0.34} letterSpacing={0.18} color="#f2efff" anchorX="center">
        {cat.name.toUpperCase()}
      </Text>
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
    const a = p.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < N * 3; i++) data.pos[i] += data.vel[i] * d;
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
    const cat = categories[i];
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
        {selected !== null && flyTo && <Shards origin={flyTo} color={categories[selected].color} />}
        <Rig scroll={scroll} velocity={velocity} flyTo={flyTo} />
      </Canvas>
    </div>
  );
}
