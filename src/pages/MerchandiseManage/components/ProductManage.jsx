import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, Modal, message, } from 'antd'
import { getGoodList, handleGood, deleteGood, } from '@/services/merchandise'
import PageBack from "@/components/PageBack"
import ProduceEditModal from "./ProductEditModal"
import { getStateByParams } from "@/utils/tools"

const { confirm } = Modal;
class ProductManage extends Component {

  state = {
    editData: {},
    total: 0
  }

  ProduceEditModalRef = createRef();
  actionRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '商品分类',
      dataIndex: 'typeName',
    },
    {
      title: '品类数量',
      dataIndex: '3',
    },
    {
      title: '实际销售数量',
      dataIndex: 'countTemp',
    },
    {
      title: '展示销售数量',
      dataIndex: 'salesCount',
    },
    {
      title: '状态',
      dataIndex: 'isSale',
      valueEnum: {
        0: '已下架',
        1: '上架中'
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      search: false,
      fixed: 'right',
      width: 80,
      render: (_, item) => (
        <Space>
          <Button type="link" size="small" >排序</Button>
          <Button type="link" size="small" onClick={() => this.handleConfirm(1, item)}>{item.isSale === 0 ? '上架' : '下架'}</Button>
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" >销售数量修改</Button>
          <Button type="link" size="small" danger onClick={() => this.handleConfirm(2, item)}>删除</Button>
        </Space>
      ),
    },
  ]

  handleConfirm = (flag, item) => {
    let params = {};
    let content = "";
    let fun = "";
    if (flag === 2) {
      params = {
        id: item.id
      }
      content = "确认删除该商品？";
      fun = "deleteGood"
    } else {
      params = {
        id: item.id,
        isSale: item.isSale ? '0' : '1'
      }
      content = `确认${params.isSale === '1' ? '上架' : '下架'}该商品？`;
      fun = "handleGood"
    }
    confirm({
      title: '确认操作',
      icon: <ExclamationCircleOutlined />,
      content,
      onOk: () => {
        this[fun](params);
      },
      onCancel() {
      },
    })
  }

  deleteGood = async params => {
    const { success, msg } = await deleteGood(params);
    if (success) {
      message.success(`删除成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  handleGood = async params => {
    const { success, msg } = await handleGood(params);
    if (success) {
      message.success(`${params.isSale === '1' ? '上架' : '下架'}成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  handleEdit = (flag, editData) => {
    this.setState({
      editData
    }, () => {
      this.ProduceEditModalRef.current.handleOk()
    })
  }

  formatParams = (paramsData) => {
    const params = paramsData;
    const type = getStateByParams('type');
    if (type) {
      params.type = type;
    }
    params.currentPage = params.current;
    delete params.current;
    return params
  }

  reload = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload()
    }
  }

  render() {
    const { columns } = this;
    const { editData, total, } = this.state;
    return (
      <PageContainer
        title={<PageBack title="商品管理"></PageBack>}
      >
        <ProTable
          actionRef={this.actionRef}
          search={false}
          rowKey="id"
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1)}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getGoodList(params)
          }}
          postData={(data) => {
            if (data) {
              this.setState({ total: data.total })
              return data.list
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
        <ProduceEditModal ref={this.ProduceEditModalRef} editData={editData} />
      </PageContainer>
    )
  }
}

export default ProductManage
