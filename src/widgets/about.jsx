import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './about.scss';
import archieImage from '../assets/archie.JPG';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const boxRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  const splitText = (text) =>
  text.split('').map((char, i) => (
    <span key={i} className="about-letter">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));


  useGSAP(() => {
    const letters = titleRef.current.querySelectorAll('.about-letter');
    let mm = gsap.matchMedia();

    gsap.set(letters, { y: 120, opacity: 0 });
    gsap.set(titleRef.current, { opacity: 1 });
    gsap.set(boxRef.current, { autoAlpha: 0, y: 80 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });

    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'about',
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          
        },
      });
  
      tl.to(letters, {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        ease: 'power3.out',
        duration:.5,
      })
      .addLabel('titleDone')
      .to({}, { duration: .5 })
  
      .to(letters, {
        opacity: 0,
        y: -120,
        duration: .5,
        ease: 'power3.out',
        stagger: 0.06,
      })
  
      .to(boxRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
      })
  
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: .7,
        ease: 'power2.out',
      }, '-=0.6')
  
      .to({}, { duration: 3 })
  
      .to(boxRef.current, {
        autoAlpha: 0,
        y: -120,
        duration: .5,
        ease: 'power2.out',
      });
    });

    mm.add("(max-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "about",
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: false,
        }
      });

      tl
      .to(letters, { 
        y: 0, 
        opacity: 1, 
        stagger: 0.03, 
        duration: 1,
        ease: 'power3.out' 
      })
      .addLabel('titleDone')
      .to(boxRef.current, { 
        autoAlpha: 1, 
        y: 0, 
        duration: 0.5 
      })
      .to(contentRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5 
      }, '-=0.3');
    });

    return () => mm.revert();

}, { scope: sectionRef });


  return (
    <section className="about" ref={sectionRef} id="about">
      <h2 className="about-title" ref={titleRef}>
        {splitText('ABOUT ME')}
      </h2>

      <div className="about-dark-box" ref={boxRef}>
         <div className="about-content-inner" ref={contentRef}>
          <div className="about-grid">

            <div className="about-image-col">
              <img
                src={archieImage}
                alt="Portrait"
              />
            </div>

            <div className="about-text-main">
              <p>
                <strong>Hello</strong>, I'm Archie Saskara!<br />
                I'm a <strong>Web and Multiplatform Developer</strong> and an
                <strong> Information Systems student</strong> from Indonesia,
                currently living in Kota Malang.
              </p>
            </div>
            <div className="about-text-main">
              <p>
                I enjoy building applications for the web and across platforms,
                working mainly with <strong>React (Vite), Flutter, Firebase,
                and MongoDB</strong>. I'm especially interested in turning ideas
                into functional products through clean structure, clear logic,
                and thoughtful user experience.
              </p>
            </div>
            <div className="about-text-main">
              <p>
                I'm currently pursuing a <strong>Bachelor's degree (S1)</strong>
                in Information Systems at Brawijaya University, Faculty of
                Computer Science, in the International Class.
              </p>
            </div>

            <div className="about-text-secondary">
              <p>
                For me, software development is a process full of puzzles and
                challenges. It trains me to pay attention to details,
                understand systems deeply, and solve problems through errors
                and experimentation.
              </p>

              <p>
                Outside of coding, I'm a <strong>Taekwondo athlete</strong> and
                actively involved in campus organizations, serving as a
                Secretary and Student Human Resources Development staff in UKM
                Taekwondo Universitas Brawijaya.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
