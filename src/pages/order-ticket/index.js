import React, { useEffect, useState } from "react";
import "./style.sass";
import Header from "../../components/header";
import Footer from "../../components/footer";
import OrderTypeAndFood from "./order-type-and-food";
import { ORDER_PAGE_STATES } from "../../constants/orderTicket";
import { formatCurrency } from "../../utils/formatCurrency";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailSchedule, putSelectingSeats } from "../../reducers/schedule";
import { useTranslation } from "react-i18next";
import {
  getServices,
  getTicketTypes,
  resetOrder,
  setPageState,
} from "../../reducers/order";
import { getScheduleDate } from "../../utils/getScheduleDate";
import PendingSpinner from "../../components/pending-spinner";
import { toast } from "react-toastify";
import OrderSeat from "./order-seat";
import OrderPayment from "./order-payment";
import OrderCongratulation from "./order-congratulation";
import NotFound from "../../components/not-found";
import ProgressBar from "../../components/progress-bar";
import { ORDER_PROGRESSES } from "../../constants/common";

function OrderTicketPage(props) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [services, setServices] = useState([]);

  const { scheduleId } = useParams();
  const dispatch = useDispatch();
  const { selectedSchedule, pendingSeat } = useSelector(
    (state) => state.schedule
  );
  const { user } = useSelector((state) => state.auth);
  const {
    ticketTypes: initTicketTypes,
    services: initServices,
    pendingTicketTypes,
    pendingServices,
    selectedSeats,
    pageState,
  } = useSelector((state) => state.order);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailSchedule(scheduleId));
    dispatch(getTicketTypes());
    dispatch(getServices());

    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch, scheduleId]);

  useEffect(() => {
    setTicketTypes(
      initTicketTypes.map((type) => ({
        ...type,
        quantity: 0,
      }))
    );
  }, [initTicketTypes]);

  useEffect(() => {
    setServices(
      initServices.map((service) => ({
        ...service,
        quantity: 0,
      }))
    );
  }, [initServices]);

  const getTotal = (arr) =>
    arr.reduce((total, item) => total + item.quantity * item.unitPrice, 0);

  const getCombo = (services) =>
    services
      .filter((service) => service.quantity !== 0)
      .map((service) => `${service.name}(${service.quantity})`)
      .join(", ");

  const getTicketQuantity = (ticketTypes) =>
    ticketTypes.reduce((total, item) => total + item.quantity, 0);

  const handleNextPage = (currentPage) => {
    if (currentPage === ORDER_PAGE_STATES.ORDER_TICKET_AND_FOODS) {
      if (ticketTypes.find((type) => type.quantity !== 0)) {
        dispatch(setPageState(ORDER_PAGE_STATES.ORDER_SEAT));
      } else {
        toast.error(t("error.not_select_ticket"));
      }
    } else if (currentPage === ORDER_PAGE_STATES.ORDER_SEAT) {
      if (selectedSeats.length === getTicketQuantity(ticketTypes)) {
        const selectingSeats =
          selectedSchedule?.roomSeats?.isSelectingSeats?.map(
            (item) => item.seat
          ) || [];
        let putSelectedSeat = true;
        for (let i = 0; i < selectedSeats.length; i++) {
          if (!selectingSeats.includes(selectedSeats[i])) {
            putSelectedSeat = false;
            break;
          }
        }
        if (putSelectedSeat) {
          dispatch(setPageState(ORDER_PAGE_STATES.ORDER_PAYMENT));
        } else {
          dispatch(
            putSelectingSeats({
              scheduleId: selectedSchedule.id,
              userId: user.id,
              selectedSeats,
            })
          );
        }
      } else {
        toast.error(t("error.not_select_enough_ticket"));
      }
    }
  };

  const handlePrevPage = (currentPage) => {
    if (currentPage === ORDER_PAGE_STATES.ORDER_SEAT) {
      dispatch(setPageState(ORDER_PAGE_STATES.ORDER_TICKET_AND_FOODS));
    }
  };

  return (
    <div className="order-ticket-page-container">
      <Header />
      <div className="responsive-container">
        {pageState === ORDER_PAGE_STATES.NOT_FOUND ? (
          <NotFound />
        ) : pageState === ORDER_PAGE_STATES.CONGRATULATION ? (
          <OrderCongratulation />
        ) : (
          <>
            <ProgressBar
              progresses={Object.keys(ORDER_PROGRESSES).map((key) =>
                t("label." + ORDER_PROGRESSES[key].name)
              )}
              activeIndex={
                Object.keys(ORDER_PROGRESSES).findIndex(
                  (key) => ORDER_PROGRESSES[key].pageState === pageState
                )
              }
            />
            <main>
              <section className="order-container">
                {pageState === ORDER_PAGE_STATES.ORDER_TICKET_AND_FOODS ? (
                  <OrderTypeAndFood
                    ticketTypes={ticketTypes}
                    setTicketTypes={setTicketTypes}
                    services={services}
                    setServices={setServices}
                    totalPrice={getTotal(ticketTypes.concat(services))}
                  />
                ) : pageState === ORDER_PAGE_STATES.ORDER_SEAT ? (
                  <OrderSeat
                    seats={selectedSchedule.room?.seats}
                    seatStatus={selectedSchedule.roomSeats}
                    ticketQuantity={getTicketQuantity(ticketTypes)}
                  />
                ) : pageState === ORDER_PAGE_STATES.ORDER_PAYMENT ? (
                  <OrderPayment ticketTypes={ticketTypes} services={services} />
                ) : null}
              </section>
              <section className="info-container">
                <div className="info-bound">
                  <img
                    src="https://www.galaxycine.vn/media/2021/3/15/1350x900_1615774854778.jpg"
                    alt=""
                  />
                  <div className="movie-title">
                    {selectedSchedule.movie?.name}
                  </div>
                  <div className="info-item-container">
                    <div className="info-item">
                      <b>{t("label.cinema")}:&nbsp;</b>
                      <span>
                        {selectedSchedule.cinema?.name +
                          ` | ${t("label.cinema")} ` +
                          selectedSchedule.room?.name}
                      </span>
                    </div>
                    <div className="info-item">
                      <b>{t("label.screening")}:&nbsp;</b>
                      <span>{getScheduleDate(selectedSchedule.date)}</span>
                    </div>
                    <div className="info-item">
                      <b>{t("label.combo")}:&nbsp;</b>
                      <span>{getCombo(services)}</span>
                    </div>
                    <div className="info-item">
                      <b>{t("label.seat")}:&nbsp;</b>
                      <span>{selectedSeats.join(", ")}</span>
                    </div>
                    <div className="info-total-item">
                      {t("label.total")}:&nbsp;
                      <span>
                        {getTotal(ticketTypes.concat(services)) !== 0 &&
                          formatCurrency(
                            getTotal(ticketTypes.concat(services))
                          ) + " VNĐ"}
                      </span>
                    </div>
                  </div>
                  <div className="action">
                    {pageState !== ORDER_PAGE_STATES.ORDER_TICKET_AND_FOODS &&
                      pageState !== ORDER_PAGE_STATES.ORDER_PAYMENT && (
                        <button onClick={() => handlePrevPage(pageState)}>
                          <i className="fa fa-long-arrow-left"></i>&nbsp;
                          {t("common.button_title.prev")}
                        </button>
                      )}
                    <button onClick={() => handleNextPage(pageState)}>
                      {t("common.button_title.next")}&nbsp;
                      <i className="fa fa-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </section>
            </main>
          </>
        )}
        <Footer />
      </div>
      {(pendingTicketTypes || pendingServices || pendingSeat) && (
        <PendingSpinner />
      )}
    </div>
  );
}

export default OrderTicketPage;
