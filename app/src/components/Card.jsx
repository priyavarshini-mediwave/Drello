import React, { useEffect, useState, useRef } from "react";
import { formatDate } from "../Utils";
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
  // const formatDate = (dateTime) => {
  //   var hours = new Date(dateTime).getHours();
  //   var minutes = new Date(dateTime).getMinutes();
  //   var ampm = hours >= 12 ? "pm" : "am";
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   var strTime = hours + ":" + minutes + " " + ampm;
  //   return (
  //     new Date(dateTime).getDate() +
  //     "/" +
  //     (new Date(dateTime).getMonth() + 1) + // Add 1 to the month to get the correct month number
  //     "/" +
  //     new Date(dateTime).getFullYear() +
  //     "  " +
  //     strTime
  //   );
  // };

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
              // contentEditable={false}
              key={task.id}
              // onInput={(e) => handleTextChange(e.target.innerHTML)}
              onKeyDown={(e) => enterKeyPressed(e, e.target.innerHTML, task.id)}
              onClick={(e) => handleTextClick(e)}
              html={task.text}
            >
              {<span>{task.text}</span>}
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
