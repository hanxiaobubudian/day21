import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

function Li(props) {
  let { id, title, done } = props;
  const [isEdit, changeEdit] = useState(false);
  const dispatch = useDispatch();
  let edit = useRef();
  let [val, setVal] = useState(title);
  useEffect(() => {
    if (isEdit) {
      edit.current.focus();
    }
  }, [isEdit]);
  return (
    <li className={isEdit ? "editing" : ""}>
      <div className={`todo${done ? "done" : ""}`}>
        <div className="display">
          {/* 是否完成 */}
          <input
            type="checkbox"
            className="check"
            checked={done}
            onChange={({ target }) => {
              dispatch({
                type: "TODO_DONE",
                id,
                done: target.checked
              });
            }}
          />
          <div
            className="todo-content"
            onDoubleClick={() => {
              changeEdit(true);
            }}
          >
            {title}
          </div>
          {/* 删除一项 */}
          <span
            className="todo-destroy"
            onClick={() => {
              dispatch({
                type: "TODO_REMOVE",
                id
              });
            }}
          >
            TODO_REMOVE
          </span>
        </div>
        <div className="edit">
          <input
            type="text"
            className="todo-input"
            ref={edit}
            value={val}
            onChange={({ target }) => {
              setVal(target.value);
            }}
            onBlur={() => {
              if (val.trim()) {
                dispatch({
                  type: "TODO_EDIT",
                  id,
                  title: val
                });
              } else {
                setVal(title);
              }
              changeEdit(false);
            }}
          />
        </div>
      </div>
    </li>
  );
}
export default Li;
