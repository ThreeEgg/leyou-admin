export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            hideInMenu:true,
            icon: 'smile',
            component: './Welcome',
          },
          /* {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          }, */
          {
            path: '/creator',
            name: 'H5生成器',
            icon: 'table',
            component: './Creator',
          },
          {
            path: '/merchandiseManage',
            name: '商品管理',
            icon: 'table',
            // component: './MerchandiseManage',
            routes:[
              {
                path: '/merchandiseManage',
                name: '商品管理',
                icon: 'table',
                component: './MerchandiseManage',
              },
              {
                path: '/merchandiseManage/classifyManage',
                name: '分类管理',
                hideInMenu:true,
                icon: 'table',
                component: './MerchandiseManage/components/ClassifyManage',
              },
            ]
          },
          {
            path: '/orderManage',
            name: '订单管理',
            icon: 'table',
            component: './OrderManage',
          },
          {
            path: '/enterpriseManage',
            name: '企业管理',
            icon: 'table',
            // component: './EnterpriseManage',
            routes:[
              {
                path: '/enterpriseManage',
                name: '企业管理',
                icon: 'table',
                component: './EnterpriseManage',
              },
              {
                path: '/enterpriseManage/reportForm',
                name: '全部报表',
                hideInMenu:true,
                icon: 'table',
                component: './EnterpriseManage/components/ReportForm',
              }
              
            ]
          },
          {
            path: '/clientManage',
            name: '客户管理',
            icon: 'table',
            // component: './ClientManage',
            routes:[
              {
                path: '/clientManage',
                name: '客户管理',
                icon: 'table',
                component: './ClientManage',
              },
              {
                path: '/clientManage/contract',
                name: '查看合同',
                hideInMenu:true,
                icon: 'table',
                component: './ClientManage/components/Contract',
              }
            ]
          },
          {
            path: '/fundRecord',
            name: '资金流水',
            icon: 'table',
            component: './FundRecord',
          },
          {
            name: 'list.table-list',
            icon: 'table',
            path: '/list',
            component: './ListTableList',
          },
          {
            name: '修改密码',
            path: '/account/editPassword',
            hideInMenu: true,
            component: './user/editPassword',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
