import React, { useState, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import BookCard from "./BookCard";
import AuthorInfo from "./AuthorInfo";

type Book = {
    title: string;
    author: string;
    price: number;
    bio: string;
    topBooks: string[];
};

// some books data with author details
const books: Book[] = [
    {
        title: "JAVA",
        author: "Author J",
        price: 1000,
        bio: "Author J is a renowned software engineer with over 20 years of experience in Java development.",
        topBooks: ["Java Fundamentals", "Advanced Java", "Java Design Patterns"]
    },
    {
        title: "REACT",
        author: "Author R",
        price: 500,
        bio: "Author R is a frontend expert specializing in React and modern web technologies.",
        topBooks: ["React Basics", "Advanced React", "React Hooks Guide"]
    },
    {
        title: "MySQL",
        author: "Author S",
        price: 200,
        bio: "Author S is a database administrator and SQL expert with extensive experience in MySQL.",
        topBooks: ["MySQL Essentials", "Database Design", "SQL Optimization"]
    },
];

function BookList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState<Book | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const searchInputRef = useRef<HTMLInputElement>(null);

    // filter books
    const filterBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookClick = (book: Book) => {
        setSelectedAuthor(book);
    };

    const handleFocusSearch = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <div>
            <Form.Control
                ref={searchInputRef}
                type="text"
                placeholder="Search books"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
            />
            <div className="mb-3">
                <Button onClick={() => setViewMode("grid")} variant={viewMode === "grid" ? "primary" : "outline-primary"} className="me-2">Grid</Button>
                <Button onClick={() => setViewMode("list")} variant={viewMode === "list" ? "primary" : "outline-primary"} className="me-2">List</Button>
                <Button onClick={handleFocusSearch}>Focus Search</Button>
            </div>
            {viewMode === "grid" ? (
                <Row>
                    {filterBooks.map((book, index) => (
                        <Col key={index} md={4} className="mb-3">
                            <BookCard
                                title={book.title}
                                author={book.author}
                                price={book.price}
                                viewMode="grid"
                                onClick={() => handleBookClick(book)}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="list-group">
                    {filterBooks.map((book, index) => (
                        <BookCard
                            key={index}
                            title={book.title}
                            author={book.author}
                            price={book.price}
                            viewMode="list"
                            onClick={() => handleBookClick(book)}
                        />
                    ))}
                </div>
            )}
            {selectedAuthor && (
                <AuthorInfo
                    author={selectedAuthor.author}
                    bio={selectedAuthor.bio}
                    topBooks={selectedAuthor.topBooks}
                />
            )}
        </div>
    );
}

export default BookList;
