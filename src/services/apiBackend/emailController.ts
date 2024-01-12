// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getModifyEmailCaptcha POST /api/email/captcha/modify/email */
export async function getModifyEmailCaptchaUsingPost(
  body: API.ModifyEmailCaptchaRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/email/captcha/modify/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
