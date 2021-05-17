import React from "react";
import "./style.sass";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HOME_PAGE_PATH } from "../../../constants/routes";

function OrderCongratulation(props) {
  const { t } = useTranslation();

  return (
    <section className="order-congratulation-container">
      <div className="title">{t("notification.congratulation")}</div>
      <div>
        <Link to={HOME_PAGE_PATH}>
          {t("common.list_title.back_to_homepage")}
        </Link>
      </div>
    </section>
  );
}

export default OrderCongratulation;
