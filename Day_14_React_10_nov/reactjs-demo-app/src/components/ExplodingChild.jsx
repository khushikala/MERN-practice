import React from 'react';

export default function ExplodingChild({ shouldExplode }) {
  if (shouldExplode) {
    throw new Error("💣 Boom! Component crashed.");
  }
  return <div>Everything is fine here. (Click “Cause Error” to break it)</div>;
}
