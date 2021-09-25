import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Form, Modal, message } from 'antd';
import style from "./index.module.less"
import { getAdminList, delUser } from "@/apis/userApi"
import AdminUserDialog from '@/components/dialogs/adminUserDialog';

const AdminMgr = () => {
    const [query, setQuery] = useState({ pageNo: 1, pageSize: 20 })
    const [openFlag, setOpenFlag] = useState(false)
    // const [isModalVisible, setModal] = useState(false)
    const [title, setTitle] = useState("添加管理员")
    const [form] = Form.useForm()
    const { confirm } = Modal;
    //添加管理员
    const addUser = () => {
        setOpenFlag(true)
    }
    const setModalToParent = (data) => {
        console.log("父组件中的data：", data)
        setOpenFlag(data)
    }

    const edit = () => {
        setTitle("编辑管理员")
        setOpenFlag(true)
    }
    const del = async (data) => {
        console.log("record---data:", data)
        confirm({
            title: '确认删除该用户?',
            content: '管理员删除提醒',
            onOk: async () => {
                try {
                    let res = await delUser(data.userCode)
                    if (res.code == 0) {
                        message.success({
                            content: "删除成功"
                        })
                        getList()
                    }
                } catch (err) {
                    throw new Error(err)
                }
            },
            onCancel() {

            },
        });

    }
    let [list, setList] = useState([])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: 160
        },
        {
            title: '账户',
            dataIndex: 'username',
            key: 'username',
            align: "center",
            width: 160
        },
        {
            title: '添加时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            align: "center",
            width: 160
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            align: "center",
            width: 160
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            align: "center",
            render: (text, record) => (
                <Space>
                    <span className={style['oper-btn']} onClick={() => edit(record)}>编辑</span>
                    <span className={style['oper-btn']} onClick={() => del(record)}>删除</span>
                </Space>
            )
        },
    ];
    const getList = async () => {
        try {
            let res = await getAdminList(query)
            setList(res.data.records)
        } catch (err) {
            throw new Error(err)
        }
    }
    useEffect(() => {
        getList()

    }, [])
    return (
        <div className={style['admin-page']}>
            <div className={style.header}>
                <Button type="primary" onClick={addUser}>添加管理员</Button>
            </div>
            <div className={style['table-wrap']}>
                <Table columns={columns}
                    dataSource={list}
                    pagination={{ position: ["bottomCenter"] }}
                    rowKey={columns => columns.id}
                    scroll={{ y: 500 }} />
            </div>
            <AdminUserDialog
                vis={openFlag}
                title={title}
                setModalToParent={setModalToParent}
                reload={getList}
                formRef={form}
            />
        </div >
    )
}
export default AdminMgr
