import AdminMgr from "@/pages/AdminMgr"
import SearchMgr from "@/pages/SearchMgr"
import PicMgr from "@/pages/PicMgr"
import TagMgr from "@/pages/TagMgr"
import ProdList from "@/pages/ProdList"
import ProdDetail from "@/pages/ProdDetail"


const routes = [{
        name: "adminMgr",
        path: "/adminMgr",
        title: "管理员列表",
        icon: "icon-guanliyuan",
        component: AdminMgr,
        exact: false
    },
    {
        name: "tagMgr",
        path: "/tagMgr",
        title: "标签管理",
        icon: "icon-biaoqian",
        component: TagMgr,
        exact: false

    },
    {
        name: "picMgr",
        path: "/picMgr",
        title: "图片管理",
        icon: "icon-tupian",
        component: PicMgr,
        exact: false

    },
    {
        name: "searchMgr",
        path: "/searchMgr",
        title: "搜索日志",
        icon: "icon-sousuo",
        component: SearchMgr,
        exact: false

    },
    // {
    //     name: "prodList",
    //     path: "/prodList",
    //     title: "商品列表",
    //     icon: "icon-sousuo",
    //     component: ProdList,
    //     exact: false
    // },

    // {
    //     name: "prodDetail",
    //     path: "/prodDetail/:id",
    //     title: "商品详情",
    //     icon: "icon-sousuo",
    //     component: ProdDetail,
    //     exact: true
    // },


]

export default routes