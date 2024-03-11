export default [
    {
        path: '/user',
        layout: false,
        routes: [ { name: '登录', path: '/user/login', component: './User/Login' } ],
    },
    {
        path: '/interface/:id',
        name: '查看接口',
        icon: 'smile',
        component: './Interface',
        hideInMenu: true,
        // layout: false
    },
    {
        path: "/self",
        name: "个人信息",
        icon: "smile",
        component: "User/Profile"
    },
    {
        path: '/order/info/:id',
        icon: 'ProfileOutlined',
        name: '订单详情',
        component: './Order/OrderInfo',
        hideInMenu: true,
    },
    { path: '/index', name: '所有接口', icon: 'smile', component: './Index' },
    { path: "/recharge", name: "购买硬币", icon: "PayCircleOutlined", component: "./Recharge" },
    {
        path: '/order/pay/:id',
        icon: 'PayCircleOutlined',
        name: '订单支付',
        component: './Order/PayOrder',
        hideInMenu: true,
    },
    {
        path: '/order/list',
        name: '我的订单',
        icon: 'ProfileOutlined',
        component: './Order/OrderList',
    },
    {
        path: '/admin',
        name: '管理接口',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
            // { path: '/admin', redirect: '/admin/sub-page' },
            // { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
            {
                name: '所有接口信息',
                icon: 'table',
                path: '/admin/interface',
                component: './Admin/InterfaceTable'
            },
            {
                name: '接口调用分析',
                icon: 'analysis',
                path: '/admin/analysis',
                component: './Admin/InterfaceAnalysis'
            },
            {
                name: '商品管理',
                icon: 'table',
                path: '/admin/productInfo/list',
                component: './Admin/ProductInfoList',
            },
        ],
    },
    { path: '/', redirect: '/index' },
    { path: '*', layout: false, component: './404' },
];
