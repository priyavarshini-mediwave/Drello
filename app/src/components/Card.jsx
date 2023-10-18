import React, { useEffect, useState, useRef } from "react";
//import { formatDate } from "../utils";

function Card({ addTask, tasks, handleDelete, handleTextEdit, dragUpdate }) {
  const [text, setText] = useState("");
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const handleSort = (id) => {
    dragUpdate(dragItem.current, dragOverItem.current, id);
  };
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
      console.log(newValue);
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

  return (
    <>
      <button className="btn-primary AddButton" onClick={addCard}>
        +
      </button>
      <div className="showCards">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="card"
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={() => handleSort(task.id)}
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
              contentEditable={false}
              key={task.id}
              // onInput={(e) => handleTextChange(e.target.innerHTML)}
              onKeyDown={(e) => enterKeyPressed(e, e.target.innerHTML, task.id)}
              onClick={(e) => handleTextClick(e)}
              required
              html={task.text}
            ></div>
            <div>
              <strong>Last updated:</strong>
              {task.dateTime.toString()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
