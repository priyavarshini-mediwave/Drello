import React, { useState } from "react";

function Card({ addTask, tasks, handleDelete }) {
  const [text, setText] = useState("");

  const addCard = () => {
    addTask(text);
    setText("");
  };

  function handleTextChange(newValue) {
    setText(newValue);
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

            <textarea
              key={task.id}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => handleTextChange(e.target.innerHTML)}
            ></textarea>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
