import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import image from '../assets/image.png';
import microsoft from '../assets/micro.png';
import raiseLabImage from '../assets/1774384265420.jpeg';

function Work() {
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

        if (textRevealRef.current) {
            textRevealRef.current.style.visibility = 'visible';

            const splitText = new SplitType(textRevealRef.current, { types: 'lines, words' });

            const revealAnim = gsap.fromTo(splitText.words,
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

            // Work image clip-path reveal
            gsap.utils.toArray('.work-img-reveal').forEach(el => {
                gsap.set(el, { willChange: 'clip-path', transform: 'translateZ(0)' });
                gsap.fromTo(el,
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

            // Work text stagger reveal
            gsap.utils.toArray('.work-info').forEach(section => {
                const elements = section.querySelectorAll('h1, h2, p, button');
                gsap.fromTo(elements,
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
                revealAnim.kill();
                splitText.revert();
            };
        }
    }, []);

    return (
        <div className="w-screen min-h-screen bg-[#0a0a0a] pt-[25vh] px-[5vw] text-white">
            <div className="overflow-hidden mb-[12vh]">
                <h1 className="hero-title inline-block text-[12vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    Work
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[12vh]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[3rem] leading-normal text-[#a1a1a1] font-light">
                        <span className='text-[1.7rem] font-bold pr-[9vw] text-[#ffffff]'>Impact</span>I am a researcher and technologist bridging software engineering and human-centered AI. With experience spanning Microsoft, Facebook, Apple, and Mozilla, my work focuses on building equitable, community-driven technology.
                    </p>
                </div>
            </div>

            <div className="w-full h-px bg-[#333] mb-[10vh]"></div>

            <div className="mb-[10vh] work-info">
                <h2 className="text-[1.5rem] font-medium">RESEARCH EXPERIENCE</h2>
            </div>

            {/* Main Pieces */}
            <div className='flex flex-col gap-[25vh] pb-[20vh]'>
                {/* Mozilla Piece */}
                <div className='w-full'>
                    <div className="mb-[6vh] work-info">
                        <h1 className="text-[4rem] md:text-[4.5rem] font-bold leading-[1.1] mb-3 tracking-tight">Mozilla Data<br/>Collection</h1>
                        <p className="text-[1.2rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Visiting Research Scientist</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row items-stretch gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full md:w-[65%] rounded-[1vw] overflow-hidden relative'>
                            <img src={image} alt="Mozilla Data Collection" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Advises and leads community data governance, co-governance research, and platform strategy for Mozilla's MDC, shaping equitable frameworks for 300+ language communities through data trust models, governance design, UX research, and cross-functional collaboration
                            </p>
                            <div className="mt-12 md:mt-auto text-[1.05rem] text-[#a0a0a0] font-light space-y-1">
                                <p>Remote</p>
                                <p>May 2026 - Present</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RAISE LAB Piece */}
                <div className='w-full'>
                    <div className="mb-[6vh] work-info">
                        <h1 className="text-[4rem] md:text-[4.5rem] font-bold leading-[1.1] mb-3 tracking-tight uppercase">RAISE LAB</h1>
                        <p className="text-[1.2rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Principal Investigator<br/>and Founder</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row items-stretch gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full md:w-[65%] rounded-[1vw] overflow-hidden relative'>
                            <img src={raiseLabImage} alt="RAISE LAB" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Leads institutional research and innovation at the intersection of computing, ethics, and human-centered technology, advancing equitable sociotechnical systems through participatory research, policy strategy, and interdisciplinary collaboration to ensure technology serves underserved communities, the public good, and the environment.
                            </p>
                            <div className="mt-12 md:mt-auto text-[1.05rem] text-[#a0a0a0] font-light space-y-1">
                                <p>Chicago, IL</p>
                                <p>July 2025 - Present</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-[#333] mb-[10vh]"></div>
            <div className="mb-[10vh] work-info">
                <h2 className="text-[1.5rem] font-medium">INDUSTRY EXPERIENCE</h2>
            </div>
            <div className='flex flex-col gap-[25vh] pb-[20vh]'>
                {/* Microsoft */}
                <div className='w-full'>
                    <div className="mb-[6vh] work-info">
                        <h1 className="text-[4rem] md:text-[4.5rem] font-bold leading-[1.1] mb-3 tracking-tight">Microsoft</h1>
                        <p className="text-[1.2rem] md:text-[1.3rem] text-[#a0a0a0] font-light">UX Program Manager Intern</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row items-stretch gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full md:w-[65%] rounded-[1vw] overflow-hidden relative'>
                            <img src={microsoft} alt="microsoft" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                This internship was a transformative experience filled with learning, challenges, and growth. Despite the remote setting, it provided meaningful opportunities to connect with inspiring professionals, and I’m deeply grateful to my manager, mentor, recruiter, and team at Microsoft Azure Files for their guidance and support. Truly an unforgettable summer.
                            </p>
                            <div className="mt-12 md:mt-auto text-[1.05rem] text-[#a0a0a0] font-light space-y-1">
                                <p>Redmond, WA</p>
                                <p>Summer 2020</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RAISE LAB Piece */}
                <div className='w-full'>
                    <div className="mb-[6vh] work-info">
                        <h1 className="text-[4rem] md:text-[4.5rem] font-bold leading-[1.1] mb-3 tracking-tight uppercase">RAISE LAB</h1>
                        <p className="text-[1.2rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Principal Investigator<br/>and Founder</p>
                    </div>
                    
                    <div className='flex flex-col md:flex-row items-stretch gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full md:w-[65%] rounded-[1vw] overflow-hidden relative'>
                            <img src={raiseLabImage} alt="RAISE LAB" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Leads institutional research and innovation at the intersection of computing, ethics, and human-centered technology, advancing equitable sociotechnical systems through participatory research, policy strategy, and interdisciplinary collaboration to ensure technology serves underserved communities, the public good, and the environment.
                            </p>
                            <div className="mt-12 md:mt-auto text-[1.05rem] text-[#a0a0a0] font-light space-y-1">
                                <p>Chicago, IL</p>
                                <p>July 2025 - Present</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Work;
