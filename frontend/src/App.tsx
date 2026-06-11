import { useEffect, useState } from 'react';
import type { Todo } from './types';
import { createTodo, deleteTodo, getTodos, updateTodo } from './api/todos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(title: string) {
    try {
      const todo = await createTodo(title);
      setTodos((prev) => [todo, ...prev]);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleToggle(todo: Todo) {
    try {
      const updated = await updateTodo(todo.id, {
        completed: !todo.completed,
      });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <h1>To-Do List</h1>

      <AddTodoForm onAdd={handleAdd} />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="empty-state">Loading…</p>
      ) : (
        <>
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
          {todos.length > 0 && (
            <p className="summary">
              {remaining} of {todos.length} remaining
            </p>
          )}
        </>
      )}
    </main>
  );
}
