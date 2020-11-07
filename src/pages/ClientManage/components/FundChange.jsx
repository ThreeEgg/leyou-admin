import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { FormOutlined, } from '@ant-design/icons'
import { Button, } from 'antd'
import { getList } from '@/services/common'
import PageBack from "@/components/PageBack"
import FundEditModal from "./FundEditModal"
import { create } from 'lodash';

class FundChange extends Component {

  state = {

  }

  FundEditModalRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: true
    },
    {
      title: '操作时间',
      dataIndex: '1',
    },
    {
      title: '额度',
      dataIndex: '2',
    },
    {
      title: '操作',
      dataIndex: '3',
    },
    {
      title: '备注',
      dataIndex: '4'
    }
  ]

  formatParams = (paramsData) => {
    return paramsData
  }

  render() {
    const { columns } = this;
    return (
      <PageContainer
        title={<PageBack title="簿记豆变更"></PageBack>}
      >
        <ProTable
          // actionRef={this.actionRef}
          search={false}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.FundEditModalRef.current.handleOk()}>
              <FormOutlined /> 变动
            </Button>,
          ]}
          columns={columns}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getList(params)
          }}
          postData={(data) => {
            if (data) {
              return data.list
            }
            return []
          }}
          pagination={{
            showQuickJumper: true,
            showLessItems: true,
            showSizeChanger: true,
          }}
          options={{
            fullScreen: false
          }}
        />
        <FundEditModal ref={this.FundEditModalRef} />
      </PageContainer>
    )
  }
}

export default FundChange
