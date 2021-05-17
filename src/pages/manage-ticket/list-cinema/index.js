import React, { useEffect, useState } from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { getAllCinemas, getAllCities } from "../../../reducers/cinema";

function ListCinema(props) {
  const [cinema, setCinema] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(0);
  const { t } = useTranslation();
  const { cities, cinemas } = useSelector((state) => state.cinema);
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCities());
    dispatch(getAllCinemas());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getFilterCinemas = (cinemas, cinemaKeyword, cityId) => {
    return cinemas.filter((cinema) => {
      let result = true;
      if (cinemaKeyword.length) {
        result =
          result &&
          cinema.name.toLowerCase().includes(cinemaKeyword.toLowerCase());
      }
      if (cityId) {
        result = result && cinema.cityId === cityId;
      }
      return result;
    });
  };

  return (
    <div className="list-cinema-container">
      <section className="filter-container">
        <div className="filter-item">
          <span>{t("label.search")}</span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nhập tên rạp chiếu"
              value={cinema}
              onChange={(e) => setCinema(e.target.value)}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className="filter-item">
          <span>{t("label.city")}</span>
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(+e.target.value)}
          >
            <option value={0}>{t("select_option.all_cities")}</option>
            {cities.length &&
              cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
      </section>
      <section className="table-container">
        <Table responsive striped bordered size="sm">
          <thead>
            <tr>
              <th>{t("label.number_order")}</th>
              <th>{t("label.cinema_name")}</th>
              <th>{t("label.city")}</th>
              <th>{t("label.detail")}</th>
            </tr>
          </thead>
          <tbody>
            {cinemas.length !== 0 &&
              getFilterCinemas(cinemas, cinema, selectedCityId).map(
                (cinema, index) => (
                  <tr key={cinema.id}>
                    <td>{index + 1}</td>
                    <td>{cinema.name}</td>
                    <td>{cinema.city.name}</td>
                    <td>
                      <Link to={path + "/" + cinema.id}>
                        {t("label.show_detail")}
                      </Link>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </Table>
      </section>
    </div>
  );
}

export default ListCinema;
