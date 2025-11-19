import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import AuthorInfo from '../components/AuthorInfo';
import WithLoading from '../components/WithLoading';

type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  bio: string;
  topBooks: string[];
};

const AuthorInfoWithLoading = WithLoading(AuthorInfo);

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3004/books/${id}`)
        .then(response => response.json())
        .then(data => {
          setBook(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching book details:', error);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (!book && !isLoading) {
    return <Container className="py-4"><h2>Book not found</h2></Container>;
  }

  return (
    <Container className="py-4 fade-in">
      <Link to="/home">
        <Button variant="secondary" className="mb-3">Back to Home</Button>
      </Link>
      {book && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
            <Card.Text><strong>Price:</strong> ${book.price}</Card.Text>
          </Card.Body>
        </Card>
      )}
      {book && (
        <AuthorInfoWithLoading
          isLoading={isLoading}
          author={book.author}
          bio={book.bio}
          topBooks={book.topBooks}
        />
      )}
    </Container>
  );
}

export default BookDetails;
