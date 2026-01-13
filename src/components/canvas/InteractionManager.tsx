"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

const INTERACTABLE_NAMES = ["bed", "fridge", "desk", "bookshelf"];

export default function InteractionManager() {
    const setHoveredObject = useStore((state) => state.setHoveredObject);
    const openNote = useStore((state) => state.openNote);
    const isNoteOpen = useStore((state) => state.isNoteOpen);
    const hoveredObject = useStore((state) => state.hoveredObject);

    useFrame(({ camera, scene }) => {
        if (isNoteOpen) return;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera); // Center of screen

        // Raycast against all objects in scene (optimize later if needed)
        const intersects = raycaster.intersectObjects(scene.children, true);

        let found = null;
        for (let i = 0; i < intersects.length; i++) {
            const obj = intersects[i].object;

            // Check distance (max interaction distance = 3)
            if (intersects[i].distance > 3) continue;

            if (INTERACTABLE_NAMES.includes(obj.name)) {
                found = obj.name;
                break; // Found closest interactable
            }
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
                const currentNoteOpen = useStore.getState().isNoteOpen;

                if (currentHover && !currentNoteOpen) {
                    openNote(currentHover);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [openNote]);

    return null;
}
