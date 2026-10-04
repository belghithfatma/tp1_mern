const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, I am the blog API'
    });
});

const articles = [
    { id: 1, title: 'Welcome to the blog', author: 'Admin' },
    { id: 2, title: 'My first Express server', author: 'Aya' },
    { id: 3, title: 'Testing an API with Postman', author: 'Aya' }
];

app.get('/api/articles', (req, res) => {
    const { author } = req.query;

    let result = articles;

    if (author) {
        result = articles.filter(article => article.author === author);
    }

    res.json({
        total: result.length,
        articles: result
    });
});

app.get('/api/articles/:id', (req, res) => {
    const id = Number(req.params.id);

    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({
            error: `Article ${id} not found`
        });
    }

    res.json(article);
});

let nextId = 4;

app.post('/api/articles', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            error: 'Title and author are required'
        });
    }

    const newArticle = {
        id: nextId,
        title: title,
        author: author
    };

    nextId = nextId + 1;
    articles.push(newArticle);

    res.status(201).json({
        message: 'Article created',
        article: newArticle
    });
});

app.get('/about', (req, res) => {
    res.json({
        application: 'App blog',
        auteur: 'Fatma Belghith',
        version: '1.1.0'
    });
});

const users = [
    { id: 1, name: 'Yosra', email: 'yosra@gmail.com' },
    { id: 2, name: 'Aymen', email: 'aymen@gmail.com' },
    { id: 3, name: 'Dorra', email: 'dorra@gmail.com' }
];

app.get('/api/users', (req, res) => {
    const { name } = req.query;

    let result = users;

    if (name) {
        result = users.filter(u => u.name === name);
    }

    res.json({
        total: result.length,
        users: result
    });
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
    }

    res.json(user);
});

app.post('/contact', (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ error: "L'email et le message sont obligatoires" });
    }

    res.status(200).json({ message: 'Merci, votre message a bien été reçu' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});