// const createElement = function (type, props, ...children) {
//     delete props.__self;
//     return {
//         type,
//         props: {
//             ...props,
//             children: children.map((item) => {
//                 return typeof item === "object" ? item : createTextElement(item);
//             }),
//         },
//     };
// };

/**
 * 创建文本类型节点
 * @param {*} text
 */
// const createTextElement = (text) => {
//     return {
//         type: "TEXT",
//         props: {
//             nodeValue: text,
//             children: [],
//         },
//     };
// };
/**
 *
 * @param {虚拟dom} vdom
 * @param {容器} container
 */
const render = function (vdom, container) {
    // console.log("vdom", vdom);
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [vdom]
        }
    }


    // const { type, props } = vdom;
    // const dom = type
    //     ? document.createElement(type) //  元素
    //     : document.createTextNode(vdom); // 文本
    // if (props) {
    //     // 添加内部标签元素
    //     const children = Array.isArray(props.children)
    //         ? props.children
    //         : [props.children];
    //     children.forEach((item) => {
    //         render(item, dom);
    //     });
    // }

    // container.appendChild(dom);


};
/**
 * 通过虚拟dom，新建dom元素
 * @param {虚拟dom} vdom
 */
const createDom = (vdom) => {
    const { type, props } = vdom;
    const dom = type
        ? document.createElement(type) //  元素
        : document.createTextNode(vdom); // 文本
    // !props则表示文本，没有prop属性
    // 对非文本添加属性和内部元素操作
    if (props) {
        // 添加属性
        Object.keys(props)
            .filter((key) => key !== "children")
            .forEach((props) => {
                dom[props] = props[props];
            });

        // 添加内部标签元素
        // const children = Array.isArray(props.children)
        //     ? props.children
        //     : [props.children];
        // children.forEach((item) => {
        //     render(item, dom);
        // });
    }
    return dom;
};

// 下一个单元任务
// render会初始化第一个任务
let nextUnitOfWork = null;
/**
 * 调度我么的diff或者渲染任务
 */
const workLoop = (deadline) => {
    while (nextUnitOfWork && deadline.timeRemaining() > -1) {
        //  有下一个任务，并且当前帧还没有结束
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    requestIdleCallback(workLoop);
};
/**
 * 获取下一个任务
 * @param {*} fiber 
 * fiber结构：
 * fiber = {
 *  dom: 真实dom
 *  parent: 父亲
 *  child: 第一个子元素
 *  slibing: 兄弟元素
 * }
 */
// 获取下一个任务
const performUnitOfWork = (fiber) => {
    // 根据当前任务获取下一个任务
    if(!fiber.dom) {
        // 不是入口,创建一个入口
        fiber.dom = createDom(fiber)
    }
    if(fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }
    const elements = fiber.props.children
    // 构建成fiber
    let index = 0
    let prevSlibling = null
    while(index < elements.length) {
        let element = elements[index]
        var newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }
        if(index === 0) {
            // 第一个元素是父元素的child
            fiber.child = newFiber
        } else {
            // 其他
            prevSlibling.slibing = newFiber
        }
        // 上一个循环
        prevSlibling = fiber
        index++
        // fiber基本结构构建完毕
    }
    // 找下一任务
    // 先找子元素
    if(fiber.child) {
        return fiber.child
    }
    // 没有子元素就找兄弟元素
    let nextFiber = fiber
    while(nextFiber) {
        if(nextFiber.slibing) {
            return nextFiber.slibing
        }
        //  没有子兄弟元素找父元素
        nextFiber = newFiber.parent
    }
};

// 启动空闲时间渲染
requestIdleCallback(workLoop);

export { render };
