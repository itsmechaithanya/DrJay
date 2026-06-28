import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [time, setTime] = useState('');
    const lastScrollY = useRef(0);
    const navRef = useRef(null);
    const location = useLocation();
    const [showLogo, setShowLogo] = useState(() => {
        if (typeof window === 'undefined') return true;
        if (location.pathname !== '/') return true;
        if (window.innerWidth >= 768) return true;
        return window.scrollY >= window.innerHeight * 0.2;
    });

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Update logo visibility on location change
    useEffect(() => {
        if (location.pathname !== '/') {
            setShowLogo(true);
        } else {
            if (window.innerWidth >= 768) {
                setShowLogo(true);
            } else {
                setShowLogo(window.scrollY >= window.innerHeight * 0.2);
            }
        }
    }, [location]);

    // Live Chicago Time Update
    useEffect(() => {
        const updateTime = () => {
            const options = {
                timeZone: 'America/Chicago',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const formatter = new Intl.DateTimeFormat('en-US', options);
            setTime(formatter.format(new Date()));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Scroll listener for glassmorphic navbar background on mobile only
    useEffect(() => {
        const handleScroll = (e) => {
            const target = e.target;
            const currentScrollY = (target === document || target === window)
                ? (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0)
                : (target.scrollTop || 0);

            setIsScrolled(currentScrollY > 20);

            if (location.pathname === '/') {
                if (window.innerWidth >= 768) {
                    setShowLogo(true);
                } else {
                    setShowLogo(currentScrollY >= window.innerHeight * 0.2);
                }
            }

            // Hide/show navbar on scroll only on desktop viewports
            if (window.innerWidth >= 768) {
                if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                    gsap.to(navRef.current, { yPercent: -100, duration: 0.85, ease: 'power3.out', overwrite: 'auto' });
                } else {
                    gsap.to(navRef.current, { yPercent: 0, duration: 0.85, ease: 'power3.out', overwrite: 'auto' });
                }
            } else {
                // Keep navbar fixed and visible at the top on mobile viewports
                gsap.set(navRef.current, { yPercent: 0 });
            }
            lastScrollY.current = currentScrollY;
        };

        // Use capture phase (true) to intercept scroll events bubbling from the scroll container
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [location.pathname]);


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

    // Stagger animation variants for mobile menu items
    const menuContainerVariants = {
        initial: {
            x: '100%'
        },
        animate: {
            x: 0,
            transition: {
                duration: 0.65,
                ease: [0.76, 0, 0.24, 1],
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        exit: {
            x: '100%',
            transition: {
                duration: 0.55,
                ease: [0.76, 0, 0.24, 1],
                staggerChildren: 0.03,
                staggerDirection: -1
            }
        }
    };

    const menuItemVariants = {
        initial: {
            y: 80,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.55,
                ease: [0.33, 1, 0.68, 1]
            }
        },
        exit: {
            y: 40,
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };

    return (
        <>
            {/* Background Gradient Overlay - always visible */}
            <div className="fixed top-0 left-0 w-full h-[20vh] pointer-events-none z-40" style={{ background: 'linear-gradient(to bottom, black, transparent)' }} />

            <nav ref={navRef} className="fixed top-0 left-0 w-screen flex justify-between items-center px-[5vw] py-[4vh] z-50 text-white">
                <div className={`nav-item text-[1.1rem] font-bold relative z-[70] transition-all duration-500 ease-in-out ${showLogo ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}>
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

                {/* Mobile Menu Indicator (Circular Pill trigger) */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`md:hidden flex flex-col justify-center items-center w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-md relative z-[70] focus:outline-none transition-all duration-300 active:scale-90 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    aria-label="Toggle Menu"
                >
                    <div className="flex flex-col gap-[5px] justify-center items-center w-6 h-6">
                        <span className="block w-5 h-[1.5px] bg-white"></span>
                        <span className="block w-5 h-[1.5px] bg-white"></span>
                    </div>
                </button>
            </nav>

            {/* Mobile Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={menuContainerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 w-screen h-screen bg-[#0d0d0d] z-[60] flex flex-col justify-center px-[8vw] text-white overflow-hidden"
                    >
                        {/* Background radial gradient mesh */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent pointer-events-none z-0" />

                        {/* Close button inside overlay */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-[4vh] right-[5vw] flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95 z-[70]"
                            aria-label="Close Menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation Links */}
                        <div className="flex flex-col gap-6 relative z-10">
                            <div className="overflow-hidden">
                                <motion.div variants={menuItemVariants} className="flex items-baseline gap-4">
                                    <span className="text-xs font-mono text-[#CFB88B] tracking-widest opacity-60">01 /</span>
                                    <Link to="/work" onClick={() => setIsMenuOpen(false)} className="text-[2.5rem] sm:text-[3rem] font-bold tracking-tight hover:text-[#CFB88B] transition-colors duration-300">
                                        Work
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.div variants={menuItemVariants} className="flex items-baseline gap-4">
                                    <span className="text-xs font-mono text-[#CFB88B] tracking-widest opacity-60">02 /</span>
                                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-[2.5rem] sm:text-[3rem] font-bold tracking-tight hover:text-[#CFB88B] transition-colors duration-300">
                                        About
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.div variants={menuItemVariants} className="flex items-baseline gap-4">
                                    <span className="text-xs font-mono text-[#CFB88B] tracking-widest opacity-60">03 /</span>
                                    <Link to="/publications" onClick={() => setIsMenuOpen(false)} className="text-[2.5rem] sm:text-[3rem] font-bold tracking-tight hover:text-[#CFB88B] transition-colors duration-300">
                                        Publications
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.div variants={menuItemVariants} className="flex items-baseline gap-4">
                                    <span className="text-xs font-mono text-[#CFB88B] tracking-widest opacity-60">04 /</span>
                                    <Link to="/speaking" onClick={() => setIsMenuOpen(false)} className="text-[2.5rem] sm:text-[3rem] font-bold tracking-tight hover:text-[#CFB88B] transition-colors duration-300">
                                        Speaking
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.div variants={menuItemVariants} className="flex items-baseline gap-4">
                                    <span className="text-xs font-mono text-[#CFB88B] tracking-widest opacity-60">05 /</span>
                                    <a href="https://raiselab.framer.website" target="_blank" rel="noopener noreferrer" className="text-[2.5rem] sm:text-[3rem] font-bold tracking-tight hover:text-[#CFB88B] transition-colors duration-300 flex items-center gap-2">
                                        RAISE Lab <svg className="w-5 h-5 text-[#CFB88B]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                                    </a>
                                </motion.div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.div variants={menuItemVariants} className="flex items-baseline gap-4">
                                    <span className="text-xs font-mono text-[#CFB88B] tracking-widest opacity-60">06 /</span>
                                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-[2.5rem] sm:text-[3rem] font-bold tracking-tight text-[#CFB88B] hover:text-white transition-colors duration-300">
                                        Contact
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
