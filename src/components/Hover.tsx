import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

interface HoverWrapperProps {
  children: (t: number) => React.ReactNode;
  position?: [number, number, number];
  speed: number;
}

function HoverWrapper({ children, position, speed }: HoverWrapperProps) {
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(0); // start at 1
  const [t, setT] = useState(0);

  useFrame(() => {
    if (hovered) {
      scaleRef.current = Math.min(scaleRef.current + 0.01 * speed, 1);
    } else {
      scaleRef.current = Math.max(scaleRef.current - 0.01 * speed, 0);
    }

    const easingScale = hovered
      ? easeInExpo(scaleRef.current)
      : easeOutExpo(scaleRef.current);

    setT(easingScale);
  });

  return (
    <>
      <group>{children(t)}</group>

      <mesh
        position={position}
        visible={false}
        onPointerOver={() => {
          setHovered(true);
          console.log("hover");
          console.log(t);
        }}
        onPointerOut={() => {
          setHovered(false);
          console.log("not hovered");

          console.log(t);
        }}
      >
        <sphereGeometry args={[1.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

export default HoverWrapper;
