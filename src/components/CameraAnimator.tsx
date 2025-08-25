import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useEffect } from "react";

interface Props {
  targetRotation: [number, number, number];
}

function CameraAnimator({ targetRotation }: Props) {
  const { camera } = useThree();

  // Spring for smooth rotation
  const [springs, api] = useSpring(() => ({
    rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
    config: { mass: 1, tension: 50, friction: 14 },
  }));

  // Start animation when target changes
  useEffect(() => {
    api.start({ rotation: targetRotation });
  }, [targetRotation]);

  // Apply spring values to camera each frame
  useFrame(() => {
    console.log("Camera rotation:", camera.rotation);
    console.log("Spring rotation:", springs.rotation.get());
    let [x, y, z] = springs.rotation.get();
    x %= 6.28319;
    y %= 6.28319;
    z %= 6.28319;
    camera.rotation.set(x, y, z);
  });

  return null;
}

export default CameraAnimator;
