import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import { List, message, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import {listInterfaceInfoByPageUsingGet} from "@/services/apiBackend/interfaceInfoController";

const Index: React.FC = () =>
{
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  console.log("initialData is: ", initialState)
  const loadData = async (current: number = 1, pageSize: number = 5) =>
  {
    setLoading(true);
    try {
      const params: API.listInterfaceInfoByPageUsingGETParams = {
        current: String(current),
        pageSize: String(pageSize)
      }
      const response: API.BaseResponsePageInterfaceInfo = await listInterfaceInfoByPageUsingGet(params)
      if (response.data) {
        setDataList(response.data?.records || []);
        // @ts-ignore
        setTotal(response.data?.total || 0);
        console.log("get data");
        message.success("请求成功");
      }
    }
    catch (error) {
      message.error("请求失败" + error)
    }
    setLoading(false);
  }

  useEffect(() =>
  {
    loadData()
  }, [])

  return (
    <>
      <PageContainer title={"Api开放平台"}>
        <List
            header="Api开放平台接口信息"
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={dataList}
            renderItem={(item) => {
              return (
                  <List.Item
                      actions={[<a key="list-loadmore-more" href={`/interface/${item.id}`}>查看</a>]}
                  >
                    <List.Item.Meta
                        title={<a href={`/interface/${item.id}`}>{item.name}</a>}
                        description={item.description}
                    />
                  </List.Item>
              )
            }}
            pagination= {
              {
                showTotal(total: number)
                {
                  return '总数：' + total;
                },

                onChange(page, pageSize)
                {
                  loadData(page, pageSize);
                },
                pageSize: 10,
                total,
              }
            }
        />
      </PageContainer>
    </>
  );
};

export default Index;


