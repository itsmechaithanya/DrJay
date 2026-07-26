import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const counterObj = useRef({ value: 0 });

  useEffect(() => {
    // Lock scroll on body during loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide loader out
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
            window.loaderHasCompleted = true;
            sessionStorage.setItem('loaderHasCompleted', 'true');
            window.dispatchEvent(new Event('loaderComplete'));
            if (onComplete) onComplete();
          },
        });
      },
    });

    const steps = [0, 12, 24, 37, 45, 58, 68, 78, 89, 100];
    const stepDuration = 0.33; // 9 steps × 0.33s ≈ 3s total

    // Initial pause before counting begins
    tl.to({}, { duration: 1 });

    steps.forEach((val, i) => {
      if (i === 0) return;
      tl.to(counterObj.current, {
        value: val,
        duration: stepDuration,
        ease: 'power1.out',
        onStart: () => {
          if (counterRef.current) {
            counterRef.current.textContent = val;
          }
        },
      });
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] bg-[#191919] flex items-end justify-end pr-[6vw] pb-[4vh] md:pr-[2vw] md:pb-[2vh]"
    >
      <h1
        ref={counterRef}
        className="text-[25vw] md:text-[12vw] font-light text-white leading-none tracking-tighter"
        style={{
          fontFamily: "'Gilroy', sans-serif",
        }}
      >
        0
      </h1>
    </div>
  );
};

export default Loader;
