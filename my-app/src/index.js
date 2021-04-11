import React from "react";
import "./index.scss";
import ReactDOM from "react-dom";
// import App from "./App";
// 方式1
// import Store from './Store'; // store存储state
// import store from '../store/index'; // 使用redux
// 方式2
// import store from '../store/react-redux-store'; // 使用react-redux --提供provider组件
import { Provider } from "react-redux";
// import ReactReduxApp from './react-redux';
// import App from './react-redux/hookIndex';

import App from "./demo";
import store from "./demo/store";

// 方式1；redux-subscribe监听
// const render = () =>
// 	ReactDOM.render(<Store />, document.getElementById('root'));
// render();
// // render 必须是一个函数
// let subscribe = store.subscribe(render);

// // 10秒后取消对state变化的监听
// setTimeout(() => {
// 	subscribe();
// }, 10000);

//  方式2: react-redux; 使用Provider
ReactDOM.render(
  <Provider store={store}>
    {/* <ReactReduxApp /> */}
    <App />
  </Provider>,
  document.getElementById("root")
);
