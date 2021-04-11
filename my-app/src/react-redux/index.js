import React from "react";
import { connect } from "react-redux";

// 添加监听，当state变化时重新渲染视图
// let unSubscribe = store.subscribe(Store);
function ReactReduxApp(props) {
  let { count, dispatch } = props;

  console.log("*****", props);
  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch({ type: "COUNT_PLUS" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch({ type: "COUNT_REDUCE" });
        }}
      >
        -
      </button>
    </div>
  );
}

export default connect(state => state)(ReactReduxApp);
