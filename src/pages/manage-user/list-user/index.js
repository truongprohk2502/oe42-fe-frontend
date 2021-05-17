import React from "react";
import "./style.sass";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../../components/pagination";
import { getUsers, putActiveUser } from "../../../reducers/user";
import { LIMIT_USERS_PER_PAGE } from "../../../constants/limitRecord";
import PopConfirm from "../../../components/pop-confirm";
import { useTranslation } from "react-i18next";
import moment from "moment";

function ListUser(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, currentPage, totalPage } = useSelector((state) => state.user);

  return (
    <section className="list-user-container">
      <Table responsive striped bordered size="sm">
        <thead>
          <tr>
            <th>{t("label.number_order")}</th>
            <th>{t("label.username")}</th>
            <th>{t("label.fullname")}</th>
            <th>{t("label.address")}</th>
            <th>{t("label.role")}</th>
            <th>{t("label.status")}</th>
            <th>{t("label.created_at")}</th>
            <th>{t("label.action")}</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 &&
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  {user.isActive ? (
                    <span className="text-success">{t("label.activated")}</span>
                  ) : (
                    <span className="text-danger">
                      {t("label.not_activated")}
                    </span>
                  )}
                </td>
                <td>{moment(user.createdAt).format("HH:mm DD/MM/YYYY")}</td>
                <td>
                  <PopConfirm
                    title={user.isActive ? "Block" : "Activate"}
                    variant={user.isActive ? "danger" : "success"}
                    event={() =>
                      dispatch(
                        putActiveUser({
                          userId: user.id,
                          isActive: !user.isActive,
                        })
                      )
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <CustomPagination
        currentPage={currentPage}
        totalPage={totalPage}
        action={getUsers}
        limitRecords={LIMIT_USERS_PER_PAGE}
      />
    </section>
  );
}

export default ListUser;
