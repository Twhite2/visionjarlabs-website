import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const StarField = () => {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (group.current) {
      // Slowly rotate the group
      group.current.rotation.y += 0.0005;
      group.current.rotation.x += 0.0002;
      
      // Interactive parallax based on pointer
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, (pointer.x * 2), 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (pointer.y * 2), 0.05);
    }
  });

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

export const InteractiveBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
};
