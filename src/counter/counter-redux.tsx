import { Button } from 'antd';
import { useState } from 'react';
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
  selectLoading,
  useAppDispatch,
  useAppSelector,
} from '../counter-store/counter-redux';
import styles from './counter-com.module.css';

export function Counter() {
  const count = useAppSelector(selectCount);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <Button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <span className={styles.value}>{count}</span>
        <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </Button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button onClick={() => dispatch(incrementByAmount(incrementValue))}>Add Amount</Button>
        <Button loading={loading} onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </Button>
        <Button onClick={() => dispatch(incrementIfOdd(incrementValue))}>Add If Odd</Button>
      </div>
    </div>
  );
}
