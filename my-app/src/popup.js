import React, { Component, useEffect, useRef, useState } from "react";
import "./index.scss";
let data = `
    <h2>xxxxxx</h2>
    <p>从0开始学习</p>
`;

// class Popup extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}
// 	render() {
// 		let { title, children } = this.props;
// 		return (
// 			<div className="popup">
// 				<h2>{title}</h2>
// 				<div>{children}</div>
//                 <div
//                     dangerouslySetInnerHTML={{__html: data}}
//                 ></div>
// 			</div>
// 		);
// 	}
// }

function Popup(props) {
  const [name, setName] = useState("kkb");
  const [course, setCourse] = useState("all");
  const [num, setNum] = useState(1);
  let elP = useRef();
  let prevCourse = useRef(course);
  let prevNum = useRef(num);

  useEffect(() => {
    console.log("组件挂载或更新");
    return () => {
      console.log("清理更新前的一些全局内容，或检测组件即将卸载");
    };
  }, []); // 只有num更新时才执行回调函数
  useEffect(() => {
    if (course !== prevCourse.current || num !== prevNum.current) {
      console.log("组件更新了");
      prevCourse.current = course;
      prevNum.current = num;
    }
  }, [num, course]);

  // 调用自定义hook
  let scrollY = useScrollY();
  console.log("当前滚动位置===", scrollY);
  return (
    <div className="scroll">
      {/* <p ref={elP}>{name}</p>
			<button
				onClick={() => {
					setName("开课吧");
					console.log(elP.current);
				}}
			>
				all
			</button> */}

      <div>
        选择课程：
        <select value={course} onChange={target => setCourse(target.value)}>
          <option value="all">web全栈工程师</option>
          <option value="hight">web高级工程师</option>
        </select>
      </div>
      <div>
        购买数量：
        <input
          type="number"
          value={num}
          min={1}
          onChange={target => setNum(target.value)}
        />
      </div>

      <p style={{ position: "fixed", left: 0, top: 0 }}>
        当前滚动位置是:{scrollY}
      </p>
    </div>
  );
}

// 自定义hook
function useScrollY() {
  let [scrollY, setScrollY] = useState(0);
  function scroll() {
    setScrollY(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return scrollY;
}

export default Popup;
