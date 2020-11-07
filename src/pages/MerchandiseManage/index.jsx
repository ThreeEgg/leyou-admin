import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'
import { history } from "umi";
import EditModal from "./components/EditModal"

class MerchandiseManage extends Component {

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
      title: '分类名称',
      dataIndex: '1',
    },
    {
      title: '商品类型',
      dataIndex: '1',
    },
    {
      title: '包含商品',
      dataIndex: '2',
    },
    {
      title: '状态',
      dataIndex: '3',
    },
    {
      title: '操作',
      dataIndex: '4',
      search: false,
      fixed: 'right',
      width: 80,
      render: (_, item) => (
        <Space>
          <Button type="link" size="small" >排序</Button>
          <Button type="link" size="small" >上架</Button>
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" onClick={() => this.gotoClassManage()}>查看全部</Button>
          <Button type="link" size="small" danger>删除</Button>
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

  formatParams = (paramsData) => {
    return paramsData
  }

  gotoClassManage = () => {
    history.push({
      pathname: `/merchandiseManage/productManage`
    })
  }

  render() {
    const { columns } = this;
    const { editData } = this.state;
    return (
      <PageContainer>
        <ProTable
          // actionRef={this.actionRef}
          search={false}
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

export default MerchandiseManage
