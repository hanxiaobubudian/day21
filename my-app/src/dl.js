import React, { Component } from "react";
import Child from "./child";
import { Provider } from "./context";

class DL extends Component {
  constructor(props) {
    super(props);
    console.log("1.dl----组件初始化");
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    console.log("2.dl------", "将props映射到state中");
    return {
      state: 1
    };
  }
  UNSALF_componentWillMount() {
    console.log("3.dl====组件即将挂载");
  }
  componentDidMount() {
    console.log("5.dl====挂载完毕");
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
          <Child />
        </Provider>
      </React.Fragment>
    );
  }
}

export default DL;
