import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Work from './Components/Work';
import About from './Components/About';
import Publications from './Components/Publications';
import RaiseLab from './Components/RaiseLab';
import Contact from './Components/Contact';

function App() {
  const scrollRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let locoScroll;
    import('locomotive-scroll').then((LocomotiveScroll) => {
      locoScroll = new LocomotiveScroll.default({
        el: scrollRef.current,
        smooth: true,
      });
    });

    return () => {
      if (locoScroll) locoScroll.destroy();
    };
  }, []);

  return (
      <div ref={scrollRef} data-scroll-container className="bg-[#0a0a0a] text-white font-gilroy">
        <Navbar />
        <div data-scroll-section>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/raise-lab" element={<RaiseLab />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
  )
}

export default App;
