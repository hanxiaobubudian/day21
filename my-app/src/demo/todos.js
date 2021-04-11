import React from "react";
import Li from "./li";
import { useSelector } from "react-redux";

function Todos(props) {
  // const state = [
  //     {id: 0, title: '示例数据', done: true},
  //     {id: 1, title: '示例数据2', done: false},
  //     {id: 2, title: '示例数据3', done: false},
  // ]
  let data = useSelector(state => state);
  return (
    <ul id="todo-list">
      {data.length > 0 && data.map(item => <Li key={item.id} {...item} />)}
    </ul>
  );
}
export default Todos;
