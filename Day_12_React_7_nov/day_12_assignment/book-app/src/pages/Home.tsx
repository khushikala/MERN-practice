import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import WithLoading from '../components/WithLoading';
import RenderPropsComponent from '../components/RenderPropsComponent';

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  bio: string;
  topBooks: string[];
};

const BookCardWithLoading = WithLoading(BookCard);

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('http://localhost:3004/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setIsLoading(false);
      });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <Container className="py-4 fade-in">
      <RenderPropsComponent
        render={({ message }) => <h1 className="mb-4">{message}</h1>}
      />
      <Form.Control
        ref={searchInputRef}
        type="text"
        placeholder="Search books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />
      <Button onClick={handleFocusSearch} className="mb-3">Focus Search</Button>
      <Row>
        {filteredBooks.map((book) => (
          <Col key={book.id} md={4} className="mb-3">
            <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
              <BookCardWithLoading
                isLoading={isLoading}
                title={book.title}
                author={book.author}
                price={book.price}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
