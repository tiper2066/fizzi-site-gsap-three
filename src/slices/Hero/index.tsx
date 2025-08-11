'use client';
import { FC } from 'react';
import { asText, Content } from '@prismicio/client'; //  asText
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import gsap from 'gsap'; //  gsap
import { useGSAP } from '@gsap/react'; //  useGSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // *************************************** ScrollTrigger

import { Bounded } from '@/components/Bounded'; //  Section 유틸리티 컴포넌트
import Button from '@/components/Button';
import { TextSplitter } from '@/components/TextSplitter';

gsap.registerPlugin(useGSAP, ScrollTrigger); // *************************************** ScrollTrigger 을 플러그인에 등록함

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
    useGSAP(() => {
        //  GSAP 인트로 애니메이션
        const introTL = gsap.timeline(); //  gsap timeline 객체 생성
        introTL
            .set('.hero', { opacity: 1 }) // 요소가 기본적이 opacity 0 이기 때문에 시작 시 보이게하기 위함
            // Live Gutsy 글자 애님
            .from('.hero-header-word', {
                scale: 3, // 3배 크기에서
                opacity: 0, // 투명한 상태에서
                ease: 'power4.in',
                delay: 0.3, // 0.3초 후에 시작
                stagger: 1, // 2개 단어 애님 사이의 간격 1초로 설정
            })
            // subheading 글자 애님
            .from(
                '.hero-subheading',
                {
                    opacity: 0, // 투명한 상태에서
                    y: 30, // 아래쪽에서 올라옴
                },
                '+=.8' // 앞 애니 종료 0.8초 후에 시작
            )
            // body 글자 애님
            .from('.hero-body', {
                opacity: 0,
                y: 10,
            })
            // button  애님
            .from('.hero-button', {
                opacity: 0,
                y: 10,
                duration: 0.6,
            });

        // *********************************************** ScrollTrigger 타임라인 설정
        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero', // 트리거 대상
                start: 'top top', // 대상의 상단이 화면 상단에 닿으면 애님 시작
                end: 'bottom bottom', // 대상의 하단이 화면 하단에 닿으면 애님 종료
                scrub: 1.5, // 부드럽데 스크롤하는 정도
                markers: true, // 스크롤 가이드 표시 여부
            },
        });
        scrollTL
            // body 텍스트의 배경을 변경하는 애님
            .fromTo(
                'body', // 스크롤하면 body 의 배경이 변경됨
                {
                    backgroundColor: '#FDE047',
                },
                {
                    backgroundColor: '#D9F99D',
                    overwrite: 'auto',
                },
                1 // 1초 지점에서 애니메이션하기
            )
            // text-side-heading 글자 애님 - 한글자씩 나타남
            .from('.text-side-heading .split-char', {
                scale: 1.3, // 1.3배 크기에서..
                y: 40, // 아래에서
                rotate: -25, // 약간 회전된 상태에서
                opacity: 0, // 투명한 상태에서
                stagger: 0.1, // 0.1초 간격으로 애님
                ease: 'back.out(3)',
                duration: 0.5, // 0.5초 동안 애님
            })
            // text-side-body 글자 애님
            .from('.text-side-body', {
                y: 20, // 아래에서 올라옴
                opacity: 0, // 투명한 상테에서
            });
    });

    return (
        //  Section 유틸리티 컴포넌트로 대체
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className='hero opacity-0'
        >
            <div className='grid'>
                <div className='grid h-screen place-items-center'>
                    <div className='grid auto-rows-min place-items-center text-center'>
                        <h1 className='hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]'>
                            <TextSplitter
                                text={asText(slice.primary.heading)}
                                wordDisplayStyle='block'
                                className='hero-header-word'
                            />
                        </h1>
                    </div>
                    <div className='hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl'>
                        <PrismicRichText field={slice.primary.subheading} />
                    </div>
                    <div className='hero-body text-2xl font-normal text-sky-950'>
                        <PrismicRichText field={slice.primary.body} />
                    </div>
                    <Button
                        buttonLink={slice.primary.button_link}
                        buttonText={slice.primary.button_text}
                        className='hero-button mt-12'
                    />
                </div>
            </div>

            <div className='grid text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2'>
                <PrismicNextImage
                    className='w-full md:hidden'
                    field={slice.primary.cans_image}
                />
                <div>
                    <h2 className='text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl'>
                        <TextSplitter
                            text={asText(slice.primary.second_heading)}
                        />
                    </h2>
                    <div className='text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950'>
                        <PrismicRichText field={slice.primary.second_body} />
                    </div>
                </div>
            </div>
        </Bounded>
    );
};

export default Hero;
