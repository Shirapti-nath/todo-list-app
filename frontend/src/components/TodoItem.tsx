import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <span className="todo-title">{todo.title}</span>
      </label>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
      >
        &times;
      </button>
    </li>
  );
}
