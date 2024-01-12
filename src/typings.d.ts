import {ProColumns} from "@ant-design/pro-components";
import React from "react";

declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

interface EncryptedPackage
{
    nonce: string;
    timestamp: string;
    encryptedPassword: string;
}

interface InitialState
{
    currentUser?: API.UserVO,
    settings?: Partial<LayoutSettings>
}

interface NewRequestColumn
{
    fieldName: string,
    required: "是" | "否",
    type: 'int' | 'string' | 'boolean' | 'double' | 'long' | 'object',
    desc?: string,
}

interface NewHeaderColumn
{
    fieldName: string,
    headerValue: string,
    required: "是" | "否",
    description?: string
}

interface NewResponseColumn
{
    fieldName: string,
    type: 'int' | 'string' | 'boolean' | 'double' | 'long' | 'object',
    desc?: string,
}

export interface ParamsTablePros
{
    defaultNewColumn: any,
    column: ProColumns[];
    value?: string | object;
    onChange?: (
        value: {
            id: React.Key;
            fieldName?: string;
            type?: string;
            desc?: string;
            required?: string;
        }[],
    ) => void;
}