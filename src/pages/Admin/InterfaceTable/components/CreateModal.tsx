import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => void;
  open: boolean;
}
const CreateModal: React.FC<Props> = (props) =>
{
  const {columns, onCancel, onSubmit, open} = props;
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <ProTable
        columns={columns}
        type="form"
        onSubmit={async (values) =>
        {
          return onSubmit?.(values)
        }}
      />
    </Modal>
  )
}
export default CreateModal;