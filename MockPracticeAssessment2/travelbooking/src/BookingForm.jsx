import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useFormSubmit from './useFormSubmit';

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  packageId: Yup.string().required('Package selection is required'),
  date: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
});

function BookingForm() {
  const submitBooking = useFormSubmit();

  const handleSubmit = async (values) => {
    await submitBooking(values);
    console.log('Booking submitted:', values);
    alert('Booking submitted successfully!');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Book Your Trip</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <div className="booking-form-container">
            <Formik
            initialValues={{ name: '', email: '', phone: '', packageId: '', date: '' }}
            validationSchema={BookingSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <Field type="text" name="phone" className="form-control" />
                  <ErrorMessage name="phone" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="packageId" className="form-label">Select Package</label>
                  <Field as="select" name="packageId" className="form-control">
                    <option value="">Choose a package</option>
                    <option value="1">Paris Getaway</option>
                    <option value="2">Tokyo Adventure</option>
                    <option value="3">New York Trip</option>
                  </Field>
                  <ErrorMessage name="packageId" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Travel Date</label>
                  <Field type="date" name="date" className="form-control" />
                  <ErrorMessage name="date" component="div" className="text-danger" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  Book Now
                </button>
              </Form>
            )}
          </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
