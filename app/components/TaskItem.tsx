'use client';

import { useState } from 'react';

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

interface Props {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onSave: (id: string, title: string, description: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onSave(task.id, editTitle, editDesc);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDesc(task.description || '');
  };

  return (
    <li className="border p-4 rounded shadow-sm bg-gray-50">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-1 rounded">
              Save
            </button>
            <button onClick={handleCancel} className="bg-gray-300 px-4 py-1 rounded">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id, !task.completed)}
              className="w-4 h-4"
            />
            <h2
              className={`text-lg font-semibold ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h2>
          </div>
          {task.description && <p className="text-gray-600 mt-1">{task.description}</p>}
          <p className="text-sm text-gray-400 mt-2">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
