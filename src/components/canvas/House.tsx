"use client";

import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

// ============= STYLIZED MATERIALS =============
const createMaterial = (color: string, roughness = 0.5, metalness = 0.1) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });

// ============= COZY BED =============
function StylizedBed({ position }: { position: [number, number, number] }) {
    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group name="bed">
                {/* Bed Frame - Rounded wood */}
                <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.4, 0.3, 3.4]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.7} />
                </mesh>

                {/* Mattress - Soft rounded */}
                <mesh position={[0, 0.55, 0]} castShadow>
                    <boxGeometry args={[2.2, 0.35, 3.2]} />
                    <meshStandardMaterial color="#FFF8DC" roughness={0.9} />
                </mesh>

                {/* Cozy Blanket - Draped look */}
                <mesh position={[0, 0.75, 0.3]} castShadow>
                    <boxGeometry args={[2.1, 0.2, 2.2]} />
                    <meshStandardMaterial color="#E74C3C" roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.65, 1.3]} castShadow rotation={[0.3, 0, 0]}>
                    <boxGeometry args={[2.1, 0.15, 0.5]} />
                    <meshStandardMaterial color="#E74C3C" roughness={0.8} />
                </mesh>

                {/* Fluffy Pillows */}
                <mesh position={[-0.5, 0.9, -1.2]} castShadow>
                    <sphereGeometry args={[0.35, 16, 16]} />
                    <meshStandardMaterial color="#FFFAF0" roughness={0.9} />
                </mesh>
                <mesh position={[0.5, 0.9, -1.2]} castShadow>
                    <sphereGeometry args={[0.35, 16, 16]} />
                    <meshStandardMaterial color="#FFE4E1" roughness={0.9} />
                </mesh>

                {/* Headboard - Curved */}
                <mesh position={[0, 1.1, -1.6]} castShadow>
                    <boxGeometry args={[2.4, 1.0, 0.15]} />
                    <meshStandardMaterial color="#A0522D" roughness={0.6} />
                </mesh>

                {/* Bedside lamp */}
                <mesh position={[-1.5, 0.8, -1.2]} castShadow>
                    <cylinderGeometry args={[0.08, 0.12, 0.4, 16]} />
                    <meshStandardMaterial color="#DEB887" roughness={0.5} />
                </mesh>
                <mesh position={[-1.5, 1.1, -1.2]} castShadow>
                    <coneGeometry args={[0.2, 0.25, 16]} />
                    <meshStandardMaterial color="#FFEFD5" roughness={0.6} emissive="#FFE4B5" emissiveIntensity={0.3} />
                </mesh>
            </group>
        </RigidBody>
    );
}

