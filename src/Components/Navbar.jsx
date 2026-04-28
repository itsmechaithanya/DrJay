import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function Navbar() {
    const lastScrollY = useRef(0);
    const navRef = useRef(null);

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
                <div className="nav-item text-[1.1rem] font-bold">
                    <SlideLink to="/">Jay Ph.D</SlideLink>
                </div>
                <div className="flex items-center gap-9 text-[0.9rem] font-medium text-[#8f8f8f]">
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
            </nav>
        </>
    );
}

export default Navbar;
