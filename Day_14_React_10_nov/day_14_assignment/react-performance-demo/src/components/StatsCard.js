import React from "react";

// React.memo ensures component re-renders only if props change
const StatsCard = React.memo(({ title, value, lastUpdated }) => {
  console.log(`🔁 Re-rendered StatsCard: ${title}`);

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px",
      borderRadius: "8px",
      width: "200px",
      display: "inline-block"
    }}>
      <h3>{title}</h3>
      <p>Value: {value}</p>
      <p>Updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
    </div>
  );
});

export default StatsCard;
