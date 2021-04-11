import React from "react";
import { useDispatch, useSelector } from "react-redux";

function App(props) {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "COUNT_PLUS" })}>+</button>
      <button onClick={() => dispatch({ type: "COUNT_REDUCE" })}>-</button>
    </div>
  );
}
export default App;
