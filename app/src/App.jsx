import { useEffect, useReducer } from "react";
import Card from "./components/Card";
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

      case "TASK_DROP": {
        let newTasks = tasks.filter((task) => {
          if (task.id == action.value.id) {
            task.inState = action.value.state;
          }
          return task;
        });
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
    //console.log("-->", newvalue, id);
    dispatch({
      type: "TASK_EDIT",
      value: { newvalue, id },
    });
  }
  function onDrop(ev, state) {
    let id = ev.dataTransfer.getData("id");
    dispatch({
      type: "TASK_DROP",
      value: { id, state },
    });
  }
  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <h1 className="App-title">Drello</h1>
      <div className="container">
        <div className="row">
          <div
            className="col TodoContainer"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, "todo")}
          >
            <h1>Todo</h1>
            <Card
              addTask={(text) => {
                handleAdd(text);
              }}
              handleDelete={handleDelete}
              tasks={tasks}
              handleTextEdit={handleEdit}
            />
          </div>
          <div
            className="col ProgressContainer"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, "progress")}
          >
            <h1>Progress</h1>
            <Progress tasks={tasks} handleDelete={handleDelete} />
          </div>
          <div
            className="col DoneContainer"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, "done")}
          >
            <h1>Done</h1>
            <Done tasks={tasks} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
