import { s } from '@/router/init';
import { contract } from '@/contract';
import { localCacheManager } from '@tool/utils/cache.ts';

export const getCacheHandler = s.route(contract.tool.getCache, async ({ query: { cacheKey } }) => {
  const cacheToken = localCacheManager.get(cacheKey);

  return {
    status: 200,
    body: {
      value: cacheToken
    }
  };
});
