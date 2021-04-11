import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./component/nav";
import { routes } from "./router";

export default function App(props) {
  return (
    <Fragment>
      {/* 导航链接 */}
      <Nav />
      {/* route */}
      <Switch>
        {routes.map(item => {
          return (
            <Route
              key={item.path}
              path={item.path}
              exact={item.exact}
              render={item.render}
            />
          );
        })}
      </Switch>
    </Fragment>
  );
}
