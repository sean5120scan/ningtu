import React from 'react'
import { Link, Route, useParams } from "react-router-dom"
import ProdDetail from "@/pages/ProdDetail"

export default function ProdList() {
    const math = useParams()
    console.log("math:", math)
    return (
        <div>
            当前的id是:
        </div>

    )
}

