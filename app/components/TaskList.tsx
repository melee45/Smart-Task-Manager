'use client';

import TaskItem from './TaskItem';

type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

interface Props {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onSave: (id: string, title: string, description: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onSave }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">No tasks to display.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onSave={onSave}
        />
      ))}
    </ul>
  );
}
