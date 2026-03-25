import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const services = [
  { id: 1, title: "UI/UX Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop", desc: "Crafting intuitive and engaging user experiences." },
  { id: 2, title: "Development", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop", desc: "Robust front-end and back-end coding solutions." },
  { id: 3, title: "Branding", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop", desc: "Building visual identities that tell a story." },
  { id: 4, title: "SEO & Growth", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop", desc: "Strategies to increase your visibility and reach." },
];

const HorizontalServices = () => {
  const containerRef = useRef(null);
  const [activeId, setActiveId] = useState(null); // Track which one is hovered

  // Handle Hover Animation
  const handleMouseEnter = (id) => {
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    setActiveId(null);
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        background: '#111',
        padding: '50px'
      }}
    >
      <div style={{ display: 'flex', width: '100%', height: '70vh', gap: '10px' }}>
        
        {services.map((service) => (
          <ServicePanel 
            key={service.id} 
            service={service} 
            isActive={activeId === service.id}
            isAnyActive={activeId !== null} // To dim non-active ones
            onEnter={() => handleMouseEnter(service.id)}
            onLeave={handleMouseLeave}
          />
        ))}

      </div>
    </div>
  );
};

// --- The Individual Panel Component ---
const ServicePanel = ({ service, isActive, isAnyActive, onEnter, onLeave }) => {
  const panelRef = useRef(null);
  const textRef = useRef(null);

  // GSAP Animation for smooth expansion
  useGSAP(() => {
    // Animate Width (Flex Grow)
    gsap.to(panelRef.current, {
      flex: isActive ? 4 : 1, // Active grows to 4x size, others stay at 1
      duration: 0.6,
      ease: "power3.inOut"
    });

    // Animate Inner Text Opacity
    if (isActive) {
      gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.4, delay: 0.2 });
    } else {
      gsap.to(textRef.current, { opacity: 0, y: 20, duration: 0.2 });
    }
  }, [isActive]); // Re-run when active state changes

  return (
    <div
      ref={panelRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        flex: 1, // Default start size
        position: 'relative',
        borderRadius: '30px',
        overflow: 'hidden',
        cursor: 'pointer',
        // If something is active but NOT me, fade me out slightly
        filter: isAnyActive && !isActive ? 'grayscale(100%) brightness(0.5)' : 'none',
        transition: 'filter 0.5s ease', // CSS transition for the filter is enough
      }}
    >
      {/* Background Image */}
      <img 
        src={service.image} 
        alt={service.title}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none' // Ensure mouse events go to the parent div
        }} 
      />
      
      {/* Overlay to make text readable */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />

      {/* Content */}
      <div 
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          right: '40px',
          color: '#fff',
        }}
      >
        {/* Title is always visible, but rotates/moves if you want */}
        <h3 style={{ 
          fontSize: '2px', 
          marginBottom: '10px', 
          whiteSpace: 'nowrap', // Prevent wrapping when narrow
        }}>
          {service.title}
        </h3>

        {/* Description - Hides/Shows based on hover */}
        <div ref={textRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>
          <p style={{ fontSize: '1.1px', lineHeight: '1.5' }}>
            {service.desc}
          </p>
          <button style={{ 
            marginTop: '15px', 
            padding: '10px 20px', 
            borderRadius: '20px', 
            border: 'none', 
            background: '#fff', 
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Explore Case
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalServices;