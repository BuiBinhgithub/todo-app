import React from 'react';
import { Todo } from '../services/todo-service';
import './TodoItems.css'
interface Props {
    todos: Todo[],
    onChange: (id: number) => void
    onDelete: (id: number) => void
}

function TodoItems({ todos, onChange, onDelete }: Props) {

    return (
        <ul>
            {todos.map((todo) =>
            (
                <li key={todo.id} style={todo.id % 2 !== 0 ? { backgroundColor: '#FFFAED' } : { backgroundColor: "#F5F5F5" }}>
                    <div className="li-checkbox" >
                        <label className='checkbox-container'>
                            <input type="checkbox" checked={todo.completed} value={todo.id} onChange={() => onChange(todo.id)} />
                            <span className="checkmark"></span>
                        </label>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                    </div>
                    <span className='delete-button' onClick={() => onDelete(todo.id)}>Delete</span>
                </li>
            )
            )}
        </ul>
    );
}

export default TodoItems;