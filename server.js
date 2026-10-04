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
    {
        id: 1,
        title: 'Welcome to the blog',
        author: 'Admin'
    },
    {
        id: 2,
        title: 'My first Express server',
        author: 'Aya'
    },
    {
        id: 3,
        title: 'Testing an API with Postman',
        author: 'Aya'
    }
];

app.get('/api/articles', (req, res) => {

    const { author } = req.query;

    let result = articles;

    // Si author est fourni, on filtre
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

    // Vérification des données
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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});