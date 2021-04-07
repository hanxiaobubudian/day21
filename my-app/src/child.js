import React, { Component } from "react";
import { Consumer } from "./context";

export default class Child extends Component {
  constructor(props) {
    super(props);
    console.log("1.child----组件初始化");
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    console.log("2.child------", "将props映射到state中");
    return { state: 1 };
  }
  UNSALF_componentWillMount() {
    console.log("3.child====组件即将挂载");
  }
  componentDidMount() {
    console.log("5.child====挂载完毕");
  }

  render() {
    console.log("4.child====render");
    return (
      <Consumer>
        {val => {
          return (
            <React.Fragment>
              <p>{val.data}</p>
              <p>这是子组件内容</p>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
