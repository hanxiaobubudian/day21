import React, { Fragment } from "react";
import Title from "./title";
import Create from "./create";
import Todos from "./todos";
import State from "./state";
import { useSelector } from "react-redux";
// import { Route } from 'react-router-dom';

function App(props) {
  let data = useSelector(state => state);
  return (
    <div id="todoapp">
      {/* <Route path="/demo" component={Title} /> */}
      <Title />
      <div className="content">
        <Create />
        {data.length > 0 ? (
          <Fragment>
            <Todos />
            <State />
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default App;
