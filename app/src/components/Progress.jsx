import { formatDate } from "../Utils";

function Progress({ tasks, handleDelete }) {
  const onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  return (
    <>
      <div className="showCards">
        {tasks
          .filter((t) => t.inState === "progress")
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
                  className="btn btn-danger Deletebtn"
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
              >
                <span>{task.text}</span>
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
