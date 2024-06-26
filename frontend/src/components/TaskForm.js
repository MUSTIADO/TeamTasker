import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TaskForm = ({ onSubmit }) => {
  const initialValues = {
    title: '',
    description: '',
    status: '',
    project_id: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title:</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <Field type="text" id="description" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <Field as="select" id="status" name="status">
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Field>
            <ErrorMessage name="status" component="div" />
          </div>
          <div>
            <label htmlFor="project_id">Project ID:</label>
            <Field type="text" id="project_id" name="project_id" />
            <ErrorMessage name="project_id" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
