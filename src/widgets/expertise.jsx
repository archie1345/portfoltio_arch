import { useRef } from 'react';
import './expertise.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import brush from '../assets/brush.svg';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="expertise-letter">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  useGSAP(() => {
    const letters = titleRef.current.querySelectorAll('.expertise-letter');
    const mm = gsap.matchMedia();

    gsap.set(letters, { y: 120, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });

    mm.add('(min-width: 769px)', () => {
      gsap.timeline({
        scrollTrigger: {
          id: 'expertise',
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        },
      })
        .to(letters, {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: 'power3.out',
        }).addLabel('titleDone')
        .to(letters, {
          opacity: 0,
          y: -120,
          stagger: 0.08,
          ease: 'power3.out',
        })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    });

    mm.add('(max-width: 768px)', () => {
      gsap.timeline({
        scrollTrigger: {
          id: 'expertise',
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      })
        .to(letters, {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: 'power3.out',
        })
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    });

    gsap.utils.toArray('.flip-card').forEach((card) => {
      const inner = card.querySelector('.flip-card-inner');
      let flipped = false;

      const tl = gsap.timeline({ paused: true });
      tl.to(inner, {
        rotateY: 180,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      const toggle = () => {
        flipped ? tl.reverse() : tl.play();
        flipped = !flipped;
      };

      card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) toggle();
      });

      card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) toggle();
      });

      card.addEventListener('click', () => {
        if (window.innerWidth <= 768) toggle();
      });
    });
  }, { scope: sectionRef });

  return (
    <section className="expertise" ref={sectionRef}>
      <span className="scroll-anchor" id="expertise-anchor"/>
      <h2 className="expertise-title" ref={titleRef}>
        {splitText('EXPERTISE')}
      </h2>

      <div className="expertise__wrapper" ref={contentRef}>
        <div className="expertise-grid">
          {[
            ['UI / UX DESIGN', brush, 'Wireframes, user flows, usability testing, interaction design.'],
            ['WEB DESIGN', 'web', 'Responsive layouts, design systems, visual identity.'],
            ['DEVELOPMENT', 'dev', 'React, GSAP animations, performance optimization.'],
          ].map(([front, bg, back]) => (
            <div className="flip-card" key={front}>
              <div className="flip-card-inner">
                <div className="flip-card-front" style={{ '--bg-image': `url(${bg})` }}>{front}</div>
                <div className="flip-card-back">{back}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;