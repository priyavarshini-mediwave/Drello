import { useEffect, useReducer } from "react";
import Card from "./components/Card";
import Todo from "./components/Todo";
import Progress from "./components/Progress";
import Done from "./components/Done";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const initialtasks = getfromLocal();
  console.log(initialtasks);
  const [tasks, dispatch] = useReducer(tasksReducer, initialtasks);
  useEffect(() => {
    saveToLocal(tasks);
  }, [tasks]);
  function getfromLocal() {
    const getData = localStorage.getItem("tasks");
    if (getData) {
      return JSON.parse(getData);
    }
    return [];
  }
  function saveToLocal(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function tasksReducer(tasks, action) {
    switch (action.type) {
      case "TASK_ADD": {
        //const d = new Date().toString();
        return [
          ...tasks,
          {
            id: uuidv4(),
            text: "",
            dateTime: new Date().getTime(),
            inState: "todo",
          },
        ];
      }
      case "TASK_DELETE": {
        const filtered = tasks.filter((t) => t.id != action.value);
        return [...filtered];
      }
      case "TASK_EDIT": {
        const EditTask = [...tasks];
        const idx = EditTask.findIndex((t) => t.id === action.value.id);
        if (idx !== -1) {
          EditTask[idx].text = action.value.newvalue;
          EditTask[idx].dateTime = new Date();
        }
        return EditTask;
      }
      case "TASK_DRAG": {
        let newTasks = [...tasks];
        newTasks[action.value.dragItemcurrent].inState = "progress";

        return newTasks;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }
  function handleAdd(value) {
    dispatch({
      type: "TASK_ADD",
      // value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TASK_DELETE",
      value: id,
    });
  }
  function handleEdit(newvalue, id) {
    console.log("-->", newvalue, id);
    dispatch({
      type: "TASK_EDIT",
      value: { newvalue, id },
    });
  }
  function dragUpdate(dragItemcurrent, dragOverItemcurrent, id) {
    dispatch({
      type: "TASK_DRAG",
      value: { dragItemcurrent, dragOverItemcurrent, id },
    });
  }

  return (
    <>
      <h1 className="App-title">Drello</h1>
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
              handleTextEdit={handleEdit}
              dragUpdate={dragUpdate}
            />
          </div>
          <div className="col ProgressContainer">
            <Progress dragUpdate={dragUpdate} />
          </div>
          <div className="col DoneContainer">
            <Done dragUpdate={dragUpdate} />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
