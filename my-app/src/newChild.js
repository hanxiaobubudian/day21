import React, { Component } from "react";
import { Consumer } from "./context";

export default class newChild extends Component {
  render() {
    return (
      <Consumer>
        {val => {
          return <div>{val.info}</div>;
        }}
      </Consumer>
    );
  }
}
