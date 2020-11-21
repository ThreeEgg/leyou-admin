import React, { Component, createRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, ExclamationCircleOutlined, } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table';
import { Button, Space, message, Modal, } from 'antd'
import { getCreatorList, handleH5Status, deleteLink, } from '@/services/creator'
import EditModal from './components/EditModal'

const { confirm } = Modal
class Creator extends Component {

  state = {
    editData: {},
  }

  EditModalRef = createRef();
  actionRef = createRef();

  columns = [
    {
      title: '序号',
      valueType: 'index',
      width: 48,
      fixed: 'left'
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'link',
      /* renderText: (value, item) => {
        return <span id={`address-${item.id}`} >{value}</span>
      } */
    },
    {
      title: '状态',
      dataIndex: 'isUsed',
      valueEnum: {
        1: '生效中',
        0: '已失效'
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
          {
            item.isUsed === 1 ? <Button type="link" size="small" onClick={() => this.handleConfirm(3, item.id)}>失效</Button>
              :
              <Button type="link" size="small" onClick={() => this.handleConfirm(2, item.id)}>生效</Button>
          }


          <Button type="link" size="small" onClick={() => this.copyUrl(item.link)}>复制链接</Button>
          <Button type="link" size="small" onClick={() => this.handleEdit(2, item)}>编辑</Button>
          <Button type="link" size="small" danger onClick={() => this.handleConfirm(1, item.id)}>删除</Button>
        </Space>
      ),
    },
  ]



  handleConfirm = (flag, id) => {
    let content = "";
    let fun = "";
    let params = {
      id: id,
    }
    if (flag === 1) {
      content = "确认删除该页面？";
      fun = "deleteLink";
    } else if (flag === 2) {
      content = "确认该页面生效？";
      fun = 'handleH5Status';
      params.isUsed = 1;
    } else if (flag === 3) {
      content = "确认该页面失效？";
      fun = 'handleH5Status';
      params.isUsed = 0;
    }
    confirm({
      title: '确认操作',
      icon: <ExclamationCircleOutlined />,
      content,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this[fun](params);
      },
      onCancel() {
      },
    });
  }

  handleH5Status = async params => {
    const { success, msg } = await handleH5Status(params);
    if (success) {
      message.success('操作成功');
      this.reload();
    } else {
      message.error(msg)
    }
  }

  deleteLink = async params => {
    const { success, msg } = await deleteLink(params);
    if (success) {
      message.success(`删除成功`);
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

  copyUrl = (id) => {
    /* const activeCodeSpan = document.getElementById(id);
    const range = document.createRange();

    range.selectNodeContents(activeCodeSpan);
    window.getSelection().addRange(range);
    const tag = document.execCommand("Copy");
    if (tag) {
      message.success('已复制到剪切板');
    } */

    const input = document.createElement('input') // 新增一个input
    input.style.position = 'relative' // 将它隐藏（注意不能使用display或者visibility，否则粘贴不上）
    input.style.zIndex = '-9'
    document.body.appendChild(input) // 追加
    input.value = id // 设置文本框的内容
    input.select() // 选中文本
    const tag = document.execCommand('copy');
    if (tag) {
      message.success('已复制到剪切板');
    }
  }

  formatParams = (paramsData) => {
    return paramsData
  }

  reload = () => {
    if (this.actionRef.current) {
      this.actionRef.current.reload()
    }
  }

  render() {
    const { columns } = this;
    const { editData } = this.state;
    return (
      <PageContainer>
        <ProTable
          actionRef={this.actionRef}
          search={false}
          columns={columns}
          rowKey="id"
          toolBarRender={() => [
            <Button type="primary" size="small" key={1} onClick={() => this.handleEdit(1, {})}>
              <PlusOutlined /> 新增
            </Button>,
          ]}
          request={(paramsData, sorter) => {
            const params = this.formatParams(paramsData, sorter)

            return getCreatorList(params)
          }}
          postData={(data) => {
            if (data) {
              return data
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
        <EditModal ref={this.EditModalRef} editData={editData} reload={this.reload} />
      </PageContainer>
    )
  }
}

export default Creator
