import { useEffect, useState } from 'react'
import './App.css'
import TodoItems from './components/TodoItems'
import apiService from './services/api-service'
import todoService, { Todo } from './services/todo-service'


function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await todoService.getAll<Todo>()
      const todoData = res.data
      setTodos(todoData)
      setLoading(false)
    }
    catch (err: any) {
      console.log(err.message);
      setLoading(false)
    }
  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodoTitle.trim() !== "") {
      e.preventDefault()
      await addTodo()
      setLoading(false)
    }
  }
  const addTodo = async () => {
    try {
      const res = await todoService.add({
        title: newTodoTitle,
        completed: false,
        order: 1
      })
      const newData = res.data
      setTodos([newData, ...todos])
      setNewTodoTitle('')
      setLoading(false)
    }
    catch (err: any) {
      console.log(err.message);
    }
  }
  const handleCheckboxChange = (id: number) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos)
      apiService.put('/events/' + id, { completed: updatedTodos.find((todo) => todo.id === id)?.completed })
    }
    catch (err: any) {
      console.log(err.message);
    }
  }
  const deleteTodo = (id: number) => {
    try {
      todoService.delete(id)
      const filterTodos = todos.filter((t) => t.id !== id)
      setTodos(filterTodos)
      setLoading(false)
    }
    catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <>
      {loading && <p>loading...</p>}
      <div className="wrapper">
        <div className='todo-container'>
          <h1>todos</h1>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder='what needs to be done?'
            onKeyDown={handleKeyDown}
          />
          <TodoItems todos={todos} onDelete={deleteTodo} onChange={handleCheckboxChange} />
        </div>
      </div >
    </>
  )
}

export default App
