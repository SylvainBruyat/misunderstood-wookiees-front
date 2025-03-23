import { useEffect, useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CounterForm from '../components/CounterForm';
import { Counter, getCounterById } from '../services/api';

interface CounterCreatePageProps {
  onSubmit: () => void;
}

const CounterCreatePage: FC<CounterCreatePageProps> = ({ onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [counter, setCounter] = useState<Counter | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCounter = async () => {
        try {
          const result = await getCounterById(id);
          setCounter(result.data[0]);
        } catch (err) {
          console.error(err);
        }
      };
      fetchCounter();
    }
  }, [id]);

  const handleFormSubmit = () => {
    onSubmit();
    navigate('/');
  };

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>{counter ? 'Edit' : 'Create'} a Counter</h1>
      <CounterForm counter={counter} onSubmit={handleFormSubmit} />

      <button className='primary-button' onClick={handleReturn}>
        Return to Home
      </button>
    </div>
  );
};

export default CounterCreatePage;
