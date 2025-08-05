import { defineTool } from '@tool/type';
import {
  FlowNodeInputTypeEnum,
  WorkflowIOValueTypeEnum
} from '@tool/type/fastgpt';

export default defineTool({
  name: {
    'zh-CN': 'Mem0 记忆读取',
    en: 'Mem0 Memory Read'
  },
  description: {
    'zh-CN': '从 Mem0 记忆系统中搜索和读取相关记忆信息',
    en: 'Search and read relevant memory information from Mem0 memory system'
  },
  versionList: [
    {
      value: '1.0.0',
      description: 'Default version',
      inputs: [
        {
          key: 'query',
          label: '查询内容',
          description: '要搜索的记忆内容',
          required: true,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference,FlowNodeInputTypeEnum.input]
        },
        {
          key: 'userId',
          label: '用户ID',
          description: '要查询的用户ID',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference, FlowNodeInputTypeEnum.input]
        },
        {
          key: 'appId',
          label: '应用ID',
          description: '要查询的应用ID',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference, FlowNodeInputTypeEnum.input]
        },
        {
          key: 'chatId',
          label: '会话ID',
          description: '要查询的会话ID',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference, FlowNodeInputTypeEnum.input]
        },
        {
          key: 'limit',
          label: '返回数量限制',
          description: '最多返回的记忆数量（默认10）',
          required: false,
          valueType: WorkflowIOValueTypeEnum.number,
          renderTypeList: [FlowNodeInputTypeEnum.numberInput, FlowNodeInputTypeEnum.reference],
          defaultValue: 10
        }
      ],
      outputs: [
        {
          valueType: WorkflowIOValueTypeEnum.arrayObject,
          key: 'memories',
          label: '记忆列表',
          description: '搜索到的相关记忆信息'
        },
        {
          valueType: WorkflowIOValueTypeEnum.arrayObject,
          key: 'relations',
          label: '对象关系列表',
          description: '通过graph搜索到相关的对象关系'
        },
        {
          valueType: WorkflowIOValueTypeEnum.number,
          key: 'count',
          label: '记忆数量',
          description: '返回的记忆总数'
        },
        {
          valueType: WorkflowIOValueTypeEnum.boolean,
          key: 'success',
          label: '执行状态',
          description: '记忆读取是否成功'
        },
        {
          valueType: WorkflowIOValueTypeEnum.string,
          key: 'message',
          label: '返回消息',
          description: '操作结果消息'
        }
      ]
    }
  ]
});