import React from 'react';

const TaskList = ({ tasks, deleteTask }) => (
    <ul>
        {tasks.map((task) => (
            <li key={task.id}>
                {task.title}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
        ))}
    </ul>
);

export default TaskList;

