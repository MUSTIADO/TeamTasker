import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProjectForm = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Project name is required'),
    description: Yup.string().required('Project description is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
