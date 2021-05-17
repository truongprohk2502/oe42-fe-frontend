import * as Yup from "yup";

export default Yup.object().shape({
  fullName: Yup.string().required("validation_error.fullname_null"),
  address: Yup.string().required("validation_error.address_null"),
});
