import React from "react";
import "./style.sass";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import feedbackSchema from "../../validations/feedbackSchema";
import PendingSpinner from "../../components/pending-spinner";
import { useDispatch, useSelector } from "react-redux";
import { postFeedback } from "../../reducers/feedback";

function SupportPage(props) {
  const { pending } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="support-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          <div className="support-title">
            {t("common.list_title.feedback_question")}
          </div>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phone: "",
              content: "",
            }}
            validationSchema={feedbackSchema}
            onSubmit={(values) => {
              dispatch(postFeedback(values));
            }}
          >
            <Form className="feedback-form">
              <Field name="fullName">
                {({ field, meta }) => (
                  <div className="input-item" id="fullname">
                    <input
                      {...field}
                      type="text"
                      placeholder={t("placeholder.full_name")}
                    />
                    {meta.touched && meta.error && (
                      <span className="error">{t(meta.error)}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="email">
                {({ field, meta }) => (
                  <div className="input-item" id="email">
                    <input
                      {...field}
                      type="text"
                      placeholder={t("placeholder.email")}
                    />
                    {meta.touched && meta.error && (
                      <span className="error">{t(meta.error)}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="phone">
                {({ field, meta }) => (
                  <div className="input-item" id="phone">
                    <input
                      {...field}
                      type="text"
                      placeholder={t("placeholder.phone")}
                    />
                    {meta.touched && meta.error && (
                      <span className="error">{t(meta.error)}</span>
                    )}
                  </div>
                )}
              </Field>
              <Field name="content">
                {({ field, meta }) => (
                  <div className="textarea-item" id="content">
                    <textarea
                      {...field}
                      rows={8}
                      placeholder={t("placeholder.content")}
                    ></textarea>
                    {meta.touched && meta.error && (
                      <span className="error">{t(meta.error)}</span>
                    )}
                  </div>
                )}
              </Field>
              <div className="button-bound">
                <button type="submit">{t("common.button_title.send")}</button>
              </div>
            </Form>
          </Formik>
        </main>
        <Footer />
      </div>
      {pending && <PendingSpinner />}
    </div>
  );
}

export default SupportPage;
