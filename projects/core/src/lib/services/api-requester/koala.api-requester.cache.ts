import { koala } from "@koalarx/utils";

export interface KoalaCacheData {
  name: string;
  data: any;
}

export class KoalaApiRequesterCache {
  private static cache: KoalaCacheData[] = [];

  public static setInCache(cache: KoalaCacheData) {
    const index = koala(this.cache).array().getIndex('name', cache.name);

    if (index >= 0) {
      this.cache[index] = cache;
    } else {
      this.cache.push(cache);
    }
  }

  public static getCache<T>(name: string): T {
    return this.cache.find(item => item.name === name)?.data;
  }

  public static hasCache(name: string) {
    return !!this.getCache(name);
  }
}
