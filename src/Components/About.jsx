import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import vid from '../assets/vid.MP4';
import vid2 from '../assets/vid2.mp4';
import e1 from '../assets/e1.jpg';
import e2 from '../assets/e2.png';
import e3 from '../assets/e3.png';
import e4 from '../assets/e4.png';
import e5 from '../assets/e5.png';
import e6 from '../assets/e6.png';
import l1 from '../assets/l1.png';
import l2 from '../assets/l2.png';
import l3 from '../assets/l3.png';
import l4 from '../assets/l4.png';
import l5 from '../assets/l5.png';
import ssrc from '../assets/ssrc.png';


function About() {
    const textRevealRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const heroTitles = gsap.utils.toArray('.hero-title');
        let handleLoaderComplete;

        if (!window.loaderHasCompleted) {
            gsap.set(heroTitles, { yPercent: 100 });
            handleLoaderComplete = () => {
                gsap.to(heroTitles, { yPercent: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
            };
            window.addEventListener('loaderComplete', handleLoaderComplete);
        } else {
            gsap.fromTo(heroTitles, { yPercent: 100 }, { yPercent: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
        }

        let revealAnim;
        let splitText;

        if (textRevealRef.current) {
            textRevealRef.current.style.visibility = 'visible';

            splitText = new SplitType(textRevealRef.current, { types: 'lines, words' });

            revealAnim = gsap.fromTo(splitText.words,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: textRevealRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        onEnter: (self) => {
                            if (self.animation) {
                                if (Math.abs(self.getVelocity()) > 1000) {
                                    self.animation.timeScale(4);
                                } else {
                                    self.animation.timeScale(1);
                                }
                            }
                        },
                        onEnterBack: (self) => {
                            if (self.animation) {
                                if (Math.abs(self.getVelocity()) > 1000) {
                                    self.animation.timeScale(4);
                                } else {
                                    self.animation.timeScale(1);
                                }
                            }
                        }
                    }
                }
            );
        }

        // Education image clip-path reveal
        const eduImgAnims = gsap.utils.toArray('.edu-img-reveal').map(el => {
            gsap.set(el, { willChange: 'clip-path', transform: 'translateZ(0)' });
            return gsap.fromTo(el,
                { clipPath: 'inset(0 0 100% 0)' },
                {
                    clipPath: 'inset(0 0 0% 0)',
                    duration: 0.8,
                    ease: 'power3.inOut',
                    force3D: true,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        // Education text stagger reveal
        const eduInfoAnims = gsap.utils.toArray('.edu-info').map(section => {
            const elements = section.querySelectorAll('h1, h2, p, button');
            return gsap.fromTo(elements,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        // Leadership image clip-path reveal
        const leadImgAnims = gsap.utils.toArray('.lead-img-reveal').map(el => {
            gsap.set(el, { willChange: 'clip-path', transform: 'translateZ(0)' });
            return gsap.fromTo(el,
                { clipPath: 'inset(0 0 100% 0)' },
                {
                    clipPath: 'inset(0 0 0% 0)',
                    duration: 0.8,
                    ease: 'power3.inOut',
                    force3D: true,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        // Leadership text stagger reveal
        const leadInfoAnims = gsap.utils.toArray('.lead-info').map(section => {
            const elements = section.querySelectorAll('h1, h2, p, button');
            return gsap.fromTo(elements,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    force3D: true,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        return () => {
            if (handleLoaderComplete) window.removeEventListener('loaderComplete', handleLoaderComplete);
            if (revealAnim) revealAnim.kill();
            if (splitText) splitText.revert();
            eduImgAnims.forEach(anim => anim.kill());
            eduInfoAnims.forEach(anim => anim.kill());
            leadImgAnims.forEach(anim => anim.kill());
            leadInfoAnims.forEach(anim => anim.kill());
        };
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] pt-[15vh] md:pt-[25vh] px-[6vw] md:px-[5vw] text-white">
            <div className="overflow-hidden mb-[6vh] md:mb-[12vh]">
                <h1 className="hero-title inline-block text-[16vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    About
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[8vh] md:mb-[12vh]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[1.8rem] md:text-[3rem] leading-normal text-[#a1a1a1] font-light">
                        <span className='text-[1.2rem] md:text-[1.7rem] font-bold pr-[4vw] md:pr-[9vw] text-[#ffffff]'>Journey</span>With a background in software engineering, product management, and UX research, I explore responsible AI through human-centered design, creating inclusive, ethical, and impactful technology experiences.
                    </p>
                </div>
            </div>
            <div className="w-full aspect-video overflow-hidden rounded-[2vw] md:rounded-[1vw] border border-white/10 shadow-[0_0_5vw_rgba(0,0,0,0.5)] mb-[8vh] md:mb-[12vh]">
                <video
                    src={vid}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row items-start justify-between w-full mb-[8vh] md:mb-[15vh] gap-8 md:gap-0">
                <div className="w-full md:w-[20%] text-[#a1a1a1] text-[1.1rem] font-medium tracking-tight">
                    (Research & Impact)
                </div>

                <div className="w-full md:w-[55%] text-[1.25rem] md:text-[1.75rem] font-light leading-relaxed text-[#e5e5e5]">
                    Through my research, teaching, and collaborations with academia, industry, and communities, I explore responsible AI, human-centered design, and technology policy to advance equity, innovation, and societal impact.
                </div>

                <div className="w-full md:w-[20%] flex justify-start md:justify-end text-[1.1rem] font-medium">
                    <Link
                        to="/contact"
                        className="hover:text-[#CFB88B] transition-colors duration-300"
                    >
                        Collaborate with me
                    </Link>
                </div>
            </div>
            <div className='h-[10vh] w-full'></div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[6vh] md:mb-[10vh] gap-10 md:gap-0">
                {/* Left Column: Video & Socials */}
                <div className="w-full sm:w-[80%] md:w-[20%] flex flex-col items-start gap-6 md:mr-[10vw]">
                    <div className="w-full aspect-[4/5] overflow-hidden rounded-[2vw] md:rounded-[0.5vw] border border-white/10 shadow-[0_0_5vw_rgba(0,0,0,0.5)]">
                        <video
                            src={vid2}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Social Icons row matching the screenshot style exactly */}
                    <div className="flex flex-row items-center gap-3 w-full justify-start">
                        <a
                            href="https://www.instagram.com/dr.jaycunningham/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-[6px] bg-black border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center text-white"
                            title="Instagram"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                        <a
                            href="https://docs.google.com/document/d/1pvKjivdJduqSqXCuAdU4I17YP61qTWc1fupaw0KL0Fw/edit?tab=t.0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-[6px] bg-black border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center text-white font-sans text-sm font-bold tracking-tight"
                            title="Resume / CV"
                        >
                            CV
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jaylcunningham/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-[6px] bg-black border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center text-white"
                            title="LinkedIn"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a
                            href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=ABEO0Yr5hKEbGYbhvHZjhMMlrofeJMg-5cgUy3UDSelo0zwUUjvcPSaiRXX6IVdECbeXrou9LcuUz0FauniTfg&user=UEjAKwEAAAAJ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-[6px] bg-black border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center text-white"
                            title="Google Scholar"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 3L1 9l11 6 9-4.91v7.66h2V10.09L23 9z M4.44 13.62L12 17.75l7.56-4.13v3.75c0 1.93-3.38 3.5-7.56 3.5s-7.56-1.57-7.56-3.5z" />
                            </svg>
                        </a>
                        <a
                            href="https://x.com/jay__cunningham"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-[6px] bg-black border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center text-white"
                            title="Twitter / X"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Right Column: Bio */}
                <div className="w-full md:w-[62%] flex flex-col">
                    {/* Header: Roles and Number */}
                    <div className="flex flex-row justify-between items-end w-full border-b border-white/10 pb-4 mb-8">
                        <h2 className="text-[1rem] md:text-[1.3rem] font-medium tracking-tight text-white">
                            Researcher / Technologist / Speaker / Educator / Advisor
                        </h2>
                        <span className="text-[#a1a1a1] text-[1.15rem] font-medium leading-none">
                            (01)
                        </span>
                    </div>

                    {/* Bio Text Paragraphs */}
                    <div className="text-[1.05rem] md:text-[1.15rem] font-light leading-[1.75] text-[#a1a1a1] flex flex-col gap-6 mr-0 md:mr-[10vw]">
                        <p>
                            Bridging software engineering, public-interest technology, and human-centered AI, I work as a human-computer interaction (HCI) researcher, educator, and technologist. As an Assistant Professor of Human-Computer Interaction at DePaul University School of Computing, I lead the RAISE Lab (Responsible AI, Software, and Equity), dedicating my research and teaching to promoting responsible computing systems for the common good.
                        </p>
                        <p>
                            Alongside my academic role, I am the founder of Jalia Technologies and AmendLabs, initiatives dedicated to pioneering design paradigms that ensure emerging technologies are built equitably and with community-driven values at their core. My professional experience spans research and engineering roles at leading technology companies, including Microsoft, Facebook Apple, and Google.
                        </p>
                        <p>
                            My research explores AI governance, data ethics, and technology equity, focusing on how participatory co-design and intergenerational collaborations can empower marginalized populations. I hold a Ph.D. from the University of Washington, where my dissertation laid key groundwork for human-centered design interventions in public-interest technology and AI-driven systems.
                        </p>
                        <p>
                            An active voice in public policy and digital trust, I serve as an advisor to civic organizations and startups on the ethical development and deployment of software systems. I frequently share my findings at top-tier academic venues, including ACM CHI and CSCW, and am committed to mentoring students and emerging scholars to challenge assumptions, address algorithmic bias, and build a more equitable technological future.
                        </p>
                    </div>
                </div>
            </div>

            {/* Key Principles Sticky Layout Container */}
            <div id="principles-pin-container" data-scroll className="relative w-full mt-[10vh]">

                {/* Sticky Background Title */}
                <div data-scroll data-scroll-sticky data-scroll-target="#principles-pin-container" className="relative md:sticky top-0 left-0 w-full md:w-screen h-auto md:h-screen flex flex-col justify-center pointer-events-none z-0 ml-0 md:-ml-[5vw] px-[5vw] md:px-[5vw] py-[6vh] md:py-0">
                    <h2 className="text-[9vw] md:text-[14vw] font-black tracking-[-0.03em] leading-[0.85] text-white uppercase font-gilroy">
                        <span className="flex flex-row justify-between items-baseline w-full">
                            <span>Dr. Jay's</span>
                            <span className="text-[#a1a1a1] text-[1.15rem] md:text-[1.3rem] font-medium tracking-normal normal-case leading-none">
                                (02)
                            </span>
                        </span>
                        <span className="block pl-[8vw] md:pl-[18vw]">Signature</span>
                        <span className="block">Keynote</span>
                        <span className="block pl-[5vw] md:pl-[5vw]">Principles(3)</span>
                    </h2>
                </div>

                {/* Cards Container Layered on Top */}
                <div className="relative z-10 mt-[6vh] md:-mt-[100vh]">
                    {/* Card 1 */}
                    <div className="w-full h-auto md:h-screen flex items-center justify-center mt-0 md:mt-[100vh] py-[3vh] md:py-0">
                        <div className="w-[90vw] md:w-[50vw] aspect-auto md:aspect-square min-h-[360px] md:min-h-0 max-w-[650px] bg-[#141414] text-white rounded-[24px] p-6 md:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 hover:border-white/20">
                            <div className="text-[3.5rem] md:text-[6.5rem] font-black leading-none font-gilroy text-white select-none">
                                1
                            </div>
                            <div>
                                <h3 className="text-white font-black text-[1.65rem] md:text-[2.8rem] leading-[1.15] mb-4 font-gilroy uppercase tracking-tight">
                                    Responsible, Fair & Equitable Technical Innovation
                                </h3>
                                <p className="text-[0.95rem] md:text-[1.15rem] font-light leading-[1.7] text-[#a1a1a1]">
                                    HCI researcher and Assistant Professor at DePaul University, leading the RAISE Lab to build responsible, human-centered AI and technology.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="w-full h-auto md:h-screen flex items-center justify-center py-[3vh] md:py-0">
                        <div className="w-[90vw] md:w-[50vw] aspect-auto md:aspect-square min-h-[360px] md:min-h-0 max-w-[650px] bg-[#141414] text-white rounded-[24px] p-6 md:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 hover:border-white/20">
                            <div className="text-[3.5rem] md:text-[6.5rem] font-black leading-none font-gilroy text-white select-none">
                                2
                            </div>
                            <div>
                                <h3 className="text-white font-black text-[1.65rem] md:text-[2.8rem] leading-[1.15] mb-4 font-gilroy uppercase tracking-tight">
                                    Leading with Empathy & Recognizing Humanity
                                </h3>
                                <p className="text-[0.95rem] md:text-[1.15rem] font-light leading-[1.7] text-[#a1a1a1]">
                                    I believe technology should serve people, prioritizing human experiences, diverse perspectives, and meaningful societal impact.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="w-full h-auto md:h-screen flex items-center justify-center py-[3vh] md:py-0">
                        <div className="w-[90vw] md:w-[50vw] aspect-auto md:aspect-square min-h-[360px] md:min-h-0 max-w-[650px] bg-[#141414] text-white rounded-[24px] p-6 md:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 hover:border-white/20">
                            <div className="text-[3.5rem] md:text-[6.5rem] font-black leading-none font-gilroy text-white select-none">
                                3
                            </div>
                            <div>
                                <h3 className="text-white font-black text-[1.65rem] md:text-[2.8rem] leading-[1.15] mb-4 font-gilroy uppercase tracking-tight">
                                    Collaborative by Nature, Oriented Toward Action
                                </h3>
                                <p className="text-[0.95rem] md:text-[1.15rem] font-light leading-[1.7] text-[#a1a1a1]">
                                    I believe collaboration drives meaningful innovation by bringing together users, technologists, businesses, and communities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#333]  mb-[6vh] md:mb-[10vh]"></div>
            <div className="mb-[5vh] md:mb-[5vh] edu-info flex">
                <h2 className="text-[2.2rem] md:text-[4rem] font-medium tracking-tight">Education</h2>
                <span className="text-[#a1a1a1] text-[1.15rem] font-medium leading-none ml-2 md:ml-[1vw]">
                    (03)
                </span>
            </div>

            <div className="flex flex-col gap-[8vh] md:gap-[5vh] mb-[10vh] md:mb-[15vh]">
                {/* 1. UW Ph.D. */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] edu-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">University of <br /> Washington</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Ph.D. Human-Centered Design & Engineering</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='edu-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={e1} alt="University of Washington Ph.D." className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='edu-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Specialized in responsible AI, algorithmic fairness, and public-interest technology. Researched participatory design paradigms to empower marginalized populations and address socio-technical inequities in intelligent systems.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Seattle, WA</p>
                                <p className='text-white'>2020 – 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. UW M.S. */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] edu-info mt-[6vh] md:mt-[10vh]">
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">MS. Human-Centered Design & Engineering</p>
                    </div>
                    <div className=" edu-info">
                    </div>
                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='edu-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={e2} alt="University of Washington M.S." className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='edu-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Explored human-computer interaction theories, prototyping methodologies, and advanced user research techniques. Investigated inclusive design principles to create accessible and ethical software interfaces.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Seattle, WA</p>
                                <p className='text-white'>2020 – 2021</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. UA B.S. */}
                <div className='w-full mt-[6vh] md:mt-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] edu-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">University of <br /> Alabama</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">B.S. Computer Science | Minor: Civic Engagement and Leadership</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='edu-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={e4} alt="University of Alabama B.S." className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='edu-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Studied software engineering, algorithm design, and computational theory. Merged computer science with civic leadership studies to analyze how technical systems impact policy, community empowerment, and digital access.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Tuscaloosa, AL</p>
                                <p className='text-white'>2016 – 2019</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. EMCC A.A. */}
                <div className='w-full mt-[6vh] md:mt-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] edu-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">East Mississippi <br /> Community College</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">A.A. Computer Science</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='edu-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={e3} alt="East Mississippi Community College" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='edu-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Acquired fundamental skills in computer programming, database management, and object-oriented design. Established a strong technical foundation and developed an early interest in human-computer interaction.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Scooba, MS</p>
                                <p className='text-white'>2014 – 2016</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. WLHS Salutatorian */}
                <div className='w-full mt-[6vh] md:mt-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] edu-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">West Lowndes <br /> High School</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Salutatorian & Honors Diploma</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='edu-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={e5} alt="West Lowndes High School" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='edu-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Graduated as Salutatorian with high honors, demonstrating academic excellence, leadership in student organizations, and a strong commitment to community service.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Columbus, MS</p>
                                <p className='text-white'>2016</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. Galvin Flying Student Pilot */}
                <div className='w-full my-[6vh] md:my-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] edu-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Galvin Flying</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Student Pilot (Private Pilot Rating)</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='edu-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={e6} alt="Galvin Flying" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='edu-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Undertook flight training at Galvin Flying, acquiring aviation skills, knowledge of aerodynamics, and private pilot rating competencies at Boeing Field.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Seattle, WA</p>
                                <p className='text-white'>2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#333] mt-[10vh] mb-[6vh] md:mb-[10vh]"></div>
            <div className="mb-[5vh] md:mb-[5vh] lead-info flex">
                <h2 className="text-[2.2rem] md:text-[4rem] font-medium tracking-tight">Leadership & Affiliations</h2>
                <span className="text-[#a1a1a1] text-[1.15rem] font-medium leading-none ml-2 md:ml-[1vw]">
                    (04)
                </span>
            </div>

            <div className="flex flex-col gap-[8vh] md:gap-[5vh] mb-[10vh] md:mb-[15vh]">
                {/* 1. SSRC Just Tech Program */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] lead-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Social Science <br /> Research Council (SSRC)</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">2023 Fellow, Just Tech Program</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='lead-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={ssrc} alt="SSRC Just Tech" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='lead-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Selected as a Just Tech Fellow to investigate the intersection of algorithmic bias, automated systems, and technology policies, designing frameworks for digital trust, public interest, and racial equity.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>New York, NY (Remote)</p>
                                <p className='text-white'>2023 – 2025</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Student Regent, UW */}
                <div className='w-full mt-[6vh] md:mt-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] lead-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">State of Washington</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Student Regent, University of Washington (Appointed by Gov. Jay Inslee)</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='lead-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={l1} alt="State of Washington" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='lead-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Appointed by Governor Jay Inslee to the University of Washington Board of Regents. Represented over 60,000 students across three campuses, contributing to executive decisions on tuition, capital assets, and institutional policy.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Olympia & Seattle, WA</p>
                                <p className='text-white'>2023 – 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Member, NASEM */}
                <div className='w-full mt-[6vh] md:mt-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] lead-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">National Academies of Sciences, <br /> Engineering, and Medicine (NASEM)</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Member, Graduate Students and Postdoctoral Council</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='lead-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={l2} alt="NASEM" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='lead-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Advised NASEM on nationwide policy issues impacting graduate students and postdoctoral researchers, championing mental health, research funding, diversity, and equitable academic training environments.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Washington, DC</p>
                                <p className='text-white'>2023 – 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. NSF GRFP Fellow */}
                <div className='w-full mt-[6vh] md:mt-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] lead-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">National Science Foundation (NSF)</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">2021 Fellow, Graduate Research Fellowship Program (GRFP)</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='lead-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={l3} alt="NSF" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='lead-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Awarded the prestigious NSF Graduate Research Fellowship supporting outstanding graduate students in STEM disciplines. Researched ethical AI development, participatory computing, and algorithmic accountability.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Washington, DC (Remote)</p>
                                <p className='text-white'>2021 – 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Gates Scholar */}
                <div className='w-full mt-[6vh] md:mt-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] lead-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Bill & Melinda Gates Foundation</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">2016 Scholar, Gates Millennium Scholars Program (GMS)</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='lead-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={l4} alt="Bill & Melinda Gates Foundation" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='lead-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Selected as a Gates Millennium Scholar, a highly competitive program established by the Bill & Melinda Gates Foundation to empower minority leaders through comprehensive funding and leadership training.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Seattle, WA (Remote)</p>
                                <p className='text-white'>2016 – CURRENT</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. ACLU Volunteer Researcher */}
                <div className='w-full my-[6vh] md:my-[10vh]'>
                    <div className="mb-4 md:mb-[6vh] lead-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">ALCU - Washington</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Volunteer Researcher, Technology Equity Coalition (TEC)</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='lead-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={l5} alt="ACLU Washington" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='lead-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-0 md:pr-[2vw]'>
                                Collaborated with the Technology Equity Coalition at the ACLU of Washington. Researched and analyzed the civil liberties implications of surveillance technologies, biometric scanning, and algorithmic decision-making systems.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Seattle, WA</p>
                                <p className='text-white'>2020 – CURRENT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#333] mt-[10vh] mb-[6vh] md:mb-[10vh]"></div>
            <div className="mb-[5vh] md:mb-[5vh] flex">
                <h2 className="text-[2.2rem] md:text-[4rem] font-medium tracking-tight">Outside of Work</h2>
                <span className="text-[#a1a1a1] text-[1.15rem] font-medium leading-none ml-2 md:ml-[1vw]">
                    (05)
                </span>
            </div>

            <div className="flex flex-col md:flex-row items-start justify-between w-full mb-[8vh] md:mb-[12vh] gap-8 md:gap-0">
                <div className="w-full md:w-[20%] text-[#a1a1a1] text-[1.1rem] font-medium tracking-tight">
                    (Community & Lifestyle)
                </div>

                <div className="w-full md:w-[55%] text-[1.25rem] md:text-[1.75rem] font-light leading-relaxed text-[#e5e5e5]">
                    Beyond work, education, and research, I'm a true social butterfly and community-builder, driven by connection, design, and exploration.
                </div>

                <div className="w-full md:w-[20%] flex justify-start md:justify-end text-[1.1rem] font-medium text-[#a1a1a1]">
                    Active Life
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-[8vh] md:mb-[12vh]">
                {/* Card 1: Seattle Black Valley */}
                <div className="bg-[#141414] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[2vw] md:rounded-[1vw] p-8 flex flex-col justify-between min-h-[320px]">
                    <div className="text-[0.9rem] text-[#CFB88B] uppercase tracking-wider font-semibold font-suisse">(Community Founder)</div>
                    <div className="my-6">
                        <h3 className="text-[1.8rem] font-bold text-white tracking-tight leading-tight mb-3">Seattle Black Valley</h3>
                        <p className="text-[#a1a1a1] font-light text-[1.05rem] leading-relaxed">
                            Founded and lead a collective of over 1,400 young Black professionals in Seattle, WA organized for civic, social, and community engagement.
                        </p>
                    </div>
                    <div className="text-[0.95rem] text-[#a1a1a1] font-medium">Seattle, WA</div>
                </div>

                {/* Card 2: Dog-Dad & Faith */}
                <div className="bg-[#141414] border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[2vw] md:rounded-[1vw] p-8 flex flex-col justify-between min-h-[320px]">
                    <div className="text-[0.9rem] text-[#CFB88B] uppercase tracking-wider font-semibold font-suisse">(Personal Core)</div>
                    <div className="my-6">
                        <h3 className="text-[1.8rem] font-bold text-white tracking-tight leading-tight mb-3">Dog-Dad & Faith</h3>
                        <p className="text-[#a1a1a1] font-light text-[1.05rem] leading-relaxed">
                            Dog-Dad to Akai (a 2.5-year-old Shiba Inu), a son, a brother, and a follower of Christ.
                        </p>
                    </div>
                    <div className="text-[0.95rem] text-[#a1a1a1] font-medium">Values-Driven Life</div>
                </div>
            </div>

            <div className="w-full mb-[12vh] md:mb-[15vh]">
                <div className="text-[#a1a1a1] text-[1.1rem] font-medium tracking-tight mb-6">(Personal Passions)</div>
                
                {/* Passion Row 1: Aviation */}
                <div className="group border-y border-white/10 hover:border-white/30 transition-all duration-300 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-default">
                    <div className="flex items-center gap-4 w-full md:w-[35%]">
                        <span className="text-[#a0a0a0] text-sm font-medium font-suisse">(01)</span>
                        <h4 className="text-[1.5rem] md:text-[2rem] font-semibold text-white tracking-tight group-hover:text-[#CFB88B] transition-colors duration-300">Flight & Aviation</h4>
                    </div>
                    <div className="text-[#a0a0a0] text-[1rem] md:text-[1.1rem] w-full md:w-[45%] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        Currently in flight training to acquire a private pilot's license.
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-[20%]">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#a0a0a0] font-suisse">Galvin Flying</span>
                    </div>
                </div>

                {/* Passion Row 2: Fashion */}
                <div className="group border-b border-white/10 hover:border-white/30 transition-all duration-300 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-default">
                    <div className="flex items-center gap-4 w-full md:w-[35%]">
                        <span className="text-[#a0a0a0] text-sm font-medium font-suisse">(02)</span>
                        <h4 className="text-[1.5rem] md:text-[2rem] font-semibold text-white tracking-tight group-hover:text-[#CFB88B] transition-colors duration-300">Fashion Influencing</h4>
                    </div>
                    <div className="text-[#a0a0a0] text-[1rem] md:text-[1.1rem] w-full md:w-[45%] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        Involved in vintage styling, high-fashion curation, men's fashion, and plus-size fashion.
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-[20%]">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#a0a0a0] font-suisse">Fashion</span>
                    </div>
                </div>

                {/* Passion Row 3: Creative & Arts */}
                <div className="group border-b border-white/10 hover:border-white/30 transition-all duration-300 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-default">
                    <div className="flex items-center gap-4 w-full md:w-[35%]">
                        <span className="text-[#a0a0a0] text-sm font-medium font-suisse">(03)</span>
                        <h4 className="text-[1.5rem] md:text-[2rem] font-semibold text-white tracking-tight group-hover:text-[#CFB88B] transition-colors duration-300">Creative & Arts</h4>
                    </div>
                    <div className="text-[#a0a0a0] text-[1rem] md:text-[1.1rem] w-full md:w-[45%] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        Engaging in music production, playing instruments, glass art, abstract painting, and oil painting.
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-[20%]">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#a0a0a0] font-suisse">Creative</span>
                    </div>
                </div>

                {/* Passion Row 4: Travel */}
                <div className="group border-b border-white/10 hover:border-white/30 transition-all duration-300 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-default">
                    <div className="flex items-center gap-4 w-full md:w-[35%]">
                        <span className="text-[#a0a0a0] text-sm font-medium font-suisse">(04)</span>
                        <h4 className="text-[1.5rem] md:text-[2rem] font-semibold text-white tracking-tight group-hover:text-[#CFB88B] transition-colors duration-300">Travel & Exploration</h4>
                    </div>
                    <div className="text-[#a0a0a0] text-[1rem] md:text-[1.1rem] w-full md:w-[45%] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        Exploring new cities worldwide, taking solo journeys, and visiting exotic locations.
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-[20%]">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#a0a0a0] font-suisse">Adventure</span>
                    </div>
                </div>

                {/* Passion Row 5: Fitness */}
                <div className="group border-b border-white/10 hover:border-white/30 transition-all duration-300 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-default">
                    <div className="flex items-center gap-4 w-full md:w-[35%]">
                        <span className="text-[#a0a0a0] text-sm font-medium font-suisse">(05)</span>
                        <h4 className="text-[1.5rem] md:text-[2rem] font-semibold text-white tracking-tight group-hover:text-[#CFB88B] transition-colors duration-300">Fitness & Outdoors</h4>
                    </div>
                    <div className="text-[#a0a0a0] text-[1rem] md:text-[1.1rem] w-full md:w-[45%] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        Maintaining lifestyle balance with cardio routines, Pilates, weight-training, biking, swimming, and hiking.
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-[20%]">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#a0a0a0] font-suisse">Fitness</span>
                    </div>
                </div>

                {/* Passion Row 6: Cooking */}
                <div className="group border-b border-white/10 hover:border-white/30 transition-all duration-300 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-default">
                    <div className="flex items-center gap-4 w-full md:w-[35%]">
                        <span className="text-[#a0a0a0] text-sm font-medium font-suisse">(06)</span>
                        <h4 className="text-[1.5rem] md:text-[2rem] font-semibold text-white tracking-tight group-hover:text-[#CFB88B] transition-colors duration-300">Culinary & Cooking</h4>
                    </div>
                    <div className="text-[#a0a0a0] text-[1rem] md:text-[1.1rem] w-full md:w-[45%] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        Enjoying cooking Southern soul food, hosting BBQs, cooking fresh seafood, and assembling charcuterie.
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-[20%]">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#a0a0a0] font-suisse">Culinary</span>
                    </div>
                </div>

                {/* Passion Row 7: Real Estate */}
                <div className="group border-b border-white/10 hover:border-white/30 transition-all duration-300 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 cursor-default">
                    <div className="flex items-center gap-4 w-full md:w-[35%]">
                        <span className="text-[#a0a0a0] text-sm font-medium font-suisse">(07)</span>
                        <h4 className="text-[1.5rem] md:text-[2rem] font-semibold text-white tracking-tight group-hover:text-[#CFB88B] transition-colors duration-300">Real Estate Investing</h4>
                    </div>
                    <div className="text-[#a0a0a0] text-[1rem] md:text-[1.1rem] w-full md:w-[45%] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                        Active in property investments including short-term rentals, multi-family units, and commercial real estate.
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end w-full md:w-[20%]">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#a0a0a0] font-suisse">Real Estate</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
