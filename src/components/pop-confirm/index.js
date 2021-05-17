import React, { useRef, useState } from "react";
import "./style.sass";
import { Button, Overlay, Popover } from "react-bootstrap";
import PropTypes from "prop-types";

function PopConfirm({ title, variant, event }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleShow = (event) => {
    setShow(true);
    setTarget(event.target);
  };

  const handleOK = () => {
    setShow(false);
    event();
  };

  return (
    <div ref={ref}>
      <Button variant={variant} size="sm" onClick={handleShow}>
        {title}
      </Button>
      <Overlay placement="left" show={show} target={target}>
        <Popover>
          <Popover.Title as="h3">Bạn có chắc chắn?</Popover.Title>
          <Popover.Content>
            <div className="confirm-button-group">
              <Button variant="danger" size="sm" onClick={handleOK}>
                Yes
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShow(false)}
              >
                No
              </Button>
            </div>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}

PopConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
};

export default PopConfirm;
