import React from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ORDER_PAGE_STATES } from "../../../constants/orderTicket";
import { postOrder, setPageState, cancelOrder } from "../../../reducers/order";
import { useTranslation } from "react-i18next";

function OrderPayment({ ticketTypes, services }) {
  const { user } = useSelector((state) => state.auth);
  const { selectedSeats, countdown } = useSelector((state) => state.order);
  const { selectedSchedule } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      paymentType: paymentTypeElement,
      fullName: fullNameElement,
      address: addressElement,
    } = e.target.elements;
    const paymentType = paymentTypeElement.value.trim();
    const fullName = fullNameElement.value.trim();
    const address = addressElement.value.trim();
    if (paymentType.length && fullName.length && address.length) {
      const { roomId, cinemaId, movieId, date } = selectedSchedule;
      dispatch(
        postOrder({
          scheduleId: selectedSchedule.id,
          data: {
            accountId: user.id,
            userInfo: { paymentType, fullName, address },
            seats: selectedSeats.map((seat) => ({ seat, userId: user.id })),
            ticketTypes: ticketTypes
              .filter((item) => item.quantity)
              .map((item) => ({ id: item.id, quantity: item.quantity })),
            services: services
              .filter((item) => item.quantity)
              .map((item) => ({ id: item.id, quantity: item.quantity })),
            roomId,
            cinemaId,
            movieId,
            date,
          },
        })
      );
    } else {
      toast.error(t("error.payment_lost_info"));
    }
  };

  const getTime = (time) => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <section className="order-payment-container">
      <div className="order-main-title">
        <span>{t("common.list_title.payment")}</span>
        <span>{getTime(countdown)}</span>
      </div>
      <div className="payment-container">
        <form onSubmit={handleSubmit}>
          <div className="payment-item">
            <div className="label">
              <label>{t("label.payment_type")}:&nbsp;</label>
            </div>
            <div className="input">
              <select name="paymentType">
                <option value="offline">
                  {t("select_option.offline_payment")}
                </option>
                <option value="online">
                  {t("select_option.online_payment")}
                </option>
              </select>
            </div>
          </div>
          <div className="payment-item">
            <div className="label">
              <label>{t("label.fullname")}:&nbsp;</label>
            </div>
            <div className="input">
              <input name="fullName" type="text" defaultValue={user.fullName} />
            </div>
          </div>
          <div className="payment-item">
            <div className="label">
              <label>{t("label.address")}:&nbsp;</label>
            </div>
            <div className="input">
              <input name="address" type="text" defaultValue={user.address} />
            </div>
          </div>
          <div className="button-item">
            <div>
              <button
                type="submit"
                disabled={countdown === 0 && selectedSeats.length === 0}
              >
                {t("common.button_title.payment")}
              </button>
              <button
                type="button"
                onClick={
                  countdown === 0 && selectedSeats.length === 0
                    ? () => dispatch(setPageState(ORDER_PAGE_STATES.ORDER_SEAT))
                    : () => dispatch(cancelOrder())
                }
              >
                {countdown === 0 && selectedSeats.length === 0
                  ? t("common.button_title.prev")
                  : t("common.button_title.cancel")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default OrderPayment;
