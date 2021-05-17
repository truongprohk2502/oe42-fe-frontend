import React, { useEffect } from "react";
import "./style.sass";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PendingSpinner from "../../components/pending-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getServices,
  getTicketTypes,
} from "../../reducers/order";
import { LIMIT_ORDERS_PER_PAGE } from "../../constants/limitRecord";
import moment from "moment";
import { Table } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import CustomPagination from "../../components/pagination";
import { getAllCinemas, getAllCities } from "../../reducers/cinema";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";

function ManageRevenuePage(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { orders, ticketTypes, services, currentPage, totalPage } = useSelector(
    (state) => state.order
  );
  const { pending, pendingTicketTypes, pendingServices } = useSelector(
    (state) => state.order
  );
  const { cities, cinemas, pendingCity, pendingCinema } = useSelector(
    (state) => state.cinema
  );

  useEffect(() => {
    dispatch(getAllOrders({ page: 1, limit: LIMIT_ORDERS_PER_PAGE }));
    dispatch(getTicketTypes());
    dispatch(getServices());
    dispatch(getAllCities());
    dispatch(getAllCinemas());
  }, [dispatch]);

  const getTickets = (tickets) =>
    tickets
      .map(
        (ticket) =>
          `${
            ticketTypes.find((ticketType) => ticketType.id === ticket.id)?.name
          } (${ticket.quantity})` || ""
      )
      .join(", ");

  const getOrderServices = (orderServices) =>
    orderServices
      .map(
        (orderService) =>
          `${
            services.find((service) => service.id === orderService.id)?.name
          } (${orderService.quantity})` || ""
      )
      .join(", ");

  const getRevenue = (tickets, orderServices) => {
    return (
      tickets.reduce((total, ticket) => {
        return (
          total +
          (ticketTypes.find((type) => type.id === ticket.id)?.unitPrice || 0) *
            ticket.quantity
        );
      }, 0) +
      orderServices.reduce((total, service) => {
        return (
          total +
          (services.find((item) => item.id === service.id)?.unitPrice || 0) *
            service.quantity
        );
      }, 0)
    );
  };

  return (
    <div className="manage-revenue-page">
      <Header />
      <div className="responsive-container">
        <main>
          <div className="revenue-order-container">
            <Formik
              initialValues={{
                fromDate: "",
                toDate: "",
                cityId: "",
                cinemaId: "",
                movieName: "",
              }}
              onSubmit={(values) => {
                const { fromDate, toDate, cinemaId, movieName } = values;
                dispatch(
                  getAllOrders({
                    page: 1,
                    limit: LIMIT_ORDERS_PER_PAGE,
                    fromDate: fromDate
                      ? moment(fromDate, "YYYY-MM-DD").valueOf()
                      : null,
                    toDate: toDate
                      ? moment(toDate, "YYYY-MM-DD").valueOf() +
                        24 * 60 * 60 * 1000
                      : null,
                    cinemaId,
                    movieName: movieName.trim(),
                  })
                );
              }}
            >
              <Form className="filter-container">
                <Field name="fromDate">
                  {({ field, form }) => (
                    <div className="filter-item">
                      <label>{t("label.from_date")}</label>
                      <input
                        type="date"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.submitForm();
                        }}
                      />
                    </div>
                  )}
                </Field>
                <Field name="toDate">
                  {({ field, form }) => (
                    <div className="filter-item">
                      <label>{t("label.to_date")}</label>
                      <input
                        type="date"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.submitForm();
                        }}
                      />
                    </div>
                  )}
                </Field>
                <Field name="cityId">
                  {({ field }) => (
                    <div className="filter-item">
                      <label>{t("label.city")}</label>
                      <select {...field}>
                        <option value="">{t("select_option.all")}</option>
                        {cities.length !== 0 &&
                          cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </Field>
                <Field name="cinemaId">
                  {({ field, form }) => (
                    <div className="filter-item">
                      <label>{t("label.cinema")}</label>
                      <select
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          form.submitForm();
                        }}
                      >
                        <option value="">{t("select_option.all")}</option>
                        {cinemas.length !== 0 &&
                          cinemas
                            .filter((cinema) =>
                              form.values.cityId
                                ? cinema.cityId === +form.values.cityId
                                : true
                            )
                            .map((cinema) => (
                              <option key={cinema.id} value={cinema.id}>
                                {cinema.name}
                              </option>
                            ))}
                      </select>
                    </div>
                  )}
                </Field>
                <Field name="movieName">
                  {({ field, form }) => (
                    <div className="filter-item">
                      <label>{t("label.movie_name")}</label>
                      <input
                        type="text"
                        placeholder={t("placeholder.movie_name")}
                        {...field}
                        onKeyDown={(e) => {
                          e.key === "Enter" && form.submitForm();
                        }}
                      />
                    </div>
                  )}
                </Field>
              </Form>
            </Formik>
            <Table responsive striped bordered size="sm">
              <thead>
                <tr>
                  <th>{t("label.number_order")}</th>
                  <th>{t("label.fullname")}</th>
                  <th>{t("label.address")}</th>
                  <th>{t("label.payment_type")}</th>
                  <th>{t("label.date")}</th>
                  <th>{t("label.movie_name")}</th>
                  <th>{t("label.cinema_name")}</th>
                  <th>{t("label.ticket")}</th>
                  <th>{t("label.services")}</th>
                  <th>{t("label.revenue")}</th>
                </tr>
              </thead>
              <tbody>
                {orders.length !== 0 &&
                  orders.map((order, index) => (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.userInfo?.fullName}</td>
                      <td>{order.userInfo?.address}</td>
                      <td>{order.userInfo?.paymentType}</td>
                      <td>{moment(order.date).format("DD/MM/YYYY")}</td>
                      <td>{order.movie?.name}</td>
                      <td>{order.cinema?.name}</td>
                      <td>{getTickets(order.ticketTypes)}</td>
                      <td>{getOrderServices(order.services)}</td>
                      <td>
                        {formatCurrency(
                          getRevenue(order.ticketTypes, order.services)
                        )}
                        &nbsp;{t("unit.vietnam_currency")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {orders && orders.length > 0 && (
              <CustomPagination
                currentPage={currentPage}
                totalPage={totalPage}
                action={getAllOrders}
                limitRecords={LIMIT_ORDERS_PER_PAGE}
              />
            )}
          </div>
        </main>
        <Footer />
      </div>
      {(pending ||
        pendingTicketTypes ||
        pendingServices ||
        pendingCity ||
        pendingCinema) && <PendingSpinner />}
    </div>
  );
}

export default ManageRevenuePage;
