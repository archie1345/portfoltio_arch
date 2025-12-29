import React from 'react';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="hero__wrapper">
        <h2 className="contact-headline">LET'S START THE CONVERSATION</h2>
        
        <form className="contact-form">
          <div className="input-group">
            <label>YOUR NAME*</label>
            <input type="text" />
          </div>
          <div className="input-group">
            <label>PHONE*</label>
            <input type="tel" />
          </div>
          <div className="input-group">
            <label>YOUR EMAIL*</label>
            <input type="email" />
          </div>
          <div className="input-group">
            <label>HOW CAN I HELP YOU?</label>
            <textarea rows="4"></textarea>
          </div>
          
          <button type="button" className="submit-btn">
            START DISCUSSION ↘
          </button>
        </form>

        <div className="footer-info">
          <div className="footer-contact">
            <h2>+62 881 3323 088</h2>
            <h2>ARCHIESASKARA@GMAIL.COM</h2>
          </div>
          <div className="footer-socials">
            <a href="#">LINKEDIN ↘</a>
            <a href="#">TELEGRAM ↘</a>
            <a href="#">INSTAGRAM ↘</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;