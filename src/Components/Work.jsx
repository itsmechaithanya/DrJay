import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import image from '../assets/image.png';
import raiseLabImage from '../assets/1774384265420.jpeg';
import ssrc from '../assets/ssrc.png';
import ga1 from '../assets/GA1.png';
import ga2 from '../assets/GA2.png';
import ga3 from '../assets/GA3.png';
import gr from '../assets/GR.png';
import appleSiri from '../assets/as.png';
import mr from '../assets/mr.png';
import ura from '../assets/ura.png';
import ie1 from '../assets/ie1.jpeg';
import ie2 from '../assets/ie2.png';
import ie3 from '../assets/ie3.png';
import ie4 from '../assets/ie4.png';

function Work() {
    const textRevealRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.clientWidth * 0.9;
            const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            setShowLeftBtn(scrollLeft > 10);
            setShowRightBtn(scrollLeft < maxScroll - 10);
        };

        handleScroll();
        container.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

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
        <div className="w-screen min-h-screen bg-[#0a0a0a] pt-[16vh] md:pt-[25vh] text-white">
            <div className="overflow-hidden mb-[6vh] md:mb-[12vh] px-[5vw]">
                <h1 className="hero-title inline-block text-[16vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    Work
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[8vh] md:mb-[12vh] px-[5vw]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] leading-normal text-[#a1a1a1] font-light">
                        <span className='text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] font-bold pr-[4vw] md:pr-[9vw] text-[#ffffff]'>Impact</span>I am a researcher and technologist bridging software engineering and human-centered AI. With experience spanning Microsoft, Facebook, Apple, and Mozilla, my work focuses on building equitable, community-driven technology.
                    </p>
                </div>
            </div>

            <div className="mx-[5vw] h-px bg-[#333] mb-[6vh] md:mb-[10vh]"></div>
            <div className="mb-[5vh] md:mb-[10vh] work-info px-[5vw]">
                <h2 className="text-[2.2rem] md:text-[4rem] font-medium">INDUSTRY EXPERIENCE</h2>
            </div>
            <div className="relative w-full">
                {/* Left Navigation Button */}
                <button 
                    onClick={() => scroll('prev')}
                    className={`hidden md:flex absolute left-[3vw] top-[45%] -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/35 hover:bg-black/55 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg cursor-pointer ${showLeftBtn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    aria-label="Previous slide"
                >
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div 
                    ref={scrollContainerRef}
                    className='flex flex-row overflow-x-auto gap-6 md:gap-[4vw] pb-[6vh] md:pb-[10vh] w-full no-scrollbar scroll-smooth px-[5vw]'
                >
                    {/* Microsoft */}
                    <div className='w-[85vw] md:w-[80vw] flex-shrink-0 snap-center bg-white rounded-[20px] md:rounded-[2vw] p-6 sm:p-8 md:p-[2vw] md:pl-[4vw] flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] relative z-10'>
                        <div className='work-info w-full md:w-[28%] text-black flex flex-col justify-between py-[1vh]'>
                            <div className='mt-2 md:mt-[4vh]'>
                                <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4.5rem] font-bold leading-none tracking-tight text-black">Microsoft</h1>
                                <h2 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] text-[#1a1a1a] font-normal mb-3 md:mb-6">Azure Storage R&D</h2>
                                <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#333] font-medium leading-tight">UX Program<br />Manager Intern</p>
                            </div>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#444] pb-[2vh] font-medium">
                                <p>Redmond, WA</p>
                                <p className='text-black'>Summer 2020</p>
                            </div>
                        </div>
                        <div className='w-full aspect-[16/10] md:aspect-auto md:w-[68%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={ie1} alt="Microsoft Azure Storage R&D" className='w-full h-full object-cover relative z-10' />
                        </div>
                    </div>

                    {/* Microsoft */}
                    <div className='w-[85vw] md:w-[80vw] flex-shrink-0 snap-center bg-white rounded-[20px] md:rounded-[2vw] p-6 sm:p-8 md:p-[2vw] md:pl-[4vw] flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] relative z-10'>
                        <div className='work-info w-full md:w-[28%] text-black flex flex-col justify-between py-[1vh]'>
                            <div className='mt-2 md:mt-[4vh]'>
                                <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4.5rem] font-bold leading-none tracking-tight text-black">Facebook</h1>
                                <h2 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] text-[#1a1a1a] font-normal mb-3 md:mb-6">Infrastructure</h2>
                                <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#333] font-medium leading-tight">Technical Program <br /> Manager Intern</p>
                            </div>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#444] font-medium">
                                <p>Menlo Park, CA</p>
                                <p className='text-black'>Summer 2019</p>
                            </div>
                        </div>
                        <div className='w-full aspect-[16/10] md:aspect-auto md:w-[68%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={ie2} alt="Microsoft Azure Storage R&D" className='w-full h-full object-cover relative z-10' />
                        </div>
                    </div>
                    
                    {/* Oracle */}
                    <div className='w-[85vw] md:w-[80vw] flex-shrink-0 snap-center bg-white rounded-[20px] md:rounded-[2vw] p-6 sm:p-8 md:p-[2vw] md:pl-[4vw] flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] relative z-10'>
                        <div className='work-info w-full md:w-[28%] text-black flex flex-col justify-between py-[1vh]'>
                            <div className='mt-2 md:mt-[4vh]'>
                                <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4.5rem] font-bold leading-none tracking-tight text-black">Oracle</h1>
                                <h2 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] text-[#1a1a1a] font-normal mb-3 md:mb-6">NetSuite ERP Software</h2>
                                <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#333] font-medium leading-tight">Software <br /> Engineering Intern</p>
                            </div>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#444] font-medium">
                                <p>San Mateo, CA</p>
                                <p className='text-black'>Summer 2018</p>
                            </div>
                        </div>
                        <div className='w-full aspect-[16/10] md:aspect-auto md:w-[68%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={ie3} alt="Microsoft Azure Storage R&D" className='w-full h-full object-cover relative z-10' />
                        </div>
                    </div>
                    
                    {/* Lockheed Martin */}
                    <div className='w-[85vw] md:w-[80vw] flex-shrink-0 snap-center bg-white rounded-[20px] md:rounded-[2vw] p-6 sm:p-8 md:p-[2vw] md:pl-[4vw] flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] relative z-10'>
                        <div className='work-info w-full md:w-[28%] text-black flex flex-col justify-between py-[1vh]'>
                            <div className='mt-2 md:mt-[4vh]'>
                                <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4.5rem] font-bold leading-none tracking-tight text-black">Lockheed Martin</h1>
                                <h2 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.7rem] text-[#1a1a1a] font-normal mb-3 md:mb-6">S-97 Raider & JMR Program</h2>
                                <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#333] font-medium leading-tight">Software<br /> Engineering Intern</p>
                            </div>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#444] font-medium">
                                <p>Stratford, CT</p>
                                <p className='text-black'>Summer 2017</p>
                            </div>
                        </div>
                        <div className='w-full aspect-[16/10] md:aspect-auto md:w-[68%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={ie4} alt="Microsoft Azure Storage R&D" className='w-full h-full object-cover relative z-10' />
                        </div>
                    </div>
                </div>

                {/* Right Navigation Button */}
                <button 
                    onClick={() => scroll('next')}
                    className={`hidden md:flex absolute right-[3vw] top-[45%] -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/35 hover:bg-black/55 text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-lg cursor-pointer ${showRightBtn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    aria-label="Next slide"
                >
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="mx-[5vw] h-px bg-[#333] mb-[6vh] md:mb-[10vh]"></div>
            <div className="mb-[5vh] md:mb-[10vh] work-info px-[5vw]">
                <h2 className="text-[2.2rem] md:text-[4rem] font-medium">RESEARCH EXPERIENCE</h2>
            </div>

            {/* Main Pieces */}
            <div className='flex flex-col gap-[12vh] md:gap-[25vh] pb-[10vh] md:pb-[20vh] px-[5vw]'>
                {/* Mozilla Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Mozilla Data<br />Collection</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Visiting Research Scientist</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={image} alt="Mozilla Data Collection" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Advises and leads community data governance, co-governance research, and platform strategy for Mozilla's MDC, shaping equitable frameworks for 300+ language communities through data trust models, governance design, UX research, and cross-functional collaboration
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Remote</p>
                                <p className='text-white'>May 2026 - Present</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RAISE LAB Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight uppercase">RAISE LAB</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Principal Investigator<br />and Founder</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={raiseLabImage} alt="RAISE LAB" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Leads institutional research and innovation at the intersection of computing, ethics, and human-centered technology, advancing equitable sociotechnical systems through participatory research, policy strategy, and interdisciplinary collaboration to ensure technology serves underserved communities, the public good, and the environment.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Chicago, IL</p>
                                <p className='text-white'>July 2025 - Present</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SSRC Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Social Science <br /> Research Council</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Research Fellow</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={ssrc} alt="SSRC Just Tech" className='w-full h-full object-cover relative z-10 border rounded-xl md:rounded-[1vw] border-[#737373]' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                The Just Tech Fellowship provides unrestricted awards for researchers and practitioners investigating the uneven benefits and harms of technology and imagining futures that embrace joy, hope, self-determination, and equity.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>New York City, NY (remote)</p>
                                <p className='text-white'>2023 - 2025</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* UW Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">University of <br /> Washington</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Graduate Student Researcher</p>
                    </div>

                    <div className="flex flex-col gap-[10vh] md:gap-[20vh]">
                        {/* CHiLL Lab Sub-block */}
                        <div className='w-full'>
                            <div className="mb-[2vh] mt-6 md:mb-[4vh] md:mt-[8vh] work-info">
                                <h2 className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.6rem] font-bold leading-tight tracking-tight">Computing for Healthy Living <br /> & Learning Lab (CHiLL)</h2>
                            </div>
                            <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                                <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                                    <img src={ga1} alt="University of Washington" className='w-full h-full object-cover relative z-10' />
                                </div>
                                <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                                    <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                        The CHiLL Lab consists of researchers interested in designing, developing, and evaluating various applications of computing technology that aim to promote healthy lifestyles, education, and ability.
                                    </p>
                                    <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                        <p>Seattle, WA</p>
                                        <p className='text-white'>2020 - 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TAT Lab Sub-block */}
                        <div className='w-full'>
                            <div className="mb-[2vh] md:mb-[4vh] work-info">
                                <h2 className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.6rem] font-bold leading-tight tracking-tight">Tactile & Tactical Design Lab (TAT)</h2>
                            </div>
                            <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                                <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                                    <img src={ga2} alt="University of Washington" className='w-full h-full object-cover relative z-10' />
                                </div>
                                <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                                    <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                        The TAT Lab seeks to open new opportunities for sustainable technology development, broaden the diversity of design and engineering, and extend theoretical frameworks that further our understanding of design and social change.
                                    </p>
                                    <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                        <p>Seattle, WA</p>
                                        <p className='text-white'>2021-2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sociolinguistics Lab Sub-block */}
                        <div className='w-full'>
                            <div className="mb-[2vh] md:mb-[4vh] work-info">
                                <h2 className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.6rem] font-bold leading-tight tracking-tight">Sociolinguistics Lab</h2>
                            </div>
                            <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                                <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                                    <img src={ga3} alt="University of Washington" className='w-full h-full object-cover relative z-10' />
                                </div>
                                <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                                    <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                        The Sociolinguistics Lab investigates the subfield of linguistics that explores the interrelationships between language and society through fieldwork conducted either locally or sites around the world.
                                    </p>
                                    <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                        <p>Seattle, WA</p>
                                        <p className='text-white'>2021-2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Research Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Google Research</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Visiting Student Researcher</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={gr} alt="Google Research" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Conducted UX research on responsible AI and human-centered technology, contributing to tools and practices for ethical AI. Supported research to identify and reduce algorithmic bias, mitigate racial inequities, and design AI systems that promote fairness and minimize harm.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Seattle, WA</p>
                                <p className='text-white'>Fall 2022 - Winter 2023</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apple Research Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Apple Research</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Machine Intelligence Research Scientist Intern</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={appleSiri} alt="Apple Research" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Worked on human-centered AI/ML technologies, focusing on accessibility and intelligent user interfaces. Led the "Toward Inclusive Siri Language Recognition" project, designing inclusive data collection methods to improve Siri's recognition of African American English while prioritizing user safety, comfort, and fairness.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Seattle, WA</p>
                                <p className='text-white'>Summer 2022</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Microsoft Research Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">Microsoft Research</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Research Scientist Intern</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={mr} alt="Microsoft Research" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Conducted research on responsible AI, exploring the societal impacts of AI, ML, and NLP. Led an end-to-end research initiative on inclusive language technologies, investigating fairness challenges faced by African American English speakers and identifying collaborative approaches for more equitable AI system design.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>New York City, NY</p>
                                <p className='text-white'>Summer 2021</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* University of Alabama Piece */}
                <div className='w-full'>
                    <div className="mb-4 md:mb-[6vh] work-info">
                        <h1 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-bold leading-[1.1] mb-2 md:mb-3 tracking-tight">University of <br /> Alabama</h1>
                        <p className="text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] text-[#a0a0a0] font-light">Undergraduate Research Assistant</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-stretch gap-6 md:gap-[4vw] w-full relative z-10'>
                        <div className='work-img-reveal w-full aspect-[16/10] md:aspect-auto md:w-[65%] rounded-xl md:rounded-[1vw] overflow-hidden relative'>
                            <img src={ura} alt="University of Alabama" className='w-full h-full object-cover relative z-10' />
                        </div>
                        <div className='work-info w-full md:w-[35%] text-white flex flex-col justify-between mt-8 md:mt-0 py-[1vh]'>
                            <p className='text-[1.1rem] md:text-[1.15rem] text-[#e0e0e0] font-light leading-relaxed pr-[2vw]'>
                                Developed and implemented a human-centered social robot system for emotion recognition and adaptive behavior. Studied how adaptability and expressivity influence human–robot interaction and the quality of engagement.
                            </p>
                            <div className="mt-8 md:mt-auto text-[0.95rem] md:text-[1.05rem] text-[#a0a0a0] font-medium space-y-1">
                                <p>Tuscaloosa, AL</p>
                                <p className='text-white'>Sept. 2017 – Dec. 2018</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-[5vw] h-px bg-[#333] mb-[6vh] md:mb-[10vh]"></div>

        </div>
    );
}

export default Work;
