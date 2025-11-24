import React, { useState, useEffect } from 'react';

const withWindowSize = (WrappedComponent) => {
  return function WindowSizeWrapper(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return <WrappedComponent {...props} windowWidth={windowWidth} />;
  };
};

export default withWindowSize;
