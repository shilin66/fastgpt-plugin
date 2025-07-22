export const localCacheManager = {
  set(token: string, data: any, ttl: number) {
    const expires = Date.now() + ttl;
    localCache.set(token, { data, expires });
  },
  get(token: string) {
    const entry = global.localCache.get(token);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      global.localCache.delete(token);
      return null;
    }
    return entry.data;
  },
  delete(token: string) {
    localCache.delete(token);
  },

  getSize() {
    return localCache.size;
  },

  startCleanup() {
    const now = Date.now();
    localCache.forEach((value, key) => {
      if (now > value.expires) localCache.delete(key);
    });
  }
};
