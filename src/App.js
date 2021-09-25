import React from 'react';
import './App.css';
import MainRoutes from "./router/index"
import { Provider } from "react-redux"
import store from "@/store"
import 'antd/dist/antd.css';
import "./common/css/index.css"
function App() {
  return (
    <Provider store={store}>
      <div className="App" >
        <MainRoutes />
      </div >
    </Provider>
  );
}

export default App;