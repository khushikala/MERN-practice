import React from 'react';
import withWindowSize from './withWindowSize';

const ResponsiveComponent = ({ windowWidth }) => {
  const isMobile = windowWidth < 768;

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      Window Width: {windowWidth}px
      <br />
      View: {isMobile ? 'Mobile' : 'Desktop'}
    </div>
  );
};

const ResponsiveWithWindowSize = withWindowSize(ResponsiveComponent);

export default ResponsiveWithWindowSize;
