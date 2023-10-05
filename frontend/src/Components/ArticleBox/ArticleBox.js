import React, { useState } from "react";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

import "./ArticleBox.css";
import { Link } from "react-router-dom";

export default function ArticleBox({ title, description, cover, shortName }) {
  const [isShowImg, setIsShowImg] = useState(false);
  const onloadImg = () => setIsShowImg(true);
  return (
    <>
      <div className="col-4">
        <div className="article-card">
          <div className="article-card__header">
            <Link
              to={`/article-info/${shortName}`}
              className="article-card__link-img"
            >
              <img
                src={`http://localhost:4000/courses/covers/${cover}`}
                className="article-card__img"
                alt="Article Cover"
                onLoad={onloadImg}
              />
              {!isShowImg && <CircleSpinner />}
            </Link>
          </div>
          <div className="article-card__content">
            <Link
              to={`/article-info/${shortName}`}
              className="article-card__link"
            >
              {description}
            </Link>
            <p className="article-card__text">{title}</p>
            <Link
              to={`/article-info/${shortName}`}
              className="article-card__btn"
            >
              بیشتر بخوانید
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
