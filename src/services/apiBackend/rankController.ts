// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getInvokeRank POST /api/rank/invoke */
export async function getInvokeRankUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInvokeCountVO>('/api/rank/invoke', {
    method: 'POST',
    ...(options || {}),
  });
}
