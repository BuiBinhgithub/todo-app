import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import TodoItems from './components/TodoItems'


export interface Todo {
  id: number,
  order: number,
  completed: boolean,
  title: string
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://64867c0cbeba6297278ed1ef.mockapi.io/api/events')
      const todoData = res.data
      setTodos(todoData)
    }
    catch (err: any) {
      console.log(err.message);
    }
  }
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      await addTodo()
    }
  }
  const addTodo = async () => {
    try {
      const res = await axios.post('https://64867c0cbeba6297278ed1ef.mockapi.io/api/events', {
        title: newTodoTitle,
        completed: false,
        order: 1
      })
      const newData = res.data
      setTodos([...todos, newData])
      setNewTodoTitle('')
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
      axios.put('https://64867c0cbeba6297278ed1ef.mockapi.io/api/events/' + id, { completed: updatedTodos.find((todo) => todo.id === id)?.completed })
    }
    catch (err: any) {
      console.log(err.message);
    }
  }
  const deleteTodo = async (id: number) => {
    try {
      await axios.delete('https://64867c0cbeba6297278ed1ef.mockapi.io/api/events/' + id)
      const filterTodos = todos.filter((t) => t.id !== id)
      setTodos(filterTodos)
    }
    catch (err: any) {
      console.log(err.message);
    }
  }



  return (
    <>
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
