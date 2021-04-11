import React from "react";
import data from "../data/data";

const pageLen = 3; // 每页多少条
export default function List(props) {
  // 这里接收父级传递的props， props中必须包含activePage
  // activePage代表当前实现第几页
  let { activePage } = props;
  let start = (activePage - 1) * pageLen; // 当前页从第几条开始，注意页码从1开始计数，但是js从0开始计数，所以-1
  let end = activePage * pageLen; //  当前页到第几条结束
  let nowData = data.filter((item, index) => index >= start && index < end);

  return (
    <ul>
      {nowData.map(item => {
        return (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.describe}</p>
          </li>
        );
      })}
    </ul>
  );
}