// ============= MODERN DESK =============
function StylizedDesk({ position }: { position: [number, number, number] }) {
    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group name="desk">
                {/* Desktop - Sleek rounded edges */}
                <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
                    <boxGeometry args={[2.8, 0.08, 1.3]} />
                    <meshStandardMaterial color="#F5DEB3" roughness={0.4} />
                </mesh>

                {/* Stylish metal legs */}
                {[[-1.2, 0.5, 0.5], [1.2, 0.5, 0.5], [-1.2, 0.5, -0.5], [1.2, 0.5, -0.5]].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]} castShadow>
                        <cylinderGeometry args={[0.04, 0.04, 1, 16]} />
                        <meshStandardMaterial color="#2C3E50" metalness={0.6} roughness={0.3} />
                    </mesh>
                ))}

                {/* Curved Monitor */}
                <mesh position={[0, 1.45, -0.35]} castShadow>
                    <boxGeometry args={[1.4, 0.8, 0.05]} />
                    <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
                </mesh>
                <mesh position={[0, 1.45, -0.32]}>
                    <boxGeometry args={[1.3, 0.7, 0.01]} />
                    <meshStandardMaterial color="#4ECDC4" emissive="#4ECDC4" emissiveIntensity={0.2} />
                </mesh>
                <mesh position={[0, 1.02, -0.35]} castShadow>
                    <cylinderGeometry args={[0.15, 0.2, 0.05, 16]} />
                    <meshStandardMaterial color="#2C3E50" metalness={0.5} />
                </mesh>

                {/* Keyboard */}
                <mesh position={[0, 1.06, 0.15]}>
                    <boxGeometry args={[0.9, 0.03, 0.35]} />
                    <meshStandardMaterial color="#34495E" roughness={0.4} />
                </mesh>

                {/* Mouse */}
                <mesh position={[0.6, 1.05, 0.15]}>
                    <capsuleGeometry args={[0.03, 0.05, 8, 16]} />
                    <meshStandardMaterial color="#2C3E50" roughness={0.3} />
                </mesh>

                {/* Coffee mug */}
                <mesh position={[-0.9, 1.12, 0.3]} castShadow>
                    <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
                    <meshStandardMaterial color="#E74C3C" roughness={0.4} />
                </mesh>

                {/* Comfy chair */}
                <mesh position={[0, 0.55, 1.1]} castShadow>
                    <boxGeometry args={[0.8, 0.12, 0.8]} />
                    <meshStandardMaterial color="#2C3E50" roughness={0.5} />
                </mesh>
                <mesh position={[0, 0.9, 1.45]} castShadow>
                    <boxGeometry args={[0.8, 0.8, 0.12]} />
                    <meshStandardMaterial color="#2C3E50" roughness={0.5} />
                </mesh>
                {/* Chair wheels */}
                {[[-0.25, 0.15, 0.85], [0.25, 0.15, 0.85], [-0.25, 0.15, 1.35], [0.25, 0.15, 1.35]].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]}>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#1a1a2e" metalness={0.3} />
                    </mesh>
                ))}
            </group>
        </RigidBody>
    );
}

// ============= CUTE BOOKSHELF =============
function StylizedBookshelf({ position }: { position: [number, number, number] }) {
    const bookColors = ["#E74C3C", "#3498DB", "#2ECC71", "#F39C12", "#9B59B6", "#1ABC9C", "#E67E22", "#16A085"];

    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group name="bookshelf">
                {/* Main frame */}
                <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[1.6, 3.2, 0.5]} />
                    <meshStandardMaterial color="#A0522D" roughness={0.6} />
                </mesh>

                {/* Shelves */}
                {[0.4, 1.2, 2.0, 2.8].map((y, i) => (
                    <mesh key={i} position={[0, y, 0.05]}>
                        <boxGeometry args={[1.45, 0.06, 0.42]} />
                        <meshStandardMaterial color="#8B4513" roughness={0.5} />
                    </mesh>
                ))}

                {/* Books - Varied sizes and tilts */}
                {bookColors.slice(0, 5).map((color, i) => (
                    <mesh
                        key={`row1-${i}`}
                        position={[-0.5 + i * 0.25, 0.75, 0.08]}
                        rotation={[0, 0, (i % 2) * 0.1]}
                        castShadow
                    >
                        <boxGeometry args={[0.1, 0.5 + Math.random() * 0.15, 0.3]} />
                        <meshStandardMaterial color={color} roughness={0.7} />
                    </mesh>
                ))}
                {bookColors.slice(3, 7).map((color, i) => (
                    <mesh
                        key={`row2-${i}`}
                        position={[-0.4 + i * 0.28, 1.55, 0.08]}
                        rotation={[0, 0, -(i % 2) * 0.08]}
                        castShadow
                    >
                        <boxGeometry args={[0.12, 0.55, 0.28]} />
                        <meshStandardMaterial color={color} roughness={0.7} />
                    </mesh>
                ))}

                {/* Decorative plant on top */}
                <mesh position={[0.5, 2.45, 0.1]} castShadow>
                    <cylinderGeometry args={[0.12, 0.1, 0.2, 16]} />
                    <meshStandardMaterial color="#D35400" roughness={0.6} />
                </mesh>
                <mesh position={[0.5, 2.65, 0.1]} castShadow>
                    <sphereGeometry args={[0.18, 16, 16]} />
                    <meshStandardMaterial color="#27AE60" roughness={0.7} />
                </mesh>
            </group>
        </RigidBody>
    );
}

