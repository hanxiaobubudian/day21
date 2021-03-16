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
const render = function(vdom, container) {
  // console.log("vdom", vdom);
  wipRoot = {
    dom: container,
    props: {
      children: [vdom]
    },
    base: currentRoot
  };
  nextUnitOfWork = wipRoot;
  deletions = [];

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
const createDom = vdom => {
  const { type, props } = vdom;
  const dom = type
    ? document.createElement(type) //  元素
    : document.createTextNode(vdom); // 文本
  updateDom(dom, {}, vdom.props);
  // !props则表示文本，没有prop属性
  // 对非文本添加属性和内部元素操作
  if (props) {
    // 添加属性
    Object.keys(props)
      .filter(key => key !== "children")
      .forEach(props => {
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
let wipRoot = null;
// 当前工作节点
let currentRoot = null;
let deletions = [];
/**
 * 调度我么的diff或者渲染任务
 */
const workLoop = deadline => {
  while (nextUnitOfWork && deadline.timeRemaining() > -1) {
    //  有下一个任务，并且当前帧还没有结束
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 没有任务了，并且根节点还在
    commitRoot();
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
 *  sibling: 兄弟元素
 * }
 */
// 获取下一个任务
const performUnitOfWork = fiber => {
  // 根据当前任务获取下一个任务
  if (!fiber.dom) {
    // 不是入口,创建一个入口
    fiber.dom = createDom(fiber);
  }
  // if(fiber.parent) {
  //     fiber.parent.dom.appendChild(fiber.dom)
  // }
  const elements = (fiber.props && fiber.props.children) || [];
  reconcileChildren(fiber, elements);
  // 找下一任务
  // 先找子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 没有子元素就找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    //  没有子兄弟元素找父元素
    nextFiber = nextFiber.parent;
  }

  function reconcileChildren(wipFiber, elements) {
    // 构建成fiber
    let index = 0;
    let oldFiber = wipFiber.base && wipFiber.base.child;
    let prevSlibling = null;
    while (index < elements.length && oldFiber != null) {
      // while (index < elements.length) {
      let element = elements[index];
      let newFiber = null;
      // 对比oldFiber的状态和element
      //  先比较类型
      const sameType = oldFiber && element && oldFiber.type === element.type;
      if (sameType) {
        // 复用节点，更新
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          parent: wipFiber,
          base: oldFiber,
          effectTag: "UPDATE"
        };
      }
      if (!sameType && element) {
        // 替换
        newFiber = {
          type: element.type,
          props: element.props,
          dom: null,
          parent: wipFiber,
          base: null,
          effectTag: "PLACEMENT"
        };
      }
      if (!sameType && oldFiber) {
        // 删除
        oldFiber.effectTag = "DELETION";
        deletions.push(oldFiber);
      }

      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }
      if (index === 0) {
        // 第一个元素是父元素的child
        fiber.child = newFiber;
      } else {
        // 其他
        prevSlibling.sibling = newFiber;
      }
      // 上一个循环
      prevSlibling = fiber;
      index++;
      // fiber基本结构构建完毕
    }
  }
};
const commitRoot = () => {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
};
const commitWork = fiber => {
  if (!fiber) return;
  const domParent = fiber.parent.dom;
  if (fiber.effectTag == "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag == "DELETION") {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag == "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.base.props, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
};
const updateDom = (dom, prevProps, nextProps) => {
  // 规避children属性
  // 老的存在，取消
  // 新的存在，新增，并没有新老判断
  // todo 兼容问题
  Object.keys(prevProps)
    .filter(name => name != "children")
    .filter(name => !(name in nextProps))
    .forEach(name => {
      if (name.slice(0, 2) == "on") {
        dom.removeEventListner(
          name.slice(0, 2).toLowerCase(),
          prevProps[name],
          false
        );
      } else {
        dom[name] = "";
      }
    });

  Object.keys(nextProps)
    .filter(name => name != "children")
    .forEach(name => {
      if (name.slice(0, 2) == "on") {
        dom.addEventListner(
          name.slice(0, 2).toLowerCase(),
          prevProps[name],
          false
        );
      } else {
        dom[name] = nextProps[name];
      }
    });
};

// 启动空闲时间渲染
requestIdleCallback(workLoop);

export { render };
