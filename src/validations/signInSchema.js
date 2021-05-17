import * as Yup from "yup";

export default Yup.object().shape({
  username: Yup.string().required("validation_error.username.null"),
  password: Yup.string().required("validation_error.password.null"),
});
