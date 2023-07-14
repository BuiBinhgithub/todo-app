import { useEffect, useState } from "react";
import "./App.css";
import TodoItems from "./components/TodoItems";
import { Todo } from "./services/todo-service";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_TODOS } from "../graphql/queries";
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from "../graphql/mutations";
function App() {
  const { data, error, loading } = useQuery(GET_ALL_TODOS);
  const [createTodo] = useMutation(CREATE_TODO, {
    onCompleted: (res) => {
      const newData = res.createTodo;
      setTodos((prev) => [newData, ...prev]);
      setTitle("");
      console.log(newData);
    },
  });
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(DELETE_TODO);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (data) {
      setTodos(data.listTodo);
    }
    if (error) {
      console.log(error);
    }
  }, [data]);

  const addTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && title.trim() !== "") {
      createTodo({ variables: { title } });
    }
  };
  const handleCheckboxChange = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isActive: !todo.isActive } : todo
    );
    setTodos(updatedTodos);
    const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      updateTodo({
        variables: { id: todoToUpdate.id, isActive: todoToUpdate.isActive },
      });
    }
  };
  const deleteTodo = (id: number) => {
    removeTodo({ variables: { id } });
    const filterTodos = todos.filter((t) => t.id !== id);
    setTodos(filterTodos);
  };

  return (
    <>
      <div className="wrapper">
        <div className="todo-container">
          <h1>todos</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="what needs to be done?"
            onKeyDown={addTodo}
          />
          {loading ? (
            <p>loading...</p>
          ) : (
            <TodoItems
              todos={todos}
              deleteTodo={deleteTodo}
              onChange={handleCheckboxChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
