import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'reset.css';
import './index.css';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ConfigProvider
} from "antd"

ReactDOM.render( <
  ConfigProvider locale = {
    zhCN
  } >
  <
  App / >
  <
  /ConfigProvider>,
  document.getElementById('root')
);
if (module.hot) {
  module.hot.accept();
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();