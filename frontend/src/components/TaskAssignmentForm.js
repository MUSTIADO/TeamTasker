import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const TaskAssignmentForm = ({ onSubmit }) => {
  const initialValues = {
    task_id: '',
    user_id: '',
    role: '',
    status: '',
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
            <label htmlFor="task_id">Task ID:</label>
            <Field type="text" id="task_id" name="task_id" />
            <ErrorMessage name="task_id" component="div" />
          </div>
          <div>
            <label htmlFor="user_id">User ID:</label>
            <Field type="text" id="user_id" name="user_id" />
            <ErrorMessage name="user_id" component="div" />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <Field type="text" id="role" name="role" />
            <ErrorMessage name="role" component="div" />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <Field as="select" id="status" name="status">
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Field>
            <ErrorMessage name="status" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskAssignmentForm;
