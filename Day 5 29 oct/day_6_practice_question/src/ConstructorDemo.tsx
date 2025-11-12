import React from 'react';

class NumberWrapper {
  value: number;

  constructor(value: number) {
    this.value = value;
    console.log(`NumberWrapper constructor called with value: ${value}`);
  }

  double(): number {
    return this.value * 2;
  }

  toString(): string {
    return `Number: ${this.value}`;
  }
}

const ConstructorDemo: React.FC = () => {
  const demonstrateConstructor = () => {
    console.log('=== Constructor Demo ===');

    const num1 = new NumberWrapper(5);
    console.log('Created:', num1.toString());
    console.log('Doubled:', num1.double());

    const num2 = new NumberWrapper(10);
    console.log('Created:', num2.toString());
    console.log('Doubled:', num2.double());
  };

  return (
    <div>
      <h2>Constructor Demo</h2>
      <button onClick={demonstrateConstructor}>Demonstrate Constructor</button>
      <p>Check the console for constructor demonstrations.</p>
    </div>
  );
};

export default ConstructorDemo;
