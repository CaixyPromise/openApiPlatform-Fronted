import { ProFormColumnsType, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProFormColumnsType<API.InterfaceInfoAddRequest>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoAddRequest) => void;
  open: boolean;
};
const CreateModal: React.FC<Props> = (props) =>
{
  const { columns, onCancel, onSubmit, open } = props;
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={'800px'}>
      <ProTable
        // @ts-ignore
        columns={columns}
        type="form"
        onSubmit={async (values) =>
        {
          return onSubmit?.(values);
        }}
      />
    </Modal>
  );
};
export default CreateModal;
