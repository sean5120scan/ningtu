import React, { useEffect, useState, useRef } from 'react'
import { Checkbox, Image, Pagination, Upload, Button, Tabs,Space, Input, Tree, Menu, Dropdown, message, Modal, Form } from "antd"
import { ExclamationCircleOutlined, UploadOutlined, } from '@ant-design/icons';
import style from "./index.module.less"
import {
    getImageList,
    delImages,
    moveImages,
    reBackImages
} from '@/apis/picApi'
import PicDrawer from "@/components/drawer"
import { getAllCatalog, delCatalog, addCatalog, editCatalog, moveCatalog } from '@/apis/catalogApi'
import { ls } from "@/utils/utils"
import axios from "axios"
const { TabPane } = Tabs;
const { confirm } = Modal;
export default function PicMgr() {
    let [imgData, setImgData] = useState({
        imgList: [],
        total: 0,
    })
    const [form] = Form.useForm();
    const [operType, setOperType] = useState("add")
    const [curTreeNode, setCurTreeNode] = useState({})
    const [catalogFlag, setCatalogFlag] = useState(false)
    const [treeData, setTreeData] = useState([])
    const [fileList, setFileList] = useState([])
    let [drawFlag, setDrawFlag] = useState(false)
    let [curImgId, setCurImgId] = useState("")
    const drawRef = useRef()
    let [query, setQuery] = useState({
        catalogCode: '',
        imageCurrentStatus: '1',
        pageNo: 1,
        pageSize: 20,
        searchKeyword: ''
    })
    const tabsArr = [
        {
            label: '待审核',
            name: 'wait',
            imageCurrentStatus: '1'
        },
        {
            label: '审核通过',
            name: 'pass',
            imageCurrentStatus: '2'
        },
        {
            label: '审核不通过',
            name: 'unpass',
            imageCurrentStatus: '3'
        },
        {
            label: '临时下架',
            name: 'tempOut',
            imageCurrentStatus: '4'
        },
        {
            label: '已删除',
            name: 'out',
            imageCurrentStatus: '5'
        }
    ]
    //
    const menus = [
        { id: "01", txt: '新建', type: "add" },
        { id: "02", txt: '编辑', type: "edit" },
        { id: "03", txt: '删除', type: "delete" },
        { id: "04", txt: '上移', type: "moveUp" },
        { id: "05", txt: '下移', type: "moveDown" },
    ]

    const uploadProps = {
        name: 'file',
        maxCount: 20,
        multiple: true,
        fileList,
        beforeUpload(file, fileList) {
            setFileList(fileList)
        },
        customRequest(info) {
            console.log("info:", info)
            let files = info.fileList
            let fm = new FormData()
            for (let i = 0; i < files.length; i++) {
                fm.append('files', files[i])
            }
            const baseUrl = process.env.REACT_APP_BASE_URL
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'token': ls.get("token")
                }
            }
            let url = "/imageOnlineManager/file/batchUpload"
            axios.post(`${baseUrl}${url}`, fm, config).then(res => {
                console.log("res:", res)
            }).catch(err => {
                throw new Error(err)
            })
            // if (info.file.status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            // }
            // if (info.file.status === 'done') {
            //     message.success(`${info.file.name} file uploaded successfully`);
            // } else if (info.file.status === 'error') {
            //     message.error(`${info.file.name} file upload failed.`);
            // }
        },
    };
    useEffect(() => {
        // Promise.all([getImageList(true),])
        console.log("token:", ls.get("token"))
        getImages({ ...query }, true)
        getTreeNodes()
    }, [])

    const toggleCheckbox = (e, item) => {
        item.isChecked = e.target.checked
    }
    //切换tab
    const changeTab = (activeKey) => {
        setQuery({
            ...query,
            imageCurrentStatus: activeKey
        })
        getImages({ ...query, imageCurrentStatus: activeKey }, true)
    }

    //点击左侧树形菜单
    const handerClickTreeNode = (key, info) => {
        console.log("key:", key)
        console.log("data:", info)
        setCurTreeNode(info.selectedNodes[0])
    }
    const closeModel = () => {
        setCatalogFlag(false)
    }
    //递归生成树形菜单,添加children树形
    const deepParseTreeData = (treeData) => {
        let arr = [];
        treeData.forEach(item => {
            let obj = {}
            obj.catalogCode = item.catalogCode;
            obj.catalogName = item.catalogName;
            obj.refImgNum = item.refImgNum;
            obj.title = item.catalogName
            obj.key = item.catalogCode
            if (item.childCatalogs) {
                obj.children = deepParseTreeData(item.childCatalogs)
            }
            arr.push(obj)
        })
        return arr
    }

    //点击树形菜单右侧...操作
    const clickMenu = ({ key }) => {
        console.log("clickMenu--type:", key)
        setOperType(key)
        switch (key) {
            case "add":
                setCatalogFlag(true);
                break;
            case "edit":
                setCatalogFlag(true);
                break;
            case "delete":
                delCatalogFn()
                break;
            case "moveUp":
                moveCatalogFn("up")
                break;
            case "moveDown":
                moveCatalogFn("down")
                break;
            default:
                return false
        }
    }
    const menu = (
        <Menu>
            {
                menus.map((item, i) => {
                    return (
                        <Menu.Item key={item.type} onClick={clickMenu}>
                            <div className={style['menu-item']}>{item.txt}</div>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
    //新增|编辑分类
    const operCatalogFn = async (type, name) => {
        console.log("curTreeNode:", curTreeNode)
        try {
            if (type === 'add') {
                addCatalog({ catalogName: name, parCatalogCode: curTreeNode.catalogCode }).then(({ code }) => {
                    if (code === 0) {
                        message.success("新增分类成功")
                        setCatalogFlag(false)
                        getTreeNodes()
                    }
                })
            } else {
                editCatalog({ catalogName: name, parCatalogCode: curTreeNode.catalogCode }).then(({ code }) => {
                    if (code === 0) {
                        message.success("编辑分类成功")
                        setCatalogFlag(false)
                        getTreeNodes()
                    }
                })
            }

        } catch (err) {
            throw new Error(err)
        }
    }
    //删除分类
    const delCatalogFn = () => {
        confirm({
            title: '确认删除改分类?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                delCatalog(curTreeNode.catalogCode).then(({ code }) => {
                    if (code === 0) {
                        message.success('删除成功')
                        getTreeNodes()
                    }
                })
            },
            onCancel() {
                setCatalogFlag(false)
            },
        });
    }
    //移动目录
    const moveCatalogFn = async (type) => {
        try {
            const res = type === 'up' ? await moveCatalog({
                catalogCode: curTreeNode.catalogCode,
                operationType: -1
            }) : await moveCatalog({
                catalogCode: curTreeNode.catalogCode,
                operationType: 1
            })
            if (res.code === 0) {
                message.success('移动成功')
                getTreeNodes()
            }
        } catch (err) {
            throw new Error(err)
        }
    }
    //获取树形菜单
    const getTreeNodes = async () => {
        try {
            const res = await getAllCatalog()
            let data = res.data || []
            let temp = deepParseTreeData(data)
            setCurTreeNode(temp[0])
            console.log("temp:", temp)
            setTreeData(temp)
        } catch (err) {
            throw new Error(err)
        }
    }

    //获取图片列表
    const getImages = async (data, isLoding = true) => {
        try {
            const res = await getImageList({ ...data, loading: isLoding })
            let { totalCount, records } = res.data
            records = records.map(item => {
                return {
                    ...item,
                    isChecked: false
                }
            })
            setImgData({
                ...imgData,
                imgList: records,
                total: totalCount,
            })
        } catch (err) {
            throw new Error(err)
        }
    }
    //分页
    const changePage = (curPage, pageSize) => {
        console.log('curPage:', curPage)
        setQuery({
            ...query,
            pageNo: curPage
        })
        console.log("query.pageNo:", query.pageNo)
        getImages({
            ...query,
            pageNo: curPage,
            isLoding: false
        })
    }
    //上传图片

    //打开关闭抽屉
    const toggleDrawer = (data) => {
        console.log("ref:", drawRef.current)
        console.log("审核点击的值:", data)
        // debugger
        setCurImgId(data.imageId)
        drawRef.current.onOpen()
    }
    let { imgList } = imgData
    return (
        <div className={style['pic-page']}>
            <section className={style['tree-wrap']}>
                {
                    treeData.length > 0 ? (
                        <Tree
                            blockNode
                            onExpand={(key, data) => {
                                console.log("onExpand--keys;", key)
                                console.log("onExpand--data;", data)
                            }}
                            onSelect={handerClickTreeNode}
                            treeData={treeData}
                            titleRender={(node) => (
                                <div className={style['tree-item-wrap']}>
                                    <div className={style['tree-title']}>{node.catalogName}</div>
                                    <div className={style['tree-more-icon']}>
                                        <Dropdown overlay={menu} trigger={['click']}>
                                            <i className="iconfont icon-gengduo"></i>
                                        </Dropdown>
                                    </div>
                                </div>
                            )}
                        >
                        </Tree>
                    ) : null
                }
            </section>
            <section className={style['content-wrap']}>
                <Tabs defaultActiveKey="1" onChange={changeTab}>
                    {
                        tabsArr.map(item => (
                            <TabPane tab={item.label} key={item.imageCurrentStatus}>
                                <div className={style['oper-btns']}>
                                    <Space size="large">
                                        <Upload {...uploadProps}>
                                            <Button icon={<UploadOutlined />}>上传</Button>
                                        </Upload>
                                        <Button type="" className="mr10">移动</Button>
                                        <Button type="" className="mr10" danger>删除</Button>
                                    </Space>
                                </div>
                                <div className={style['pic-wrap']}>
                                    {
                                        imgList.map(item => (
                                            <div className={style['img-item-wrap']} key={item.imageId}>
                                                <Checkbox
                                                    className={style['checkbox-item']}
                                                    onChange={(e) => toggleCheckbox(e, item)}
                                                >
                                                </Checkbox>
                                                <span
                                                    className={style['check-btn']}
                                                    onClick={()=>toggleDrawer(item)}
                                                >
                                                    审核
                                                </span>
                                                <Image
                                                    className={style['img-item']}
                                                    src={item.imageUrl}
                                                    placeholder={true}
                                                    width={202}
                                                    height={180}>
                                                </Image>
                                            </div>))
                                    }
                                </div>
                            </TabPane>
                        ))
                    }
                </Tabs>
                <div className={style['search-ipt']}>
                    <Input.Search placeholder="请输入查询关键词" />
                </div>
                <div className={style['pager']}>
                    <Pagination
                        current={query.pageNo}
                        showQuickJumper
                        pageSize={query.pageSize}
                        total={imgData.total}
                        showQuickJumper
                        showTotal={total => `共 ${total} 条`}
                        onChange={changePage} />
                </div>
            </section>
            <PicDrawer imageId={curImgId} key={Math.random()*10}  ref={drawRef}></PicDrawer>
            <Modal
                title={operType == 'add' ? "新建分类" : "编辑分类"}
                visible={catalogFlag}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            console.log("values:", values)
                            operCatalogFn("add", values.catalogName)
                            form.resetFields();
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
                onCancel={closeModel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Form.Item
                        label="分类图标"
                        name="icon"
                    >
                        <div></div>
                    </Form.Item>
                    <Form.Item
                        label="分类名称"
                        name="catalogName"
                        rules={[{ required: true, message: '请填写分类名称' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}

