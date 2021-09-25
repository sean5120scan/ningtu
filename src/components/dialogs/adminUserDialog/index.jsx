import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Space, message } from "antd"
import PropTypes from "prop-types"
import style from "./index.module.less"
import { addUser } from "@/apis/userApi"
import { useForm } from 'antd/lib/form/Form'
const { TextArea } = Input


const AdminUserDialog = (props) => {
    const [isModalVisible, setModal] = useState(false)
    let { setModalToParent, vis, reload, formRef } = props

    useEffect(() => {
        setModal(vis)
    }, [vis])

    const closeModal = () => {
        console.log("close")
        setModal(false)
        setModalToParent(false)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onFinish = async (values) => {
        console.log("values:", values)
        let { username, password, remark } = values
        try {
            let res = await addUser({ username, password, remark })
            if (res.code == 0) {
                message.success({
                    content: "添加成功",
                    style: {
                        marginTop: '20vh',
                    },
                    duration: 2
                })
                //重置表单
                formRef.resetFields()
                //关闭弹窗
                closeModal()
                //更新列表  
                reload()
            }
        } catch (err) {
            throw new Error(err)
        }
    }


    return (
        <Modal
            title={props.title}
            footer={null}
            onCancel={closeModal}
            visible={isModalVisible}
        >
            <Form
                name="form"
                form={formRef}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                onFinishFailed={onFinishFailed}
                onFinish={onFinish}
            >
                <Form.Item
                    label="账户"
                    name="username"
                    rules={[{ required: true, message: '请输入账号' }]}
                >
                    <Input
                        allowClear
                        size="large"
                        placeholder="请输入账号" />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password
                        size="large"
                        allowClear
                        placeholder="请输入密码" />
                </Form.Item>
                <Form.Item
                    label="备注"
                    name="remark"
                >
                    <TextArea
                        placeholder="请输入备注信息" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 4, span: 20 }}
                >
                    <div className={style['btn-wrap']}>
                        <Space>
                            <Button onClick={closeModal}>取消</Button>
                            <Button type="primary" htmlType="submit">确认</Button>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
        </Modal >
    )
}
AdminUserDialog.propTypes = {
    title: PropTypes.string,
    vis: PropTypes.bool,
    setModalToParent: PropTypes.func
}
export default AdminUserDialog