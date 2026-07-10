import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import vid from '../assets/vid.MP4';
import vid2 from '../assets/vid2.mp4';



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

        return () => {
            if (handleLoaderComplete) window.removeEventListener('loaderComplete', handleLoaderComplete);
            if (revealAnim) revealAnim.kill();
            if (splitText) splitText.revert();
        };
    }, []);

    return (
        <div className="w-screen min-h-screen bg-[#0a0a0a] pt-[25vh] px-[5vw] text-white">
            <div className="overflow-hidden mb-[12vh]">
                <h1 className="hero-title inline-block text-[12vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    About
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[12vh]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[3rem] leading-normal text-[#a1a1a1] font-light">
                        <span className='text-[1.7rem] font-bold pr-[9vw] text-[#ffffff]'>Journey</span>With a background in software engineering, product management, and UX research, I explore responsible AI through human-centered design, creating inclusive, ethical, and impactful technology experiences.
                    </p>
                </div>
            </div>
            <div className="w-full aspect-video overflow-hidden rounded-[2vw] md:rounded-[1vw] border border-white/10 shadow-[0_0_5vw_rgba(0,0,0,0.5)] mb-[12vh]">
                <video
                    src={vid}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row items-start justify-between w-full mb-[15vh] gap-8 md:gap-0">
                <div className="w-full md:w-[20%] text-[#a1a1a1] text-[1.1rem] font-medium tracking-tight">
                    (Research & Impact)
                </div>

                <div className="w-full md:w-[55%] text-[1.4rem] md:text-[1.75rem] font-light leading-relaxed text-[#e5e5e5]">
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

            <div className="flex flex-col md:flex-row items-start w-full mb-[10vh] gap-10 md:gap-0">
                {/* Left Column: Video & Socials */}
                <div className="w-full md:w-[20%] flex flex-col items-start gap-6 md:mr-[10vw]">
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
                        <h2 className="text-[1.15rem] md:text-[1.3rem] font-medium tracking-tight text-white">
                            Researcher / Technologist / Speaker / Educator / Advisor
                        </h2>
                        <span className="text-[#a1a1a1] text-[1.15rem] font-medium leading-none">
                            (01)
                        </span>
                    </div>

                    {/* Bio Text Paragraphs */}
                    <div className="text-[1.05rem] md:text-[1.15rem] font-light leading-[1.75] text-[#a1a1a1] flex flex-col gap-6 mr-[10vw]">
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
            <div id="principles-pin-container" data-scroll className="relative w-full mt-[10vh] pb-[100vh]">

                {/* Sticky Background Title */}
                <div data-scroll data-scroll-sticky data-scroll-target="#principles-pin-container" className="sticky top-0 left-0 w-screen h-screen flex flex-col justify-center pointer-events-none z-0 -ml-[5vw] px-[5vw]">
                    <h2 className="text-[12vw] md:text-[14vw] font-black tracking-[-0.03em] leading-[0.85] text-white uppercase font-gilroy">
                        <span className="flex flex-row justify-between items-baseline w-full">
                            <span>Dr. Jay's</span>
                            <span className="text-[#a1a1a1] text-[1.15rem] md:text-[1.3rem] font-medium tracking-normal normal-case leading-none">
                                (02)
                            </span>
                        </span>
                        <span className="block pl-[15vw] md:pl-[18vw]">Signature</span>
                        <span className="block">Keynote</span>
                        <span className="block pl-[15vw] md:pl-[5vw]">Principles(3)</span>
                    </h2>
                </div>

                {/* Cards Container Layered on Top */}
                <div className="relative z-10 -mt-[100vh]">
                    {/* Card 1 */}
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="w-[90vw] md:w-[50vw] aspect-auto md:aspect-square min-h-[500px] md:min-h-0 max-w-[650px] bg-[#141414] text-white rounded-[24px] p-8 md:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 hover:border-white/20">
                            <div className="text-[5rem] md:text-[6.5rem] font-black leading-none font-gilroy text-white select-none">
                                1
                            </div>
                            <div>
                                <h3 className="text-white font-black text-[2.2rem] md:text-[2.8rem] leading-[1.15] mb-4 font-gilroy uppercase tracking-tight">
                                    Responsible, Fair & Equitable Technical Innovation
                                </h3>
                                <p className="text-[1.05rem] md:text-[1.15rem] font-light leading-[1.7] text-[#a1a1a1]">
                                    HCI researcher and Assistant Professor at DePaul University, leading the RAISE Lab to build responsible, human-centered AI and technology.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="w-[90vw] md:w-[50vw] aspect-auto md:aspect-square min-h-[500px] md:min-h-0 max-w-[650px] bg-[#141414] text-white rounded-[24px] p-8 md:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 hover:border-white/20">
                            <div className="text-[5rem] md:text-[6.5rem] font-black leading-none font-gilroy text-white select-none">
                                2
                            </div>
                            <div>
                                <h3 className="text-white font-black text-[2.2rem] md:text-[2.8rem] leading-[1.15] mb-4 font-gilroy uppercase tracking-tight">
                                    Leading with Empathy & Recognizing Humanity
                                </h3>
                                <p className="text-[1.05rem] md:text-[1.15rem] font-light leading-[1.7] text-[#a1a1a1]">
                                    I believe technology should serve people, prioritizing human experiences, diverse perspectives, and meaningful societal impact.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="w-[90vw] md:w-[50vw] aspect-auto md:aspect-square min-h-[500px] md:min-h-0 max-w-[650px] bg-[#141414] text-white rounded-[24px] p-8 md:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 hover:border-white/20">
                            <div className="text-[5rem] md:text-[6.5rem] font-black leading-none font-gilroy text-white select-none">
                                3
                            </div>
                            <div>
                                <h3 className="text-white font-black text-[2.2rem] md:text-[2.8rem] leading-[1.15] mb-4 font-gilroy uppercase tracking-tight">
                                    Collaborative by Nature, Oriented Toward Action
                                </h3>
                                <p className="text-[1.05rem] md:text-[1.15rem] font-light leading-[1.7] text-[#a1a1a1]">
                                    I believe collaboration drives meaningful innovation by bringing together users, technologists, businesses, and communities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
