import React, { Component } from "react";

class DL extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <dl className="friend-group expanded">
        <dt>列表标题</dt>
        <dt>列表内容</dt>
        <dt>列表内容</dt>
      </dl>
    );
  }
}

export default DL;
