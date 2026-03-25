import React from 'react';
import { useCopy } from './copyContext';
import './hero.scss';
import archieImage from '../assets/archie.JPG';


const Hero = () => {
  const { copy } = useCopy();

  const handleCopy = (e) => {
    e.preventDefault();
    copy('archiesaskara@gmail.com', e);
  };

  const wordAnimation = (word, delayStart) => {
    return word.split('').map((char, i) => (
      <span
        key={i}
        className="hero-letter"
        style={{ transitionDelay: `${delayStart + i * 0.05}s` }}
      >
        {char}
      </span>
    ));
  };

  const additionalTitle = () => {
    if (window.innerWidth <= 768) {
    return (
      <div className="hero-word">
        <span className="hero-word-additional">BASED IN INDONESIA</span>
      </div>
      );
    };
  };
  return (
    <section className="hero">
      <div className="hero__wrapper">
        
        <h1 className="hero-title">
          <div className="hero-word">
            <span className="hero-word-text">{wordAnimation('SOFTWARE', 0)}</span>
          </div>
          <div className="hero-word">
            <span className="hero-word-text">{wordAnimation('BUILDER', 0.4)}</span>
          </div>
          {additionalTitle()}
        </h1>

        <div className="hero-main-content">
          <div className="hero-visual-group">

            <div className="hero-gray-box"></div>

            <div className="hero-taglines">
              <div className="overflow-line"><span>/ PRODUCT-FOCUSED</span></div>
              <div className="overflow-line"><span>/ ITERATIVE DEVELOPMENT</span></div>
            </div>

            <div className="hero-designer">
              <div className="hero-designer__img">
                <img src={archieImage} alt="Archie Saskara" />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-description-centered">
          <div className="overflow-line">
            <p>I BUILD CLEAN, FUNCTIONAL WEB AND CROSS-PLATFORM
              <br></br>
              APPLICATIONS THROUGH ITERATION AND PROBLEM-SOLVING</p>
          </div>
        </div>

        <div className="hero-bottom-row">
            <div className="hero-recent">
                <span>RECENT WORK ↘</span>
                <span>FITOPIA</span>
            </div>
            <a href="mailto:archiesaskara@gmail.com" className="hero-collab" onClick={handleCopy}>
                <span>AVAILABLE FOR COLLABORATION ↘</span>
                <span className="link-line">ARCHIESASKARA@GMAIL.COM</span>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;