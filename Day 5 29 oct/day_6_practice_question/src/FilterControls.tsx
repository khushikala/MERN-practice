import React, { useState } from 'react';
import { NumberItem } from './types';

interface FilterControlsProps {
  numbers: NumberItem[];
}

const FilterControls: React.FC<FilterControlsProps> = ({ numbers }) => {
  const [filteredNumbers, setFilteredNumbers] = useState<NumberItem[]>([]);
  const [mappedNumbers, setMappedNumbers] = useState<NumberItem[]>([]);

  const filterEvenNumbers = () => {
    const evenNumbers = numbers.filter(item => item.value % 2 === 0);
    setFilteredNumbers(evenNumbers);
  };

  const mapDoubleNumbers = () => {
    const doubledNumbers = numbers.map(item => ({ value: item.value * 2 }));
    setMappedNumbers(doubledNumbers);
  };

  return (
    <div>
      <h2>Filter and Map Controls</h2>
      <button onClick={filterEvenNumbers}>Filter Even Numbers</button>
      <button onClick={mapDoubleNumbers}>Map to Doubled Numbers</button>
      <div>
        <h3>Filtered Even Numbers:</h3>
        <ul>
          {filteredNumbers.map((item, index) => (
            <li key={index}>{item.value}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Mapped Doubled Numbers:</h3>
        <ul>
          {mappedNumbers.map((item, index) => (
            <li key={index}>{item.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterControls;
