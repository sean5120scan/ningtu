import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Form, Modal, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { getTags, delTags } from "@/apis/tagApi"
import style from "./index.module.less"
import TagDialog from "@/components/dialogs/tagDialog"
export default function TagMgr() {
    const [list, setList] = useState([])
    const [openFlag, setOpenFlag] = useState(false)
    const [title, setTitle] = useState("新增标签")
    const [form] = Form.useForm()
    let { confirm } = Modal;
    useEffect(() => {
        getSearchRes()
    }, [])

    const getSearchRes = async () => {
        let res = await getTags()
        if (res.code == 0) {
            setList(res.data.records || [])
        }
    }
    const setModalToParent = (flag) => {
        setOpenFlag(flag)
    }

    const edit = (data) => {
        setOpenFlag(true)
        setTitle("编辑标签")
    }
    const del = async (data) => {
        confirm({
            title: '删除确认',
            content: '确认要删除该标签',
            onOk() {
                delTags(data.labelCode).then(({ code }) => {
                    if (code == 0) {
                        message.success({ content: "删除成功！" })
                        getSearchRes()
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'labelCode',
            key: 'labelCode',
            align: "center",
            width: 160,
        },
        {
            title: '标签名称',
            dataIndex: 'labelName',
            key: 'labelName',
            align: "center",
            width: 160,
            render: (text, data) => (
                <span>{data.labelName || "--"}</span>
            )
        },
        {
            title: '添加时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            align: "center",
            width: 160,
            render: (text, data) => {
                return <span>{data.createdTime == null ? "--" : data.createdTime}</span>
            }
        },
        {
            title: '关联图片数',
            dataIndex: 'refImgNum',
            key: 'refImgNum',
            align: "center",
            width: 160,
            render: (text, data) => {
                return <span>{data.refImgNum || "--"}</span>
            }
        },
        {
            title: '操作）',
            dataIndex: 'searchResult',
            key: 'searchResult',
            align: "center",
            render: (text, data) => {
                return (
                    <Space>
                        <Button type="primary" onClick={() => { edit(data) }}>编辑</Button>
                        <Button onClick={() => { del(data) }}>删除</Button>
                    </Space>
                )
            }
        },
    ];
    return (
        <div className={style['tag-page']}>
            <div className={style['btn-wrap']}>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenFlag(true)}>添加标签</Button>
            </div>
            <Table columns={columns}
                dataSource={list}
                pagination={{ position: ["bottomCenter"] }}
                rowKey={columns => columns.id}
                scroll={{ y: 500 }}
            />
            <TagDialog
                vis={openFlag}
                title={title}
                setModalToParent={setModalToParent}
                reload={getSearchRes}
                formRef={form}>
            </TagDialog>
        </div>
    )
}

