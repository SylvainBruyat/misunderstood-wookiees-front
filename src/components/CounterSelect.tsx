import { FC, useState } from 'react';
import { Counter } from '../services/api';

interface CounterSelectProps {
  counters: Counter[];
  onSelect: (name: string) => void;
}

const CounterSelect: FC<CounterSelectProps> = ({ counters, onSelect }) => {
  const [selectedCounterName, setSelectedCounterName] = useState<string>('');

  const uniqueCounterNames = Array.from(new Set(counters.map((counter) => counter.name))).sort();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedCounterName(selectedName);

    onSelect(selectedName);
  };

  return (
    <div>
      <label>Select Counter:</label>
      <select value={selectedCounterName} onChange={handleChange}>
        <option value=''>--Select a Counter--</option>
        {uniqueCounterNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CounterSelect;
