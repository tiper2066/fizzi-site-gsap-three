'use client';

import { Canvas } from '@react-three/fiber';
// import { View } from '@react-three/drei';
// import { Suspense } from 'react';
// import dynamic from 'next/dynamic';

// const Loader = dynamic(
//     () => import('@react-three/drei').then((mod) => mod.Loader),
//     { ssr: false }
// );

type Props = {};

export default function ViewCanvas({}: Props) {
    return (
        <>
            <Canvas
                style={{
                    position: 'fixed',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: 30,
                }}
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: true }}
                camera={{
                    fov: 30, // 작을 수록 큰 객체로 보임
                }}
            >
                <mesh rotation={[0.5, 0.5, 0.0]} position={[1, 0, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color={'hotpink'} />
                </mesh>
                {/* ****************************** 환경 광원 */}
                <ambientLight intensity={2} />
                {/* ****************************** 포인트 광원 */}
                <spotLight intensity={3} position={[1, 1, 1]} />
            </Canvas>
            {/* <Loader /> */}
        </>
    );
}
