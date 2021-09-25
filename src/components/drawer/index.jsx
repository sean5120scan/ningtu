import React, { Component } from "react"
import { Drawer, Form, Select, Input, Radio, Image,Button ,Space} from "antd"
import { modifyImg, getImgTags, getImageInfo } from '@/apis/picApi'
import { getCatalogDownList } from '@/apis/catalogApi'

const { Option } = Select;
const { TextArea } = Input;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
class PicDraw extends Component {
    constructor(props) {
        super()
        this.state = {
            drawFlag: false,
            radioVal: 1,
            ruleDrawerForm:{},
            curlabelName:[],
            tagList:[]
        }
        console.log("props:", props)
        this.onFinish = this.onFinish.bind(this)
        this.validateMessages = this.validateMessages.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onOpen = this.onOpen.bind(this)
    }
    onFinish() { }
    validateMessages() { }
    onClose() {
        this.setState({
            drawFlag: false
        })
    }
    onOpen() {
        this.setState({
            drawFlag: true
        })
    }
    componentDidMount(){
        console.log("this.props.imageId:",this.props)
        debugger
        Promise.all([this.getImageInfo(this.props.imageId), this.getCatalogDownList()])
    }
    // 获取图片详情
    async getImageInfo(id) {
        try {
          const res = await getImageInfo(id)
          const resData = res.data || []
          this.setState({
            completeCatalogCode:resData.completeCatalogCode,
            labelCodes: resData.completeLabelCode && resData.completeLabelCode.split(','),
            createdTime: resData.createdTime,
            imageCurrentStatus: resData.imageCurrentStatus,
            imageName:resData.imageName,
            imageOrigin:resData.imageOrigin,
            imageRemark:resData.imageRemark,
            imageUrl:resData.imageUrl,
          })  
          const labelName = this.state.curlabelName.join(',')
          const res2 = await getImgTags({ labelName: labelName })
          this.setState({
            tagList: res2.data
          })
        } catch (err) {
          throw new Error(err)
        }
    }
       // 获取目录下拉列表
    async getCatalogDownList() {
        try {
          const res = await getCatalogDownList()
          if (res.code === 0) {
            this.catelogDropDownList = res.data
          }
        } catch (err) {
          throw new Error(err)
        }
    }
    render() {
        return (
            <Drawer
                destroyOnClose
                closable={true}
                width="420"
                title="审核"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.drawFlag}
            >
                <Form
                    {...layout}
                    onFinish={this.onFinish}
                    validateMessages={this.validateMessages}
                >
                    <Form.Item
                        label="图片"
                    >
                        <Image src=""></Image>
                    </Form.Item>
                    <Form.Item
                        label="图片名称"
                        name="imageName"
                    >
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item
                        label="图片分类"
                        name="catalogName"
                    >
                        <Select initialValues="lucy" style={{ width: 120 }} >
                            <Option value="lucy">Lucy</Option>
                            <Option value="user">Lucy</Option>
                            <Option value="admin">Lucy</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="标签"
                        name="tag"
                    >
                        <Select
                            initialValues="lucy"
                            style={{ width: 120 }}
                            showSearch
                        >
                            <Option value="lucy">Lucy</Option>
                            <Option value="user">Lucy</Option>
                            <Option value="admin">Lucy</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="介绍"
                        name="desc"
                    >
                        <TextArea row={6}></TextArea >
                    </Form.Item>
                    <Form.Item
                        label="上传时间"
                        name="time"
                    >
                        2021-12-12
                    </Form.Item>
                    <Form.Item
                        label="来源"
                        name="source"
                    >
                        <Input type="text"></Input>
                    </Form.Item>
                    <Form.Item
                        label="状态"
                        name="status"
                    >
                        <Radio.Group>
                            <Radio value={1}>A</Radio>
                            <Radio value={2}>B</Radio>
                            <Radio value={3}>C</Radio>
                            <Radio value={4}>D</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                     wrapperCol={ {"offset": 6, "span": 18 }}
                    >
                        <Space size="large">
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                            <Button >
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer >
        )
    }

}
export default PicDraw