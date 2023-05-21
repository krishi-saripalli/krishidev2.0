"use client"

import { Canvas } from "@react-three/fiber";
import Blob from ".";

export default function Animation() {
  return (
    <Canvas camera={{ position: [0.0, 0.0, 8.0] }}>
      <Blob />
    </Canvas>
  );
}