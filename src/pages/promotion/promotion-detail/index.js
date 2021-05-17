import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailPromotion } from "../../../reducers/promotion";
import "./style.sass";

function PromotionDetail(props) {
  const dispatch = useDispatch();
  const { selectedPromotion } = useSelector((state) => state.promotion);
  const { promotionId } = useParams();

  useEffect(() => {
    dispatch(getDetailPromotion(promotionId));
  }, [dispatch, promotionId]);

  return (
    <section className="promotion-detail-container">
      <h3>{selectedPromotion.title}</h3>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: selectedPromotion.detail?.join("") }}
      ></div>
    </section>
  );
}

export default PromotionDetail;
