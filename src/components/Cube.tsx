import * as THREE from "three";
import { useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";

function Cube(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => (meshRef.current.rotation.y += 0.01));
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"orange"} wireframe />
    </mesh>
  );
}

export default Cube;
