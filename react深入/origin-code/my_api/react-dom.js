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
function render(vnode, container) {
    // console.log('vnode===', vnode);
    // vnode -> node
    // 真实节点
    const node = createNode(vnode);
    // node -> container
    container.appendChild(node);
}
// 创建node节点
function createNode(vnode) {
    if (!vnode) return;
    let node; //真实node
    // 根据组件类型的不同创建不同节点
    const { type } = vnode;
    // console.log('type---', type)
    if (typeof type === "string") {
        // 标签
        node = updateHostComponent(vnode);
    } else if (typeof type === "function") {
        // 函数组件
        node = type.prototype.isReactComponent
            ? updateClassComponent(vnode)
            : updateFuncComponent(vnode);
    } else {
        node = updateTextComponent(vnode);
    }
    return node;
}
// 原生标签创建节点
function updateHostComponent(vnode) {
    const { type, props } = vnode;
    const node = document.createElement(type);
    // 处理内部节点
    if (props.children) {
        reconcileChild(node, props.children);
    }
    // 添加属性
    addProps(props, node);
    return node;
}
// 文本节点
function updateTextComponent(vnode) {
    const node = document.createTextNode(vnode);
    return node;
}
// 函数组件
function updateFuncComponent(vnode) {
    // console.log("vnode===", vnode);
    const { type, props } = vnode;
    vnode = type(props);
    const node = createNode(vnode);
    return node;
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
function reconcileChild(node, children) {
    const newChildren = Array.isArray(children) ? children : [children];
    newChildren &&
        newChildren.map((item, index) => {
            node.appendChild(createNode(item));
            // render(item, node);
        });
}
// 给节点添加属性
function addProps(props, node) {
    props &&
        Object.entries(props)
            .filter((item) => {
                return item[0] !== "children";
            }) // 过滤props是children的
            .map((item) => {
                // 针对img的src单独处理
                node.setAttribute(item[0], item[1]);
            });
}

export default {
    render,
};
