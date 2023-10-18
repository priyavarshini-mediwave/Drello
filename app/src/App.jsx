import { useEffect, useReducer } from "react";
import Card from "./components/Card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  function tasksReducer(tasks, action) {
    switch (action.type) {
      case "TASK_ADD": {
        return [
          ...tasks,
          {
            id: uuidv4(),
            text: action.value,
            dateTime: new Date().getTime(),
            inState: "todo",
          },
        ];
      }
      case "TASK_DELETE": {
        const filtered = tasks.filter((t) => t.id != action.value);
        return [...filtered];
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }
  function handleAdd(value) {
    dispatch({
      type: "TASK_ADD",
      value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TASK_DELETE",
      value: id,
    });
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col TodoContainer">
            Todo
            <Card
              addTask={(text) => {
                handleAdd(text);
              }}
              handleDelete={handleDelete}
              tasks={tasks}
            />
          </div>
          <div className="col ProgressContainer">Progress</div>
          <div className="col DoneContainer">Done</div>
        </div>
      </div>
    </>
  );
}
export default App;
