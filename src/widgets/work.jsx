import { useRef } from 'react';
import './work.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

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
    let mm = gsap.matchMedia();

    gsap.set(letters, { y: 120, opacity: 0 });
    gsap.set(titleRef.current, { opacity: 1 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
      scrollTrigger: {
        id: 'works',
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
      },
      '-=0.6'
    )
    .to({}, { duration: 3 });
    }); 
    
    mm.add('(max-width: 768px)', () => {
      gsap.set(letters, { y: 40, opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: 20 });

      gsap.timeline({
        scrollTrigger: {
          id: 'works',
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play reverse play reverse',
        },
      })
      .to(letters, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');

      gsap.timeline({
        scrollTrigger: {
          id: 'works',
          trigger: sectionRef.current,
          start: 'top top',
          toggleActions: 'play reverse play reverse',
        },
      })
      .to(letters, {
        y: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');
      gsap.timeline({
        scrollTrigger: {
          id: 'works',
          trigger: sectionRef.current,
          start: 'top top',
          toggleActions: 'play reverse play reverse',
        },
      })
      .to(letters, {
        y: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');
    });


    const items = gsap.utils.toArray('.work-item');

    items.forEach((item) => {
      const hoverText = item.querySelector('.work-hover-text');
      const image = item.querySelector('.work-preview');
      const desc = item.querySelector('.work-desc');

      gsap.set([image, desc], { opacity: 0, y: 10 });
      gsap.set(desc, { display: 'none' });
            
      const itemHeight = item.offsetHeight;
      gsap.set(desc, { display: 'block' });
      const expandHeight = item.offsetHeight;
      gsap.set(desc, { display: 'none' });
      gsap.set(item, { alignItems: 'center', height: itemHeight, paddingBottom: 0  });

      const hoverTl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out', duration: 0.45 },
        onReverseComplete: () => {
          gsap.set(desc, { display: 'none' });
        },
      });

      hoverTl
        .set(desc, { display: 'block' })
        .to(item, {
          height: expandHeight,
          paddingBottom: '3rem',
          alignItems: 'flex-start',
        }, 0)

        .to(hoverText, {
          opacity: 0,
          y: -10,
        }, 0)

        .to(image, {
          opacity: 1,
          y: 0,
        }, 0.05)

        .to(desc, {
          opacity: 1,
          y: 0,
        }, 0.15);

      item.addEventListener('mouseenter', () => {
        hoverTl.play();
      });

      item.addEventListener('mouseleave', () => {
        hoverTl.reverse();
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className="work" id="works" ref={sectionRef}>
      <span className="scroll-anchor" id="work-anchor"/>
      <div className="work-title" ref={titleRef}>
        {splitText('WORKS')}
      </div>

      <div className="work__wrapper" ref={contentRef}>
        <div className="work-item">
          <div className="work-left">
            <span className="work-name">FITOPIA</span>
            <p className="work-desc">
              Fitness platform with workout plans, tracking and nutrition tools.
            </p>
          </div>

          <div className="work-right">
            <span className="work-hover-text">SEE MORE</span>
            <img
              className="work-preview"
              src="/images/fitopia.jpg"
              alt="Fitopia preview"
            />
          </div>
        </div>

        <div className="work-item">
          <div className="work-left">
            <span className="work-name">CASHIT</span>
            <p className="work-desc">
              Modern finance app for expense tracking and smart budgeting.
            </p>
          </div>

          <div className="work-right">
            <span className="work-hover-text">SEE MORE</span>
            <img
              className="work-preview"
              src="/images/cashit.jpg"
              alt="Cashit preview"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Works;
