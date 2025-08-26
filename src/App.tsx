import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState, type ReactNode, type RefObject } from "react";
import ItemCardList from "./components/ItemCardList";
import * as THREE from "three";
import CameraAnimator from "./components/CameraAnimator";

import { Canvas } from "@react-three/fiber";

import Icosahedron from "./components/Icosahedron";
import HoverWrapper from "./components/Hover";
import NavBar from "./components/NavBar";
import "./App.css";
import "./Vignette.css";
import SpinMeshWrapper from "./components/SpinMeshWrapper";

function App() {
  //let items = ["New York", "Moscow", "Los Angeles", "Riverside", "San Marcos"];
  let bgColor = "#1e2434";
  let navbarColor = "#383b43";
  let bgColorSecondary = "#2e3243";

  let projects: [title: string, img: string, description: ReactNode][] = [
    ["Dual Contour", "/Octohedron.png", <p>Dual Contour Project</p>],
    ["React Site", "/Icosahedron.png", <p>React Portfolio Site</p>],
    [
      "Kaylee Site",
      "/Octohedron.png",
      <p>This is the descriptino for kaylees project. She my girlfriend</p>,
    ],
  ];

  let navTitles: [title: React.ReactNode, link: string][] = [
    ["Home", "#home"],
    ["Kanban", "#kanban"],
    ["Blogs", "#blogs"],
  ];

  let meshes = ["Icosahedron", "Sphere"];

  const handleButtonPress = () => {
    setShowAlert(true);
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  const handleClickMesh = () => {
    if (meshes.length === 0) return;

    const cameraTurnRadians = 6.28319 / meshes.length;
    let [x, y, z] = targetRotation;
    y += cameraTurnRadians;

    setTargetRotation([x, y, z]);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [targetRotation, setTargetRotation] = useState<
    [number, number, number]
  >([0, 0, 0]);

  return (
    <>
      <NavBar color={navbarColor} textColor="#ffffff" titles={navTitles} />

      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: bgColor }}
        className="d-flex gap-3"
      >
        <div
          style={{ flex: 1, backgroundColor: bgColor }}
          className="vignette-container"
        >
          <Canvas
            camera={{
              position: [0, 0, 5],
            }}
          >
            <ambientLight />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight position={[10, 10, 10]} />
            <CameraAnimator targetRotation={targetRotation} />
            <HoverWrapper speed={5} position={[0, 0, 0]}>
              {(t: number) => (
                <SpinMeshWrapper>
                  {(y) => (
                    <Icosahedron
                      nearColor={new THREE.Color(0xffffff)}
                      farColor={new THREE.Color(0x555555)}
                      onPressed={handleClickMesh}
                      position={[0, 0, 0]}
                      rotation={[0, y, 0]}
                      scale={2 + (3 - 2) * t}
                    />
                  )}
                </SpinMeshWrapper>
              )}
            </HoverWrapper>
            <HoverWrapper speed={5} position={[0, 0, 10]}>
              {(t: number) => (
                <SpinMeshWrapper>
                  {(y) => (
                    <mesh
                      position={[0, 0, 10]}
                      scale={1 + (1.5 - 1) * t}
                      onClick={handleClickMesh}
                      rotation={[0.25, y, 0]}
                    >
                      <sphereGeometry args={[1.5]} />
                      <meshBasicMaterial wireframe />
                    </mesh>
                  )}
                </SpinMeshWrapper>
              )}
            </HoverWrapper>
          </Canvas>
        </div>
        <div
          style={{
            flex: 1,
            padding: "2rem",
            color: "white",
          }}
        >
          <p>This is a paragraph twin</p>
        </div>
      </div>
      <div style={{ backgroundColor: bgColorSecondary }}>
        <ItemCardList heading={"Projects"} cards={projects} />

        {showAlert === true && (
          <Alert onClick={handleDismissAlert}>
            I SAID TO START DIGGIN IN YO BUTT TWIN
          </Alert>
        )}
        <Button color="danger" onButtonPress={handleButtonPress}>
          SDIYBT
        </Button>
      </div>
    </>
  );
}

export default App;
