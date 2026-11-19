import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/*
 * Future scene: an abstract lattice — a wireframe icosphere with nodes and
 * signal arcs that breathe — for "What comes next?". Rendering pauses when
 * off-screen; geometry disposed on unmount.
 */

function Lattice({ radius = 2.4 }) {
  const group = useRef(null);
  const arcsMat = useRef(null);

  const { latticeGeo, nodeGeo, arcGeo } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(radius, 1);
    const latticeGeo = new THREE.WireframeGeometry(ico);
    ico.dispose();

    const nodeSrc = new THREE.IcosahedronGeometry(radius, 2);
    const nodeGeo = nodeSrc.clone();
    nodeSrc.dispose();

    // Signal arcs between random vertices, lifted outward.
    const verts = [];
    const pos = nodeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      verts.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }
    const segments = [];
    const SAMPLES = 22;
    const arcCount = 26;
    for (let a = 0; a < arcCount; a++) {
      const from = verts[Math.floor(Math.random() * verts.length)];
      const to = verts[Math.floor(Math.random() * verts.length)];
      if (from === to) continue;
      const mid = from
        .clone()
        .add(to)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(radius * (1.25 + Math.random() * 0.5));
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      const pts = curve.getPoints(SAMPLES);
      for (let i = 0; i < pts.length - 1; i++) {
        segments.push(pts[i], pts[i + 1]);
      }
    }
    const arcGeo = new THREE.BufferGeometry();
    const arcPositions = new Float32Array(segments.length * 3);
    segments.forEach((v, i) => {
      arcPositions[i * 3] = v.x;
      arcPositions[i * 3 + 1] = v.y;
      arcPositions[i * 3 + 2] = v.z;
    });
    arcGeo.setAttribute("position", new THREE.BufferAttribute(arcPositions, 3));

    return { latticeGeo, nodeGeo, arcGeo };
  }, [radius]);

  useEffect(() => {
    return () => {
      latticeGeo.dispose();
      nodeGeo.dispose();
      arcGeo.dispose();
    };
  }, [latticeGeo, nodeGeo, arcGeo]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x +=
        (-state.pointer.y * 0.12 - group.current.rotation.x) * 0.02;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.025;
      group.current.scale.setScalar(s);
    }
    if (arcsMat.current) {
      arcsMat.current.opacity = 0.32 + Math.sin(state.clock.elapsedTime * 0.9) * 0.18;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={latticeGeo}>
        <lineBasicMaterial
          color="#f5f5f0"
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </lineSegments>
      <points geometry={nodeGeo}>
        <pointsMaterial
          size={0.045}
          color="#f5f5f0"
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={arcGeo}>
        <lineBasicMaterial
          ref={arcsMat}
          color="#d8ff3e"
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function Ambient({ count = 260 }) {
  const ref = useRef(null);
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.02}
        color="#a1a1aa"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function FutureScene({ active = true }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.6], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Lattice />
      <Ambient />
      <AdaptiveDpr />
    </Canvas>
  );
}
