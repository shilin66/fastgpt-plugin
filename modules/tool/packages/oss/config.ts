import { defineTool } from '@tool/type';
import {
  FlowNodeInputTypeEnum,
  WorkflowIOValueTypeEnum
} from '@tool/type/fastgpt';
import { ToolTypeEnum } from '@tool/type/tool';

export default defineTool({
  name: {
    'zh-CN': 'OssAuth',
    en: 'OssAuth'
  },
  type: ToolTypeEnum.tools,
  description: {
    'zh-CN': 'Oss认证\n- token用于oss3.0的api调用, header添加 Authorization: Bearer {token}\n- zenlayerWeb用于oss2.0 /zenlayer_web的api调用, 添加到cookie中\n- zenlayerWebNew用于oss2.0 /zenlayer_web_new的api调用, 添加到cookie中',
    en: 'Oss认证\n- token用于oss3.0的api调用, header添加 Authorization: Bearer {token}\n- zenlayerWeb用于oss2.0 /zenlayer_web的api调用, 添加到cookie中\n- zenlayerWebNew用于oss2.0 /zenlayer_web_new的api调用, 添加到cookie中'
  },
  versionList: [
    {
      value: '0.1.0',
      description: 'Default version',
      inputs: [
        {
          key: 'username',
          label: '用户名',
          renderTypeList: [FlowNodeInputTypeEnum.input, FlowNodeInputTypeEnum.reference],
          valueType: WorkflowIOValueTypeEnum.string,
          required: true
        },
        {
          key: 'password',
          label: '密码',
          renderTypeList: [FlowNodeInputTypeEnum.input, FlowNodeInputTypeEnum.reference],
          valueType: WorkflowIOValueTypeEnum.string,
          required: true
        },
      ],
      outputs: [
        {
          valueType: WorkflowIOValueTypeEnum.string,
          key: 'token',
          label: 'token',
          description: 'oss3.0的token'
        },
        {
          valueType: WorkflowIOValueTypeEnum.string,
          key: 'zenlayerWeb',
          label: 'zenlayerWeb',
          description: 'oss2.0 /zenlayer_web的cookie'
        },
        {
          valueType: WorkflowIOValueTypeEnum.string,
          key: 'zenlayerWebNew',
          label: 'zenlayerWebNew',
          description: 'oss2.0 /zenlayer_web_new的cookie'
        },
        {
          valueType: WorkflowIOValueTypeEnum.string,
          key: 'errMsg',
          label: 'errMsg',
          description: '认证失败时的错误消息'
        }
      ]
    }
  ]
});
