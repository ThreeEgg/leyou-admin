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
            component: './MerchandiseManage',
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
            component: './EnterpriseManage',
          },
          {
            path: '/userManage',
            name: '用户管理',
            icon: 'table',
            component: './UserManage',
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
