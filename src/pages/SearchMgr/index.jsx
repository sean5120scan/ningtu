import React, { useState, useEffect } from 'react'
import { Table, Space } from "antd"
import { getRecordsList } from "@/apis/searchApi"

export default function SearchMgr() {
    const [list, setList] = useState([])

    useEffect(() => {
        getSearchRes()
    }, [])

    const getSearchRes = async () => {
        let res = await getRecordsList()
        if (res.code == 0) {
            setList(res.data.records || [])
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: 160,
        },
        {
            title: '搜索词',
            dataIndex: 'searchKeyword',
            key: 'searchKeyword',
            align: "center",
            width: 160,
            render: (text, data) => (
                <span>{data.searchKeyword || "--"}</span>
            )
        },
        {
            title: '搜索位置',
            dataIndex: 'searchLocation',
            key: 'searchLocation',
            align: "center",
            width: 160,
            render: (text, data) => {
                return <span>{data.searchLocation == null ? "--" : data.searchLocation}</span>
            }
        },
        {
            title: '搜索时间',
            dataIndex: 'searchTime',
            key: 'searchTime',
            align: "center",
            width: 160,
            render: (text, data) => {
                return <span>{data.searchTime || "--"}</span>
            }
        },
        {
            title: '搜索结果（当时）',
            dataIndex: 'searchResult',
            key: 'searchResult',
            align: "center",
            render: (text, data) => {
                return <span>{data.searchResult || 0}</span>
            }
        },

    ];
    return (

        <Table columns={columns}
            dataSource={list}
            pagination={{ position: ["bottomCenter"] }}
            rowKey={columns => columns.id}
            scroll={{ y: 500 }} />

    )
}

