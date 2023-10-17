import { useEffect, useReducer } from "react";
import Card from "./components/Card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  function todoReducer(todos, action) {
    switch (action.type) {
      case "TODO_ADD": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.value,
            isDone: false,
            isEdit: false,
          },
        ];
      }
      case "TODO_DELETE": {
        const filtered = todos.filter((t) => t.id != action.value);
        return [...filtered];
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }
  function handleAdd(value) {
    dispatch({
      type: "TODO_ADD",
      value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TODO_DELETE",
      value: id,
    });
  }
  return (
    <>
      <div className="container">
        <div class="row">
          <div class="col TodoContainer">
            <Card />
          </div>
          <div class="col ProgressContainer">hi</div>
          <div class="col DoneContainer">hello</div>
        </div>
      </div>
    </>
  );
}
export default App;
