import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, message, Modal, } from 'antd'
import { getList } from '@/services/common'
import EditModal from './components/EditModal'

const { confirm } = Modal
class Creator extends Component {

  state = {
    editData: {},
  }

  EditModalRef = createRef()

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '名称',
      dataIndex: '1',
    },
    {
      title: '地址',
      dataIndex: '2',
      renderText: (value, item) => {
        return <span id={`address-${item.id}`} >{value}</span>
      }
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
          <Button type="link" size="small" onClick={() => this.handleConfirm(3)}>失效</Button>
          <Button type="link" size="small" onClick={() => this.handleConfirm(2)}>生效</Button>
          <Button type="link" size="small" onClick={() => this.copyUrl(`address-${item.id}`)}>复制链接</Button>
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" danger onClick={() => this.handleConfirm(1)}>删除</Button>
        </Space>
      ),
    },
  ]

  handleConfirm = (flag, id) => {
    let content = "";
    if (flag === 1) {
      content = "确认删除该页面？"
    } else if (flag === 2) {
      content = "确认该页面生效？"
    } else if (flag === 3) {
      content = "确认该页面失效？"
    }
    confirm({
      title: '确认操作',
      icon: <ExclamationCircleOutlined />,
      content,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {

      },
      onCancel() {
      },
    });
  }

  handleEdit = (flag, editData) => {
    this.setState({
      editData
    }, () => {
      this.EditModalRef.current.handleOk()
    })
  }

  copyUrl = (id) => {
    const activeCOdeSpan = document.getElementById(id);
    const range = document.createRange();

    range.selectNodeContents(activeCOdeSpan);
    window.getSelection().addRange(range);
    const tag = document.execCommand("Copy");
    if (tag) {
      message.success('已复制到剪切板');
    }
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

export default Creator
