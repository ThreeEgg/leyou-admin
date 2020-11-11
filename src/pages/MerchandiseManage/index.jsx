import React, { Component, createRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, Modal, message, } from 'antd'
import { getClassifyList, handleClassify, deleteClassify, } from '@/services/classify'
import { history } from "umi";
import EditModal from "./components/EditModal"

const { confirm } = Modal;
class MerchandiseManage extends Component {

  state = {
    editData: {},
    total: 0,
  }

  EditModalRef = createRef()
  actionRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '分类名称',
      dataIndex: 'typeName',
    },
    {
      title: '商品类型',
      dataIndex: 'isService',
      valueEnum: {
        0: '实物类产品',
        1: '服务类产品'
      }
    },
    {
      title: '包含商品',
      dataIndex: 'goodsCount',
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
      title: '排序权重',
      dataIndex: 'sort',
    },
    {
      title: '操作',
      dataIndex: 'id',
      search: false,
      fixed: 'right',
      width: 80,
      render: (_, item) => (
        <Space>
          {/* <Button type="link" size="small" >排序</Button> */}
          {
            item.isSale === 1 ? <Button type="link" size="small" onClick={() => this.handleConfirm(0, item.id)}>下架</Button>
              :
              <Button type="link" size="small" onClick={() => this.handleConfirm(1, item.id)}>上架</Button>
          }
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" onClick={() => this.gotoClassManage(item.id)}>查看全部</Button>
          <Button type="link" size="small" danger onClick={() => this.handleConfirm(2, item.id)}>删除</Button>
        </Space>
      ),
    },
  ]

  handleConfirm = (flag, idsStr) => {
    let params = {};
    let content = "";
    let fun = "";
    if (flag === 2) {
      params = {
        id: idsStr
      }
      content = "确认删除该分类？";
      fun = "deleteClassify"
    } else {
      params = {
        idsStr,
        isSale: flag ? '1' : '0'
      }
      content = `确认${params.isSale === '1' ? '上架' : '下架'}该分类？`;
      fun = "handleClassify"
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

  deleteClassify = async params => {
    const { success, msg } = await deleteClassify(params);
    if (success) {
      message.success(`删除成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  handleClassify = async params => {
    const { success, msg } = await handleClassify(params);
    if (success) {
      message.success(`${params.isUsed === '1' ? '上架' : '下架'}成功`);
      this.reload();
    } else {
      message.error(msg)
    }
  }

  handleEdit = (flag, editData) => {
    this.setState({
      editData
    }, () => {
      this.EditModalRef.current.handleOk()
    })
  }

  formatParams = (paramsData) => {
    const params = paramsData;
    console.log('params', params);
    params.currentPage = params.current;
    delete params.current;
    return params
  }

  gotoClassManage = (type) => {
    history.push({
      pathname: `/merchandiseManage/productManage`,
      state: {
        type
      }
    })
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
      <PageContainer>
        <ProTable
          actionRef={this.actionRef}
          search={false}
          rowKey="id"
          columns={columns}
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1, {})}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getClassifyList(params)
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
        <EditModal ref={this.EditModalRef} editData={editData} reload={this.reload} />
      </PageContainer>
    )
  }
}

export default MerchandiseManage
