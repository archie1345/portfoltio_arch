import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import emailjs from '@emailjs/browser';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArrowIcon from '../assets/ArrowIcon';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [status, setStatus] = useState('idle');
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

  const form = e.target;
  setStatus('loading');

  emailjs
    .sendForm(
      'service_Archie_port',
      'template_hhjqamo',
      form,
      'U32f2MUwwgu56Wf5p'
    )
    .then((res) => {
      console.log('EMAIL SENT', res.status, res.text);
      setStatus('success');
      form.reset();
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    })
    .catch((err) => {
      console.error('EMAIL FAILED', err);
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    });
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
            <label>YOUR NAME</label>
            <input type="text" name="name" required />
          </div>

          <div className="input-group">
            <label>PHONE</label>
            <input type="tel" name="phone" />
          </div>

          <div className="input-group">
            <label>YOUR EMAIL</label>
            <input type="email" name="email" required />
          </div>

          <div className="input-group">
            <label>HOW CAN I HELP YOU?</label>
            <textarea name="message" rows="4" />
          </div>

          <button type="submit" className="submit-btn" disabled={status === 'loading'}>
            {status === 'loading' && 'SENDING...'}
            {status === 'success' && 'SENT'}
            {status === 'idle' && (
              <>
                START DISCUSSION <ArrowIcon />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
