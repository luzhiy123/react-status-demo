import { message } from 'antd';
import { BehaviorSubject, Subject, map, retry, scan, shareReplay, switchMap, tap } from 'rxjs';
import { fetchCount } from './api';
export default class CountStore {
  private count = 0;
  private status$ = new BehaviorSubject<'idle' | 'loading' | 'failed'>('idle');
  private controller$ = new Subject<number>();
  private asynController$ = new Subject<number>();

  constructor() {
    this.asynController$
      .pipe(
        tap(() => {
          this.status$.next('loading');
        }),
        switchMap((count) => {
          return fetchCount(count).then((res) => res.data);
        }),
        tap({
          next: () => {
            this.status$.next('idle');
          },
          error: () => {
            this.status$.next('failed');
            message.error('接口报错！');
          },
        }),
        retry(),
      )
      .subscribe({
        next: (count) => {
          this.controller$.next(count);
        },
        error: (err) => {
          console.error('fetch count error', err);
        },
      });
  }

  private changeAmount = (count: number) => {
    this.controller$.next(count);
  };

  increment() {
    this.changeAmount(1);
  }
  decrement() {
    this.changeAmount(-1);
  }
  incrementByAmount(count: number) {
    this.changeAmount(count);
  }
  async incrementAsync(count: number) {
    this.asynController$.next(count);
  }

  incrementIfOdd(count: number) {
    if (this.count % 2 === 1) {
      this.changeAmount(count);
    }
  }

  count$ = this.controller$.pipe(
    scan((acc, val) => {
      return acc + val;
    }),
    tap((count) => {
      this.count = count;
    }),
    shareReplay(),
  );
  loading$ = this.status$.pipe(map((status) => status === 'loading'));
}
