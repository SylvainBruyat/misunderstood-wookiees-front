import React, { useEffect, useState } from 'react';
import { addCounter, updateCounter, Counter } from '../services/api';
import '../styles/counterForm.css';

interface CounterFormProps {
  counter: Counter | null;
  onSubmit: () => void;
}

const CounterForm: React.FC<CounterFormProps> = ({ counter = null, onSubmit }) => {
  const [name, setName] = useState(counter ? counter.name : '');
  const [counterName, setCounterName] = useState(counter ? counter.counterName : '');
  const [comp, setComp] = useState(counter ? counter.comp : '');
  const [strategyTips, setStrategyTips] = useState(counter ? counter.strategyTips : '');
  const [noGo, setNoGo] = useState(counter ? counter.noGo : '');

  useEffect(() => {
    setName(counter?.name ?? '');
    setCounterName(counter?.counterName ?? '');
    setComp(counter?.comp ?? '');
    setStrategyTips(counter?.strategyTips ?? '');
    setNoGo(counter?.noGo ?? '');
  }, [counter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCounter = { name, counterName, comp, strategyTips, noGo };

    try {
      if (counter) {
        await updateCounter(counter._id, newCounter);
      } else {
        await addCounter(newCounter);
      }
      onSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='counter-form-container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name of team to counter:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Counter team name:</label>
          <input type='text' value={counterName} onChange={(e) => setCounterName(e.target.value)} required />
        </div>
        <div>
          <label>Comp of counter team:</label>
          <input className='wide' type='text' value={comp} onChange={(e) => setComp(e.target.value)} required />
        </div>
        <div>
          <label>Strategy Tips (optional):</label>
          <textarea className='wide' rows={5} value={strategyTips} onChange={(e) => setStrategyTips(e.target.value)} />
          <small>Provide any helpful strategy tips for the counter team.</small>
        </div>
        <div>
          <label>No Go (optional):</label>
          <textarea className='wide' rows={5} value={noGo} onChange={(e) => setNoGo(e.target.value)} />
          <small>Provide any conditions where this counter shouldn't be used.</small>
        </div>
        <button className='primary-button' type='submit'>
          {counter ? 'Update' : 'Add'} Counter
        </button>
      </form>
    </div>
  );
};

export default CounterForm;
