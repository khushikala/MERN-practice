import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import BookCard from "./BookCard";
import AuthorInfo from "./AuthorInfo";

// some books data with author details
const books = [
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

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            selectedAuthor: null,
            viewMode: "grid"
        };
        this.searchInputRef = React.createRef();
    }

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleBookClick = (book) => {
        this.setState({ selectedAuthor: book });
    };

    handleFocusSearch = () => {
        if (this.searchInputRef.current) {
            this.searchInputRef.current.focus();
        }
    };

    setViewMode = (mode) => {
        this.setState({ viewMode: mode });
    };

    render() {
        const { searchTerm, selectedAuthor, viewMode } = this.state;

        // filter books
        const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div>
                <Form.Control
                    ref={this.searchInputRef}
                    type="text"
                    placeholder="Search books"
                    value={searchTerm}
                    onChange={this.handleSearchChange}
                    className="mb-3"
                />
                <div className="mb-3">
                    <Button onClick={() => this.setViewMode("grid")} variant={viewMode === "grid" ? "primary" : "outline-primary"} className="me-2">Grid</Button>
                    <Button onClick={() => this.setViewMode("list")} variant={viewMode === "list" ? "primary" : "outline-primary"} className="me-2">List</Button>
                    <Button onClick={this.handleFocusSearch}>Focus Search</Button>
                </div>
                {viewMode === "grid" ? (
                    <Row>
                        {filteredBooks.map((book, index) => (
                            <Col key={index} md={4} className="mb-3">
                                <BookCard
                                    title={book.title}
                                    author={book.author}
                                    price={book.price}
                                    viewMode="grid"
                                    onClick={() => this.handleBookClick(book)}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="list-group">
                        {filteredBooks.map((book, index) => (
                            <BookCard
                                key={index}
                                title={book.title}
                                author={book.author}
                                price={book.price}
                                viewMode="list"
                                onClick={() => this.handleBookClick(book)}
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
}

BookList.propTypes = {
    // Add if needed
};

export default BookList;
