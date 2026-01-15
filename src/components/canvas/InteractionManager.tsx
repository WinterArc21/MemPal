"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { useEffect, useRef, useMemo } from "react";

const INTERACTABLE_NAMES = ["bed", "fridge", "desk", "bookshelf"];
const INTERACTION_DISTANCE = 5;

export default function InteractionManager() {
    const setHoveredObject = useStore((state) => state.setHoveredObject);
    const openContainer = useStore((state) => state.openContainer);
    const activeNoteId = useStore((state) => state.activeNoteId);
    const activeContainerId = useStore((state) => state.activeContainerId);
    const hoveredObject = useStore((state) => state.hoveredObject);
    const { scene } = useThree();

    const isUIOpen = !!activeNoteId || !!activeContainerId;

    // Cache for original materials to restore after hover
    const originalMaterials = useRef<Map<THREE.Object3D, THREE.Material | THREE.Material[]>>(new Map());

    // Create glow material
    const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#4ECDC4",
        emissive: "#4ECDC4",
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8,
    }), []);

    // Apply hover effect to furniture
    useEffect(() => {
        if (isUIOpen) return;

        const applyGlow = (name: string | null) => {
            // Reset all previously glowing objects
            originalMaterials.current.forEach((material, obj) => {
                if (obj instanceof THREE.Mesh) {
                    obj.material = material as THREE.Material;
                }
            });
            originalMaterials.current.clear();

            // Apply glow to hovered object
            if (name) {
                scene.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.name === name) {
                        originalMaterials.current.set(child, child.material);
                        // Create a highlighted version of the material
                        if (Array.isArray(child.material)) {
                            child.material = child.material.map(m => {
                                const newMat = (m as THREE.MeshStandardMaterial).clone();
                                newMat.emissive = new THREE.Color("#4ECDC4");
                                newMat.emissiveIntensity = 0.15;
                                return newMat;
                            });
                        } else {
                            const mat = child.material as THREE.MeshStandardMaterial;
                            const newMat = mat.clone();
                            newMat.emissive = new THREE.Color("#4ECDC4");
                            newMat.emissiveIntensity = 0.15;
                            child.material = newMat;
                        }
                    }
                });
            }
        };

        applyGlow(hoveredObject);

        return () => {
            // Cleanup on unmount
            originalMaterials.current.forEach((material, obj) => {
                if (obj instanceof THREE.Mesh) {
                    obj.material = material as THREE.Material;
                }
            });
        };
    }, [hoveredObject, scene, isUIOpen]);

    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const center = useMemo(() => new THREE.Vector2(0, 0), []);

    useFrame(({ camera, scene }) => {
        if (isUIOpen) return;

        raycaster.setFromCamera(center, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        let found: string | null = null;
        for (let i = 0; i < intersects.length; i++) {
            const obj = intersects[i].object;

            if (intersects[i].distance > INTERACTION_DISTANCE) continue;

            let currentObj: THREE.Object3D | null = obj;
            while (currentObj) {
                if (INTERACTABLE_NAMES.includes(currentObj.name)) {
                    found = currentObj.name;
                    break;
                }
                currentObj = currentObj.parent;
            }
            if (found) break;
        }

        if (found !== hoveredObject) {
            setHoveredObject(found);
        }
    });

    // Handle Interaction Input (E key)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "e") {
                const currentHover = useStore.getState().hoveredObject;
                const state = useStore.getState();
                const isBusy = !!state.activeNoteId || !!state.activeContainerId;

                if (currentHover && !isBusy) {
                    openContainer(currentHover);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [openContainer]);

    return null;
}
