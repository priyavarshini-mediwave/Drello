import React, { useEffect, useState, useRef } from "react";
import { formatDate } from "../Utils";
function Card({ addTask, tasks, handleDelete, handleTextEdit }) {
  const [text, setText] = useState("");

  const addCard = () => {
    //setText("");
    addTask(text);
    // setText("");
  };

  // function handleTextChange(newValue) {
  //   setText(newValue);
  // }
  function enterKeyPressed(event, newValue, id) {
    if (event.keyCode == 13) {
      console.log("Enter key is pressed");
      //console.log(newValue);
      setText(newValue);
      handleTextEdit(newValue, id);
      event.target.contentEditable = false;

      return true;
    } else {
      return false;
    }
  }
  function handleTextClick(e) {
    e.target.contentEditable = true;
  }
  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  return (
    <>
      <button className="btn-primary AddButton" onClick={addCard}>
        +
      </button>
      <div className="showCards">
        {tasks
          .filter((t) => t.inState === "todo")
          .map((task, index) => (
            <div
              key={task.id}
              className="card"
              draggable
              onDragStart={(e) => {
                onDragStart(e, task.id);
              }}
            >
              <div className="title-bar">
                Task:
                <button
                  className="DeleteButton"
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                >
                  x
                </button>
              </div>

              <div
                className="textarea"
                //contentEditable={false}
                key={task.id}
                // onInput={(e) => handleTextChange(e.target.innerHTML)}
                onKeyDown={(e) =>
                  enterKeyPressed(e, e.target.innerHTML, task.id)
                }
                onClick={(e) => handleTextClick(e)}
                //html={task.text}
              >
                {task.text}
              </div>

              <div>
                <strong>Last updated: </strong>
                {formatDate(task.dateTime)}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Card;
