import React from 'react';
import {ProFormCaptcha, ProFormText} from "@ant-design/pro-form";
import {LockOutlined, MailOutlined} from "@ant-design/icons";

export type EmailCaptchaBlockProps = {
    emailName: string; // 用于区分不同的电子邮箱字段
    captchaName: string; // 用于区分不同的验证码字段
    disabled: boolean; // 是否禁用输入
    onGetCaptcha: (emailAccount: string) => Promise<void>; // 获取验证码的回调
    initialValue?: string; // 初始电子邮件值
    emailPlaceholder?: string | undefined;
};

const EmailCaptchaBlock: React.FC<EmailCaptchaBlockProps> = (props: EmailCaptchaBlockProps) =>
{
    const {
        emailName,
        captchaName,
        disabled,
        onGetCaptcha,
        initialValue,
        emailPlaceholder
    } = props;
    return (
        <>
            <ProFormText
                fieldProps={{
                    size: 'large',
                    prefix: <MailOutlined/>,
                }}
                name={emailName}

                placeholder={emailPlaceholder && '请输入邮箱账号！'}
                rules={[
                    {required: true, message: '邮箱账号是必填项！'},
                    {pattern: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/, message: '不合法的邮箱账号！'},
                ]}
                initialValue={initialValue}
                disabled={disabled}
            />
            <ProFormCaptcha
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined/>,
                }}
                captchaProps={{size: 'large'}}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => timing ? `${count} 秒后重新获取` : '获取验证码'}
                phoneName={emailName}
                name={captchaName}
                rules={[{required: true, message: '验证码是必填项！'}]}
                onGetCaptcha={onGetCaptcha}
            />
        </>
    );
};

export default EmailCaptchaBlock;
