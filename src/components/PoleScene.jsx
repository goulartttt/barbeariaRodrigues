"use client";

import dynamic from "next/dynamic";
import { SceneStage } from "./SceneStage";

const PoleCanvas = dynamic(() => import("./three/PoleCanvas"), { ssr: false });

export function PoleScene({ className }) {
  return (
    <SceneStage
      Scene={PoleCanvas}
      poster="/images/3d/poste.png"
      className={className}
      sizes="(min-width: 64rem) 30vw, 60vw"
    />
  );
}
