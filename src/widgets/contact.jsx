import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="contact-letter">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  useGSAP(() => {
    const letters = titleRef.current.querySelectorAll('.contact-letter');
   
    gsap.set(letters, { y: 120, opacity: 0 });
    gsap.set(titleRef.current, { opacity: 1 });
    gsap.set(contentRef.current, { opacity: 0, y: 20, pointerEvents: 'none' });
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'contact',
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
      duration: 0.5,
    })
    .addLabel('titleDone')
    .to({}, { duration: 0.5 })
    .to(letters, {
      opacity: 0,
      y: -120,
      ease: 'power3.out',
      duration: 0.5,
      stagger: 0.08,
    })
    .to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        pointerEvents: 'auto',
      },
      '-=0.6'
    )
    .to({}, { duration: 3 });
  }, { scope: sectionRef });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);

    alert('Message sent successfully!');
    e.target.reset();
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
        <span className="scroll-anchor" id="contact-anchor"/>
        <h2 className="contact-title" ref={titleRef}>
          <span className="line">
            {splitText("LET'S START THE")}
          </span>
          <span className="line">
            {splitText("CONVERSATION")}
          </span>
        </h2>
      <div className="contact__wrapper" ref={contentRef}>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h1>LET'S TALK</h1>
          <div className="input-group">
            <label>YOUR NAME*</label>
            <input type="text" name="name" required />
          </div>

          <div className="input-group">
            <label>PHONE*</label>
            <input type="tel" name="phone" required />
          </div>

          <div className="input-group">
            <label>YOUR EMAIL*</label>
            <input type="email" name="email" required />
          </div>

          <div className="input-group">
            <label>HOW CAN I HELP YOU?</label>
            <textarea name="message" rows="4" />
          </div>

          <button type="submit" className="submit-btn">
            START DISCUSSION ↘
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
