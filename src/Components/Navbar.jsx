import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

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

    const handleLinkEnter = (e) => {
        const el = e.currentTarget;
        const top = el.querySelector('.link-text-top');
        const bot = el.querySelector('.link-text-bot');
        if (top && bot) {
            gsap.to(top, { yPercent: -100, duration: 0.3, ease: 'power2.inOut' });
            gsap.to(bot, { yPercent: -100, duration: 0.3, ease: 'power2.inOut' });
        }
    };
    const handleLinkLeave = (e) => {
        const el = e.currentTarget;
        const top = el.querySelector('.link-text-top');
        const bot = el.querySelector('.link-text-bot');
        if (top && bot) {
            gsap.to(top, { yPercent: 0, duration: 0.3, ease: 'power2.inOut' });
            gsap.to(bot, { yPercent: 0, duration: 0.3, ease: 'power2.inOut' });
        }
    };

    const SlideLink = ({ to, children, className = '' }) => (
        <Link to={to} className={`overflow-hidden relative inline-block ${className}`} onMouseEnter={handleLinkEnter} onMouseLeave={handleLinkLeave}>
            <span className='relative overflow-hidden inline-flex flex-col' style={{ height: '1.2em' }}>
                <span className='link-text-top'>{children}</span>
                <span className='link-text-bot'>{children}</span>
            </span>
        </Link>
    );

    return (
        <>
            {/* Background Gradient Overlay - always visible */}
            <div className="fixed top-0 left-0 w-full h-[20vh] pointer-events-none z-40" style={{ background: 'linear-gradient(to bottom, black, transparent)' }} />

            <nav className={`fixed top-0 left-0 w-screen flex justify-between items-center px-[5vw] py-[4vh] z-50 text-white transition-transform duration-500 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
                <div className="text-[1.1rem] font-bold">
                    <SlideLink to="/">Jay Ph.D</SlideLink>
                </div>
                <div className="flex items-center gap-9 text-[1rem] font-medium text-[#8f8f8f]">
                    <SlideLink to="/work" className="hover:text-white transition-colors duration-300">Work</SlideLink>
                    <SlideLink to="/about" className="hover:text-white transition-colors duration-300">About</SlideLink>
                    <SlideLink to="/publications" className="hover:text-white transition-colors duration-300">Publications</SlideLink>
                    <SlideLink to="/raise-lab" className="hover:text-white transition-colors duration-300">RAISE Lab</SlideLink>
                    <Link to="/contact" className="bg-gray-200 text-black px-[3vh] py-[1.2vh] rounded-[3vh] hover:bg-white transition-colors ml-[1vh] overflow-hidden relative" onMouseEnter={handleLinkEnter} onMouseLeave={handleLinkLeave}>
                        <span className='relative overflow-hidden inline-flex flex-col' style={{ height: '1.2em' }}>
                            <span className='link-text-top'>Contact</span>
                            <span className='link-text-bot'>Contact</span>
                        </span>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
