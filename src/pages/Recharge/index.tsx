import React, {useEffect, useState} from 'react';
import {Button, Card, message, Spin, Tooltip} from "antd";
import ProCard, {CheckCard} from "@ant-design/pro-card";
import Coin from "@/components/Icon/Coin";
import {history, useModel} from "@umijs/max";
import {listProductInfoBySearchTextPageUsingGet} from "@/services/apiBackend/productInfoController";

const PayOrder: React.FC = () =>
{
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ product, setProduct ] = useState<API.ProductInfo[]>();
    const { initialState, setInitialState } = useModel('@@initialState');
    const { currentUser } = initialState || {}
    const [ total, setTotal ] = useState<any>("0.00");
    const [ productId, setProductId ] = useState<string>("");

    useEffect(() =>
    {
        if (total === "0.00")
        {
            setProductId('')
        }
    }, [ total ])

    const loadData = async () =>
    {
        setLoading(true)
        const res = await listProductInfoBySearchTextPageUsingGet({});
        if (res.data && res.code === 0)
        {
            console.log(res.data.records)
            setProduct(res.data.records || [])
            setLoading(false)
        }
    }

    useEffect(() =>
    {
        loadData()
    }, [])

    return (
        <>
            <Spin spinning={loading}>
                <Card style={{ minWidth: 360 }}>
                    <ProCard type={"inner"} headerBordered bordered tooltip={"用于平台接口调用"}
                             title={<strong>我的钱包</strong>}>
                        <strong>硬币 : </strong><span
                        style={{ color: "red", fontSize: 18 }}>{currentUser?.balance}</span>
                    </ProCard>
                    <br/>
                    <Card type={"inner"} title={<strong>硬币商城 💰️</strong>}>
                        <ProCard wrap>
                            <CheckCard.Group
                                onChange={(checkedValue) =>
                                {
                                    if (!checkedValue)
                                    {
                                        setTotal("0.00")
                                        return
                                    }
                                    setTotal(checkedValue)
                                }}
                            >
                                {product && product.map((item: API.ProductInfo) => (
                                    <CheckCard
                                        key={item.id}
                                        onClick={() =>
                                        {
                                            setTotal(item.total)
                                            console.log(item)
                                            setProductId(item.id as string)
                                        }}
                                        description={item.description}
                                        extra={
                                            <>
                                                <h3
                                                    // @ts-ignore
                                                    style={{
                                                        color: "red",
                                                        fontSize: item.productType === "RECHARGEACTIVITY" ? 16 : 18,
                                                        fontWeight: "bold"
                                                    }
                                                    }>￥
                                                    {item.productType === "RECHARGEACTIVITY" ? "体验 " : null}
                                                    {/*// @ts-ignore*/}
                                                    {(item?.total) / 100}
                                                </h3>
                                            </>
                                        }
                                        // @ts-ignore
                                        actions={<><Coin></Coin></>}
                                        style={{ width: 220, height: 330 }}
                                        title={<strong>💰 {item.addPoints} 硬币</strong>} value={item.total}/>
                                ))}
                            </CheckCard.Group>
                        </ProCard>
                        <br/>
                        <ProCard style={{ marginTop: -20 }} layout={"center"}>
              <span>本商品为虚拟内容,用于平台接口调用,购买后不支持<strong
                  style={{ color: "red" }}>退换</strong>。确认支付表示您已阅读并接受<a
                  target={"_blank"}
                  rel="noreferrer"> 用户协议 </a>
          ，如付款成功后10分钟后未到账，请联系站长微信：
             <Tooltip placement="bottom">
               <a>caixypromise</a>
             </Tooltip>
            </span>
                        </ProCard>
                    </Card>
                    <br/>
                    <ProCard bordered headerBordered>
                        <div
                            style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", alignContent: "center" }}>
                            <div style={{ marginRight: "12px", fontWeight: "bold", fontSize: 18 }}>实付</div>
                            <div
                                style={{ marginRight: "20px", fontWeight: "bold", fontSize: 18, color: "red" }}>￥ {total / 100} 元
                            </div>
                            <Button style={{ width: 100, padding: 5 }} onClick={() =>
                            {
                                if (!productId)
                                {
                                    message.error("请先选择硬币规格哦")
                                    return
                                }
                                message.loading("正在前往收银台,请稍后.....", 0.6)
                                setTimeout(() =>
                                {
                                    history.push(`/order/pay/${productId}`)
                                }, 800)
                            }} size={"large"} type={"primary"}>立即购买</Button>
                        </div>
                    </ProCard>
                </Card>
            </Spin>
        </>
    )
}

export default PayOrder;
