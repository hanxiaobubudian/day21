import { createStore } from "redux";

// count操作reduce
function countFn(
  state = {
    count: 1
  },
  action
) {
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

let store = createStore(countFn);
export default store;
