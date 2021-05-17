import React from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";
import { Field, Formik, Form } from "formik";
import signUpSchema from "../../../validations/signUpSchema";
import { ROLES, TOKEN_LENGTH } from "../../../constants/common";
import { useDispatch } from "react-redux";
import { postUser } from "../../../reducers/user";
import { getRandomString } from "../../../utils/getRandomString";

function AddUser(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <section className="add-user-container">
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: "",
          fullName: "",
          address: "",
          role: ROLES.USER,
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          const { confirmPassword, ...restProps } = values;
          dispatch(
            postUser({
              ...restProps,
              token: getRandomString(TOKEN_LENGTH),
              createdAt: Date.now(),
              isActive: true,
            })
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-title">{t("common.list_title.add_user")}</div>
            <Field name="username">
              {({ field }) => (
                <div className="input-item">
                  <label htmlFor="username">{t("label.username")}:</label>
                  <input id="username" type="text" {...field} />
                </div>
              )}
            </Field>
            {errors.username && touched.username ? (
              <span>{t(errors.username)}</span>
            ) : null}
            <Field name="password">
              {({ field }) => (
                <div className="input-item">
                  <label htmlFor="password">{t("label.password")}:</label>
                  <input id="password" type="password" {...field} />
                </div>
              )}
            </Field>
            {errors.password && touched.password ? (
              <span>{t(errors.password)}</span>
            ) : null}
            <Field name="confirmPassword">
              {({ field }) => (
                <div className="input-item">
                  <label htmlFor="confirmPassword">{t("label.confirm")}:</label>
                  <input id="confirmPassword" type="password" {...field} />
                </div>
              )}
            </Field>
            {errors.confirmPassword && touched.confirmPassword ? (
              <span>{t(errors.confirmPassword)}</span>
            ) : null}
            <Field name="fullName">
              {({ field }) => (
                <div className="input-item">
                  <label htmlFor="fullName">{t("label.fullname")}:</label>
                  <input id="fullName" type="text" {...field} />
                </div>
              )}
            </Field>
            {errors.fullName && touched.fullName ? (
              <span>{t(errors.fullName)}</span>
            ) : null}
            <Field name="address">
              {({ field }) => (
                <div className="input-item">
                  <label htmlFor="address">{t("label.address")}:</label>
                  <input id="address" type="text" {...field} />
                </div>
              )}
            </Field>
            {errors.address && touched.address ? (
              <span>{t(errors.address)}</span>
            ) : null}
            <Field name="role">
              {({ field }) => (
                <div className="input-item">
                  <label htmlFor="role">{t("label.role")}:</label>
                  <select id="role" {...field}>
                    <option value={ROLES.USER}>User</option>
                    <option value={ROLES.ADMIN}>Admin</option>
                  </select>
                </div>
              )}
            </Field>
            {errors.role && touched.role ? <span>{t(errors.role)}</span> : null}
            <button type="submit">{t("common.button_title.add")}</button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default AddUser;