// ============= RETRO FRIDGE =============
function StylizedFridge({ position }: { position: [number, number, number] }) {
    return (
        <RigidBody type="fixed" position={position} colliders="cuboid">
            <group name="fridge">
                {/* Main body - Rounded vintage style */}
                <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[1.3, 2.5, 1.1]} />
                    <meshStandardMaterial color="#4ECDC4" roughness={0.3} metalness={0.4} />
                </mesh>

                {/* Top rounded edge */}
                <mesh position={[0, 2.45, 0]} castShadow>
                    <boxGeometry args={[1.35, 0.1, 1.15]} />
                    <meshStandardMaterial color="#45B7AA" roughness={0.3} metalness={0.4} />
                </mesh>

                {/* Freezer door */}
                <mesh position={[0, 2.1, 0.57]}>
                    <boxGeometry args={[1.2, 0.6, 0.03]} />
                    <meshStandardMaterial color="#3DB8A9" roughness={0.25} metalness={0.5} />
                </mesh>

                {/* Main door */}
                <mesh position={[0, 0.95, 0.57]}>
                    <boxGeometry args={[1.2, 1.7, 0.03]} />
                    <meshStandardMaterial color="#3DB8A9" roughness={0.25} metalness={0.5} />
                </mesh>

                {/* Chrome handles */}
                <mesh position={[0.5, 2.1, 0.62]} castShadow>
                    <boxGeometry args={[0.08, 0.4, 0.06]} />
                    <meshStandardMaterial color="#BDC3C7" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0.5, 1.3, 0.62]} castShadow>
                    <boxGeometry args={[0.08, 0.5, 0.06]} />
                    <meshStandardMaterial color="#BDC3C7" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Cute magnets */}
                <mesh position={[-0.3, 1.8, 0.59]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
                    <meshStandardMaterial color="#E74C3C" />
                </mesh>
                <mesh position={[0.1, 1.5, 0.59]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                    <meshStandardMaterial color="#F39C12" />
                </mesh>
            </group>
        </RigidBody>
    );
}

// ============= FLOOR WITH PATTERN =============
function StylizedFloor() {
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
                    <planeGeometry args={[tileSize - 0.08, tileSize - 0.08]} />
                    <meshStandardMaterial color={isLight ? "#DEB887" : "#D2B48C"} roughness={0.7} />
                </mesh>
            );
        }
    }
    return <>{tiles}</>;
}

// ============= DECORATIVE ELEMENTS =============
function CozyRug({ position }: { position: [number, number, number] }) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[2.5, 32]} />
            <meshStandardMaterial color="#9B59B6" roughness={0.9} />
        </mesh>
    );
}

function CutePlant({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh position={[0, 0.25, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.15, 0.5, 16]} />
                <meshStandardMaterial color="#E67E22" roughness={0.6} />
            </mesh>
            {[0, 0.8, 1.6, 2.4, 3.2].map((angle, i) => (
                <mesh key={i} position={[Math.sin(angle) * 0.1, 0.55 + i * 0.08, Math.cos(angle) * 0.1]} castShadow>
                    <sphereGeometry args={[0.12 + i * 0.02, 16, 16]} />
                    <meshStandardMaterial color="#27AE60" roughness={0.7} />
                </mesh>
            ))}
        </group>
    );
}

function Window({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh castShadow>
                <boxGeometry args={[2.8, 2.2, 0.18]} />
                <meshStandardMaterial color="#FFEFD5" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
                <boxGeometry args={[2.4, 1.8, 0.02]} />
                <meshStandardMaterial
                    color="#87CEEB"
                    transparent
                    opacity={0.5}
                    roughness={0.1}
                />
            </mesh>
            {/* Window dividers */}
            <mesh position={[0, 0, 0.1]}>
                <boxGeometry args={[2.5, 0.08, 0.05]} />
                <meshStandardMaterial color="#FFEFD5" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
                <boxGeometry args={[0.08, 1.9, 0.05]} />
                <meshStandardMaterial color="#FFEFD5" />
            </mesh>
        </group>
    );
}

// ============= WALLS =============
function Wall({ position, args, color = "#FFF8DC" }: {
    position: [number, number, number],
    args: [number, number, number],
    color?: string
}) {
    return (
        <RigidBody type="fixed" position={position}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={args} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>
        </RigidBody>
    );
}

