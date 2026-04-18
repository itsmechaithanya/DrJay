import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Work from './Components/Work';
import About from './Components/About';
import Publications from './Components/Publications';
import RaiseLab from './Components/RaiseLab';
import Contact from './Components/Contact';
import CustomCursor from './Components/CustomCursor';
import Loader from './Components/Loader';

function App() {
  const scrollRef = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

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
    </>
  )
}

export default App;
