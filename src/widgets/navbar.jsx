import React,{forwardRef} from "react";

const Navbar = forwardRef((props,ref) => {
    return (
        <nav className="nav" ref={ref}>
            <div className="logo">
                <span>Archie</span>
                <span>Saskara</span>
            </div>
            <div className="links">
                <a href="#about" style={{ color: 'currentColor', textDecoration: 'inherit' }}>About me</a>
                <a href="#works" style={{ color: 'currentColor', textDecoration: 'inherit' }}>Works</a>
                <a href="#expertise" style={{ color: 'currentColor', textDecoration: 'inherit' }}>Expertise</a>
                <a href="#contact" style={{ color: 'currentColor', textDecoration: 'inherit' }}>Contact Me</a>
            </div>
        </nav>
    );
});

export default Navbar;