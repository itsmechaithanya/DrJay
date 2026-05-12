import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const navRef = useRef(null);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                gsap.to(navRef.current, { yPercent: -100, duration: 0.85, ease: 'power3.out', overwrite: 'auto' });
            } else {
                gsap.to(navRef.current, { yPercent: 0, duration: 0.85, ease: 'power3.out', overwrite: 'auto' });
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        if (!navRef.current) return;

        const handleLoaderComplete = () => {
            gsap.to(navRef.current, { yPercent: 0, duration: 0.55, ease: 'power3.out' });
        };

        if (!window.loaderHasCompleted) {
            gsap.set(navRef.current, { yPercent: -100 });
            window.addEventListener('loaderComplete', handleLoaderComplete);
        } else {
            gsap.fromTo(navRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.55, ease: 'power3.out' });
        }

        return () => {
            window.removeEventListener('loaderComplete', handleLoaderComplete);
        };
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

    const SlideLink = ({ to, children, className = '' }) => {
        const isExternal = to.startsWith('http');
        const content = (
            <span className='relative overflow-hidden inline-flex flex-col' style={{ height: '1.2em' }}>
                <span className='link-text-top'>{children}</span>
                <span className='link-text-bot'>{children}</span>
            </span>
        );

        if (isExternal) {
            return (
                <a href={to} target="_blank" rel="noopener noreferrer" className={`overflow-hidden relative inline-block ${className}`} onMouseEnter={handleLinkEnter} onMouseLeave={handleLinkLeave}>
                    {content}
                </a>
            );
        }

        return (
            <Link to={to} className={`overflow-hidden relative inline-block ${className}`} onMouseEnter={handleLinkEnter} onMouseLeave={handleLinkLeave}>
                {content}
            </Link>
        );
    };

    return (
        <>
            {/* Background Gradient Overlay - always visible */}
            <div className="fixed top-0 left-0 w-full h-[20vh] pointer-events-none z-40" style={{ background: 'linear-gradient(to bottom, black, transparent)' }} />

            <nav ref={navRef} className="fixed top-0 left-0 w-screen flex justify-between items-center px-[5vw] py-[4vh] z-50 text-white">
                <div className="nav-item text-[1.1rem] font-bold relative z-[70]">
                    <SlideLink className="text-white" to="/">Jay Ph.D</SlideLink>
                </div>
                
                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-9 text-[0.9rem] font-medium text-[#8f8f8f]">
                    <SlideLink to="/work" className="nav-item hover:text-white transition-colors duration-300">Work</SlideLink>
                    <SlideLink to="/about" className="nav-item hover:text-white transition-colors duration-300">About</SlideLink>
                    <SlideLink to="/publications" className="nav-item hover:text-white transition-colors duration-300">Publications</SlideLink>
                    <SlideLink to="/speaking" className="nav-item hover:text-white transition-colors duration-300">Speaking</SlideLink>
                    <SlideLink to="https://raiselab.framer.website" className="nav-item hover:text-white transition-colors duration-300">RAISE Lab</SlideLink>
                    <Link to="/contact" className="nav-item bg-gray-200 text-black px-[3vh] py-[1.2vh] rounded-[3vh] hover:bg-white transition-colors ml-[1vh] overflow-hidden relative" onMouseEnter={handleLinkEnter} onMouseLeave={handleLinkLeave}>
                        <span className='relative overflow-hidden inline-flex flex-col' style={{ height: '1.2em' }}>
                            <span className='link-text-top'>Contact</span>
                            <span className='link-text-bot'>Contact</span>
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Indicator (2 Lines) */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-[70] focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <span className={`block w-8 h-[2px] bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'}`}></span>
                    <span className={`block w-8 h-[2px] bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1'}`}></span>
                </button>
            </nav>

            {/* Mobile Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 w-screen h-screen bg-[#0a0a0a] z-[60] flex flex-col justify-center items-center px-[5vw]"
                    >
                        <div className="flex flex-col items-center gap-8 text-[3rem] font-medium text-white tracking-tight">
                            <Link to="/work" onClick={() => setIsMenuOpen(false)} className="hover:text-[#CFB88B] transition-colors">Work</Link>
                            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-[#CFB88B] transition-colors">About</Link>
                            <Link to="/publications" onClick={() => setIsMenuOpen(false)} className="hover:text-[#CFB88B] transition-colors">Publications</Link>
                            <Link to="/speaking" onClick={() => setIsMenuOpen(false)} className="hover:text-[#CFB88B] transition-colors">Speaking</Link>
                            <a href="https://raiselab.framer.website" target="_blank" rel="noopener noreferrer" className="hover:text-[#CFB88B] transition-colors">RAISE Lab</a>
                            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#CFB88B] transition-colors text-[#CFB88B] mt-4">Contact</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
