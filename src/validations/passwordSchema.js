import * as Yup from "yup";

export default Yup.object().shape({
  oldPassword: Yup.string()
    .required("validation_error.password.null"),
  newPassword: Yup.string()
    .min(5, "validation_error.password.too_short")
    .max(20, "validation_error.password.too_long")
    .required("validation_error.password.null"),
  confirmPassword: Yup.string()
    .required("validation_error.password.confirm")
    .oneOf([Yup.ref("newPassword")], "validation_error.password.not_match"),
});
