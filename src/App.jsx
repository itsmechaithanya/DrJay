import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Work from './Components/Work';
import About from './Components/About';
import Publications from './Components/Publications';
import RaiseLab from './Components/RaiseLab';
import Speaking from './Components/Speaking';
import Contact from './Components/Contact';
import CustomCursor from './Components/CustomCursor';
import Loader from './Components/Loader';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './Components/PageTransition';
import Footer from './Components/Footer';

function App() {
  const scrollRef = useRef(null);
  const scrollInstance = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(() => {
    const hasCompleted = sessionStorage.getItem('loaderHasCompleted');
    if (hasCompleted) {
      window.loaderHasCompleted = true;
      return false;
    }
    return true;
  });

  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (footerRef.current) {
       setFooterHeight(footerRef.current.offsetHeight);
       const resizeObserver = new ResizeObserver(entries => {
         for (let entry of entries) {
           setFooterHeight(entry.target.offsetHeight);
         }
       });
       resizeObserver.observe(footerRef.current);
       return () => resizeObserver.disconnect();
    }
  }, []);
  useEffect(() => {
    let locoScroll;
    if (!loading) {
      import('locomotive-scroll').then((LocomotiveScroll) => {
        locoScroll = new LocomotiveScroll.default({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          lerp: 0.08,
        });
        scrollInstance.current = locoScroll;
      });
    }

    return () => {
      if (locoScroll) locoScroll.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      
      {/* Full screen black background behind everything to prevent white bars */}
      <div className="fixed top-0 left-0 w-full h-screen bg-black z-0 pointer-events-none"></div>
      
      <div ref={footerRef} className="fixed bottom-0 left-0 w-full z-0 flex flex-col justify-end">
        <Footer />
      </div>

      <div ref={scrollRef} data-scroll-container className="text-white font-gilroy relative z-10 bg-transparent pointer-events-none">
        <div className="pointer-events-auto relative z-50">
          <Navbar />
        </div>
        <div data-scroll-section className="bg-[#0a0a0a] min-h-screen relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
          <AnimatePresence mode="wait" onExitComplete={() => {
            if (scrollInstance.current) {
              scrollInstance.current.scrollTo(0, { duration: 0, disableLerp: true, immediate: true });
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/publications" element={<PageTransition><Publications /></PageTransition>} />
              <Route path="/speaking" element={<PageTransition><Speaking /></PageTransition>} />
              <Route path="/raise-lab" element={<PageTransition><RaiseLab /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </div>
        <div data-scroll-section style={{ height: footerHeight }} className="w-full bg-transparent pointer-events-none relative z-0"></div>
      </div>
    </>
  )
}

export default App;
