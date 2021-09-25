import React from 'react'
import { Link, Route, } from "react-router-dom"
import ProdDetail from "@/pages/ProdDetail"

export default function ProdList() {

    return (
        <div>
            <div>
                <Link to="/prodDetail/1">第一个</Link>
                <Link to="/prodDetail/2">第一个</Link>
                <Link to="/prodDetail/3">第一个</Link>
            </div>
            <div>
                <Route path="/prodDetail" component={ProdDetail}></Route>
            </div>
        </div >
    )
}


