import React from "react";
import "./style.sass";

function ErrorPage({ code, message }) {
  return (
    <section className="not-found-container">
      <div className="content-container">
        <div className="error-code">{code}</div>
        <div className="message">{message}</div>
      </div>
    </section>
  );
}

export default ErrorPage;
