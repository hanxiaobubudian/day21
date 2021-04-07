import React from "react";
import DL from "./dl";
import data from "./data";
import { Provider } from "./context";
import Child from "./child";
import Popup from "./popup";
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
    openName: "friend",
    val: "",
    checked: false
  };
  changeOpen = name => {
    this.setState({
      openName: name
    });
  };
  // render() {
  // 	let { openName } = this.state;
  // 	return (
  // 		<Provider
  // 			value={{
  // 				info: "需要传递的数据",
  // 			}}
  // 		>
  // 			<div className="friend-list">
  // 				{Object.keys(data).map((item, index) => {
  // 					return (
  // 						<React.Fragment key={index}>
  // 							<DL
  // 								key={index}
  // 								dlData={data[item]}
  // 								name={item}
  // 								openName={openName}
  // 								changeOpen={this.changeOpen}
  // 								index={index}
  // 							/>
  // 						</React.Fragment>
  // 					);
  // 				})}
  // 				{/* <NewChild /> */}
  // 			</div>
  // 		</Provider>
  // 	);
  // }
  render() {
    let { openName, val, checked } = this.state;
    return (
      <div>
        {/* <input
					value={val}
					onChange={(e) => {
						this.setState({
							val: e.target.value,
						});
					}}
				/>

				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => {
						this.setState({ checked: e.target.checked });
					}}
				/> */}

        <Popup title="title">
          <p>弹框内容</p>
        </Popup>
      </div>
    );
  }
}
export default App;
