"use client";

import dynamic from "next/dynamic";
import { SceneStage } from "./SceneStage";

const BladesCanvas = dynamic(() => import("./three/BladesCanvas"), { ssr: false });

export function HeroScene({ className }) {
  return (
    <SceneStage
      Scene={BladesCanvas}
      poster="/images/3d/navalha-tesoura.png"
      className={className}
      sizes="(min-width: 64rem) 60vw, 100vw"
      priority
    />
  );
}
