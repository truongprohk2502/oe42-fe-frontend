import React from "react";
import "./style.sass";
import { ORDER_ROW_TYPES } from "../../constants/orderTicket";
import { formatCurrency } from "../../utils/formatCurrency";
import PropTypes from "prop-types";

function OrderRow({
  type,
  titleComponent: TitleComponent,
  unitPrice,
  quantity,
  setQuantity,
}) {
  const PLUS = "plus";
  const MINUS = "minus";

  const handleButton = (direction) => {
    if (direction === MINUS && quantity === 0) return;
    if (direction === MINUS) {
      setQuantity(quantity - 1);
    } else if (direction === PLUS) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <tr>
      <td
        className={
          type === ORDER_ROW_TYPES.TICKET
            ? "main-col"
            : type === ORDER_ROW_TYPES.FOOD
            ? "combo-col"
            : ""
        }
      >
        {TitleComponent}
      </td>
      <td className="quantity">
        <i
          onClick={() => handleButton(MINUS)}
          className={`fa fa-minus-circle ${+quantity === 0 && "disabled"}`}
        ></i>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
        />
        <i onClick={() => handleButton(PLUS)} className="fa fa-plus-circle"></i>
      </td>
      <td className="price">{formatCurrency(unitPrice)} đ</td>
      <td className="price">
        {Number.isInteger(+quantity) && +quantity >= 0
          ? formatCurrency(+quantity * unitPrice)
          : 0}{" "}
        đ
      </td>
    </tr>
  );
}

OrderRow.propTypes = {
  type: PropTypes.string.isRequired,
  titleComponent: PropTypes.node.isRequired,
  unitPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
};

export default OrderRow;
