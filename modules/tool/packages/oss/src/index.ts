import { z } from 'zod';
import { parse } from "cookie";
import { POST } from '@tool/utils/request';

export const InputType = z.object({
  username: z.string(),
  password: z.string(),
});

export const OutputType = z.object({
  token: z.string(),
  zenlayerWeb: z.string(),
  zenlayerWebNew: z.string(),
  errMsg: z.string()
});

export async function tool({
  username,
  password
}: z.infer<typeof InputType>): Promise<z.infer<typeof OutputType>> {
  try {
    const oss3Url = process.env.OSS3_URL;
    const oss2Url = process.env.OSS2_URL;
    const loginResponse = await POST<{
      code: string,
      msg: string,
      data: {
        token: string
      }
    }>(`${oss3Url}/localApi/login`,
      {
        email: username,
        password,
        expireMin: 60 * 24
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );
    if (loginResponse.data.code !== 'SUCCESS') {
      return {
        token: '',
        zenlayerWeb: '',
        zenlayerWebNew: '',
        errMsg: 'Failed to Login Oss: ' + loginResponse.data.msg
      };
    }
    const token = loginResponse.data.data.token;

    // 获取 cookie 并解析
    const zenlayerWebNew = await getCookie(`${oss2Url}/zenlayer_web_new/index`, token);

    const zenlayerWeb = await getCookie(`${oss2Url}/zenlayer_web/index`, token);

    return {
      token,
      zenlayerWeb: `JSESSIONID=${zenlayerWeb}; lang=en`,
      zenlayerWebNew: `JSESSIONID=${zenlayerWebNew}; lang=en`,
      errMsg: ''
    };
  } catch (e) {
    console.error(e);
    return {
      token: '',
      zenlayerWeb: '',
      zenlayerWebNew: '',
      errMsg: 'Failed to get cookie: ' + e
    };
  }
}


const getCookie = async (url: string, token: string) => {
  // 获取 cookie 并解析
  const cookieResponse = await fetch(`${url}?jwt=${token}`, {
    method: 'HEAD',
  });
  const cookieString = cookieResponse.headers.get('set-cookie');
  if (!cookieString) {
    throw new Error(`Failed to get cookie from ${url}`);
  }
  const parsedCookie = parse(cookieString);
  return parsedCookie.JSESSIONID || '';
};

// const getCache = async (cacheKey: string) => {
//   const {value}  = await GET<{value: any}>(`http://localhost:${process.env.PORT}/tool/getCache?cacheKey=`, {
//     headers: {
//       'authtoken': process.env.AUTH_TOKEN || ''
//     }
//   })
//
//   return value;
// }
