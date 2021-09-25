import React, { useState } from 'react'
import { useDispatch, } from "react-redux"
import { useHistory } from "react-router-dom"
import { Form, Input, Button } from 'antd';
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, UnlockFilled } from '@ant-design/icons'
import style from "./login.module.css"
import { login, getUserInfo } from "@/apis/userApi"
import { saveUserInfo } from "@/actions"
import { saveToken, ls } from "@/utils/utils"

export default function Login(props) {
    const dispatch = useDispatch()
    let history = useHistory()
    let [loading, setLoading] = useState(false)
    const onFinish = async (values) => {
        let { password, username } = values
        setLoading(loading = true)
        try {
            let loginRes = await login({ username, password })
            if (loginRes.code === 0) {
                setLoading(loading = false)
                saveToken(loginRes.data)
                let userRes = await getUserInfo()
                dispatch(saveUserInfo(userRes.data))
                ls.set("userInfo", userRes.data)
                history.push("/adminMgr")
            } else {
                setLoading(loading = false)
                return
            }
        } catch (err) {
            throw new Error(err)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={style['login-page']}>
            <div className={style['login-wrap']}>
                <div className={style['login-title']}>设计灵感管理后台</div>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '账号不能为空',
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="请输入账号"
                            prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<UnlockFilled />}
                            size="large"
                            placeholder="请输入密码"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button type="primary" size="large" htmlType="submit" block loading={loading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </div>
    )
}
