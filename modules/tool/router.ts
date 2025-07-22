import { s } from '@/router/init';
import { getToolHandler } from './api/getTool';
import { getToolsHandler } from './api/list';
import { contract } from '@/contract';
import { getCacheHandler } from '@tool/api/getCache.ts';
import { setCacheHandler } from '@tool/api/setCache.ts';

export const toolRouter = s.router(contract.tool, {
  getTool: getToolHandler,
  list: getToolsHandler,
  getCache: getCacheHandler,
  setCache: setCacheHandler
});