// ============= MAIN EXPORT =============
export default function House() {
    return (
        <group>
            {/* Floor */}
            <RigidBody type="fixed" position={[0, -0.05, 0]}>
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[22, 22]} />
                    <meshStandardMaterial color="#D2B48C" roughness={0.8} />
                </mesh>
            </RigidBody>
            <StylizedFloor />

            {/* Ceiling */}
            <Wall position={[0, 5.2, 0]} args={[22, 0.2, 22]} color="#FFF5EE" />

            {/* Walls - Warm cream color */}
            <Wall position={[0, 2.6, -10.5]} args={[22, 5.4, 0.4]} />
            <Wall position={[0, 2.6, 10.5]} args={[22, 5.4, 0.4]} />
            <Wall position={[-10.5, 2.6, 0]} args={[0.4, 5.4, 22]} />
            <Wall position={[10.5, 2.6, 0]} args={[0.4, 5.4, 22]} />

            {/* Windows */}
            <Window position={[-10.3, 2.8, -5]} rotation={[0, Math.PI / 2, 0]} />
            <Window position={[-10.3, 2.8, 5]} rotation={[0, Math.PI / 2, 0]} />
            <Window position={[0, 2.8, -10.3]} rotation={[0, 0, 0]} />

            {/* Furniture */}
            <StylizedBed position={[-7, 0, -7]} />
            <StylizedDesk position={[7, 0, -8]} />
            <StylizedBookshelf position={[9, 0, 0]} />
            <StylizedFridge position={[-8, 0, 7]} />

            {/* Decorations */}
            <CozyRug position={[0, 0.02, 0]} />
            <CutePlant position={[8, 0, 8]} />
            <CutePlant position={[-6, 0, 8]} />

            {/* Ceiling light */}
            <mesh position={[0, 4.8, 0]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color="#FFFAF0" emissive="#FFE4B5" emissiveIntensity={0.5} />
            </mesh>

            {/* Wall Clock */}
            <group position={[10.3, 3.5, -5]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.4, 0.4, 0.08, 32]} />
                    <meshStandardMaterial color="#2C3E50" />
                </mesh>
                <mesh position={[0, 0, 0.05]}>
                    <circleGeometry args={[0.35, 32]} />
                    <meshStandardMaterial color="#FFFAF0" />
                </mesh>
                {/* Clock hands */}
                <mesh position={[0, 0.1, 0.06]} rotation={[0, 0, 0.3]}>
                    <boxGeometry args={[0.02, 0.2, 0.02]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>
                <mesh position={[0.05, 0, 0.06]} rotation={[0, 0, -0.8]}>
                    <boxGeometry args={[0.02, 0.15, 0.02]} />
                    <meshStandardMaterial color="#E74C3C" />
                </mesh>
            </group>

            {/* Wall Poster/Art */}
            <group position={[5, 3, -10.25]} rotation={[0, 0, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1.5, 2, 0.05]} />
                    <meshStandardMaterial color="#8B4513" />
                </mesh>
                <mesh position={[0, 0, 0.03]}>
                    <boxGeometry args={[1.3, 1.8, 0.01]} />
                    <meshStandardMaterial color="#87CEEB" />
                </mesh>
                {/* Abstract art shapes */}
                <mesh position={[-0.3, 0.3, 0.04]}>
                    <circleGeometry args={[0.25, 16]} />
                    <meshStandardMaterial color="#E74C3C" />
                </mesh>
                <mesh position={[0.2, -0.2, 0.04]}>
                    <circleGeometry args={[0.2, 16]} />
                    <meshStandardMaterial color="#F39C12" />
                </mesh>
            </group>

            {/* TV with Stand */}
            <group position={[0, 0, 9]}>
                {/* TV Stand */}
                <mesh position={[0, 0.4, 0]} castShadow>
                    <boxGeometry args={[2.5, 0.8, 0.6]} />
                    <meshStandardMaterial color="#5D4037" roughness={0.6} />
                </mesh>
                {/* TV Screen */}
                <mesh position={[0, 1.4, 0.1]} castShadow>
                    <boxGeometry args={[2.2, 1.3, 0.08]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>
                <mesh position={[0, 1.4, 0.15]}>
                    <boxGeometry args={[2.0, 1.1, 0.01]} />
                    <meshStandardMaterial color="#2C3E50" emissive="#1a1a2e" emissiveIntensity={0.1} />
                </mesh>
                {/* TV Stand legs */}
                <mesh position={[0, 1.0, 0.2]} castShadow>
                    <boxGeometry args={[0.15, 0.4, 0.1]} />
                    <meshStandardMaterial color="#2C3E50" metalness={0.5} />
                </mesh>
            </group>

            {/* Cozy Couch */}
            <group position={[0, 0, 5]}>
                {/* Base */}
                <mesh position={[0, 0.35, 0]} castShadow>
                    <boxGeometry args={[3, 0.5, 1.2]} />
                    <meshStandardMaterial color="#9B59B6" roughness={0.8} />
                </mesh>
                {/* Back */}
                <mesh position={[0, 0.8, -0.45]} castShadow>
                    <boxGeometry args={[3, 0.8, 0.3]} />
                    <meshStandardMaterial color="#8E44AD" roughness={0.8} />
                </mesh>
                {/* Armrests */}
                <mesh position={[-1.4, 0.55, 0]} castShadow>
                    <boxGeometry args={[0.2, 0.6, 1.2]} />
                    <meshStandardMaterial color="#8E44AD" roughness={0.8} />
                </mesh>
                <mesh position={[1.4, 0.55, 0]} castShadow>
                    <boxGeometry args={[0.2, 0.6, 1.2]} />
                    <meshStandardMaterial color="#8E44AD" roughness={0.8} />
                </mesh>
                {/* Cushions */}
                <mesh position={[-0.7, 0.7, 0.1]} castShadow>
                    <boxGeometry args={[1.1, 0.25, 0.9]} />
                    <meshStandardMaterial color="#A569BD" roughness={0.9} />
                </mesh>
                <mesh position={[0.7, 0.7, 0.1]} castShadow>
                    <boxGeometry args={[1.1, 0.25, 0.9]} />
                    <meshStandardMaterial color="#A569BD" roughness={0.9} />
                </mesh>
            </group>

            {/* Floor Lamp */}
            <group position={[-3, 0, 5]}>
                {/* Base */}
                <mesh position={[0, 0.05, 0]} castShadow>
                    <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
                    <meshStandardMaterial color="#2C3E50" metalness={0.6} />
                </mesh>
                {/* Pole */}
                <mesh position={[0, 1, 0]} castShadow>
                    <cylinderGeometry args={[0.03, 0.03, 2, 8]} />
                    <meshStandardMaterial color="#2C3E50" metalness={0.6} />
                </mesh>
                {/* Lamp shade */}
                <mesh position={[0, 2.1, 0]} castShadow>
                    <coneGeometry args={[0.35, 0.4, 16, 1, true]} />
                    <meshStandardMaterial color="#FFEFD5" side={THREE.DoubleSide} />
                </mesh>
                {/* Light bulb glow */}
                <pointLight position={[0, 2, 0]} intensity={0.3} color="#FFE4B5" distance={5} />
            </group>

            {/* Small Coffee Table */}
            <group position={[0, 0, 3]}>
                <mesh position={[0, 0.35, 0]} castShadow>
                    <boxGeometry args={[1.2, 0.08, 0.8]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.5} />
                </mesh>
                {/* Legs */}
                {[[-0.5, 0.15, 0.3], [0.5, 0.15, 0.3], [-0.5, 0.15, -0.3], [0.5, 0.15, -0.3]].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]} castShadow>
                        <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
                        <meshStandardMaterial color="#5D4037" />
                    </mesh>
                ))}
                {/* Items on table */}
                <mesh position={[0.3, 0.45, 0]}>
                    <cylinderGeometry args={[0.08, 0.06, 0.12, 16]} />
                    <meshStandardMaterial color="#E74C3C" />
                </mesh>
                <mesh position={[-0.2, 0.43, 0.1]}>
                    <boxGeometry args={[0.2, 0.06, 0.15]} />
                    <meshStandardMaterial color="#3498DB" />
                </mesh>
            </group>
        </group>
    );
}
