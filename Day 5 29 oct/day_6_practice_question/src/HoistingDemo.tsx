import React from 'react';

const HoistingDemo: React.FC = () => {
  const demonstrateHoisting = () => {
    console.log('=== Variable Hoisting Demo ===');
    // @ts-ignore - Intentionally using variable before declaration to demonstrate hoisting
    console.log('Before declaration:', typeof hoistedVar); // undefined
    var hoistedVar = 'I am hoisted!';
    console.log('After declaration:', hoistedVar);

    console.log('\n=== Function Hoisting Demo ===');
    // Function declaration is hoisted
    hoistedFunction(); // Works because function declaration is hoisted

    function hoistedFunction() {
      console.log('This function is hoisted!');
    }

    // Function expression is not hoisted
    try {
      // @ts-ignore - Intentionally calling function before declaration to demonstrate no hoisting
      notHoistedFunction(); // This will throw an error
    } catch (error: unknown) {
      console.log('Function expression not hoisted:', (error as Error).message);
    }

    const notHoistedFunction = () => {
      console.log('This function expression is not hoisted!');
    };
  };

  return (
    <div>
      <h2>Hoisting Demo</h2>
      <button onClick={demonstrateHoisting}>Demonstrate Hoisting</button>
      <p>Check the console for hoisting demonstrations.</p>
    </div>
  );
};

export default HoistingDemo;
