import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { a, useSprings } from "@react-spring/three";

type Props = ThreeElements["mesh"] & {
  nearColor: THREE.Color;
  farColor: THREE.Color;
  scale: number;
  onPressed: () => void;
};

const Icosahedron = ({
  nearColor,
  farColor,
  onPressed,
  scale,
  ...props
}: Props) => {
  const group = useRef<THREE.Group>(null!);

  const [explodeIcosahedron, setExplodeIcosahedron] = useState(false);

  const handleIcosahedronPress = () => {
    setExplodeIcosahedron(true);
    group.current.rotation.y = 0;
    const planeGeo = new THREE.PlaneGeometry(5, 4, 5, 4);
    const planePositions = planeGeo.attributes.position.array;
    const indices = planeGeo.index ? planeGeo.index.array : null;

    api.start((index) => {
      if (!indices) return;

      const i0 = indices[index * 3];
      const i1 = indices[index * 3 + 1];
      const i2 = indices[index * 3 + 2];

      const v0 = new THREE.Vector3(
        planePositions[i0 * 3],
        planePositions[i0 * 3 + 1],
        planePositions[i0 * 3 + 2]
      );

      const v1 = new THREE.Vector3(
        planePositions[i1 * 3],
        planePositions[i1 * 3 + 1],
        planePositions[i1 * 3 + 2]
      );
      const v2 = new THREE.Vector3(
        planePositions[i2 * 3],
        planePositions[i2 * 3 + 1],
        planePositions[i2 * 3 + 2]
      );

      const geometry = meshRefs.current[index].geometry;
      const positionAttr = geometry.getAttribute("position");
      positionAttr.setXYZ(0, v0.x, v0.y, v0.z);
      positionAttr.setXYZ(1, v1.x, v1.y, v1.z);
      positionAttr.setXYZ(2, v2.x, v2.y, v2.z);
      positionAttr.needsUpdate = true;

      return {
        scale: [1, 1, 1],
        position: [v0.x, v0.y, v0.z],
        rotation: [0, 0, 0],
      };
    });
  };

  const { camera } = useThree();
  //let sizeT: number = 0;

  const triangles = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 0);
    const positions = geo.attributes.position.array;
    const faces: [THREE.Vector3, THREE.Vector3, THREE.Vector3][] = [];

    for (let i = 0; i < positions.length; i += 9) {
      const v0 = new THREE.Vector3(
        positions[i],
        positions[i + 1],
        positions[i + 2]
      );
      const v1 = new THREE.Vector3(
        positions[i + 3],
        positions[i + 4],
        positions[i + 5]
      );
      const v2 = new THREE.Vector3(
        positions[i + 6],
        positions[i + 7],
        positions[i + 8]
      );

      faces.push([v0, v1, v2]);
    }

    return { faces };
  }, []);

  const meshRefs = useRef<THREE.Mesh[]>([]);
  const colorArrays = useRef<Float32Array[]>([]);

  const [springs, api] = useSprings(triangles.faces.length * 3, (index) => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    config: { mass: 1, tension: 120, friction: 14 },
  }));

  useFrame(() => {
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const geometry = mesh.geometry as THREE.BufferGeometry;
      const colors = colorArrays.current[i];
      const positions = geometry.getAttribute("position");

      if (!explodeIcosahedron) {
        group.current.rotation.y += 0.00025;
      }

      for (let j = 0; j < positions.count; j++) {
        const x = positions.getX(j);
        const y = positions.getY(j);
        const z = positions.getZ(j);
        const vertex = new THREE.Vector3(x, y, z);
        vertex.applyMatrix4(mesh.matrixWorld);

        const dist = vertex.distanceTo(camera.position);

        const t = Math.min(Math.max((dist - 6.5) / (3.5 - 6.5), 0), 1);
        const c = new THREE.Color().lerpColors(farColor, nearColor, t);

        colors[j * 3] = c.r;
        colors[j * 3 + 1] = c.g;
        colors[j * 3 + 2] = c.b;
      }

      geometry.getAttribute("color").needsUpdate = true;
    });
  });

  return (
    <>
      <group ref={group} scale={scale}>
        {triangles.faces.map((face, i) => {
          if (!colorArrays.current[i]) {
            const colors = new Float32Array(9);
            face.forEach((v, idx) => {
              const c = new THREE.Color(0, 1, 0); // start as red
              colors[idx * 3] = c.r;
              colors[idx * 3 + 1] = c.g;
              colors[idx * 3 + 2] = c.b;
            });
            colorArrays.current[i] = colors;
          }

          return (
            <>
              <a.mesh
                {...props}
                key={i}
                ref={(el) => {
                  if (el) meshRefs.current[i] = el;
                }}
                scale={springs[i].scale as any}
              >
                <bufferGeometry attach="geometry">
                  <bufferAttribute
                    attach="attributes-position"
                    args={[
                      new Float32Array(face.flatMap((v) => [v.x, v.y, v.z])),
                      3,
                    ]}
                  />
                  <bufferAttribute
                    attach="attributes-color"
                    args={[colorArrays.current[i], 3]}
                  />
                </bufferGeometry>
                <meshStandardMaterial
                  side={THREE.DoubleSide}
                  wireframe
                  vertexColors={true}
                />
              </a.mesh>
            </>
          );
        })}
      </group>
      <mesh
        visible={false}
        onClick={() => {
          onPressed();
        }}
      >
        <sphereGeometry args={[1.5]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default Icosahedron;
