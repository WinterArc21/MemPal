"use client";

import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";

const MOVEMENT_SPEED = 5;
const JUMP_FORCE = 5;
const ROTATION_SPEED = 10;

// Stylized Cartoon Character with rounded features
function StylizedCharacter({ characterRef }: { characterRef: React.RefObject<THREE.Group | null> }) {
    // Create gradient-like materials
    const skinMaterial = new THREE.MeshStandardMaterial({
        color: "#FFDAB9",
        roughness: 0.6,
        metalness: 0.1
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
        color: "#5D3A1A",
        roughness: 0.8
    });

    const shirtMaterial = new THREE.MeshStandardMaterial({
        color: "#FF6B6B",
        roughness: 0.5,
        metalness: 0.1
    });

    const pantsMaterial = new THREE.MeshStandardMaterial({
        color: "#4ECDC4",
        roughness: 0.6
    });

    const shoeMaterial = new THREE.MeshStandardMaterial({
        color: "#2C3E50",
        roughness: 0.4,
        metalness: 0.2
    });

    return (
        <group ref={characterRef}>
            {/* HEAD - Rounded sphere */}
            <mesh position={[0, 1.65, 0]} castShadow material={skinMaterial}>
                <sphereGeometry args={[0.28, 32, 32]} />
            </mesh>

            {/* HAIR - Styled puff on top */}
            <mesh position={[0, 1.88, -0.02]} castShadow material={hairMaterial}>
                <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
            <mesh position={[0, 1.75, -0.15]} castShadow material={hairMaterial}>
                <sphereGeometry args={[0.22, 16, 16]} />
            </mesh>

            {/* EYES - Big cartoon eyes */}
            <group position={[0, 1.68, 0.18]}>
                {/* Left eye white */}
                <mesh position={[-0.09, 0, 0]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Left pupil */}
                <mesh position={[-0.09, 0, 0.04]}>
                    <sphereGeometry args={[0.035, 16, 16]} />
                    <meshStandardMaterial color="#2C3E50" />
                </mesh>
                {/* Left eye shine */}
                <mesh position={[-0.07, 0.02, 0.055]}>
                    <sphereGeometry args={[0.012, 8, 8]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
                </mesh>

                {/* Right eye white */}
                <mesh position={[0.09, 0, 0]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Right pupil */}
                <mesh position={[0.09, 0, 0.04]}>
                    <sphereGeometry args={[0.035, 16, 16]} />
                    <meshStandardMaterial color="#2C3E50" />
                </mesh>
                {/* Right eye shine */}
                <mesh position={[0.11, 0.02, 0.055]}>
                    <sphereGeometry args={[0.012, 8, 8]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
                </mesh>
            </group>

            {/* MOUTH - Cute smile */}
            <mesh position={[0, 1.55, 0.22]} rotation={[0.3, 0, 0]}>
                <torusGeometry args={[0.04, 0.012, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#D35400" />
            </mesh>

            {/* BLUSH - Cheek circles */}
            <mesh position={[-0.18, 1.6, 0.12]}>
                <circleGeometry args={[0.04, 16]} />
                <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0.18, 1.6, 0.12]}>
                <circleGeometry args={[0.04, 16]} />
                <meshStandardMaterial color="#FFB6C1" transparent opacity={0.6} />
            </mesh>

            {/* NECK */}
            <mesh position={[0, 1.4, 0]} castShadow material={skinMaterial}>
                <cylinderGeometry args={[0.08, 0.1, 0.1, 16]} />
            </mesh>

            {/* TORSO - Rounded capsule shape */}
            <mesh position={[0, 1.05, 0]} castShadow material={shirtMaterial}>
                <capsuleGeometry args={[0.22, 0.45, 8, 16]} />
            </mesh>

            {/* Shirt collar */}
            <mesh position={[0, 1.32, 0.08]} rotation={[-0.3, 0, 0]}>
                <torusGeometry args={[0.12, 0.03, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#E74C3C" />
            </mesh>

            {/* LEFT ARM */}
            <group position={[-0.32, 1.15, 0]} name="left-arm">
                {/* Upper arm */}
                <mesh position={[0, -0.08, 0]} castShadow material={shirtMaterial}>
                    <capsuleGeometry args={[0.07, 0.15, 8, 16]} />
                </mesh>
                {/* Lower arm (skin) */}
                <mesh position={[0, -0.28, 0]} castShadow material={skinMaterial}>
                    <capsuleGeometry args={[0.06, 0.15, 8, 16]} />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.42, 0]} castShadow material={skinMaterial}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                </mesh>
            </group>

            {/* RIGHT ARM */}
            <group position={[0.32, 1.15, 0]} name="right-arm">
                <mesh position={[0, -0.08, 0]} castShadow material={shirtMaterial}>
                    <capsuleGeometry args={[0.07, 0.15, 8, 16]} />
                </mesh>
                <mesh position={[0, -0.28, 0]} castShadow material={skinMaterial}>
                    <capsuleGeometry args={[0.06, 0.15, 8, 16]} />
                </mesh>
                <mesh position={[0, -0.42, 0]} castShadow material={skinMaterial}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                </mesh>
            </group>

            {/* LEFT LEG */}
            <group position={[-0.12, 0.55, 0]} name="left-leg">
                {/* Upper leg */}
                <mesh position={[0, 0, 0]} castShadow material={pantsMaterial}>
                    <capsuleGeometry args={[0.09, 0.25, 8, 16]} />
                </mesh>
                {/* Lower leg */}
                <mesh position={[0, -0.3, 0]} castShadow material={pantsMaterial}>
                    <capsuleGeometry args={[0.07, 0.2, 8, 16]} />
                </mesh>
                {/* Shoe */}
                <mesh position={[0, -0.5, 0.04]} castShadow material={shoeMaterial}>
                    <boxGeometry args={[0.12, 0.1, 0.2]} />
                </mesh>
            </group>

            {/* RIGHT LEG */}
            <group position={[0.12, 0.55, 0]} name="right-leg">
                <mesh position={[0, 0, 0]} castShadow material={pantsMaterial}>
                    <capsuleGeometry args={[0.09, 0.25, 8, 16]} />
                </mesh>
                <mesh position={[0, -0.3, 0]} castShadow material={pantsMaterial}>
                    <capsuleGeometry args={[0.07, 0.2, 8, 16]} />
                </mesh>
                <mesh position={[0, -0.5, 0.04]} castShadow material={shoeMaterial}>
                    <boxGeometry args={[0.12, 0.1, 0.2]} />
                </mesh>
            </group>

            {/* BACKPACK */}
            <group position={[0, 1.05, -0.22]}>
                {/* Main bag */}
                <mesh castShadow>
                    <boxGeometry args={[0.35, 0.4, 0.18]} />
                    <meshStandardMaterial color="#3498DB" roughness={0.6} />
                </mesh>
                {/* Top flap */}
                <mesh position={[0, 0.22, 0.02]} castShadow>
                    <boxGeometry args={[0.36, 0.08, 0.2]} />
                    <meshStandardMaterial color="#2980B9" roughness={0.6} />
                </mesh>
                {/* Pocket */}
                <mesh position={[0, -0.05, 0.1]}>
                    <boxGeometry args={[0.25, 0.2, 0.02]} />
                    <meshStandardMaterial color="#2980B9" />
                </mesh>
                {/* Straps */}
                <mesh position={[-0.12, 0.1, 0.12]} rotation={[0.2, 0, 0]}>
                    <boxGeometry args={[0.04, 0.35, 0.02]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>
                <mesh position={[0.12, 0.1, 0.12]} rotation={[0.2, 0, 0]}>
                    <boxGeometry args={[0.04, 0.35, 0.02]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>
            </group>

            {/* WATCH on left wrist */}
            <mesh position={[-0.32, 0.85, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
                <meshStandardMaterial color="#2C3E50" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[-0.32, 0.85, 0.02]}>
                <circleGeometry args={[0.03, 16]} />
                <meshStandardMaterial color="#4ECDC4" emissive="#4ECDC4" emissiveIntensity={0.2} />
            </mesh>
        </group>
    );
}

export default function Character() {
    const rigidBodyRef = useRef<any>(null);
    const characterRef = useRef<THREE.Group>(null);
    const [, getKeys] = useKeyboardControls();
    const { camera } = useThree();

    const [cameraOffset] = useState(new THREE.Vector3(0, 3.5, 6));
    const [cameraTarget] = useState(new THREE.Vector3(0, 1.2, 0));

    useFrame((state, delta) => {
        const body = rigidBodyRef.current;
        if (!body) return;

        const { forward, backward, left, right, jump } = getKeys();
        const linvel = body.linvel();

        let moveX = 0;
        let moveZ = 0;

        if (forward) moveZ -= MOVEMENT_SPEED;
        if (backward) moveZ += MOVEMENT_SPEED;
        if (left) moveX -= MOVEMENT_SPEED;
        if (right) moveX += MOVEMENT_SPEED;

        if (moveX !== 0 && moveZ !== 0) {
            moveX *= 0.707;
            moveZ *= 0.707;
        }

        body.setLinvel({ x: moveX, y: linvel.y, z: moveZ }, true);

        if (jump && Math.abs(linvel.y) < 0.1) {
            body.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true);
        }

        // Character rotation
        const moveDir = new THREE.Vector3(moveX, 0, moveZ);
        if (moveDir.length() > 0.01 && characterRef.current) {
            const angle = Math.atan2(moveX, moveZ);
            const targetRotation = new THREE.Quaternion();
            targetRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            characterRef.current.quaternion.slerp(targetRotation, ROTATION_SPEED * delta);
        }

        // Animate limbs with smooth motion
        const isMoving = Math.abs(moveX) > 0.1 || Math.abs(moveZ) > 0.1;
        if (characterRef.current) {
            const leftLeg = characterRef.current.getObjectByName("left-leg");
            const rightLeg = characterRef.current.getObjectByName("right-leg");
            const leftArm = characterRef.current.getObjectByName("left-arm");
            const rightArm = characterRef.current.getObjectByName("right-arm");

            if (leftLeg && rightLeg && leftArm && rightArm) {
                const t = state.clock.getElapsedTime();

                if (isMoving) {
                    // Bouncy walk animation
                    const legSwing = Math.sin(t * 14) * 0.5;
                    const armSwing = Math.sin(t * 14) * 0.35;
                    const bounce = Math.abs(Math.sin(t * 14)) * 0.03;

                    leftLeg.rotation.x = legSwing;
                    rightLeg.rotation.x = -legSwing;
                    leftArm.rotation.x = -armSwing;
                    rightArm.rotation.x = armSwing;

                    // Body bounce
                    characterRef.current.position.y = bounce;
                } else {
                    // Idle breathing animation
                    const breath = Math.sin(t * 2) * 0.015;
                    const sway = Math.sin(t * 1.5) * 0.02;

                    leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, 0, 0.1);
                    rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, 0, 0.1);
                    leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, sway, 0.1);
                    rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -sway, 0.1);

                    characterRef.current.position.y = THREE.MathUtils.lerp(characterRef.current.position.y, breath, 0.1);
                }
            }
        }

        // Camera follow
        const bodyPos = body.translation();
        const characterPos = new THREE.Vector3(bodyPos.x, bodyPos.y, bodyPos.z);
        const desiredCamPos = characterPos.clone().add(cameraOffset);

        camera.position.lerp(desiredCamPos, 0.06);
        cameraTarget.lerp(characterPos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0.08);
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
            <CapsuleCollider args={[0.5, 0.35]} position={[0, 0.9, 0]} />
            <StylizedCharacter characterRef={characterRef} />
        </RigidBody>
    );
}
