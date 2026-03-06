'use client'
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

export function RotatingForms() {
    const group = React.useRef({} as THREE.Group);

    useFrame((state) => {
        group.current.rotation.y = state.clock.elapsedTime * 0.25;
        group.current.rotation.x = state.clock.elapsedTime * 0.15;
    });

    return (
        <group ref={group}>
            <mesh position={[-1.5, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#e5e5e5" />
            </mesh>

            <mesh position={[1.5, 0, 0]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial color="#d4d4d4" />
            </mesh>

            <mesh position={[0, 1.4, 0]}>
                <torusGeometry args={[0.6, 0.2, 16, 32]} />
                <meshStandardMaterial color="#cfcfcf" />
            </mesh>
        </group>
    );
}