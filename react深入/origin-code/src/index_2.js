// import ReactDOM from "../my_api/react-dom-v3";
// import ReactDOM from "react-dom";
import {render} from '../my_api_2'

const jsx = 
    <div class="box">
        <h1>钱钱钱</h1>
        <a title="lalal" href="https://www.baidu.com/">
            qqqq
        </a>
        <p>这一</p>
    </div>
render(
    jsx
    ,document.getElementById("root")
);
