import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'PowerBy@Caixypromise';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'My Github',
          title: 'From CaixyPromise',
          href: 'https://github.com/CaixyPromise',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/CaixyPromise',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Github',
          href: 'https://github.com/CaixyPromise',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
