import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { FormOutlined, } from '@ant-design/icons'
import { Button, } from 'antd'
import { getBeansRecord, } from '@/services/client'
import PageBack from "@/components/PageBack"
import FundEditModal from "./FundEditModal"
import { create } from 'lodash';
import { getStateByParams } from "@/utils/tools"

class FundChange extends Component {

  state = {
    total: 0,
    totalPoint: 0,
  }

  FundEditModalRef = createRef()
  actionRef = createRef();

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
      title: '额度',
      dataIndex: 'point',
    },
    {
      title: '操作',
      dataIndex: 'desc',
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ]

  formatParams = (paramsData) => {
    const params = paramsData;
    params.currentPage = params.current;
    delete params.current;
    const userId = getStateByParams('userId');
    if (userId) {
      params.userId = userId;
    }
    return params
  }

  reload = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload()
    }
  }

  render() {
    const { columns } = this;
    const { total, totalPoint, } = this.state;
    const content = (
      <div>
        <span style={{ fontWeight: 600 }}>当前簿记豆余额：</span><span>{totalPoint}</span>
      </div>
    )
    return (
      <PageContainer
        title={<PageBack title="簿记豆变更"></PageBack>}
        content={content}
      >
        <ProTable
          actionRef={this.actionRef}
          search={false}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.FundEditModalRef.current.handleOk()}>
              <FormOutlined /> 变动
            </Button>,
          ]}
          columns={columns}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getBeansRecord(params)
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
        <FundEditModal ref={this.FundEditModalRef} reload={this.reload} userId={getStateByParams('userId')} />
      </PageContainer>
    )
  }
}

export default FundChange
