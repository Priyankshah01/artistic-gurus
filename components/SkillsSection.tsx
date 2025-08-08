'use client';

import { useState } from 'react';
import FallingText from '@/components/FallingText';



export default function SkillSection() {


    return (
        <section
            className="bg-gradient-to-t from-black to-purple-900 relative w-full min-h-[120vh] py-20 px-6 sm:px-12 md:px-24 text-center"

        >
            <div className="max-w-8xl mx-auto">
                <h2 className="text-6xl mb-16 md:text-8xl font-medium leading-tight bg-gradient-to-t from-white to-white-900 bg-clip-text text-transparent">
                    My Skillset
                </h2>
                <div className="">

                    <FallingText
                        text={`Figma UX Research Wireframing Prototyping Design Systems Accessibility (WCAG) Interaction Design HTML CSS JavaScript React Nextjs Tailwind CSS Bootstrap Webflow VS Code Git GitHub Node.js Express.js MongoDB MySQL 
PHP Nodemailer Cypress Jasmine Form Validation Accessibility Testing`}
                        trigger="hover"
                        backgroundColor="transparent"
                        wireframes={false}
                        gravity={0.56}
                        fontSize="2rem"
                        mouseConstraintStiffness={0.9}
                    />


                </div>
            </div>
        </section>
    );
}
