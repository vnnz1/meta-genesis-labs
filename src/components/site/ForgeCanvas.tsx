import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * A wireframe icosahedron forged from light — the hero centerpiece.
 * Reacts to pointer position, rotates gently, and dilates on scroll.
 */
function ForgeMesh() {
  const group = useRef<THREE.Group>(null);
  const wire = useRef<THREE.LineSegments>(null);
  const solid = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const sFactor = Math.min(scrollY / 800, 1);

    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      target.current.y * 0.35,
      0.04,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      target.current.x * 0.25,
      0.04,
    );

    const scale = 1 + sFactor * 0.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.015;
    group.current.scale.setScalar(scale);

    if (solid.current) {
      const mat = solid.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.06 + sFactor * 0.04;
    }
  });

  const radius = Math.min(viewport.width, viewport.height) * 0.32;

  return (
    <group ref={group}>
      {/* Solid inner core — almost invisible, gives depth */}
      <mesh ref={solid}>
        <icosahedronGeometry args={[radius * 0.85, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Outer wireframe */}
      <lineSegments ref={wire}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(radius, 2)]} />
        <lineBasicMaterial color="#f5f3ee" transparent opacity={0.55} />
      </lineSegments>

      {/* Inner counter-rotating wireframe */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
        <lineSegments rotation={[0.5, 0.3, 0]}>
          <edgesGeometry args={[new THREE.OctahedronGeometry(radius * 0.55, 0)]} />
          <lineBasicMaterial color="#9aa0a6" transparent opacity={0.5} />
        </lineSegments>
      </Float>

      {/* Vertex points */}
      <points>
        <icosahedronGeometry args={[radius * 1.02, 2]} />
        <pointsMaterial color="#ffffff" size={0.025} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
}

export function ForgeCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 2, 4]} intensity={0.8} />
      <directionalLight position={[-4, -2, -2]} intensity={0.3} color="#9aa0a6" />
      <ForgeMesh />
    </Canvas>
  );
}
