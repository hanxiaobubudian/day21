import { createStore } from "redux";

function reducer(
  state = {
    count: 1 // 次数为1
  },
  action
) {
  // action.type代表修改指令，该指令可以自定义
  switch (action.type) {
    case "COUNT_PLUS":
      console.log("add");
      // 根据action指令，修改state并返回
      return {
        count: state.count + 1
      };
    case "COUNT_REDUCE":
      console.log("---");
      return {
        count: state.count - 1
      };
  }
  return state;
}

// function render() {
// 	let state = store.getState();
// 	ReactDOM.render(
// 		<div>
// 			<p>{state.count}</p>
// 			<button
// 				onClick={() => {
// 					store.dispatch({ type: 'COUNT_PLUS' });
// 				}}
// 			>
// 				+
// 			</button>
// 			<button
// 				onClick={() => {
// 					store.dispatch({ type: 'COUNT_REDUCE' });
// 				}}
// 			>
// 				-
// 			</button>
// 		</div>,
// 		document.getElementById('root')
// 	);
// }

// 创建redux store 用来存放应用状态
// api是 {subscribe,dispatch, getState}
let store = createStore(reducer);

// // 可手动订阅，也可绑定到视图层
// store.subscribe(() => {
// 	console.log("来自store的state===", store.getState());
// });

export default store;
