/*
 * @Description: 手动实现react-dom
 * @Author: yudandan
 * @Date: 2021-03-09 14:13:58
 * @LastEditors: yudandan
 * @LastEditTime: 2021-03-09 14:29:54
 */

// 类型：
// 原生节点
// 文本节点
// 函数组件
// 类组件
// vnode 虚拟节点
// node  真实节点

//  初次渲染
//  更新
// 根节点
let wipRoot = null;
function render(vnode, container) {
    wipRoot = {
        type: "div",
        props: {
            children: { ...vnode },
        },
        stateNode: container,
    };
    nextUnitOfWork = wipRoot;
}
// 创建node节点
function createNode(workInProgress) { 
    const { type, props } = workInProgress;
    const node = document.createElement(type);
    addProps(props, node);
    return node;
}
// 原生标签创建节点
function updateHostComponent(workInProgress) {
    const { type } = workInProgress;
    if (!workInProgress.stateNode) {
        workInProgress.stateNode = createNode(workInProgress);
    }
    reconcileChild(workInProgress, workInProgress.props.children);

    console.log("fiber====", workInProgress);
}
// 文本节点
function updateTextComponent(workInProgress) {
    if(workInProgress.stateNode) {
        // 真实节点
        workInProgress.stateNode = document.createTextNode(workInProgress.props)
    }
    const node = document.createTextNode(vnode);
    return node;
}
// 函数组件
function updateFuncComponent(workInProgress) {
    const { type, props } = workInProgress;
    const children = type(props);
    reconcileChild(workInProgress, children);
}
// 类组件
function updateClassComponent(vnode) {
    const { type, props } = vnode;
    const instance = new type(props);
    vnode = instance.render();
    console.log("vnode:", vnode);
    const node = createNode(vnode);
    return node;
}
//  节点内部子节点
function reconcileChild(workInProgress, children) {
    if (typeof children === "string" || typeof children === "number") {
        return;
    }
    const newChildren = Array.isArray(children) ? children : [children];
    let prevNewFiber = null;
    newChildren &&
        newChildren.map((item, index) => {
            // node.appendChild(createNode(item));
            let newFiber = {
                type: item.type,
                props: { ...item.props },
                stateNode: null,
                child: null,
                sibling: null,
                return: workInProgress,
            };

            if(typeof child === 'string') {
                newFiber.props = child;
            }

            if (index === 0) {
                workInProgress.child = newFiber;
            } else {
                prevNewFiber.sibling = newFiber;
            }

            // 记录上一个fiber
            prevNewFiber = newFiber;
        });
}
// 给节点添加属性
function addProps(props, node) {
    props &&
        Object.entries(props)
            .map((item) => {
                if(item[0] === 'children') {
                    if(typeof item[1] === 'string') {
                        node.textContent = item[1];
                    }
                } else {
                    node[item[0]] = item[1];
                }
            });
}
let nextUnitOfWork = null; // 下一个任务
//fiber
// type
// key
// props
// stateNode
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点
// IdleDeadline这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
function workLoop(IdleDeadline) {
    while (nextUnitOfWork && IdleDeadline.timeRemaining() > -1) {
        // 下一个任务存在并且有空余的时间
        // 执行下一个任务
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    // 提交
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
}
// 下一个单元任务 fiber
function performUnitOfWork(workInProgress) {
    // step1 执行任务
    const { type } = workInProgress;

    if (typeof type === "string") {
        // 原生标签
        updateHostComponent(workInProgress);
    } else if (typeof type === 'function') {
        //  函数组件
        updateFuncComponent(workInProgress)
    } else if(typeof type === 'undefined') {
        // 文本节点
        updateTextComponent(workInProgress)
    }
    // step2 并且返回下一个执行任务
    if (workInProgress.child) {
        return workInProgress.child;
    }

    let nextFiber = workInProgress;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }
}
// 提交
function commitRoot() {
    commitWork(wipRoot.child);
    wipRoot = null;
}
function commitWork(workInProgress) {
    // 提交自己
    if (!workInProgress) return;
    let parentNodeFiber = workInProgress.return; // 
    // 父fiber不一定有dom
    while(!parentNodeFiber.stateNode) {
        parentNodeFiber = parentNodeFiber.return;
    }
    let parentNode = parentNodeFiber.stateNode; // dom 节点
    if (workInProgress.stateNode) {
        parentNode.appendChild(workInProgress.stateNode);
    }
    // 提交子节点
    commitWork(workInProgress.child);
    // 提交兄弟节点
    commitWork(workInProgress.sibling);
}
// window.requestIdleCallback: 利用浏览器空闲时间
requestIdleCallback(workLoop);

export default {
    render,
};
