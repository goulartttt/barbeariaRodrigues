"use client";

import { useEffect, useMemo, useRef } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { disposeObject, makeCrossedBlades } from "./models";
import { pointer, trackPointer } from "./pointer";
import { StudioLights } from "./StudioLights";

function Blades() {
  const group = useRef(null);
  const blades = useMemo(() => makeCrossedBlades(), []);

  useEffect(() => () => disposeObject(blades), [blades]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    // Giro lento e pesado; o mouse só inclina um pouco.
    g.rotation.y += (Math.sin(t * 0.35) * 0.45 + pointer.x * 0.3 - g.rotation.y) * 0.06;
    g.rotation.x += (-0.12 + pointer.y * 0.15 - g.rotation.x) * 0.06;
    g.position.y = 0.1 + Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={group} position={[0.4, 0.1, 0]} scale={0.74}>
      <primitive object={blades} />
    </group>
  );
}

/** Cena do hero: navalha e tesoura cruzadas. `active` pausa o desenho fora da tela. */
export default function BladesCanvas({ active = true, onReady, onSlow }) {
  useEffect(() => trackPointer(), []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12], fov: 28 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(() => onReady?.())}
      aria-hidden="true"
    >
      {/* Se o aparelho não sustentar a animação, volta para a imagem estática. */}
      <PerformanceMonitor onFallback={() => onSlow?.()} flipflops={3} />
      <StudioLights />
      <Blades />
    </Canvas>
  );
}
