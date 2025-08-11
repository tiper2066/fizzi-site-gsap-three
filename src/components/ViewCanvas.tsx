'use client';

import { Canvas } from '@react-three/fiber';
// import { SodaCan } from './SodaCan'; //  3D 모델 ******************** 제거
import { Environment } from '@react-three/drei'; //  3D 모델을 위한 three.js 함수 **************** Float 제거
import FloatingCan from './FloatingCan'; // ******************************* 캔 컴포넌트

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
                {/* *********************  SodaCan 컴포넌트와 플로팅 애니메이션 설정 */}
                <FloatingCan />

                {/* <Float // ********************************************* 컴포넌트화 했으니 제거함 
                    speed={1} // 움직임 애니메이션 속도, 기본값은 1
                    rotationIntensity={2} // XYZ 회전 강도, 기본값은 1
                    floatIntensity={1} // Up/down 강도, floatingRange와 함께 사용되며 기본값은 1
                    floatingRange={[-0.1, 0.1]} // 위 아래로 움직이는 범위, 기본값 [-0.1, 0.1]
                >
                    <SodaCan />
                </Float> */}
                {/*  HDRS 조명을 위한 이미지 적용  */}
                <Environment
                    files='/hdrs/lobby.hdr'
                    environmentIntensity={1.5}
                />
            </Canvas>
            {/* <Loader /> */}
        </>
    );
}
