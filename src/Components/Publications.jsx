import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import work1 from '../assets/work1.png';
import work2 from '../assets/workj2.png';
import work3 from '../assets/work3.jpg';

function Publications() {
    const [activeFilter, setActiveFilter] = useState('Show all');
    const textRevealRef = useRef(null);
    const gridRef = useRef(null);
    const ctx = useRef(null);

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

            return () => {
                if (handleLoaderComplete) window.removeEventListener('loaderComplete', handleLoaderComplete);
                revealAnim.kill();
                splitText.revert();
            };
        }
    }, []);

    useEffect(() => {
        if (ctx.current) ctx.current.revert();

        ctx.current = gsap.context(() => {
            const cards = gsap.utils.toArray('.pub-card');
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        }, gridRef);

        return () => {
            if (ctx.current) ctx.current.revert();
        };
    }, [activeFilter]);

    const filters = ['Show all', 'AI & Ethics', 'HCI', 'Health Tech', 'FinTech', 'Social Media'];

    const publications = [
        { id: 1, title: 'Why is the solution the end point to a problem?', category: 'AI & Ethics', image: work1 },
        { id: 2, title: 'Can FinTech Truly Deliver Financial Inclusion?', category: 'FinTech', image: work2 },
        { id: 3, title: 'Intergenerational design collaborations', category: 'Health Tech', image: work3 },
        { id: 4, title: 'Data Ethics in Modern Computing', category: 'AI & Ethics', image: work1 },
        { id: 5, title: 'Addressing Bias in Machine Learning', category: 'HCI', image: work2 },
        { id: 6, title: 'Social Media Algorithms and Trust', category: 'Social Media', image: work3 },
    ];

    return (
        <div className="w-screen min-h-screen bg-[#0a0a0a] pt-[25vh] px-[5vw] text-white">
            <div className="overflow-hidden mb-[12vh]">
                <h1 className="hero-title inline-block text-[12vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    Publications
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[12vh]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[3.9rem] text-[#a1a1a1] font-light">
                        <span className='text-[1.7rem] font-bold pr-[9vw] text-[#ffffff]'>Overview</span>Research, design, engineering, strategy, and policy define my work spanning projects, publications, and ideas focused on innovation, critical thinking, and meaningful impact.
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-[8vh]">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2.5 rounded-4xl text-[0.95rem] font-medium transition-all duration-300 ${activeFilter === filter
                                ? 'bg-white text-black'
                                : 'bg-[#1c1c1c] text-[#a0a0a0]'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
                <button
                    className="px-6 py-2.5 rounded-4xl text-[0.95rem] font-medium bg-[#1c1c1c] text-[#a0a0a0] flex items-center gap-2 ml-2 transition-all duration-300"
                    onClick={() => setActiveFilter('Show all')}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                    Reset
                </button>
            </div>

            <div className="w-full h-px bg-[#333] mb-[10vh]"></div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pb-[15vh]">
                {publications.filter(pub => activeFilter === 'Show all' || pub.category === activeFilter).map(pub => (
                    <div key={pub.id} className="pub-card cursor-pointer flex flex-col">
                        <div className="cursor-read w-full aspect-3/5 rounded-2xl overflow-hidden mb-6 bg-[#111]">
                            <img
                                src={pub.image}
                                alt={pub.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col grow">
                            <p className="text-[#a0a0a0] text-sm mb-3 uppercase tracking-wider">{pub.category}</p>
                            <h3 className="text-[1.5rem] font-medium leading-[1.3]">{pub.title}</h3>
                        </div>
                    </div>
                ))}
                {publications.filter(pub => activeFilter === 'Show all' || pub.category === activeFilter).length === 0 && (
                    <div className="col-span-full py-[10vh] text-center text-[#a0a0a0] text-xl">
                        No publications found for this category.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Publications;
