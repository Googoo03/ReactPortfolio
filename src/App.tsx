import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState, type ReactNode } from "react";
import ItemCardList from "./components/ItemCardList";
import * as THREE from "three";

import { Canvas } from "@react-three/fiber";

import Icosahedron from "./components/Icosahedron";
import HoverWrapper from "./components/Hover";

function App() {
  let items = ["New York", "Moscow", "Los Angeles", "Riverside", "San Marcos"];
  let bgColor = "#242F36";

  let projects: [title: string, img: string, description: ReactNode][] = [
    ["Dual Contour", "/Octohedron.png", <p>Dual Contour Project</p>],
    ["React Site", "/Octohedron.png", <p>React Portfolio Site</p>],
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleButtonPress = () => {
    setShowAlert(true);
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div style={{ backgroundColor: bgColor }}>
      <ListGroup
        items={items}
        heading={"Cities"}
        onSelectItem={handleSelectItem}
      />

      <ItemCardList cards={projects} />
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight position={[10, 10, 10]} />
          <HoverWrapper speed={5}>
            {(t: number) => (
              <Icosahedron
                nearColor={new THREE.Color(0xffffff)}
                farColor={new THREE.Color(0x555555)}
                onPressed={handleDismissAlert}
                position={[0, 0, 0]}
                scale={2 + (3 - 2) * t}
              />
            )}
          </HoverWrapper>
        </Canvas>
      </div>

      {showAlert === true && (
        <Alert onClick={handleDismissAlert}>
          I SAID TO START DIGGIN IN YO BUTT TWIN
        </Alert>
      )}
      <Button color="danger" onButtonPress={handleButtonPress}>
        SDIYBT
      </Button>
    </div>
  );
}

export default App;
