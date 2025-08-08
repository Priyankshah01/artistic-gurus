'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const DarkVeil = dynamic(() => import('@/components/DarkVeil'), { ssr: false });
import Marquee from '@/components/Marquee';



export default function Hero() {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden text-white ">
            {/* Dark Veil Animated Background */}
            <div className="absolute inset-0 -z-10">
                <DarkVeil />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-12">
                {/* Tagline */}
                <p className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium tracking-wide uppercase backdrop-blur-sm text-white/80">
                    💻 Full-Story Creator ✏️
                </p>

                {/* Heading */}
                <h1 className="mb-6 text-2xl font-medium leading-tight sm:text-4xl md:text-5xl">

                    Where Pixels Meet Purpose <br className="hidden sm:inline" />
                    <span className='bg-gradient-to-t from-purple to-purple-500 bg-clip-text text-transparent'>Toronto's User-First Design Developer.</span>
                </h1>
            </div>
            <div className="absolute bottom-0">
                <Marquee />
            </div>
        </section>
    );
}
