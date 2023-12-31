import React, {useEffect, useState} from "react";
import ReactECharts from "echarts-for-react";
import {PageContainer} from "@ant-design/pro-components";
import {getInvokeRankUsingPost} from "@/services/apiBackend/rankController";
import {message} from "antd";
import {history} from "@@/core/history";

//  接口数据分析
const InterfaceAnalysis: React.FC =  () =>
{
    const [data, setData] = useState<API.InterfaceInvokeCountVO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const loadData = async () =>
    {
        try {
            setLoading(true);
            const response: API.BaseResponseListInterfaceInvokeCountVO = await getInvokeRankUsingPost();
            if (response.data)
            {
                setData(response.data);
                message.success("获取接口调用信息成功");
            }
            else {
                message.error("获取接口调用信息为空");
            }
        } catch (e) {
            message.error("获取接口调用信息失败");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const chartsDataItem = data.map(item => ({
        value: item.totalNum,
        name: item.name,
        interfaceId: item.id
    }));

    const option = {
        title: {
            text: `接口调用统计Top ${chartsDataItem.length}`,
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: chartsDataItem,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: true,
                    formatter: '接口名称: {b}\n 接口调用次数: {c}\n 调用占比: {d}%)'
                }
            }
        ]
    };
    const chartEvent = {
        "click" : (event : any) => {
            const dataItem = event.data;
            history.push(`/interface/${dataItem.interfaceId}`)
        }
    }

    return (
        <PageContainer>
            <ReactECharts
                option={option}
                loadingOption={loading}
                onEvents={chartEvent}
            />
        </PageContainer>
    )
}

export default InterfaceAnalysis;