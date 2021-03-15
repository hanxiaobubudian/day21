import ReactDOM from "../my_api/react-dom-v3";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from './reportWebVitals';

const jsx = 
    <div class="box">
        <h1>钱钱钱</h1>
        <a title="lalal" href="https://www.baidu.com/">
            qqqq
        </a>
        <p>这一</p>
        {/* <FuncComponet name="llll" /> */}
    </div>
// console.log('myReactDOM', ReactDOM);
ReactDOM.render(
    // <React.StrictMode>
    // <App />
    // </React.StrictMode>,
    jsx
    // <FuncComponet name="llll" />
    ,document.getElementById("root")
);

function FuncComponet(props) {
    return (
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>{props.name}</li>
        </ul>

        // <div class="app">
        //     {/* <header class="App-header">
        //         <img src={logo} class="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //             class="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             Learn React
        //         </a>
        //     </header> */}
        // </div>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);

// 原生标签
// 文本节点
// 函数组件
// 类组件
