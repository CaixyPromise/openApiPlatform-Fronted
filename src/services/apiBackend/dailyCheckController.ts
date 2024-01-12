// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** tryDailyCheck POST /api/dailyCheck/check */
export async function tryDailyCheckUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/dailyCheck/check', {
    method: 'POST',
    ...(options || {}),
  });
}
