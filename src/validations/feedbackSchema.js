import * as Yup from "yup";

export default Yup.object().shape({
  fullName: Yup.string().required("validation_error.fullname_null"),
  email: Yup.string()
    .email("validation_error.email.invalid")
    .required("validation_error.email.null"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "validation_error.phone.invalid")
    .required("validation_error.phone.null"),
  content: Yup.string()
    .min(20, "validation_error.content.too_short")
    .max(1000, "validation_error.content.too_long")
    .required("validation_error.content.null"),
});
