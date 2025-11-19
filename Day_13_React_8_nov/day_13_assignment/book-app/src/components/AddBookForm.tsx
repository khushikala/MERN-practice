import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addBook } from '../flux/Actions';
import dispatcher from '../flux/Dispatcher';

const AddBookSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  bio: Yup.string(),
  topBooks: Yup.string(),
});

interface AddBookFormProps {
  onBookAdded: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onBookAdded }) => {
  return (
    <Container className="py-4">
      <h2>Add New Book</h2>
      <Formik
        initialValues={{ title: '', author: '', price: 0, bio: '', topBooks: '' }}
        validationSchema={AddBookSchema}
        onSubmit={(values, { resetForm }) => {
          const bookData = {
            title: values.title,
            author: values.author,
            price: values.price,
            bio: values.bio,
            topBooks: values.topBooks ? values.topBooks.split(',').map(book => book.trim()) : [],
          };
          fetch('http://localhost:3004/books', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
          })
            .then(response => response.json())
            .then(newBook => {
              dispatcher.dispatch(addBook(newBook));
              resetForm();
              onBookAdded();
            })
            .catch(error => {
              console.error('Error adding book:', error);
            });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Field name="title" as={Form.Control} type="text" />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Field name="author" as={Form.Control} type="text" />
              <ErrorMessage name="author" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Field name="price" as={Form.Control} type="number" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </Form.Group>
             <Form.Group className="mb-3">

              <Form.Label>Bio</Form.Label>
              <Field name="bio" as={Form.Control} type="text" />
              <ErrorMessage name="bio" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Top Books</Form.Label>
              <Field name="topBooks" as={Form.Control} type="text" placeholder="Enter top books separated by commas" />
              <ErrorMessage name="topBooks" component="div" className="text-danger" />
            </Form.Group>

            <Button type="submit" disabled={isSubmitting}>
              Add Book
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddBookForm;
