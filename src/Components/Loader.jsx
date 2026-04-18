import React, { useEffect, useRef, useState } from 'react';
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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '5vw',
      }}
    >
      <h1
        ref={counterRef}
        style={{
          fontFamily: "'Gilroy', sans-serif",
          fontSize: '12vw',
          fontWeight: 300,
          color: '#ffffff',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        0
      </h1>
    </div>
  );
};

export default Loader;
