import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";

const Icosahedron = (props: ThreeElements["mesh"]) => {
  const group = useRef<THREE.Group>(null!);

  const { camera } = useThree();

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

  useFrame(() => {
    group.current.rotation.y += 0.01;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const geometry = mesh.geometry as THREE.BufferGeometry;
      const colors = colorArrays.current[i];
      const positions = geometry.getAttribute("position");

      for (let j = 0; j < positions.count; j++) {
        const x = positions.getX(j);
        const y = positions.getY(j);
        const z = positions.getZ(j);
        const vertex = new THREE.Vector3(x, y, z);
        vertex.applyMatrix4(mesh.matrixWorld);

        const dist = vertex.distanceTo(camera.position);

        const t = Math.min(Math.max((dist - 6.5) / (3.5 - 6.5), 0), 1);
        const c = new THREE.Color().lerpColors(
          new THREE.Color(0x888888),
          new THREE.Color(0xffffff),
          t
        );

        colors[j * 3] = c.r;
        colors[j * 3 + 1] = c.g;
        colors[j * 3 + 2] = c.b;
      }

      geometry.getAttribute("color").needsUpdate = true;
    });
  });

  return (
    <group ref={group}>
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
            <mesh
              {...props}
              key={i}
              ref={(el) => {
                if (el) meshRefs.current[i] = el;
              }}
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
            </mesh>
          </>
        );
      })}
    </group>
  );
};

export default Icosahedron;
