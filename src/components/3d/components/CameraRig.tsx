"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  damping?: number;
  sensitivity?: number;
}

export function CameraRig({
  damping = 0.05,
  sensitivity = 0.4,
}: CameraRigProps) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 5));

  useFrame(() => {
    // Smooth damped mouse parallax camera sway
    target.current.x = pointer.x * sensitivity;
    target.current.y = pointer.y * (sensitivity * 0.5);
    target.current.z = 5;

    camera.position.lerp(target.current, damping);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
