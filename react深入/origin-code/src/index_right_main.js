// 1.定义jsx
let style = {
	color: 'green',
	border: '1px solid red',
	margin: '5px',
};
// let virtualDOM = (
// 	<div key="A" style={style}>
// 		<div key="B1">B1</div>
// 		<div key="B2">B2</div>
// 	</div>
// );
let A = {
	type: 'div',
	key: 'A',
	props: {
		style,
		children: [
			{ type: 'div', key: 'B1', props: { style, children: [] } },
			{ type: 'div', key: 'B2', props: { style, children: [] } },
		],
	},
};

// 开始工作循环
let workInProgress; // 正在处理中的fiber
const TAG_ROOT = 'TAG_ROOT'; // fiber根节点
const TAG_HOST = 'TAG_HOST'; // 原生dom

function workLoop() {
	while (workInProgress) {
		workInProgress = performUnitOfWork(workInProgress);
	}
}
// 执行一个任务，返回下一个任务
function performUnitOfWork(workInProgress) {
	// console.log('performUnitOfWork;workInProgress=====', workInProgress);
	beginWork(workInProgress);
	if (workInProgress.child) {
		return workInProgress.child;
	}
	// 没儿子，构建弟弟
	while (workInProgress) {
		completeUnitOfWork(workInProgress);
		if (workInProgress.sibling) {
			return workInProgress.sibling;
		}
		workInProgress = workInProgress.return;
	}
}
// fiber结束，创建真实dom
function completeUnitOfWork(workInProgress) {
	console.log('completeUnitOfWork', workInProgress.key);
	let stateNode;
	switch (workInProgress.tag) {
		case TAG_HOST:
			stateNode = createStateFNode(workInProgress);

			break;

		default:
			break;
    }
    markEffectList(workInProgress);
}
// effectList副作用链
function markEffectList(completeWork) {
	let returnFiber = completeWork.return;
	if (returnFiber) {
		if (!returnFiber.firstEffect) {
			returnFiber.firstEffect = completeWork.firstEffect;
		}
		if (completeWork.lastEffect) {
			if (returnFiber.lastEffect) {
				returnFiber.lastEffect.nextEffect = completeWork.firstEffect;
			}
			returnFiber.lastEffect = completeWork.lastEffect;
		}
		if (completeWork.flags) {
			if (returnFiber.lastEffect) {
				returnFiber.lastEffect.nextEffect = completeWork;
			} else {
				returnFiber.firstEffect = completeWork;
			}
			returnFiber.lastEffect = completeWork;
		}
	}
}
function createStateFNode(fiber) {
	if (fiber.tag === TAG_HOST) {
		let stateNode = document.createElement(fiber.type);
		fiber.stateNode = stateNode;
	}
	return fiber.stateNode;
}
// 根据当前fiber构建fiber树
function beginWork(workInProgress) {
	console.log('beginWork', workInProgress.key);
	let nextChildren = workInProgress.props.children;
	return reconcileChildren(workInProgress, nextChildren);
}
// 根据父fbier和zivdom数组，构建当前returnFiber的子fiber树
function reconcileChildren(returnFiber, nextChildren) {
	let previousNewFiber; // 上一个fiber儿子
	let firstChildFiber; // 大儿子
	for (let newIndex = 0; newIndex < nextChildren.length; newIndex++) {
		let newfiber = createFiber(nextChildren[newIndex]);
		newfiber.return = returnFiber;
		if (!firstChildFiber) {
			firstChildFiber = newfiber;
		} else {
			previousNewFiber.sibling = newfiber;
		}
		previousNewFiber = newfiber;
	}
	returnFiber.child = firstChildFiber;
	return firstChildFiber;
}
function createFiber(element) {
	return {
		tag: TAG_HOST,
		type: element.type,
		key: element.key,
		props: element.props,
	};
}
let root = document.getElementById('root');
let rootFiber = {
	tag: TAG_ROOT, // fiber类型
	key: 'ROOT',
	stateNode: root, // fiber对应的真实dom
	props: {
		children: [A],
	},
};
// 当前执行工作单元
workInProgress = rootFiber;
workLoop();
