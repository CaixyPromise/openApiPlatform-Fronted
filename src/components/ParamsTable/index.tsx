import {EditableProTable, ProColumns} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {ParamsTablePros} from "@/typings";


const ParamsTable: React.FC<ParamsTablePros> = ({
                                                    value,
                                                    onChange,
                                                    defaultNewColumn,  //
                                                    column
                                                }) =>
{
    const [dataSource, setDataSource] = useState<readonly any[]>([]);
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    {
        return dataSource.map((item) => item.id as React.Key);
    });

    const addUniqueIdToData = (data:any) => {
        return data.map((item: { id: any; }) => ({ ...item, id: item.id || `temp-id-${Date.now()}-${Math.random()}` }));
    };

    const doData = (value: any) =>
    {
        console.log("value is: ", value)

        const valueArray = Array.isArray(value) ? addUniqueIdToData(value) : [];
        setDataSource(valueArray)
        const requestIds = valueArray?.map((item: { id: unknown; }) => item.id as unknown as string) || [];
        setEditableRowKeys(requestIds)
    }
    useEffect(() =>
    {
        if (typeof value === "string")
        {
            const parseValue = JSON.parse(value);
            doData(parseValue)
        }
        else if (typeof value == "object")
        {
            doData(value);
        }

    }, [value])
    const handleInputChange = (e: any) =>
    {
        onChange?.(e);
    };
    const columns: ProColumns[] = [
        ...column,
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() =>
                    {
                        console.log("action is: ", action)
                        console.log("record is: ", record)
                        // @ts-ignore
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                <a
                    key="delete"
                    onClick={() =>
                    {
                        setDataSource(dataSource.filter((item) => item.id !== record.id));
                    }
                    }
                >
                    删除
                </a>,
            ]
        },
    ];

    return (
        <EditableProTable<any>
            columns={columns}
            rowKey="id"
            scroll={{
                y: 180,
            }}
            value={dataSource}
            onChange={setDataSource}
            recordCreatorProps={{
                newRecordType: 'dataSource',
                position: 'bottom',
                record: () =>
                {
                    return (
                        {
                            id: Date.now().toString(),
                            ...defaultNewColumn
                        })
                },
            }}
            // @ts-ignore
            // maxLength={value?.length}
            editable={{
                type: 'multiple',
                editableKeys,
                actionRender: (row, config, dom) =>
                {
                    return [dom.save || dom.delete, dom.cancel, dom.delete];
                },
                onValuesChange: (record, recordList) =>
                {
                    handleInputChange(recordList)
                },
                onChange: setEditableRowKeys,
            }}
        />
    );
};
export default ParamsTable