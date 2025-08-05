import { defineTool } from '@tool/type';
import {
  FlowNodeInputTypeEnum,
  WorkflowIOValueTypeEnum
} from '@tool/type/fastgpt';

export default defineTool({
  name: {
    'zh-CN': 'Mem0 记忆写入',
    en: 'Mem0 Memory Write'
  },
  description: {
    'zh-CN': '将信息写入 Mem0 记忆系统，支持用户ID和元数据',
    en: 'Write information to Mem0 memory system with user ID and metadata support'
  },
  versionList: [
    {
      value: '1.0.0',
      description: 'Default version',
      inputs: [
        {
          key: 'userQuestion',
          label: '用户问题',
          description: '用户提出的问题内容，将以user角色存储到记忆中',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference]
        },
        {
          key: 'aiReply',
          label: 'AI回复',
          description: 'AI对用户问题的回复内容，将以assistant角色存储到记忆中',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference]
        },
        {
          key: 'message',
          label: '自定义记忆内容',
          description: '额外的自定义记忆内容，必须是符合[{"role":"user|assistant","content":"内容"}]格式的JSON数组字符串，将与用户问题和AI回复合并存储',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.textarea, FlowNodeInputTypeEnum.reference]
        },
        {
          key: 'userId',
          label: '用户ID',
          description: '关联的用户Id',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference, FlowNodeInputTypeEnum.input]
        },
        {
          key: 'appId',
          label: '应用ID',
          description: '关联的应用Id',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference,FlowNodeInputTypeEnum.input]
        },
        {
          key: 'chatId',
          label: '会话ID',
          description: '关联的会话Id',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.reference, FlowNodeInputTypeEnum.input]
        },
        {
          key: 'metadata',
          label: '元数据',
          description: '附加的元数据信息（JSON格式）',
          required: false,
          valueType: WorkflowIOValueTypeEnum.object,
          renderTypeList: [FlowNodeInputTypeEnum.textarea, FlowNodeInputTypeEnum.reference]
        },
        {
          key: 'infer',
          label: '启用推理',
          description: '是否使用大模型提取记忆信息',
          required: false,
          valueType: WorkflowIOValueTypeEnum.boolean,
          renderTypeList: [FlowNodeInputTypeEnum.switch, FlowNodeInputTypeEnum.reference],
          defaultValue: true
        },
        {
          key: 'customFactExtractionPrompt',
          label: '自定义记忆提取提示词',
          description: '自定义记忆提取规则。默认提取个人偏好、重要信息、计划意图、健康职业等个人相关内容。如需提取其他类型信息（如业务数据、技术偏好等），可自定义提示词，需返回JSON格式：`{"facts": ["提取的事实1", "提取的事实2"]}`',
          required: false,
          valueType: WorkflowIOValueTypeEnum.string,
          renderTypeList: [FlowNodeInputTypeEnum.textarea, FlowNodeInputTypeEnum.reference]
        },
        {
          key: 'asyncMode',
          label: '异步创建',
          description: '是否异步创建记忆',
          required: false,
          valueType: WorkflowIOValueTypeEnum.boolean,
          renderTypeList: [FlowNodeInputTypeEnum.switch, FlowNodeInputTypeEnum.reference],
          defaultValue: false
        }
      ],
      outputs: [
        {
          valueType: WorkflowIOValueTypeEnum.string,
          key: 'memoryId',
          label: '记忆ID',
          description: '创建的记忆的唯一标识符'
        },
        {
          valueType: WorkflowIOValueTypeEnum.boolean,
          key: 'success',
          label: '执行状态',
          description: '记忆写入是否成功'
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