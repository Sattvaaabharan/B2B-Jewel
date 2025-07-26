// components/HeroDiamond.js #npm install three @react-three/fiber @react-three/drei
import React, { useEffect, useState, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Icosahedron } from '@react-three/drei';

function Diamond() {
  return (
    <Icosahedron args={[1.5, 0]}>
      <meshStandardMaterial
        color="#D4AF37"
        metalness={1}
        roughness={0.2}
        envMapIntensity={1.5}
      />
    </Icosahedron>
  );
}

export default function HeroDiamond() {
  return (
    <Canvas style={{height: '400px', background: 'linear-gradient(45deg,#0f1951,#48005e)'}}>
      <ambientLight intensity={0.8} color="#fff" />
      <directionalLight intensity={2} position={[3, 5, 4]} color="#D4AF37"/>
      <Diamond />
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}
