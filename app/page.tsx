'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TaskCard from '../components/TaskCard'; 

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('http://localhost:4000/tasks')
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await axios.put(`http://localhost:4000/tasks/${id}`, { completed: !completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task completion:', error);
      alert('Failed to toggle task. Please try again.');
    }
  };

  const handleEdit = (task: Task) => {
    router.push(`/edit/${task.id}`);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-black p-6 flex flex-col items-center text-white">
      <h1 className="text-5xl font-bold mb-8 text-blue-500">Todo App</h1>
      {/* Task Summary */}
      <div className="w-full max-w-md flex justify-between mb-6 text-lg">
        <div>
          <span>Tasks: </span>
          <span className="font-bold">{totalTasks}</span>
        </div>
        <div>
          <span>Completed: </span>
          <span className="font-bold">{completedTasks} / {totalTasks}</span>
        </div>
      </div>

      {/* Create Task Button */}
      <button
        onClick={() => router.push('/create')}
        className="mb-6 px-8 py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
      >
        + Create Task
      </button>

      {/* List of tasks */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <div className="space-y-4 w-full max-w-md">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks available. Create a new task!</p>
      )}
    </div>
  );
}
