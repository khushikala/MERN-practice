import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const AddProductSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  price: Yup.number().positive('Must be positive').required('Required'),
  category: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Add New Product</h2>
      <Formik
        initialValues={{ name: '', price: '', category: '', description: '' }}
        validationSchema={AddProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          addProduct(values);
          setSubmitting(false);
          navigate('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <Field name="price" type="number" className="form-control" />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <Field name="category" type="text" className="form-control" />
              <ErrorMessage name="category" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <Field as="textarea" name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
