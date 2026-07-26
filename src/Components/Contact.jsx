import React, { useEffect } from 'react';

function Contact() {
  useEffect(() => {
    window.location.href = 'mailto:engage@jaylcunningham.com';
  }, []);

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col items-center justify-center px-[5vw]">
      <h1 className="text-[2rem] font-bold mb-4 tracking-tight">Redirecting to Mail...</h1>
      <p className="text-[#a1a1a1] text-[1.1rem] font-light mb-6 text-center max-w-[500px]">
        If your mail client doesn't open automatically, you can email Dr. Jay directly at:
      </p>
      <a 
        href="mailto:engage@jaylcunningham.com" 
        className="text-[1.5rem] md:text-[2rem] text-[#CFB88B] hover:underline font-medium transition-all"
      >
        engage@jaylcunningham.com
      </a>
    </div>
  );
}

export default Contact;
