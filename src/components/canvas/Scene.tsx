"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Environment, KeyboardControls, Loader } from "@react-three/drei";
import Character from "./Character";
import House from "./House";
import InteractionManager from "./InteractionManager";

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "w", "W"] },
    { name: "backward", keys: ["ArrowDown", "s", "S"] },
    { name: "left", keys: ["ArrowLeft", "a", "A"] },
    { name: "right", keys: ["ArrowRight", "d", "D"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
];

export default function Scene() {
    return (
        <div className="h-screen w-screen absolute top-0 left-0 bg-gray-900">
            <Canvas
                shadows
                camera={{ position: [0, 5, 10], fov: 50 }}
                className="w-full h-full"
            >
                <Suspense fallback={null}>
                    <KeyboardControls map={keyboardMap}>
                        {/* Warm ambient light */}
                        <ambientLight intensity={0.4} color="#FFF5E1" />

                        {/* Main sun light */}
                        <directionalLight
                            position={[8, 15, 5]}
                            intensity={1.2}
                            castShadow
                            shadow-mapSize={[2048, 2048]}
                            shadow-camera-far={50}
                            shadow-camera-left={-15}
                            shadow-camera-right={15}
                            shadow-camera-top={15}
                            shadow-camera-bottom={-15}
                            color="#FFF8DC"
                        />

                        {/* Fill light from opposite side */}
                        <directionalLight
                            position={[-5, 8, -5]}
                            intensity={0.3}
                            color="#E0FFFF"
                        />

                        {/* Subtle point lights for warmth */}
                        <pointLight position={[0, 4, 0]} intensity={0.5} color="#FFE4B5" distance={15} />

                        <Physics>
                            <Character />
                            <House />
                            <InteractionManager />
                        </Physics>

                        <Environment preset="apartment" background={false} />
                    </KeyboardControls>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    );
}
