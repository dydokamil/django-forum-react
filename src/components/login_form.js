// import React from "react";
// import { Field, reduxForm } from "redux-form";
// import { loginAction } from "../actions";
//
// const validate = values => {
//   const errors = {};
//   if (!values.username) {
//     errors.username = "Required";
//   } else if (values.username.length > 20) {
//     errors.username = "Must be 20 characters or less.";
//   }
//   if (!values.password) {
//     errors.password = "Required";
//     // } else if (values.password.length > 2048) {
//     // errors.password = "Can't be longer than 2048 characters.";
//     // } else if (values.password.length < 8) {
//     // errors.password = "Can't be shorter than 8 characters.";
//   }
//   return errors;
// };
//
// const renderField = ({
//   input,
//   label,
//   type,
//   meta: { touched, error, warning }
// }) => (
//   <div className="form-group">
//     <label>{label}</label>
//     <div>
//       <input
//         {...input}
//         placeholder={label}
//         type={type}
//         className="form-control"
//       />
//       {touched &&
//         ((error && <span className="text-danger">{error}</span>) ||
//           (warning && <span className="text-danger">{warning}</span>))}
//     </div>
//   </div>
// );
//
// const submit = values2 => {
//   // console.log("VALUES2values);
//   loginAction(values2);
// };
//
// const SyncValidationForm = props => {
//   const { handleSubmit, pristine, reset, submitting } = props;
//   return (
//     <form onSubmit={handleSubmit(submit)}>
//       {/* <form onSubmit={() => handleSubmit(submit)}> */}
//       <Field
//         name="username"
//         type="text"
//         component={renderField}
//         label="Username"
//       />
//       <Field
//         name="password"
//         type="password"
//         component={renderField}
//         label="Password"
//       />
//       <div>
//         <button type="submit" className="btn btn-success" disabled={submitting}>
//           Submit
//         </button>
//         <button
//           type="button"
//           className="btn btn-warning"
//           disabled={pristine || submitting}
//           onClick={reset}
//         >
//           Clear Values
//         </button>
//       </div>
//     </form>
//   );
// };
//
// export default reduxForm({
//   form: "syncValidation" // a unique identifier for this form
//   // validate // <--- validation function given to redux-form
// })(SyncValidationForm);

import React from "react";
import { Field, reduxForm } from "redux-form";
import { loginAction } from "../actions";
import { connect } from "react-redux";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

// function submit(values) {
// console.log("ntaoriesnt", values);
// }

const SubmitValidationForm = props => {
  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
    loginAction
  } = props;

  return (
    <form onSubmit={handleSubmit(loginAction)}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Log In
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default connect(null, { loginAction })(
  reduxForm({ form: "loginform" })(SubmitValidationForm)
);
