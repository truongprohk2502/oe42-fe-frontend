import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("validation_error.movie.name_null"),
  img: Yup.string().required("validation_error.movie.image_null"),
  trailer: Yup.string().required("validation_error.movie.trailer_null"),
  summary: Yup.string()
    .min(50, "validation_error.movie.summary.too_short")
    .max(1000, "validation_error.movie.summary.too_long")
    .required("validation_error.movie.summary.null"),
  runtime: Yup.number()
    .required("validation_error.movie.runtime.null")
    .integer("validation_error.movie.runtime.invalid"),
  category: Yup.string().required("validation_error.movie.category_null"),
  nation: Yup.string().required("validation_error.movie.nation_null"),
  producer: Yup.string().required("validation_error.movie.producer_null"),
  director: Yup.string().required("validation_error.movie.director_null"),
  actors: Yup.array().min(1, "validation_error.movie.actors_null"),
  publishedDate: Yup.string().required(
    "validation_error.movie.published_date_null"
  ),
  status: Yup.string().required("validation_error.movie.status_null"),
});
