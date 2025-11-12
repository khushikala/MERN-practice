import React from 'react';
import { NumberItem } from './types';

interface LoggerProps {
  numbers: NumberItem[];
}

const Logger: React.FC<LoggerProps> = ({ numbers }) => {
  const logNumbers = () => {
    console.log('Logging numbers using forEach:');
    numbers.forEach((item, index) => {
      console.log(`Index ${index}: ${item.value}`);
    });
  };

  return (
    <div>
      <h2>Logger</h2>
      <button onClick={logNumbers}>Log Numbers to Console</button>
      <p>Check the browser console for logged numbers.</p>
    </div>
  );
};

export default Logger;
