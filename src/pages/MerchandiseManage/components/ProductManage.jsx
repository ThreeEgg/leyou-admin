import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, } from 'antd'
import { getList } from '@/services/common'
import PageBack from "@/components/PageBack"
import ProduceEditModal from "./ProductEditModal"

class ProductManage extends Component {

  state = {
    editData: {}
  }

  ProduceEditModalRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: true
    },
    {
      title: '商品名称',
      dataIndex: '1',
    },
    {
      title: '商品分类',
      dataIndex: '2',
    },
    {
      title: '品类数量',
      dataIndex: '3',
    },
    {
      title: '实际销售数量',
      dataIndex: '4',
    },
    {
      title: '展示销售数量',
      dataIndex: '5',
    },
    {
      title: '状态',
      dataIndex: '6',
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
          <Button type="link" size="small" >销售数量修改</Button>
          <Button type="link" size="small" danger>删除</Button>
        </Space>
      ),
    },
  ]

  handleEdit = (flag, editData) => {
    this.setState({
      editData
    }, () => {
      this.ProduceEditModalRef.current.handleOk()
    })
  }

  formatParams = (paramsData) => {
    return paramsData
  }

  render() {
    const { columns } = this;
    const { editData } = this.state;
    return (
      <PageContainer
        title={<PageBack title="商品管理"></PageBack>}
      >
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
        <ProduceEditModal ref={this.ProduceEditModalRef} editData={editData} />
      </PageContainer>
    )
  }
}

export default ProductManage
