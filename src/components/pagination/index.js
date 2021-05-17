import React from "react";
import "./style.sass";
import { Pagination } from "react-bootstrap";
import { getPaginations } from "../../utils/getPaginations";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

function CustomPagination({
  currentPage,
  totalPage,
  limitRecords,
  action,
  ...restProps
}) {
  const dispatch = useDispatch();
  
  const handleClickPrev = () => {
    dispatch(
      action({ page: currentPage - 1, limit: limitRecords, ...restProps })
    );
  };

  const handleClickNext = () => {
    dispatch(
      action({ page: currentPage + 1, limit: limitRecords, ...restProps })
    );
  };

  const handleClickPage = (page) => {
    dispatch(action({ page, limit: limitRecords, ...restProps }));
  };

  return (
    <section className="pagination-container">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={handleClickPrev}
        />
        {totalPage > 0 &&
          getPaginations(currentPage, totalPage).map((page, index) =>
            page === "..." ? (
              <Pagination.Ellipsis key={index} />
            ) : (
              <Pagination.Item
                key={index}
                active={currentPage === page}
                onClick={() => handleClickPage(page)}
              >
                {page}
              </Pagination.Item>
            )
          )}
        <Pagination.Next
          disabled={currentPage === totalPage}
          onClick={handleClickNext}
        />
      </Pagination>
    </section>
  );
}

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  limitRecords: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
};

export default CustomPagination;
