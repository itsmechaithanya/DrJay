import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    let cursorState = 'normal'; // 'normal', 'read', 'hover'

    const handleMouseOver = (e) => {
      const isRead = e.target.closest('.cursor-read');
      const isClickable = e.target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');

      if (isRead) {
        if (cursorState !== 'read') {
            cursorState = 'read';
            gsap.to(cursor, {
              width: '80px',
              height: '80px',
              backgroundColor: 'white',
              border: 'none',
              duration: 0.3,
              ease: 'power2.out'
            });
            if (textRef.current) {
              textRef.current.innerText = 'Read';
              gsap.to(textRef.current, { color: 'black', opacity: 1, duration: 0.3 });
            }
        }
      } else if (isClickable) {
        if (cursorState !== 'hover') {
          cursorState = 'hover';
          gsap.to(cursor, {
            width: '70px',
            height: '70px',
            backgroundColor: 'transparent',
            border: '1px solid gray',
            duration: 0.3,
            ease: 'power2.out'
          });
          if (textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
              if (cursorState !== 'read' && textRef.current) textRef.current.innerText = '';
            }});
          }
        }
      } else {
        if (cursorState !== 'normal') {
          cursorState = 'normal';
          gsap.to(cursor, {
            width: '50px',
            height: '50px',
            backgroundColor: 'transparent',
            border: '1px solid gray',
            duration: 0.3,
            ease: 'power2.out'
          });
          if (textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
              if (cursorState !== 'read' && textRef.current) textRef.current.innerText = '';
            }});
          }
        }
      }
    };

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:flex items-center justify-center font-medium pointer-events-none z-9999 fixed top-0 left-0"
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '1px solid gray',
        backgroundColor: 'transparent',
      }}
    >
        <span ref={textRef} className="opacity-0 text-[1rem]"></span>
    </div>
  );
};

export default CustomCursor;
