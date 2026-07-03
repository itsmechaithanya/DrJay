import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const SOCIAL_LINKS = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jaylcunningham/' },
    { name: 'Twitter', url: 'https://x.com/jay__cunningham' },
    { name: 'Instagram', url: 'https://www.instagram.com/dr.jaycunningham/' },
    { name: 'Resume/CV', url: 'https://docs.google.com/document/d/1pvKjivdJduqSqXCuAdU4I17YP61qTWc1fupaw0KL0Fw/edit?tab=t.0' },
    { name: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=ABEO0Yr5hKEbGYbhvHZjhMMlrofeJMg-5cgUy3UDSelo0zwUUjvcPSaiRXX6IVdECbeXrou9LcuUz0FauniTfg&user=UEjAKwEAAAAJ' },
    { name: 'Research Gate', url: 'https://www.researchgate.net/profile/Jay_Cunningham' }
];

function Footer() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const chicagoTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'America/Chicago',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            setTime(chicagoTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLinkEnter = (e) => {
        gsap.to(e.currentTarget.querySelector('.arrow'), {
            x: 4,
            y: -4,
            duration: 0.4,
            ease: 'power3.out'
        });
        gsap.to(e.currentTarget.querySelector('.bg-circle'), {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.out'
        });
        gsap.to(e.currentTarget.querySelector('.arrow-svg'), {
            color: '#000',
            duration: 0.4,
            ease: 'power3.out'
        });
    };

    const handleLinkLeave = (e) => {
        gsap.to(e.currentTarget.querySelector('.arrow'), {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power3.out'
        });
        gsap.to(e.currentTarget.querySelector('.bg-circle'), {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out'
        });
        gsap.to(e.currentTarget.querySelector('.arrow-svg'), {
            color: '#fff',
            duration: 0.4,
            ease: 'power3.out'
        });
    };

    const handleSlideLinkEnter = (e) => {
        const top = e.currentTarget.querySelector('.link-text-top');
        const bot = e.currentTarget.querySelector('.link-text-bot');
        if (top && bot) {
            gsap.to(top, { yPercent: -110, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
            gsap.to(bot, { yPercent: -110, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
        }
    };

    const handleSlideLinkLeave = (e) => {
        const top = e.currentTarget.querySelector('.link-text-top');
        const bot = e.currentTarget.querySelector('.link-text-bot');
        if (top && bot) {
            gsap.to(top, { yPercent: 0, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
            gsap.to(bot, { yPercent: 0, duration: 0.3, ease: 'power2.inOut', overwrite: 'auto' });
        }
    };

    return (
        <footer className="w-full bg-[#171717] text-white pt-[12vh] sm:pt-[10vh] px-[5vw] relative z-20 flex flex-col justify-between overflow-hidden min-h-0 md:min-h-[80vh]">

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start w-full mt-[5vh]">
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pl-2">
                        <div className="relative flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 absolute"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute"></div>
                        </div>
                        <p className="text-[0.9rem] uppercase tracking-[0.2em] text-[#a1a1a1] ml-4 font-medium">Say hello</p>
                    </div>
                    <h2 className="text-[12vw] sm:text-[4rem] lg:text-[10vw] font-bold leading-[0.85] tracking-tighter">
                        LET'S<br />CONNECT
                    </h2>
                </div>

                <div className="flex flex-col mt-8 sm:mt-16 lg:mt-0 lg:items-end w-full sm:w-auto">
                    <p className="text-[#a1a1a1] text-[1.1rem] sm:text-[1.2rem] mb-8 sm:mb-10 max-w-[320px] lg:text-right font-light leading-relaxed">
                        Open to new connections, collaborations, and speaking engagements.
                    </p>

                    <a
                        href="mailto:engage@jaylcunningham.com"
                        className="group flex items-center justify-between sm:justify-start gap-4 sm:gap-6 text-[4.2vw] sm:text-[1.3rem] lg:text-[2rem] font-light mb-6 relative cursor-pointer w-full sm:w-auto"
                        onMouseEnter={handleLinkEnter}
                        onMouseLeave={handleLinkLeave}
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white text-[#8f8f8f] break-all sm:break-normal">engage@jaylcunningham.com</span>
                        <div className="relative w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                            <div className="bg-circle absolute inset-0 bg-white rounded-full opacity-0 scale-0 origin-center"></div>
                            <span className="arrow relative z-10 flex items-center justify-center">
                                <svg className="arrow-svg text-white w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </span>
                        </div>
                    </a>

                    <a
                        href="mailto:info@jalia.tech"
                        className="group flex items-center justify-between sm:justify-start gap-4 sm:gap-6 text-[4.2vw] sm:text-[1.3rem] lg:text-[2rem] font-light relative cursor-pointer w-full sm:w-auto"
                        onMouseEnter={handleLinkEnter}
                        onMouseLeave={handleLinkLeave}
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white text-[#8f8f8f] break-all sm:break-normal">info@jalia.tech</span>
                        <div className="relative w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                            <div className="bg-circle absolute inset-0 bg-white rounded-full opacity-0 scale-0 origin-center"></div>
                            <span className="arrow relative z-10 flex items-center justify-center">
                                <svg className="arrow-svg text-white w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </span>
                        </div>
                    </a>
                </div>
            </div>

            {/* Middle Info Section */}
            <div className="flex flex-col lg:flex-row justify-between w-full mt-[5vh] sm:mt-[12vh] border-t border-white/10 pt-8 sm:pt-10 pb-[3vh] sm:pb-[5vh] z-10">
                <div className="flex flex-col gap-2 mb-10 lg:mb-0">
                    <h3 className="text-[#a1a1a1] text-[0.8rem] uppercase tracking-[0.15em] mb-3 font-medium">Local Time</h3>
                    <p className="text-[1.1rem] sm:text-[1.2rem] font-light">Chicago, IL <span className="ml-3 font-medium text-[#CFB88B]">{time}</span></p>
                </div>

                <div className="flex flex-col gap-2 mb-10 lg:mb-0">
                    <h3 className="text-[#a1a1a1] text-[0.8rem] uppercase tracking-[0.15em] mb-3 font-medium">Socials</h3>
                    <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-4 text-[1rem] sm:text-[1.1rem] font-light">
                        {SOCIAL_LINKS.map((social) => (
                            <a 
                                key={social.name} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="relative overflow-hidden inline-block text-[#8f8f8f] hover:text-white transition-colors duration-300" 
                                onMouseEnter={handleSlideLinkEnter}
                                onMouseLeave={handleSlideLinkLeave}
                            >
                                <span className='relative overflow-hidden inline-flex flex-col' style={{ height: '1.2em' }}>
                                    <span className="link-text-top leading-none">{social.name}</span>
                                    <span className="link-text-bot leading-none absolute top-full">{social.name}</span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Massive Bottom Text */}


        </footer>
    );
}

export default Footer;
