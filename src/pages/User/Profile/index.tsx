import {history, useModel} from '@umijs/max';
import {
    Button,
    Descriptions,
    message,
    Modal,
    Spin,
    Tooltip,
    Tour,
    TourProps,
    Upload,
    UploadFile,
    UploadProps
} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {RcFile} from "antd/es/upload";
import {EditOutlined, PlusOutlined, VerticalAlignBottomOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import Settings from '../../../../config/defaultSettings';
import Paragraph from "antd/lib/typography/Paragraph";
import ProCard from "@ant-design/pro-card";
import {requestConfig} from "@/requestConfig";

// import SendGiftModal from "@/components/Gift/SendGift";
import EmailModal from "@/components/EmailModal";

import {
    getLoginUserUsingGet,
    getVoucherKeyUsingPost,
    modifyPasswordUsingPost,
    modifyUserEmailUsingPost,
    updateKeyUsingGet,
    updateUserUsingPost
} from "@/services/apiBackend/userController";
import {ProFormInstance} from "@ant-design/pro-form/lib";
import {ProForm, ProFormText} from '@ant-design/pro-components';
import {generateRandomNumber} from "@/utils/RandomUtils";

export const valueLength = (val: any) =>
{
    if (val === undefined || val === null)
    {
        return false;
    }
    if (typeof val !== 'string')
    {
        val = val.toString();
    }
    return val && val.trim().length > 0
}
const Profile: React.FC = () =>
{
    const unloadFileTypeList = ["image/jpeg", "image/jpg", "image/svg", "image/png", "image/webp", "image/jfif"]
    const {initialState, setInitialState} = useModel('@@initialState');
    const loginUser = initialState?.currentUser || {}
    const [previewOpen, setPreviewOpen] = useState(false);
    const [voucherLoading, setVoucherLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewOpen(false);
    const [userName, setUserName] = useState<string | undefined>('');
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState<boolean>(false);
    const [userKey, setUserKey] = useState<API.GetVoucherVO>({});
    const [flag, setFlag] = useState<boolean>(false);
    const [emailModalType, setEmailModalType] = useState<"bind" | "password">("bind");
    const formRef = useRef<
        ProFormInstance<{
            userPassword: string;
        }>
    >();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);

    const [openTour, setOpenTour] = useState<boolean>(false);
    console.log("loginUser is", loginUser)
    console.log("loginUser.email is", loginUser.email)
    console.log("typeof loginUser.email is", typeof loginUser.email);

    const steps: TourProps['steps'] = [
        {
            title: '个人信息设置',
            description: <span>这里是你的账号信息，您可以便捷的查看您的基本信息。<br/>您还可以修改和更新昵称和头像。
        <br/>邮箱主要用于接收<strong>支付订单信息</strong>，不绑定无法接收哦，快去绑定吧！！🥰</span>,
            target: () => ref1.current,
        },
        {
            title: '我的钱包',
            description: <span>这里是您的钱包，硬币用于平台接口的调用费用。<br/>除了充值硬币外，您还可以每日签到或者邀请好友注册来获得硬币</span>,
            target: () => ref2.current,
        },
        {
            title: '接口调用凭证',
            description: '这里是您调用接口的凭证，没有凭证将无法调用接口',
            target: () => ref3.current,
        },
        {
            title: '开发者SDK',
            description: '您可以使用开发者SDK，快速高效的接入接口到您的项目中',
            target: () => ref4.current,
        }
    ];

    const loadData = async () =>
    {
        setLoading(true)
        const res = await getLoginUserUsingGet();
        // const getKey : API.BaseResponseGetVoucherVO = await getVoucherKeyUsingPost();
        if (res.data)
        {
            const updatedFileList = [...fileList];
            if (loginUser && loginUser.userAvatar)
            {
                updatedFileList[0] = {
                    // @ts-ignore
                    uid: loginUser?.userAccount,
                    // @ts-ignore
                    name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
                    status: "done",
                    percent: 100,
                    url: loginUser?.userAvatar
                }
                setFileList(updatedFileList);
            }
            setUserName(loginUser?.userName)
            // setUserKey(getKey.data);
            setLoading(false)
        }
        // PC端显示指引
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile)
        {
            setOpenTour(false)
        }
        else
        {
            const tour = localStorage.getItem('tour');
            if (!tour)
            {
                setOpenTour(true)
            }
        }
    }

    useEffect(() =>
        {
            loadData()
        },
        [])

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) =>
        {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) =>
    {
        if (!file.url && !file.preview)
        {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('-') + 1));
    };

    const uploadButton = () =>
    {
        return (
            <div>
                <PlusOutlined/>
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        );
    }

    const beforeUpload = async (file: RcFile) =>
    {
        const fileType = unloadFileTypeList.includes(file.type)
        if (!fileType)
        {
            message.error('图片类型有误,请上传jpg/png/svg/jpeg/webp格式!');
        }
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M)
        {
            message.error('文件大小不能超过 1M !');
        }
        if (!isLt2M && !fileType)
        {
            const updatedFileList = [...fileList];
            updatedFileList[0] = {
                // @ts-ignore
                uid: loginUser?.userAccount,
                // @ts-ignore
                name: "error",
                status: "error",
                percent: 100
            }
            setFileList(updatedFileList);
            return false
        }
        return fileType && isLt2M;
    };

    const getVoucher = async () =>
    {
        setVoucherLoading(true)

        try
        {
            const password = formRef?.current?.getFieldValue('userPassword');
            // 生成随机数和时间戳
            const randomNumber: string = generateRandomNumber(6);
            const timestamp = Date.now().toString();
            const res: API.BaseResponseGetVoucherVO = await getVoucherKeyUsingPost({
                timestamp: timestamp,
                nonce: randomNumber,
                password: password
            });
            if (res.data)
            {
                setUserKey(res.data);
                message.success("获取凭证成功");
            }
        } catch (e: any)
        {
            message.error("获取凭证失败");
        } finally
        {
            setPasswordModal(false);
            setVoucherLoading(false)
        }
    }
    const updateVoucher = async () =>
    {
        setVoucherLoading(true)

        setVoucherLoading(true)

        try
        {
            const response: API.BaseResponseGetVoucherVO = await updateKeyUsingGet();
            if (response.data)
            {
                setUserKey(response.data)
                message.success("更新凭证成功");
            }
        } catch (e)
        {
            message.error("更新凭证失败");
        } finally
        {
            setVoucherLoading(false)
        }
    }
    const showVoucher = async () =>
    {
        setVoucherLoading(true)
        if (userKey.secretKey === undefined || userKey.accessKey === undefined)
        {
            setFlag(false)
        }
        setPasswordModal(true);
        setVoucherLoading(false)
    }

    const updateUserInfo = async () =>
    {
        let avatarUrl = ''
        if (fileList && fileList[0] && valueLength(fileList[0].url))
        {
            // @ts-ignore
            avatarUrl = fileList[0].url
        }
        const res = await updateUserUsingPost({
            // @ts-ignore
            userAvatar: avatarUrl,
            id: loginUser?.id,
            userName: userName
        })
        if (res.data && res.code === 0)
        {
            setInitialState({loginUser: res.data, settings: Settings})
            message.success(`信息更新成功`);
        }
    }

    const modifyUserPassword = async (values: {
                                          userPassword: string,
                                          emailAccount: string,
                                          captcha: string,
                                          newPassword: string,
                                          ConfirmPassword: string
                                      }
        , signature: string | unknown) =>
    {
        if (typeof signature !== "string" || signature.length === 0)
        {
            message.error('验证信息不能为空！');
            return;
        }
        try {
            const body: API.ModifyPasswordRequest = {
                confirmPassword: values?.ConfirmPassword,
                emailCode: values?.captcha,
                newPassword: values?.newPassword,
                oldPassword: values?.userPassword,
                signature: signature
            }
            const response: API.BaseResponseboolean = await modifyPasswordUsingPost(body)
            if (response.data && response.code === 0)
            {
                message.success("密码修改成功");
                // 重新登录
                history.push("/user/login")
            }
        }
        catch (e: any)
        {
            message.error(`密码修改失败: ${e.message}`);
        }
    }

    const props: UploadProps = {
        name: 'file',
        withCredentials: true,
        action: `${requestConfig.baseURL}api/file/upload?biz=user_avatar`,
        onChange: async function ({file, fileList: newFileList})
        {
            const {response} = file;
            if (file.response && response.data)
            {
                const {data: {status, url}} = response
                const updatedFileList = [...fileList];
                if (response.code !== 0 || status === 'error')
                {
                    message.error(response.message);
                    file.status = "error"
                    updatedFileList[0] = {
                        // @ts-ignore
                        uid: loginUser?.userAccount,
                        // @ts-ignore
                        name: loginUser?.userAvatar ?
                            loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1) : "error",
                        status: "error",
                        percent: 100
                    }
                    setFileList(updatedFileList);
                    return
                }
                file.status = status
                updatedFileList[0] = {
                    // @ts-ignore
                    uid: loginUser?.userAccount,
                    // @ts-ignore
                    name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
                    status: status,
                    url: url,
                    percent: 100
                }
                setFileList(updatedFileList);
            }
            else
            {
                setFileList(newFileList);
            }
        },
        listType: "picture-circle",
        onPreview: handlePreview,
        fileList: fileList,
        beforeUpload: beforeUpload,
        maxCount: 1,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    // 绑定邮箱
    const handleRebindEmailSubmit = async (values: {
                                               emailAccount: string;
                                               newCaptcha: string;
                                               newEmailAccount: string;
                                               oldCaptcha: string;
                                           },
                                           signature: string | unknown) =>
    {
        if (typeof signature !== "string" || signature.length === 0)
        {
            message.error('验证信息不能为空！');
            return;
        }
        try
        {

            const body: API.ModifyUserEmailRequest = {
                code: values?.newCaptcha,
                email: values?.newEmailAccount,
                signature: signature
            }
            const response: API.BaseResponseboolean = await modifyUserEmailUsingPost(body);
            if (response?.data && response.code === 0)
            {
                message.success('绑定邮箱成功');
                setInitialState({
                    loginUser: {
                        email: values?.newEmailAccount
                    }
                })
            }
            else
            {
                message.error('绑定邮箱失败');
            }
            setOpenEmailModal(false);
            // }
        } catch (error)
        {
            message.error('操作失败！');
        }
    };
    const handleBindEmailSubmit = async (values: {
        captcha: string;
        emailAccount: string;
    }, signature: string | unknown) =>
    {
        try
        {
            if (typeof signature !== "string" || signature.length === 0)
            {
                message.error('验证信息不能为空！');
                return;
            }
            const body: API.ModifyUserEmailRequest = {
                code: values?.captcha,
                email: values?.emailAccount,
                signature: signature
            }

            const response: API.BaseResponseboolean = await modifyUserEmailUsingPost(body);
            if (response?.data && response.code === 0)
            {
                message.success('绑定邮箱成功');

                setInitialState({
                    loginUser: {
                        email: values?.emailAccount
                    }
                })
            }
            setOpenEmailModal(false)
            message.success('绑定邮箱成功');
            // }
        } catch (error)
        {
            const defaultLoginFailureMessage = '操作失败！';
            message.error(defaultLoginFailureMessage);
        }
    };
    return (
        <Spin spinning={loading}>
            <ProCard
                type="inner"
                bordered
                direction="column"
            >
                <ProCard
                    ref={ref1}
                    extra={
                        <>
                            <Tooltip title={"用于接收订单信息"}>
                                <Button onClick={() =>
                                {
                                    setOpenEmailModal(true)
                                }
                                }>{loginUser?.email ? '更新邮箱' : "绑定邮箱"}</Button>
                            </Tooltip>
                            <Tooltip title={"提交修改的信息"}>
                                <Button style={{marginLeft: 10}} onClick={updateUserInfo}>提交修改</Button>
                            </Tooltip>
                            <Tooltip title={"提交修改的信息"}>
                                <Button style={{marginLeft: 10}} onClick={async () =>
                                {
                                    if (!loginUser.email)
                                    {
                                        message.error("请先绑定邮箱");
                                        return;
                                    }
                                    else
                                    {
                                        setEmailModalType("password");
                                        setOpenEmailModal(true);
                                    }
                                }}>修改密码</Button>
                            </Tooltip>
                        </>
                    }
                    title={<strong>个人信息设置</strong>}
                    type="inner"
                    bordered
                >
                    <Descriptions.Item>
                        <ImgCrop
                            rotationSlider
                            quality={1}
                            aspectSlider
                            maxZoom={4}
                            cropShape={"round"}
                            zoomSlider
                            showReset
                        >
                            <Upload {...props}>
                                {fileList.length >= 1 ? undefined : uploadButton()}
                            </Upload>
                        </ImgCrop>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
                    </Descriptions.Item>
                    <Descriptions column={1}>
                        <div>
                            <h4>昵称：</h4>
                            <Paragraph
                                editable={
                                    {
                                        icon: <EditOutlined/>,
                                        tooltip: '编辑',
                                        onChange: (value) =>
                                        {
                                            setUserName(value)
                                        }
                                    }
                                }
                            >
                                {valueLength(userName) ? userName : '无名氏'}
                            </Paragraph>
                        </div>
                        {/*<div>*/}
                        {/*    <Tooltip title={"邀请好友注册双方都可获得100硬币"}>*/}
                        {/*        <h4>我的邀请码：</h4>*/}
                        {/*    </Tooltip>*/}
                        {/*    <Paragraph*/}
                        {/*        copyable={valueLength(loginUser?.invitationCode)}*/}
                        {/*    >*/}
                        {/*        {loginUser?.invitationCode}*/}
                        {/*    </Paragraph>*/}
                        {/*</div>*/}
                        <div>
                            <h4>我的id：</h4>
                            <Paragraph
                                copyable={valueLength(loginUser?.id)}
                            >
                                {loginUser?.id}
                            </Paragraph>
                        </div>
                        <div>
                            <h4>我的邮箱：</h4>
                            <Paragraph
                                copyable={loginUser?.email ? loginUser.email : '未绑定邮箱'}
                            >
                                {loginUser?.email ? loginUser.email : '未绑定邮箱'}
                            </Paragraph>
                        </div>
                    </Descriptions>
                </ProCard>
                <br/>
                <ProCard ref={ref2} type={"inner"} bordered tooltip={"用于平台接口调用"}
                         title={<strong>我的钱包</strong>}
                         extra={
                             <>
                                 <Button onClick={() =>
                                 {
                                     history.push("/recharge")
                                 }}>充值硬币</Button>
                             </>
                         }
                >
                    <strong>硬币 💰: </strong> <span
                    style={{color: "red", fontSize: 18, marginBottom: 10}}>{loginUser?.balance}</span>
                    <br/>
                    <Button style={{marginRight: 10, marginTop: 10, marginBottom: 10}} type={"primary"} onClick={() =>
                    {
                        // setOpen(true)
                    }}>邀请好友</Button>
                    {/*<Button loading={dailyCheckInLoading}*/}
                    {/*        style={{marginRight: 10}} type={"primary"} onClick={async () =>*/}
                    {/*{*/}
                    {/*    setDailyCheckInLoading(true)*/}
                    {/*    const res = await doDailyCheckInUsingPost()*/}
                    {/*    if (res.data && res.code === 0) {*/}
                    {/*        const res = await getLoginUserUsingGet();*/}
                    {/*        if (res.data && res.code === 0) {*/}
                    {/*            message.success("签到成功")*/}
                    {/*            setInitialState({loginUser: res.data, settings: Settings})*/}
                    {/*        }*/}
                    {/*    }*/}
                    {/*    setTimeout(() => {*/}
                    {/*        setDailyCheckInLoading(false)*/}
                    {/*    }, 1000)*/}
                    {/*}}>*/}
                    {/*    <Tooltip title={<>*/}
                    {/*        <p>每日签到可获取10硬币</p>*/}
                    {/*        /!*<p>普通用户上限100</p>*!/*/}
                    {/*        /!*<p>VPI会员上限1000</p>*!/*/}
                    {/*    </>}>*/}
                    {/*        每日签到*/}
                    {/*    </Tooltip>*/}
                    {/*</Button>*/}
                </ProCard>
                <br/>
                <ProCard
                    ref={ref3}
                    bordered
                    type="inner"
                    title={"开发者凭证（调用接口的凭证）"}
                    extra={
                        <>
                            <Button
                                loading={voucherLoading}
                                onClick={showVoucher}

                                style={{
                                    marginRight: "8px"
                                }}
                            >查看凭证</Button>
                            {userKey?.accessKey && userKey?.secretKey && (
                                <Button
                                    loading={voucherLoading}
                                    onClick={updateVoucher}>
                                    更新凭证
                                </Button>
                            )}

                        </>
                    }
                >
                    {
                        (userKey?.accessKey && userKey?.secretKey) ? (
                            <Descriptions column={1}>
                                <Descriptions.Item label="AccessKey">
                                    <Paragraph copyable={valueLength(userKey?.accessKey)}>
                                        {userKey?.accessKey}
                                    </Paragraph>
                                </Descriptions.Item>
                                <Descriptions.Item label="SecretKey">
                                    <Paragraph copyable={valueLength(userKey?.secretKey)}>
                                        {userKey?.secretKey}
                                    </Paragraph>
                                </Descriptions.Item>
                            </Descriptions>) : "点击右上角查看开发者凭证"
                    }
                </ProCard>
                <br/>
                <ProCard
                    ref={ref4}
                    type="inner"
                    title={<strong>开发者 SDK（快速接入API接口）</strong>}
                    bordered
                >
                    <Button size={"large"}>
                        <a target={"_blank"} href={"https://github.com/caixypromise"}
                           rel="noreferrer"><VerticalAlignBottomOutlined/> Java SDK</a>
                    </Button>
                </ProCard>
            </ProCard>
            {/*<SendGiftModal invitationCode={loginUser?.invitationCode} onCancel={() => {*/}
            {/*    setOpen(false)*/}
            {/*}} open={open}/>*/}
            <EmailModal unbindSubmit={handleBindEmailSubmit}
                        modifyPasswordSubmit={modifyUserPassword}
                        bindSubmit={handleRebindEmailSubmit}
                        data={loginUser}
                        onCancel={() => setOpenEmailModal(false)}
                        eventType={emailModalType}
                        open={openEmailModal}/>
            <Tour open={openTour} onClose={() =>
            {
                setOpenTour(false)
                localStorage.setItem('tour', "true");
            }} steps={steps}/>
            <Modal
                title="查看秘钥"
                open={passwordModal}
                onOk={getVoucher}
                onCancel={() => setPasswordModal(false)}
            >
                <ProForm<{
                    userPassword: string;
                }>
                    formRef={formRef}
                    formKey="check-user-password-form"
                    autoFocusFirstInput
                    submitter={{
                        resetButtonProps: {
                            style: {
                                display: 'none',
                            },
                        },
                        submitButtonProps: {
                            style: {
                                display: 'none',
                            },
                        },
                    }}
                >
                    <ProFormText.Password name="userPassword" placeholder="请输入用户密码"/>
                </ProForm>
            </Modal>
        </Spin>
    );
};

export default Profile;