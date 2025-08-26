import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

interface SpinMeshWrapperProps {
  children: (y: number) => React.ReactNode;
}

const SpinMeshWrapper = ({ children }: SpinMeshWrapperProps) => {
  const rotY = useRef(0);
  const [y, setY] = useState(0);

  useFrame(() => {
    rotY.current += 0.0025;
    setY(rotY.current);
  });
  return (
    <>
      <group>{children(y)}</group>
    </>
  );
};

export default SpinMeshWrapper;
