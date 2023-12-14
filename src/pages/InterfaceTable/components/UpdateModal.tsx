import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => void;
  open: boolean;
  initialValue: API.InterfaceInfo;
}
const UpdateModal: React.FC<Props> = (props) =>
{
  const {columns, onCancel, onSubmit, open, initialValue} = props;
  const fromRef = useRef<ProFormInstance>();

  useEffect(() => {
    fromRef.current?.setFieldsValue(initialValue);
  }, [initialValue])

  console.log(initialValue)

  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <ProTable
        columns={columns}
        type="form"
        formRef={fromRef}
        onSubmit={async (values) => {
          return onSubmit?.(values)
        }}
      />
    </Modal>
  )
}
export default UpdateModal;
