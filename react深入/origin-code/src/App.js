import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

// function App() {
//   return (
//     <div class="App">
//       <header class="App-header">
//         <img src={logo} class="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           class="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         return (
//             <div class="App">
//                 <header class="App-header">
//                     <img src={logo} class="App-logo" alt="logo" />
//                     <p>
//                         Edit <code>src/App.js</code> and save to reload.
//                     </p>
//                     <a
//                         class="App-link"
//                         href="https://reactjs.org"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         Learn React
//                     </a>
//                 </header>
//             </div>

//             // <div class="App">
//             //     <h1>钱钱钱</h1>
//             //     <a title="lalal" href="https://www.baidu.com/">
//             //         qqqq
//             //     </a>
// 			//      <header class="App-header">
//             //          {/* <img src={logo} class="App-logo" alt="logo" /> */}
//             //          <p>
//             //              Edit <code>src/App.js</code> and save to reload.
//             //         </p>
//             //         <a
//             //              class="App-link"
//             //             href="https://reactjs.org"
//             //            target="_blank"
//             //             rel="noopener noreferrer"
//             //         >
//             //           Learn React
//             //         </a>
//             //     </header>
//             // </div>
//         );
//     }
// }

// hooks
function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>click{count}次</p>
      {/* <button onClick={() => setCount(count + 1)}>click</button> */}
    </div>
  );
}

function add(a, b) {
  return a + b;
}

export default App;
