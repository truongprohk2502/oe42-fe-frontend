import React from "react";
import "./style.sass";
import OrderRow from "../../../components/order-row";
import { ORDER_ROW_TYPES } from "../../../constants/orderTicket";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useTranslation } from "react-i18next";

function OrderTypeAndFood({
  ticketTypes,
  setTicketTypes,
  services,
  setServices,
  totalPrice,
}) {
  const { t } = useTranslation();

  return (
    <section className="order-type-and-food-container">
      <div className="order-main-title">
        {t("common.list_title.ticket_and_food")}
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="main-col">{t("label.ticket_type")}</th>
              <th className="quantity">{t("label.quantity")}</th>
              <th className="price">{t("label.price")}</th>
              <th className="price">{t("label.total_price")}</th>
            </tr>
          </thead>
          <tbody>
            {ticketTypes.length > 0 &&
              ticketTypes.map((type) => (
                <OrderRow
                  key={type.id}
                  type={ORDER_ROW_TYPES.TICKET}
                  quantity={
                    ticketTypes.find((item) => item.id === type.id).quantity
                  }
                  setQuantity={(qty) =>
                    setTicketTypes(
                      ticketTypes.map((ticketType) => {
                        if (ticketType.id === type.id) {
                          return { ...ticketType, quantity: qty };
                        }
                        return ticketType;
                      })
                    )
                  }
                  titleComponent={<span>{type.name}</span>}
                  unitPrice={type.unitPrice}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="main-col">{t("label.combo")}</th>
              <th className="quantity">{t("label.quantity")}</th>
              <th className="price">{t("label.price")}</th>
              <th className="price">{t("label.total_price")}</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 &&
              services.map((service) => (
                <OrderRow
                  key={service.id}
                  type={ORDER_ROW_TYPES.FOOD}
                  quantity={
                    services.find((item) => item.id === service.id).quantity
                  }
                  setQuantity={(qty) =>
                    setServices(
                      services.map((item) => {
                        if (item.id === service.id) {
                          return { ...item, quantity: qty };
                        }
                        return item;
                      })
                    )
                  }
                  titleComponent={
                    <div>
                      <img src={service.img} alt="" />
                      <div className="info">
                        <strong>{service.name}</strong>
                        <br />
                        <span>{service.description}</span>
                      </div>
                    </div>
                  }
                  unitPrice={service.unitPrice}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="total-container">
        <div className="title">
          {t("label.total")}:&nbsp;
          {totalPrice !== 0 && formatCurrency(totalPrice) + " VNĐ"}
        </div>
      </div>
    </section>
  );
}

export default OrderTypeAndFood;
