import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/*
 * Hero scene: a slowly rotating constellation of nodes and faint links —
 * the museum's "network in the dark". Rendering pauses when off-screen and
 * all GPU resources are disposed on unmount.
 */

function NetworkField({ count = 1600, radius = 3.1 }) {
  const parallax = useRef(null);
  const spin = useRef(null);

  const { pointGeo, lineGeo } = useMemo(() => {
    const pts = [];
    const positions = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const p = new THREE.Vector3(
        Math.cos(theta) * r,
        y,
        Math.sin(theta) * r
      ).multiplyScalar(radius * (0.82 + Math.random() * 0.36));
      pts.push(p);
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    const colors = new Float32Array(count * 3);
    const cWhite = new THREE.Color("#f5f5f0");
    const cAccent = new THREE.Color("#d8ff3e");
    const cDim = new THREE.Color("#8b8b93");
    for (let i = 0; i < count; i++) {
      const c =
        Math.random() < 0.07 ? cAccent : Math.random() < 0.45 ? cWhite : cDim;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Connect close neighbours with faint line segments (capped).
    const segments = [];
    const thresholdSq = (radius * 0.34) ** 2;
    const maxSegments = 2100;
    outer: for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceToSquared(pts[j]) < thresholdSq) {
          segments.push(pts[i], pts[j]);
          if (segments.length > maxSegments * 2) break outer;
        }
      }
    }
    const linePositions = new Float32Array(segments.length * 3);
    segments.forEach((v, i) => {
      linePositions[i * 3] = v.x;
      linePositions[i * 3 + 1] = v.y;
      linePositions[i * 3 + 2] = v.z;
    });

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    return { pointGeo, lineGeo };
  }, [count, radius]);

  useEffect(() => {
    return () => {
      pointGeo.dispose();
      lineGeo.dispose();
    };
  }, [pointGeo, lineGeo]);

  useFrame((state, delta) => {
    if (spin.current) {
      spin.current.rotation.y += delta * 0.045;
      spin.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
    }
    if (parallax.current) {
      parallax.current.rotation.y +=
        (state.pointer.x * 0.22 - parallax.current.rotation.y) * 0.03;
      parallax.current.rotation.x +=
        (-state.pointer.y * 0.14 - parallax.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={parallax}>
      <group ref={spin}>
        <points geometry={pointGeo}>
          <pointsMaterial
            size={0.032}
            vertexColors
            transparent
            opacity={0.9}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial
            color="#f5f5f0"
            transparent
            opacity={0.075}
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </group>
  );
}

export default function HeroScene({ active = true }) {
  const count =
    typeof window !== "undefined" && window.innerWidth < 768 ? 850 : 1600;

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7.4], fov: 48 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <NetworkField count={count} />
      <AdaptiveDpr />
    </Canvas>
  );
}
