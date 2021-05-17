import React, { useEffect, useLayoutEffect } from "react";
import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../../components/pagination";
import { getBlogNewses } from "../../../reducers/blog";
import { getReviewNewses } from "../../../reducers/review";
import { LIMIT_NEWS_PER_PAGE } from "../../../constants/limitRecord";
import * as routePath from "../../../constants/routes";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NewsList(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    reviewNewses,
    currentPage: currentPageReview,
    totalPage: totalPageReview,
  } = useSelector((state) => state.review);
  const {
    blogNewses,
    currentPage: currentPageBlog,
    totalPage: totalPageBlog,
  } = useSelector((state) => state.blog);
  const { path } = props;

  useEffect(() => {
    if (path === "/review") {
      dispatch(getReviewNewses({ page: 1, limit: LIMIT_NEWS_PER_PAGE }));
    } else if (path === "/blog") {
      dispatch(getBlogNewses({ page: 1, limit: LIMIT_NEWS_PER_PAGE }));
    }
  }, [dispatch, path]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageReview, currentPageBlog]);

  return (
    <section className="list-news-container">
      <div className="news-title">
        {path === "/review"
          ? t("common.list_title.review")
          : path === "/blog"
          ? t("common.list_title.blog")
          : ""}
      </div>
      <div className="news-item-container">
        {path === "/review" &&
          reviewNewses.length &&
          reviewNewses.map((review) => (
            <article className="news-item" key={review.id}>
              <section className="img-container">
                <Link to={routePath.REVIEW_PAGE_PATH + "/" + review.id}>
                  <img src={review.img} alt="movie" />
                </Link>
              </section>
              <section className="info-container">
                <Link
                  to={routePath.REVIEW_PAGE_PATH + "/" + review.id}
                  className="title"
                >
                  <h5>
                    [Review] {review.movie?.name}: {review.title}
                  </h5>
                </Link>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <strong>{review.movie?.ratingAverage}</strong>
                  <span>/10 ({review.movie?.ratingQuantity})</span>
                </div>
                <p className="description">{review.summary}</p>
              </section>
            </article>
          ))}
        {path === "/blog" &&
          blogNewses.length &&
          blogNewses.map((blog) => (
            <article className="news-item" key={blog.id}>
              <section className="img-container">
                <Link to={routePath.BLOG_PAGE_PATH + "/" + blog.id}>
                  <img src={blog.img} alt="movie" />
                </Link>
              </section>
              <section className="info-container">
                <Link
                  to={routePath.BLOG_PAGE_PATH + "/" + blog.id}
                  className="title"
                >
                  <h5>{blog.title}</h5>
                </Link>
                <p className="description">{blog.summary}</p>
              </section>
            </article>
          ))}
      </div>
      <div className="pagination-section">
        <CustomPagination
          currentPage={
            path === "/review"
              ? currentPageReview
              : path === "/blog"
              ? currentPageBlog
              : 1
          }
          totalPage={
            path === "/review"
              ? totalPageReview
              : path === "/blog"
              ? totalPageBlog
              : 0
          }
          action={
            path === "/review"
              ? getReviewNewses
              : path === "/blog"
              ? getBlogNewses
              : function () {}
          }
          limitRecords={LIMIT_NEWS_PER_PAGE}
        />
      </div>
    </section>
  );
}

export default NewsList;
