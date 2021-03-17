import _ from "lodash";
// import "./style.css";
// // import Icon from "./icon.jpeg";
// // import Data from "./data.xml";
// // import Notes from "./data.csv";
import printMe from "./print";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "click me and check the console";
  btn.onclick = printMe.bind(null, "nihao");

  element.classList.add("hello");

  // // 将图片添加到div中
  // const myIcon = new Image();
  // myIcon.src = Icon;

  element.appendChild(btn);

  // console.log("Data====", Data);
  // console.log("Notes====", Notes);

  return element;
}

document.body.appendChild(component());

// async function getComponent() {
//     const element = document.createElement("div");
//     const { default: _ } = await import("lodash");
//     // return import("lodash")
//     //     .then(({ default: _ }) => {
//     //         const element = document.createElement("div");
//     //         element.innerHTML = _.join(["hello", "webpack"], " ");

//     //         return element;
//     //     })
//     //     .catch((error) => {
//     //         "an error occurred while loading the component";
//     //     });

//     element.innerHTML = _.join(["你好"], " ");
//     return element;
// }

// getComponent().then((component) => {
//     document.body.appendChild(component);
// });

// import _ from 'lodash';
// import numRef from './ref.json';

// export function numToWord(num) {
//   return _.reduce(
//     numRef,
//     (accum, ref) => {
//       return ref.num === num ? ref.word : accum;
//     },
//     ''
//   );
// }

// export function wordToNum(word) {
//   return _.reduce(
//     numRef,
//     (accum, ref) => {
//       return ref.word === word && word.toLowerCase() ? ref.num : accum;
//     },
//     -1
//   );
// }
console.log("index");
// 这个 libra
