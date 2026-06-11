import { useState } from 'react';
import type { FormEvent } from 'react';

interface Props {
  onAdd: (title: string) => Promise<void>;
}

export function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setTitle('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        maxLength={255}
        autoFocus
      />
      <button type="submit" disabled={submitting || !title.trim()}>
        Add
      </button>
    </form>
  );
}
