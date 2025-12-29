import { useRef } from 'react';
import './work.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="work-letter">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  useGSAP(() => {
    const letters = titleRef.current.querySelectorAll('.work-letter');

    gsap.set(letters, { y: 120, opacity: 0 });
    gsap.set(titleRef.current, { opacity: 1 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'works',
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        markers: true,
      },
    });

    tl.to(letters, {
      y: 0,
      opacity: 1,
      stagger: 0.06,
      ease: 'power3.out',
      duration: .5,
    })

    .to({}, { duration: 0.5 })

    .to(letters, {
      opacity: 0,
      y: -120,
      ease: 'power3.out',
      duration: .5,
      stagger: 0.08,
    })

    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.6')

    .to({}, { duration: 3 })

    .to(contentRef.current, {
      opacity: 0,
      y: -120,
      duration: .5,
    });

  }, { scope: sectionRef });

  return (
    <section className="work" id="works" ref={sectionRef}>
      <div className="work-title" ref={titleRef}>
        {splitText('WORKS')}
      </div>

      <div className="work__wrapper" ref={contentRef}>
        <div className="work-item">
          <span className="work-name">FITOPIA</span>
          <span className="work-hover-text">HOVER TO SEE MORE</span>
        </div>

        <div className="work-item">
          <span className="work-name">CASHIT</span>
          <span className="work-hover-text">HOVER TO SEE MORE</span>
        </div>
      </div>
    </section>
  );
};

export default Works;