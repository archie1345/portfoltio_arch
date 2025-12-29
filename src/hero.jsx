import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  // 1. Create a reference for the container (scope) and specific elements
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const boxRef = useRef(null);

  // 2. The useGSAP hook (safe for React)
  useGSAP(() => {
    // TIMELINE: This creates a sequence of animations
    const tl = gsap.timeline();

    // Animation A: The Title slides up and fades in
    tl.from(titleRef.current, {
      y: 100,          // Move from 100px down
      opacity: 0,      // Start invisible
      duration: 1,     // Take 1 second
      ease: "power4.out" // Smooth "physics" feel
    });

    // Animation B: The box rotates and appears
    tl.from(boxRef.current, {
      scale: 0,
      rotation: 360,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)" // Bouncy effect
    }, "-=0.5"); // Start 0.5s before the previous animation ends

    // SCROLL TRIGGER: Animate something else when we scroll down
    gsap.to(".scroll-box", {
      x: 500, // Move 500px to the right
      rotation: 360,
      scrollTrigger: {
        trigger: ".scroll-box", // When this element hits the viewport...
        start: "top 80%",       // ...at 80% down the screen
        end: "top 30%",         // ...stop when it hits 30%
        scrub: true,            // Link animation progress to scroll bar!
      }
    });

  }, { scope: containerRef }); // Scope ensures we only select elements inside this component

  return (
    <div ref={containerRef} style={{ padding: '50px', minHeight: '200vh' }}>
      
      {/* Hero Section */}
      <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 ref={titleRef} style={{ fontSize: '4px', overflow: 'hidden' }}>
          Creative Developer
        </h1>
        <p>Scroll down to see the magic...</p>
        
        <div 
          ref={boxRef} 
          style={{ width: '100px', height: '100px', background: 'orange', marginTop: '20px' }}
        ></div>
      </div>

      {/* Scroll Section */}
      <div className="scroll-box" style={{ width: '100px', height: '100px', background: 'blue', marginTop: '500px' }}>
        Scroll Me
      </div>

    </div>
  );
};

export default Hero;