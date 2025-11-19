import React from 'react';

export default function HeavyPage() {
  return (
    <div>
      <h3>This is a Heavy Page (Lazy Loaded)</h3>
      <p>Lots of data or heavy computation simulated here.</p>
      <img
        src="https://via.placeholder.com/800x300"
        alt="placeholder"
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </div>
  );
}
