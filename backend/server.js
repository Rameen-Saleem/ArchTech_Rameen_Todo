const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory storage for todos (in a real app, you'd use a database)
let todos = [
    { id: 1, text: 'Learn Express.js', completed: false },
    { id: 2, text: 'Build a todo app', completed: true }
];

// API Routes
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Todo text is required' });
    }
    
    const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed, text } = req.body;
    
    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    if (completed !== undefined) {
        todo.completed = completed;
    }
    
    if (text !== undefined) {
        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Todo text is required' });
        }
        todo.text = text.trim();
    }
    
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos.splice(index, 1);
    res.status(204).send();
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 