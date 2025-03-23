import { FC, PropsWithChildren } from 'react';
import { Counter, deleteCounter } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/counterList.css';

type TCounterList = PropsWithChildren<{
  counters: Counter[];
  onDelete: (id: string) => void;
}>;

const CounterList: FC<TCounterList> = ({ counters, onDelete }) => {
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this counter?');
    if (confirmDelete) {
      try {
        await deleteCounter(id);
        onDelete(id);
      } catch (err) {
        console.error('Error deleting counter:', err);
      }
    }
  };

  return (
    <div className='counter-list-container'>
      <h2>Counters</h2>
      <ul>
        {counters.map((counter) => {
          const { comp, counterName, _id, name, noGo, strategyTips } = counter;
          return (
            <div key={_id} className='counter-list-item'>
              <p>
                <strong>Counter for:</strong> {name}
              </p>
              <p>
                <strong>Counter team:</strong> {counterName}
              </p>
              <p>
                <strong>Counter team comp:</strong> {comp}
              </p>
              <p>
                <strong>Strategy tips:</strong> {strategyTips === '' ? 'none' : strategyTips}
              </p>
              <p>
                <strong>No go / Exceptions:</strong> {noGo === '' ? 'none' : noGo}
              </p>
              <div className='counter-buttons'>
                <Link to={`/edit-counter/${_id}`}>
                  <button className='primary-button'>Edit</button>
                </Link>

                <button onClick={() => handleDelete(_id)} className='secondary-button'>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default CounterList;
