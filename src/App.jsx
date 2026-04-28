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

function App() {
  const scrollRef = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(() => {
    const hasCompleted = sessionStorage.getItem('loaderHasCompleted');
    if (hasCompleted) {
      window.loaderHasCompleted = true;
      return false;
    }
    return true;
  });
  useEffect(() => {
    let locoScroll;
    if (!loading) {
      import('locomotive-scroll').then((LocomotiveScroll) => {
        locoScroll = new LocomotiveScroll.default({
          el: scrollRef.current,
          smooth: true,
        });
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
      <div ref={scrollRef} data-scroll-container className="bg-[#0a0a0a] text-white font-gilroy">
        <Navbar />
        <div data-scroll-section>
          <AnimatePresence mode="wait">
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
      </div>
    </>
  )
}

export default App;
