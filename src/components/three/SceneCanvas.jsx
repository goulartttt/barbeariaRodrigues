"use client";

import { useEffect, useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { trackPointer } from "./pointer";

/** Resolução máxima do desenho, em relação aos pixels da tela. */
const MAX_DPR = 1.5;

/**
 * Canvas comum às cenas. A resolução acompanha o fôlego do aparelho: cai quando
 * o FPS cai e volta a subir quando melhora, sem nunca desligar a cena.
 * `active` pausa o desenho fora da tela.
 */
export function SceneCanvas({ active = true, onReady, camera, children }) {
  const [maxDpr, setMaxDpr] = useState(MAX_DPR);

  useEffect(() => trackPointer(), []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, maxDpr]}
      camera={camera}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(() => onReady?.())}
      aria-hidden="true"
    >
      <PerformanceMonitor
        flipflops={Infinity}
        onChange={({ factor }) => setMaxDpr(Math.round((1 + (MAX_DPR - 1) * factor) * 10) / 10)}
      />
      {children}
    </Canvas>
  );
}
