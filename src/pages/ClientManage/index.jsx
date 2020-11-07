import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'
import { history } from "umi"
import EditModal from "./components/EditModal"

class ClientManage extends Component {

  state = {
    editData: {}
  }

  EditModalRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: true
    },
    {
      title: '手机号',
      dataIndex: '1',
      search: false,
    },
    {
      title: '姓名',
      dataIndex: '2',
      search: false,
    },
    {
      title: '可查看企业',
      dataIndex: '3',
      search: false,
    },
    {
      title: '注册时间',
      dataIndex: '3',
    },
    {
      title: '当前有效合同数量',
      dataIndex: '3',
      search: false,
    },
    {
      title: '历史合同数量',
      dataIndex: '3',
      search: false,
    },
    {
      title: '簿记豆',
      dataIndex: '3',
    },
    {
      title: '最后登录时间',
      dataIndex: '3',
      search: false,
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: (_, item) => (
        <Space>
          <Button type="link" size="small" onClick={this.gotoFundChange}>簿记豆变更</Button>
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" onClick={this.gotoContract}>查看合同</Button>
        </Space>
      ),
    },
  ]

  handleEdit = (flag, editData) => {
    this.setState({
      editData
    }, () => {
      this.EditModalRef.current.handleOk()
    })
  }

  gotoFundChange = () => {
    history.push({
      pathname: `/clientManage/FundChange`
    })
  }

  gotoContract = () => {
    history.push({
      pathname: `/clientManage/contract`
    })
  }

  formatParams = (paramsData) => {
    return paramsData
  }

  render() {
    const { columns } = this;
    const { editData } = this.state;
    return (
      <PageContainer>
        <ProTable
          // actionRef={this.actionRef}
          // search={false}
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1)}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
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
        <EditModal ref={this.EditModalRef} editData={editData} />
      </PageContainer>
    )
  }
}

export default ClientManage
