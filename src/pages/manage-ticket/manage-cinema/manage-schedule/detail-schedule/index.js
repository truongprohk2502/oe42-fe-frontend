import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailSchedule,
  putSeatByAdmin,
} from "../../../../../reducers/schedule";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getScheduleDate } from "../../../../../utils/getScheduleDate";
import * as seatClassNames from "../../../../../constants/seatClassNames";
import SeatConfirm from "../../../../../components/seat-confirm";

function DetailSchedule(props) {
  const dispatch = useDispatch();
  const { selectedSchedule } = useSelector((state) => state.schedule);
  const { scheduleId } = useParams();
  const { t } = useTranslation();
  const seatContainerRef = useRef();
  const { seats } = selectedSchedule.room || {};
  const seatStatus = selectedSchedule.roomSeats;

  useLayoutEffect(() => {
    seatContainerRef.current.style.gridTemplateColumns = `repeat(${
      seats ? seats[0]?.length + 4 || 1 : 1
    } ,minmax(1.7rem, 1fr))`;
  }, [seats]);

  useEffect(() => {
    dispatch(getDetailSchedule(scheduleId));
  }, [dispatch, scheduleId]);

  const getSeatStatus = (seat) => {
    const isSelectingSeats =
      seatStatus?.isSelectingSeats?.map((item) => item.seat) || [];
    const soldSeats = seatStatus?.soldSeats?.map((item) => item.seat) || [];
    const unselectableSeats =
      seatStatus?.unselectableSeats?.map((item) => item.seat) || [];
    if (isSelectingSeats && isSelectingSeats.includes(seat)) {
      return seatClassNames.SELECTING_SEAT;
    } else if (soldSeats && soldSeats.includes(seat)) {
      return seatClassNames.SOLD_SEAT;
    } else if (unselectableSeats && unselectableSeats.includes(seat)) {
      return seatClassNames.UNSELECTABLE_SEAT;
    } else {
      return seatClassNames.ENABLE_SEAT;
    }
  };

  const handleChangeSeatStatus = (seat) => {
    const status = getSeatStatus(seat);
    if (status === seatClassNames.SELECTING_SEAT) {
      dispatch(
        putSeatByAdmin({
          selectedSchedule,
          seatData: {
            ...seatStatus,
            isSelectingSeats: seatStatus.isSelectingSeats.filter(
              (seatItem) => seatItem.seat !== seat
            ),
          },
        })
      );
    } else if (status === seatClassNames.SOLD_SEAT) {
      dispatch(
        putSeatByAdmin({
          selectedSchedule,
          seatData: {
            ...seatStatus,
            soldSeats: seatStatus.soldSeats.filter(
              (seatItem) => seatItem.seat !== seat
            ),
          },
        })
      );
    } else if (status === seatClassNames.UNSELECTABLE_SEAT) {
      dispatch(
        putSeatByAdmin({
          selectedSchedule,
          seatData: {
            ...seatStatus,
            unselectableSeats: seatStatus.unselectableSeats.filter(
              (seatItem) => seatItem.seat !== seat
            ),
          },
        })
      );
    } else {
      dispatch(
        putSeatByAdmin({
          selectedSchedule,
          seatData: {
            ...seatStatus,
            unselectableSeats: [...seatStatus.unselectableSeats, { seat }],
          },
        })
      );
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
              <SeatConfirm
                key={rowIndex + "-" + colIndex}
                className={seatClassName}
                title={col !== 0 ? index : ""}
                seat={seatLabel}
                event={handleChangeSeatStatus}
              />
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
    <div className="detail-schedule-container">
      <section className="seat-container-section">
        <div className="seat-bound">
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
        </div>
      </section>
      <section className="info-container">
        <img
          src="https://www.galaxycine.vn/media/2021/3/15/1350x900_1615774854778.jpg"
          alt=""
        />
        <div className="movie-title">{selectedSchedule.movie?.name}</div>
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
        </div>
      </section>
    </div>
  );
}

export default DetailSchedule;
