// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getCode GET /api/captcha/code */
export async function getCodeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseCaptchaVO>('/api/captcha/code', {
    method: 'GET',
    ...(options || {}),
  });
}
