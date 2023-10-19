import { useState, useRef } from "react";
import { formatDate } from "../Utils";

function Progress({ tasks, handleDelete, dragUpdate }) {
  const [text, setText] = useState("");
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const handleSort = (id) => {
    dragUpdate(dragItem.current, dragOverItem.current, id);
  };
  // function enterKeyPressed(event, newValue, id) {
  //   if (event.keyCode == 13) {
  //     console.log("Enter key is pressed");
  //     console.log(newValue);
  //     setText(newValue);
  //     handleTextEdit(newValue, id);
  //     event.target.contentEditable = false;

  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // function handleTextClick(e) {
  //   e.target.contentEditable = true;
  // }

  return (
    <>
      <div className="showCards">
        {tasks
          .filter((t) => t.inState === "done")
          .map((task, index) => (
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

                //html={task.text}
              >
                {""}
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

export default Progress;
