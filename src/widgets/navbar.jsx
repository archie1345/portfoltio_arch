import React, { forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = forwardRef((props, ref) => {

  const transitionScroll = (scrollTarget) => {
    const content = document.getElementById('page-section');
    if (!content) return;

    const tl = gsap.timeline();

    tl.to(content, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
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
      ease: 'power2.in',
      pointerEvents: 'auto',
    });
  };

  const scrollToTrigger = (id) => {
    const trigger = ScrollTrigger.getById(id);
    if (!trigger) return;

    let target;
    if (id === 'works') {
      target = trigger.start + trigger.end * 0.05;
    } else {
      target = trigger.start + trigger.end * 0.1;
    }

    transitionScroll(target);
  };

  const scrollToTop = () => {
    transitionScroll(1);
  };

  return (
    <nav className="nav" ref={ref}>
      <div
        className="logo"
        onClick={scrollToTop}
        style={{ cursor: 'pointer' }}
      >
        <span>Archie</span>
        <span>Saskara</span>
      </div>

      <div className="links">
        <button onClick={() => scrollToTrigger('about')}>About me</button>
        <button onClick={() => scrollToTrigger('works')}>Works</button>
        <button onClick={() => scrollToTrigger('expertise')}>Expertise</button>
        <button onClick={() => scrollToTrigger('contact')}>Contact Me</button>
      </div>
    </nav>
  );
});

export default Navbar;
