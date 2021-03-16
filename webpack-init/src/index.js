import _ from "lodash";
// import "./style.css";
// import Icon from "./icon.jpeg";
// import Data from "./data.xml";
// import Notes from "./data.csv";
import printMe from "./print";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "click me and check the console";
  btn.onclick = printMe;

  // element.classList.add("hello");

  // // 将图片添加到div中
  // const myIcon = new Image();
  // myIcon.src = Icon;

  element.appendChild(btn);

  // console.log("Data====", Data);
  // console.log("Notes====", Notes);

  return element;
}

document.body.appendChild(component());
