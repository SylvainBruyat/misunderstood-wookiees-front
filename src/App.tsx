import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CounterList from './components/CounterList';
import CounterSelect from './components/CounterSelect';
import { Counter, getCounters } from './services/api';
import CounterCreatePage from './pages/CounterCreatePage';
import './styles/app.css';

const App: FC = () => {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [selectedCounters, setSelectedCounters] = useState<Counter[]>([]);

  const fetchCounters = async (counterName?: string) => {
    try {
      const result = await getCounters(counterName);
      setSelectedCounters(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCounterList = async (counterName?: string) => {
    try {
      const result = await getCounters(counterName);
      setCounters(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCounterSelect = (counterName: string) => {
    if (counterName !== '') fetchCounters(counterName);
  };

  const handleFormSubmit = () => {
    fetchCounterList();
  };

  const handleDeleteCounter = (id: string) => {
    setSelectedCounters(selectedCounters.filter((counter) => counter._id !== id));
    fetchCounterList();
  };

  useEffect(() => {
    fetchCounterList();
  }, []);

  return (
    <Router>
      <div>
        <h1>Misunderstood Wookiees</h1>
        <h2>TW counters</h2>

        <Routes>
          <Route
            path='/'
            element={
              <>
                <Link to='/create-counter'>
                  <button className='primary-button'>Create a Counter</button>
                </Link>
                <CounterSelect counters={counters} onSelect={handleCounterSelect} />
                {selectedCounters && <CounterList counters={selectedCounters} onDelete={handleDeleteCounter} />}
              </>
            }
          />

          <Route path='/create-counter' element={<CounterCreatePage onSubmit={handleFormSubmit} />} />

          <Route path='/edit-counter/:id' element={<CounterCreatePage onSubmit={handleFormSubmit} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
