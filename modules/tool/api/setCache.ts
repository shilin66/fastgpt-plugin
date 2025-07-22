import { s } from '@/router/init';
import { contract } from '@/contract';
import { localCacheManager } from '@tool/utils/cache.ts';

export const setCacheHandler = s.route(contract.tool.setCache, async ({ body: { cacheKey, cacheValue, ttl } }) => {
  localCacheManager.set(cacheKey, cacheValue, ttl);
  return {
    status: 200,
    body: {
      value: cacheValue
    }
  };
});
