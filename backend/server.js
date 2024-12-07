const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'postgres-service',
    database: 'tasks',
    password: 'password',
    port: 5432,
});

// Create tasks table
pool.query(
    `CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL
    );`
);

// Get all tasks
app.get('/tasks', async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
});

// Add a task
app.post('/tasks', async (req, res) => {
    const { title } = req.body;
    const result = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [title]);
    res.json(result.rows[0]);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
});

app.listen(5000, () => {
    console.log('Backend is running on port 5000');
});

