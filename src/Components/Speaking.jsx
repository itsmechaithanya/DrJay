import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

function Speaking() {
    const textRevealRef = useRef(null);
    const gridRef = useRef(null);

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
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.talk-card');
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

        return () => ctx.revert();
    }, []);
    return (
        <div className="w-screen min-h-screen bg-[#0a0a0a] pt-[25vh] px-[5vw] text-white">
            <div className="overflow-hidden mb-[12vh]">
                <h1 className="hero-title inline-block text-[12vw] md:text-[9rem] font-bold tracking-tighter leading-none">
                    Speaking
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full mb-[12vh]">
                <div className="w-full pt-3" ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <p className="text-[3rem] leading-normal text-[#a1a1a1] font-light">
                        <span className='text-[1.7rem] font-bold pr-[9vw] text-[#ffffff]'>Talks</span>A trusted voice in responsible AI and public-interest technology, working across consulting, advisory, speaking, and collaborations in AI, policy, and emerging tech.
                    </p>
                </div>
            </div>

            <div className="w-full h-px bg-[#333] mb-[10vh]"></div>
         </div>
    );
}

export default Speaking;
