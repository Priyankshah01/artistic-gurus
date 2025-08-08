'use client';
import MagicBento from '@/components/MagicBento';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
// import styles from './Services.module.css'; // Optional CSS module

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Optional animation on mount
  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-purple-900"
    >
      <div className="w-full max-w-8xl mx-auto ">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium mb-10 mt-1 text-center bg-gradient-to-t from-purple to-purple-500 bg-clip-text text-transparent">
          My Services
        </h2>

        <div className="w-full max-w-4xl mx-auto">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>

        <p className="mt-12 text-lg text-purple-200 max-w-2xl mx-auto text-center">
          Discover my premium services tailored to your needs.
          I've deliver excellence with cutting-edge technology and creative solutions.
        </p>
      </div>
    </section>
  );
}