import React from 'react';
import { motion, useIsPresent } from 'framer-motion';

const PageTransition = ({ children }) => {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const isPresent = useIsPresent();

  const shouldClear = isCompleted && isPresent;

  return (
    <>
      <style>{`
        .clear-transforms {
          transform: none !important;
          filter: none !important;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={shouldClear ? "clear-transforms" : ""}
        onAnimationComplete={() => setIsCompleted(true)}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
