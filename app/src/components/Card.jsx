import React, { useEffect, useState } from "react";

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
          <div key={task.id} className="card" draggable>
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
              contentEditable={true}
              key={task.id}
              // onInput={(e) => handleTextChange(e.target.innerHTML)}
              onKeyDown={(e) => enterKeyPressed(e, e.target.innerHTML, task.id)}
              onClick={(e) => handleTextClick(e)}
              required
              html={task.text}
            ></div>
            <div>Last updated:{task.dateTime.toString()} </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
