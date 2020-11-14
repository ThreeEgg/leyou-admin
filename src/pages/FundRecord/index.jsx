import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getBeansList } from '@/services/fund'

import styles from "./index.less"
class FundRecord extends Component {

  state = {
    total: 0,
    totalPoint: 0,
  }

  actionRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      dataIndex: '2',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '额度',
      dataIndex: 'increaseStatus',
      renderText: (_, item) => {
        return `${item.increaseStatus === 1 ? '+' : '-'} ${item.point}`;
      }
    }
  ]

  formatParams = (paramsData) => {
    const params = paramsData;
    console.log('params', params);
    params.currentPage = params.current;
    delete params.current;
    return params
  }

  render() {
    const { columns } = this;
    const { total, totalPoint, } = this.state;
    const content = (
      <div className={styles.point}>
        <span>当前簿记豆余额：</span><span>{totalPoint}</span>
      </div>
    )
    return (
      <PageContainer
        content={content}
      >
        <ProTable
          // actionRef={this.actionRef}
          search={false}
          columns={columns}
          // toolBarRender={() => [
          //   <Button type="primary" size="small" key={1}>
          //     <PlusOutlined /> 新增
          //   </Button>,
          // ]}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getBeansList(params)
          }}
          postData={(data) => {
            if (data) {
              this.setState({
                total: data.pointPage.total,
                totalPoint: data.totalPoint || 0
              })
              return data.pointPage.list
            }
            return []
          }}
          pagination={{
            total,
            showQuickJumper: true,
            showLessItems: true,
            showSizeChanger: true,
          }}
          options={{
            fullScreen: false
          }}
        />
      </PageContainer>
    )
  }
}

export default FundRecord
