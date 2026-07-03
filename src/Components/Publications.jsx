import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import work1 from '../assets/work1.png';
import work2 from '../assets/workj2.png';
import work3 from '../assets/work3.jpg';
import P1 from '../assets/P1.avif';
import pub1 from '../assets/pub1.png';
import pub2 from '../assets/pub2.png';
import pub3 from '../assets/pub3.png';
import p2 from '../assets/p2.jpeg';
import p3 from '../assets/p3.avif';
import p4 from '../assets/p4.avif';
import p5 from '../assets/p5.jpeg';
import p6 from '../assets/p6.jpeg';
import p7 from '../assets/p7.avif';
import p8 from '../assets/p8.avif';
import p9 from '../assets/p9.avif';
import p10 from '../assets/p10.avif';
import p11 from '../assets/p11.avif';

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

    const filters = ['Show all', 'AI & Ethics', 'HCI', 'Health Tech', 'FinTech', 'Education'];

    const publications = [
        { id: 1, title: 'Why does HCI view techno-solution as the end point to a social problem?', category: 'HCI', year: '2023', image: work1, link: 'https://dl.acm.org/doi/pdf/10.1145/3557890' },
        { id: 2, title: 'The cost of using culture to market financial access in Black communities.', category: 'FinTech', year: '2022', image: work2, link: 'https://dl.acm.org/doi/epdf/10.1145/3532106.3533569' },
        { id: 3, title: 'Examining and Reflecting on Collaboration with Aging Communities', category: 'HCI', year: '2021', image: work3, link: 'https://dl.acm.org/doi/pdf/10.1145/3479506?casa_token=dNTL9KMJ5WMAAAAA:PackdiWQI7XTxMkcgKlGi7V_EJaFTQ3YCP3U4k3fDCGvs3uf7O7RsELy_0XLwCOT8swlkK2fvJGElw' },
        { id: 4, title: 'Understanding the Impacts of Language Technologies’ Performance Disparities on African American Language Speakers', category: 'HCI', year: '2024', image: P1, link: 'https://aclanthology.org/2024.findings-acl.761/' },
        { id: 5, title: 'Designing Inclusive Speech Recognition Systems', category: 'AI & Ethics', year: '2023', image: p2, link: 'https://dl.acm.org/doi/full/10.1145/3544549.3577057' },
        { id: 6, title: 'Should AI mimic people? Understanding AI-supported writing technology among black users', category: 'Education', year: '2025', image: p4, link: 'https://dl.acm.org/doi/abs/10.1145/3757423' },
        { id: 7, title: 'Towards Equitable Community-Industry Collaborations: Understanding the Experiences of Nonprofits Collaborations with Tech Companies', category: 'Education', year: '2024', image: p3, link: '#' },
        { id: 8, title: 'Toward Responsible ASR for African American English Speakers: A Scoping Review of Bias and Equity in Speech Technology', category: 'Education', year: '2021', image: p5, link: '#' },
        { id: 9, title: 'Society and inclusive technology design pedagogy: a digital zine', category: 'AI & Ethics', year: '2024', image: p6, link: '#' },
        { id: 10, title: 'Scalable community mentorship: A vision for engineering literacy & access', category: 'HCI', year: '2026', image: p7, link: '#' },
        { id: 11, title: 'AVELA-A Vision for Engineering Literacy & Access: Understanding Why Technology Alone Is Not Enough', category: 'AI & Ethics', year: '2025', image: p8, link: '#' },
        { id: 12, title: 'Methods of Designing Justice-oriented Interactive AI Systems', category: 'Education', year: '2021', image: p9, link: '#' },
        { id: 13, title: 'Beyond Participation: Building a Black Community Advisory Board for Computing Research Collaborations', category: 'Education', year: '2021', image: p10, link: '#' },
        { id: 14, title: 'Advancing NLP Data Equity: Practitioner Responsibility and Accountability in NLP Data Practices', category: 'Education', year: '2021', image: p11, link: '#' },
        // { id: 15, title: 'Society and inclusive technology design pedagogy', category: 'Education', year: '2021', image: p9, link: '#' },
        // { id: 16, title: 'Jay L. Cunningham', category: 'Education', year: '2021', image: p9, link: '#' },
    ];

    return (
        <div className="w-screen min-h-screen bg-[#0a0a0a] pt-[15vh] md:pt-[25vh] px-[6vw] md:px-[5vw] text-white">
            <div className="overflow-hidden mb-[8vh] md:mb-[12vh]">
                <h1 className="hero-title inline-block text-[15vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    Publications
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[8vh] md:mb-[12vh]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[1.8rem] md:text-[3rem] text-[#a1a1a1] font-light leading-snug">
                        <span className='text-[1.2rem] md:text-[1.7rem] font-bold pr-[4vw] md:pr-[9vw] text-[#ffffff] block md:inline mb-2 md:mb-0'>Overview</span>
                        Research, design, engineering, strategy, and policy define my work spanning projects, publications, and ideas focused on innovation, critical thinking, and meaningful impact.
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-[6vh] md:mb-[8vh]">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full md:rounded-4xl text-[0.85rem] md:text-[0.95rem] font-medium transition-all duration-300 ${activeFilter === filter
                            ? 'bg-white text-black'
                            : 'bg-[#1c1c1c] text-[#a0a0a0]'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
                <button
                    className="px-4 md:px-6 py-2 md:py-2.5 rounded-full md:rounded-4xl text-[0.85rem] md:text-[0.95rem] font-medium bg-[#1c1c1c] text-[#a0a0a0] flex items-center gap-2 ml-0 md:ml-2 transition-all duration-300"
                    onClick={() => setActiveFilter('Show all')}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                    Reset
                </button>
            </div>

            <div className="w-full h-px bg-[#333] mb-[6vh] md:mb-[10vh]"></div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-14 gap-y-12 md:gap-y-18 pb-[10vh] md:pb-[15vh]">
                {publications.filter(pub => activeFilter === 'Show all' || pub.category === activeFilter).map(pub => (
                    <a key={pub.id} href={pub.link} target="_blank" rel="noopener noreferrer" className="pub-card group cursor-pointer flex flex-col">
                        <div className="cursor-read w-full aspect-[4/5] md:aspect-3/5 rounded-2xl overflow-hidden mb-5 md:mb-6 bg-[#111] border border-[#333] transition-transform duration-500 group-hover:scale-[1.02]">
                            <img
                                src={pub.image}
                                alt={pub.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col grow">
                            <div className="flex justify-between items-center mb-2.5 md:mb-3">
                                <span className="text-[#a0a0a0] text-[0.8rem] md:text-sm uppercase tracking-wider">{pub.category}</span>
                                <span className="text-[#a0a0a0] text-[0.8rem] md:text-sm font-medium">{pub.year}</span>
                            </div>
                            <h3 className="text-[1.25rem] md:text-[1.5rem] font-medium leading-[1.3] transition-colors duration-300 group-hover:text-[#a0a0a0]">{pub.title}</h3>
                            
                            {/* Mobile-only Article Button */}
                            <div className="md:hidden mt-4 pt-1">
                                <span className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300 w-fit">
                                    <span>Article</span>
                                    <svg width="1.1rem" height="1.1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17l9.2-9.2M17 16.8V7H7.2" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </a>
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
