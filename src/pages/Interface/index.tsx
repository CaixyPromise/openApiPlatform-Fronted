// import React, {useEffect, useState} from "react";
// import {getInterfaceInfoByIdUsingGet} from "@/services/apiBackend/interfaceInfoController";
// import {Button, Card, Descriptions, Divider, Form, Input, message} from "antd";
// import {useParams} from "@@/exports";
// import {PageContainer} from "@ant-design/pro-components";
//
//
// const InterfaceDetails: React.FC = () =>
// {
//     const [isLoading, setLoadingState] = useState<boolean>(false);
//     const [data, setData] = useState<API.InterfaceInfo>();
//     const params = useParams();
//
//     const fetchData = async () =>
//     {
//         if (!params.id)
//         {
//             message.error("参数不存在");
//             return;
//         }
//         setLoadingState(true);
//         console.log("request")
//         try
//         {
//             const response = await getInterfaceInfoByIdUsingGet({
//                 ...params,
//                 id: params.id
//             })
//             if (response.data)
//             {
//                 setData(response.data);
//             }
//             message.success("获取接口信息成功!!!");
//         } catch (error)
//         {
//             message.error("获取接口信息失败!!!")
//         }
//         setLoadingState(false);
//     }
//
//     useEffect(() =>
//     {
//         fetchData();
//         console.log("call useEffect")
//     }, []);
//
//     return (
//         <PageContainer title="查看接口文档">
//             <Card>
//                 {data ? (
//                     <Descriptions title={data.name} column={1}>
//                         <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
//                         <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
//                         <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
//                         <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
//                         <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
//                         <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
//                         <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
//                         <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
//                         <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
//                     </Descriptions>
//                 ) : (
//                     <>接口不存在</>
//                 )}
//             </Card>
//             <Divider/>
//             <Card title="在线测试">
//                 {/*  <Form name="invoke" layout="vertical" onFinish={onFinish}>*/}
//                 {/*    <Form.Item label="请求参数" name="userRequestParams">*/}
//                 {/*      <Input.TextArea />*/}
//                 {/*    </Form.Item>*/}
//                 {/*    <Form.Item wrapperCol={{ span: 16 }}>*/}
//                 {/*      <Button type="primary" htmlType="submit">*/}
//                 {/*        调用*/}
//                 {/*      </Button>*/}
//                 {/*    </Form.Item>*/}
//                 {/*  </Form>*/}
//                 {/*</Card>*/}
//                 {/*<Divider />*/}
//                 {/*<Card title="返回结果" loading={invokeLoading}>*/}
//                 {/*  {invokeRes}*/}
//             </Card>
//         </PageContainer>
//     )
// }
//
//
// export default InterfaceDetails;


import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Divider, Form, message} from 'antd';
import {
    getInterfaceInfoByIdUsingGet,
    tryToInterfaceInvokeUsingPost
} from "@/services/apiBackend/interfaceInfoController";
import {useParams} from '@@/exports';
import {flushSync} from "react-dom";
import ParamsTable from "@/components/ParamsTable";
import {tryRequestParams, tryRequestParamsType} from "@/pages/Admin/InterfaceTable/columns/InterfaceInfoColumns";


/**
 * 主页
 * @constructor
 */
