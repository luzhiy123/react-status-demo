import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
import { fetchCount } from './api';

export default class CountStore {
  count: number = 0;
  status: 'idle' | 'loading' | 'failed' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }
  get loading() {
    return this.status === 'loading';
  }
  increment() {
    this.count += 1;
  }
  decrement() {
    this.count -= 1;
  }
  incrementByAmount(count: number) {
    this.count += count;
  }
  async incrementAsync(count: number) {
    this.status = 'loading';
    await fetchCount(count).then(
      (res) => {
        this.status = 'idle';
        this.incrementByAmount(res.data);
      },
      () => {
        this.status = 'failed';
        message.error('接口报错！');
      },
    );
  }

  incrementIfOdd(count: number) {
    if (this.count % 2 === 1) {
      this.incrementByAmount(count);
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
