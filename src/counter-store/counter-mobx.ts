import { makeAutoObservable } from 'mobx';
import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
import { fetchCount } from './api';

export default class CountStore {
  amount: number = 0;
  status: 'idle' | 'loading' | 'failed' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }
  get loading() {
    return this.status === 'loading';
  }
  increment() {
    this.amount += 1;
  }
  decrement() {
    this.amount -= 1;
  }
  incrementByAmount(amount: number) {
    this.amount += amount;
  }
  async incrementAsync(amount: number) {
    this.status = 'loading';
    await fetchCount(amount).then(
      (res) => {
        this.status = 'idle';
        this.incrementByAmount(res.data);
      },
      () => {
        this.status = 'failed';
      },
    );
  }

  incrementIfOdd(amount: number) {
    if (this.amount % 2 === 1) {
      this.incrementByAmount(amount);
    }
  }
}

export const countStore = new CountStore();

export const RootStore = {
  count: countStore,
};

export function useStore<T extends typeof RootStore, V extends keyof T>(name: V): T[V] {
  const store = useContext(MobXProviderContext) as T;
  return store[name];
}