const Index: React.FC = () =>
{
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [invokeResponse, setInvokeResponse] = useState<API.InterfaceInfo>();
    const [invokeRes, setInvokeRes] = useState<any>();
    const [invokeLoading, setInvokeLoading] = useState(false);
    const [payloadFields, setPayloadFields] = useState<tryRequestParamsType[]>([]);
    const [invokeParams, setInvokeParams] = useState<tryRequestParamsType[]>([]);
    const [form] = Form.useForm();
    const loadData = async () =>
    {
        if (!params.id)
        {
            message.error('参数不存在');
            return;
        }
        setLoading(true);
        try
        {
            const res = await getInterfaceInfoByIdUsingGet({
                id: String(params.id),
            });
            message.success("请求成功!")
            setInvokeResponse(res.data);
            console.log(res.data)

            if (res.data?.requestPayload)
            {
                // const payloadArray = Object
                //     .entries(JSON.parse(res.data.requestPayload))
                //     .map(([key, value]) => ({ key, value }));
                await flushSync(async () =>
                {
                    // Object 转 json字符串
                    if (res.data?.requestPayload)
                    {
                        setPayloadFields(JSON.parse(res.data?.requestPayload || []));
                    }
                })
            }

        } catch (error: any)
        {
            message.error('请求失败，' + error.message);
        }
        setLoading(false);
    };

    useEffect(() =>
    {
        loadData();
    }, []);

    const onFinish = async (values: any) =>
    {
        if (!params.id)
        {
            message.error('接口不存在');
            return;
        }
        // 从表单数据中提取请求参数和请求体字段
        // 将字段数组转换为 JSON 对象
        const result = Object()
        let errorOccurred: boolean = false;
        console.log("ready for invoke")
        invokeParams.forEach((item) =>
        {
            console.log('forEach item is', item)
            if (item.required === "是" && item.fieldValue === '')
            {
                message.error(`请求参数不能为空: ${item.fieldName}`);
                errorOccurred = true
                return
            }
            else {
                // 如果不是require，但是值又为空，就跳过
                if (item.required === "否" && item.fieldValue === '')
                {
                    return
                }
                result[item.fieldName] = item.fieldValue
            }
        })
        if (errorOccurred) {
            return
        }
        setInvokeLoading(true);
        // 把对象转换成json字符串
        const jsonStr:string = JSON.stringify(result);
        try {
            const res = await tryToInterfaceInvokeUsingPost({
                id: params.id,
                userRequestPayload: jsonStr
            });
            setInvokeRes(res.data);
            message.success('请求成功');
        }
        catch (error: any) {
            message.error('操作失败，' + error.message);
        }
        setInvokeLoading(false);
    };

    return (
        <PageContainer title="查看接口文档">
            <Card>
                {invokeResponse ? (
                    <Descriptions title={invokeResponse.name} column={1}>
                        <Descriptions.Item label="接口状态">{invokeResponse.status ? '开启' : '关闭'}</Descriptions.Item>
                        <Descriptions.Item label="描述">{invokeResponse.description}</Descriptions.Item>
                        <Descriptions.Item label="请求地址">{invokeResponse.url}</Descriptions.Item>
                        <Descriptions.Item label="请求方法">{invokeResponse.method}</Descriptions.Item>
                        <Descriptions.Item label="请求载荷">
                            {invokeResponse.requestPayload}
                        </Descriptions.Item>
                        <Descriptions.Item label="请求头">{invokeResponse.requestHeader}</Descriptions.Item>
                        <Descriptions.Item label="响应头">{invokeResponse.responseHeader}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{invokeResponse.createTime}</Descriptions.Item>
                        <Descriptions.Item label="更新时间">{invokeResponse.updateTime}</Descriptions.Item>
                    </Descriptions>
                ) : (
                    <>接口不存在</>
                )}
            </Card>
            <Divider/>
            <Card title="在线测试">
                <Form
                    form={form}
                    name="invoke"
                    layout="horizontal"
                    onFinish={onFinish}
                >
                    {/* 请求载荷部分 */}
                    {payloadFields && (
                        <>
                            <Divider orientation="left">{invokeResponse?.method === "GET" ? "请求参数" : "请求Body"}</Divider>
                            <ParamsTable
                                column={tryRequestParams}
                                defaultNewColumn={{
                                    "fieldName": "",
                                    "fieldValue": "",
                                    "desc": ""
                                }}
                                onChange={(value) => {
                                    console.log("set invoke value is: ", value)
                                    setInvokeParams(value);
                                }}
                                value={payloadFields}
                            />
                        </>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            在线测试
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Divider/>
            <Card title="返回结果" loading={invokeLoading}>
                {invokeRes}
            </Card>
        </PageContainer>
    );
};

export default Index;
