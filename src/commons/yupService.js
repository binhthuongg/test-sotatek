import { setIn } from "final-form";

export const validate = (values, validationSchema) => {
  return validationSchema
    .validate(values, { abortEarly: false })
    .then(() => {
      return;
    })
    .catch(err => {
      const errors = err.inner.reduce((formError, innerError) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});

      console.log("errors", errors);

      return errors;
    });
};
