'use client';

import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

const readableColors: Record<string, string> = {
  red: '#ff7f7f', 
  green: '#90ee90', 
  blue: '#87cefa', 
};

export default function TaskCard({ task, onEdit, onDelete, onToggle }: TaskCardProps) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-lg shadow mb-2"
      style={{ backgroundColor: readableColors[task.color] || '#333' }} 
    >
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          className="w-6 h-6 text-green-500 cursor-pointer"
        />
        <span
          className={`text-lg font-medium ${
            task.completed ? 'line-through text-gray-400' : 'text-white'
          }`}
        >
          {task.title}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="text-white hover:text-gray-300"
        >
          <FiEdit size={20} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-white hover:text-gray-300"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
}
