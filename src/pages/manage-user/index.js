import React, { useEffect } from "react";
import "./style.sass";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useTranslation } from "react-i18next";
import PendingSpinner from "../../components/pending-spinner";
import { useDispatch, useSelector } from "react-redux";
import ListUser from "./list-user";
import AddUser from "./add-user";
import { MANAGE_USER_PAGES } from "../../constants/managePageState";
import { getUsers, setPageState } from "../../reducers/user";
import { LIMIT_USERS_PER_PAGE } from "../../constants/limitRecord";

function ManageUserPage(props) {
  const { pending, pageState } = useSelector(
    (state) => state.user
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ page: 1, limit: LIMIT_USERS_PER_PAGE }));
  }, [dispatch]);

  const handleAddButton = () => {
    dispatch(setPageState(MANAGE_USER_PAGES.ADD_USER));
  };

  return (
    <div className="manage-user-page-container">
      <Header />
      <div className="responsive-container">
        <main>
          {pageState === MANAGE_USER_PAGES.LIST_USERS && (
            <button className="add-btn" onClick={handleAddButton}>
              {t("common.button_title.add_user")}
            </button>
          )}
          {pageState === MANAGE_USER_PAGES.LIST_USERS ? (
            <ListUser />
          ) : pageState === MANAGE_USER_PAGES.ADD_USER ? (
            <AddUser />
          ) : null}
        </main>
        <Footer />
      </div>
      {pending && <PendingSpinner />}
    </div>
  );
}

export default ManageUserPage;
