import { BehaviorSubject, Subject, map, retry, scan, shareReplay, switchMap, tap } from 'rxjs';
import { fetchCount } from './api';
export default class CountStore {
  private amount = 0;
  private status$ = new BehaviorSubject<'idle' | 'loading' | 'failed'>('idle');
  private controller$ = new Subject<number>();
  private asynController$ = new Subject<number>();

  constructor() {
    this.asynController$
      .pipe(
        tap(() => {
          this.status$.next('loading');
        }),
        switchMap((amount) => {
          return fetchCount(amount).then((res) => res.data);
        }),
        tap({
          next: () => {
            this.status$.next('idle');
          },
          error: () => {
            this.status$.next('failed');
          },
        }),
        retry(),
      )
      .subscribe({
        next: (amount) => {
          this.controller$.next(amount);
        },
        error: (err) => {
          console.error('fetch count error', err);
        },
      });
  }

  private changeAmount = (amount: number) => {
    this.controller$.next(amount);
  };

  increment() {
    this.changeAmount(1);
  }
  decrement() {
    this.changeAmount(-1);
  }
  incrementByAmount(amount: number) {
    this.changeAmount(amount);
  }
  async incrementAsync(amount: number) {
    this.asynController$.next(amount);
  }

  incrementIfOdd(amount: number) {
    if (this.amount % 2 === 1) {
      this.changeAmount(amount);
    }
  }

  amount$ = this.controller$.pipe(
    scan((acc, val) => {
      return acc + val;
    }),
    tap((amount) => {
      this.amount = amount;
    }),
    shareReplay(),
  );
  loading$ = this.status$.pipe(map((status) => status === 'loading'));
}
