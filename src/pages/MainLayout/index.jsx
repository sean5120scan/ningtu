import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom"
import { Menu, Breadcrumb, Dropdown, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import style from "./index.module.less"
import { useSelector } from 'react-redux';
import Routes from "@/router/routes"
import { ls } from "@/utils/utils"

export default function MainLayout(props) {
    const username = ls.get("userInfo")['username']
    let [curPathName, setCurPathName] = useState("")

    let history = useHistory()
    let { pathname } = useLocation()
    useEffect(() => {
        let getPathName = (path) => {
            let name = path.slice(1) || "adminMgr"
            let title = Routes.filter(item => item.name === name)[0]['title']
            setCurPathName(title)
        }
        getPathName(pathname)
    }, [pathname])

    const loginOut = () => {
        localStorage.clear()
        history.replace("/login")
    }
    const DropMenu = (
        <Menu>
            <Menu.Item >
                <Link to="/">个人中心</Link>
            </Menu.Item>
            <Menu.Item >
                <span onClick={loginOut}> 退出</span>
            </Menu.Item>
        </Menu>
    )
    return (
        <div className={style['main-wrap']}>
            <header className={style.header}>
                <Row>
                    <Col span={20}>
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4} className={style['head-rt']} >
                        <Dropdown overlay={DropMenu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <UserOutlined /><span className="inBlock ml6">{username}</span>
                            </a>
                        </Dropdown>
                    </Col>
                </Row>
            </header>
            <main className={style['main-container']}>
                <section className={style['side-bar']}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {
                            Routes.map(item =>
                                <Menu.Item key={item.name}>
                                    <Link to={item.path}>
                                        <i className={`iconfont ${item.icon} sidebar-icon`}></i>
                                        <span>{item.title}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        }
                    </Menu>
                </section >
                <section className={style['main-content-wrap']}>
                    <div className={style['breadcrumb-wrap']}>
                        <Breadcrumb >
                            <Breadcrumb.Item><Link to="/adminMgr">首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={pathname}>{curPathName}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className={style['main-content']}>
                        {props.children}
                    </div>
                </section>
            </main >
        </ div >
    )
}

