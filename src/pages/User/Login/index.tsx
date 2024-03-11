import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {Button, Divider, Space, Tabs, message, theme} from 'antd';
import type {CSSProperties} from 'react';
import React, {useEffect, useState} from 'react';
import {flushSync} from "react-dom";
import {userLoginUsingPost} from "@/services/apiBackend/userController";
import {useEmotionCss} from "@ant-design/use-emotion-css";
import {useModel} from "@umijs/max";
import {history} from "umi";
import {getCodeUsingGet} from "@/services/apiBackend/captchaController";


const Page: React.FC = () =>
{
    type LoginType = 'phone' | 'account';
    const iconStyles: CSSProperties = {
        color: 'rgba(0, 0, 0, 0.2)',
        fontSize: '18px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    interface LoginForm
    {
        username: string,
        password: string,
        captcha: string,
        autoLogin?: boolean
    }
    const [captchaId, setCaptchaId] = useState<string>('');
    const [captcha, setCaptcha] = useState<string>('');
    const [loginType, setLoginType] = useState<LoginType>('account');
    const {token} = theme.useToken();
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    const [type, setType] = useState<string>('account');
    const {initialState, refresh, setInitialState} = useModel('@@initialState');

    const containerClassName = useEmotionCss(() =>
    {
        return {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        };
    });
    // 请求验证码的函数
    const fetchCaptcha = async () =>
    {
        try {
            // 发送请求到后端获取验证码
            const response: API.BaseResponseCaptchaVO = await getCodeUsingGet();
            if (response.data)
            {
                const data = response.data;
                console.log(data)
                // 处理返回的验证码数据
                // @ts-ignore
                setCaptcha(data?.codeImage || ""); // 存储Base64编码的图像
                setCaptchaId(data?.uuid || "")     // 存储图像验证码的id
            }
        }
        catch (e) {
            message.error('获取验证码失败, 请点击重新刷新');
        }
    };
    const handleSubmit = async (values: LoginForm) =>
    {
        try
        {
            console.log(values)
            // 处理登录逻辑
            const msg = await userLoginUsingPost({
                userPassword: values.password,
                userAccount: values.username,
                captcha: values.captcha,
                captchaId: captchaId
            });
            if (msg.data)
            {
                // 使用 flushSync 同步更新 initialState
                await flushSync(async () =>
                {
                    await setInitialState((s: any) => ({...s, currentUser: msg.data}));
                });
                // 重定向到主页或指定页面
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
                return;
            }
            // 如果失败去设置用户错误信息
        } catch (error)
        {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            console.log(error);
            fetchCaptcha();
            message.error(defaultLoginFailureMessage);
        }
    };
    useEffect(() => {
        fetchCaptcha();
    }, [])
    // const { status, type: loginType } = userLoginState;
    return (
        <div style={{
            backgroundColor: 'white',
            height: '100vh',
        }}>
            <LoginFormPage
                backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title="Github"
                onFinish={handleSubmit}
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0,0.65)',
                    backdropFilter: 'blur(4px)',
                }}
                subTitle="全球最大的代码托管平台"
                activityConfig={{
                    style: {
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                        color: token.colorTextHeading,
                        borderRadius: 8,
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(4px)',
                    },
                    title: '活动标题，可配置图片',
                    subTitle: '活动介绍说明文字',
                    action: (
                        <Button
                            size="large"
                            style={{
                                borderRadius: 20,
                                background: token.colorBgElevated,
                                color: token.colorPrimary,
                                width: 120,
                            }}
                        >
                            去看看
                        </Button>
                    ),
                }}
                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Divider plain>
              <span
                  style={{
                      color: token.colorTextPlaceholder,
                      fontWeight: 'normal',
                      fontSize: 14,
                  }}
              >
                其他登录方式
              </span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid ' + token.colorPrimaryBorder,
                                    borderRadius: '50%',
                                }}
                            >
                                <AlipayOutlined style={{...iconStyles, color: '#1677FF'}}/>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid ' + token.colorPrimaryBorder,
                                    borderRadius: '50%',
                                }}
                            >
                                <TaobaoOutlined style={{...iconStyles, color: '#FF6A10'}}/>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid ' + token.colorPrimaryBorder,
                                    borderRadius: '50%',
                                }}
                            >
                                <WeiboOutlined style={{...iconStyles, color: '#1890ff'}}/>
                            </div>
                        </Space>
                    </div>
                }
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
                    <Tabs.TabPane key={'phone'} tab={'手机号登录'}/>
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <UserOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            placeholder={'用户名: admin or user'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <LockOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            placeholder={'密码: ant.design'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                        <div style={{
                            marginTop: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <ProFormText
                                name="captcha"
                                placeholder="请输入上图中的验证码"
                                rules={[{ required: true, message: '请输入验证码！' }]}
                                style={{ flex: 1,
                                    marginRight: '10px',
                                    height: 'auto',
                                    minHeight: "300px"}} // 调整输入框样式
                            />
                            <img src={`data:image/png;base64,${captcha}`}
                                 alt="captcha"
                                 style={{width: '40%',
                                         height: 'auto',
                                         marginLeft: "10px",
                                         borderRadius: '8px'}}
                                 onClick={fetchCaptcha}
                            />
                        </div>
                    </>
                )}
                {loginType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <MobileOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            name="mobile"
                            placeholder={'手机号'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <LockOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={'请输入验证码'}
                            captchaTextRender={(timing, count) =>
                            {
                                if (timing)
                                {
                                    return `${count} ${'获取验证码'}`;
                                }
                                return '获取验证码';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                            onGetCaptcha={async () =>
                            {
                                message.success('获取验证码成功！验证码为：1234');
                            }}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default () =>
{
    return (
        <ProConfigProvider dark>
            <Page/>
        </ProConfigProvider>
    );
};