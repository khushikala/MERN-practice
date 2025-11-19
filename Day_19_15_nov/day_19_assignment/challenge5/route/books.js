// routes/books.js
const express = require("express");
const router = express.Router();

let books= [{id:1 , title:"Master Express.js", author:"Azat Mardan"},
    {id:2, title:"Node.js",author:"Sebastian Springer"}
];

// GET all books
router.get("/", (req, res) => {
    res.json(books);
});

// POST - add new book
router.post("/", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: "Title and author required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json({ message: "Book added", book: newBook });
});

// PUT - update book
router.put("/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json({ message: "Book updated", book });
});

// DELETE - remove book
router.delete("/:id", (req, res) => {
    const bookId = parseInt(req.params.id);

    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json({ message: "Book deleted", book: deletedBook });
});

module.exports = router;
