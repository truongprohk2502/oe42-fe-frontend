import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { LOGIN_PAGE_PATH } from "../constants/routes";
import ErrorPage from "../pages/error-page";

function PrivateRoute({ component: Component, roles, ...restProps }) {
  const { token, role } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <Route
      {...restProps}
      render={(props) =>
        token ? (
          roles.includes(role) ? (
            <Component {...props} />
          ) : (
            <ErrorPage code="403" message={t("error.not_authorized_page")} />
          )
        ) : (
          <Redirect
            to={{
              pathname: LOGIN_PAGE_PATH,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
