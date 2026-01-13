"use client";

import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

const MOVEMENT_SPEED = 5;
const JUMP_FORCE = 5;
const ROTATION_SPEED = 8;

// Blocky Character Component (Minecraft-style)
function BlockyCharacter({ characterRef }: { characterRef: React.RefObject<THREE.Group | null> }) {
    return (
        <group ref={characterRef}>
            {/* HEAD */}
            <mesh position={[0, 1.6, 0]} castShadow>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#FFD93D" /> {/* Warm skin tone */}
            </mesh>

            {/* Face - Eyes */}
            <mesh position={[-0.12, 1.65, 0.26]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial color="#1a1a2e" />
            </mesh>
            <mesh position={[0.12, 1.65, 0.26]}>
                <boxGeometry args={[0.08, 0.08, 0.02]} />
                <meshStandardMaterial color="#1a1a2e" />
            </mesh>

            {/* Face - Mouth */}
            <mesh position={[0, 1.5, 0.26]}>
                <boxGeometry args={[0.15, 0.04, 0.02]} />
                <meshStandardMaterial color="#e74c3c" />
            </mesh>

            {/* Hair */}
            <mesh position={[0, 1.85, -0.05]} castShadow>
                <boxGeometry args={[0.52, 0.15, 0.55]} />
                <meshStandardMaterial color="#4a2c2a" />
            </mesh>

            {/* TORSO */}
            <mesh position={[0, 1.0, 0]} castShadow>
                <boxGeometry args={[0.6, 0.7, 0.35]} />
                <meshStandardMaterial color="#6C63FF" /> {/* Purple shirt */}
            </mesh>

            {/* Shirt Detail - Collar */}
            <mesh position={[0, 1.3, 0.1]}>
                <boxGeometry args={[0.25, 0.08, 0.2]} />
                <meshStandardMaterial color="#5a52e0" />
            </mesh>

            {/* LEFT ARM */}
            <group position={[-0.42, 1.0, 0]}>
                <mesh name="left-arm" position={[0, 0, 0]} castShadow>
                    <boxGeometry args={[0.22, 0.65, 0.25]} />
                    <meshStandardMaterial color="#FFD93D" />
                </mesh>
                {/* Sleeve */}
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[0.24, 0.25, 0.27]} />
                    <meshStandardMaterial color="#6C63FF" />
                </mesh>
            </group>

            {/* RIGHT ARM */}
            <group position={[0.42, 1.0, 0]}>
                <mesh name="right-arm" position={[0, 0, 0]} castShadow>
                    <boxGeometry args={[0.22, 0.65, 0.25]} />
                    <meshStandardMaterial color="#FFD93D" />
                </mesh>
                {/* Sleeve */}
                <mesh position={[0, 0.2, 0]}>
                    <boxGeometry args={[0.24, 0.25, 0.27]} />
                    <meshStandardMaterial color="#6C63FF" />
                </mesh>
            </group>

            {/* LEFT LEG */}
            <mesh name="left-leg" position={[-0.15, 0.35, 0]} castShadow>
                <boxGeometry args={[0.25, 0.7, 0.28]} />
                <meshStandardMaterial color="#2C3E50" /> {/* Dark jeans */}
            </mesh>
            {/* Left Shoe */}
            <mesh position={[-0.15, 0.05, 0.05]}>
                <boxGeometry args={[0.26, 0.12, 0.35]} />
                <meshStandardMaterial color="#1a1a2e" />
            </mesh>

            {/* RIGHT LEG */}
            <mesh name="right-leg" position={[0.15, 0.35, 0]} castShadow>
                <boxGeometry args={[0.25, 0.7, 0.28]} />
                <meshStandardMaterial color="#2C3E50" />
            </mesh>
            {/* Right Shoe */}
            <mesh position={[0.15, 0.05, 0.05]}>
                <boxGeometry args={[0.26, 0.12, 0.35]} />
                <meshStandardMaterial color="#1a1a2e" />
            </mesh>
        </group>
    );
}

export default function Character() {
    const rigidBodyRef = useRef<any>(null);
    const characterRef = useRef<THREE.Group>(null);
    const [, getKeys] = useKeyboardControls();
    const { camera } = useThree();

    const [cameraOffset] = useState(new THREE.Vector3(0, 4, 8));
    const [cameraTarget] = useState(new THREE.Vector3(0, 1.2, 0));

    useFrame((state, delta) => {
        const body = rigidBodyRef.current;
        if (!body) return;

        const { forward, backward, left, right, jump } = getKeys();
        const linvel = body.linvel();

        // Movement calculation
        let moveX = 0;
        let moveZ = 0;

        if (forward) moveZ -= MOVEMENT_SPEED;
        if (backward) moveZ += MOVEMENT_SPEED;
        if (left) moveX -= MOVEMENT_SPEED;
        if (right) moveX += MOVEMENT_SPEED;

        // Normalize diagonal movement
        if (moveX !== 0 && moveZ !== 0) {
            moveX *= 0.707;
            moveZ *= 0.707;
        }

        body.setLinvel({ x: moveX, y: linvel.y, z: moveZ }, true);

        // Jump
        if (jump && Math.abs(linvel.y) < 0.1) {
            body.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
        }

        // Character Rotation (Face movement direction)
        const moveDir = new THREE.Vector3(moveX, 0, moveZ);
        if (moveDir.length() > 0.01 && characterRef.current) {
            const angle = Math.atan2(moveX, moveZ);
            const targetRotation = new THREE.Quaternion();
            targetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            characterRef.current.quaternion.slerp(targetRotation, ROTATION_SPEED * delta);
        }

        // Animate limbs
        const isMoving = Math.abs(moveX) > 0.1 || Math.abs(moveZ) > 0.1;
        if (characterRef.current) {
            const leftLeg = characterRef.current.getObjectByName("left-leg");
            const rightLeg = characterRef.current.getObjectByName("right-leg");
            const leftArm = characterRef.current.getObjectByName("left-arm");
            const rightArm = characterRef.current.getObjectByName("right-arm");

            if (leftLeg && rightLeg && leftArm && rightArm) {
                const t = state.clock.getElapsedTime();

                if (isMoving) {
                    // Walking animation
                    const legSwing = Math.sin(t * 12) * 0.6;
                    const armSwing = Math.sin(t * 12) * 0.4;

                    leftLeg.rotation.x = legSwing;
                    rightLeg.rotation.x = -legSwing;
                    leftArm.rotation.x = -armSwing;
                    rightArm.rotation.x = armSwing;
                } else {
                    // Idle - gentle sway
                    const idle = Math.sin(t * 2) * 0.05;
                    leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, idle, 0.1);
                    rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, -idle, 0.1);
                    leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, 0, 0.1);
                    rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, 0, 0.1);
                }
            }
        }

        // Camera Follow
        const bodyPos = body.translation();
        const characterPos = new THREE.Vector3(bodyPos.x, bodyPos.y, bodyPos.z);
        const desiredCamPos = characterPos.clone().add(cameraOffset);

        camera.position.lerp(desiredCamPos, 0.08);
        cameraTarget.lerp(characterPos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0.1);
        camera.lookAt(cameraTarget);
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            colliders={false}
            enabledRotations={[false, false, false]}
            position={[0, 2, 0]}
            friction={1}
            linearDamping={0.5}
        >
            <CapsuleCollider args={[0.6, 0.4]} position={[0, 1, 0]} />
            <BlockyCharacter characterRef={characterRef} />
        </RigidBody>
    );
}
