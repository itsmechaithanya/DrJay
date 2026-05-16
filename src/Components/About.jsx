import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

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
                        <span className='text-[1.7rem] font-bold pr-[9vw] text-[#ffffff]'>Journey</span>I am a passionate technologist and designer, dedicated to creating meaningful and innovative digital experiences.
                    </p>
                </div>
            </div>

            <div className="w-full h-px bg-[#333] mb-[10vh]"></div>

            <div className="pb-[15vh]">
                <h2 className="text-[2.5rem] font-medium mb-8">My Story</h2>
                <div className="text-xl leading-relaxed text-[#a0a0a0] max-w-4xl space-y-6">
                    <p>
                        With a background spanning across various disciplines in design and engineering, I strive to bridge the gap between complex technical challenges and elegant user-centric solutions.
                    </p>
                    <p>
                        My work is rooted in the belief that technology should be accessible, ethical, and designed with a deep understanding of human needs. I'm constantly exploring new ways to push the boundaries of what's possible on the web.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
