import { makeAutoObservable } from 'mobx';

export class CountStore {
  count: number = 0;

  constructor() {
    makeAutoObservable(this);
  }
  increment() {
    this.count += 1;
  }
  decrement() {
    this.count -= 1;
  }
}

export class PriceStore {
  price: number = 0;

  constructor() {
    makeAutoObservable(this);
  }
  increment() {
    this.price += 1;
  }
  decrement() {
    this.price -= 1;
  }
}

export class AmountStore {
  priceStore: PriceStore;
  countStore: CountStore;
  discount = 0;
  constructor() {
    this.priceStore = new PriceStore();
    this.countStore = new CountStore();
    makeAutoObservable(this);
  }
  get amount() {
    return this.countStore.count * this.priceStore.price - this.discount;
  }

  incrementDiscount() {
    this.discount += 1;
  }
  decrementDiscount() {
    this.discount -= 1;
  }
}

export const amountStore = new AmountStore();
