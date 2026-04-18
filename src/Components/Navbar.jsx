import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Background Gradient Overlay - always visible */}
            <div className="fixed top-0 left-0 w-full h-[20vh] pointer-events-none z-40" style={{ background: 'linear-gradient(to bottom, black, transparent)' }} />

            <nav className={`fixed top-0 left-0 w-screen flex justify-between items-center px-[5vw] py-[4vh] z-50 text-white transition-transform duration-500 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
                <div className="text-[1.1rem] font-bold">
                    <Link to="/">Jay Ph.D</Link>
                </div>
                <div className="flex items-center gap-9 text-[1rem] font-medium text-[#8f8f8f]">
                    <Link to="/work" className="hover:text-white transition-colors duration-300">Work</Link>
                    <Link to="/about" className="hover:text-white transition-colors duration-300">About</Link>
                    <Link to="/publications" className="hover:text-white transition-colors duration-300">Publications</Link>
                    <Link to="/raise-lab" className="hover:text-white transition-colors duration-300">RAISE Lab</Link>
                    <Link to="/contact" className="bg-gray-200 text-black px-[3vh] py-[1.2vh] rounded-[3vh] font-semibold hover:bg-white transition-colors ml-[1vh]">
                        Contact
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
