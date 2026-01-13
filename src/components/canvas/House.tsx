"use client";

import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

// ============= MATERIALS =============
const WALL_COLOR = "#f5f0e8";       // Warm cream
const FLOOR_COLOR = "#8B7355";      // Wood brown
const ACCENT_COLOR = "#6C63FF";     // Purple accent
const METAL_COLOR = "#9CA3AF";      // Steel gray
const WOOD_COLOR = "#A0522D";       // Sienna wood

// ============= WALL COMPONENT =============
function Wall({ position, rotation, args, color = WALL_COLOR }: {
    position: [number, number, number],
    rotation?: [number, number, number],
    args: [number, number, number],
    color?: string
}) {
    return (
        <RigidBody type="fixed" position={position} rotation={rotation}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={args} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>
    );
}

// ============= FLOOR TILES =============
function FloorTiles() {
    const tiles = [];
    const tileSize = 2;
    const gridSize = 10;

    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
        for (let z = -gridSize / 2; z < gridSize / 2; z++) {
            const isLight = (x + z) % 2 === 0;
            tiles.push(
                <mesh
                    key={`tile-${x}-${z}`}
                    position={[x * tileSize + tileSize / 2, 0.01, z * tileSize + tileSize / 2]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[tileSize - 0.05, tileSize - 0.05]} />
                    <meshStandardMaterial color={isLight ? "#9F8170" : "#8B7355"} />
                </mesh>
            );
        }
    }
    return <>{tiles}</>;
}

// ============= BED =============
function Bed({ position }: { position: [number, number, number] }) {
    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group>
                {/* Frame */}
                <mesh position={[0, 0.3, 0]} castShadow receiveShadow name="bed">
                    <boxGeometry args={[2.2, 0.4, 3.2]} />
                    <meshStandardMaterial color={WOOD_COLOR} />
                </mesh>
                {/* Mattress */}
                <mesh position={[0, 0.6, 0]} castShadow>
                    <boxGeometry args={[2, 0.3, 3]} />
                    <meshStandardMaterial color="#E8E4E1" />
                </mesh>
                {/* Pillow */}
                <mesh position={[0, 0.85, -1.1]} castShadow>
                    <boxGeometry args={[1.6, 0.25, 0.6]} />
                    <meshStandardMaterial color="#FFEFD5" />
                </mesh>
                {/* Blanket */}
                <mesh position={[0, 0.8, 0.5]} castShadow>
                    <boxGeometry args={[1.9, 0.15, 1.8]} />
                    <meshStandardMaterial color={ACCENT_COLOR} />
                </mesh>
                {/* Headboard */}
                <mesh position={[0, 1.2, -1.5]} castShadow>
                    <boxGeometry args={[2.2, 1.2, 0.15]} />
                    <meshStandardMaterial color={WOOD_COLOR} />
                </mesh>
            </group>
        </RigidBody>
    );
}

// ============= DESK =============
function Desk({ position }: { position: [number, number, number] }) {
    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group>
                {/* Desktop */}
                <mesh position={[0, 1.0, 0]} castShadow receiveShadow name="desk">
                    <boxGeometry args={[2.5, 0.1, 1.2]} />
                    <meshStandardMaterial color={WOOD_COLOR} />
                </mesh>
                {/* Legs */}
                {[[-1.1, 0.5, 0.45], [1.1, 0.5, 0.45], [-1.1, 0.5, -0.45], [1.1, 0.5, -0.45]].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]} castShadow>
                        <boxGeometry args={[0.1, 1, 0.1]} />
                        <meshStandardMaterial color={WOOD_COLOR} />
                    </mesh>
                ))}
                {/* Monitor */}
                <mesh position={[0, 1.5, -0.3]} castShadow>
                    <boxGeometry args={[1.2, 0.7, 0.05]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>
                {/* Monitor Screen */}
                <mesh position={[0, 1.5, -0.27]}>
                    <boxGeometry args={[1.1, 0.6, 0.01]} />
                    <meshStandardMaterial color="#3498db" emissive="#3498db" emissiveIntensity={0.2} />
                </mesh>
                {/* Monitor Stand */}
                <mesh position={[0, 1.15, -0.3]} castShadow>
                    <boxGeometry args={[0.3, 0.2, 0.15]} />
                    <meshStandardMaterial color={METAL_COLOR} />
                </mesh>
                {/* Keyboard */}
                <mesh position={[0, 1.08, 0.2]}>
                    <boxGeometry args={[0.8, 0.05, 0.3]} />
                    <meshStandardMaterial color="#374151" />
                </mesh>
                {/* Chair */}
                <mesh position={[0, 0.6, 1]} castShadow>
                    <boxGeometry args={[0.7, 0.1, 0.7]} />
                    <meshStandardMaterial color="#1f2937" />
                </mesh>
                <mesh position={[0, 1.0, 1.3]} castShadow>
                    <boxGeometry args={[0.7, 0.9, 0.1]} />
                    <meshStandardMaterial color="#1f2937" />
                </mesh>
            </group>
        </RigidBody>
    );
}

