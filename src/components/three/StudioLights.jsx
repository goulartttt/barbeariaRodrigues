import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Luz de estúdio gerada na hora (sem baixar mapas HDR): reflexos quentes no metal. */
export function StudioLights({ environmentIntensity = 0.75 }) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = environmentIntensity;
    return () => {
      scene.environment = null;
      target.dispose();
      room.dispose?.();
      pmrem.dispose();
    };
  }, [gl, scene, environmentIntensity]);

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[-5, 5, 6]} intensity={2.6} color="#fff0dc" />
      <directionalLight position={[6, 1, -5]} intensity={4.5} color="#d4b07a" />
      <directionalLight position={[0, -6, 2]} intensity={0.6} color="#8fa3c9" />
    </>
  );
}
