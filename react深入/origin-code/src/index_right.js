import ReactDOM from 'react-dom';
import React from 'react';

class App extends React.Component {
	state = {
		list: new Array(10).fill(0),
	};
	add = () => {
		this.setState({
			list: [...this.state.list, 1],
		});
	};

	render() {
		return (
			<ul>
				<input type="text" />
				<button onClick={this.add}>+</button>
				{this.state.list.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		);
	}
}
// 同步写法
ReactDOM.render(<App />, document.getElementById('root'));
// 异步写法, 现在官方版本默认还是同步
// ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App />);
