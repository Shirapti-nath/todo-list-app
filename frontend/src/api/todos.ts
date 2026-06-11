import type { Todo } from '../types';

const API_URL = 'http://localhost:3000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.message ?? `Request failed (${response.status})`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
}

export function getTodos(): Promise<Todo[]> {
  return request<Todo[]>('/todos');
}

export function createTodo(title: string): Promise<Todo> {
  return request<Todo>('/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

export function updateTodo(
  id: number,
  changes: Partial<Pick<Todo, 'title' | 'completed'>>,
): Promise<Todo> {
  return request<Todo>(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
  });
}

export function deleteTodo(id: number): Promise<void> {
  return request<void>(`/todos/${id}`, { method: 'DELETE' });
}
