"use client";

import { useEffect, useMemo, useRef } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { disposeObject, makeBarberPole } from "./models";
import { pointer, trackPointer } from "./pointer";
import { StudioLights } from "./StudioLights";

function Pole() {
  const group = useRef(null);
  const { pole, stripes } = useMemo(() => makeBarberPole(), []);

  useEffect(() => () => disposeObject(pole), [pole]);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    // As listras sobem sem parar, como num poste de verdade.
    stripes.offset.y -= Math.min(delta, 0.05) * 0.16;
    g.rotation.y += (pointer.x * 0.5 - g.rotation.y) * 0.05;
    g.rotation.x += (pointer.y * 0.12 - g.rotation.x) * 0.05;
    g.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.06;
  });

  return (
    <group ref={group} rotation-z={-0.07}>
      <primitive object={pole} />
    </group>
  );
}

/** Poste de barbeiro girando, ao lado da tabela de preços. */
export default function PoleCanvas({ active = true, onReady, onSlow }) {
  useEffect(() => trackPointer(), []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 11], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(() => onReady?.())}
      aria-hidden="true"
    >
      <PerformanceMonitor onFallback={() => onSlow?.()} flipflops={3} />
      <StudioLights environmentIntensity={0.55} />
      <Pole />
    </Canvas>
  );
}
