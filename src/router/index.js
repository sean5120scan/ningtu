import React from 'react'
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import Login from "@/pages/Login/index.jsx"
import Routes from "./routes"
import MainLayout from "@/pages/MainLayout/index.jsx"
import NoMatch from "@/pages/NoMatch/index.jsx"
import Register from "@/pages/Register/index.jsx"

export default function MainRoutes() {
    return (
        <Router >
            <Switch >
                <Route path="/login" component={Login} />
                <Route path="/" render={() =>
                    localStorage.getItem("token") ?
                        <MainLayout >
                            <Switch >
                                {
                                    Routes.map((item, index) => {
                                        return (<Route key={item.name} path={item.path} component={item.component} />)
                                    })
                                }
                                <Redirect to="/adminMgr"></Redirect>
                                < Route component={NoMatch} > </Route>
                            </Switch >
                        </MainLayout> : <Redirect to="/login" />
                } />
                <Route path="/register" component={Register} />
            </Switch>
        </Router >
    )
}