import { BehaviorSubject, Observable, skipWhile } from "rxjs";

export interface KoalaCacheData {
  name: string;
  data: BehaviorSubject<any>;
}

export class KoalaApiRequesterCache {
  private static cache: KoalaCacheData[] = [];

  public static createCache(name: string) {
    if (!this.hasCache(name)) {
      this.cache.push({
        name,
        data: new BehaviorSubject<any>(undefined)
      });
    }
  }

  public static setDataInCache(name: string, data: any) {
    this.getCacheSubject(name)?.next(data);
  }

  public static getCacheSubject(name: string) {
    return this.cache.find(item => item.name === name)?.data;
  }

  public static getCacheAsObservable<T>(name: string) {
    return new Observable<T>(observe => {
      this.getCacheSubject(name)
          .pipe(skipWhile(value => value === undefined))
          .subscribe({
            next: value => {
              observe.next(value);
              observe.complete();
            },
            error: err => {
              observe.error(err);
              observe.complete();
            }
          });
    });
  }

  public static hasCache(name: string) {
    return !!this.getCacheSubject(name);
  }
}
