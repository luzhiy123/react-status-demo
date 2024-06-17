import { Button } from 'antd';
import { useEffect, useState } from 'react';
import CountStore from '../counter-store/counter-rxjs';
import styles from './counter-com.module.css';

const service = new CountStore();

export function Counter() {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = service.amount$.subscribe((res) => {
      setAmount(res);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = service.loading$.subscribe((res) => {
      setLoading(res);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <Button aria-label="Decrement value" onClick={() => service.decrement()}>
          -
        </Button>
        <span className={styles.value}>{amount}</span>
        <Button aria-label="Increment value" onClick={() => service.increment()}>
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
        <Button onClick={() => service.incrementByAmount(incrementValue)}>Add Amount</Button>
        <Button loading={loading} onClick={() => service.incrementAsync(incrementValue)}>
          Add Async
        </Button>
        <Button onClick={() => service.incrementIfOdd(incrementValue)}>Add If Odd</Button>
      </div>
    </div>
  );
}
