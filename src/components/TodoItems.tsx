import { Todo } from '../services/todo-service';
import './TodoItems.css'
interface Props {
    todos: Todo[],

    isDeleting: boolean,
    onChange: (id: number) => void,
    onDelete: (id: number) => void
}

function TodoItems({ todos, onChange, onDelete, isDeleting }: Props) {

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

                    <button disabled={isDeleting} className='delete-button' onClick={() => onDelete(todo.id)}>Delete</button>

                </li>
            )
            )}
        </ul>
    );
}

export default TodoItems;