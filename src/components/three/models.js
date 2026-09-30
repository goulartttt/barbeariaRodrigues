import * as THREE from "three";

/*
 * Objetos 3D feitos só com geometria (sem arquivos de modelo para baixar).
 * A navalha e a tesoura repetem o símbolo do logo da fachada.
 */

const BRONZE = 0xb8925a;

export const makeBronze = () =>
  new THREE.MeshStandardMaterial({ color: BRONZE, metalness: 1, roughness: 0.28 });

export const makeSteel = () =>
  new THREE.MeshStandardMaterial({
    color: 0xd6d1c8,
    metalness: 1,
    roughness: 0.14,
    side: THREE.DoubleSide,
  });

const extrude = (shape, depth, bevel = 0.015) =>
  new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 48,
  });

function makeRazor(steel, bronze) {
  const horn = new THREE.MeshPhysicalMaterial({
    color: 0x15110e,
    roughness: 0.32,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
  const razor = new THREE.Group();

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, 0.05);
  bladeShape.lineTo(2.7, 0);
  bladeShape.quadraticCurveTo(3.1, 0.12, 3.02, 0.66);
  bladeShape.lineTo(0.3, 0.7);
  bladeShape.quadraticCurveTo(0.02, 0.64, 0, 0.05);
  const blade = new THREE.Mesh(extrude(bladeShape, 0.03, 0.012), steel);
  blade.position.z = -0.015;

  const tangShape = new THREE.Shape();
  tangShape.moveTo(-0.6, 0.25);
  tangShape.lineTo(0.05, 0.2);
  tangShape.lineTo(0.05, 0.6);
  tangShape.lineTo(-0.6, 0.52);
  tangShape.lineTo(-0.6, 0.25);
  const tang = new THREE.Mesh(extrude(tangShape, 0.03, 0.012), steel);
  tang.position.z = -0.015;

  const handleShape = new THREE.Shape();
  handleShape.absarc(0, 0, 0.24, Math.PI / 2, Math.PI * 1.5, false);
  handleShape.lineTo(3.2, -0.19);
  handleShape.absarc(3.2, 0, 0.19, -Math.PI / 2, Math.PI / 2, false);
  handleShape.lineTo(0, 0.24);
  const handleGeometry = extrude(handleShape, 0.055, 0.02);

  const handle = new THREE.Group();
  handle.position.set(-0.45, 0.38, 0);
  handle.rotation.z = Math.PI + 0.38;
  for (const z of [-0.1, 0.045]) {
    const scale = new THREE.Mesh(handleGeometry, horn);
    scale.position.z = z;
    handle.add(scale);
  }
  const pinGeometry = new THREE.CylinderGeometry(0.075, 0.075, 0.26, 32);
  for (const x of [0, 3.2]) {
    const pin = new THREE.Mesh(pinGeometry, bronze);
    pin.rotation.x = Math.PI / 2;
    pin.position.x = x;
    handle.add(pin);
  }

  razor.add(blade, tang, handle);
  razor.position.set(-0.1, -0.35, 0.25);
  razor.rotation.z = -0.62;
  return razor;
}

function makeScissors(steel, bronze) {
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(0, -0.13);
  bladeShape.quadraticCurveTo(1.9, -0.17, 3.1, 0);
  bladeShape.quadraticCurveTo(1.7, 0.15, 0, 0.15);
  bladeShape.lineTo(0, -0.13);
  const bladeGeometry = extrude(bladeShape, 0.035, 0.01);
  const arm = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.55, -0.22, 0),
    new THREE.Vector3(-1.05, -0.5, 0),
  ]);
  const armGeometry = new THREE.TubeGeometry(arm, 32, 0.07, 16);
  const ringGeometry = new THREE.TorusGeometry(0.4, 0.08, 24, 72);

  const half = (sign) => {
    const group = new THREE.Group();
    const blade = new THREE.Mesh(bladeGeometry, steel);
    blade.position.z = -0.018;
    const ring = new THREE.Mesh(ringGeometry, bronze);
    ring.position.set(-1.42, -0.72, 0);
    group.add(blade, new THREE.Mesh(armGeometry, bronze), ring);
    group.scale.y = sign;
    group.rotation.z = 0.16 * sign;
    group.position.z = sign * 0.035;
    return group;
  };

  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.2, 32), bronze);
  screw.rotation.x = Math.PI / 2;

  const scissors = new THREE.Group();
  scissors.add(half(1), half(-1), screw);
  scissors.position.set(0.15, 0.15, -0.25);
  scissors.rotation.z = 0.62 + Math.PI;
  return scissors;
}

/** Navalha e tesoura cruzadas, como no logo. */
export function makeCrossedBlades() {
  const steel = makeSteel();
  const bronze = makeBronze();
  const group = new THREE.Group();
  group.add(makeRazor(steel, bronze), makeScissors(steel, bronze));
  return group;
}

/** Libera a memória de GPU de um grupo criado aqui. */
export function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      material?.map?.dispose();
      material?.dispose();
    });
  });
}
