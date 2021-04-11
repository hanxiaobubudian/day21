import React from "react";
import store from "../store/index";

// 添加监听，当state变化时重新渲染视图
// let unSubscribe = store.subscribe(Store);
function Store(props) {
  console.log("*****", store);
  let state = store.getState();
  return (
    <div>
      <p>{state.count}</p>
      <button
        onClick={() => {
          store.dispatch({ type: "COUNT_PLUS" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch({ type: "COUNT_REDUCE" });
        }}
      >
        -
      </button>
    </div>
  );
}
export default Store;
