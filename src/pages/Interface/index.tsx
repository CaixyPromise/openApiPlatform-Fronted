import React, {useEffect, useState} from "react";
import {getInterfaceInfoByIdUsingGet} from "@/services/apiBackend/interfaceInfoController";
import {Button, Card, Descriptions, Divider, Form, Input, message} from "antd";
import {useParams} from "@@/exports";
import {PageContainer} from "@ant-design/pro-components";


const InterfaceDetails: React.FC = () =>
{
    const [isLoading, setLoadingState] = useState<boolean>(false);
    const [data, setData] = useState<API.InterfaceInfo>();
    const params = useParams();

    const fetchData = async () =>
    {
        if (!params.id)
        {
            message.error("参数不存在");
            return;
        }
        setLoadingState(true);
        console.log("request")

        try
        {
            const response = await getInterfaceInfoByIdUsingGet({
                ...params,
                id: params.id
            })
            if (response.data)
            {
                setData(response.data);
            }
            message.success("获取接口信息成功!!!");
        } catch (error)
        {
            message.error("获取接口信息失败!!!")
        }
        setLoadingState(false);
    }


    useEffect(() =>
    {
        fetchData();
        console.log("call useEffect")
    }, []);

    return (
        <PageContainer title="查看接口文档">
            <Card>
                {data ? (
                    <Descriptions title={data.name} column={1}>
                        <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
                        <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
                        <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
                        <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
                        <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
                        <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
                        <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
                        <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
                    </Descriptions>
                ) : (
                    <>接口不存在</>
                )}
            </Card>
            <Divider/>
            <Card title="在线测试">
                {/*  <Form name="invoke" layout="vertical" onFinish={onFinish}>*/}
                {/*    <Form.Item label="请求参数" name="userRequestParams">*/}
                {/*      <Input.TextArea />*/}
                {/*    </Form.Item>*/}
                {/*    <Form.Item wrapperCol={{ span: 16 }}>*/}
                {/*      <Button type="primary" htmlType="submit">*/}
                {/*        调用*/}
                {/*      </Button>*/}
                {/*    </Form.Item>*/}
                {/*  </Form>*/}
                {/*</Card>*/}
                {/*<Divider />*/}
                {/*<Card title="返回结果" loading={invokeLoading}>*/}
                {/*  {invokeRes}*/}
            </Card>
        </PageContainer>
    )
}


export default InterfaceDetails;
