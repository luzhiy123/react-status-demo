import { Button } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { useStore } from '../counter-store/counter-mobx';
import styles from './counter-com.module.css';

const Counter = () => {
  const [incrementAmount, setIncrementAmount] = useState('2');
  const countStore = useStore('count');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <Button aria-label="Decrement value" onClick={() => countStore.decrement()}>
          -
        </Button>
        <span className={styles.value}>{countStore.count}</span>
        <Button aria-label="Increment value" onClick={() => countStore.increment()}>
          +
        </Button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment count"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button onClick={() => countStore.incrementByAmount(incrementValue)}>Add Amount</Button>
        <Button
          loading={countStore.loading}
          onClick={() => countStore.incrementAsync(incrementValue)}
        >
          Add Async
        </Button>
        <Button onClick={() => countStore.incrementIfOdd(incrementValue)}>Add If Odd</Button>
      </div>
    </div>
  );
};

export default observer(Counter);
