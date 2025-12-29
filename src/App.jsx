import React, { useEffect } from 'react';
import Navbar from './widgets/navbar';
import Hero from './widgets/hero';
import About from './widgets/about';
import Works from './widgets/work';
import Expertise from './widgets/expertise';
import Contact from './widgets/contact';
import './App.css';
import './widgets/hero.scss';
import './widgets/navbar.scss';
import './widgets/about.scss';
import './widgets/work.scss';
import './widgets/expertise.scss';
import './widgets/contact.scss';
import'./variables/main.scss';


const App = () => {
  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  }, []);

  return (
    <div>
      <Navbar />
      <div id='page-section'>
        <Hero />
        <About />
        <Works />
        <Expertise />
        <Contact />
      </div>
    </div>
  );
};

export default App;