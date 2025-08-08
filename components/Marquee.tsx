'use client';

import { useState } from 'react';
import Image from 'next/image';

const logos = [
  '/logos/hrxconnect_logo_w.svg',
  '/logos/codezeros_logo_w.svg',
  '/logos/webclues_logo.svg',
  '/logos/humber_logo_w.png',
  '/logos/canstem_logo_w.svg',
];

export default function LogoMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (


    <div
      className="relative w-240 bg-transparent overflow-hidden py-8 "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex">
        {/* First Set (Visible) */}
        <div
          className={`flex gap-16 items-center whitespace-nowrap px-8 animate-marquee ${
            isPaused ? 'paused' : ''
          }`}
        >
          {logos.map((logo, idx) => (
            <LogoItem key={`first-${idx}`} logo={logo} />
          ))}
        </div>
        
        {/* Second Set (Clone for seamless loop) */}
        <div
          className={`flex gap-16 items-center whitespace-nowrap px-8 animate-marquee ${
            isPaused ? 'paused' : ''
          }`}
          aria-hidden="true"
        >
          {logos.map((logo, idx) => (
            <LogoItem key={`second-${idx}`} logo={logo} />
          ))}
        </div>
      </div>
<h3 className="mt-6 px-5 py-2 text-sm font-medium tracking-wide uppercase backdrop-blur-sm text-white/60 mx-auto text-center w-fit">
  4+ years in eCommerce · Gaming · Finance · Telecom
</h3>

    </div>
    
  );
}

function LogoItem({ logo }: { logo: string }) {
  return (
    <div className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200">
      <Image
        src={logo}
        alt=""
        width={100}
        height={60}
        className="grayscale hover:grayscale-0 transition duration-300"
      />
    </div>

  );
}
    