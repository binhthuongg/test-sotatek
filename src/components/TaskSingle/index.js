import React, { useState } from "react";
import { StyledComponent } from "./styles";
import { Form, Field } from "react-final-form";
import DatePicker from "react-datepicker";

function TaskSingle(props) {
  const onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <StyledComponent>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <label>Title</label>
                  <input {...input} type="text" placeholder="Add new task" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>Description</label>
                  <textarea {...input} type="textarea" rows="10" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="row">
              <div className="col-sm-6">
                <Field name="dueDate">
                  {({ input, meta }) => (
                    <div>
                      <label>Due date</label>
                      <DatePicker {...input} selected={startDate} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="col-sm-6">
                <Field name="priority" component="select">
                  <option value="low"> low</option>
                  <option value="normal"> normal</option>
                  <option value="high"> high</option>
                </Field>
              </div>
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      />
    </StyledComponent>
  );
}

export default TaskSingle;
