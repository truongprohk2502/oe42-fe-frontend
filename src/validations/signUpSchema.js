import * as Yup from "yup";

export default Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z_]/,
      "validation_error.username.not_start_with_alpha_character"
    )
    .matches(
      /^[a-zA-Z0-9]*$/,
      "validation_error.username.contain_special_character"
    )
    .min(5, "validation_error.username.too_short")
    .max(20, "validation_error.username.too_long")
    .required("validation_error.username.null"),
  password: Yup.string()
    .min(5, "validation_error.password.too_short")
    .max(20, "validation_error.password.too_long")
    .required("validation_error.password.null"),
  confirmPassword: Yup.string()
    .required("validation_error.password.confirm")
    .oneOf([Yup.ref("password")], "validation_error.password.not_match"),
  fullName: Yup.string().required("validation_error.fullname_null"),
  address: Yup.string().required("validation_error.address_null"),
});
