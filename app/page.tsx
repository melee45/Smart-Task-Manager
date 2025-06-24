'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import TaskList from './components/TaskList';

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data: Task[] = await res.json();
      setTasks(data);
    } catch {
      toast.error('Failed to fetch tasks');
    }
  };

  const createTask = async () => {
    if (!newTitle.trim()) return;

    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDesc }),
      });

      toast.success('Task created!');
      setNewTitle('');
      setNewDesc('');
      fetchTasks();
    } catch {
      toast.error('Failed to create task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const toggleCompletion = async (id: string, completed: boolean) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      toast.success(`Marked as ${!completed ? 'completed' : 'incomplete'}`);
      fetchTasks();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const updateTask = async (id: string, title: string, description: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      toast.success('Task updated');
      fetchTasks();
    } catch {
      toast.error('Failed to update task');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Please sign in to view your tasks.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Smart Task Manager</h1>

        <div className="mb-8 space-y-3">
          <input
            type="text"
            placeholder="Task Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <button
            onClick={createTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Add Task
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleCompletion}
          onDelete={deleteTask}
          onSave={updateTask}
        />
      </div>
    </main>
  );
}
