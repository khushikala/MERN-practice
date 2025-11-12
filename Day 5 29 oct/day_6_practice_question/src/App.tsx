import React from 'react';
import NumberList from './NumberList';
import FilterControls from './FilterControls';
import Logger from './Logger';
import HoistingDemo from './HoistingDemo';
import ConstructorDemo from './ConstructorDemo';
import { NumberItem } from './types';

const App: React.FC = () => {
  const numbers: NumberItem[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>JSX and JavaScript Concepts Sprint</h1>
      <NumberList numbers={numbers} />
      <FilterControls numbers={numbers} />
      <Logger numbers={numbers} />
      <HoistingDemo />
      <ConstructorDemo />
    </div>
  );
};

export default App;
