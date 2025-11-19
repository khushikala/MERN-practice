import React, { useState, useEffect } from "react";

export default function Counter() {
// state veriable setcount  st to 0
  const [count, setCount] = useState(0); 

            //   update the count when you click
  useEffect(() => { 
    document.title = `You clicked ${count} times`;
  }, [count]); // Effect runs when count changes

  return (
    <div style={{ padding: 20 }}>
      <h2>React Hooks Demo</h2>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
} 




 








