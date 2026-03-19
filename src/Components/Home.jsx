import React, { useEffect, useRef } from 'react';
import portrait from '../assets/Jay.jpg';
import top from '../assets/top.png';
import down from '../assets/down.png';
import bottom from '../assets/bottom.png';
import navtop from '../assets/navtop.png';
import work1 from '../assets/work1.png';
import work2 from '../assets/workj2.png';
import work3 from '../assets/work3.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

function Home() {
    const marqueeRef = useRef(null);
    const textRevealRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const items = gsap.utils.toArray('.marquee-item');

        if (textRevealRef.current) {
            // Reveal the text container right before GSAP takes over to prevent FOUC (Flash of Unstyled Content)
            textRevealRef.current.style.visibility = 'visible';

            // Split the text into lines and words
            const splitText = new SplitType(textRevealRef.current, { types: 'lines, words' });

            gsap.fromTo(splitText.words,
                { opacity: 0, y: 10 }, // Words start hidden and slightly pushed down
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4, // Faster fade duration per word
                    ease: "power2.out",
                    stagger: 0.03, // Tighter stagger for a quicker cascading reveal
                    scrollTrigger: {
                        trigger: textRevealRef.current,
                        start: "top 85%", // starts when element is 85% down the viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // GSAP Helper function for seamless looping
        function horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
                length = items.length,
                startX = items[0].offsetLeft,
                times = [],
                widths = [],
                xPercents = [],
                curIndex = 0,
                pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
                totalWidth, curX, distanceToStart, distanceToLoop, item, i;
            gsap.set(items, {
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, { x: 0 });
            totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                    .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if (time > tl.time() !== index > curIndex) {
                    vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex + 1, vars);
            tl.previous = vars => toIndex(curIndex - 1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true);
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            return tl;
        }

        const loop = horizontalLoop(items, {
            paused: false,
            repeat: -1,
            speed: 1.5 // Base continuous speed
        });

        let scrollTimeout;
        let direction = 1;
        let lastTop = 0;

        const tick = () => {
            if (!marqueeRef.current) {
                return;
            }

            const currentTop = marqueeRef.current.getBoundingClientRect().top;

            // Initialize lastTop on first valid tick
            if (lastTop === 0) {
                lastTop = currentTop;
                return;
            }

            const delta = currentTop - lastTop;

            // If the element moved visually on screen
            if (Math.abs(delta) > 0.1) {
                // delta is negative when scrolling down. Move left (time forward)
                // Exactly 1:1 match. Loop speed is 1.5 * 100 = 150px/sec.
                // We add exactly enough time to move the text by `delta` pixels.
                // MULTIPLY by an extra factor if you want it to feel even faster than 1:1!
                // But (-delta) / 150 is the mathematically pure 1:1 match.
                // Let's use 1.5x multiplier to make it feel slightly more responsive to heavy scrolling if 1:1 feels too slow.
                const visualMultiplier = 1;
                const scrubAmount = ((-delta) / 150) * visualMultiplier;

                loop.time(loop.time() + scrubAmount);

                // Keep continuous play in the direction of the scroll
                direction = delta < 0 ? 1 : -1;
                loop.timeScale(direction);

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    loop.timeScale(direction);
                }, 50);
            }

            lastTop = currentTop;
        };

        gsap.ticker.add(tick);

        return () => {
            loop.kill();
            gsap.ticker.remove(tick);
            clearTimeout(scrollTimeout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div>
            <div className="w-screen h-screen bg-black overflow-hidden text-white relative">
                <div className="w-full h-full relative">
                    <h1 className='absolute z-10 text-[5.3vh] top-[37vh] left-[5vw] text-[#ededed]'>This is</h1>
                    <h1 className='absolute z-10 text-[15.1vh] font-bold top-[39vh] left-[5vw]'>Dr.Jay</h1>
                    <h1 className='absolute z-10 text-[6.2vh] top-[55vh] left-[5vw] text-[#ededed]'>Cunningham</h1>

                    <h1 className='absolute z-10 text-[2.5vh] top-[45vh] right-[4vw] text-right leading-[3vh] text-[#ededed]'>Based in <br /> Chicago, IL</h1>

                    <img src={portrait} alt="" className='w-full h-[105vh] object-cover mt-[-5vh]' />
                    <img src={top} alt="" className='absolute top-[-10vh] left-0 object-cover' />
                    <img src={bottom} alt="" className='absolute bottom-[-50vh] left-[-35vh] object-cover' />
                    <img src={bottom} alt="" className='absolute bottom-[5vh] right-[-60vh] object-cover' />
                    <img src={down} alt="" className='absolute bottom-[-45vh] w-full left-0 object-cover' />

                </div>


                <div className='absolute z-10 bottom-[-4vh] left-0 w-full overflow-hidden whitespace-nowrap font-suisse'>
                    <div ref={marqueeRef} className='flex w-max'>
                        <h1 className='text-[17.8vh] font-suisse font-medium pr-10 marquee-item text-transparent [-webkit-text-stroke:2px_#CFB88B] hover:text-[#CFB88B] transition-colors duration-300'>
                            AI Trust & Safety Research Scientist &nbsp;&nbsp;&nbsp; Professor at DePaul University School of Computing &nbsp;&nbsp;&nbsp; Founder : AmendLabs x JaliaTechnologies &nbsp;&nbsp;&nbsp;
                        </h1>
                        <h1 className='text-[17.8vh] font-suisse font-medium pr-10 marquee-item text-transparent [-webkit-text-stroke:2px_#CFB88B] hover:text-[#CFB88B] transition-colors duration-300'>
                            AI Trust & Safety Research Scientist &nbsp;&nbsp;&nbsp; Professor at DePaul University School of Computing &nbsp;&nbsp;&nbsp; Founder : AmendLabs x JaliaTechnologies &nbsp;&nbsp;&nbsp;
                        </h1>
                    </div>
                </div>


            </div>
            <div className='w-full h-screen px-[5vw] flex items-center justify-center font-light bg-black'>
                <div ref={textRevealRef} style={{ visibility: 'hidden' }}>
                    <h1 className='text-[5.3vh]'>
                        <span className='text-[2.6vh] font-bold pr-[9vw] text-[#dadada]'>I focus</span> on advancing responsible technology through interdisciplinary research at the intersection of AI governance, data ethics, and technology equity. As an Assistant Professor of Human-Computer Interaction at DePaul University, I lead the RAISE Lab to promote responsible AI and computing for the common good.
                    </h1>
                </div>
            </div>
            <div className='w-screen bg-black pb-[10vh]'>
                <h1 className='text-[5vh] px-[5vw] mb-[10vh]'>Selected Work</h1>
                <div className="w-full flex flex-col px-[10vw] items-end gap-[15vh]">
                    {/* Work 1 */}
                    <div className="w-[35vw] overflow-hidden group cursor-pointer relative">
                        <img
                            src={work1}
                            alt="Selected Work 1"
                            className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        />
                    </div>

                    {/* Work 2 */}
                    <div className="w-[35vw] overflow-hidden group cursor-pointer relative">
                        <img
                            src={work2}
                            alt="Selected Work 2"
                            className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        />
                    </div>

                    {/* Work 3 */}
                    <div className="w-[35vw] overflow-hidden group cursor-pointer relative">
                        <img
                            src={work3}
                            alt="Selected Work 3"
                            className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home