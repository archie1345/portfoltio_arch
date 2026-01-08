import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
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
        <a href="#" target="_blank" rel="noopener noreferrer">
          LinkedIn ↘
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Telegram ↘
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Instagram ↘
        </a>
      </nav>
      <h2 className="footer-name">Archie Saskara</h2>
    </footer>
  );
};

export default Footer;
