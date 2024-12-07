import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('/tasks');
        const data = await res.json();
        setTasks(data);
    };

    const addTask = async (title) => {
        const res = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
    };

    const deleteTask = async (id) => {
        await fetch(`/tasks/${id}`, { method: 'DELETE' });
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} />
        </div>
    );
};

export default App;

