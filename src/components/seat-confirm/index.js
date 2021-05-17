import React, { useRef, useState } from "react";
import "./style.sass";
import { Button, Overlay, Popover } from "react-bootstrap";
import * as seatClassNames from "../../constants/seatClassNames";
import PropTypes from "prop-types";

function SeatConfirm({ className, title, seat, event }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleShow = (event) => {
    setShow(true);
    setTarget(event.target);
  };

  const handleOK = () => {
    setShow(false);
    event(seat);
  };

  const getQuestion = (seatClassName, seat) => {
    switch (seatClassName) {
      case seatClassNames.ENABLE_SEAT:
        return `Bạn có muốn khóa ghế ${seat}?`;
      case seatClassNames.SELECTING_SEAT:
      case seatClassNames.SOLD_SEAT:
        return `Bạn có muốn hủy chọn ghế ${seat}?`;
      case seatClassNames.UNSELECTABLE_SEAT:
        return `Bạn có muốn mở khóa ghế ${seat}?`;
      default:
        break;
    }
  };

  return (
    <div ref={ref}>
      <div className={className} onClick={handleShow}>
        {title}
      </div>
      <Overlay placement="bottom" show={show} target={target}>
        <Popover>
          <Popover.Title as="h3">{getQuestion(className, seat)}</Popover.Title>
          <Popover.Content>
            <div className="confirm-button-group">
              <Button variant="danger" onClick={handleOK}>
                Yes
              </Button>
              <Button variant="secondary" onClick={() => setShow(false)}>
                No
              </Button>
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}

SeatConfirm.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  seat: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
};

export default SeatConfirm;
