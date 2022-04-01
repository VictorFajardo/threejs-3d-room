import { OrbitControls, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { BackSide } from 'three';
import Scenary1 from './Scenery1.jpeg'
import Scenary2 from './Scenery2.jpeg'

const Scene = ({...props}) => {
  const sphereTexture = useTexture(props.room ? Scenary1 : Scenary2)
  return(
    <mesh scale={[-1, 1, 1]}>
      <sphereBufferGeometry attach="geometry" args={[100, 50, 50]} />
      <meshBasicMaterial attach="material" map={sphereTexture} side={BackSide} />
    </mesh>
  )
}

function App() {
  const [main, setMain] = useState(true)
  return (
    <div className="App">
      <button onClick={() => setMain(!main)} style={{zIndex: 1, position: 'absolute'}}>Change Room</button>
      <Canvas
        // legacy
        flat
        camera={{ fov: 40, near: 1, far: 1000, aspect: (window.innerHeight / window.innerWidth) }}
        style={{ width: '100vw', height: '100vh', }}
        >
        <OrbitControls />
        <Suspense fallback={null}>
          <Scene room={main}/>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
