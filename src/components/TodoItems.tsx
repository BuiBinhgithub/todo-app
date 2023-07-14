import { Todo } from "../services/todo-service";
import "./TodoItems.css";
interface Props {
  todos: Todo[];
  onChange: (id: number) => void;
  deleteTodo: (id: number) => void;
}

function TodoItems({ todos, onChange, deleteTodo }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={
            todo.id % 2 !== 0
              ? { backgroundColor: "#FFFAED" }
              : { backgroundColor: "#F5F5F5" }
          }
        >
          <div className="li-checkbox">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.isActive}
                value={todo.id}
                onChange={() => onChange(todo.id)}
              />
              <span className="checkmark"></span>
            </label>
            <span
              style={{
                textDecoration: todo.isActive ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
          </div>

          <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoItems;
