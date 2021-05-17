import React, { useEffect, useLayoutEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { getPromotions } from "../../../reducers/promotion";
import { Link } from "react-router-dom";
import * as routePath from "../../../constants/routes";
import { LIMIT_PROMOTION_PER_PAGE } from "../../../constants/limitRecord";
import CustomPagination from "../../../components/pagination";
import { useTranslation } from "react-i18next";

function PromotionList(props) {
  const dispatch = useDispatch();
  const { promotions, currentPage, totalPage } = useSelector(
    (state) => state.promotion
  );

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getPromotions({ page: 1, limit: LIMIT_PROMOTION_PER_PAGE }));
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section className="list-promotion-container">
      <div className="promotion-title">{t("common.list_title.promotion")}</div>
      <div className="promotion-item-container">
        {promotions.length &&
          promotions.map((promotion) => (
            <Link
              to={routePath.PROMOTION_PAGE_PATH + "/" + promotion.id}
              key={promotion.id}
            >
              <article className="promotion-item">
                <img src={promotion.img} alt={promotion.title} />
                <div className="info">
                  <h5>{promotion.title}</h5>
                  <p>{promotion.description}</p>
                  <span>{t("common.button_title.detail")}</span>
                </div>
              </article>
            </Link>
          ))}
      </div>
      <div className="pagination-section">
        <CustomPagination
          currentPage={currentPage}
          totalPage={totalPage}
          action={getPromotions}
          limitRecords={LIMIT_PROMOTION_PER_PAGE}
        />
      </div>
    </section>
  );
}

export default PromotionList;
