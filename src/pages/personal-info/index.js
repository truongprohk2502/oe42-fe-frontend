import React from "react";
import "./style.sass";
import Footer from "../../components/footer";
import Header from "../../components/header";
import personalInfoSchema from "../../validations/personalInfoSchema";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import passwordSchema from "../../validations/passwordSchema";
import { useDispatch, useSelector } from "react-redux";
import { putPassword, putPersonalInfo } from "../../reducers/auth";
import PendingSpinner from "../../components/pending-spinner";

function PersonalInfoPage(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, token, pending } = useSelector((state) => state.auth);

  return (
    <div className="personal-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          <Formik
            enableReinitialize
            initialValues={{
              fullName: user.fullName || "",
              address: user.address || "",
            }}
            validationSchema={personalInfoSchema}
            onSubmit={(values) => {
              const { fullName, address } = values;
              const { id, ...restProps } = user;
              dispatch(
                putPersonalInfo({
                  id,
                  info: { ...restProps, token, fullName, address },
                })
              );
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-title">
                  {t("common.list_title.personal_info")}
                </div>
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
                <button type="submit">{t("common.button_title.update")}</button>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={(values, actions) => {
              const { oldPassword, newPassword } = values;
              dispatch(
                putPassword({
                  oldPassword,
                  info: { ...user, password: newPassword, token },
                })
              );
              actions.resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-title">
                  {t("common.list_title.change_password")}
                </div>
                <Field name="oldPassword">
                  {({ field }) => (
                    <div className="input-item">
                      <label htmlFor="oldPassword">
                        {t("label.old_pass")}:
                      </label>
                      <input id="oldPassword" type="password" {...field} />
                    </div>
                  )}
                </Field>
                {errors.oldPassword && touched.oldPassword ? (
                  <span>{t(errors.oldPassword)}</span>
                ) : null}
                <Field name="newPassword">
                  {({ field }) => (
                    <div className="input-item">
                      <label htmlFor="newPassword">
                        {t("label.new_pass")}:
                      </label>
                      <input id="newPassword" type="password" {...field} />
                    </div>
                  )}
                </Field>
                {errors.newPassword && touched.newPassword ? (
                  <span>{t(errors.newPassword)}</span>
                ) : null}
                <Field name="confirmPassword">
                  {({ field }) => (
                    <div className="input-item">
                      <label htmlFor="confirmPassword">
                        {t("label.confirm")}:
                      </label>
                      <input id="confirmPassword" type="password" {...field} />
                    </div>
                  )}
                </Field>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <span>{t(errors.confirmPassword)}</span>
                ) : null}
                <button type="submit">{t("common.button_title.update")}</button>
              </Form>
            )}
          </Formik>
        </main>
        <Footer />
      </div>
      {pending && <PendingSpinner />}
    </div>
  );
}

export default PersonalInfoPage;
