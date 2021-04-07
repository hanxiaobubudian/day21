import React, { Component, createRef } from "react";
import Child from "./child";
import { Provider } from "./context";

class DL extends Component {
  parent = createRef();
  child = createRef();
  constructor(props) {
    super(props);
    console.log("1.dl----组件初始化");
    this.state = {};
    this.parent = createRef();
    this.child = createRef();
  }
  static getDerivedStateFromProps(props, state) {
    console.log("2.dl------", "将props映射到state中");
    return {
      state: 1
    };
  }
  // UNSALF_componentWillMount() {
  // 	console.log("3.dl====组件即将挂载");
  // }
  componentDidMount() {
    console.log("5.dl====挂载完毕");
    // console.log("真实的dom节点===", this.refs.parent);
    // console.log("222===", this.refs.child);
    console.log(this.parent);
    console.log(this.child);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("dl=========shouldComponentUpdate");
    return true;
  }
  render() {
    console.log("4.dl====render");
    let { dlData, name, openName, changeOpen, index } = this.props;
    let { isOpen } = this.state;

    return (
      <React.Fragment>
        <dl className={"friend-group " + (openName === name ? "expanded" : "")}>
          <dt
            onClick={() => {
              changeOpen(openName === name ? "" : name);
            }}
          >
            {dlData.title}
          </dt>
          {dlData.list &&
            dlData.list.map((item, index) => {
              return <dd key={index}>{item.name}</dd>;
            })}
        </dl>
        {/* {index === 2 && (
          <Provider value={{ data: "11111" }}>
            <Child />
          </Provider>
        )} */}
        <Provider value={{ data: "11111" }}>
          <div>
            <p ref={this.parent}>father</p>
            <Child ref={this.child} />
          </div>
        </Provider>
      </React.Fragment>
    );
  }
}

export default DL;
