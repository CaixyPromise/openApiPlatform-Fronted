import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, Input, message} from 'antd';
import React, {useRef, useState} from 'react';
import {
  addInterfaceInfoUsingPost, deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet, updateInterfaceInfoUsingPost
} from "@/services/apiBackend/interfaceInfoController";
import {SortOrder} from "antd/lib/table/interface";
import CreateModal from "@/pages/InterfaceTable/components/CreateModal";
import UpdateModal from "@/pages/InterfaceTable/components/UpdateModal";

const InterfaceInfoTable: React.FC = () =>
{
  /**
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);


  /**
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) =>
  {
    const hide = message.loading('正在添加');
    try
    {
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('添加成功');
      handleModalOpen(false);
      return true;
    } catch (error)
    {
      hide();
      message.error('添加失败，请重新添加');
      return false;
    }
  };


  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) =>
  {
    if (!currentRow) {
      return
    }
    const hide = message.loading('Configuring');
    try
    {
      await updateInterfaceInfoUsingPost({
        id : currentRow.id,
        ...fields,
      });
      hide();
      message.success('Configuration is successful');
      handleUpdateModalOpen(false)
      return true;
    } catch (error)
    {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };


  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.InterfaceInfo) =>
  {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try
    {
      await deleteInterfaceInfoUsingPost({
          id : selectedRows.id
    });
      hide();
      message.success('Deleted successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error)
    {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };


  const columns: ProColumns<API.InterfaceInfo>[] = [

    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true
          }
        ]
      }
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'select',
      valueEnum: {
        GET: { text: 'GET' },
        POST: { text: 'POST' },
        PUT: { text: 'PUT' },
        DELETE: { text: 'DELETE' },
      },
    },
    {
      title: 'URL',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'text',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm : true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm : true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
          <a
              key="config"
              onClick={() => {
                  handleUpdateModalOpen(true);
                  setCurrentRow(record);
              }}
          >
              修改
          </a>,
          <Button
              type="text"
              key="config"
              danger
              onClick={() => {
                  handleRemove(record);
              }}
          >
              删除
          </Button>,
      ],
    },
  ]

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() =>
            {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params: any,
                        sort: Record<string, SortOrder>,
                        filter: Record<string, (string | number)[] | null>) =>
        {
          const response: any = await listInterfaceInfoByPageUsingGet({...params});
          if (response.data)
          {
            return {
              data: response?.data.records,
              success: true,
              total: response.data.total
            }
          }
          else
          {
            return {
              data: [],
              success: false,
              total: 0
            }
          }
        }}

        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) =>
          {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + 0!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () =>
            {
              // @ts-ignore
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateModal
        columns={columns}
        onCancel={() => {handleModalOpen(false)}}
        onSubmit={handleAdd}
        open={createModalOpen}
      />
      <UpdateModal
        columns={columns}
        onCancel={() => handleUpdateModalOpen(false)}
        onSubmit={async (param: API.InterfaceInfo) => {
          console.log("handleUpdate is: ", param)
          const response = await handleUpdate(param);
          if (response)
          {
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
        }}}
        open={updateModalOpen}
        initialValue={currentRow || {}}
      />
      {/*<UpdateForm*/}
      {/*  onSubmit={async (value) =>*/}
      {/*  {*/}
      {/*    const success = await handleUpdate(value);*/}
      {/*    if (success)*/}
      {/*    {*/}
      {/*      handleUpdateModalOpen(false);*/}
      {/*      setCurrentRow(undefined);*/}
      {/*      if (actionRef.current)*/}
      {/*      {*/}
      {/*        actionRef.current.reload();*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  onCancel={() =>*/}
      {/*  {*/}
      {/*    handleUpdateModalOpen(false);*/}
      {/*    if (!showDetail)*/}
      {/*    {*/}
      {/*      setCurrentRow(undefined);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  updateModalOpen={updateModalOpen}*/}
      {/*  values={currentRow || {}}*/}
      {/*/>*/}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() =>
        {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default InterfaceInfoTable;
