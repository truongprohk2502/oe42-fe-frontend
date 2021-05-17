import React, { useEffect } from "react";
import "./style.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as routePath from "./constants/routes";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./reducers/auth";
import PrivateRoute from "./routes/privateRoute";
import { ToastContainer } from "react-toastify";
import { ROLES } from "./constants/common";
import { useTranslation } from "react-i18next";
import HomePage from "./pages/home";
import PromotionPage from "./pages/promotion";
import NewsPage from "./pages/news";
import FilmPage from "./pages/film";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PersonalInfoPage from "./pages/personal-info";
import OrderTicketPage from "./pages/order-ticket";
import SupportPage from "./pages/support";
import ErrorPage from "./pages/error-page";
import ManageUserPage from "./pages/manage-user";
import ManageMoviePage from "./pages/manage-movie";
import ManageTicketPage from "./pages/manage-ticket";
import ManageRevenuePage from "./pages/manage-revenue";

function App(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserInfo(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Switch>
          <Route exact path={routePath.HOME_PAGE_PATH} component={HomePage} />
          <Route
            path={routePath.PROMOTION_PAGE_PATH}
            component={PromotionPage}
          />
          <Route path={routePath.REVIEW_PAGE_PATH} component={NewsPage} />
          <Route path={routePath.BLOG_PAGE_PATH} component={NewsPage} />
          <Route path={routePath.FILM_PAGE_PATH} component={FilmPage} />
          <Route
            exact
            path={routePath.SUPPORT_PAGE_PATH}
            component={SupportPage}
          />
          <Route exact path={routePath.LOGIN_PAGE_PATH} component={LoginPage} />
          <Route
            exact
            path={routePath.REGISTER_PAGE_PATH}
            component={RegisterPage}
          />
          <PrivateRoute
            path={routePath.PERSONAL_PAGE_PATH}
            component={PersonalInfoPage}
            roles={[ROLES.ADMIN, ROLES.USER]}
          />
          <PrivateRoute
            exact
            path={routePath.ORDER_TICKET_PAGE_PATH + "/:scheduleId"}
            component={OrderTicketPage}
            roles={[ROLES.ADMIN, ROLES.USER]}
          />
          <PrivateRoute
            path={routePath.MANAGE_USER_PAGE_PATH}
            component={ManageUserPage}
            roles={[ROLES.ADMIN]}
          />
          <PrivateRoute
            path={routePath.MANAGE_MOVIE_PAGE_PATH}
            component={ManageMoviePage}
            roles={[ROLES.ADMIN]}
          />
          <PrivateRoute
            path={routePath.MANAGE_TICKET_PAGE_PATH}
            component={ManageTicketPage}
            roles={[ROLES.ADMIN]}
          />
          <PrivateRoute
            path={routePath.MANAGE_REVENUE_PAGE_PATH}
            component={ManageRevenuePage}
            roles={[ROLES.ADMIN]}
          />
          <Route path="*">
            <ErrorPage code="404" message={t("error.not_found_page")} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
