import React, { useLayoutEffect, useRef } from "react";
import "./style.sass";
import * as seatClassNames from "../../../constants/seatClassNames";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSeats } from "../../../reducers/order";
import { useTranslation } from "react-i18next";

function OrderSeat({ seats, seatStatus, ticketQuantity }) {
  const seatContainerRef = useRef();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedSeats } = useSelector((state) => state.order);

  useLayoutEffect(() => {
    seatContainerRef.current.style.gridTemplateColumns = `repeat(${
      seats ? seats[0]?.length + 4 || 1 : 1
    } ,minmax(1.7rem, 1fr))`;
  }, [seats]);

  const getSeatStatus = (seat) => {
    const isSelectingSeats =
      seatStatus?.isSelectingSeats?.map((item) => item.seat) || [];
    const soldSeats = seatStatus?.soldSeats?.map((item) => item.seat) || [];
    const unselectableSeats =
      seatStatus?.unselectableSeats?.map((item) => item.seat) || [];
    if (selectedSeats && selectedSeats.includes(seat)) {
      return seatClassNames.SELECTED_SEAT;
    } else if (isSelectingSeats && isSelectingSeats.includes(seat)) {
      return seatClassNames.SELECTING_SEAT;
    } else if (soldSeats && soldSeats.includes(seat)) {
      return seatClassNames.SOLD_SEAT;
    } else if (unselectableSeats && unselectableSeats.includes(seat)) {
      return seatClassNames.UNSELECTABLE_SEAT;
    } else {
      return seatClassNames.ENABLE_SEAT;
    }
  };

  const handleClickSeat = (name, seat) => {
    if (
      name !== seatClassNames.ENABLE_SEAT &&
      name !== seatClassNames.SELECTED_SEAT
    )
      return;
    if (selectedSeats.includes(seat)) {
      const index = selectedSeats.indexOf(seat);
      if (index !== -1) {
        const newSelectedSeats = [...selectedSeats];
        newSelectedSeats.splice(index, 1);
        dispatch(setSelectedSeats(newSelectedSeats));
      }
    } else {
      if (selectedSeats.length >= ticketQuantity) {
        toast.error(t("error.select_over_ticket"));
      } else {
        dispatch(setSelectedSeats([...selectedSeats, seat]));
      }
    }
  };

  const renderSeats = (seats) => {
    if (seats && seats.length) {
      let rowCount = 0;
      return seats.map((row, rowIndex) => {
        let index = 0;
        const existSeat = row.find((item) => item !== 0);
        if (existSeat) rowCount++;
        const rowLabel = String.fromCharCode(64 + rowCount);
        return [
          <div
            className={existSeat ? "label-seat" : "label-nothing"}
            key={"first-label-" + rowIndex}
          >
            {existSeat && rowLabel}
          </div>,
          <div
            className={seatClassNames.WAY_SEAT}
            key={"first-way-" + rowIndex}
          ></div>,
          ...row.map((col, colIndex) => {
            if (col !== 0) index++;
            const seatLabel = rowLabel + index;
            const seatClassName =
              col === 1 ? getSeatStatus(seatLabel) : seatClassNames.WAY_SEAT;
            return (
              <div
                key={rowIndex + "-" + colIndex}
                className={seatClassName}
                onClick={() => handleClickSeat(seatClassName, seatLabel)}
              >
                {col !== 0 && index}
              </div>
            );
          }),
          <div
            className={seatClassNames.WAY_SEAT}
            key={"last-way-" + rowIndex}
          ></div>,
          <div
            className={existSeat ? "label-seat" : "label-nothing"}
            key={"last-label-" + rowIndex}
          >
            {existSeat && rowLabel}
          </div>,
        ];
      });
    }
    return null;
  };

  return (
    <section className="order-seat-container">
      <div className="order-main-title">
        {t("common.list_title.choose_seat") +
          (selectedSeats.length !== 0 ? ": " + selectedSeats.join(", ") : "")}
      </div>
      <div className="room-container">
        <div className="selection">
          <div className="select-seat-item">
            <i className="fa fa-square green"></i>&nbsp;
            <span>{t("label.selecting_seat")}</span>
          </div>
          <div className="select-seat-item">
            <i className="fa fa-square red"></i>&nbsp;
            <span>{t("label.sold_seat")}</span>
          </div>
          <div className="select-seat-item">
            <i className="fa fa-square grey"></i>&nbsp;
            <span>{t("label.selectable_seat")}</span>
          </div>
          <div className="select-seat-item">
            <i className="fa fa-square blue"></i>&nbsp;
            <span>{t("label.unselectable_seat")}</span>
          </div>
        </div>
        <div className="screen">{t("label.screen")}</div>
        <div className="seat-container" ref={seatContainerRef}>
          {renderSeats(seats)}
        </div>
      </div>
    </section>
  );
}

export default OrderSeat;
