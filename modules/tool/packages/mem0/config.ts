import { defineToolSet } from '@tool/type';
import { ToolTypeEnum } from '@tool/type/tool';
import memWrite from '@tool/packages/mem0/children/memWrite';
import memRead from '@tool/packages/mem0/children/memRead';

export default defineToolSet({
  name: {
    'zh-CN': 'Mem0 记忆工具集',
    en: 'Mem0 Memory Tool Set'
  },
  type: ToolTypeEnum.tools,
  description: {
    'zh-CN': 'Mem0 记忆管理工具集，支持记忆写入和读取',
    en: 'Mem0 memory management tool set with memory write and read capabilities'
  },
  children: [memWrite, memRead],
  secretInputConfig: [
    {
      key: 'apiKey',
      label: 'Mem0 API Key',
      description: 'Mem0 API密钥，用于身份验证',
      inputType: 'secret',
      required: false
    },
    {
      key: 'apiUrl',
      label: 'Mem0 API 地址',
      description: '自部署的 Mem0 API 服务地址',
      inputType: 'input',
      required: false
    }
  ]
});