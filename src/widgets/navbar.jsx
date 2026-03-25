import React, { forwardRef, useState, useEffect  } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = forwardRef((props, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.getElementsByClassName('menu-btn')[0].style.gap = '9px';
    } else {
      document.body.style.overflow = '';
      document.getElementsByClassName('menu-btn')[0].style.gap = '6px';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const transitionScroll = (scrollTarget) => {
    const content = document.getElementById('page-section');
    if (!content) return;

    const tl = gsap.timeline();

    tl.to(content, {
      opacity: 0,
      duration: 0.25,
      pointerEvents: 'none',
    })
      .to(window, {
        scrollTo: scrollTarget,
        duration: 0.8,
        ease: 'power2.inOut',
      })
      .to(content, {
        opacity: 1,
        duration: 0.25,
        pointerEvents: 'auto',
      });
  };

  const scrollToTrigger = (triggerId, anchorId, label = 'titleDone') => {
    const trigger = ScrollTrigger.getById(triggerId);

    const hasLabel = trigger && trigger.animation && trigger.animation.labels && trigger.animation.labels[label] !== undefined;

    const target = hasLabel
      ? trigger.labelToScroll(label)
      : `#${anchorId}`;

    transitionScroll(target);
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    transitionScroll(1);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="nav" ref={ref}>
        <div className="logo" onClick={scrollToTop}>
          <span>Archie</span>
          <span>Saskara</span>
        </div>

        <div className="links">
          <button onClick={() => scrollToTrigger('works', 'work-anchor')}>Works</button>
          <button onClick={() => scrollToTrigger('expertise', 'expertise-anchor')}>Expertise</button>
          <button onClick={() => scrollToTrigger('contact', 'contact-anchor')}>Contact Me</button>
      </div>

        <button
          className={`menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        
        <button onClick={() => scrollToTrigger('works', 'work-anchor')}>Works</button>
        <button onClick={() => scrollToTrigger('expertise', 'expertise-anchor')}>Expertise</button>
        <button onClick={() => scrollToTrigger('contact', 'contact-anchor')}>Contact Me</button>
      </div>
    </>
  );
});

export default Navbar;
