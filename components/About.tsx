'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register plugins once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const heading = headingRef.current;
        const text = textRef.current;
        if (!heading || !text) return;

        const ctx = gsap.context(() => {
            // Heading animation - Big float effect
            gsap.fromTo(heading,
                {
                    y: 120,
                    opacity: 0,
                    scale: 1.3
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 75%",
                        end: "top 25%",
                        scrub: true
                    }
                }
            );

            // Text animation - Smooth staggered reveal
            const words = text.querySelectorAll<HTMLSpanElement>('.word');
            if (words.length > 0) {
                gsap.fromTo(words,
                    {
                        y: 60,
                        opacity: 0,
                        rotationX: 15
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 1,
                        stagger: 0.04,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: text,
                            start: "top 65%",
                            end: "top 15%",
                            scrub: true
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Split text into words for animation
    const splitText = "Hi, I’m Priyank — with a developer’s logic and a designer’s heart. I craft digital experiences that feel intuitive, look beautiful, and perform effortlessly. My journey includes freelancing, co-op roles, and academic recognition in Design and Development!"
        .split(' ')
        .map((word, i) => (
            <span key={i} className="word inline-block mr-2">
                {word}
            </span>
        ));

    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-t from-black to-purple-900 relative w-full min-h-[120vh] py-20 px-6 sm:px-12 md:px-24 text-center"
        >
            <div className="max-w-4xl mx-auto h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12">
                {/* Heading with spacing */}
                <div className="mb-12 sm:mb-16 md:mb-20 px-4 sm:px-8">
                    <h1
                        ref={headingRef}
                        className="text-6xl md:text-8xl font-medium opacity-0 leading-tight bg-gradient-to-t from-white to-white-900 bg-clip-text text-transparent"
                    >
                        About ME
                    </h1>
                </div>

                {/* Image Between */}
                <div className="w-full flex justify-center mb-12 sm:mb-16">
                    <Image
                        src="/images/Me.jpg"
                        alt="Illustration representing Priyank"
                        width={800}
                        height={800}
                        className="rounded-xl shadow-lg object-cover max-h-[400px] w-full"
                    />
                </div>

                {/* Paragraph with spacing */}
                <div className="px-6 sm:px-8 md:px-12">
                    <p
                        ref={textRef}
                        className="text-xl md:text-2xl leading-relaxed"
                    >
                        {splitText}
                    </p>
                </div>
            </div>
        </section>
    );
}