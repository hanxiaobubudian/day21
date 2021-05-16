// 1.定义jsx
let style = {
	color: 'green',
	border: '1px solid red',
	margin: '5px',
};
let vdom = (
	<div key="A" style={style}>
		A<div key="B1">B1</div>
		<div key="B2">B2</div>
	</div>
);

let A = {
	type: 'div',
	key: 'A',
	props: {
		style,
		children: [
			// 'A',
			{
				type: 'div',
				key: 'B1',
				props: { style, children: [] },
			},
			{
				type: 'div',
				key: 'B2',
				props: { style, children: [] },
			},
		],
	},
};

// 开始我们的工作循环
// 表示一个工作单元， 表示正在处理中的fiber
let workInProgress;
const TAG_ROOT = 'TAG_ROOT'; // fiber根节点
const TAG_HOST = 'TAG_HOST';
const Placement = 'Placement';

function workLoop(deadline) {
	// while (deadline.timeRemaining() > 1 && workInProgress) {
	while (deadline.timeRemaining() > 1 && workInProgress > 0) {
		// 如果有任务就执行
		workInProgress = performUnitOfWork(workInProgress); // 执行完成之后会返回下一个任务
	}
	commitRoot(rootFiber);
}
function commitRoot(rootFiber) {
	let currentEffect = rootFiber.firstEffect;
	while (currentEffect) {
		let flags = currentEffect.flags;
		switch (flags) {
			case Placement:
				commitPlacement(currentEffect);
				break;

			default:
				break;
		}
		currentEffect = currentEffect.nextEffect;
	}
}
function commitPlacement(currentEffect) {
	let parent = currentEffect.return.stateNode;
	parent.appendChild(currentEffect.stateNode);
}

let root = document.getElementById('root');
let rootFiber = {
	tag: TAG_ROOT, // fiber的类型
	key: 'ROOT', // 唯一标签
	stateNode: root, // fiber队医的真实dom节点
	props: {
		children: [A],
	},
};
function performUnitOfWork(workInProgress) {
	beginWork(workInProgress);
	if (workInProgress.child) {
		return workInProgress.child;
	}
	// 如果没儿子接着构建弟弟
	while (workInProgress) {
		completeUnitOfWork(workInProgress);
		if (workInProgress.sibling) {
			return workInProgress.sibling;
		}
		// 如果没有弟弟，找叔叔
		workInProgress = workInProgress.return;
	}
}
// 结束工作单元
function completeUnitOfWork(workInProgress) {
	// fiber在结束，创建真实dom
	console.log('completeUnitOfWork===', workInProgress.key);
	let stateNode;
	switch (workInProgress.tag) {
		case TAG_HOST:
			stateNode = createStateNode(workInProgress);
			break;
		default:
			break;
	}
	// 在
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
function createStateNode(fiber) {
	if (fiber.tag === TAG_HOST) {
		let stateNode = document.createElement(fiber.type);
		fiber.stateNode = stateNode;
	}
	return fiber.stateNode;
}
// 根据当前的fiber和vdom构建fiber树
function beginWork(workInProgress) {
	console.log('beginWork====', workInProgress.key);
	let nextChildren = workInProgress.props.children;
	return reconcileChildren(workInProgress, nextChildren);
}
// 根据父fiber和vdom构建当前returnFiber的fiber树
function reconcileChildren(returnFiber, nextChildren) {
	let prevNewFiber; // 上一个fiber儿子
	let firChild; // 当前return Fiber的大儿子
	for (let newIndex = 0; newIndex < nextChildren.length; newIndex++) {
		let newFiber = createFiber(nextChildren[newIndex]);
		newFiber.flags = Placement;
		newFiber.return = returnFiber;
		if (!prevNewFiber) {
			firChild = newFiber;
		} else {
			prevNewFiber.sibling = newFiber;
		}
	}
	returnFiber.child = firChild;
	return firChild;
}
function createFiber(element) {
	return {
		tag: TAG_HOST,
		type: element.type,
		key: element.key,
		props: element.props,
	};
}
// 当前正在执行的工作单元
workInProgress = rootFiber;
requestIdleCallback(workLoop);

// 开始根据虚拟dom构建树
