export class Defer<T> {
  resolve: (val?: T) => void;
  reject: (err?: any) => void;
  promise: Promise<T>;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
