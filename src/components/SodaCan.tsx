'use client';

import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/models/Soda-can.gltf'); // 3D 모델 사전 로딩
// 캔 모델에 입혀진 텍스춰 이미지
const flavorTextures = {
    lemonLime: '/labels/lemon-lime.png',
    grape: '/labels/grape.png',
    blackCherry: '/labels/cherry.png',
    strawberryLemonade: '/labels/strawberry.png',
    watermelon: '/labels/watermelon.png',
};

const metalMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.3,
    metalness: 1,
    color: '#bbbbbb',
});

export type SodaCanProps = {
    flavor?: keyof typeof flavorTextures;
    scale?: number;
};

export function SodaCan({
    flavor = 'blackCherry',
    scale = 2,
    ...props
}: SodaCanProps) {
    const { nodes } = useGLTF('/models/Soda-can.gltf');

    const labels = useTexture(flavorTextures);

    // Fixes upside down labels
    labels.strawberryLemonade.flipY = false;
    labels.blackCherry.flipY = false;
    labels.watermelon.flipY = false;
    labels.grape.flipY = false;
    labels.lemonLime.flipY = false;

    const label = labels[flavor];

    return (
        <group
            {...props}
            dispose={null}
            scale={scale}
            rotation={[0, -Math.PI, 0]}
        >
            {/* 3D 모델의 캔 둥근 부분 메탈 질감 적용 부분  */}
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.cylinder as THREE.Mesh).geometry}
                material={metalMaterial}
            />
            {/* 3D 모델의 라벨 이미지 적용 부분  */}
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
            >
                <meshStandardMaterial
                    roughness={0.15}
                    metalness={0.7}
                    map={label}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes.Tab as THREE.Mesh).geometry}
                material={metalMaterial}
            />
        </group>
    );
}
