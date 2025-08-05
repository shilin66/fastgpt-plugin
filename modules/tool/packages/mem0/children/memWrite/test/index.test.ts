import { expect, test } from 'vitest';
import tool from '..';

test('memWrite tool configuration', async () => {
  expect(tool.name).toBeDefined();
  expect(tool.description).toBeDefined();
  expect(tool.cb).toBeDefined();
  expect(tool.name['zh-CN']).toBe('Mem0 记忆写入');
  expect(tool.name['en']).toBe('Mem0 Memory Write');
});