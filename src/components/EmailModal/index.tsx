import React, {useEffect, useRef, useState} from "react";
import {Button, message, Modal} from "antd";
// import {getCaptchaUsingGet,} from "@/services/apiBackend/userController";
import {LoginForm} from "@ant-design/pro-components";
import {ProFormInstance} from "@ant-design/pro-form/lib";
import {getModifyEmailCaptchaUsingPost} from "@/services/apiBackend/emailController";
import EmailCaptchaBlock from "@/components/EmailModal/components/InputBlock";
import {ProFormText} from "@ant-design/pro-form";
import {generateRandomNumber} from "@/utils/RandomUtils";
// import {valueLength} from "@/pages/User/UserInfo";


export type Props = {
    open: boolean;
    onCancel: () => void;
    data?: API.UserVO
    bindSubmit: (values: any, signature: string) => Promise<void>;
    unbindSubmit: (values: any, signature: string) => Promise<void>;
    modifyPasswordSubmit: (values: any, signature: string) => Promise<void>;
    eventType?: "bind" | "password";
};

const EmailModal: React.FC<Props> = (props) =>
{
    const formRef = useRef<ProFormInstance>();
    const [key, setKey] = useState<"bind" | "unbind">()
    const {open, data, onCancel, bindSubmit, unbindSubmit, eventType, modifyPasswordSubmit} = props;
    const [signature, setSignature] = useState<string>("");
    useEffect(() =>
    {
        // 关闭表单时刷新form
        if (!open)
        {
            formRef.current?.resetFields()
        }
    }, [open]);

    const sendCaptchaCode = async (requestBody: API.ModifyEmailCaptchaRequest) =>
    {
        try
        {
            const response: API.BaseResponsestring = await getModifyEmailCaptchaUsingPost(requestBody);
            if (response.data)
            {
                console.log(response.data)
                setSignature(response?.data ? response.data : "");
                message.success("验证码发送成功")
            }
        } catch (e: Error)
        {
            message.error(`验证码发送失败: ${e.message}`)
        }
    }

    return (
        <Modal
            footer={null}
            centered
            open={open}
            width={500}
            onCancel={onCancel}
            title={data?.email ? "修改邮箱" : "绑定邮箱"}
        >
            <LoginForm
                formRef={formRef}
                contentStyle={{
                    minWidth: 280,
                    maxWidth: '75vw',
                }}
                submitter={
                    {
                        render: () =>
                        {
                            return [
                                <>
                                    <Button
                                        type={"primary"}
                                        key="submit"
                                        block
                                        onClick={() =>
                                        {
                                            formRef.current?.submit()
                                        }}
                                    >
                                        {data?.email ? '更新邮箱' : "绑定邮箱"}
                                    </Button>
                                </>
                            ];
                        },
                    }
                }
                onFinish={async (values) =>
                {
                    console.log("values", values)
                    if (props.eventType === "bind")
                    {
                        if (data?.email)
                        {
                            bindSubmit?.(values, signature);
                        }
                        else
                        {
                            unbindSubmit?.(values, signature)
                        }
                    }
                    else
                    {
                        modifyPasswordSubmit?.(values, signature);
                    }
                }}
            >
                {props.eventType === "bind" ? (data?.email
                    ? (<><EmailCaptchaBlock
                        emailName="emailAccount"
                        captchaName="oldCaptcha"
                        disabled={!!data?.email}
                        onGetCaptcha={async (emailAccount) =>
                        {
                            // 发给旧邮箱
                            await sendCaptchaCode({
                                code: "",
                                eventType: 0,
                                newEmail: emailAccount,
                                signature: ""
                            })
                        }}
                        initialValue={data?.email ? data.email : ""}
                        emailPlaceholder={"请输入旧邮箱地址"}
                    />
                        <EmailCaptchaBlock
                            emailName="newEmailAccount"
                            captchaName="newCaptcha"
                            disabled={false}
                            onGetCaptcha={async (emailAccount) =>
                            {
                                // 发给新邮箱
                                console.log(emailAccount)
                                const oldCaptcha = formRef.current?.getFieldValue('oldCaptcha');
                                console.log('Current Email Account:', oldCaptcha);
                                if (!oldCaptcha)
                                {
                                    message.error('请先输入旧邮箱的验证码！');
                                    return;
                                }
                                await sendCaptchaCode({
                                    code: oldCaptcha,
                                    eventType: 1,
                                    newEmail: emailAccount,
                                    signature: signature
                                })
                            }}
                            emailPlaceholder={"请输入新邮箱地址"}
                        /></>)
                    :
                    <>
                        <ProFormText.Password name="userPassword" placeholder="请输入用户密码"/>
                        <EmailCaptchaBlock
                            emailName="emailAccount"
                            captchaName="captcha"
                            disabled={!!data?.email}
                            onGetCaptcha={async (emailAccount) =>
                            {
                                const captcha = formRef.current?.getFieldValue('captcha');
                                const password = formRef.current?.getFieldValue("userPassword");
                                // 发给邮箱验证码
                                await sendCaptchaCode({
                                    code: captcha,
                                    eventType: 5,
                                    newEmail: emailAccount,
                                    signature: password
                                })
                            }}
                            initialValue={data?.email ? data.email : ""}
                            emailPlaceholder={"请输入邮箱地址"}
                        />
                    </>) : (
                    <>
                        <ProFormText.Password name="userPassword" placeholder="请输入当前用户密码"/>
                        <EmailCaptchaBlock
                            emailName="emailAccount"
                            captchaName="captcha"
                            disabled={!!data?.email}
                            onGetCaptcha={async (emailAccount) =>
                            {
                                const captcha = formRef.current?.getFieldValue('captcha');
                                const password = formRef.current?.getFieldValue("userPassword");
                                // 发给邮箱验证码
                                await sendCaptchaCode({
                                    code: String(generateRandomNumber(6)),
                                    eventType: 99,
                                    newEmail: emailAccount + "|split|" + password,
                                    signature: String(Date.now()) // signature是当前时间戳
                                })
                            }}
                            initialValue={data?.email ? data.email : ""}
                            emailPlaceholder={"请输入邮箱地址"}
                        />
                        <ProFormText.Password name="newPassword" rules={[
                            {required: true, message: '新密码是必填项！'},
                            // {pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\W_])^.{6,20}$/, message: '不合法的密码！'},
                        ]} placeholder="请输入新的用户密码"/>
                        {/*// 正则匹配密码*/}

                        <ProFormText.Password name="ConfirmPassword" rules={[
                            {required: true, message: '确认新密码是必填项！'},
                            // {pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\\W_])^.{6,20}$/, message: '不合法的密码！'},
                        ]} placeholder="请再次确认输入新的用户密码"/>
                    </>
                )}
            </LoginForm>
        </Modal>
    );
};

export default EmailModal;