// ============= BOOKSHELF =============
function Bookshelf({ position }: { position: [number, number, number] }) {
    const bookColors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];

    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group>
                {/* Frame */}
                <mesh position={[0, 1.5, 0]} castShadow receiveShadow name="bookshelf">
                    <boxGeometry args={[1.5, 3, 0.5]} />
                    <meshStandardMaterial color={WOOD_COLOR} />
                </mesh>
                {/* Shelves */}
                {[0.5, 1.5, 2.5].map((y, i) => (
                    <mesh key={i} position={[0, y, 0.05]}>
                        <boxGeometry args={[1.35, 0.05, 0.4]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                ))}
                {/* Books - Row 1 */}
                {bookColors.slice(0, 4).map((color, i) => (
                    <mesh key={`book1-${i}`} position={[-0.45 + i * 0.3, 0.85, 0.05]} castShadow>
                        <boxGeometry args={[0.12, 0.5, 0.3]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                ))}
                {/* Books - Row 2 */}
                {bookColors.slice(2).map((color, i) => (
                    <mesh key={`book2-${i}`} position={[-0.35 + i * 0.35, 1.85, 0.05]} castShadow>
                        <boxGeometry args={[0.15, 0.45, 0.28]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                ))}
            </group>
        </RigidBody>
    );
}

// ============= FRIDGE =============
function Fridge({ position }: { position: [number, number, number] }) {
    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group>
                {/* Main Body */}
                <mesh position={[0, 1.2, 0]} castShadow receiveShadow name="fridge">
                    <boxGeometry args={[1.2, 2.4, 1]} />
                    <meshStandardMaterial color="#E5E7EB" metalness={0.3} roughness={0.4} />
                </mesh>
                {/* Freezer Door */}
                <mesh position={[0, 2.1, 0.52]}>
                    <boxGeometry args={[1.1, 0.6, 0.05]} />
                    <meshStandardMaterial color="#D1D5DB" metalness={0.4} roughness={0.3} />
                </mesh>
                {/* Fridge Door */}
                <mesh position={[0, 0.9, 0.52]}>
                    <boxGeometry args={[1.1, 1.6, 0.05]} />
                    <meshStandardMaterial color="#D1D5DB" metalness={0.4} roughness={0.3} />
                </mesh>
                {/* Handle - Freezer */}
                <mesh position={[0.45, 2.1, 0.58]}>
                    <boxGeometry args={[0.08, 0.4, 0.05]} />
                    <meshStandardMaterial color={METAL_COLOR} metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Handle - Fridge */}
                <mesh position={[0.45, 1.4, 0.58]}>
                    <boxGeometry args={[0.08, 0.5, 0.05]} />
                    <meshStandardMaterial color={METAL_COLOR} metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Door Line */}
                <mesh position={[0, 1.7, 0.53]}>
                    <boxGeometry args={[1.12, 0.02, 0.01]} />
                    <meshStandardMaterial color="#9CA3AF" />
                </mesh>
            </group>
        </RigidBody>
    );
}

// ============= WINDOW =============
function Window({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Frame */}
            <mesh castShadow>
                <boxGeometry args={[2.5, 2, 0.15]} />
                <meshStandardMaterial color="#5D4037" />
            </mesh>
            {/* Glass */}
            <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[2.2, 1.7, 0.02]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.4}
                    metalness={0.1}
                    roughness={0.1}
                />
            </mesh>
            {/* Cross bars */}
            <mesh position={[0, 0, 0.08]}>
                <boxGeometry args={[2.3, 0.08, 0.05]} />
                <meshStandardMaterial color="#5D4037" />
            </mesh>
            <mesh position={[0, 0, 0.08]}>
                <boxGeometry args={[0.08, 1.8, 0.05]} />
                <meshStandardMaterial color="#5D4037" />
            </mesh>
        </group>
    );
}

// ============= RUG =============
function Rug({ position }: { position: [number, number, number] }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[4, 3]} />
            <meshStandardMaterial color="#8B0000" />
        </mesh>
    );
}

// ============= PLANT =============
function Plant({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Pot */}
            <mesh position={[0, 0.2, 0]} castShadow>
                <cylinderGeometry args={[0.25, 0.2, 0.4, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Leaves */}
            {[0, 0.5, 1, 1.5, 2].map((rot, i) => (
                <mesh key={i} position={[Math.sin(rot * Math.PI) * 0.15, 0.5 + i * 0.1, Math.cos(rot * Math.PI) * 0.15]} castShadow>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color="#228B22" />
                </mesh>
            ))}
        </group>
    );
}

// ============= MAIN HOUSE EXPORT =============
export default function House() {
    return (
        <group>
            {/* FLOOR */}
            <RigidBody type="fixed" position={[0, -0.1, 0]}>
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color={FLOOR_COLOR} />
                </mesh>
            </RigidBody>
            <FloorTiles />

            {/* CEILING */}
            <Wall position={[0, 5, 0]} args={[20, 0.2, 20]} color="#f0ebe3" />

            {/* WALLS */}
            <Wall position={[0, 2.5, -10]} args={[20, 5, 0.3]} />  {/* Back */}
            <Wall position={[0, 2.5, 10]} args={[20, 5, 0.3]} />   {/* Front */}
            <Wall position={[-10, 2.5, 0]} args={[0.3, 5, 20]} />  {/* Left */}
            <Wall position={[10, 2.5, 0]} args={[0.3, 5, 20]} />   {/* Right */}

            {/* WINDOWS */}
            <Window position={[-9.8, 2.5, -5]} rotation={[0, Math.PI / 2, 0]} />
            <Window position={[-9.8, 2.5, 5]} rotation={[0, Math.PI / 2, 0]} />
            <Window position={[0, 2.5, -9.8]} rotation={[0, 0, 0]} />

            {/* FURNITURE */}
            <Bed position={[-7, 0, -7]} />
            <Desk position={[7, 0, -8]} />
            <Bookshelf position={[8.5, 0, 0]} />
            <Fridge position={[-8, 0, 6]} />

            {/* DECORATIONS */}
            <Rug position={[0, 0.02, 0]} />
            <Plant position={[8, 0, 7]} />
            <Plant position={[-6, 0, 7]} />
        </group>
    );
}
