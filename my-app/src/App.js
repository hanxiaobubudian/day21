import React from "react";
import DL from "./dl";
import data from "./data";
import { Provider } from "./context";
import Child from "./child";
// import NewChild from "./newChild";

// function App() {
//   return (
//     <React.Fragment>
//       <h1>hello world</h1>
//       <div className="friend-list">
// 		{
// 			Object.keys(data).map(item => {
// 				return <DL key={item} dlData={data[item]} />
// 			})
// 		}
//       </div>
//     </React.Fragment>
//   );
// }

// export default App;

// class App extends React.Component {
// 	state = {
// 		openName: "friend",
// 	};
// 	changeOpen = (name) => {
// 		this.setState({
// 			openName: name,
// 		});
// 	};

// 	render() {
// 		let { openName } = this.state;
// 		return (
// 			<div className="friend-list">
// 				{Object.keys(data).map((item) => {
// 					return (
// 						<DL
// 							key={item}
// 							dlData={data[item]}
// 							name={item}
// 							openName={openName}
// 							changeOpen={this.changeOpen}
// 						/>
// 					);
// 				})}
// 			</div>
// 		);
// 	}
// }
// export default App;

class App extends React.Component {
  state = {
    openName: "friend"
  };
  changeOpen = name => {
    this.setState({
      openName: name
    });
  };
  render() {
    let { openName } = this.state;
    return (
      <Provider
        value={{
          info: "需要传递的数据"
        }}
      >
        <div className="friend-list">
          {Object.keys(data).map((item, index) => {
            return (
              <React.Fragment key={index}>
                <DL
                  key={index}
                  dlData={data[item]}
                  name={item}
                  openName={openName}
                  changeOpen={this.changeOpen}
                  index={index}
                />
              </React.Fragment>
            );
          })}
          {/* <NewChild /> */}
        </div>
      </Provider>
    );
  }
}
export default App;
