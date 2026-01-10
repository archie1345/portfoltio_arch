import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const nameRef = useRef(null);

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="footer-letter">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  useGSAP(() => {
    const letters = nameRef.current.querySelectorAll('.footer-letter');

    gsap.set(letters, {
      y: 120,
      opacity: 0,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })
    .to(letters, {
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      stagger: {
        each: 0.04,
        from: 'center',
      },
    });

  }, { scope: footerRef });

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-contact">
        <h2>
          <a href="tel:+628813323088">
            +62&nbsp;881&nbsp;3323&nbsp;088
          </a>
        </h2>
        <h2>
          <a href="mailto:archiesaskara@gmail.com">
            ARCHIESASKARA@GMAIL.COM
          </a>
        </h2>
      </div>

      <nav className="footer-socials" aria-label="Social links">
        <a href="#">LinkedIn ↘</a>
        <a href="#">Telegram ↘</a>
        <a href="#">Instagram ↘</a>
      </nav>

      <h2 className="footer-name" ref={nameRef}>
        {splitText('Archie Saskara')}
      </h2>
    </footer>
  );
};

export default Footer;
