import React, { useEffect, useLayoutEffect, useState } from "react";
import "./style.sass";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as routePath from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/auth";
import { ROLES } from "../../constants/common";

function Header(props) {
  const [language, setLanguage] = useState("vi");
  const [keyword, setKeyword] = useState("");
  const [showTopMenu, setShowTopMenu] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(true);
  const [showBottomButton, setShowBottomButton] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    setLanguage(localStorage.getItem("i18nextLng"));
  }, []);

  useLayoutEffect(() => {
    const resizeWindow = () => {
      const { innerWidth: width } = window;
      if (width < 576 && !showTopButton && !showBottomButton) {
        setShowTopButton(true);
        setShowBottomButton(true);
        setShowTopMenu(false);
        setShowBottomMenu(false);
      } else if (width >= 576 && showTopButton && showBottomButton) {
        setShowTopButton(false);
        setShowBottomButton(false);
        setShowTopMenu(true);
        setShowBottomMenu(true);
      }
    };
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [showTopButton, showBottomButton]);

  const handleClick = (type) => {
    if (type === "top") {
      setShowTopMenu(!showTopMenu);
    } else {
      setShowBottomMenu(!showBottomMenu);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim().length === 0) return;
    setKeyword("");
    history.push(routePath.FILM_PAGE_PATH + "?keyword=" + keyword.trim());
  };

  const changeLanguage = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <header>
      <nav className="top-header">
        {showTopButton && (
          <button className="menu-button" onClick={() => handleClick("top")}>
            <i className="fa fa-bars"></i>
          </button>
        )}
        {showTopMenu && (
          <ul>
            <li>
              <form onClick={handleSearch}>
                <input
                  type="text"
                  placeholder={t("header.top_header.search_placeholder")}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </li>
            {token ? (
              <>
                <li>
                  <Link to={routePath.PERSONAL_PAGE_PATH}>
                    {t("header.top_header.personal_account")}
                  </Link>
                </li>
                <li>
                  <a href={routePath.HOME_PAGE_PATH} onClick={handleLogout}>
                    {t("header.top_header.logout")}
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={{
                      pathname: routePath.LOGIN_PAGE_PATH,
                      state: { from: location },
                    }}
                  >
                    {t("header.top_header.login")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: routePath.REGISTER_PAGE_PATH,
                      state: { from: location },
                    }}
                  >
                    {t("header.top_header.register")}
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to={{
                  pathname: routePath.SUPPORT_PAGE_PATH,
                  state: { from: location },
                }}
              >
                {t("header.top_header.support")}
              </Link>
            </li>
            <li>
              <select value={language} onChange={changeLanguage}>
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
            </li>
          </ul>
        )}
      </nav>
      <section className="main-logo">
        <a href="/">
          <img
            src="http://www.lottecinemavn.com/LCHS/Image/logo_main.gif"
            alt="Lotte cinema"
          />
        </a>
      </section>
      <nav className="bottom-header">
        {showBottomButton && (
          <button className="menu-button" onClick={() => handleClick("bottom")}>
            <i className="fa fa-bars"></i>
          </button>
        )}
        {showBottomMenu &&
          (role === ROLES.ADMIN ? (
            <ul>
              <li>
                <Link
                  to={{
                    pathname: routePath.MANAGE_USER_PAGE_PATH,
                    state: { from: location },
                  }}
                >
                  {t("header.bottom_header.manage_user")}
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: routePath.MANAGE_MOVIE_PAGE_PATH,
                    state: { from: location },
                  }}
                >
                  {t("header.bottom_header.manage_movie")}
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: routePath.MANAGE_REVENUE_PAGE_PATH,
                    state: { from: location },
                  }}
                >
                  {t("header.bottom_header.manage_revenue")}
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: routePath.MANAGE_TICKET_PAGE_PATH,
                    state: { from: location },
                  }}
                >
                  {t("header.bottom_header.manage_ticket")}
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/gift">{t("header.bottom_header.gift_shop")}</Link>
              </li>
              <li>
                <Link to="/ticket">{t("header.bottom_header.buy_ticket")}</Link>
              </li>
              <li>
                <Link to="/film">{t("header.bottom_header.movie")}</Link>
              </li>
              <li>
                <Link to="/cinema">{t("header.bottom_header.cinema")}</Link>
              </li>
              <li>
                <Link to="/promotion">
                  {t("header.bottom_header.promotion")}
                </Link>
              </li>
            </ul>
          ))}
      </nav>
    </header>
  );
}

export default Header;
