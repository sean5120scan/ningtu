import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Space, message } from "antd"
import PropTypes from "prop-types"
import style from "./index.module.less"
import { addTags, modifyTags, delTags } from "@/apis/tagApi"



const TagDialog = (props) => {
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
        let { labelName } = values
        try {
            let res = await addTags({ labelName })
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
                    label="标签名称"
                    name="labelName"
                    rules={[{ required: true, message: '请输入标签名称' }]}
                >
                    <Input
                        allowClear
                        size="large"
                        placeholder="请输入账号" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 4, span: 20 }}
                >
                    <Space>
                        <Button onClick={closeModal}>取消</Button>
                        <Button type="primary" htmlType="submit">确认</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal >
    )
}
TagDialog.propTypes = {
    title: PropTypes.string,
    vis: PropTypes.bool,
    setModalToParent: PropTypes.func
}
export default TagDialog