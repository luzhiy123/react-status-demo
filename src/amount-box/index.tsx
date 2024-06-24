import { Button } from 'antd';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import styles from './amount.module.css';
import { amountStore } from './store';

const Amount = () => {
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.info}>总价：{amountStore.amount}</span>
      </div>
      <div className={classnames(styles.row, styles.blockRow)}>
        数量：
        <Button aria-label="Decrement value" onClick={() => amountStore.countStore.decrement()}>
          -
        </Button>
        <span className={styles.value}>{amountStore.countStore.count}</span>
        <Button aria-label="Increment value" onClick={() => amountStore.countStore.increment()}>
          +
        </Button>
      </div>
      <div className={classnames(styles.row, styles.blockRow)}>
        单价：
        <Button aria-label="Decrement value" onClick={() => amountStore.priceStore.decrement()}>
          -
        </Button>
        <span className={styles.value}>{amountStore.priceStore.price}</span>
        <Button aria-label="Increment value" onClick={() => amountStore.priceStore.increment()}>
          +
        </Button>
      </div>
      <div className={classnames(styles.row, styles.blockRow)}>
        优惠：
        <Button aria-label="Decrement value" onClick={() => amountStore.decrementDiscount()}>
          -
        </Button>
        <span className={styles.value}>{amountStore.discount}</span>
        <Button aria-label="Increment value" onClick={() => amountStore.incrementDiscount()}>
          +
        </Button>
      </div>
    </div>
  );
};

export default observer(Amount);
