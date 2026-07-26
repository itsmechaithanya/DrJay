import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import speakkk from '../assets/speakkkk.avif';
import s1 from '../assets/s1.webp';
import s2 from '../assets/s2.webp';
import s3 from '../assets/s3.webp';
import s4 from '../assets/s4.webp';
import s5 from '../assets/s5.webp';
import s6 from '../assets/s6.webp';
import s7 from '../assets/s7.webp';
import s8 from '../assets/s8.webp';

function Speaking() {
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
                    }
                }
            );

            return () => {
                if (handleLoaderComplete) window.removeEventListener('loaderComplete', handleLoaderComplete);
                revealAnim.kill();
                splitText.revert();
            };
        }
    }, []);



    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] pt-[15vh] md:pt-[25vh] px-[6vw] md:px-[5vw] text-white">
            <div className="overflow-hidden mb-[8vh] md:mb-[12vh]">
                <h1 className="hero-title inline-block text-[15vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    Speaking
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[8vh] md:mb-[12vh]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[1.8rem] md:text-[3rem] leading-relaxed md:leading-normal text-[#a1a1a1] font-light">
                        <span className='text-[1.2rem] md:text-[1.7rem] font-bold pr-[4vw] md:pr-[9vw] text-[#ffffff] block md:inline mb-2 md:mb-0'>Talks</span>
                        A trusted voice in responsible AI and public-interest technology, presenting on design justice, speech equity, policy governance, and community-led engineering.
                    </p>
                </div>
            </div>

            <div className="w-full aspect-video overflow-hidden rounded-[2vw] md:rounded-[1vw] border border-white/10 shadow-[0_0_5vw_rgba(0,0,0,0.5)] mb-[8vh] md:mb-[7vh]">
                <img
                    src={speakkk}
                    alt="Dr. Jay L. Cunningham Speaking"
                    className="w-full h-full object-cover grayscale"
                />
            </div>

            <div className="flex flex-col md:flex-row items-start justify-between w-full mb-[8vh] md:mb-[20vh] gap-8 md:gap-0">
                <div className="w-full md:w-[90%] text-[1.25rem] md:text-[4rem] font-light leading-[1.4] md:leading-[5rem] text-[#e5e5e5]">
                    Through community participation, design justice, and ethical governance, I promote responsible, human-centered AI systems.
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between items-start mb-[12vh] md:mb-[18vh]">
                {/* Left Column: Quote */}
                <div className="w-full lg:w-[40%] flex flex-col">
                    <p className="text-[1.8rem] md:text-[2.2rem] leading-[1.4] text-white font-light tracking-tight">
                        "Linguistic diversity must not be treated as an edge-case defect; sociolinguistic competence is a fundamental requirement for ethical AI infrastructure."
                    </p>
                    <span className="text-[0.75rem] md:text-[0.9rem] tracking-widest text-[#a1a1a1] mt-4 font-bold block">
                        — Dr. Jay L. Cunningham
                    </span>
                </div>

                {/* Right Column: Keynotes info */}
                <div className="w-full lg:w-[50%] flex flex-col gap-12 md:gap-16 pr-[5%]">
                    {/* Item (01) */}
                    <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                        <span className="text-[#a1a1a1] text-[1.1rem] font-medium leading-none pt-1">(01)</span>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[1.5rem] md:text-[1.75rem] font-medium text-white tracking-tight leading-tight">About the talks</h3>
                            <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.75] text-[#a1a1a1] font-light">
                                Dr. Jay’s keynotes and seminars offer critical evaluations of the AI lifecycle, placing a particular emphasis on the sociolinguistic, ethical, and governance dimensions of data curation and voice technology. Through cases like ASR performance disparities, he interrogates how automated systems reproduce power dynamics and systemic harms against minoritized groups.
                            </p>
                        </div>
                    </div>

                    {/* Item (02) */}
                    <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                        <span className="text-[#a1a1a1] text-[1.1rem] font-medium leading-none pt-1">(02)</span>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[1.5rem] md:text-[1.75rem] font-medium text-white tracking-tight leading-tight">What you'll learn</h3>
                            <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.75] text-[#a1a1a1] font-light">
                                Audiences gain concrete strategies and frameworks for design justice and community co-governance. Dr. Jay demonstrates how to actively embed representational justice throughout the NLP pipeline, transition from diagnostic auditing to structural intervention, and establish community advisory boards to enforce genuine algorithmic accountability.
                            </p>
                        </div>
                    </div>

                    {/* CTA Link */}
                    <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
                        <span className="text-transparent text-[1.1rem] leading-none select-none pt-1">(00)</span>
                        <div className="pt-2">
                            <Link
                                to="/contact"
                                className="inline-block text-[1.05rem] md:text-[1.15rem] text-white hover:text-[#CFB88B] transition-colors duration-300 font-semibold underline underline-offset-[12px] decoration-1 decoration-white/30 hover:decoration-[#CFB88B]"
                            >
                                Book Jay to speak
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col items-start mb-[10vh] md:mb-[15vh]">
                <h4 className="text-[#ffffff] text-[1.5rem] md:text-[2rem] font-semibold mb-8 md:mb-12">
                    Delivered talks for
                </h4>

                <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 overflow-hidden">
                    <div
                        className="absolute top-0 bottom-0 left-0 w-32 md:w-80 z-20 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%)' }}
                    ></div>
                    <div
                        className="absolute top-0 bottom-0 right-0 w-32 md:w-80 z-20 pointer-events-none"
                        style={{ background: 'linear-gradient(to left, #0a0a0a 0%, rgba(10, 10, 10, 0) 100%)' }}
                    ></div>

                    <style>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .marquee-inner {
                            display: flex;
                            width: max-content;
                            gap: 1.5rem;
                            animation: marquee 25s linear infinite;
                        }
                    `}</style>
                    <div className="marquee-inner">
                        {[...[s1, s2, s3, s4, s5, s6, s7, s8], ...[s1, s2, s3, s4, s5, s6, s7, s8]].map((logo, index) => (
                            <div
                                key={index}
                                className="border border-[#464646] rounded-lg md:rounded-xl flex items-center justify-center h-50 md:h-80 w-50 md:w-80 shrink-0 shadow-sm transition-transform duration-300"
                            >
                                <img
                                    src={logo}
                                    alt={`Partner Logo ${(index % 8) + 1}`}
                                    className="h-50 md:h-80 w-auto max-w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Availability & Inquiries */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0 mb-[15vh] md:mb-[20vh]">
                {/* Left label */}
                <div className="w-full lg:w-[30%]">
                    <h4 className="text-[#ffffff] text-[1.5rem] md:text-[2rem] font-semibold md:mb-12">
                        Availability
                    </h4>
                </div>

                {/* Right content */}
                <div className="w-full lg:w-[65%] flex flex-col gap-6 md:gap-8 pb-[10vh]">
                    <p className="text-[0.95rem] sm:text-[1rem] md:text-[1.4rem] leading-[1.75] text-[#a1a1a1] font-light">
                        Currently available for consultations, advisory boards, speaking engagements, and venture opportunities related to responsible AI, public-interest technology, natural-language processing, computer vision, fintech, and AI policy&thinsp;/&thinsp;legislation.
                    </p>

                    <p className="text-[0.95rem] sm:text-[1rem] md:text-[1.4rem] leading-[1.75] text-[#a1a1a1] font-light">
                        For consulting services or business inquiries, please email{' '}
                        <a
                            href="mailto:info@jalia.tech"
                            className="text-white underline underline-offset-[6px] decoration-1 decoration-white/30 hover:text-[#CFB88B] hover:decoration-[#CFB88B] transition-colors duration-300"
                        >
                            info@jalia.tech
                        </a>{' '}
                        for contract details and rates. Unpaid engagements are not accepted, with the exception of non-profit, community, or social-good causes.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Speaking;
